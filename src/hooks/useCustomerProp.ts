import { useApi } from '../services/api'
import { showError } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
import Customer from '../models/customer'

export function useCustomerProp() {
  const getAllCustomer = async (): Promise<Customer[]> => {
    try {
      const api = useApi()
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl // ลิงก์ที่ลงท้ายด้วย /exec

      // 💡 ส่งผ่าน URL Parameter เพื่อให้ Google Apps Script ไปเรียกใช้ ฟังก์ชัน doGet(e)
      const finalUrl = `${baseUrl}?token=${encodeURIComponent(secretToken)}&sheet=customers`

      const response = await api.get(finalUrl)

      // ดึงข้อมูลมาใช้งาน (ปกติ axios/api wrapper มักจะแปลง json ให้แล้วใน response.data)
      const output = response.data
      console.log('Customer output data:', output)
      return output
    } catch (err) {
      await showError(err)
      return []
    }
  }

  return { getAllCustomer }
}
