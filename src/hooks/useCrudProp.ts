import { computed, ref, shallowRef, toRaw, watch, watchEffect, type Ref } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableColumn } from 'quasar'

import { useApi } from '../services/api'
import { showError, confirmDelete } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import { i18n } from '../i18n'

import type { Action, ActionSingle, OptionalData } from '../types/myTypes'
import type DataOption from '../models/dataOption'
import { useDataState } from './useDataState'
import { EDataState } from '../types/myEnums'

interface BaseEntity {
  [key: string]: any
}

/**
 * Creates a deterministic string representation.
 * Object keys are sorted, so the comparison is reliable even when key order differs.
 *
 * Intended for normal API/form data: strings, numbers, booleans, null,
 * arrays, plain objects, and Date values.
 *
 * Never throws — it runs inside a synchronous watcher, where a thrown error
 * would propagate into the v-model update that triggered it.
 */
function createStableSnapshot(value: unknown, seen = new WeakSet<object>()): string {
  const rawValue = typeof value === 'object' && value !== null ? toRaw(value) : value

  if (rawValue === null) {
    return 'null'
  }

  if (rawValue === undefined) {
    return '__undefined__'
  }

  if (typeof rawValue === 'string') {
    return JSON.stringify(rawValue)
  }

  if (typeof rawValue === 'boolean') {
    return rawValue ? 'true' : 'false'
  }

  if (typeof rawValue === 'number') {
    if (Number.isNaN(rawValue)) {
      return '__NaN__'
    }

    if (!Number.isFinite(rawValue)) {
      return rawValue === Infinity ? '__Infinity__' : '__-Infinity__'
    }

    return String(rawValue)
  }

  if (typeof rawValue === 'bigint') {
    return `${rawValue.toString()}n`
  }

  if (typeof rawValue === 'symbol') {
    return `__symbol:${rawValue.description ?? ''}__`
  }

  if (typeof rawValue === 'function') {
    // Functions normally should not be form/API data.
    // A fixed marker avoids "[object Object]" warnings.
    return '__function__'
  }

  // From here, TypeScript knows it is a non-null object.
  const objectValue = rawValue as object

  if (objectValue instanceof Date) {
    return `__date:${objectValue.toISOString()}__`
  }

  if (seen.has(objectValue)) {
    // Stable marker instead of throwing. A cycle always serialises the same
    // way, so change detection stays correct.
    return '__circular__'
  }

  seen.add(objectValue)

  try {
    if (Array.isArray(objectValue)) {
      return `[${objectValue.map(entry => createStableSnapshot(entry, seen)).join(',')}]`
    }

    const record = objectValue as Record<string, unknown>

    return `{${Object.keys(record)
      .sort()
      .map(key => {
        const propertyValue = createStableSnapshot(record[key], seen)
        return `${JSON.stringify(key)}:${propertyValue}`
      })
      .join(',')}}`
  } finally {
    // `finally` guarantees cleanup on every exit path.
    seen.delete(objectValue)
  }
}

/**
 * @typeParam T - The full entity model used by the form.
 * @typeParam S - Optional "base" model that defines which fields get saved.
 *                Must be an object type: Object.keys() is called on an instance.
 *                Defaults to T when no BaseConstructor is supplied.
 */
