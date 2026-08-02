import NotifyMsg from '../models/notifyMsg'
import { i18n } from '../i18n'
import {
  EAlarmLevel,
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
  DisposalLossTransactionType
} from '../types/myEnums'
import { FuncBoolAsync, QSelectOption, FormatMode } from '../types/myTypes'
import { Notify, QVueGlobals } from 'quasar'
import MyConfig from './myConfig'
import Port from '../models/port'
import Session from '../models/session'
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
    const { t } = i18n.global
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
  const { t } = i18n.global
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
  const { t } = i18n.global
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
  switch (Number(portType)) {
    case 1:
      return enumToString(LoanTransactionType, sessionType)
    case 2:
      return enumToString(SecurityTransactionType, sessionType)
    case 3:
      return enumToString(EquityTransactionType, sessionType)
    case 4:
      return enumToString(OtherTransactionType, sessionType)
    default:
      return enumToString(CashTransactionType, sessionType)
  }
}

export const sessionTypeToQSelectOptions = (
  portType: string | number | EPortType
): QSelectOption[] => {
  switch (Number(portType)) {
    case 1:
      return enumToQSelectOptions(LoanTransactionType)
    case 2:
      return enumToQSelectOptions(SecurityTransactionType)
    case 3:
      return enumToQSelectOptions(EquityTransactionType)
    case 4:
      return enumToQSelectOptions(OtherTransactionType)
    default:
      return enumToQSelectOptions(CashTransactionType)
  }
}
export const subTypeToQSelectOptions = (portType: string | number | EPortType): QSelectOption[] => {
  switch (Number(portType)) {
    case 1:
      return enumToQSelectOptions(LoansReceivableSubType)
    case 2:
      return enumToQSelectOptions(SecuritiesSubType)
    case 3:
      return enumToQSelectOptions(EquityHoldingsSubType)
    case 4:
      return enumToQSelectOptions(OtherInvestmentsSubType)
    default:
      return enumToQSelectOptions(CashAndDepositsSubType)
  }
}

export const confirmDelete = (
  $q: QVueGlobals,
  info: string,
  delFunc: FuncBoolAsync
): Promise<boolean> => {
  const { t } = i18n.global

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

export const formatBangkokDateTime = (
  date: Date | string | number,
  mode: FormatMode = 'datetime'
): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return '' // กัน Error กรณี Date ไม่ถูกต้อง

  // กำหนด options พื้นฐาน
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Bangkok',
    hour12: false
  }

  // ปรับ Options ตาม Mode ที่เลือก
  if (mode === 'date' || mode === 'datetime') {
    options.year = 'numeric'
    options.month = '2-digit'
    options.day = '2-digit'
  }

  if (mode === 'time' || mode === 'datetime') {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  return new Intl.DateTimeFormat('en-GB', options).format(d)
}

