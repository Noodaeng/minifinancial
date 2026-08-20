export enum ERole {
  //[Description("Guest")]
  Guest = 0,
  //[Description("User")]
  User = 1,
  //[Description("Supervisor")]
  Supervisor = 2,
  //[Description("Admin")]
  Admin = 3,
  //[Description("Power User")]
  PowerUser = 4
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
  // Assets (0-4) - สินทรัพย์
  CashAndDeposits = 0, // เงินสดและเงินฝากธนาคาร
  LoansReceivable = 1, // ลูกหนี้เงินให้กู้ยืม
  Securities = 2, // หลักทรัพย์ / ตราสารหนี้
  EquityHoldings = 3, // เงินลงทุนในตราสารทุน / หุ้นทุน
  OtherInvestments = 4, // เงินลงทุนอื่น ๆ

  // Liabilities (5-6) - หนี้สิน
  Borrowings = 5, // เงินกู้ยืม
  Payables = 6, // เจ้าหนี้ / ค่าใช้จ่ายค้างจ่าย

  // Revenue (7-9) - รายได้
  OperatingRevenue = 7, // รายได้จากการดำเนินงาน
  InterestIncome = 8, // รายได้ดอกเบี้ย
  DividendIncome = 9, // รายได้เงินปันผล

  // Expenses (10-13) - ค่าใช้จ่าย
  OperatingExpense = 10, // ค่าใช้จ่ายในการดำเนินงาน
  InterestExpense = 11, // ดอกเบี้ยจ่าย
  BadDebtExpense = 12, // หนี้สูญและหนี้สงสัยจะสูญ
  DisposalLoss = 13, // ขาดทุนจากการจำหน่ายทรัพย์สิน

  // Equity (14-16) - ส่วนของผู้ถือหุ้น / ทุน
  PaidInCapital = 14, // ทุนเรือนหุ้น / ทุนชำระแล้ว
  RetainedEarnings = 15, // กำไรสะสม
  OtherReserves = 16 // สำรองอื่น ๆ และส่วนเกินมูลค่าหุ้น
}
export enum EPortStatus {
  // --- Lifecycle & Processing Statuses ---

  /**
   * Draft / ร่างรายการ
   * Newly created record, not yet active, validated, or affecting ledgers.
   */
  Draft = 0,

  /**
   * Active / In Effect / มีผลใช้งาน
   * Currently active port item (e.g., active loan, active holding, ongoing liability, operational account).
   */
  Active = 1,

  /**
   * Pending Approval / รอการอนุมัติหรือตรวจสอบ
   * Awaiting authorization, compliance check, or reconciliation before becoming active/settled.
   */
  Pending = 2,

  /**
   * Suspended / Frozen / ระงับชั่วคราว
   * Temporarily frozen due to dispute, regulatory hold, or administrative review.
   */
  Suspended = 3,

  // --- Termination & Completion Statuses ---

  /**
   * Settled / Closed / ปิดรายการ / ชำระครบถ้วน
   * Transaction fully realized, loan fully paid back, payable settled, or revenue/expense recognized and closed.
   */
  Closed = 4,

  /**
   * Cancelled / Voided / ยกเลิกรายการ
   * Entry voided due to creation error or cancelled transaction before realization.
   */
  Cancelled = 5,

  /**
   * Written Off / Disposed / ตัดสูญหรือจำหน่ายออก
   * Asset written off as bad debt, investment fully written down, or liability discharged via bankruptcy/restructuring.
   */
  WrittenOff = 6,

  // --- Exception & Risk Statuses ---

  /**
   * Defaulted / Non-Performing / ผิดนัดชำระ / NPL
   * Applicable primarily to Loans/Payables/Securities when payment schedules or contractual obligations fail.
   */
  Defaulted = 7,

  /**
   * Mature / Due for Settlement / ครบกำหนดชำระ
   * Instruments (like fixed deposits, debt securities, payable due dates) that have reached maturity and await final liquidation.
   */
  Matured = 8
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
// SubTypes for Equity (14-16)
// Equity-PaidInCapital = 14,

export enum EPaidInCapitalSubType {
  CommonStock = 0, // หุ้นสามัญ (Common Stock)
  PreferredStock = 1 // หุ้นบุริสิทธิ์ (Preferred Stock)
}
// Equity-RetainedEarnings = 15,

export enum ERetainedEarningsSubType {
  Unappropriated = 0, // กำไรสะสมยังไม่ได้จัดสรร (Unappropriated Retained Earnings)
  Appropriated = 1 // กำไรสะสมจัดสรรแล้ว (Appropriated Retained Earnings)
}
// Equity-OtherReserves = 16
export enum EOtherReservesSubType {
  SharePremium = 0, // ส่วนเกินมูลค่าหุ้น (Share Premium / Capital Surplus)
  LegalReserve = 1, // สำรองตามกฎหมาย (Legal Reserve)
  RevaluationReserve = 2 // ส่วนเกินทุนจากการตีราคา assets (Revaluation Surplus)
}
export enum EPaymentPeriod {
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
// Transaction Types for 14: PaidInCapital (ทุนเรือนหุ้น / ทุนชำระแล้ว)
export enum PaidInCapitalTransactionType {
  CapitalContribution = 0, // การเพิ่มทุน / ชำระค่าหุ้น (Capital Inflow)
  CapitalReduction = 1 // การลดทุน / คืนทุน (Capital Outflow)
}

// Transaction Types for 15: RetainedEarnings (กำไรสะสม)
export enum RetainedEarningsTransactionType {
  DividendPayout = 0, // การจ่ายเงินปันผลให้ผู้ถือหุ้น (Dividend Paid)
  AppropriationOfEarnings = 1, // การจัดสรรกำไรสะสมเข้าสำรอง (Appropriation to Reserves)
  UnappropriatedTransfer = 2 // การโอนสำรองกลับเข้ากำไรสะสม (Transfer Back to Retained Earnings)
}

// Transaction Types for 16: OtherReserves (สำรองอื่น ๆ และส่วนเกินมูลค่าหุ้น)
export enum OtherReservesTransactionType {
  SharePremiumReceived = 0, // รับส่วนเกินมูลค่าหุ้น (Share Premium Received)
  ReserveAllocation = 1, // รับโอนจัดสรรสำรองตามกฎหมาย (Legal Reserve Allocation)
  RevaluationAdjustment = 2 // ปรับปรุงส่วนเกินทุนจากการตีราคา assets (Revaluation Adjustment)
}
