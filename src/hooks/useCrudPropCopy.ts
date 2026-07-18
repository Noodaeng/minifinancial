import { ref, watch } from 'vue'
import { useApi } from '../services/api'
import { showError, confirmDelete } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import { QTableColumn, useQuasar } from 'quasar'
import { i18n } from '../i18n'
import { Action, FuncBoolAsync, ActionSingle, OptionalData } from '../types/myTypes'
import DataOption from '../models/dataOption'
import { useDataState } from './useDataState'
import { EDataState } from '@/types/myEnums'

interface BaseEntity {
  [key: string]: any
}

export function useCrudPropCopy<T extends BaseEntity>(
  idKey: keyof T,
  tableName: string, // Changed from sheetName to tableName
  ModelConstructor: new () => T,
  columnsConfig: (t: (key: string) => string) => QTableColumn[]
) {
  const $q = useQuasar()
  const { t } = i18n.global

  const items = ref<T[]>([]) as any
  const item = ref<T>(new ModelConstructor())
  const clearValidate = ref<Action | undefined>(undefined)
  const justSave = ref(false)
  const assignInit = ref<ActionSingle<T[]> | undefined>(undefined)

  const getValidate = ref<FuncBoolAsync>(async () => {
    return false
  })
  const dataState = useDataState()

  watch(
    () => ({ ...item.value }),
    async (newVal, oldVal) => {
      if (newVal[idKey as string] !== oldVal[idKey as string]) {
        if (clearValidate.value) {
          clearValidate.value()
          justSave.value = false
        }
        return
      } else if (justSave.value) {
        justSave.value = false
        return
      } else {
        const valid = await getValidate.value()
        dataState.stateCtrl(false, false, valid, false)
      }
    }
  )

  const listColumns = ref<QTableColumn[]>(columnsConfig(t))

  // +++++++ Init +++++++++++++++++++++++
  const Init = async () => {
    try {
      dataState.stateCtrl(true, false, false, false)
      items.value = await getAllItems()

      if (clearValidate.value) {
        clearValidate.value()
      }

      if (assignInit.value && items.value && items.value.length > 0) {
        assignInit.value(items.value)
        dataState.stateCtrl(false, true, false, false)
      } else if (items.value && items.value.length > 0) {
        Object.assign(item.value, items.value[0])
        dataState.stateCtrl(false, true, false, false)
      }
    } catch (err) {
      await showError(err)
    }
  }

  // +++++++ Event handling +++++++++++++++++
  const onRowClick = (row: any) => {
    if (row) {
      const targetId = (row as T)[idKey]
      const selected = items.value.find((c: any) => c[idKey] === targetId)

      if (selected) {
        Object.assign(item.value, selected)
        dataState.stateCtrl(false, true, false, false)
      }
    }
  }

  const onCreate = () => {
    Object.assign(item.value, new ModelConstructor())
    dataState.stateCtrl(false, false, false, true)
  }

  const onDelete = () => {
    if (item.value && item.value[idKey as string] !== '') {
      confirmDelete($q, String(item.value[idKey as string]), deleteItem)
    }
  }

  const onSave = async () => {
    if (!item.value) return

    let success = false
    if (
      dataState.state.value === EDataState.ValidEdit ||
      dataState.state.value === EDataState.ValidNew
    ) {
      // Cloudflare Worker handles both via post-insertorupdate
      success = await saveItem()
    }

    if (success) {
      justSave.value = true
    }
  }

  // +++++++ Call Api +++++++++++++++++++++++
  const getApiContext = (operation: string) => {
    const secretToken = MyConfig.instance.AppConfig.AuthToken
    const baseUrl = MyConfig.instance.AppConfig.DbUrl // e.g. "https://your-worker.workers.dev"

    return {
      url: `${baseUrl}/api/crud/${operation}`,
      token: secretToken
    }
  }

  // 🔍 Action 1: Get All Data
  const getAllItems = async (): Promise<T[]> => {
    try {
      const api = useApi()
      const { url, token } = getApiContext('get-alldata')

      const response = await api.post(url, {
        token: token,
        table: tableName
      })

      return response.data?.data || []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  // ❌ Action 2: Delete Item
  const deleteItem = async (): Promise<boolean> => {
    try {
      const api = useApi()
      const { url, token } = getApiContext('post-delete')
      const currentId = item.value[idKey as string]

      if (!currentId) {
        console.warn('Cannot delete: No item ID is currently selected.')
        return false
      }

      const response = await api.post(url, {
        token: token,
        table: tableName,
        id: String(currentId)
      })

      if (response.data && response.data.status === 'success') {
        await Init()
        return true
      } else {
        throw new Error(response.data?.message || 'Unknown server error during deletion.')
      }
    } catch (err) {
      await showError(err)
      return false
    }
  }

  // 💾 Action 3: Unified Save (Insert or Update)
  const saveItem = async (): Promise<boolean> => {
    try {
      const api = useApi()
      const { url, token } = getApiContext('post-insertorupdate')

      // Clean up inputs and build a strong typed record object payload for D1
      const recordData: Record<string, any> = {}
      const blankInstance = new ModelConstructor()
      const itemKeys = Object.keys(blankInstance)

      itemKeys.forEach(key => {
        // Enforce fallback boundaries so we don't pass undefined values to SQLite queries
        recordData[key] = item.value[key] ?? null
      })

      const response = await api.post(url, {
        token: token,
        table: tableName,
        data: recordData
      })

      if (response.data && response.data.status === 'success') {
        await Init()
        return true
      } else {
        throw new Error(response.data?.message || 'Failed to save record.')
      }
    } catch (err) {
      await showError(err)
      return false
    }
  }
  // 💾 Action 4: GetDataOptions
  const getDataOptions = async (option: OptionalData): Promise<DataOption[]> => {
    try {
      const api = useApi()
      const token = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl // e.g. "https://your-worker.workers.dev"
      const response = await api.post(`${baseUrl}/api/optionalData`, {
        token: token,
        option: option
      })

      return response.data?.data || []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  return {
    items,
    item,
    listColumns,
    canCreate: dataState.canCreate,
    canDelete: dataState.canDelete,
    canSave: dataState.canSave,
    state: dataState.state,
    clearValidate,
    getValidate,
    stateCtrl: dataState.stateCtrl,
    onRowClick,
    onCreate,
    onDelete,
    onSave,
    Init,
    getAllItems,
    getDataOptions,
    assignInit
  }
}
