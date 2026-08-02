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
  Assets = 0, // สินทรัพย์,ลูกหนี้ +Dr,-Cr
  Liabilities = 1, // หนี้สิน +Cr,-Dr
  Equity = 2, // ทุน +Cr,-Dr
  Revenue = 3, // รายได้ +Cr,-Dr
  Expenses = 4 // ค่าใช้จ่าย +Dr,-Cr
}

export enum EPortType {
  //Assets
  CashAndDeposits = 0, // เงินสด / เงินฝาก (Savings & Bank Deposits)
  LoansReceivable = 1, // สินเชื่อและเงินให้กู้ (Loan Assets)
  Securities = 2, // การลงทุนในตราสาร เช่น พันธบัตร หุ้นกู้
  EquityHoldings = 3, // การลงทุนในทุน/หุ้น (Equity Investments)
  OtherInvestments = 4, // อื่น ๆ เช่น กองทุนรวม, อสังหาริมทรัพย์เพื่อการลงทุน
  // Liabilities
  Borrowings = 5, // เงินกู้ยืม / หนี้สิน (Borrowings & Liabilities) → AccountCategory.Liabilities
  Payables = 6, // เจ้าหนี้การค้า / เจ้าหนี้อื่น ๆ (Accounts Payable) → AccountCategory.Liabilities

  // Revenue
  OperatingRevenue = 7, // รายได้จากการดำเนินงาน (Operating Revenue) → AccountCategory.Revenue
  InterestIncome = 8, // รายได้ดอกเบี้ย (Interest Income) → AccountCategory.Revenue
  DividendIncome = 9, // รายได้เงินปันผล (Dividend Income) → AccountCategory.Revenue

  // Expenses
  OperatingExpense = 10, // ค่าใช้จ่ายดำเนินงาน (Operating Expense) → AccountCategory.Expenses
  InterestExpense = 11, // ดอกเบี้ยจ่าย (Interest Expense) → AccountCategory.Expenses
  BadDebtExpense = 12, // ค่าเผื่อหนี้สงสัยจะสูญ (Bad Debt Expense) → AccountCategory.Expenses
  DisposalLoss = 13 // ขาดทุนจากการจำหน่าย (Disposal Loss) → AccountCategory.Expenses
}
export enum CashAndDepositsSubType {
  Cash = 0, // เงินสด
  SavingsAccount = 1, // บัญชีออมทรัพย์
  FixedDeposit = 2 // เงินฝากประจำ
}
export enum LoansReceivableSubType {
  PersonalLoan = 0, // เงินกู้บุคคล
  BusinessLoan = 1 // เงินกู้ธุรกิจ
}
export enum SecuritiesSubType {
  GovernmentBond = 0, // พันธบัตรรัฐบาล
  CorporateBond = 1 // หุ้นกู้เอกชน
}
export enum EquityHoldingsSubType {
  ListedEquity = 0, // หุ้นสามัญที่จดทะเบียนในตลาดหลักทรัพย์
  PrivateEquity = 1 // หุ้นส่วน/ทุนในกิจการที่ไม่จดทะเบียน
}
export enum OtherInvestmentsSubType {
  RealEstate = 0, // อสังหาริมทรัพย์เพื่อการลงทุน
  MutualFund = 1, // กองทุนรวม
  CommunitySavingShare = 2, // การเล่นแชร์ / ออมหมุนเวียนในชุมชน
  Insurance = 3 // การซื้อประกัน / กรมธรรม์เพื่อการลงทุนหรือคุ้มครอง
}
// Borrowings (5)
export enum EBorrowingSubType {
  ShortTermLoan = 0, // เงินกู้ยืมระยะสั้น
  LongTermLoan = 1, // เงินกู้ยืมระยะยาว
  Mortgage = 2 // เงินกู้จำนอง / สินเชื่อบ้าน
}

// Payables (6)
export enum EPayableSubType {
  AccountsPayable = 0, // เจ้าหนี้การค้า
  AccruedExpense = 1, // ค่าใช้จ่ายค้างจ่าย
  OtherPayable = 2 // เจ้าหนี้อื่น ๆ
}

// OperatingRevenue (7)
export enum EOperatingRevenueSubType {
  SalesRevenue = 0, // รายได้จากการขาย
  ServiceRevenue = 1, // รายได้จากการบริการ
  RentalIncome = 2 // รายได้ค่าเช่า
}

// InterestIncome (8)
export enum EInterestIncomeSubType {
  BankInterest = 0, // ดอกเบี้ยเงินฝาก
  LoanInterest = 1, // ดอกเบี้ยรับจากการปล่อยกู้
  BondCoupon = 2 // ดอกเบี้ยหุ้นกู้ / พันธบัตร
}

// DividendIncome (9)
export enum EDividendIncomeSubType {
  ListedDividend = 0, // เงินปันผลจากหุ้นในตลาด
  PrivateDividend = 1, // เงินปันผลจากหุ้นนอกตลาด
  FundDividend = 2, // เงินปันผลจากกองทุนรวม
  EquityMethodGain = 3, // กำไรตามวิธีส่วนได้เสีย
  UnrealizedGain = 4 // กำไรที่ยังไม่เกิดขึ้นจริง (ปรับมูลค่ายุติธรรม)
}
// OperatingExpense (10)
export enum EOperatingExpenseSubType {
  BrokerageFee = 0, // ค่าธรรมเนียมโบรกเกอร์
  Administrative = 1, // ค่าใช้จ่ายบริหารทั่วไป
  InsurancePremium = 2 // เบี้ยประกันภัย
}

