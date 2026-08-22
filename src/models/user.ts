import BaseModel from './baseModel'
export default class User extends BaseModel {
  userId = ''
  userName = ''
  password = ''
  role?: number | null
  sessionToken?: string | null
  remark?: string | null
}
