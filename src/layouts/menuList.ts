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
    title: 'Customers',
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
      }
    ]
  },
  {
    title: 'Ports',
    icon: 'mdi-account-multiple-outline',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'CashAndDeposits',
        icon: 'mdi-account-details-outline',
        link: '/customers',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'LoansReceivable',
        icon: 'mdi-account-details-outline',
        link: '/loans',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'Securities',
        icon: 'mdi-account-details-outline',
        link: '/customers',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'EquityHoldings',
        icon: 'mdi-account-details-outline',
        link: '/customers',
        level: 1,
        access: 0,
        compType: 1,
        children: []
      },
      {
        title: 'OtherInvestments',
        icon: 'mdi-account-details-outline',
        link: '/customers',
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
