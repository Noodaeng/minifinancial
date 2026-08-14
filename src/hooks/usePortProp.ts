import { ref, computed, Ref } from 'vue'
import PortDto from '../models/portDto'
import Port from '../models/port'
import DataOption from '../models/dataOption'
import { useCrudProp } from './useCrudProp'
import { useApi } from '../services/api'
import { EPortType } from '../types/myEnums'
import { QSelectOption, PortTypeSummary } from '../types/myTypes'
import { i18n } from '../i18n'
import { showError, currentDateTimeStr, getAccountCategoryByPortType } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
export function usePortProp() {
  const rawOptions = ref<DataOption[]>([])
  const { t } = i18n.global
  const filter = ref('')
  const portType: Ref<string | number | EPortType> = ref(EPortType.CashAndDeposits)
  const isPortValid = ref(false)
  const portTypeSummaries = ref<PortTypeSummary[]>([])
  const portSessionSummaries = ref<PortTypeSummary[]>([])
  // 1. Initialize our generic CRUD composable
  const setItem = (ports: PortDto[]) => {
    const filter = ports.filter(p => p.portType == portType.value)
    if (filter && filter.length > 0) {
      Object.assign(crud.item.value, filter[0])
      isPortValid.value = true
    } else {
      Object.assign(crud.item.value, new PortDto())
      isPortValid.value = false
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
    isPortValid.value = row && row.portId
  }

  const onCreatePort = () => {
    crud.onCreate()
    crud.item.value.portType = Number(portType.value)
    crud.item.value.accountCategory = getAccountCategoryByPortType(Number(portType.value))
    crud.item.value.customerId = '0'
    crud.item.value.brokerId = '0'
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
    crud.item.value.status = 1
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
      //++++++
      portTypeSummaries.value = await getSessionTypesByPortType()
    } catch (err) {
      await showError(err)
    }
  }
  const updateSessionSummaries = async () => {
    portSessionSummaries.value = await getSessionTypesBreakdown()
  }

  // Compute distinct interest rates
  const periodGuides = computed(() => {
    const targetPortType = crud.item.value?.portType
    const term = crud.item.value?.paymentTerm
    const periods = (crud.items.value as PortDto[])
      .filter(p => p.portType === targetPortType && p.paymentTerm === term && p.period)
      .map(p => p.period)

    // Use Set to remove duplicates and sort numerically
    return [...new Set(periods)].sort((a, b) => a - b)
  })
  const paymentRateGuides = computed(() => {
    const targetPortType = crud.item.value?.portType
    const term = crud.item.value?.paymentTerm
    const period = crud.item.value?.period
    const interest = crud.item.value?.interest
    const rates = (crud.items.value as PortDto[])
      .filter(
        p =>
          p.portType === targetPortType &&
          p.paymentTerm === term &&
          p.period === period &&
          p.interest === interest &&
          p.paymentRate
      )
      .map(p => p.paymentRate)

    // Use Set to remove duplicates and sort numerically
    return [...new Set(rates)].sort((a, b) => a - b)
  })
  const descriptionGuides = computed(() => {
    const targetPortType = crud.item.value?.portType

    // 1. Count frequency of each description
    const counts = new Map<string, number>()

    ;(crud.items.value as PortDto[])
      .filter(p => p.portType === targetPortType && p.description)
      .forEach(p => {
        counts.set(p.description, (counts.get(p.description) || 0) + 1)
      })

    // 2. Get top 10 by popularity (frequency), then sort alphabetically
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
      .slice(0, 10) // Take top 10
      .map(([desc]) => desc) // Keep only the description text
      .sort((a, b) => a.localeCompare(b)) // Sort final 10 alphabetically
  })
  const interestGuides = computed(() => {
    const allInterests = (crud.items.value as PortDto[]).map(p => p.interest)

    // Use Set to remove duplicates and sort numerically
    return [...new Set(allInterests)].sort((a, b) => a - b)
  })

  // 5. Spread all generic methods and merge your local overrides
  //+++++++++++++++++++Api+++++++++++++++++++
  async function getSessionTypesByPortType(): Promise<PortTypeSummary[]> {
    try {
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const api = useApi()
      const response = await api.post(`${baseUrl}/api/sessionRpt/getSessionTypesByPortType`, {
        token: secretToken,
        portType: portType.value
      })
      return response.data?.data || []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }
  async function getSessionTypesBreakdown(): Promise<PortTypeSummary[]> {
    try {
      if (!crud.item.value.portId) return []
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const api = useApi()
      const response = await api.post(`${baseUrl}/api/sessionRpt/getSessionTypesBreakdown`, {
        token: secretToken,
        portId: crud.item.value.portId
      })
      return response.data?.data || []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }
  return {
    ...crud,
    Init, // Overridden initialization method
    onRowClick, // Overridden row click action handler
    filter,
    filteredRows,
    isPortValid,
    onFilter,
    initOtherList,
    rawOptionToQSelectOptions,
    onCreatePort,
    getSessionTypesByPortType,
    updateSessionSummaries,
    portType,
    portTypeSummaries,
    rawOptions,
    portSessionSummaries,
    interestGuides,
    descriptionGuides,
    periodGuides,
    paymentRateGuides
  }
}
