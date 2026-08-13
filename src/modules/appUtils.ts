import NotifyMsg from '../models/notifyMsg'
import { i18n } from '../i18n'
import {
  EAlarmLevel,
  AccountCategory,
  EPortType,
  CashAndDepositsSubType,
  LoansReceivableSubType,
  SecuritiesSubType,
  EquityHoldingsSubType,
  OtherInvestmentsSubType,
  EBorrowingSubType,
  EPayableSubType,
  EOperatingRevenueSubType,
  EInterestIncomeSubType,
  EDividendIncomeSubType,
  EOperatingExpenseSubType,
  EInterestExpenseSubType,
  EBadDebtExpenseSubType,
  EDisposalLossSubType,
  EPaidInCapitalSubType,
  ERetainedEarningsSubType,
  EOtherReservesSubType,
  CashTransactionType,
  LoanTransactionType,
  SecurityTransactionType,
  EquityTransactionType,
  OtherTransactionType,
  BorrowingsTransactionType,
  PayablesTransactionType,
  OperatingRevenueTransactionType,
  InterestIncomeTransactionType,
  DividendIncomeTransactionType,
  OperatingExpenseTransactionType,
  InterestExpenseTransactionType,
  BadDebtExpenseTransactionType,
  DisposalLossTransactionType,
  PaidInCapitalTransactionType,
  RetainedEarningsTransactionType,
  OtherReservesTransactionType
} from '../types/myEnums'
import { FuncBoolAsync, QSelectOption, PortSessionDetail, PeriodUnits } from '../types/myTypes'
import { Notify, QVueGlobals, date } from 'quasar'
import MyConfig from './myConfig'
import Port from '../models/port'
import Session from '../models/session'
const { t } = i18n.global
export const showError = async (err: any) => {
  if (err) {
    if (err.response) {
      await showNotify(err.response.data, 4)
    } else if (err.message) {
      await showNotify(err.message, 5)
    }
  }
}
export const showNotify = async (msg: string, alarmLevel = 1) => {
  try {
    if (!isNullOrEmpty(msg)) {
      const msgModel = new NotifyMsg()
      msgModel.Descrip = msg
      msgModel.AlarmLevel = alarmLevel
      await showAlarm(msgModel)
    }
  } catch (err) {
    await errorToLog(err)
  }
}
export const isNullOrEmpty = (str: string): boolean => {
  return str === null || str === '' || str === undefined
}
export const showAlarm = async (msgModel: NotifyMsg) => {
  try {
    //const { t } = i18n.global
    const description = 'Alarm_' + msgModel.AlarmId + '_Descrip'
    // console.warn('Alarm====>', description);
    const msg =
      msgModel.AlarmId > 0
        ? msgModel.AlarmId + ' : ' + t(description)
        : t(
            typeof msgModel.Descrip === 'string'
              ? msgModel.Descrip
              : JSON.stringify(msgModel.Descrip, null, 2)
          )
    const caption = msgModel.CompId > 0 ? t(msgModel.CompDescrip) + '-' + msgModel.CompId : ''
    switch (msgModel.AlarmLevel as EAlarmLevel) {
      default:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-bell-outline',
          color: 'stateNotify',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Information:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-information-outline',
          color: 'stateInfo',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Success:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-check-circle-outline',
          color: 'stateSuccess',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Warning:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-alert-circle-outline',
          color: 'stateWarning',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Error:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-close-circle-outline',
          color: 'stateError',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
    }
  } catch (err) {
    await errorToLog(err)
  }
}
export const errorToLog = async (err: unknown) => {
  console.error(
    'Client Id:',
    MyConfig.instance.AppConfig.ClientId,
    '=>Message:',
    err instanceof Error ? err.message : '',
    err
  )
}
export const msgToLog = async (msg: string) => {
  console.log(
    'Client :id',
    MyConfig.instance.AppConfig.ClientId,
    ' name:' + MyConfig.instance.LoginBy,
    '=>Message:',
    msg
  )
}
export const modelConverter = <T>(model: object): T | undefined => {
  try {
    if (model && model != null) {
      return model as T
    } else {
      return undefined
    }
  } catch (err) {
    console.error('Error', err)
    return undefined
  }
}
export const modelsConverter = <T>(models: object): T[] | undefined => {
  try {
    return models as T[]
  } catch (err) {
    console.error('Error', err)
    return undefined
  }
}

