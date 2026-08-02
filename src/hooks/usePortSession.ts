import { ref, Ref, computed } from 'vue'
import { PortDetail } from '../types/myTypes'
import { EPortType } from '../types/myEnums'
import { useCrudProp } from './useCrudProp'
import { showError, getSessionType, currentDateTimeStr } from '../modules/appUtils'
import Session from '../models/session'
import MyConfig from '../modules/myConfig'

import { i18n } from '../i18n'
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

  const getPortSessionInfo = (subType: number): PortDetail[] => {
    switch (Number(portType.value)) {
      // =============================================================
      // ASSETS (0 - 4)
      // =============================================================
      case 0: // CashAndDeposits
        return [
          {
            enabled: true,
            visible: true,
            description: t('Deposit'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('Withdrawal'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('Transfer'),
            iconName: 'mdi-cash-refund'
          }
        ]

      case 1: // LoansReceivable
        return [
          {
            enabled: true,
            visible: true,
            description: t('LoanIssued'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('LoanRepayment'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('LoanInterestAccrual'),
            iconName: 'mdi-cash-fast'
          },
          {
            enabled: true,
            visible: true,
            description: t('BadDebtWriteOff'),
            iconName: 'mdi-cash-remove'
          },
          {
            enabled: true,
            visible: true,
            description: t('ReFinance'),
            iconName: 'mdi-cash-sync'
          },
          {
            enabled: true,
            visible: true,
            description: t('BrokerPayment'),
            iconName: 'mdi-cash-minus'
          }
        ]

      case 2: // Securities
        return [
          {
            enabled: true,
            visible: true,
            description: t('SecurityPurchase'),
            iconName: 'mdi-cash-100'
          },
          {
            enabled: true,
            visible: true,
            description: t('SecuritySale'),
            iconName: 'mdi-cash-fast'
          },
          {
            enabled: true,
            visible: true,
            description: t('CouponPayment'),
            iconName: 'mdi-cash-fast'
          },
          {
            enabled: true,
            visible: true,
            description: t('FairValueAdjustment'),
            iconName: 'mdi-cash-multiple'
          }
        ]

      case 3: // EquityHoldings
        return [
          {
            enabled: true,
            visible: true,
            description: t('EquityPurchase'),
            iconName: 'mdi-network-pos'
          },
          {
            enabled: true,
            visible: true,
            description: t('EquitySale'),
            iconName: 'mdi-cash-fast'
          },
          {
            enabled: true,
            visible: true,
            description: t('DividendCollected'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('EquityMethodAdjustment'),
            iconName: 'mdi-cash-sync'
          }
        ]

      case 4: // OtherInvestments
        return [
          {
            enabled: subType === 0,
            visible: true,
            description: t('RealEstatePurchase'),
            iconName: 'mdi-home-group'
          },
          {
            enabled: subType === 0,
            visible: true,
            description: t('RentalIncome'),
            iconName: 'mdi-cash-multiple'
          },
          {
            enabled: subType === 1,
            visible: true,
            description: t('MutualFundInvestment'),
            iconName: 'mdi-cash-multiple'
          },
          {
            enabled: subType === 1,
            visible: true,
            description: t('DisposalGain'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: subType === 1,
            visible: true,
            description: t('DisposalLoss'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: subType === 2,
            visible: true,
            description: t('SavingSharePayment'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: subType === 2,
            visible: true,
            description: t('SavingShareIncome'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: subType === 3,
            visible: true,
            description: t('InsurancePremium'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: subType === 3,
            visible: true,
            description: t('InsuranceBenefit'),
            iconName: 'mdi-cash-plus'
          }
        ]

      // =============================================================
      // LIABILITIES (5 - 6)
      // =============================================================
      case 5: // Borrowings
        return [
          {
            enabled: true,
            visible: true,
            description: t('Drawdown'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('Repayment'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('BorrowingInterestAccrual'),
            iconName: 'mdi-cash-clock'
          },
          {
            enabled: true,
            visible: true,
            description: t('Refinance'),
            iconName: 'mdi-cash-refresh'
          }
        ]

      case 6: // Payables
        return [
          {
            enabled: true,
            visible: true,
            description: t('InvoiceReceived'),
            iconName: 'mdi-file-document-outline'
          },
          {
            enabled: true,
            visible: true,
            description: t('PaymentMade'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('CreditNoteReceived'),
            iconName: 'mdi-file-undo-outline'
          }
        ]

      // =============================================================
      // REVENUE (7 - 9)
      // =============================================================
      case 7: // OperatingRevenue
        return [
          {
            enabled: true,
            visible: true,
            description: t('ServiceInvoiced'),
            iconName: 'mdi-file-sign'
          },
          {
            enabled: true,
            visible: true,
            description: t('RevenueRecognition'),
            iconName: 'mdi-cash-check'
          },
          {
            enabled: true,
            visible: true,
            description: t('CashReceived'),
            iconName: 'mdi-cash-plus'
          }
        ]

      case 8: // InterestIncome
        return [
          {
            enabled: true,
            visible: true,
            description: t('InterestReceived'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('InterestIncomeAccrued'),
            iconName: 'mdi-cash-clock'
          }
        ]

      case 9: // DividendIncome
        return [
          {
            enabled: true,
            visible: true,
            description: t('DividendReceived'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('DividendDeclared'),
            iconName: 'mdi-bullhorn-outline'
          }
        ]

      // =============================================================
      // EXPENSES (10 - 13)
      // =============================================================
      case 10: // OperatingExpense
        return [
          {
            enabled: true,
            visible: true,
            description: t('ExpenseIncurred'),
            iconName: 'mdi-receipt-text-outline'
          },
          {
            enabled: true,
            visible: true,
            description: t('ExpensePaid'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('BrokerFeePaid'),
            iconName: 'mdi-cash-minus'
          }
        ]

      case 11: // InterestExpense
        return [
          {
            enabled: true,
            visible: true,
            description: t('InterestExpenseAccrued'),
            iconName: 'mdi-cash-clock'
          },
          {
            enabled: true,
            visible: true,
            description: t('InterestPaid'),
            iconName: 'mdi-cash-minus'
          }
        ]

      case 12: // BadDebtExpense
        return [
          {
            enabled: true,
            visible: true,
            description: t('ProvisionRecognized'),
            iconName: 'mdi-alert-circle-outline'
          },
          {
            enabled: true,
            visible: true,
            description: t('BadDebtWrittenOff'),
            iconName: 'mdi-cash-remove'
          }
        ]

      case 13: // DisposalLoss
        return [
          {
            enabled: true,
            visible: true,
            description: t('AssetDisposed'),
            iconName: 'mdi-close-box-outline'
          },
          {
            enabled: true,
            visible: true,
            description: t('FairValueLossAdjusted'),
            iconName: 'mdi-trending-down'
          }
        ]

      // =============================================================
      // DEFAULT
      // =============================================================
      default:
        return [
          {
            enabled: true,
            visible: true,
            description: t('Deposit'),
            iconName: 'mdi-cash-plus'
          },
          {
            enabled: true,
            visible: true,
            description: t('Withdrawal'),
            iconName: 'mdi-cash-minus'
          },
          {
            enabled: true,
            visible: true,
            description: t('Transfer'),
            iconName: 'mdi-cash-refund'
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

  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateSession = (sessionType: number) => {
    crud.onCreate()
    crud.item.value.sessionId = 'SES-NEW'
    crud.item.value.portId = portId.value
    crud.item.value.sessionType = sessionType
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
    portId,
    filter,
    filteredRows,
    portType,
    onFilter,
    initSessions,
    onCreateSession
  }
}
