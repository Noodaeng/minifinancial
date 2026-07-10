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
  PowerUser,
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
  Error = 5,
}
