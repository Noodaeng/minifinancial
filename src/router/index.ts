import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  // ปรับเปลี่ยนจุดนี้ให้ใช้มาตรฐานใหม่ของ Quasar v3 / Vite 🚀
  const createHistory = import.meta.env.SSR
    ? createMemoryHistory
    : import.meta.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // ใช้ import.meta.env.VUE_ROUTER_BASE แทนของเดิมเช่นกันครับ
    history: createHistory(import.meta.env.VUE_ROUTER_BASE)
  })

  // Add route guards
  // Add updated route guards
  // Drop 'from' entirely since it's an unused trailing argument
  Router.beforeEach(to => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.getAuthenticated) {
      console.log('Redirecting to login → Authenticated:', authStore.getAuthenticated)

      return {
        path: '/login',
        query: { to: to.path }
      }
    }
  })
  return Router

  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore()
  //   // authStore.checkSession() // Restore session if possible

  //   if (to.meta.requiresAuth && !authStore.getAuthenticated) {
  //     // Redirect to login if not authenticated
  //     console.log('Redirecting to login → Authenticated:', authStore.getAuthenticated)
  //     next({
  //       path: '/login',
  //       query: { to: to.path },
  //     })
  //   } else {
  //     next() // Continue to the route
  //   }
  // })
})
