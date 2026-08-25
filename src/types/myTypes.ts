import { AccountCategory } from '../types/myEnums'
export type ApplicationTheme = 'bcs-default' | 'bcs-dark' | 'bcs-medium'
export type Breakpoints = 'sm' | 'md' | 'lg' | 'xl'
export type Action = () => void
export type FuncBoolAsync = (arg?: any) => Promise<boolean>
export type ActionSingle<T> = (param: T) => void
export type DefaultValues<T> = {
  [K in keyof T]: T[K] extends object ? DefaultValues<T[K]> : T[K]
}
export type MyRecord = Record<number, string>
export type MyWorkAbilityVal = Record<number, number>
export type OptionalData =
  'customerOptions' | 'portOptions' | 'brokerOptions' | 'allOptions' | 'custBrokerOptions'

export type FormatMode = 'date' | 'datetime' | 'time'

//+++++++++++++Interface++++++++++++++++
export interface QSelectOption {
  value: string | number
  label: string
}
export interface PortSessionDetail {
  enabled: boolean
  visible: boolean
  description: string
  iconName: string
  totalAmount: number
  totalCount: number
  effect: '+' | '-' | '0'
}
export interface CategoryMeta {
  value: AccountCategory
  name: string
  labelTh: string
  description?: string
  drEffect: '+' | '-'
  crEffect: '+' | '-'
  icon: string
  color: string
  totalCredit: number
  totalDebit: number
  notifyCount: number
}
export interface EntryTypeMeta {
  portType: number
  name: string
  drEffect: '+' | '-'
  crEffect: '+' | '-'
  icon: string
  totalCredit: number
  totalDebit: number
  creditCount: number
  debitCount: number
  balance: number
}

export interface PortTypeSummary {
  sessionType: number
  totalAmount: number
  count: number
}
export interface AccountCategorySummary {
  category: number
  type: 'credit' | 'debit'
  totalAmount: number
  count: number
}
export interface MultiPortTypeSummary {
  portType: number
  sessionType: number
  totalAmount: number
  count: number
}

export type PeriodUnits = Record<number, string>

export interface ReFinanceInfo {
  canRefinance: boolean
  startLoan: string
  loanAmount: number
  interest: number
  paidCount: number
  totalPaid: number
  lastRefinance: string
  shortageAmount: number
  refinanceAmount: number
}
// Single row item returned from the SQL query
export interface LoanPaymentRecord {
  portId: string
  accountCategory: number
  portType: number
  portSubType: number
  status: number
  customerId: string
  brokerId: string
  amount: number
  interest: string
  paymentTerm: number
  paymentRate: number
  period: number
  customerName: string | null
  sessionId: string | null
  sessionType: number | null
  sessionAmount: number | null
  sessionCreateOn: string | null
  totalType1AfterSession: number
  totalType2AfterSession: number
  totalType1And2AfterSession: number
  totalCountType1AfterSession: number
  totalCountType2AfterSession: number
  totalCountType1And2AfterSession: number
}
// Full API Response Wrapper
export interface LoanPaymentsApiResponse {
  status: 'success' | 'error'
  message?: string
  data?: LoanPaymentRecord[]
}
export interface BatchNotifiesApiResponse {
  status: 'success' | 'error'
  message?: string
  totalProcessed?: number
  totalInserted?: number
  totalIgnored?: number
}
export interface LoanNotify {
  portId: string
  notifyCode: string
  customerName: string | null
  description: string
}