export function useCrudProp<T extends BaseEntity, S extends object = T>(
  idKey: keyof T,
  tableName: string,
  ModelConstructor: new () => T,
  columnsConfig: (t: (key: string) => string) => QTableColumn[],
  BaseConstructor: (new () => S) | undefined,
  assignInit: ActionSingle<T[]> | undefined
) {
  const $q = useQuasar()
  const { t } = i18n.global
  const myConf = MyConfig.instance
  const dataState = useDataState()

  /*
   * Resolved once during setup. Calling useApi() inside an async function
   * after an `await` would run outside the component's sync setup context,
   * where inject() is no longer available.
   */
  const api = useApi()

  /*
   * The cast is applied to the ref itself, not to every usage.
   * ref<T[]>() would store UnwrapRefSimple<T>[], which forces a cast at
   * every read site. Casting here keeps `.value` exactly T[] / T.
   */
  const items = ref([]) as Ref<T[]>
  const item = ref(new ModelConstructor()) as Ref<T>

  // shallowRef: the value is a function, which must never be made reactive.
  const clearValidate = shallowRef<Action | undefined>(undefined)

  const isPwdVisible = ref(false)

  // computed: re-evaluates when the active locale changes.
  const listColumns = computed<QTableColumn[]>(() => columnsConfig(t))

  /*
   * Keeps the state of the item when it was last loaded, selected,
   * initialized, or successfully saved.
   */
  const originalItemSnapshot = ref('')

  /*
   * Prevents the watcher from marking the form as edited while data is
   * being loaded from API, a row is selected, or a new item is created.
   *
   * A plain variable, not a ref: it is read synchronously inside the watcher
   * and never rendered, so reactivity would only add tracking overhead.
   */
  let isApplyingSystemChanges = false

  /*
   * Used when the user changes data back to its original state.
   * Existing item => selected/valid state.
   * New item => new-item state.
   */
  const itemMode = ref<'existing' | 'new'>('new')

  const currentUser = myConf.LoginUserId

  // +++++++ Snapshot helpers +++++++++++++++++++++

  const getItemSnapshot = () => createStableSnapshot(item.value)

  const setOriginalItemSnapshot = () => {
    originalItemSnapshot.value = getItemSnapshot()
  }

  /**
   * Applies API/system changes without triggering "edited" state.
   */
  const applySystemChanges = (callback: () => void) => {
    isApplyingSystemChanges = true

    try {
      callback()
      setOriginalItemSnapshot()
    } finally {
      isApplyingSystemChanges = false
    }
  }

  /**
   * Always create a new model instance.
   * This prevents properties from the previous selected record from remaining
   * when the next API item does not contain those properties.
   */
  const replaceItem = (source?: Partial<T> | null) => {
    item.value = Object.assign(new ModelConstructor(), source ?? {})
  }

  const resetValidation = () => {
    clearValidate.value?.()
  }

  // +++++++ Change detection +++++++++++++++++++++

  /*
   * Watch all top-level and nested properties.
   *
   * flush: 'sync' is required, not a preference. The guard flag is cleared
   * synchronously in applySystemChanges()'s finally block, so a deferred
   * flush ('pre' / 'post') would run the callback after the guard is already
   * back to false and every programmatic assignment would be reported as a
   * user edit.
   */
  watch(
    item,
    () => {
      if (isApplyingSystemChanges) {
        return
      }

      const currentSnapshot = getItemSnapshot()
      const hasChanges = currentSnapshot !== originalItemSnapshot.value

      if (hasChanges) {
        // Item has been changed by the user.
        dataState.stateCtrl(false, false, true, false)
        return
      }

      // User changed values back to their original values.
      if (itemMode.value === 'existing') {
        dataState.stateCtrl(false, true, false, false)
      } else {
        dataState.stateCtrl(false, false, false, true)
      }
    },
    {
      deep: true,
      flush: 'sync'
    }
  )

  // +++++++ Permissions +++++++++++++++++++++++

  const ownRcdRole = computed(() => {
    const createBy = item.value?.createBy
    return createBy ? Number(myConf.getUserRole(createBy)) || 0 : 0
  })

  const loginRole = computed(() => Number(myConf.LoginUserRole) || 0)

  const isFullAccess = computed(() => {
    if (myConf.LoginUserName === 'super') {
      return true
    }

    const createBy = item.value?.createBy

    if (!createBy) {
      return false
    }

    return createBy === myConf.LoginUserId || loginRole.value > ownRcdRole.value
  })

  const canEditRole = computed(() => {
    return loginRole.value >= ownRcdRole.value
  })

  const isOwnAccount = computed(() => {
    return tableName === 'users' && String(myConf.LoginUserId) === String(item.value?.userId)
  })

  watchEffect(() => {
    const hasAccess = isFullAccess.value

    dataState.canUserEdit.value = hasAccess || isOwnAccount.value
    dataState.canUserDel.value = hasAccess
    isPwdVisible.value = hasAccess || isOwnAccount.value
  })

  // +++++++ API +++++++++++++++++++++++
  // Declared before the callers so the reading order matches the call order.

  const getApiContext = (operation: string) => {
    return {
      url: `${myConf.AppConfig.DbUrl}/api/crud/${operation}`,
      token: myConf.AppConfig.AuthToken
    }
  }

  /*
   * Throws on failure instead of returning [].
   * Swallowing the error here would make a network failure indistinguishable
   * from an empty table, and Init() would silently fall into new-record mode.
   */
  const getAllItems = async (): Promise<T[]> => {
    const { url, token } = getApiContext('get-alldata')

    const response = await api.post(url, {
      token,
      table: tableName
    })

    return response.data?.data ?? []
  }

  const deleteItem = async (): Promise<boolean> => {
    try {
      const currentId = item.value?.[idKey]

      if (currentId === null || currentId === undefined || currentId === '') {
        console.warn('Cannot delete: no item ID is currently selected.')
        return false
      }

      const { url, token } = getApiContext('post-delete')

      const response = await api.post(url, {
        token,
        table: tableName,
        id: String(currentId)
      })

      if (response.data?.status === 'success') {
        return true
      }

      throw new Error(response.data?.message ?? 'Unknown server error during deletion.')
    } catch (err) {
      await showError(err)
      return false
    }
  }

  const saveItem = async (): Promise<boolean> => {
    try {
      const { url, token } = getApiContext('post-insertorupdate')

      const recordData: Record<string, unknown> = {}

      /*
       * When BaseConstructor exists, save only its fields.
       * Otherwise, save fields defined in the current model.
       *
       * Typed as `object` — the union T | S is only ever read through
       * Object.keys(), which needs nothing more specific.
       */
      const modelForKeys: object = BaseConstructor ? new BaseConstructor() : new ModelConstructor()

      Object.keys(modelForKeys).forEach(key => {
        recordData[key] = item.value[key] ?? null
      })

      const response = await api.post(url, {
        token,
        table: tableName,
        data: recordData
      })

      if (response.data?.status === 'success') {
        return true
      }

      throw new Error(response.data?.message ?? 'Failed to save record.')
    } catch (err) {
      await showError(err)
      return false
    }
  }

  const getDataOptions = async (option: OptionalData): Promise<DataOption[]> => {
    try {
      const response = await api.post(`${myConf.AppConfig.DbUrl}/api/optionalData`, {
        token: myConf.AppConfig.AuthToken,
        option
      })

      return response.data?.data ?? []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  // +++++++ Initialization +++++++++++++++++++++++

  const Init = async (): Promise<void> => {
    try {
      // 1. Enter loading state
      dataState.stateCtrl(true, false, false, false)

      // 2. Fetch records — throws on failure, handled below
      items.value = await getAllItems()

      // 3. Clear any stale validation from a previous session
      resetValidation()

      if (items.value.length > 0) {
        // ---- EXISTING RECORD PATH ----
        itemMode.value = 'existing'

        applySystemChanges(() => {
          if (assignInit) {
            assignInit(items.value)
          } else {
            replaceItem(items.value[0])
          }
        })

        dataState.stateCtrl(false, true, false, false)
      } else {
        // ---- NEW RECORD PATH ----
        // Same terminal state as onCreate(), so an empty table and a manual
        // "New" click leave the form in an identical state.
        itemMode.value = 'new'

        applySystemChanges(() => {
          replaceItem()
        })

        dataState.stateCtrl(false, false, false, true)
      }
    } catch (err) {
      // A failed load is not a valid new record — reset to a neutral state.
      items.value = []

      applySystemChanges(() => {
        replaceItem()
      })

      await showError(err)
      dataState.stateCtrl(false, false, false, false)
    }
  }

  // +++++++ Event Handling +++++++++++++++++++++++

  const onRowClick = (row: T) => {
    if (!row) {
      return
    }

    dataState.stateCtrl(true, false, false, false)

    const targetId = row[idKey]

    const selected = items.value.find(record => {
      return String(record[idKey]) === String(targetId)
    })

    if (!selected) {
      dataState.stateCtrl(false, false, false, false)
      return
    }

    itemMode.value = 'existing'

    applySystemChanges(() => {
      replaceItem(selected)
    })

    resetValidation()
    dataState.stateCtrl(false, true, false, false)
  }

  const onCreate = () => {
    itemMode.value = 'new'

    applySystemChanges(() => {
      replaceItem()
    })

    resetValidation()
    dataState.stateCtrl(false, false, false, true)
  }

  const onDelete = async () => {
    const currentId = item.value?.[idKey]

    if (currentId === null || currentId === undefined || currentId === '') {
      return
    }

    const success = await confirmDelete($q, String(currentId), () => deleteItem())

    if (success) {
      await Init()
    }
  }

  const onSave = async () => {
    if (!item.value) {
      return
    }

    const canSave =
      dataState.state.value === EDataState.ValidEdit ||
      dataState.state.value === EDataState.ValidNew

    if (!canSave) {
      return
    }

    const success = await saveItem()

    if (success) {
      $q.notify({
        type: 'positive',
        message: t('Item_saved_successfully')
      })

      // Refresh once only. saveItem() does not call Init().
      await Init()
    }
  }

  return {
    ...dataState,
    items,
    item,
    listColumns,
    clearValidate,
    isPwdVisible,
    canEditRole,
    currentUser,
    onRowClick,
    onCreate,
    onDelete,
    onSave,
    Init,
    getAllItems,
    getDataOptions
  }
}
