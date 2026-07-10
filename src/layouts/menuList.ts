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
  }
]
export default linksList
