// src/stores/authStore.ts
import { defineStore } from 'pinia'


// interface User {
//   username: string
// }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    me: {},
    permissions: {},
    token: '',
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.me,
    getToken: (state) => state.token,
    getAuthenticated: (state) => state.isAuthenticated,
  },
})