export const currentDateTimeStr = formatBangkokDateTime(new Date(), 'date')

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
  if (!ports || ports.length === 0 || !currentPort) return []

  const pType = Number(currentPort.portType) as EPortType
  const sType = Number(sesType)

  let debitTarget: TargetMatch | null = null
  let creditTarget: TargetMatch | null = null

  // Helper shorthand for Cash & Savings Account Ports target
  const CASH_SAVINGS: TargetMatch = {
    portType: EPortType.CashAndDeposits,
    subTypes: [CashAndDepositsSubType.Cash, CashAndDepositsSubType.SavingsAccount]
  }

  // Helper shorthand for Cash / Savings / Fixed Deposit Ports target
  const CASH_ALL: TargetMatch = {
    portType: EPortType.CashAndDeposits,
    subTypes: [
      CashAndDepositsSubType.Cash,
      CashAndDepositsSubType.SavingsAccount,
      CashAndDepositsSubType.FixedDeposit
    ]
  }

  // Map rules based on currentPort's PortType and Session/Transaction Type
  switch (pType) {
    // -----------------------------------------------------------------
    // 0: Cash & Deposits (เงินสดและเงินฝาก)
    // -----------------------------------------------------------------
    case EPortType.CashAndDeposits:
      switch (sType) {
        case CashTransactionType.Deposit: // ฝากเงิน
          debitTarget = CASH_ALL
          creditTarget = CASH_SAVINGS
          break
        case CashTransactionType.Withdrawal: // ถอนเงิน
          debitTarget = {
            portType: EPortType.CashAndDeposits,
            subTypes: [CashAndDepositsSubType.Cash]
          }
          creditTarget = {
            portType: EPortType.CashAndDeposits,
            subTypes: [CashAndDepositsSubType.SavingsAccount, CashAndDepositsSubType.FixedDeposit]
          }
          break
        case CashTransactionType.Transfer: // โอนเงิน
          debitTarget = CASH_ALL
          creditTarget = CASH_ALL
          break
        case CashTransactionType.InterestIncome: // รายได้ดอกเบี้ย
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

    // -----------------------------------------------------------------
    // 1: Loans Receivable (ลูกหนี้เงินให้กู้ยืม)
    // -----------------------------------------------------------------
    case EPortType.LoansReceivable:
      switch (sType) {
        case LoanTransactionType.LoanIssued: // การปล่อยกู้
          debitTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          creditTarget = CASH_SAVINGS
          break
        case LoanTransactionType.LoanRepayment: // การชำระคืนเงินกู้
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          break
        case LoanTransactionType.LoanInterestAccrual: // ดอกเบี้ยค้างรับ
          debitTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.LoanInterest]
          }
          break
        case LoanTransactionType.BadDebtWriteOff: // ตัดจำหน่ายหนี้สูญ
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.BadDebtWriteOff]
          }
          creditTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          break
        case LoanTransactionType.LoanReFinance: // รีไฟแนนซ์
          debitTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          creditTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          break
        case LoanTransactionType.BrokerPayment: // ชำระค่าธรรมเนียมโบรกเกอร์
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.BrokerageFee]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    // -----------------------------------------------------------------
    // 2: Securities (ตราสารหนี้)
    // -----------------------------------------------------------------
    case EPortType.Securities:
      switch (sType) {
        case SecurityTransactionType.SecurityPurchase: // ซื้อตราสารหนี้
          debitTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          creditTarget = CASH_SAVINGS
          break
        case SecurityTransactionType.SecuritySale: // ขายตราสารหนี้
        case SecurityTransactionType.CouponPayment: // รับคูปอง
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond, SecuritiesSubType.CorporateBond]
          }
          break
        case SecurityTransactionType.FairValueAdjustment: // ปรับมูลค่ายุติธรรม
          // Handled via Unrealized Gain (Credit) or Unrealized Loss (Debit)
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

    // -----------------------------------------------------------------
    // 3: Equity Holdings (เงินลงทุนในตราสารทุน)
    // -----------------------------------------------------------------
    case EPortType.EquityHoldings:
      switch (sType) {
        case EquityTransactionType.EquityPurchase: // ซื้อหุ้นทุน
          debitTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.ListedEquity, EquityHoldingsSubType.PrivateEquity]
          }
          creditTarget = CASH_SAVINGS
          break
        case EquityTransactionType.EquitySale: // ขายหุ้นทุน
        case EquityTransactionType.DividendCollected: // รับเงินปันผล
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.ListedEquity, EquityHoldingsSubType.PrivateEquity]
          }
          break
        case EquityTransactionType.EquityMethodAdjustment: // วิธีส่วนได้เสีย
          debitTarget = {
            portType: EPortType.EquityHoldings,
            subTypes: [EquityHoldingsSubType.ListedEquity, EquityHoldingsSubType.PrivateEquity]
          }
          creditTarget = {
            portType: EPortType.DividendIncome,
            subTypes: [EDividendIncomeSubType.EquityMethodGain]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 4: Other Investments (เงินลงทุนอื่น)
    // -----------------------------------------------------------------
    case EPortType.OtherInvestments:
      switch (sType) {
        case OtherTransactionType.RealEstatePurchase: // ซื้ออสังหาริมทรัพย์
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.RentalIncome: // รายได้ค่าเช่า
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate]
          }
          break
        case OtherTransactionType.MutualFundInvestment: // ลงทุนในกองทุนรวม
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.MutualFund]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.DisposalGain: // กำไรจากการจำหน่ายทรัพย์สิน
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate, OtherInvestmentsSubType.MutualFund]
          }
          break
        case OtherTransactionType.DisposalLoss: // ขาดทุนจากการจำหน่ายทรัพย์สิน
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.DisposalLoss]
          }
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate, OtherInvestmentsSubType.MutualFund]
          }
          break
        case OtherTransactionType.SavingSharePayment: // ชำระค่าหุ้นออมทรัพย์
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.CommunitySavingShare]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.SavingShareIncome: // รายได้หุ้นออมทรัพย์
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.CommunitySavingShare]
          }
          break
        case OtherTransactionType.InsurancePremium: // ชำระเบี้ยประกันภัย
          debitTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.Insurance]
          }
          creditTarget = CASH_SAVINGS
          break
        case OtherTransactionType.InsuranceBenefit: // รับผลประโยชน์ประกันภัย
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.Insurance]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 5: Borrowings (เงินกู้ยืม / หนี้สิน)
    // -----------------------------------------------------------------
    case EPortType.Borrowings:
      switch (sType) {
        case BorrowingsTransactionType.Drawdown: // เบิก/รับเงินกู้ยืม
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
        case BorrowingsTransactionType.Repayment: // ชำระคืนเงินกู้
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
        case BorrowingsTransactionType.BorrowingInterestAccrual: // ตั้งดอกเบี้ยค้างจ่าย
          debitTarget = {
            portType: EPortType.InterestExpense,
            subTypes: [EInterestExpenseSubType.BorrowingInterest]
          }
          creditTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccruedExpense]
          }
          break
        case BorrowingsTransactionType.BorrowingRefinance: // รีไฟแนนซ์หนี้
          debitTarget = {
            portType: EPortType.Borrowings,
            subTypes: [EBorrowingSubType.ShortTermLoan]
          }
          creditTarget = {
            portType: EPortType.Borrowings,
            subTypes: [EBorrowingSubType.LongTermLoan]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 6: Payables (เจ้าหนี้การค้า / เจ้าหนี้อื่น ๆ)
    // -----------------------------------------------------------------
    case EPortType.Payables:
      switch (sType) {
        case PayablesTransactionType.InvoiceReceived: // รับใบแจ้งหนี้
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.BrokerageFee
            ]
          }
          creditTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccountsPayable]
          }
          break
        case PayablesTransactionType.PaymentMade: // ชำระเงินให้เจ้าหนี้
          debitTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccountsPayable, EPayableSubType.AccruedExpense]
          }
          creditTarget = CASH_SAVINGS
          break
        case PayablesTransactionType.CreditNoteReceived: // รับใบลดหนี้
          debitTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccountsPayable]
          }
          creditTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.Administrative]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 7: Operating Revenue (รายได้จากการดำเนินงาน)
    // -----------------------------------------------------------------
    case EPortType.OperatingRevenue:
      switch (sType) {
        case OperatingRevenueTransactionType.ServiceInvoiced: // ออกใบแจ้งหนี้
          debitTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.BusinessLoan]
          }
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [
              EOperatingRevenueSubType.SalesRevenue,
              EOperatingRevenueSubType.ServiceRevenue
            ]
          }
          break
        case OperatingRevenueTransactionType.RevenueRecognition: // รับรู้รายได้
          debitTarget = CASH_SAVINGS
          creditTarget = {
            portType: EPortType.OperatingRevenue,
            subTypes: [
              EOperatingRevenueSubType.RentalIncome,
              EOperatingRevenueSubType.ServiceRevenue
            ]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 8: Interest Income (รายได้ดอกเบี้ย)
    // -----------------------------------------------------------------
    case EPortType.InterestIncome:
      switch (sType) {
        case InterestIncomeTransactionType.InterestReceived: // รับดอกเบี้ย
          debitTarget = CASH_ALL
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [
              EInterestIncomeSubType.BankInterest,
              EInterestIncomeSubType.LoanInterest,
              EInterestIncomeSubType.BondCoupon
            ]
          }
          break
        case InterestIncomeTransactionType.InterestIncomeAccrued: // รับรู้ดอกเบี้ยค้างรับ
          debitTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          creditTarget = {
            portType: EPortType.InterestIncome,
            subTypes: [EInterestIncomeSubType.LoanInterest]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 9: Dividend Income (รายได้เงินปันผล)
    // -----------------------------------------------------------------
    case EPortType.DividendIncome:
      switch (sType) {
        case DividendIncomeTransactionType.DividendReceived: // รับเงินปันผล
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

    // -----------------------------------------------------------------
    // 10: Operating Expense (ค่าใช้จ่ายดำเนินงาน)
    // -----------------------------------------------------------------
    case EPortType.OperatingExpense:
      switch (sType) {
        case OperatingExpenseTransactionType.ExpenseIncurred: // บันทึกค่าใช้จ่าย
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.InsurancePremium
            ]
          }
          creditTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccountsPayable, EPayableSubType.AccruedExpense]
          }
          break
        case OperatingExpenseTransactionType.ExpensePaid: // ชำระค่าใช้จ่าย
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [
              EOperatingExpenseSubType.Administrative,
              EOperatingExpenseSubType.InsurancePremium
            ]
          }
          creditTarget = CASH_SAVINGS
          break
        case OperatingExpenseTransactionType.BrokerFeePaid: // จ่ายค่าธรรมเนียมโบรกเกอร์
          debitTarget = {
            portType: EPortType.OperatingExpense,
            subTypes: [EOperatingExpenseSubType.BrokerageFee]
          }
          creditTarget = CASH_SAVINGS
          break
      }
      break

    // -----------------------------------------------------------------
    // 11: Interest Expense (ดอกเบี้ยจ่าย)
    // -----------------------------------------------------------------
    case EPortType.InterestExpense:
      switch (sType) {
        case InterestExpenseTransactionType.InterestExpenseAccrued: // ตั้งดอกเบี้ยจ่ายค้างชำระ
          debitTarget = {
            portType: EPortType.InterestExpense,
            subTypes: [
              EInterestExpenseSubType.BankLoanInterest,
              EInterestExpenseSubType.BorrowingInterest
            ]
          }
          creditTarget = {
            portType: EPortType.Payables,
            subTypes: [EPayableSubType.AccruedExpense]
          }
          break
        case InterestExpenseTransactionType.InterestPaid: // จ่ายดอกเบี้ย
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

    // -----------------------------------------------------------------
    // 12: Bad Debt Expense (ค่าเผื่อหนี้สงสัยจะสูญ / หหนี้สูญ)
    // -----------------------------------------------------------------
    case EPortType.BadDebtExpense:
      switch (sType) {
        case BadDebtExpenseTransactionType.ProvisionRecognized: // รับรู้ค่าเผื่อหนี้สงสัยจะสูญ
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.AllowanceForBadDebt]
          }
          creditTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          break
        case BadDebtExpenseTransactionType.BadDebtWrittenOff: // ตัดจำหน่ายหนี้สูญ
          debitTarget = {
            portType: EPortType.BadDebtExpense,
            subTypes: [EBadDebtExpenseSubType.BadDebtWriteOff]
          }
          creditTarget = {
            portType: EPortType.LoansReceivable,
            subTypes: [LoansReceivableSubType.PersonalLoan, LoansReceivableSubType.BusinessLoan]
          }
          break
      }
      break

    // -----------------------------------------------------------------
    // 13: Disposal Loss (ขาดทุนจากการจำหน่าย)
    // -----------------------------------------------------------------
    case EPortType.DisposalLoss:
      switch (sType) {
        case DisposalLossTransactionType.AssetDisposed: // จำหน่ายทรัพย์สินขาดทุน
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.DisposalLoss]
          }
          creditTarget = {
            portType: EPortType.OtherInvestments,
            subTypes: [OtherInvestmentsSubType.RealEstate, OtherInvestmentsSubType.MutualFund]
          }
          break
        case DisposalLossTransactionType.FairValueLossAdjusted: // ปรับมูลค่ายุติธรรม (ขาดทุน)
          debitTarget = {
            portType: EPortType.DisposalLoss,
            subTypes: [EDisposalLossSubType.UnrealizedLoss]
          }
          creditTarget = {
            portType: EPortType.Securities,
            subTypes: [SecuritiesSubType.GovernmentBond]
          }
          break
      }
      break
  }

  // Select appropriate side configuration
  const activeTarget = isCredit ? creditTarget : debitTarget
  if (!activeTarget) return []

  // If the target port type matches currentPort's type, include currentPort in candidates
  let candidatePorts = ports
  if (activeTarget.portType === pType && !ports.some(p => p.portId === currentPort.portId)) {
    candidatePorts = [currentPort, ...ports]
  }

  // Filter ports matching the targeted PortType and SubTypes
  return candidatePorts.filter(p => {
    const isSameType = Number(p.portType) === activeTarget.portType
    if (!isSameType) return false

    if (activeTarget.subTypes && activeTarget.subTypes.length > 0) {
      return activeTarget.subTypes.includes(Number(p.portSubType))
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
