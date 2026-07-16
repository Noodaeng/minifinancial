// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { useApi } from '../services/api'
import { showError, errorToLog, msgToLog } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'

interface UserProfile {
  name: string
  role: string | number
  exp?: any
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    me: null as UserProfile | null,
    permissions: [] as any[],
    token: '',
    isAuthenticated: false
  }),
  actions: {
    async doLogin(payload: { username: string; password: string }): Promise<boolean> {
      try {
        const api = useApi()
        delete api.defaults.headers.common['Authorization']

        const secretToken = MyConfig.instance.AppConfig.AuthToken
        const loginUrl = MyConfig.instance.AppConfig.DbUrl + '/api/login'
        //const privateKey = MyConfig.instance.AppConfig.PrivateKey

        // const encodeUsername = btoa(payload.username + privateKey)
        // const encodePassword = btoa(payload.password + privateKey)
        console.log('encode user password=>', payload.username, payload.password)
        const sendpayload = {
          token: secretToken,
          username: payload.username,
          password: payload.password
        }

        const response = await api.post(loginUrl, JSON.stringify(sendpayload), {
          headers: { 'Content-Type': 'application/json' }
        })

        const data = response.data
        console.log('Login response data--!!!new+++:', data)

        if (data && data.status === 'success') {
          const sessionToken = data.token

          await this.setToken(sessionToken)

          const user = {
            name: payload.username || 'Unknown',
            role: data.user?.role || 'User',
            exp: null
          }

          const permissions: any[] = []
          await this.setMe(user, permissions)
          return true
        }

        await showError(data?.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        return false
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย'
        await showError(errorMessage)
        console.error('Store->error:', err)
        return false
      }
    },

    async signOut() {
      try {
        const api = useApi()
        api.defaults.headers.common.Authorization = ''
        await this.removeToken()
      } catch (err) {
        await errorToLog(err)
        console.error('Store->error', err)
      }
    },

    async init() {
      try {
        const token = sessionStorage.getItem('token')
        const user = sessionStorage.getItem('user')
        const permissions = sessionStorage.getItem('permissions')

        if (token && user) {
          const parsedToken = JSON.parse(token)
          await this.setToken(parsedToken)

          this.$patch({
            me: JSON.parse(user),
            permissions: permissions ? JSON.parse(permissions) : []
          })
        } else {
          await this.removeToken()
        }
      } catch (err) {
        await errorToLog(err)
        console.error('Store->error', err)
      }
    },

    async setToken(token: string) {
      try {
        this.$patch({
          token: token,
          isAuthenticated: true
        })
        sessionStorage.setItem('token', JSON.stringify(token))
      } catch (err) {
        await errorToLog(err)
        console.error('Store->error', err)
      }
    },

    async removeToken() {
      try {
        this.token = ''
        this.isAuthenticated = false
        this.me = null
        this.permissions = []

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('permissions')
      } catch (err) {
        await errorToLog(err)
        console.error('Store->error', err)
      }
    },

    async setMe(
      user: { name: string; role: string; exp: any },
      permissions: { Menuname: string; Privilege: number }[]
    ) {
      try {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('permissions', JSON.stringify(permissions))
        localStorage.setItem('lastUser', user.name)

        this.me = user
        this.permissions = permissions

        const conf = MyConfig.instance
        conf.LoginBy = user.name
        conf.LoginRole = user.role
        await msgToLog('login to system')
      } catch (err) {
        await errorToLog(err)
        console.error('Store->error', err)
      }
    }
  },
  getters: {
    getUser: (state): UserProfile | null => state.me,
    getToken: (state): string => state.token,
    getAuthenticated: (state): boolean => state.isAuthenticated
  }
})