export const enumToQSelectOptions = (myEnum: Record<string, string | number>): QSelectOption[] => {
  //const { t } = i18n.global
  return Object.keys(myEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      // Using the non-null assertion operator (!) tells TypeScript
      // we guarantee this key exists on the enum object.
      value: myEnum[key]!,
      label: t(key)
    }))
}
export const enumToString = (myEnum: Record<string, number | string>, enumKey: number): string => {
  //const { t } = i18n.global
  for (const key in myEnum) {
    if (Number(myEnum[key]) === enumKey) {
      return t(String(key))
    }
  }
  return '-'
}
export const getSessionType = (
  portType: string | number | EPortType,
  sessionType: number
): string => {
  switch (Number(portType) as EPortType) {
    case EPortType.CashAndDeposits:
      return enumToString(CashTransactionType, sessionType)
    case EPortType.LoansReceivable:
      return enumToString(LoanTransactionType, sessionType)
    case EPortType.Securities:
      return enumToString(SecurityTransactionType, sessionType)
    case EPortType.EquityHoldings:
      return enumToString(EquityTransactionType, sessionType)
    case EPortType.OtherInvestments:
      return enumToString(OtherTransactionType, sessionType)
    case EPortType.Borrowings:
      return enumToString(BorrowingsTransactionType, sessionType)
    case EPortType.Payables:
      return enumToString(PayablesTransactionType, sessionType)
    case EPortType.OperatingRevenue:
      return enumToString(OperatingRevenueTransactionType, sessionType)
    case EPortType.InterestIncome:
      return enumToString(InterestIncomeTransactionType, sessionType)
    case EPortType.DividendIncome:
      return enumToString(DividendIncomeTransactionType, sessionType)
    case EPortType.OperatingExpense:
      return enumToString(OperatingExpenseTransactionType, sessionType)
    case EPortType.InterestExpense:
      return enumToString(InterestExpenseTransactionType, sessionType)
    case EPortType.BadDebtExpense:
      return enumToString(BadDebtExpenseTransactionType, sessionType)
    case EPortType.DisposalLoss:
      return enumToString(DisposalLossTransactionType, sessionType)

    // Separate Equity Types
    case EPortType.PaidInCapital:
      return enumToString(PaidInCapitalTransactionType, sessionType)
    case EPortType.RetainedEarnings:
      return enumToString(RetainedEarningsTransactionType, sessionType)
    case EPortType.OtherReserves:
      return enumToString(OtherReservesTransactionType, sessionType)

    default:
      return enumToString(CashTransactionType, sessionType)
  }
}

export const sessionTypeToQSelectOptions = (
  portType: string | number | EPortType
): QSelectOption[] => {
  switch (Number(portType) as EPortType) {
    case EPortType.CashAndDeposits:
      return enumToQSelectOptions(CashTransactionType)
    case EPortType.LoansReceivable:
      return enumToQSelectOptions(LoanTransactionType)
    case EPortType.Securities:
      return enumToQSelectOptions(SecurityTransactionType)
    case EPortType.EquityHoldings:
      return enumToQSelectOptions(EquityTransactionType)
    case EPortType.OtherInvestments:
      return enumToQSelectOptions(OtherTransactionType)
    case EPortType.Borrowings:
      return enumToQSelectOptions(BorrowingsTransactionType)
    case EPortType.Payables:
      return enumToQSelectOptions(PayablesTransactionType)
    case EPortType.OperatingRevenue:
      return enumToQSelectOptions(OperatingRevenueTransactionType)
    case EPortType.InterestIncome:
      return enumToQSelectOptions(InterestIncomeTransactionType)
    case EPortType.DividendIncome:
      return enumToQSelectOptions(DividendIncomeTransactionType)
    case EPortType.OperatingExpense:
      return enumToQSelectOptions(OperatingExpenseTransactionType)
    case EPortType.InterestExpense:
      return enumToQSelectOptions(InterestExpenseTransactionType)
    case EPortType.BadDebtExpense:
      return enumToQSelectOptions(BadDebtExpenseTransactionType)
    case EPortType.DisposalLoss:
      return enumToQSelectOptions(DisposalLossTransactionType)

    // Separate Equity Types
    case EPortType.PaidInCapital:
      return enumToQSelectOptions(PaidInCapitalTransactionType)
    case EPortType.RetainedEarnings:
      return enumToQSelectOptions(RetainedEarningsTransactionType)
    case EPortType.OtherReserves:
      return enumToQSelectOptions(OtherReservesTransactionType)

    default:
      return enumToQSelectOptions(CashTransactionType)
  }
}

