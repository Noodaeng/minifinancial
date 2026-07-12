import { ref, computed } from 'vue' // 1. Bring in Vue's reactivity tools
import Customer from '../models/customer'
import { useCrudProp } from './useCrudProp'

export function useCustomerProp() {
  // Destructure what you need from the generic composable
  const crud = useCrudProp<Customer>('customerId', 'customers', Customer, t => [
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
    { name: 'name', required: true, label: t('Name'), align: 'left', field: 'name', sortable: true }
  ])

  // 2. Setup your local filter text state
  const filter = ref('')

  // 3. Implement the filteredRows computed property specifically for Customer
  const filteredRows = computed(() => {
    // crud.items.value contains your reactive array of Customers
    if (!filter.value) {
      return crud.items.value
    }

    const lowerFilter = filter.value.toLowerCase()

    return crud.items.value.filter((customer: Customer) => {
      // You now have explicit autocomplete & strict typing!
      // You can filter by specific properties instead of blanket Object.values:
      return (
        String(customer.customerId).toLowerCase().includes(lowerFilter) ||
        String(customer.cardId).toLowerCase().includes(lowerFilter) ||
        String(customer.name).toLowerCase().includes(lowerFilter)
      )
    })
  })

  // 4. Overwrite or define the onFilter method locally
  const onFilter = (val: string) => {
    filter.value = val
  }

  // 5. Spread all generic methods and merge your local overrides
  return {
    ...crud,
    filter,
    filteredRows,
    onFilter
  }
}
