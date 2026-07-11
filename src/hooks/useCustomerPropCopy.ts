import { ref, computed, watch } from 'vue'
import { useApi } from '../services/api'
import { showError, confirmDelete } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import Customer from '../models/customer'
import { QTableColumn } from 'quasar'
import { i18n } from '../i18n'
import { Action, FuncBoolAsync } from '../types/myTypes'
import { useDataState } from './useDataState'
import { EDataState } from '@/types/myEnums'
export function useCustomerPropCopy() {
  const { t } = i18n.global
  const filter = ref('')
  const customers = ref<Array<Customer>>([])
  const customer = ref(new Customer())
  const clearValidate = ref<Action | undefined>(undefined)
  const justSave = ref(false)

  const getValidate = ref<FuncBoolAsync>(async () => {
    return false
  })
  const dataState = useDataState()
  watch(
    () => ({ ...customer.value }),
    async (newVal, oldVal) => {
      if (newVal.customerId != oldVal.customerId) {
        if (clearValidate.value) {
          clearValidate.value()
          console.log('1---clear----******checkvalid---->')
          justSave.value = false
        }
        return
      } else if (justSave.value) {
        justSave.value = false
        return
      } else {
        const valid = await getValidate.value()
        console.log('2---checkvalid---->')
        dataState.stateCtrl(false, false, valid, false)
      }
      //console.log('Customer changed deeply!', newVal, oldVal)
    }
  )
  const listColumns = ref<Array<QTableColumn>>([
    {
      name: 'customerId',
      required: true,
      label: t('Id'),
      align: 'left',
      field: 'customerId',
      sortable: true
    },
    {
      name: 'cardId',
      required: true,
      label: t('Card Id'),
      align: 'left',
      field: 'cardId',
      sortable: true
    },
    {
      name: 'Name',
      required: true,
      label: t('Name'),
      align: 'left',
      field: 'name',
      sortable: true
    }
  ])
  //+++++++Init+++++++++++++++++++++++
  const Init = async () => {
    try {
      dataState.stateCtrl(true, false, false, false)
      customers.value = await getAllCustomer()
      if (clearValidate.value) {
        clearValidate.value()
      }
      if (customers.value && customers.value.length > 0) {
        Object.assign(customer.value, customers.value[0])
        dataState.stateCtrl(false, true, false, false)
      }
    } catch (err) {
      await showError(err)
    }
  }
  //+++++++Utils+++++++++++++++++++++++
  const filteredRows = computed(() => {
    if (!filter.value) {
      return customers.value
    }
    const lowerFilter = filter.value.toLowerCase()
    return customers.value.filter(row =>
      Object.values(row).some(value => String(value).toLowerCase().includes(lowerFilter))
    )
  })

  //+++++++Event handling+++++++++++++++++
  const onRowClick = (row: any) => {
    if (row) {
      const cusId = (row as Customer).customerId
      const selected = customers.value.find(c => c.customerId == cusId)

      if (selected) {
        Object.assign(customer.value, selected)
        dataState.stateCtrl(false, true, false, false)
      }
    }
  }
  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreate = () => {
    Object.assign(customer.value, new Customer())
    dataState.stateCtrl(false, false, false, true)
  }
  const onDelete = () => {
    queueMicrotask(async () => {
      if (customer.value && customer.value.customerId != '') {
        confirmDelete(customer.value.customerId, deleteCustomer)
        await Init()
      }
    })
  }
  const onSave = () => {
    queueMicrotask(async () => {
      if (customer.value) {
        if (dataState.state.value == EDataState.ValidEdit) {
        } else if (dataState.state.value == EDataState.ValidNew) {
        }
        justSave.value = true
        await Init()
      }
    })
  }
  //+++++++Call Api+++++++++++++++++++++++
  const getAllCustomer = async (): Promise<Customer[]> => {
    try {
      const api = useApi()
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl // ลิงก์ที่ลงท้ายด้วย /exec

      // 💡 ส่งผ่าน URL Parameter เพื่อให้ Google Apps Script ไปเรียกใช้ ฟังก์ชัน doGet(e)
      const finalUrl = `${baseUrl}?token=${encodeURIComponent(secretToken)}&sheet=customers`

      const response = await api.get(finalUrl)

      // ดึงข้อมูลมาใช้งาน (ปกติ axios/api wrapper มักจะแปลง json ให้แล้วใน response.data)
      const output = response.data
      console.log('Customer output data:', output)
      return output
    } catch (err) {
      await showError(err)
      return []
    }
  }
  const deleteCustomer = async (): Promise<boolean> => {
    try {
      const api = useApi()
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl // ลิงก์ที่ลงท้ายด้วย /exec

      // 💡 ส่งผ่าน URL Parameter เพื่อให้ Google Apps Script ไปเรียกใช้ ฟังก์ชัน doGet(e)
      const finalUrl = `${baseUrl}?token=${encodeURIComponent(secretToken)}&sheet=customers`

      // const response = await api.get(finalUrl)

      // // ดึงข้อมูลมาใช้งาน (ปกติ axios/api wrapper มักจะแปลง json ให้แล้วใน response.data)
      // const output = response.data
      console.log('Customer output data:', api, finalUrl)
      return true
    } catch (err) {
      await showError(err)
      return false
    }
  }

  return {
    customers,
    customer,
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
    getAllCustomer
  }
}
