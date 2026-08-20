import { ApplicationTheme } from '../types/myTypes'
import { ref, Ref } from 'vue'
import axios from 'axios'
import { useApi } from '../services/api'
import User from '../models/user'
import { useAuthStore } from '../stores/authStore'
export default class MyConfig {
  private constructor() {
    this.isConstructed = true
  }
  private static _instanceCache: MyConfig
  static get instance(): MyConfig {
    if (!this._instanceCache) {
      this._instanceCache = new this()
    }
    return this._instanceCache
  }

  initialized = false
  isConstructed = false
  private _users = ref<{ userId: string; role: number }[]>([{ userId: 'USR-0001', role: 4 }])
  private _loginUser = ref<{ userId: string; name: string; role: string; exp: any }>()
  get publicPath(): string {
    return location.origin.toString() ? location.origin.toString() : 'http://localhost:9000'
  }
  //User
  get LoginUserId(): string {
    const authStore = useAuthStore()
    return authStore.getUser?.userId ?? '-'
  }
  get LoginUserName(): string {
    const authStore = useAuthStore()
    return authStore.getUser?.name ?? 'Unknow'
  }
  get LoginUserRole(): string | number {
    const authStore = useAuthStore()
    return authStore.getUser?.role ?? 0
  }
  //Token
  get Token(): string {
    const token = sessionStorage.getItem('token')
    return token && token !== null ? JSON.parse(token) : ''
  }
  //last login
  get LastLogin() {
    const lastUser = localStorage.getItem('lastUser')
    return lastUser ? lastUser : ''
  }
  //last language
  get LastLanguage() {
    const lastLanguage = localStorage.getItem('lastLanguage')
    return lastLanguage ? lastLanguage : 'th-TH'
  }
  set LastLanguage(value: string) {
    if (value) {
      localStorage.setItem('lastLanguage', value)
    }
  }
  //last Theme

  get LastTheme() {
    const str = localStorage.getItem('LastTheme') as unknown as Ref<ApplicationTheme>
    const theme: Ref<ApplicationTheme> = ref(str)
    return theme.value ? theme.value : 'bcs-default'
  }
  set LastTheme(value: ApplicationTheme) {
    if (value) {
      localStorage.setItem('LastTheme', value)
    }
  }
  //App Config
  useExternData = false
  private _appConfig: AppConfigModel = new AppConfigModel()

  get AppConfig() {
    return this._appConfig
  }

  //Helper
  async isInitialized(): Promise<boolean> {
    await this.getConfig()
    this.initialized = true
    return this.initialized
  }
  async getConfig() {
    const appConf = await this.getJsonData('/configs/appconfigs.json')
    this._appConfig = Object.assign(new AppConfigModel(), JSON.parse(JSON.stringify(appConf)))
  }
  async getJsonData(jsonFile: string): Promise<string> {
    return axios
      .get(`${this.publicPath}${jsonFile}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        throw err.response.data
      })
  }

  async loadUsers() {
    try {
      const api = useApi()
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl

      const url = `${baseUrl}/api/crud/get-alldata`
      const response = await api.post(url, {
        token: secretToken,
        table: 'users'
      })

      const users: User[] = response.data?.data || []
      if (users && users.length > 0) {
        users.forEach(u => {
          if (!this._users.value.some(k => k.userId === u.userId)) {
            this._users.value.push({ userId: u.userId, role: u.role ?? 0 })
          }
        })
      }
    } catch (err) {
      console.error('load all user:', err)
      return []
    }
  }
  getUserRole(userId: string): number {
    const user = this._users.value.find(u => u.userId === userId)
    return user ? user.role : 0
  }
  setUserLogin(user: { userId: string; name: string; role: string; exp: any }) {
    this._loginUser.value = user
  }
}

export class AppConfigModel {
  ClientId = 0
  ScreenIndex = 0
  Theme = 0
  DbUrl = ''
  AuthToken = 'MiniFinancial_Secret_Token_2026_XYZ'
  PrivateKey = 'finance'
  Version = '1.0.0'
}
