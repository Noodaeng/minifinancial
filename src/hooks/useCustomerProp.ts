import { ref, computed } from 'vue'
import Customer from '../models/customer'
import { useCrudProp } from './useCrudProp'

export function useCustomerProp() {
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

  return {
    ...crud,
    filter,
    filteredRows,
    onFilter
  }
}
