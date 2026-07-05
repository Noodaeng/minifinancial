// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { useApi } from '../services/api'
import { showError, errorToLog, msgToLog } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'

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
  actions: {
 async doLogin(payload: { username: string; password: string }): Promise<boolean> {
  try {
    const api = useApi()
    // ลบ Authorization Header ออกก่อนสำหรับการยิง Login เพื่อป้องกัน Preflight (CORS)
    delete api.defaults.headers.common['Authorization']


    // 1. ดึง Secret Token จาก Environment Variable แทนการ Hardcode
    const secretToken = MyConfig.instance.AppConfig.AuthToken
    const loginUrl = MyConfig.instance.AppConfig.DbUrl

    const params = new URLSearchParams()
          params.append("token", secretToken)
          params.append("sheet", "users")
          params.append("action", "login")
          params.append("username", payload.username)
          params.append("password", payload.password)

    const response = await api.post(loginUrl, params, {
  headers: {
    // กำหนด Content-Type เป็น Form URL Encoded เพื่อไม่ให้ติด CORS
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

    const data = response.data
    console.log('Login response data:', response)

    if (data && data.status === "success") {
      const sessionToken = data.token

      // 2. บันทึก Token ลง State/LocalStorage
      this.setToken(sessionToken)

      // 3. อัปเดต Authorization Header สำหรับ Request ถัดไป
      api.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`

      // 4. ดึงข้อมูล Profile ของผู้ใช้
      await this.getMe(sessionToken)
      return true
    }

    // 5. จัดการกรณี API ส่งสถานะ Fail กลับมา
    showError(data?.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
    return false

  } catch (err: any) {
    // 6. ดึงข้อความ Error ให้กระชับและอ่านรู้เรื่อง
    const errorMessage = err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย'
    showError(errorMessage)
    console.error('Store->error:', err)
    return false
  }
},

signOut() {
  try {
    const api = useApi()
    api.defaults.headers.common.Authorization = ''
    this.removeToken()
  } catch (err) {
    errorToLog(err)
    console.error('Store->error', err)
  }
},

    async getMe(token: string) {
      try {
        const decodedToken = JSON.parse(JSON.stringify(jwtDecode(token)))
        const infos = []
        for (const key in decodedToken) {
          const value = decodedToken[key]
          infos.push(value)
        }
        const user = { name: infos[0], role: infos[1], exp: infos[2] }
        const permissions: { Menuname: string; Privilege: number }[] = []
        const api = useApi()
        await api
          .get('/api/Auth/permissions', {
            params: {
              role: user.role,
            },
          })
          .then((response) => {
            if (user.role != 'PowerUser') {
              const objs = response.data
              objs.forEach((obj: { Menuname: string; Privilege: number }) => {
                permissions.push({
                  Menuname: obj.Menuname,
                  Privilege: obj.Privilege,
                })
              })
            }
            this.setMe(user, permissions)
          })
          .catch((err) => {
            showError(err)
            this.setMe(user, permissions)
            console.error('Store->error', err)
          })
      } catch (err) {
        errorToLog(err)
        console.error('Store->error', err)
      }
    },

    async init() {
      try {
        const token = sessionStorage.getItem('token')
        if (token) {
          this.setToken(JSON.parse(token))
          const api = useApi()
          api.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(token)
          await this.getMe(token)
        } else {
          this.removeToken()
        }
      } catch (err) {
        errorToLog(err)
        console.error('Store->error', err)
      }
    },
    setToken(token: string) {
      try {
        this.$patch({
          token: token,
          isAuthenticated: true,
        })
        sessionStorage.setItem('token', JSON.stringify(token))
      } catch (err) {
        errorToLog(err)
        console.error('Store->error', err)
      }
    },
    removeToken() {
      try {
        this.$patch({
          token: '',
          isAuthenticated: false,
          me: {},
        })
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
      } catch (err) {
        errorToLog(err)
        console.error('Store->error', err)
      }
    },
    setMe(
      user: { name: string; role: string; exp: any },
      permissions: { Menuname: string; Privilege: number }[],
    ) {
      try {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('permissions', JSON.stringify(permissions))
        localStorage.setItem('lastUser', user.name)
        this.$patch({
          me: user,
          permissions: permissions,
        })

        const conf = MyConfig.instance
        conf.LoginBy = user.name
        conf.LoginRole = user.role
        msgToLog('login to system')
      } catch (err) {
        errorToLog(err)
        console.error('Store->error', err)
      }
    },
  },
  getters: {
    getUser: (state) => state.me,
    getToken: (state) => state.token,
    getAuthenticated: (state) => state.isAuthenticated,
  },
})
