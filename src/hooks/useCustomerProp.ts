import Customer from '../models/customer'
import { useCrudProp } from './useCrudProp'

export function useCustomerProp() {
  return useCrudProp<Customer>(
    'customerId', // The unique ID property key
    'customers', // The Google Sheet/DB dataset context name
    Customer, // Class constructor blueprint instantiation reference
    t => [
      // Translatable column template closure configuration
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
    ]
  )
}
