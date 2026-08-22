import BaseModel from './baseModel'
export default class Port extends BaseModel {
  portId = ''

  description = ''
  accountCategory = 0
  portType = 0
  portSubType = 0

  status = 0
  remark = ''

  customerId = ''
  brokerId = ''
  amount = 0
  interest = 0

  paymentTerm = 0
  paymentRate = 0
  period = 0
}
