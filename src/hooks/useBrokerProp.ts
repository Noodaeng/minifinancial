import { ref, computed } from 'vue' // 1. Bring in Vue's reactivity tools
import Broker from '../models/broker'
import { useCrudProp } from './useCrudProp'
import { MultiPortTypeSummary } from '../types/myTypes'
import { useApi } from '../services/api'
import { showError, currentDateTimeStr } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
export function useBrokerProp() {
  // Destructure what you need from the generic composable
  const sessionTypeSummaries = ref<MultiPortTypeSummary[]>([])
  const crud = useCrudProp<Broker, Broker>(
    'brokerId',
    'brokers',
    Broker,
    t => [
      {
        name: 'brokerId',
        required: true,
        label: t('Id'),
        align: 'left',
        field: 'brokerId',
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

  // 2. Setup your local filter text state
  const filter = ref('')

  // 3. Implement the filteredRows computed property specifically for Customer
  const filteredRows = computed(() => {
    // crud.items.value contains your reactive array of Customers
    if (!filter.value) {
      return crud.items.value
    }

    const lowerFilter = filter.value.toLowerCase()

    return crud.items.value.filter((broker: Broker) => {
      // You now have explicit autocomplete & strict typing!
      // You can filter by specific properties instead of blanket Object.values:
      return (
        String(broker.brokerId).toLowerCase().includes(lowerFilter) ||
        String(broker.cardId).toLowerCase().includes(lowerFilter) ||
        String(broker.name).toLowerCase().includes(lowerFilter)
      )
    })
  })

  // 4. Overwrite or define the onFilter method locally
  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateBroker = () => {
    crud.onCreate()
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
  }
  const onInitBrokerSession = async () => {
    if (crud.item.value.brokerId) {
      const result = await GetSessionTypesByBrokerId()
      sessionTypeSummaries.value = sessionFilter(result)
    }
  }
  const sessionFilter = (raw: MultiPortTypeSummary[]): MultiPortTypeSummary[] => {
    if (!raw || raw.length === 0) return []

    return raw.filter(r => {
      switch (r.portType) {
        case 1:
          return r.sessionType === 5 // Added 'return' to explicitly pass the boolean evaluation
        default:
          return false // Changed from '[]' to 'false' to correctly exclude items from the filter
      }
    })
  }
  //+++++++++++++++++++Api+++++++++++++++++++
  async function GetSessionTypesByBrokerId(): Promise<MultiPortTypeSummary[]> {
    try {
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const api = useApi()
      const response = await api.post(`${baseUrl}/api/sessionRpt/getSessionSummaryByBrokerId`, {
        token: secretToken,
        brokerId: crud.item.value.brokerId
      })
      return response.data?.data || []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }
  // 5. Spread all generic methods and merge your local overrides
  return {
    ...crud,
    filter,
    filteredRows,
    sessionTypeSummaries,
    onFilter,
    onCreateBroker,
    onInitBrokerSession
  }
}
