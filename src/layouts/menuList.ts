import { EPortType } from '../types/myEnums'
const menuList = [
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
      }
      // {
      //   title: 'Preference',
      //   icon: 'mdi-tune-variant',
      //   link: '/preference',
      //   level: 1,
      //   access: 0,
      //   compType: 0,
      //   children: []
      // }
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
        link: {
          name: 'CashPort',
          params: { portType: EPortType.CashAndDeposits },
          query: { childIcon: 'mdi-piggy-bank-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'LoansReceivable',
        icon: 'mdi-hand-coin-outline',
        link: {
          name: 'LoanPort',
          params: { portType: EPortType.LoansReceivable },
          query: { childIcon: 'mdi-hand-coin-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Securities',
        icon: 'mdi-chart-line',
        link: {
          name: 'SecurityPort',
          params: { portType: EPortType.Securities },
          query: { childIcon: 'mdi-chart-line' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'EquityHoldings',
        icon: 'mdi-chart-pie',
        link: {
          name: 'EquityPort',
          params: { portType: EPortType.EquityHoldings },
          query: { childIcon: 'mdi-chart-pie' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'OtherInvestments',
        icon: 'mdi-finance',
        link: {
          name: 'OtherPort',
          params: { portType: EPortType.OtherInvestments },
          query: { childIcon: 'mdi-finance' }
        },
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
        link: {
          name: 'BorrowPort',
          params: { portType: EPortType.Borrowings },
          query: { childIcon: 'mdi-bank-transfer-in' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Payables',
        icon: 'mdi-file-document-outline',
        link: {
          name: 'PayablePort',
          params: { portType: EPortType.Payables },
          query: { childIcon: 'mdi-file-document-outline' }
        },
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
          params: { portType: EPortType.OperatingRevenue },
          query: { childIcon: 'mdi-cash-plus' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'InterestIncome',
        icon: 'mdi-percent-outline',
        link: {
          name: 'InterestIncomePort',
          params: { portType: EPortType.InterestIncome },
          query: { childIcon: 'mdi-percent-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DividendIncome',
        icon: 'mdi-cash-refund',
        link: {
          name: 'DividendIncomePort',
          params: { portType: EPortType.DividendIncome },
          query: { childIcon: 'mdi-cash-refund' }
        },
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
          params: { portType: EPortType.OperatingExpense },
          query: { childIcon: 'mdi-cash-minus' }
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
          params: { portType: EPortType.InterestExpense },
          query: { childIcon: 'mdi-calculator-variant-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'BadDebtExpense',
        icon: 'mdi-alert-circle-outline',
        link: {
          name: 'BadDebtExpensePort',
          params: { portType: EPortType.BadDebtExpense },
          query: { childIcon: 'mdi-alert-circle-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'DisposalLoss',
        icon: 'mdi-archive-remove-outline',
        link: {
          name: 'DisposalLossPort',
          params: { portType: EPortType.DisposalLoss },
          query: { childIcon: 'mdi-archive-remove-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  },
  {
    title: 'Equity_Ports',
    icon: 'mdi-chart-donut', // Represents portfolio distribution & total equity
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'PaidInCapital',
        icon: 'mdi-account-group-outline', // Represents capital contributed by shareholders/owners
        link: {
          name: 'PaidInCapitalPort',
          params: { portType: EPortType.PaidInCapital },
          query: { childIcon: 'mdi-account-group-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'RetainedEarnings',
        icon: 'mdi-piggy-bank-outline', // Represents accumulated earnings saved over time
        link: {
          name: 'RetainedEarningsPort',
          params: { portType: EPortType.RetainedEarnings },
          query: { childIcon: 'mdi-piggy-bank-outline' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'OtherReserves',
        icon: 'mdi-safe', // Represents reserved assets kept for safety/legal purposes
        link: {
          name: 'OtherReservesPort',
          params: { portType: EPortType.OtherReserves },
          query: { childIcon: 'mdi-safe' }
        },
        level: 1,
        access: 0,
        compType: 1,
        children: []
      }
    ]
  }
]
export default menuList
