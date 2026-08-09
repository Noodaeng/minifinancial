import { ref, Ref, computed } from 'vue'
import { EPortType } from '../types/myEnums'
import { useCrudProp } from './useCrudProp'
import { showError, getSessionType, currentDateTimeStr } from '../modules/appUtils'
import Session from '../models/session'
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
        name: 'sessionId',
        required: true,
        label: t('Id'),
        align: 'left',
        field: 'sessionId',
        sortable: true
      },
      {
        name: 'createOn',
        required: true,
        label: t('Create_On'),
        align: 'left',
        field: 'createOn',
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
  //const { t } = i18n.global

  // const getPortSessionInfo = (subType: number): PortSessionDetail[] => {
  //   switch (Number(portType.value)) {
  //     // =============================================================
  //     // ASSETS (0 - 4)
  //     // =============================================================
  //     case EPortType.CashAndDeposits: // 0
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Deposit'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Withdrawal'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InterestIncome'),
  //           iconName: 'mdi-cash-clock',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Transfer'),
  //           iconName: 'mdi-cash-refund',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.LoansReceivable: // 1
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('LoanIssued'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('LoanRepayment'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('LoanInterestAccrual'),
  //           iconName: 'mdi-cash-fast',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BadDebtWriteOff'),
  //           iconName: 'mdi-cash-remove',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('LoanReFinance'),
  //           iconName: 'mdi-cash-sync',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BrokerPayment'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.Securities: // 2
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('SecurityPurchase'),
  //           iconName: 'mdi-cash-100',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('SecuritySale'),
  //           iconName: 'mdi-cash-fast',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('CouponPayment'),
  //           iconName: 'mdi-cash-fast',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('FairValueAdjustment'),
  //           iconName: 'mdi-cash-multiple',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.EquityHoldings: // 3
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('EquityPurchase'),
  //           iconName: 'mdi-network-pos',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('EquitySale'),
  //           iconName: 'mdi-cash-fast',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('DividendCollected'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('EquityMethodAdjustment'),
  //           iconName: 'mdi-cash-sync',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.OtherInvestments: // 4
  //       return [
  //         // RealEstate (subType = 0)
  //         {
  //           enabled: subType === OtherInvestmentsSubType.RealEstate,
  //           visible: subType === OtherInvestmentsSubType.RealEstate,
  //           description: t('RealEstatePurchase'),
  //           iconName: 'mdi-home-group',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: subType === OtherInvestmentsSubType.RealEstate,
  //           visible: subType === OtherInvestmentsSubType.RealEstate,
  //           description: t('RentalIncome'),
  //           iconName: 'mdi-cash-multiple',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         // MutualFund (subType = 1)
  //         {
  //           enabled: subType === OtherInvestmentsSubType.MutualFund,
  //           visible: subType === OtherInvestmentsSubType.MutualFund,
  //           description: t('MutualFundInvestment'),
  //           iconName: 'mdi-cash-multiple',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: subType === OtherInvestmentsSubType.MutualFund,
  //           visible: subType === OtherInvestmentsSubType.MutualFund,
  //           description: t('DisposalGain'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: subType === OtherInvestmentsSubType.MutualFund,
  //           visible: subType === OtherInvestmentsSubType.MutualFund,
  //           description: t('DisposalLoss'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         // CommunitySavingShare (subType = 2)
  //         {
  //           enabled: subType === OtherInvestmentsSubType.CommunitySavingShare,
  //           visible: subType === OtherInvestmentsSubType.CommunitySavingShare,
  //           description: t('SavingSharePayment'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: subType === OtherInvestmentsSubType.CommunitySavingShare,
  //           visible: subType === OtherInvestmentsSubType.CommunitySavingShare,
  //           description: t('SavingShareIncome'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         // Insurance (subType = 3)
  //         {
  //           enabled: subType === OtherInvestmentsSubType.Insurance,
  //           visible: subType === OtherInvestmentsSubType.Insurance,
  //           description: t('InsurancePremium'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: subType === OtherInvestmentsSubType.Insurance,
  //           visible: subType === OtherInvestmentsSubType.Insurance,
  //           description: t('InsuranceBenefit'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     // =============================================================
  //     // LIABILITIES (5 - 6)
  //     // =============================================================
  //     case EPortType.Borrowings: // 5
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Drawdown'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Repayment'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BorrowingInterestAccrual'),
  //           iconName: 'mdi-cash-clock',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BorrowingRefinance'),
  //           iconName: 'mdi-cash-refresh',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.Payables: // 6
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InvoiceReceived'),
  //           iconName: 'mdi-file-document-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('PaymentMade'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('CreditNoteReceived'),
  //           iconName: 'mdi-file-undo-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     // =============================================================
  //     // REVENUE (7 - 9)
  //     // =============================================================
  //     case EPortType.OperatingRevenue: // 7
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('ServiceInvoiced'),
  //           iconName: 'mdi-file-sign',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('RevenueRecognition'),
  //           iconName: 'mdi-cash-check',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('CashReceived'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.InterestIncome: // 8
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InterestReceived'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InterestIncomeAccrued'),
  //           iconName: 'mdi-cash-clock',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.DividendIncome: // 9
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('DividendReceived'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('DividendDeclared'),
  //           iconName: 'mdi-bullhorn-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     // =============================================================
  //     // EXPENSES (10 - 13)
  //     // =============================================================
  //     case EPortType.OperatingExpense: // 10
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('ExpenseIncurred'),
  //           iconName: 'mdi-receipt-text-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('ExpensePaid'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BrokerFeePaid'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.InterestExpense: // 11
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InterestExpenseAccrued'),
  //           iconName: 'mdi-cash-clock',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('InterestPaid'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.BadDebtExpense: // 12
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('ProvisionRecognized'),
  //           iconName: 'mdi-alert-circle-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('BadDebtWrittenOff'),
  //           iconName: 'mdi-cash-remove',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.DisposalLoss: // 13
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('AssetDisposed'),
  //           iconName: 'mdi-close-box-outline',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('FairValueLossAdjusted'),
  //           iconName: 'mdi-trending-down',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     // =============================================================
  //     // EQUITY (14 - 16)
  //     // =============================================================
  //     case EPortType.PaidInCapital: // 14
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('CapitalContribution'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('CapitalReduction'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.RetainedEarnings: // 15
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('DividendPayout'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('AppropriationOfEarnings'),
  //           iconName: 'mdi-bank-transfer-in',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('UnappropriatedTransfer'),
  //           iconName: 'mdi-bank-transfer-out',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     case EPortType.OtherReserves: // 16
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('SharePremiumReceived'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('ReserveAllocation'),
  //           iconName: 'mdi-transfer',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('RevaluationAdjustment'),
  //           iconName: 'mdi-tune-vertical',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]

  //     // =============================================================
  //     // DEFAULT
  //     // =============================================================
  //     default:
  //       return [
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Deposit'),
  //           iconName: 'mdi-cash-plus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Withdrawal'),
  //           iconName: 'mdi-cash-minus',
  //           totalAmount: 0,
  //           totalCount: 0
  //         },
  //         {
  //           enabled: true,
  //           visible: true,
  //           description: t('Transfer'),
  //           iconName: 'mdi-cash-refund',
  //           totalAmount: 0,
  //           totalCount: 0
  //         }
  //       ]
  //   }
  // }

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
        String(session.createOn).toLowerCase().includes(lowerFilter) ||
        String(session.amount).toLowerCase().includes(lowerFilter) ||
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
    crud.item.value.sessionId = ''
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
    portId,
    filter,
    filteredRows,
    portType,
    onFilter,
    initSessions,
    onCreateSession
  }
}
