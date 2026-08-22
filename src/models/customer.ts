import BaseModel from './baseModel'
export default class Customer extends BaseModel {
  customerId = ''
  cardId = ''
  name = ''
  email = ''
  phone = ''
  address = ''
  lineId = ''
  creditLimit = 0
  isActive = 0
  customerType = 0
  remark = ''
}
