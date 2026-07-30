import { ref, Ref, computed } from 'vue'
import { PortDetail, Action } from '../types/myTypes'
import { EInvestPortType } from '../types/myEnums'
import { useCrudProp } from './useCrudProp'
import { showError, getSessionType, currentDateTimeStr } from '../modules/appUtils'
import Session from '../models/session'
import MyConfig from '../modules/myConfig'
import PortDto from '../models/portDto'
import { i18n } from '../i18n'
import { useApi } from '../services/api'
export function usePortSession() {
  const portId = ref('')
  const portType: Ref<string | number | EInvestPortType> = ref(EInvestPortType.CashAndDeposits)
  const sessionType = ref(0)
  const crud = useCrudProp<Session, Session>(
    'sessionId',
    'sessions',
    Session,
    t => [
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
        name: 'creditPortId',
        required: true,
        label: t('Credit_Port_Id'),
        align: 'left',
        field: 'creditPortId',
        sortable: true
      },
      {
        name: 'debitPortId',
        required: true,
        label: t('Debit_Port_Id'),
        align: 'left',
        field: 'debitPortId',
        sortable: true
      }
    ],
    undefined,
    undefined
  )
  const { t } = i18n.global
  const sessionClicks = ref<(Action | null | undefined)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ])

  const getPortSessionInfo = (subType: number): PortDetail[] => {
    switch (Number(portType.value)) {
      case 1:
        return [
          {
            enabled: true,
            visible: true,
            description: t('LoanIssued'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('LoanRepayment'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('InterestAccrual'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('BadDebtWriteOff'),
            iconName: 'mdi-cash-remove',
            actClick: () => sessionClicks.value[3]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('ReFinance'),
            iconName: 'mdi-cash-sync',
            actClick: () => sessionClicks.value[4]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('BrokerPayment'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[5]?.()
          }
        ]
      case 2:
        return [
          {
            enabled: true,
            visible: true,
            description: t('SecurityPurchase'),
            iconName: 'mdi-cash-100',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('SecuritySale'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[1]?.()
          },

          {
            enabled: true,
            visible: true,
            description: t('CouponPayment'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('FairValueAdjustment'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
      case 3:
        return [
          {
            enabled: true,
            visible: true,
            description: t('EquityPurchase'),
            iconName: 'mdi-network-pos',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('EquitySale'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('DividendReceived'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('EquityMethodAdjustment'),
            iconName: 'mdi-cash-sync',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
      case 4:
        return [
          {
            enabled: subType == 0,
            visible: true,
            description: t('RealEstatePurchase'),
            iconName: 'mdi-home-group',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enabled: subType == 0,
            visible: true,
            description: t('RentalIncome'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enabled: subType == 1,
            visible: true,
            description: t('MutualFundInvestment'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enabled: subType == 1,
            visible: true,
            description: t('DisposalGain'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[3]?.()
          },
          {
            enabled: subType == 1,
            visible: true,
            description: t('DisposalLoss'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[4]?.()
          },
          {
            enabled: subType == 2,
            visible: true,
            description: t('SavingSharePayment'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[5]?.()
          },
          {
            enabled: subType == 2,
            visible: true,
            description: t('SavingShareIncome'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[6]?.()
          },
          {
            enabled: subType == 3,
            visible: true,
            description: t('InsurancePremium'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[7]?.()
          },
          {
            enabled: subType == 3,
            visible: true,
            description: t('InsuranceBenefit'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[8]?.()
          }
        ]

      default:
        return [
          {
            enabled: true,
            visible: true,
            description: t('Deposit'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('Withdrawal'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('InterestIncome'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enabled: true,
            visible: true,
            description: t('Transfer'),
            iconName: 'mdi-cash-refund',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
    }
  }
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
    if (!filter.value) {
      return crud.items.value
    }

    const lowerFilter = filter.value.toLowerCase()

    return crud.items.value.filter((session: Session) => {
      return (
        String(session.sessionId).toLowerCase().includes(lowerFilter) ||
        String(session.creditPortId).toLowerCase().includes(lowerFilter) ||
        String(session.debitPortId).toLowerCase().includes(lowerFilter) ||
        String(getSessionType(portType.value, session.sessionType))
          .toLowerCase()
          .includes(lowerFilter)
      )
    })
  })
  const filteredCreditRows = (ports: PortDto[], port: PortDto, sesType: number): any[] => {
    if (!crud.items.value || (crud.items.value as PortDto[]).length <= 0) return []
    const subType = Number(port.portSubType)
    switch (Number(portType.value)) {
      case 1: // สินเชื่อและเงินให้กู้
        switch (subType) {
          case 1: // เงินกู้ธุรกิจ
          default: // เงินกู้บุคคล
            switch (sesType) {
              case 1: // รับชำระคืน
                return [port]
              case 2: // ดอกเบี้ยค้างรับ
                return [port]
              case 3: // ตัดหนี้สูญ
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
              case 4: // รีไฟแนนซ์
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
              case 5: //จ่ายค่านายหน้า
                return [port]
              default: // ปล่อยกู้
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
            }
        }
      case 2: // การลงทุนในตราสาร
        switch (subType) {
          case 1: // หุ้นกู้เอกชน
            switch (sesType) {
              case 1: // ขายพันธบัตร
              case 2: // รับคูปอง
              case 3: // ปรับมูลค่ายุติธรรม
              default: // ซื้อพันธบัตร
            }
          default: // พันธบัตรรัฐบาล
            switch (sesType) {
              case 1: // ขายพันธบัตร
              case 2: // รับคูปอง
              case 3: // ปรับมูลค่ายุติธรรม
              default: // ซื้อพันธบัตร
            }
        }
      case 3: // การลงทุนในหุ้น/หุ้น
        switch (subType) {
          case 1: // หุ้นส่วน/ทุนในกิจการที่ไม่จดทะเบียน
            switch (sesType) {
              case 1: // ขายหุ้น
              case 2: // รับเงินปันผล
              case 3: // ปรับตามวิธีส่วนได้เสีย
              default: // ซื้อหุ้น
            }
          default: // หุ้นสามัญที่จดทะเบียนในตลาดหลักทรัพย์
            switch (sesType) {
              case 1: // ขายหุ้น
              case 2: // รับเงินปันผล
              case 3: // ปรับตามวิธีส่วนได้เสีย
              default: // ซื้อหุ้น
            }
        }
      case 4: // อื่น ๆ
        switch (subType) {
          case 1: // กองทุนรวม
            switch (sesType) {
              case 2: // ลงทุนกองทุนรวม
              case 3: // กำไรจากการจำหน่าย
              case 4: // ขาดทุนจากการจำหน่าย
            }
          case 2: // การเล่นแชร์
            switch (sesType) {
              case 5: // จ่ายค่า แชร์
              case 6: // รับค่า แชร์
            }
          case 3: // การซื้อประกัน
            switch (sesType) {
              case 7: // การซื้อประกัน
              case 8: //ผลประโยชน์จากกรมธรรม์
            }
          default: // อสังหาริมทรัพย์เพื่อการลงทุน
            switch (sesType) {
              case 0: // ซื้ออสังหาริมทรัพย์
              case 1: // รับค่าเช่า
            }
        }
      default: // เงินสด / เงินฝาก
        switch (subType) {
          case 1: // บัญชีออมทรัพย์
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
          case 2: // เงินฝากประจำ
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
          default: // เงินสด
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
        }
    }
    return []
  }
  const filteredDebitRows = (ports: PortDto[], port: PortDto, sesType: number): any[] => {
    if (!crud.items.value || (crud.items.value as PortDto[]).length <= 0) return []
    const subType = port.portSubType
    switch (Number(portType.value)) {
      case 1: // สินเชื่อและเงินให้กู้
        switch (subType) {
          case 1: // เงินกู้ธุรกิจ
          default: // เงินกู้บุคคล
            switch (sesType) {
              case 1: // รับชำระคืน
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
              case 2: // ดอกเบี้ยค้างรับ
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
              case 3: // ตัดหนี้สูญ
                return [port]
              case 4: // รีไฟแนนซ์
                return [port]
              case 5: //จ่ายค่านายหน้า
                return ports.filter(p => p.portType === 0 && p.portSubType === 0)
              default: // ปล่อยกู้
                return [port]
            }
        }
      case 2: // การลงทุนในตราสาร
        switch (subType) {
          case 1: // หุ้นกู้เอกชน
            switch (sesType) {
              case 1: // ขายพันธบัตร
              case 2: // รับคูปอง
              case 3: // ปรับมูลค่ายุติธรรม
              default: // ซื้อพันธบัตร
            }
          default: // พันธบัตรรัฐบาล
            switch (sesType) {
              case 1: // ขายพันธบัตร
              case 2: // รับคูปอง
              case 3: // ปรับมูลค่ายุติธรรม
              default: // ซื้อพันธบัตร
            }
        }
      case 3: // การลงทุนในหุ้น/หุ้น
        switch (subType) {
          case 1: // หุ้นส่วน/ทุนในกิจการที่ไม่จดทะเบียน
            switch (sesType) {
              case 1: // ขายหุ้น
              case 2: // รับเงินปันผล
              case 3: // ปรับตามวิธีส่วนได้เสีย
              default: // ซื้อหุ้น
            }
          default: // หุ้นสามัญที่จดทะเบียนในตลาดหลักทรัพย์
            switch (sesType) {
              case 1: // ขายหุ้น
              case 2: // รับเงินปันผล
              case 3: // ปรับตามวิธีส่วนได้เสีย
              default: // ซื้อหุ้น
            }
        }
      case 4: // อื่น ๆ
        switch (subType) {
          case 1: // กองทุนรวม
            switch (sesType) {
              case 2: // ลงทุนกองทุนรวม
              case 3: // กำไรจากการจำหน่าย
              case 4: // ขาดทุนจากการจำหน่าย
            }
          case 2: // การเล่นแชร์
            switch (sesType) {
              case 5: // จ่ายค่า แชร์
              case 6: // รับค่า แชร์
            }
          case 3: // การซื้อประกัน
            switch (sesType) {
              case 7: // การซื้อประกัน
              case 8: //ผลประโยชน์จากกรมธรรม์
            }
          default: // อสังหาริมทรัพย์เพื่อการลงทุน
            switch (sesType) {
              case 0: // ซื้ออสังหาริมทรัพย์
              case 1: // รับค่าเช่า
            }
        }
      default: // เงินสด / เงินฝาก
        switch (subType) {
          case 1: // บัญชีออมทรัพย์
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
          case 2: // เงินฝากประจำ
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
          default: // เงินสด
            switch (sesType) {
              case 1: // ถอนเงิน
              case 2: // รับดอกเบี้ย
              case 3: // โอนเงิน
              default: // ฝากเงิน
            }
        }
    }
    return []
  }
  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateSession = () => {
    crud.onCreate()
    crud.item.value.sessionId = 'SES-NEW'
    crud.item.value.portId = portId.value
    crud.item.value.sessionType = sessionType.value
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
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
    getPortSessionInfo,
    sessionClicks,
    portId,
    filter,
    filteredRows,
    portType,
    sessionType,
    onFilter,
    initSessions,
    onCreateSession,
    filteredCreditRows,
    filteredDebitRows
  }
}
