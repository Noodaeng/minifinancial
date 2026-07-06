import { useApi } from '../services/api'
import { showError } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import Customer from '../models/customer'

export function useCustomerProp() {
  const getAllCustomer = async (): Promise<Customer[]> => {
    // Implementation for getting all customers
    try {
      const api = useApi()
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const loginUrl = MyConfig.instance.AppConfig.DbUrl

      const sendpayload = {
        token: secretToken,
        sheet: 'customers'
      }
      const response = await api.post(loginUrl, JSON.stringify(sendpayload), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      })
      const data = response.data
      console.log('Customer data:', data)
      return []
    } catch (err) {
      await showError(err)
      return []
    }
  }

  return { getAllCustomer }
}