// InterestExpense (11)
export enum EInterestExpenseSubType {
  BankLoanInterest = 0, // ดอกเบี้ยเงินกู้ธนาคาร
  BorrowingInterest = 1 // ดอกเบี้ยเงินกู้ยืมอื่น ๆ
}

// BadDebtExpense (12)
export enum EBadDebtExpenseSubType {
  BadDebtWriteOff = 0, // ตัดจำหน่ายหนี้สูญ
  AllowanceForBadDebt = 1 // ค่าเผื่อหนี้สงสัยจะสูญ
}

// DisposalLoss (13)
export enum EDisposalLossSubType {
  DisposalLoss = 0, // ขาดทุนจากการจำหน่ายทรัพย์สิน
  UnrealizedLoss = 1 // ขาดทุนที่ยังไม่เกิดขึ้นจริง (ปรับมูลค่ายุติธรรม)
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
  LoanInterestAccrual = 2, // ดอกเบี้ยค้างรับ
  BadDebtWriteOff = 3, // ตัดหนี้สูญ
  LoanReFinance = 4, // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
  BrokerPayment = 5 //จ่ายค่านายหน้า
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
  DividendCollected = 2, // รับเงินปันผล
  EquityMethodAdjustment = 3 // ปรับตามวิธีส่วนได้เสีย
}

// Other Investments
export enum OtherTransactionType {
  RealEstatePurchase = 0, // ซื้ออสังหาริมทรัพย์
  RentalIncome = 1, // รับค่าเช่า
  MutualFundInvestment = 2, // ลงทุนกองทุนรวม
  DisposalGain = 3, // กำไรจากการจำหน่าย
  DisposalLoss = 4, // ขาดทุนจากการจำหน่าย
  SavingSharePayment = 5, // จ่ายค่า แชร์/ออมหมุนเวียน
  SavingShareIncome = 6, // รับค่า แชร์/ออมหมุนเวียน
  InsurancePremium = 7, // การซื้อประกัน / จ่ายเบี้ยประกัน
  InsuranceBenefit = 8 // ผลประโยชน์จากกรมธรรม์ (เงินคืน/คุ้มครอง)
}
// Borrowings = 5 (เงินกู้ยืม / หนี้สิน)
export enum BorrowingsTransactionType {
  Drawdown = 0, // เบิกเงินกู้ / รับเงินกู้ยืม
  Repayment = 1, // ชำระคืนเงินกู้
  BorrowingInterestAccrual = 2, // ดอกเบี้ยค้างจ่าย (รับรู้ดอกเบี้ย)
  BorrowingRefinance = 3 // รีไฟแนนซ์
}

// Payables = 6 (เจ้าหนี้การค้า / เจ้าหนี้อื่น ๆ)
export enum PayablesTransactionType {
  InvoiceReceived = 0, // รับใบแจ้งหนี้ / ตั้งเจ้าหนี้
  PaymentMade = 1, // ชำระเงินให้เจ้าหนี้
  CreditNoteReceived = 2 // รับใบลดหนี้
}
// OperatingRevenue = 7 (รายได้จากการดำเนินงาน)
export enum OperatingRevenueTransactionType {
  ServiceInvoiced = 0, // ออกใบแจ้งหนี้ค่าบริการ / รายได้
  RevenueRecognition = 1, // รับรู้รายได้
  CashReceived = 2 // รับชำระเงินสด
}

// InterestIncome = 8 (รายได้ดอกเบี้ย)
export enum InterestIncomeTransactionType {
  InterestReceived = 0, // รับดอกเบี้ยเข้าบัญชี
  InterestIncomeAccrued = 1 // บันทึกดอกเบี้ยค้างรับ
}

// DividendIncome = 9 (รายได้เงินปันผล)
export enum DividendIncomeTransactionType {
  DividendReceived = 0, // รับเงินปันผล
  DividendDeclared = 1 // ประกาศจ่ายเงินปันผล (ค้างรับ)
}
// OperatingExpense = 10 (ค่าใช้จ่ายดำเนินงาน)
export enum OperatingExpenseTransactionType {
  ExpenseIncurred = 0, // บันทึกค่าใช้จ่าย
  ExpensePaid = 1, // ชำระค่าใช้จ่าย
  BrokerFeePaid = 2 // ชำระค่าธรรมเนียมโบรกเกอร์
}

// InterestExpense = 11 (ดอกเบี้ยจ่าย)
export enum InterestExpenseTransactionType {
  InterestExpenseAccrued = 0, // ตั้งตั้งดอกเบี้ยค้างจ่าย
  InterestPaid = 1 // จ่ายดอกเบี้ย
}

// BadDebtExpense = 12 (ค่าเผื่อหนี้สงสัยจะสูญ / หนี้สูญ)
export enum BadDebtExpenseTransactionType {
  ProvisionRecognized = 0, // รับรู้ค่าเผื่อหนี้สงสัยจะสูญ
  BadDebtWrittenOff = 1 // ตัดจำหน่ายหนี้สูญ
}

// DisposalLoss = 13 (ขาดทุนจากการจำหน่าย)
export enum DisposalLossTransactionType {
  AssetDisposed = 0, // บันทึกขาดทุนจากการขายทรัพย์สิน
  FairValueLossAdjusted = 1 // ปรับมูลค่ายุติธรรม (ขาดทุน)
}
