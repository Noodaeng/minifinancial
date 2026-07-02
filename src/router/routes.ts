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
          requiresAuth: true,
        },
      },
    ],
  },
{
    path: '/login',
    component: () => import('../layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/settings/LoginPage.vue') }],
  },

]

export default routes
