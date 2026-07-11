import { ref, computed, watch } from 'vue'
import { useApi } from '../services/api'
import { showError, confirmDelete } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import { QTableColumn } from 'quasar'
import { i18n } from '../i18n'
import { Action, FuncBoolAsync } from '../types/myTypes'
import { useDataState } from './useDataState'
import { EDataState } from '@/types/myEnums'

// Define a structural constraint for the generic type T.
// We guarantee T has an identifier field and can be instantiated anew.
interface BaseEntity {
  [key: string]: any
}

export function useCrudProp<T extends BaseEntity>(
  idKey: keyof T,
  sheetName: string,
  ModelConstructor: new () => T,
  columnsConfig: (t: (key: string) => string) => QTableColumn[]
) {
  const { t } = i18n.global
  const filter = ref('')
  const items = ref<T[]>([]) as any // Explicit casting for safety
  const item = ref<T>(new ModelConstructor())
  const clearValidate = ref<Action | undefined>(undefined)
  const justSave = ref(false)

  const getValidate = ref<FuncBoolAsync>(async () => {
    return false
  })
  const dataState = useDataState()

  // Watch for deep object mutations
  watch(
    () => ({ ...item.value }),
    async (newVal, oldVal) => {
      // Access the identity key generically
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
      if (items.value && items.value.length > 0) {
        Object.assign(item.value, items.value[0])
        dataState.stateCtrl(false, true, false, false)
      }
    } catch (err) {
      await showError(err)
    }
  }

  // +++++++ Utils +++++++++++++++++++++++
  const filteredRows = computed(() => {
    if (!filter.value) {
      return items.value
    }
    const lowerFilter = filter.value.toLowerCase()
    return items.value.filter((row: any) =>
      Object.values(row).some(value => String(value).toLowerCase().includes(lowerFilter))
    )
  })

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

  const onFilter = (val: string) => {
    filter.value = val
  }

  const onCreate = () => {
    Object.assign(item.value, new ModelConstructor())
    dataState.stateCtrl(false, false, false, true)
  }

  const onDelete = () => {
    // 💡 Removed the C# style queueMicrotask unless explicitly needed for tick adjustments
    if (item.value && item.value[idKey as string] !== '') {
      confirmDelete(String(item.value[idKey as string]), deleteItem)
    }
  }

  const onSave = async () => {
    if (item.value) {
      if (dataState.state.value === EDataState.ValidEdit) {
        // Run edit API save here...
      } else if (dataState.state.value === EDataState.ValidNew) {
        // Run create API save here...
      }
      justSave.value = true
      await Init()
    }
  }

  // +++++++ Call Api +++++++++++++++++++++++
  const getBaseUrl = () => {
    const secretToken = MyConfig.instance.AppConfig.AuthToken
    const baseUrl = MyConfig.instance.AppConfig.DbUrl
    return `${baseUrl}?token=${encodeURIComponent(secretToken)}&sheet=${sheetName}`
  }

  const getAllItems = async (): Promise<T[]> => {
    try {
      const api = useApi()
      const response = await api.get(getBaseUrl())
      return response.data || []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  const deleteItem = async (): Promise<boolean> => {
    try {
      const api = useApi()
      console.log('Deleting item via endpoint:', api, getBaseUrl())
      // Example implementation wrapper execution:
      // await api.delete(getBaseUrl() + `&id=${item.value[idKey]}`)
      await Init() // Trigger refresh inside the confirmation promise callback execution
      return true
    } catch (err) {
      await showError(err)
      return false
    }
  }

  return {
    items,
    item,
    listColumns,
    filteredRows,
    canCreate: dataState.canCreate,
    canDelete: dataState.canDelete,
    canSave: dataState.canSave,
    state: dataState.state,
    clearValidate,
    getValidate,
    onRowClick,
    onFilter,
    onCreate,
    onDelete,
    onSave,
    Init,
    getAllItems
  }
}
