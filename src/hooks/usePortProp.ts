import { ref, computed, watch, Ref } from 'vue'
import PortDto from '../models/portDto'
import Customer from '../models/customer'
import { useCrudProp } from './useCrudProp'
import { EInvestPortType } from '../types/myEnums'
import MyConfig from '../modules/myConfig'
import { useApi } from '../services/api'
import { showError } from '../modules/appUtils'

export function usePortProp() {
  const customers = ref<Customer[]>([])
  const filter = ref('')
  const portType: Ref<string | number | EInvestPortType> = ref(EInvestPortType.CashAndDeposits)
  // 1. Initialize our generic CRUD composable
  const crud = useCrudProp<PortDto>('portId', 'ports', PortDto, t => [
    {
      name: 'portId',
      required: true,
      label: t('Id'),
      align: 'left',
      field: 'portId',
      sortable: true
    },
    {
      name: 'customerId',
      required: true,
      label: t('Customer_Id'),
      align: 'left',
      field: 'customerId',
      sortable: true
    },
    {
      name: 'customerName',
      required: true,
      label: t('Customer_Name'),
      align: 'left',
      field: 'customerName',
      sortable: true
    },
    {
      name: 'description',
      required: true,
      label: t('Description'),
      align: 'left',
      field: 'description',
      sortable: true
    }
  ])
  crud.assignInit.value = (ports: PortDto[]) => {
    const filters = ports.filter(
      (port: PortDto) => Number(port.portType) === Number(portType.value)
    )
    if (filters && filters.length > 0) {
      Object.assign(crud.item.value, filters[0])
    } else {
      Object.assign(crud.item.value, new PortDto())
    }
  }
  // Helper method to look up names securely
  const findCustomerName = (cusId: string | number): string => {
    if (!Array.isArray(customers.value)) return '-'
    const match = customers.value.find(c => String(c.customerId) === String(cusId))
    return match?.name || '-'
  }

  // 2. Intercept and enrich the rows dynamically whenever the underlying items change
  const enrichedRows = computed<PortDto[]>(() => {
    const rawItems = crud.items.value || []
    return rawItems.map((port: PortDto) => {
      port.customerName = findCustomerName(port.customerId)
      return port
    })
  })

  // 3. Update filtering logic to look through the enriched rows and filter by portType
  const filteredRows = computed(() => {
    // Filter by the type passed to the composable first
    const typeMatchedPorts = enrichedRows.value.filter(
      (port: PortDto) => Number(port.portType) === Number(portType.value)
    )
    if (!filter.value) {
      return typeMatchedPorts
    }

    const lowerFilter = filter.value.toLowerCase()

    return typeMatchedPorts.filter((port: PortDto) => {
      return (
        String(port.portId).toLowerCase().includes(lowerFilter) ||
        String(port.customerId).toLowerCase().includes(lowerFilter) ||
        String(port.customerName).toLowerCase().includes(lowerFilter) ||
        String(port.description).toLowerCase().includes(lowerFilter)
      )
    })
  })

  const onFilter = (val: string) => {
    filter.value = val
  }

  // Intercept onRowClick to make sure the single active editing item gets its customerName too
  const onRowClick = (row: any) => {
    crud.onRowClick(row)
    if (crud.item.value) {
      crud.item.value.customerName = findCustomerName(crud.item.value.customerId)
    }
  }

  // Watch the underlying active item so if customerId changes manually in a dropdown, the name reflects instantly
  watch(
    () => crud.item.value?.customerId,
    newId => {
      if (crud.item.value && newId) {
        crud.item.value.customerName = findCustomerName(newId)
      }
    }
  )

  // +++++++ Call customers Api +++++++++++++++++++++++
  const getBaseUrl = () => {
    const secretToken = MyConfig.instance.AppConfig.AuthToken
    const baseUrl = MyConfig.instance.AppConfig.DbUrl
    return `${baseUrl}?token=${encodeURIComponent(secretToken)}&sheet=customers`
  }

  const getCustomers = async (): Promise<Customer[]> => {
    try {
      const api = useApi()
      const response = await api.get(getBaseUrl())

      // Defensively parse the Google Web App script response layout
      if (response.data && Array.isArray(response.data)) {
        return response.data
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data
      }
      return []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  const initCustomerList = async () => {
    customers.value = await getCustomers()
  }

  // 4. Overwrite the main Init method to combine the data fetching orchestrations smoothly
  const Init = async () => {
    try {
      // Step A: Load customers blueprint data mapping keys first
      //await initCustomerList()

      // Step B: Load the port records using your core crud workflow mechanics
      await crud.Init()

      // Step C: Ensure the initially selected default item (index [0]) has its text enriched
      if (crud.item.value) {
        crud.item.value.customerName = findCustomerName(crud.item.value.customerId)
      }
    } catch (err) {
      await showError(err)
    }
  }

  // 5. Spread all generic methods and merge your local overrides
  return {
    ...crud,
    Init, // Overridden initialization method
    onRowClick, // Overridden row click action handler
    filter,
    filteredRows,
    onFilter,
    initCustomerList,
    customers,
    portType
  }
}
