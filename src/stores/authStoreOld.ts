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
    me: null as UserProfile | null, // 💡 เปลี่ยนจาก {} เป็น null เพื่อให้ระบบเช็คได้ง่ายว่ามีผู้ใช้ล็อกอินอยู่หรือไม่
    permissions: [] as any[],
    token: '',
    isAuthenticated: false
  }),
  actions: {
    async doLogin(payload: { username: string; password: string }): Promise<boolean> {
      try {
        const api = useApi()
        // ลบ Authorization Header ออกชั่วคราวเพื่อเลี่ยงการเกิด Preflight (CORS)
        delete api.defaults.headers.common['Authorization']

        const secretToken = MyConfig.instance.AppConfig.AuthToken
        const loginUrl = MyConfig.instance.AppConfig.DbUrl
        const privateKey = MyConfig.instance.AppConfig.PrivateKey
        const encodeUsername = btoa(payload.username + privateKey)
        const encodePassword = btoa(payload.password + privateKey) // Base64 encode the password
        const sendpayload = {
          token: secretToken,
          sheet: 'users',
          action: 'login',
          username: encodeUsername,
          password: encodePassword
        }

        // ยิงข้อมูลออกไปโดยแปลงก้อน Payload ให้เป็น String ตรงๆ
        // และบังคับ Header เป็น text/plain เพื่อหลบหลีกการตรวจ CORS Preflight
        const response = await api.post(loginUrl, JSON.stringify(sendpayload), {
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
        })

        const data = response.data
        console.log('Login response data:', data)

        if (data && data.status === 'success') {
          const sessionToken = data.token

          // 💡 ดึงข้อมูลผู้ใช้จาก Google Sheets ที่ส่งกลับมาในฟิลด์ user (ซึ่งถอดคอลัมน์ password ออกแล้ว)
          //const userProfile = payload.username;

          // 2. บันทึก Token ลง State/LocalStorage
          await this.setToken(sessionToken)

          // 3. บันทึกและแมปข้อมูล Profile ลงระบบแทนการใช้ jwtDecode
          const user = {
            name: payload.username || 'Unknown',
            role: data.role || 'User',
            exp: null
          }

          // กำหนด Permission เริ่มต้นตามสิทธิ์ใน Google Sheets (หากมีคอลัมน์เหล่านั้น)
          const permissions: any[] = []

          await this.setMe(user, permissions)
          return true
        }

        // 4. จัดการกรณี API ส่งสถานะ Fail กลับมา
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
        // ✅ แก้ไขจุดนี้เช่นกัน: เปลี่ยนมาล้างค่าทีละตัวแทนการใช้ $patch
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

        // ✅ แก้ไขจุดนี้: เปลี่ยนจาก this.$patch มากำหนดค่าตรงๆ ตัวจับไทป์จะไม่ฟ้อง Error
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
    // 💡 ส่งค่าออกไปพร้อมบอกไทป์ชัดเจน เวลาเอาไปเปิดใช้ในหน้าอื่น พิมพ์ getUser.name จะขึ้นแนะนำทันที
    getUser: (state): UserProfile | null => state.me,
    getToken: (state): string => state.token,
    getAuthenticated: (state): boolean => state.isAuthenticated
  }
})
