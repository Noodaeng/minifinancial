import { ref, computed, Ref } from 'vue'
import PortDto from '../models/portDto'
import Port from '../models/port'
import DataOption from '../models/dataOption'
import { useCrudProp } from './useCrudProp'
import { EInvestPortType } from '../types/myEnums'
import { QSelectOption } from '../types/myTypes'
import { i18n } from '../i18n'
import { showError } from '../modules/appUtils'

export function usePortProp() {
  const rawOptions = ref<DataOption[]>([])
  const { t } = i18n.global
  const filter = ref('')
  const portType: Ref<string | number | EInvestPortType> = ref(EInvestPortType.CashAndDeposits)
  // 1. Initialize our generic CRUD composable
  const setItem = (ports: PortDto[]) => {
    const filter = ports.filter(p => p.portType == portType.value)
    if (filter && filter.length > 0) {
      Object.assign(crud.item.value, filter[0])
    } else {
      Object.assign(crud.item.value, new PortDto())
    }
  }
  const crud = useCrudProp<PortDto, Port>(
    'portId',
    'ports',
    PortDto,
    t => [
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
    ],
    Port,
    setItem
  )

  const rawOptionToQSelectOptions = (source: string): QSelectOption[] => {
    const opt = (rawOptions.value || [])
      .filter(c => c.Id !== undefined && c.name !== null && c.source === source)
      .map(c => ({
        value: c.Id,
        label: c.name || 'Unnamed' // Fallback in case name is missing/blank
      }))
    opt.push({ value: '0', label: t('Unknow_name') })
    return opt
  }

  // 3. Update filtering logic to look through the enriched rows and filter by portType
  const filteredRows = computed(() => {
    // Filter by the type passed to the composable first
    const typeMatchedPorts = crud.items.value.filter(
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
  }

  const onCreatePort = () => {
    crud.onCreate()
    crud.item.value.portType = Number(portType.value)
    crud.item.value.customerId = '0'
    crud.item.value.brokerId = '0'
  }
  // +++++++ Call other Api +++++++++++++++++++++++

  const initOtherList = async () => {
    rawOptions.value = await crud.getDataOptions('custBrokerOptions')
  }

  // 4. Overwrite the main Init method to combine the data fetching orchestrations smoothly
  const Init = async () => {
    try {
      // Step A: Load customers blueprint data mapping keys first
      //await initCustomerList()

      // Step B: Load the port records using your core crud workflow mechanics
      await crud.Init()
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
    initOtherList,
    rawOptionToQSelectOptions,
    onCreatePort,
    portType,
    rawOptions
  }
}
