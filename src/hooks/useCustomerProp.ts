import { ref, computed } from 'vue'
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

  return { customers, customer, listColumns, filteredRows, Init, getAllCustomer }
}
