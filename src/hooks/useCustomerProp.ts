import { ref, computed, watch } from 'vue'
import { useApi } from '../services/api'
import { showError } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import Customer from '../models/customer'
import { QTableColumn } from 'quasar'
import { i18n } from '../i18n'
export function useCustomerProp() {
  const { t } = i18n.global
  const filter = ref('')
  const customers = ref<Array<Customer>>([])
  const customer = ref(new Customer())

  watch(
    () => ({ ...customer.value }),
    (newVal, oldVal) => {
      if (newVal.customerId != oldVal.customerId) return
      console.log('Customer changed deeply!', newVal, oldVal)
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
      customers.value = await getAllCustomer()
      if (customers.value && customers.value.length > 0) {
        Object.assign(customer.value, customers.value[0])
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

      if (selected) Object.assign(customer.value, selected)
    }
  }
  const onFilter = (val: string) => {
    filter.value = val
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

  return {
    customers,
    customer,
    listColumns,
    filteredRows,
    onRowClick,
    onFilter,
    Init,
    getAllCustomer
  }
}
