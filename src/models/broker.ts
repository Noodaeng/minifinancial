import BaseModel from './baseModel'

export default class Broker extends BaseModel {
  brokerId = ''
  cardId = ''
  name = ''
  email = ''
  phone = ''
  address = ''
  lineId = ''
  creditLimit = 0
  isActive = 0
  brokerType = 0
  remark = ''
}
