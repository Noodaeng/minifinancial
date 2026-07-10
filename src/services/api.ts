import axios, { AxiosInstance } from 'axios'

let api: AxiosInstance

export function createApi(baseURL: string) {
  api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function useApi() {
  if (!api) throw new Error('API not initialized')
  return api
}
