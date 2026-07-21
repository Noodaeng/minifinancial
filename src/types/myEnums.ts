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
export enum AccountCategory {
  Assets = 0, // สินทรัพย์ +Dr,-Cr
  Liabilities = 1, // หนี้สิน +Cr,-Dr
  Equity = 2, // ทุน +Cr,-Dr
  Revenue = 3, // รายได้ +Cr,-Dr
  Expenses = 4 // ค่าใช้จ่าย +Dr,-Cr
}

export enum EInvestPortType {
  CashAndDeposits = 0, // เงินสด / เงินฝาก (Savings & Bank Deposits)
  LoansReceivable = 1, // สินเชื่อและเงินให้กู้ (Loan Assets)
  Securities = 2, // การลงทุนในตราสาร เช่น พันธบัตร หุ้นกู้
  EquityHoldings = 3, // การลงทุนในทุน/หุ้น (Equity Investments)
  OtherInvestments = 4 // อื่น ๆ เช่น กองทุนรวม, อสังหาริมทรัพย์เพื่อการลงทุน
}
export enum EPaymentTerm {
  Daily = 0,
  Monthly = 1,
  Yearly = 2
}
// Cash & Deposits
export enum CashTransactionType {
  Deposit = 0, // ฝากเงิน
  Withdrawal = 1, // ถอนเงิน
  InterestIncome = 2, // รับดอกเบี้ย
  Transfer = 3 // โอนเงิน
}

// Loans
export enum LoanTransactionType {
  LoanIssued = 0, // ปล่อยกู้
  LoanRepayment = 1, // รับชำระคืน
  InterestAccrual = 2, // ดอกเบี้ยค้างรับ
  BadDebtWriteOff = 3, // ตัดหนี้สูญ
  ReFinance = 4 // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
}

// Securities
export enum SecurityTransactionType {
  SecurityPurchase = 0, // ซื้อพันธบัตร/หุ้นกู้
  SecuritySale = 1, // ขายพันธบัตร/หุ้นกู้
  CouponPayment = 2, // รับคูปอง/ดอกเบี้ย
  FairValueAdjustment = 3 // ปรับมูลค่ายุติธรรม
}

// Equity
export enum EquityTransactionType {
  EquityPurchase = 0, // ซื้อหุ้น
  EquitySale = 1, // ขายหุ้น
  DividendReceived = 2, // รับเงินปันผล
  EquityMethodAdjustment = 3 // ปรับตามวิธีส่วนได้เสีย
}

// Other Investments
export enum OtherTransactionType {
  RealEstatePurchase = 0, // ซื้ออสังหาริมทรัพย์
  RentalIncome = 1, // รับค่าเช่า
  MutualFundInvestment = 2, // ลงทุนกองทุนรวม
  DisposalGainLoss = 3 // กำไร/ขาดทุนจากการจำหน่าย
}