export const subTypeToQSelectOptions = (portType: string | number | EPortType): QSelectOption[] => {
  switch (Number(portType) as EPortType) {
    // Assets
    case EPortType.CashAndDeposits:
      return enumToQSelectOptions(CashAndDepositsSubType)
    case EPortType.LoansReceivable:
      return enumToQSelectOptions(LoansReceivableSubType)
    case EPortType.Securities:
      return enumToQSelectOptions(SecuritiesSubType)
    case EPortType.EquityHoldings:
      return enumToQSelectOptions(EquityHoldingsSubType)
    case EPortType.OtherInvestments:
      return enumToQSelectOptions(OtherInvestmentsSubType)

    // Liabilities
    case EPortType.Borrowings:
      return enumToQSelectOptions(EBorrowingSubType)
    case EPortType.Payables:
      return enumToQSelectOptions(EPayableSubType)

    // Equity (Return empty array or single default option if sub-types do not exist)
    case EPortType.PaidInCapital:
    case EPortType.RetainedEarnings:
    case EPortType.OtherReserves:
      return []

    // Revenue
    case EPortType.OperatingRevenue:
      return enumToQSelectOptions(EOperatingRevenueSubType)
    case EPortType.InterestIncome:
      return enumToQSelectOptions(EInterestIncomeSubType)
    case EPortType.DividendIncome:
      return enumToQSelectOptions(EDividendIncomeSubType)

    // Expenses
    case EPortType.OperatingExpense:
      return enumToQSelectOptions(EOperatingExpenseSubType)
    case EPortType.InterestExpense:
      return enumToQSelectOptions(EInterestExpenseSubType)
    case EPortType.BadDebtExpense:
      return enumToQSelectOptions(EBadDebtExpenseSubType)
    case EPortType.DisposalLoss:
      return enumToQSelectOptions(EDisposalLossSubType)

    default:
      return enumToQSelectOptions(CashAndDepositsSubType)
  }
}

export const confirmDelete = (
  $q: QVueGlobals,
  info: string,
  delFunc: FuncBoolAsync
): Promise<boolean> => {
  //const { t } = i18n.global

  return new Promise(resolve => {
    $q.dialog({
      title: t('Confirm'),
      message: `${t('Would_you_like_to_delete')} ${info} ?`,
      persistent: true,
      class: 'bg-body text-appText',
      cancel: { label: t('Cancel'), color: 'body' },
      ok: { label: t('OK'), color: 'body' }
    })
      .onOk(async () => {
        try {
          $q.loading.show({ message: 'Deleting...' })

          if (delFunc) {
            const success = await delFunc()
            if (success) {
              $q.notify({
                type: 'positive',
                message: t('Item_deleted_successfully')
              })
            }
          }

          resolve(true) // Success
        } catch (err) {
          $q.notify({
            type: 'negative',
            message: `${t('Failed_to_delete_item')} ${err instanceof Error ? err.message : ''}`
          })
          resolve(false) // Failed
        } finally {
          $q.loading?.hide()
        }
      })
      .onCancel(() => {
        console.log(t('Deletion_cancelled_by_user'))
        resolve(false) // Cancelled
      })
  })
}

export const formatBangkokDateTime = (inputdate: Date | string | number): string => {
  const d = new Date(inputdate)
  if (isNaN(d.getTime())) return '' // กัน Error กรณี Date ไม่ถูกต้อง

  return date.formatDate(d, 'DD/MM/YYYY')
}
export const currentDateTimeStr = formatBangkokDateTime(new Date())
export const formatCurrency = (val: number, currencyCode: string = 'THB'): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(val || 0)
}
//Session helpers

/**
 * Filter condition blueprint representing expected target port criteria.
 */
interface TargetMatch {
  portType: EPortType
  subTypes?: number[]
}

