import { ref, watch } from 'vue'
import { useApi } from '../services/api'
import { showError, confirmDelete } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import { QTableColumn, useQuasar } from 'quasar'
import { i18n } from '../i18n'
import { Action, FuncBoolAsync, ActionSingle } from '../types/myTypes'
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
  const $q = useQuasar()
  const { t } = i18n.global

  const items = ref<T[]>([]) as any // Explicit casting for safety
  const item = ref<T>(new ModelConstructor())
  const clearValidate = ref<Action | undefined>(undefined)
  const justSave = ref(false)
  const assignInit = ref<ActionSingle<T[]> | undefined>(undefined)

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

      // Fixed: Properly check and invoke the assignInit ref
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
  // +++++++ Utils +++++++++++++++++++++++

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
    // 💡 Removed the C# style queueMicrotask unless explicitly needed for tick adjustments
    if (item.value && item.value[idKey as string] !== '') {
      confirmDelete($q, String(item.value[idKey as string]), deleteItem)
    }
  }

  const onSave = async () => {
    if (!item.value) return

    let success = false

    if (dataState.state.value === EDataState.ValidEdit) {
      // 💡 Execute our freshly built generic update function
      success = await updateItem()
    } else if (dataState.state.value === EDataState.ValidNew) {
      // 💡 Placeholder for your insert logic (uses similar layout configuration structural payload)
      success = await insertItem()
    }

    if (success) {
      justSave.value = true
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
  // ❌ Action 1: Delete an existing record
  const deleteItem = async (): Promise<boolean> => {
    try {
      const api = useApi()

      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const currentId = item.value[idKey as string]

      if (!currentId) {
        console.warn('Cannot delete: No item ID is currently selected.')
        return false
      }

      const payload = {
        token: secretToken,
        sheet: sheetName,
        action: 'delete',
        id: currentId
      }

      console.log('Sending delete request to Google Apps Script:', payload)

      const response = await api.post(baseUrl, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      })

      if (response.data && response.data.status === 'success') {
        await Init() // Trigger a visual grid refresh upon success
        return true
      } else {
        throw new Error(response.data?.message || 'Unknown server error during deletion.')
      }
    } catch (err) {
      await showError(err)
      return false
    }
  }

  // ➕ Action 2: Create a brand new record (Insert)
  const insertItem = async (): Promise<boolean> => {
    try {
      const api = useApi()

      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl

      // ดึงโครงสร้างลำดับ Keys จาก Model
      const blankInstance = new ModelConstructor()
      const itemKeys = Object.keys(blankInstance)

      // แมปข้อมูลเป็น Flat Array ตามลำดับหัวตารางบน Sheets
      // บังคับ Index 0 (Column A) เป็นค่าว่าง เพื่อให้ฝั่ง Apps Script รัน Auto-Increment ID ให้เอง
      const newRowArray = itemKeys.map((key, index) => {
        if (index === 0) return ''
        return item.value[key] ?? ''
      })

      const payload = {
        token: secretToken,
        sheet: sheetName,
        action: 'insert',
        data: newRowArray // ส่งเป็น Array ตามเงื่อนไขการใช้ appendRow ของ Apps Script
      }

      console.log('Sending insert request to Google Apps Script:', payload)

      const response = await api.post(baseUrl, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      })

      if (response.data && response.data.status === 'success') {
        await Init() // Reload table rows view
        return true
      } else {
        throw new Error(response.data?.message || 'Failed to insert new record.')
      }
    } catch (err) {
      await showError(err)
      return false
    }
  }

  // ✏️ Action 3: Modify an existing record (Update)
  const updateItem = async (): Promise<boolean> => {
    try {
      const api = useApi()

      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const currentId = item.value[idKey as string]

      if (!currentId) {
        console.warn('Cannot update: No item ID is currently selected.')
        return false
      }

      // 💡 [จุดปรับปรุงสำคัญ]: เปลี่ยนจาก Array มาเป็น Object (Key-Value)
      // วนลูปสร้าง Object ใหม่เฉพาะฟิลด์ที่มีค่า และข้ามคอลัมน์ที่เป็น ID (idKey) เพื่อความปลอดภัย
      const updatedDataObject: Record<string, any> = {}

      const blankInstance = new ModelConstructor()
      const itemKeys = Object.keys(blankInstance)

      itemKeys.forEach((key, index) => {
        // เงื่อนไข:
        // 1. ห้ามส่ง ID กลับไปแก้ไข (index 0 หรือ key ที่ตรงกับ idKey)
        // 2. ป้องกันฟิลด์ที่ไม่มีชื่อหัวตาราง หรือค่าที่เป็น undefined/null (ให้เปลี่ยนเป็นค่าว่าง "")
        if (index > 0 && key !== idKey) {
          updatedDataObject[key] = item.value[key] ?? ''
        }
      })

      const payload = {
        token: secretToken,
        sheet: sheetName,
        action: 'update',
        id: currentId,
        data: updatedDataObject // 👈 ส่งเป็น Object { หัวตาราง: ค่าใหม่ } ไปที่สคริปต์ตัวใหม่
      }

      console.log('Sending update request to Google Apps Script:', payload)

      const response = await api.post(baseUrl, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      })

      if (response.data && response.data.status === 'success') {
        await Init() // Reload grid rows automatically
        return true
      } else {
        throw new Error(response.data?.message || 'Failed to update record.')
      }
    } catch (err) {
      await showError(err)
      return false
    }
  }
  // const deleteItem = async (): Promise<boolean> => {
  //   try {
  //     const api = useApi()

  //     // 1. Extract the raw configuration variables
  //     const secretToken = MyConfig.instance.AppConfig.AuthToken
  //     const baseUrl = MyConfig.instance.AppConfig.DbUrl
  //     const currentId = item.value[idKey as string]

  //     if (!currentId) {
  //       console.warn('Cannot delete: No item ID is currently selected.')
  //       return false
  //     }

  //     // 2. Build the payload schema your Google Apps Script doPost expects
  //     const payload = {
  //       token: secretToken,
  //       sheet: sheetName,
  //       action: 'delete',
  //       id: currentId
  //     }

  //     console.log('Sending delete request to Google Apps Script:', payload)

  //     // 3. Trigger the network execution via POST
  //     //const response = await api.post(baseUrl, payload)

  //     const response = await api.post(baseUrl, JSON.stringify(payload), {
  //       headers: {
  //         'Content-Type': 'text/plain;charset=utf-8'
  //       }
  //     })

  //     // 4. Verify the response status returned by createJsonResponse
  //     if (response.data && response.data.status === 'success') {
  //       await Init() // Trigger a visual grid refresh upon success
  //       return true
  //     } else {
  //       // Handles programmatic errors (e.g., ID not found in sheet)
  //       throw new Error(response.data?.message || 'Unknown server error during deletion.')
  //     }
  //   } catch (err) {
  //     await showError(err)
  //     return false
  //   }
  // }
  // // ➕ Action 1: Create a brand new record (Insert)
  // const insertItem = async (): Promise<boolean> => {
  //   try {
  //     const api = useApi()

  //     const secretToken = MyConfig.instance.AppConfig.AuthToken
  //     const baseUrl = MyConfig.instance.AppConfig.DbUrl

  //     // Dynamically discover the strict property layout order straight from the model blueprint
  //     const blankInstance = new ModelConstructor()
  //     const itemKeys = Object.keys(blankInstance)

  //     // Maps the user inputs into a flat array matching the model structure perfectly
  //     // Column A ([0]) is forced to an empty string because the App Script generates the auto-increment ID
  //     const newRowArray = itemKeys.map((key, index) => {
  //       if (index === 0) return '' // Column A auto-increment placeholder
  //       return item.value[key] ?? ''
  //     })

  //     const payload = {
  //       token: secretToken,
  //       sheet: sheetName,
  //       action: 'insert',
  //       data: newRowArray
  //     }

  //     console.log('Sending insert request to Google Apps Script:', payload)

  //     // Using text/plain header trick to bypass CORS checks
  //     const response = await api.post(baseUrl, JSON.stringify(payload), {
  //       headers: {
  //         'Content-Type': 'text/plain;charset=utf-8'
  //       }
  //     })

  //     if (response.data && response.data.status === 'success') {
  //       await Init() // Reload table rows view
  //       return true
  //     } else {
  //       throw new Error(response.data?.message || 'Failed to insert new record.')
  //     }
  //   } catch (err) {
  //     await showError(err)
  //     return false
  //   }
  // }

  // // ✏️ Action 2: Modify an existing record (Update)
  // const updateItem = async (): Promise<boolean> => {
  //   try {
  //     const api = useApi()

  //     const secretToken = MyConfig.instance.AppConfig.AuthToken
  //     const baseUrl = MyConfig.instance.AppConfig.DbUrl
  //     const currentId = item.value[idKey as string]

  //     if (!currentId) {
  //       console.warn('Cannot update: No item ID is currently selected.')
  //       return false
  //     }

  //     // Safely structure keys out of the constructor template sequence
  //     const blankInstance = new ModelConstructor()
  //     const itemKeys = Object.keys(blankInstance)
  //     const updatedRowArray = itemKeys.map(key => item.value[key] ?? '')

  //     const payload = {
  //       token: secretToken,
  //       sheet: sheetName,
  //       action: 'update',
  //       id: currentId,
  //       data: updatedRowArray
  //     }

  //     console.log('Sending update request to Google Apps Script:', payload)

  //     // Using text/plain header trick to bypass CORS checks
  //     const response = await api.post(baseUrl, JSON.stringify(payload), {
  //       headers: {
  //         'Content-Type': 'text/plain;charset=utf-8'
  //       }
  //     })

  //     if (response.data && response.data.status === 'success') {
  //       await Init() // Reload grid rows automatically
  //       return true
  //     } else {
  //       throw new Error(response.data?.message || 'Failed to update record.')
  //     }
  //   } catch (err) {
  //     await showError(err)
  //     return false
  //   }
  // }
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
    assignInit
  }
}
