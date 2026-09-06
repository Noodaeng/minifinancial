import { ref } from 'vue'
import MyConfig from '../modules/myConfig'
import { useApi } from '../services/api'
import {
  LoanPaymentRecord,
  LoanPaymentsApiResponse,
  BatchNotifiesApiResponse,
  LoanNotify
} from '../types/myTypes'
import {
  showError,
  getDaysDifference,
  currentDateTimeStr,
  notifyCodes,
  ceiling
} from '../modules/appUtils'
import Notify from '../models/notify'
import { i18n } from '../i18n'
export function useLoanNotify() {
  const { t } = i18n.global

  const myConf = MyConfig.instance
  const loanNotifies = ref<LoanNotify[]>([])

  const initNotify = async () => {
    const payments = await getLoanPayments()
    if (!payments || payments.length <= 0) return
    // console.log('*******get---------payments*****', payments)
    const output = getLoanNotifies(payments)
    const models = output[0]
    loanNotifies.value = output[1]
    if (models && models.length > 0 && !myConf.IsLoanNotifySaved) {
      const result = await createBatchNotifies(models)
      if (result) myConf.setLoanNotifySaved()
    }
  }
  const getLoanNotifies = (
    payRcds: LoanPaymentRecord[]
  ): [notifyModels: Notify[], notifies: LoanNotify[]] => {
    const output: [Notify[], LoanNotify[]] = [[], []]

    payRcds.forEach(p => {
      // Only check active ports (status === 1) with valid payment dates
      if (p.status !== 1 || !p.sessionCreateOn) return

      const dateDif = getDaysDifference(p.sessionCreateOn) ?? 0
      let periodsPassed = 0

      // 1. Calculate how many payment terms have elapsed
      switch (p.paymentTerm) {
        case 0: // Daily
          periodsPassed = dateDif // Grace period of 1 day
          break
        case 1: // Weekly
          periodsPassed = Math.trunc(dateDif / 7)
          break
        case 2: // Monthly
          periodsPassed = Math.trunc(dateDif / 30)
          break
        case 3: // Yearly
          periodsPassed = Math.trunc(dateDif / 365)
          break

        case 4: // CustomDays
          periodsPassed = Math.trunc(dateDif / (p.paymentRate || 1))
          break
        default:
          return
      }

      // Skip if no payment period has matured yet
      if (periodsPassed <= 0) return

      // 2. Expected payment = rate per period * periods passed
      const expectedAmount = p.paymentRate * periodsPassed
      const difAmount = expectedAmount - p.totalType1And2AfterSession
      const difCount = p.paymentRate > 0 ? ceiling(difAmount / p.paymentRate, 1) : 0
      // 3. Payment delay occurs if expected total > actual payments made
      const ignoreStatus = new Set([0, 4, 5, 6])
      if (
        dateDif > 0 &&
        expectedAmount > p.totalType1And2AfterSession &&
        !ignoreStatus.has(p.status)
      ) {
        output[0].push({
          notifyCode: '010001', // Payment_delay
          portId: p.portId,
          createOn: currentDateTimeStr,
          createBy: myConf.LoginUserId
        })
        output[1].push({
          portId: p.portId,
          notifyCode: '010001', // Payment_delay
          customerName: p.customerName,
          description: `${notifyCodes['010001'] ?? ''} ${t('Total_Amount')}  : ${difAmount} : ${difCount} ${t('Times')}`
        })
      }
    })

    return output
  }
  //++++++++++Api++++++++++++++++++++
  const getLoanPayments = async (): Promise<LoanPaymentRecord[]> => {
    try {
      const secretToken = myConf.AppConfig.AuthToken
      const baseUrl = myConf.AppConfig.DbUrl
      const api = useApi()

      // Send request to API endpoint
      const response = await api.post<LoanPaymentsApiResponse>(
        `${baseUrl}/api/notify/getLoanPayments`,
        { token: secretToken }
      )

      // Handle both Axios response wrapper (.data) and direct payload returns
      const resData: LoanPaymentsApiResponse =
        response?.data && 'status' in response.data
          ? response.data
          : (response as unknown as LoanPaymentsApiResponse)

      if (resData?.status === 'success' && Array.isArray(resData.data)) {
        return resData.data
      }

      return []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }
  const createBatchNotifies = async (notifies: Notify[]): Promise<boolean> => {
    try {
      if (!notifies.length) return false

      const secretToken = myConf.AppConfig.AuthToken
      const baseUrl = myConf.AppConfig.DbUrl
      const api = useApi()

      // Send request to API endpoint
      const response = await api.post<BatchNotifiesApiResponse>(
        `${baseUrl}/api/notify/createBatchNotifies`,
        {
          token: secretToken,
          notifies: notifies
        }
      )

      // Handle both Axios response wrapper (.data) and direct payload returns
      const resData: BatchNotifiesApiResponse =
        response?.data && 'status' in response.data
          ? response.data
          : (response as unknown as BatchNotifiesApiResponse)

      if (resData?.status === 'success') {
        return true
      }

      return false
    } catch (err: any) {
      await showError(err)
      return false
    }
  }
  return {
    initNotify,
    loanNotifies
  }
}
