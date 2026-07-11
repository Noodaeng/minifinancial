export enum ERole {
  //[Description("Guest")]
  Guest,
  //[Description("User")]
  User,
  //[Description("Supervisor")]
  Supervisor,
  //[Description("Admin")]
  Admin,
  //[Description("Power User")]
  PowerUser
}
export enum EAlarmLevel {
  //[Description("None")]
  None,
  //[Description("Notify")]
  Notify = 1,
  //[Description("Information")]
  Information = 2,
  //[Description("Success")]
  Success = 3,
  //[Description("Warning")]
  Warning = 4,
  //[Description("Error")]
  Error = 5
}
export enum EDataState {
  None,
  Init = 1,
  Selected = 2,
  New = 3,
  ValidEdit = 4,
  ValidNew = 5
}
export enum ECreditCustomerType {
  SuperPrime = 0, // ลูกค้าชั้นพิเศษ
  Prime = 1, // ลูกค้าชั้นดี
  NearPrime = 2, // ลูกค้ากึ่งดี
  Subprime = 3 // ลูกค้าชั้นเลว
}
