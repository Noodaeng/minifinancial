import {  ApplicationTheme } from '../types/myTypes'
import { ref, Ref } from 'vue'
import axios from 'axios'
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
  get publicPath(): string {
    return location.origin.toString() ? location.origin.toString() : 'http://localhost:9000'
  }
  //User
  private _loginBy = ''
  get LoginBy() {
    return this._loginBy
  }
  set LoginBy(value: string) {
    this._loginBy = value
  }
  //User role
  private _loginRole = ''
  get LoginRole() {
    return this._loginRole
  }
  set LoginRole(value: string) {
    this._loginRole = value
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
    return lastLanguage ? lastLanguage : 'en-US'
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
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw err.response.data
      })
  }

}

export class AppConfigModel {
  ClientId = 0
  ScreenIndex = 0
  Theme = 0
  DbUrl=""
  AuthToken ="MiniFinancial_Secret_Token_2026_XYZ"
  PrivateKey="MiniFinancial_Private_Key_2026_XYZ"
}

