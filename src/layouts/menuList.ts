

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
        children: [],
      },
      {
        title: 'Preference',
        icon: 'room_preferences',
        link: '/preference',
        level: 1,
        access: 0,
        compType: 0,
        children: [],
      },
    ],
  },
  {
    title: 'Mixer_settings',
    icon: 'mdi-cog-clockwise',
    link: '/',
    level: 0,
    access: 0,
    compType: 1,
    children: [
      {
        title: 'Mixers',
        icon: 'mdi-cog-clockwise',
        link: '/mixers',
        level: 1,
        access: 0,
        compType: 1,
        children: [],
      },

    ],
  },

]
export default linksList
