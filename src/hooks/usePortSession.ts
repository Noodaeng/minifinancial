import { ref, Ref, computed } from 'vue'
import { EPortType } from '../types/myEnums'
import { useCrudProp } from './useCrudProp'
import { showError, getSessionType, currentDateTimeStr } from '../modules/appUtils'
import Session from '../models/session'
import Port from '../models/port'
import SessionDto from '../models/sessionDto'
import MyConfig from '../modules/myConfig'
import { useApi } from '../services/api'
export function usePortSession() {
  const portId = ref('')
  const portType: Ref<string | number | EPortType> = ref(EPortType.CashAndDeposits)
  const crud = useCrudProp<Session, Session>(
    'sessionId',
    'sessions',
    Session,
    t => [
      {
        name: 'createOn',
        required: true,
        label: t('Create_on'),
        align: 'left',
        field: 'createOn',
        sortable: true
      },
      {
        name: 'itemNo',
        required: true,
        label: t('No_'),
        align: 'left',
        field: 'itemNo',
        sortable: true
      },
      {
        name: 'sessionId',
        required: true,
        label: t('Id'),
        align: 'left',
        field: 'sessionId',
        sortable: true
      },

      {
        name: 'sessionType',
        required: true,
        label: t('Type'),
        align: 'left',
        field: 'sessionType',
        format: (val: number) => getSessionType(portType.value, val),
        sortable: true
      },
      {
        name: 'amount',
        required: true,
        label: t('Amount'),
        align: 'left',
        field: 'amount',
        sortable: true
      }
    ],
    undefined,
    undefined
  )

  // +++++++ Init +++++++++++++++++++++++
  const initSessions = async () => {
    try {
      crud.stateCtrl(true, false, false, false)
      crud.items.value = await getPortSessions()

      if (crud.clearValidate.value) {
        crud.clearValidate.value()
      }

      if (crud.items.value && crud.items.value.length > 0) {
        Object.assign(crud.item.value, crud.items.value[0])
        crud.stateCtrl(false, true, false, false)
      }
    } catch (err) {
      await showError(err)
    }
  }
  const filter = ref('')

  const filteredRows = computed(() => {
    const dto = getDto(crud.items.value, Number(portType.value))
    if (!filter.value) {
      return dto
    }

    const lowerFilter = filter.value.toLowerCase()

    return dto.filter((session: Session) => {
      return (
        String(session.sessionId).toLowerCase().includes(lowerFilter) ||
        String(session.createOn).toLowerCase().includes(lowerFilter) ||
        String(session.amount).toLowerCase().includes(lowerFilter) ||
        String(getSessionType(portType.value, session.sessionType))
          .toLowerCase()
          .includes(lowerFilter)
      )
    })
  })

  const getDto = (sessions: Session[], pType: number): SessionDto[] => {
    if (!sessions || sessions.length === 0) return []

    // Create a shallow copy before sorting to avoid mutating the original array
    const sortedSessions = [...sessions].sort((a, b) => {
      const dateA = a.createOn ? new Date(a.createOn).getTime() : 0
      const dateB = b.createOn ? new Date(b.createOn).getTime() : 0
      return dateA - dateB // Ascending order (oldest first)
    })

    let item = 0

    return sortedSessions.map(s => {
      if (pType === 1) {
        item = s.sessionType === 0 || s.sessionType === 4 ? 0 : item + 1
      } else {
        item++
      }

      // Instantiates SessionDto correctly while preserving class methods if present
      const dto = new SessionDto()
      Object.assign(dto, s, { itemNo: item })
      return dto
    })
  }

  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateSession = (sessionType: number, port: Port) => {
    if (!port) return
    crud.onCreate()
    crud.item.value.sessionId = ''
    crud.item.value.portId = portId.value
    crud.item.value.sessionType = sessionType
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
    if (port.portType === 1) {
      if (sessionType === 0) crud.item.value.amount = port.amount
      if (sessionType === 1) crud.item.value.amount = port.paymentRate
      if (sessionType === 2) crud.item.value.amount = port.amount * (port.interest / 100)
      if (sessionType === 5) crud.item.value.amount = port.paymentRate
      //console.log('!!!!!---sse----', crud.item.value.sessionType)
    }
  }
  //+++++++++api+++++++++++++++++
  // 🔍 Action 1: Get All Data

  const getPortSessions = async (): Promise<Session[]> => {
    try {
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl // e.g. "https://your-worker.workers.dev"
      const api = useApi()

      const response = await api.post(`${baseUrl}/api/getSessions`, {
        token: secretToken,
        portId: portId.value
      })

      return response.data?.data || []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  return {
    ...crud,
    portId,
    filter,
    filteredRows,
    portType,
    onFilter,
    initSessions,
    onCreateSession
  }
}
