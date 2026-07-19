import { ref, computed } from 'vue' // 1. Bring in Vue's reactivity tools
import Broker from '../models/broker'
import { useCrudProp } from './useCrudProp'
import { currentDateTimeStr } from '../modules/appUtils'
export function useBrokerProp() {
  // Destructure what you need from the generic composable
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
  // 5. Spread all generic methods and merge your local overrides
  return {
    ...crud,
    filter,
    filteredRows,
    onFilter,
    onCreateBroker
  }
}
