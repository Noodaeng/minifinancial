import { EPortType } from '../types/myEnums'
const linksList = [
  {
    title: 'System_Configure',
    icon: 'mdi-cog-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 0,
    children: [
      {
        title: 'Account',
        icon: 'mdi-account-cog-outline',
        link: '/account',
        level: 1,
        access: 0,
        compType: 0,
        children: []
      },
      {
        title: 'Preference',
        icon: 'mdi-tune-variant',
        link: '/preference',
        level: 1,
        access: 0,
        compType: 0,
        children: []
      }
    ]
  },
  {
    title: 'Customers_and_Brokers',
    icon: 'mdi-account-group-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'Customer_Accounts',
        icon: 'mdi-account-box-outline',
        link: { name: 'Customer', params: { childIcon: 'mdi-account-box-outline' } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Broker_Accounts',
        icon: 'mdi-briefcase-account-outline',
        link: { name: 'Broker', params: { childIcon: 'mdi-briefcase-account-outline' } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Asset_Ports',
    icon: 'mdi-briefcase-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'CashAndDeposits',
        icon: 'mdi-piggy-bank-outline',
        link: { name: 'CashPort', params: { portType: EPortType.CashAndDeposits } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'LoansReceivable',
        icon: 'mdi-hand-coin-outline',
        link: { name: 'LoanPort', params: { portType: EPortType.LoansReceivable } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Securities',
        icon: 'mdi-chart-line',
        link: { name: 'SecurityPort', params: { portType: EPortType.Securities } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'EquityHoldings',
        icon: 'mdi-chart-pie',
        link: { name: 'EquityPort', params: { portType: EPortType.EquityHoldings } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'OtherInvestments',
        icon: 'mdi-finance',
        link: { name: 'OtherPort', params: { portType: EPortType.OtherInvestments } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Liability_Ports',
    icon: 'mdi-scale-balance',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'Borrowings',
        icon: 'mdi-bank-transfer-in',
        link: { name: 'BorrowPort', params: { portType: EPortType.Borrowings } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Payables',
        icon: 'mdi-file-document-outline',
        link: { name: 'PayablePort', params: { portType: EPortType.Payables } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Revenue_Ports',
    icon: 'mdi-trending-up',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'OperatingRevenue',
        icon: 'mdi-cash-plus',
        link: {
          name: 'OperatingRevenuePort',
          params: { portType: EPortType.OperatingRevenue }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'InterestIncome',
        icon: 'mdi-percent-outline',
        link: { name: 'InterestIncomePort', params: { portType: EPortType.InterestIncome } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DividendIncome',
        icon: 'mdi-cash-refund',
        link: { name: 'DividendIncomePort', params: { portType: EPortType.DividendIncome } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Expense_Ports',
    icon: 'mdi-trending-down',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'OperatingExpense',
        icon: 'mdi-cash-minus',
        link: {
          name: 'OperatingExpensePort',
          params: { portType: EPortType.OperatingExpense }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'InterestExpense',
        icon: 'mdi-calculator-variant-outline',
        link: {
          name: 'InterestExpensePort',
          params: { portType: EPortType.InterestExpense }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'BadDebtExpense',
        icon: 'mdi-alert-circle-outline',
        link: { name: 'BadDebtExpensePort', params: { portType: EPortType.BadDebtExpense } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DisposalLoss',
        icon: 'mdi-archive-remove-outline',
        link: { name: 'DisposalLossPort', params: { portType: EPortType.DisposalLoss } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  }
]
export default linksList

// export enum EInvestPortType {
//   CashAndDeposits = 0,   // เงินสด / เงินฝาก (Savings & Bank Deposits)
//   LoansReceivable = 1,   // สินเชื่อและเงินให้กู้ (Loan Assets)
//   Securities = 2,        // การลงทุนในตราสาร เช่น พันธบัตร หุ้นกู้
//   EquityHoldings = 3,    // การลงทุนในทุน/หุ้น (Equity Investments)
//   OtherInvestments = 4   // อื่น ๆ เช่น กองทุนรวม, อสังหาริมทรัพย์เพื่อการลงทุน
// }
