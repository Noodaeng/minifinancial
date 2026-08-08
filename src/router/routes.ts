import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/DashBoardPage.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/settings/LoginPage.vue') }]
  },
  {
    path: '/customers',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':childIcon',
        name: 'Customer',
        props: true,
        component: () => import('../pages/settings/CustomerPage.vue')
      }
    ]
  },
  {
    path: '/brokers',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':childIcon',
        name: 'Broker',
        props: true,
        component: () => import('../pages/settings/BrokerPage.vue')
      }
    ]
  },
  {
    path: '/cashPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'CashPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/loanPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'LoanPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/securityPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'SecurityPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/equityPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'EquityPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/otherPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'OtherPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/borrowPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'BorrowPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/payablePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'PayablePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/operatingRevenuePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'OperatingRevenuePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/interestIncomePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'InterestIncomePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/dividendIncomePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'DividendIncomePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/operatingExpensePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'OperatingExpensePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/interestExpensePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'InterestExpensePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/badDebtExpensePort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'BadDebtExpensePort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/disposalLossPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'DisposalLossPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/paidInCapitalPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'PaidInCapitalPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/retainedEarningsPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'RetainedEarningsPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  },
  {
    path: '/otherReservesPort',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: ':portType',
        name: 'OtherReservesPort',
        props: route => ({
          portType: route.params.portType,
          childIcon: (route.query.childIcon as string) || 'mdi-widgets-outline' // <-- Pull from query
        }),
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  }
]

export default routes
