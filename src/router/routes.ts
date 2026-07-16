import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/DashBoard.vue'),
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
    children: [{ path: '', component: () => import('../pages/settings/CustomerPage.vue') }]
  },
  {
    path: '/brokers',
    component: () => import('../layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/settings/BrokerPage.vue') }]
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
  }
]

export default routes
