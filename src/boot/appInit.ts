import { defineBoot } from '#q-app'
import MyConfig from '../modules/myConfig'
import { createApi } from '../services/api'
import axios from 'axios'
import * as validator from 'validator'

export default defineBoot(async ({ app }) => {
  const myConfig = MyConfig.instance
  await myConfig.isInitialized()

  const baseURL = ''

  createApi(baseURL)

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$validator = validator
})

export { axios, validator }