export const getGuideRows = (
  ports: Port[],
  currentPort: Port,
  sesType: number,
  isCredit: boolean
): Port[] => {
  if (!ports?.length || !currentPort) return []

  const pType = Number(currentPort.portType) as EPortType
  const sType = Number(sesType)

  let debitTarget: TargetMatch | null = null
  let creditTarget: TargetMatch | null = null

  // Standard Cash & Deposit Helper Accounts
  const CASH_SAVINGS: TargetMatch = {
    portType: EPortType.CashAndDeposits,
    subTypes: [CashAndDepositsSubType.Cash, CashAndDepositsSubType.SavingsAccount]
  }

  const CASH_ALL: TargetMatch = {
    portType: EPortType.CashAndDeposits,
    subTypes: [
      CashAndDepositsSubType.Cash,
      CashAndDepositsSubType.SavingsAccount,
      CashAndDepositsSubType.FixedDeposit
    ]
  }

  const LOAN_ALL: TargetMatch = {
    portType: EPortType.LoansReceivable,
    subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
  }

  const PAYABLE_ALL: TargetMatch = {
    portType: EPortType.Payables,
    subTypes: [
      EPayableSubType.AccountsPayable,
      EPayableSubType.AccruedExpense,
      EPayableSubType.OtherPayable
    ]
  }

  switch (pType) {
    // ----------------------------------------------------
    // ASSETS (0 - 4)
    // ----------------------------------------------------
    case EPortType.CashAndDeposits:
      switch (sType) {
        case CashTransactionType.Deposit:
          debitTarget = CASH_ALL
          creditTarget = CASH_SAVINGS
          break
        case CashTransactionType.Withdrawal:
          debitTarget = {
            portType: EPortType.CashAndDeposits,
            subTypes: [CashAndDepositsSubType.Cash]
          }
          creditTarget = {
            portType: EPortType.CashAndDeposits,
            subTypes: [CashAndDepositsSubType.SavingsAccount, CashAndDepositsSubType.FixedDeposit]
          }
          break
        case CashTransactionType.Transfer:
          debitTarget = CASH_ALL
          creditTarget = CASH_ALL
          break
        case CashTransactionType.InterestIncome:
          debitTarget = {
            portType: EPortType.CashAndDeposits,
            subTypes: [CashAndDepositsSubType.SavingsAccount, CashAndDepositsSubType.FixedDeposit]
          }
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.BankInterest]
          }
          break
      }
      break

    case EPortType.LoansReceivable:
      switch (sType) {
        case LoanTransactionType.LoanIssued:
          debitTarget = LOAN_ALL
          creditTarget = CASH_SAVINGS
          break
        case LoanTransactionType.LoanRepayment:
          debitTarget = CASH_SAVINGS
          creditTarget = LOAN_ALL
          break
        case LoanTransactionType.LoanInterestAccrual:
          debitTarget = LOAN_ALL
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.LoanInterest]
          }
          break
        case LoanTransactionType.BadDebtWriteOff:
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.BadDebtWriteOff]
          }
          creditTarget = LOAN_ALL
          break
        case LoanTransactionType.LoanReFinance:
          debitTarget = LOAN_ALL
          creditTarget = LOAN_ALL
          break
        case LoanTransactionType.BrokerPayment:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.BrokerageFee]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    case EPortType.Securities:
      switch (sType) {
        case SecurityTransactionType.SecurityPurchase:
          debitTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          creditTarget = CASH_SAVINGS
          break
        case SecurityTransactionType.SecuritySale:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          break
        case SecurityTransactionType.CouponPayment:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.BondCoupon]
          }
          break
        case SecurityTransactionType.FairValueAdjustment:
          debitTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [EDividendIncomeSubType.UnrealizedGain]
          }
          break
      }
      break

    case EPortType.EquityHoldings:
      switch (sType) {
        case EquityTransactionType.EquityPurchase:
          debitTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.ListedEquity, EquityHoldingsSubType.PrivateEquity]
          }
          creditTarget = CASH_SAVINGS
          break
        case EquityTransactionType.EquitySale:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.ListedEquity, EquityHoldingsSubType.PrivateEquity]
          }
          break
        case EquityTransactionType.DividendCollected:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [
              EDividendIncomeSubType.ListedDividend,
              EDividendIncomeSubType.PrivateDividend
            ]
          }
          break
        case EquityTransactionType.EquityMethodAdjustment:
          debitTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.PrivateEquity]
          }
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [EDividendIncomeSubType.EquityMethodGain]
          }
          break
      }
      break

    case EPortType.OtherInvestments:
      switch (sType) {
        case OtherTransactionType.RealEstatePurchase:
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.RentalIncome:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [EOperatingRevenueSubType.RentalIncome]
          }
          break
        case OtherTransactionType.MutualFundInvestment:
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.MutualFund]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.DisposalGain:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate, OtherInvestmentsSubType.MutualFund]
          }
          break
        case OtherTransactionType.DisposalLoss:
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.DisposalLoss]
          }
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate, OtherInvestmentsSubType.MutualFund]
          }
          break
        case OtherTransactionType.SavingSharePayment:
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.CommunitySavingShare]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.SavingShareIncome:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.CommunitySavingShare]
          }
          break
        case OtherTransactionType.InsurancePremium:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.InsurancePremium]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.InsuranceBenefit:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.Insurance]
          }
          break
      }
      break

    // ----------------------------------------------------
    // LIABILITIES (5 - 6)
    // ----------------------------------------------------
    case EPortType.Borrowings:
      switch (sType) {
        case BorrowingsTransactionType.Drawdown:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.Borrowings,
            subTypes: [
              EBorrowingSubType.ShortTermLoan,
              EBorrowingSubType.LongTermLoan,
              EBorrowingSubType.Mortgage
            ]
          }
          break
        case BorrowingsTransactionType.Repayment:
          debitTarget = {
            portType: EPortType.Borrowings,
            subTypes: [
              EBorrowingSubType.ShortTermLoan,
              EBorrowingSubType.LongTermLoan,
              EBorrowingSubType.Mortgage
            ]
          }
          creditTarget = CASH_SAVINGS
          break
        case BorrowingsTransactionType.BorrowingInterestAccrual:
          debitTarget = {
            portType: EPortType.InterestExpense,
            subTypes: [
              EInterestExpenseSubType.BankLoanInterest,
              EInterestExpenseSubType.BorrowingInterest
            ]
          }
          creditTarget = PAYABLE_ALL
          break
        case BorrowingsTransactionType.BorrowingRefinance:
          debitTarget = {
            portType: EPortType.Borrowings,
            subTypes: [
              EBorrowingSubType.ShortTermLoan,
              EBorrowingSubType.LongTermLoan,
              EBorrowingSubType.Mortgage
            ]
          }
          creditTarget = {
            portType: EPortType.Borrowings,
            subTypes: [
              EBorrowingSubType.ShortTermLoan,
              EBorrowingSubType.LongTermLoan,
              EBorrowingSubType.Mortgage
            ]
          }
          break
      }
      break

    case EPortType.Payables:
      switch (sType) {
        case PayablesTransactionType.InvoiceReceived:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.BrokerageFee
            ]
          }
          creditTarget = PAYABLE_ALL
          break
        case PayablesTransactionType.PaymentMade:
          debitTarget = PAYABLE_ALL
          creditTarget = CASH_SAVINGS
          break
        case PayablesTransactionType.CreditNoteReceived:
          debitTarget = PAYABLE_ALL
          creditTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.Administrative]
          }
          break
      }
      break

    // ----------------------------------------------------
    // REVENUE (7 - 9)
    // ----------------------------------------------------
    case EPortType.OperatingRevenue:
      switch (sType) {
        case OperatingRevenueTransactionType.ServiceInvoiced:
          debitTarget = PAYABLE_ALL
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [
              EOperatingRevenueSubType.SalesRevenue,
              EOperatingRevenueSubType.ServiceRevenue,
              EOperatingRevenueSubType.RentalIncome
            ]
          }
          break
        case OperatingRevenueTransactionType.RevenueRecognition:
          debitTarget = PAYABLE_ALL
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [
              EOperatingRevenueSubType.SalesRevenue,
              EOperatingRevenueSubType.ServiceRevenue
            ]
          }
          break
        case OperatingRevenueTransactionType.CashReceived:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [
              EOperatingRevenueSubType.SalesRevenue,
              EOperatingRevenueSubType.ServiceRevenue,
              EOperatingRevenueSubType.RentalIncome
            ]
          }
          break
      }
      break

    case EPortType.InterestIncome:
      switch (sType) {
        case InterestIncomeTransactionType.InterestReceived:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [
              EInterestIncomeSubType.BankInterest,
              EInterestIncomeSubType.LoanInterest,
              EInterestIncomeSubType.BondCoupon
            ]
          }
          break
        case InterestIncomeTransactionType.InterestIncomeAccrued:
          debitTarget = LOAN_ALL
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.LoanInterest, EInterestIncomeSubType.BondCoupon]
          }
          break
      }
      break

    case EPortType.DividendIncome:
      switch (sType) {
        case DividendIncomeTransactionType.DividendReceived:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [
              EDividendIncomeSubType.ListedDividend,
              EDividendIncomeSubType.PrivateDividend,
              EDividendIncomeSubType.FundDividend
            ]
          }
          break
        case DividendIncomeTransactionType.DividendDeclared:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [
              EDividendIncomeSubType.ListedDividend,
              EDividendIncomeSubType.PrivateDividend,
              EDividendIncomeSubType.FundDividend
            ]
          }
          break
      }
      break

    // ----------------------------------------------------
    // EXPENSES (10 - 13)
    // ----------------------------------------------------
    case EPortType.OperatingExpense:
      switch (sType) {
        case OperatingExpenseTransactionType.ExpenseIncurred:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.InsurancePremium
            ]
          }
          creditTarget = PAYABLE_ALL
          break
        case OperatingExpenseTransactionType.ExpensePaid:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.InsurancePremium
            ]
          }
          creditTarget = CASH_SAVINGS
          break
        case OperatingExpenseTransactionType.BrokerFeePaid:
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.BrokerageFee]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    case EPortType.InterestExpense:
      switch (sType) {
        case InterestExpenseTransactionType.InterestExpenseAccrued:
          debitTarget = {
            portType: EPortType.InterestExpense,
            subTypes: [
              EInterestExpenseSubType.BankLoanInterest,
              EInterestExpenseSubType.BorrowingInterest
            ]
          }
          creditTarget = PAYABLE_ALL
          break
        case InterestExpenseTransactionType.InterestPaid:
          debitTarget = {
            portType: EPortType.InterestExpense,
            subTypes: [
              EInterestExpenseSubType.BankLoanInterest,
              EInterestExpenseSubType.BorrowingInterest
            ]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    case EPortType.BadDebtExpense:
      switch (sType) {
        case BadDebtExpenseTransactionType.ProvisionRecognized:
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.AllowanceForBadDebt]
          }
          creditTarget = LOAN_ALL
          break
        case BadDebtExpenseTransactionType.BadDebtWrittenOff:
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.BadDebtWriteOff]
          }
          creditTarget = LOAN_ALL
          break
      }
      break

    case EPortType.DisposalLoss:
      switch (sType) {
        case DisposalLossTransactionType.AssetDisposed:
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.DisposalLoss]
          }
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate]
          }
          break
        case DisposalLossTransactionType.FairValueLossAdjusted:
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.UnrealizedLoss]
          }
          creditTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          break
      }
      break

    // ----------------------------------------------------
    // EQUITY (14 - 16)
    // ----------------------------------------------------
    case EPortType.PaidInCapital:
      switch (sType) {
        case PaidInCapitalTransactionType.CapitalContribution:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.PaidInCapital,
            subTypes: [EPaidInCapitalSubType.CommonStock, EPaidInCapitalSubType.PreferredStock]
          }
          break
        case PaidInCapitalTransactionType.CapitalReduction:
          debitTarget = {
            portType: EPortType.PaidInCapital,
            subTypes: [EPaidInCapitalSubType.CommonStock, EPaidInCapitalSubType.PreferredStock]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    case EPortType.RetainedEarnings:
      switch (sType) {
        case RetainedEarningsTransactionType.DividendPayout:
          debitTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Unappropriated]
          }
          creditTarget = CASH_SAVINGS
          break
        case RetainedEarningsTransactionType.AppropriationOfEarnings:
          debitTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Unappropriated]
          }
          creditTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Appropriated]
          }
          break
        case RetainedEarningsTransactionType.UnappropriatedTransfer:
          debitTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Appropriated]
          }
          creditTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Unappropriated]
          }
          break
      }
      break

    case EPortType.OtherReserves:
      switch (sType) {
        case OtherReservesTransactionType.SharePremiumReceived:
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherReserves,
            subTypes: [EOtherReservesSubType.SharePremium]
          }
          break
        case OtherReservesTransactionType.ReserveAllocation:
          debitTarget = {
            portType: EPortType.RetainedEarnings,
            subTypes: [ERetainedEarningsSubType.Unappropriated]
          }
          creditTarget = {
            portType: EPortType.OtherReserves,
            subTypes: [EOtherReservesSubType.LegalReserve]
          }
          break
        case OtherReservesTransactionType.RevaluationAdjustment:
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate]
          }
          creditTarget = {
            portType: EPortType.OtherReserves,
            subTypes: [EOtherReservesSubType.RevaluationReserve]
          }
          break
      }
      break

    default:
      return []
  }

  const activeTarget = isCredit ? creditTarget : debitTarget
  if (!activeTarget) return []

  // Ensure currentPort is in candidate list if it matches target portType
  const hasCurrentPort = ports.some(p => p.portId === currentPort.portId)
  const candidatePorts =
    Number(activeTarget.portType) === pType && !hasCurrentPort ? [currentPort, ...ports] : ports

  // Safe numerical checking against account subtypes
  return candidatePorts.filter(p => {
    const itemPortType = Number(p.portType)
    if (itemPortType !== Number(activeTarget.portType)) return false

    if (activeTarget.subTypes && activeTarget.subTypes.length > 0) {
      if (p.portSubType === undefined || p.portSubType === null) return false
      const subTypeNum = Number(p.portSubType)
      return !isNaN(subTypeNum) && activeTarget.subTypes.includes(subTypeNum)
    }

    return true
  })
}
export const getPreviousUsedPortId = (
  sessions: Session[],
  currentPort: Port,
  sesType: number,
  isCredit: boolean
): string | null => {
  if (!sessions || sessions.length === 0) return null

  // 1. Filter sessions matching current portId & sessionType
  const guideSessions = sessions
    .filter(s => s.portId === currentPort.portId && s.sessionType === sesType)
    .sort((a, b) => {
      const dateA = a.createOn ? new Date(a.createOn).getTime() : 0
      const dateB = b.createOn ? new Date(b.createOn).getTime() : 0
      return dateB - dateA // Sort descending (latest first)
    })

  // 2. Pick the latest matching session
  const latestSession = guideSessions[0]

  if (!latestSession) return null

  // 3. Return creditPortId or debitPortId based on isCredit flag
  return isCredit ? latestSession.creditPortId : latestSession.debitPortId
}
export const getAccountCategoryByPortType = (portType: EPortType | number): AccountCategory => {
  const pType = Number(portType)

  switch (pType) {
    // Assets (0 - 4)
    case EPortType.CashAndDeposits:
    case EPortType.LoansReceivable:
    case EPortType.Securities:
    case EPortType.EquityHoldings:
    case EPortType.OtherInvestments:
      return AccountCategory.Assets

    // Liabilities (5 - 6)
    case EPortType.Borrowings:
    case EPortType.Payables:
      return AccountCategory.Liabilities

    // Revenue (7 - 9)
    case EPortType.OperatingRevenue:
    case EPortType.InterestIncome:
    case EPortType.DividendIncome:
      return AccountCategory.Revenue

    // Expenses (10 - 13)
    case EPortType.OperatingExpense:
    case EPortType.InterestExpense:
    case EPortType.BadDebtExpense:
    case EPortType.DisposalLoss:
      return AccountCategory.Expenses

    // Equity (14 - 16)
    case EPortType.PaidInCapital:
    case EPortType.RetainedEarnings:
    case EPortType.OtherReserves:
      return AccountCategory.Equity

    default:
      throw new Error(`Invalid EPortType: ${portType}`)
  }
}
export const getPortSessionInfo = (
  portType: string | number | EPortType,
  subType: number
): PortSessionDetail[] => {
  //const { t } = i18n.global
  switch (Number(portType)) {
    // =============================================================
    // ASSETS (0 - 4)
    // =============================================================
    case EPortType.CashAndDeposits: // 0
      return [
        {
          enabled: true,
          visible: true,
          description: t('Deposit'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('Withdrawal'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('InterestIncome'),
          iconName: 'mdi-cash-clock',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('Transfer'),
          iconName: 'mdi-cash-refund',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.LoansReceivable: // 1
      return [
        {
          enabled: true,
          visible: true,
          description: t('LoanIssued'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('LoanRepayment'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('LoanInterestAccrual'),
          iconName: 'mdi-cash-fast',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('BadDebtWriteOff'),
          iconName: 'mdi-cash-remove',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('LoanReFinance'),
          iconName: 'mdi-cash-sync',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('BrokerPayment'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.Securities: // 2
      return [
        {
          enabled: true,
          visible: true,
          description: t('SecurityPurchase'),
          iconName: 'mdi-cash-100',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('SecuritySale'),
          iconName: 'mdi-cash-fast',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('CouponPayment'),
          iconName: 'mdi-cash-fast',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('FairValueAdjustment'),
          iconName: 'mdi-cash-multiple',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.EquityHoldings: // 3
      return [
        {
          enabled: true,
          visible: true,
          description: t('EquityPurchase'),
          iconName: 'mdi-network-pos',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('EquitySale'),
          iconName: 'mdi-cash-fast',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('DividendCollected'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('EquityMethodAdjustment'),
          iconName: 'mdi-cash-sync',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.OtherInvestments: // 4
      return [
        // RealEstate (subType = 0)
        {
          enabled: subType === OtherInvestmentsSubType.RealEstate,
          visible: subType === OtherInvestmentsSubType.RealEstate,
          description: t('RealEstatePurchase'),
          iconName: 'mdi-home-group',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: subType === OtherInvestmentsSubType.RealEstate,
          visible: subType === OtherInvestmentsSubType.RealEstate,
          description: t('RentalIncome'),
          iconName: 'mdi-cash-multiple',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        // MutualFund (subType = 1)
        {
          enabled: subType === OtherInvestmentsSubType.MutualFund,
          visible: subType === OtherInvestmentsSubType.MutualFund,
          description: t('MutualFundInvestment'),
          iconName: 'mdi-cash-multiple',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: subType === OtherInvestmentsSubType.MutualFund,
          visible: subType === OtherInvestmentsSubType.MutualFund,
          description: t('DisposalGain'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: subType === OtherInvestmentsSubType.MutualFund,
          visible: subType === OtherInvestmentsSubType.MutualFund,
          description: t('DisposalLoss'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        // CommunitySavingShare (subType = 2)
        {
          enabled: subType === OtherInvestmentsSubType.CommunitySavingShare,
          visible: subType === OtherInvestmentsSubType.CommunitySavingShare,
          description: t('SavingSharePayment'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: subType === OtherInvestmentsSubType.CommunitySavingShare,
          visible: subType === OtherInvestmentsSubType.CommunitySavingShare,
          description: t('SavingShareIncome'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        // Insurance (subType = 3)
        {
          enabled: subType === OtherInvestmentsSubType.Insurance,
          visible: subType === OtherInvestmentsSubType.Insurance,
          description: t('InsurancePremium'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: subType === OtherInvestmentsSubType.Insurance,
          visible: subType === OtherInvestmentsSubType.Insurance,
          description: t('InsuranceBenefit'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    // =============================================================
    // LIABILITIES (5 - 6)
    // =============================================================
    case EPortType.Borrowings: // 5
      return [
        {
          enabled: true,
          visible: true,
          description: t('Drawdown'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('Repayment'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('BorrowingInterestAccrual'),
          iconName: 'mdi-cash-clock',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('BorrowingRefinance'),
          iconName: 'mdi-cash-refresh',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    case EPortType.Payables: // 6
      return [
        {
          enabled: true,
          visible: true,
          description: t('InvoiceReceived'),
          iconName: 'mdi-file-document-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '0'
        },
        {
          enabled: true,
          visible: true,
          description: t('PaymentMade'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('CreditNoteReceived'),
          iconName: 'mdi-file-undo-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    // =============================================================
    // REVENUE (7 - 9)
    // =============================================================
    case EPortType.OperatingRevenue: // 7
      return [
        {
          enabled: true,
          visible: true,
          description: t('ServiceInvoiced'),
          iconName: 'mdi-file-sign',
          totalAmount: 0,
          totalCount: 0,
          effect: '0'
        },
        {
          enabled: true,
          visible: true,
          description: t('RevenueRecognition'),
          iconName: 'mdi-cash-check',
          totalAmount: 0,
          totalCount: 0,
          effect: '0'
        },
        {
          enabled: true,
          visible: true,
          description: t('CashReceived'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    case EPortType.InterestIncome: // 8
      return [
        {
          enabled: true,
          visible: true,
          description: t('InterestReceived'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('InterestIncomeAccrued'),
          iconName: 'mdi-cash-clock',
          totalAmount: 0,
          totalCount: 0,
          effect: '0'
        }
      ]

    case EPortType.DividendIncome: // 9
      return [
        {
          enabled: true,
          visible: true,
          description: t('DividendReceived'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('DividendDeclared'),
          iconName: 'mdi-bullhorn-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    // =============================================================
    // EXPENSES (10 - 13)
    // =============================================================
    case EPortType.OperatingExpense: // 10
      return [
        {
          enabled: true,
          visible: true,
          description: t('ExpenseIncurred'),
          iconName: 'mdi-receipt-text-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('ExpensePaid'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('BrokerFeePaid'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.InterestExpense: // 11
      return [
        {
          enabled: true,
          visible: true,
          description: t('InterestExpenseAccrued'),
          iconName: 'mdi-cash-clock',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('InterestPaid'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.BadDebtExpense: // 12
      return [
        {
          enabled: true,
          visible: true,
          description: t('ProvisionRecognized'),
          iconName: 'mdi-alert-circle-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('BadDebtWrittenOff'),
          iconName: 'mdi-cash-remove',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    case EPortType.DisposalLoss: // 13
      return [
        {
          enabled: true,
          visible: true,
          description: t('AssetDisposed'),
          iconName: 'mdi-close-box-outline',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('FairValueLossAdjusted'),
          iconName: 'mdi-trending-down',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]

    // =============================================================
    // EQUITY (14 - 16)
    // =============================================================
    case EPortType.PaidInCapital: // 14
      return [
        {
          enabled: true,
          visible: true,
          description: t('CapitalContribution'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('CapitalReduction'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    case EPortType.RetainedEarnings: // 15
      return [
        {
          enabled: true,
          visible: true,
          description: t('DividendPayout'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('AppropriationOfEarnings'),
          iconName: 'mdi-bank-transfer-in',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('UnappropriatedTransfer'),
          iconName: 'mdi-bank-transfer-out',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        }
      ]

    case EPortType.OtherReserves: // 16
      return [
        {
          enabled: true,
          visible: true,
          description: t('SharePremiumReceived'),
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('ReserveAllocation'),
          iconName: 'mdi-transfer',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('RevaluationAdjustment'),
          iconName: 'mdi-tune-vertical',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
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
          iconName: 'mdi-cash-plus',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('Withdrawal'),
          iconName: 'mdi-cash-minus',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        },
        {
          enabled: true,
          visible: true,
          description: t('InterestIncome'),
          iconName: 'mdi-cash-clock',
          totalAmount: 0,
          totalCount: 0,
          effect: '+'
        },
        {
          enabled: true,
          visible: true,
          description: t('Transfer'),
          iconName: 'mdi-cash-refund',
          totalAmount: 0,
          totalCount: 0,
          effect: '-'
        }
      ]
  }
}
export const getSessionTypeDescription = (
  portType: EPortType | number,
  sessionType: number
): { description: string; iconName: string } => {
  const infos = getPortSessionInfo(portType, 0)
  if (!infos || infos.length === 0 || !infos[sessionType]) return { description: '', iconName: '' }

  return { description: infos[sessionType].description, iconName: infos[sessionType].iconName }
}
export const getSessionEffect = (
  portType: string | number | EPortType,
  sessionType: number
): string => {
  const infos = getPortSessionInfo(portType, 0)
  if (!infos || infos.length === 0 || !infos[sessionType]) return ''
  return infos[sessionType].effect
}

export const periodUnits: PeriodUnits = {
  0: t('days'),
  1: t('months'),
  2: t('years')
}
export const periodUnit: PeriodUnits = {
  0: t('day'),
  1: t('month'),
  2: t('year')
}
