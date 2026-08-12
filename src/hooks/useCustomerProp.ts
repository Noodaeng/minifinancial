import { ref, computed } from 'vue'
import Customer from '../models/customer'
import { useCrudProp } from './useCrudProp'
import { MultiPortTypeSummary } from '../types/myTypes'
import { useApi } from '../services/api'
import { showError, currentDateTimeStr } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
export function useCustomerProp() {
  const sessionTypeSummaries = ref<MultiPortTypeSummary[]>([])
  const crud = useCrudProp<Customer, Customer>(
    'customerId',
    'customers',
    Customer,
    t => [
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
        label: t('Card_Id'),
        align: 'left',
        field: 'cardId',
        sortable: true
      },
      {
        name: 'name',
        required: true,
        label: t('Name'),
        align: 'left',
        field: 'name',
        sortable: true
      }
    ],
    undefined,
    undefined
  )

  const filter = ref('')

  const filteredRows = computed(() => {
    if (!filter.value) {
      return crud.items.value
    }

    const lowerFilter = filter.value.toLowerCase()

    return crud.items.value.filter((customer: Customer) => {
      return (
        String(customer.customerId).toLowerCase().includes(lowerFilter) ||
        String(customer.cardId).toLowerCase().includes(lowerFilter) ||
        String(customer.name).toLowerCase().includes(lowerFilter)
      )
    })
  })

  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateCustomer = () => {
    crud.onCreate()
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
  }
  const onInitCusSession = async () => {
    if (crud.item.value.customerId) {
      const result = await GetSessionTypesByCustomerId()
      sessionTypeSummaries.value = sessionFilter(result)
    }
  }
  const sessionFilter = (raw: MultiPortTypeSummary[]): MultiPortTypeSummary[] => {
    if (!raw || raw.length === 0) return []

    return raw.filter(r => {
      switch (r.portType) {
        case 1:
          return r.sessionType !== 5 // Added 'return' to explicitly pass the boolean evaluation
        default:
          return false // Changed from '[]' to 'false' to correctly exclude items from the filter
      }
    })
  }
  //+++++++++++++++++++Api+++++++++++++++++++
  async function GetSessionTypesByCustomerId(): Promise<MultiPortTypeSummary[]> {
    try {
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const api = useApi()
      const response = await api.post(`${baseUrl}/api/sessionRpt/getSessionSummaryByCustomerId`, {
        token: secretToken,
        customerId: crud.item.value.customerId
      })
      return response.data?.data || []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }
  return {
    ...crud,
    filter,
    filteredRows,
    sessionTypeSummaries,
    onFilter,
    onCreateCustomer,
    onInitCusSession
  }
}
