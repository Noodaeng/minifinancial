export default class User {
  userId = ''
  userName = ''
  password = ''
  role?: number | null
  sessionToken?: string | null
  remark?: string | null
  createOn? = '' // TEXT (date/time string)
  createBy? = ''
}
