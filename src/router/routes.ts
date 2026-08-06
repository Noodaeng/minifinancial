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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
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
        props: true,
        component: () => import('../pages/settings/PortPage.vue')
      }
    ]
  }
]

export default routes
