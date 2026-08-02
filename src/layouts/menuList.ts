import { EPortType } from '../types/myEnums'
const linksList = [
  {
    title: 'SystemConfigure',
    icon: 'las la-cog',
    link: '/',
    level: 0,
    access: 0,
    compType: 0,
    children: [
      {
        title: 'Account',
        icon: 'manage_accounts',
        link: '/account',
        level: 1,
        access: 0,
        compType: 0,
        children: []
      },
      {
        title: 'Preference',
        icon: 'room_preferences',
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
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'Customer_Accounts',
        icon: 'mdi-account-details-outline',
        link: '/customers',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Broker_Accounts',
        icon: 'mdi-account-details-outline',
        link: '/brokers',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Asset_Ports',
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'CashAndDeposits',
        icon: 'mdi-account-details-outline',
        // 1. Pass a real object here instead of a string literal
        link: { name: 'CashPort', params: { portType: EPortType.CashAndDeposits } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'LoansReceivable',
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
        link: { name: 'LoanPort', params: { portType: EPortType.LoansReceivable } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Securities',
        icon: 'mdi-account-details-outline',
        link: { name: 'SecurityPort', params: { portType: EPortType.Securities } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'EquityHoldings',
        icon: 'mdi-account-details-outline',
        link: { name: 'EquityPort', params: { portType: EPortType.EquityHoldings } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'OtherInvestments',
        icon: 'mdi-account-details-outline',
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
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'Borrowings',
        icon: 'mdi-account-details-outline',
        // 1. Pass a real object here instead of a string literal
        link: { name: 'BorrowPort', params: { portType: EPortType.Borrowings } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Payables',
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
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
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'OperatingRevenue',
        icon: 'mdi-account-details-outline',
        // 1. Pass a real object here instead of a string literal
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
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
        link: { name: 'InterestIncomePort', params: { portType: EPortType.InterestIncome } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DividendIncome',
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
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
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'OperatingExpense',
        icon: 'mdi-account-details-outline',
        // 1. Pass a real object here instead of a string literal
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
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
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
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
        link: { name: 'BadDebtExpensePort', params: { portType: EPortType.BadDebtExpense } },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DisposalLoss',
        icon: 'mdi-account-details-outline',
        // 2. Pass a real object here too
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
