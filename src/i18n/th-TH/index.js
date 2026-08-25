//load from db...
// Export directly inside your existing index.js
export const dateLocaleTH = {
  days: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
  daysShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  months: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ],
  monthsShort: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.'
  ],
  firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday
  pluralDay: 'วัน'
}

export default {
  themes: {
    'bcs-default': 'ค่าเริ่มต้น',
    'bcs-dark': 'โหมดมืด',
    'bcs-medium': 'ปานกลาง'
  },
  dateLocaleTH: {
    days: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    daysShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    months: [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม'
    ],
    monthsShort: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.'
    ],
    firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday
    pluralDay: 'วัน'
  },
  Mini_Financial: 'การเงินขนาดเล็ก',
  Login_failed_Please_check_Username_or_Password:
    'การเข้าสู่ระบบล้มเหลว โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน',
  Abort: 'ล้มเหลว',
  Account: 'บัญชีผู้ใช้งาน',
  Id: 'ระหัส',
  Type: 'ชนิด',
  Item_saved_successfully: 'บันทึกข้อมูลสำเร็จ',
  User: 'ผู้ใช้',
  Password: 'รหัสผ่าน',
  Assets: 'สินทรัพย์',
  Liabilities: 'หนี้สิน',
  Equity: 'ทุน',
  Revenue: 'รายได้',
  Expenses: 'ค่าใช้จ่าย',
  System_Management: 'การจัดการระบบ',
  System_Configure: 'การตั้งค่าระบบ',
  Preference: 'การกำหนดค่า',
  Search: 'ค้นหา',
  Description: 'รายละเอียด',
  Unknow_name: 'ไม่ระบุ ชื่อ',
  Times: 'ครั้ง',
  Close: 'ปิด',
  Acknowledge_All: 'ยอมรับ',
  Loan_Warnings: 'คำเตือนสินเชื่อ',
  notifications: 'การแจ้งเตือน',
  requiring_attention: 'ต้องดำเนินการ',
  PortId: 'พอร์ต',
  Notify_Code: 'ระหัส แจ้งเตือน',
  Warning_Description: 'รายละเอียด แจ้งเตือน',
  //+++++++Customer+++++++++แจ้งเตือน++++++++
  Customer: 'ลูกค้า',
  Customers: 'ลูกค้า',
  Customers_and_Brokers: 'ลูกค้าและนายหน้า',
  Customer_Accounts: 'บัญชีลูกค้า',
  Card_Id: 'บัตรประชาชนเลขที่',
  Name: 'ชื่อ',
  Field_is_required: 'ต้องไม่เป็นค่าว่าง',
  Address: 'ที่อยู่',
  Email: 'อีเมลล์',
  Phone: 'เบอร์โทร',
  Line_Id: 'ไลน์ ไอดี',
  Credit_limit: 'วงเงินสูงสุด',
  Create_on: 'วันทีลงทะเบียน',
  Create_by: 'ลงทะเบียนโดย',
  Customer_category: 'กลุ่มลูกค้า',
  Remark: 'หมายเหตุ',
  SuperPrime: 'ลูกค้าชั้นพิเศษ',
  Prime: 'ลูกค้าชั้นดี',
  NearPrime: 'ลูกค้ากึ่งดี',
  Subprime: 'ลูกค้าชั้นเลว',
  Customer_Id: 'ระหัส ลูกค้า',
  Customer_Name: 'ชื่อลูกค้า',
  Amount: 'จำนวน',
  Total: 'รวม',
  //++++++Broker++++++++
  Broker: 'นายหน้า',
  Broker_Accounts: 'บัญชีนายหน้า',
  //++++++Port++++++++++
  Session_List: 'รายการ ทางการเงิน',
  Asset_Ports: 'พอร์ต ทรัพย์สิน',
  CashAndDeposits: 'เงินสด / เงินฝาก',
  LoansReceivable: 'สินเชื่อและเงินให้กู้',
  Securities: 'การลงทุนในตราสาร',
  EquityHoldings: 'การลงทุนในกองทุน/หุ้น',
  OtherInvestments: 'อื่น ๆ',
  Port_Investments: 'พอร์ต ลงทุน',
  Port_description: 'ชื่อพอร์ต',
  Daily: 'รายวัน',
  Weekly: 'รายสัปดาห์',
  Monthly: 'รายเดือน',
  Yearly: 'รายปี',
  Port_type: 'ชนิด พอร์ต',
  Port_sub_type: 'ชนิด พอร์ต ย่อย',
  Status: 'สถานะ',
  Interest: 'ดอกเบี้ย',
  Payment_period: 'รอบการจ่าย',
  Payment_rate: 'อัตราการจ่าย',
  Period: 'ระยะเวลา',
  Active: 'ใช้งาน',
  day: 'วัน',
  week: 'สัปดาห์',
  month: 'เดือน',
  year: 'ปี',
  days: 'วัน',
  weeks: 'สัปดาห์',
  months: 'เดือน',
  years: 'ปี',
  //++++++++++++
  Liability_Ports: 'พอร์ต หนี้สิน',
  Borrowings: 'เงินกู้ยืม',
  Payables: 'เจ้าหนี้การค้า',
  //++++++++++++
  Revenue_Ports: 'พอร์ต รายได้',
  OperatingRevenue: 'รายได้จากการดำเนินงาน',
  InterestIncome: 'รายได้ดอกเบี้ย',
  DividendIncome: 'รายได้เงินปันผล',
  //+++++++++++++
  Expense_Ports: 'พอร์ต รายจ่าย',
  OperatingExpense: 'ค่าใช้จ่ายดำเนินงาน',
  InterestExpense: 'จ่ายดอกเบี้ย',
  BadDebtExpense: 'ค่าเผื่อหนี้สงสัยจะสูญ',
  DisposalLoss: 'ขาดทุนจากการจำหน่าย',
  //++++++++++++
  Equity_Ports: 'พอร์ต ส่วนของผู้ถือหุ้น',
  PaidInCapital: 'ทุนเรือนหุ้น',
  RetainedEarnings: 'กำไรสะสม',
  OtherReserves: 'สำรองอื่น ๆ',
  //++++++++++++
  Deposit: 'ฝากเงิน',
  Withdrawal: 'ถอนเงิน',
  //InterestIncome: 'รับดอกเบี้ย',
  Transfer: 'โอนเงิน',
  //++++++++++++
  LoanIssued: 'ปล่อยกู้', // ปล่อยกู้
  LoanRepayment: 'รับชำระคืน', // รับชำระคืน
  LoanInterestAccrual: 'ดอกเบี้ยค้างรับ', // ดอกเบี้ยค้างรับ
  BadDebtWriteOff: 'ตัดหนี้สูญ', // ตัดหนี้สูญ
  LoanReFinance: 'รีไฟแนนซ์', // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
  BrokerPayment: 'จ่ายค่านายหน้า', //จ่ายค่านายหน้า
  //+++++++++++++
  SecurityPurchase: 'ซื้อพันธบัตร/หุ้นกู้', // ซื้อพันธบัตร/หุ้นกู้
  SecuritySale: 'ขายพันธบัตร/หุ้นกู้', // ขายพันธบัตร/หุ้นกู้
  CouponPayment: 'รับคูปอง/ดอกเบี้ย', // รับคูปอง/ดอกเบี้ย
  FairValueAdjustment: 'ปรับมูลค่ายุติธรรม', // ปรับมูลค่ายุติธรรม
  //+++++++++++++
  EquityPurchase: 'ซื้อหุ้น', // ซื้อหุ้น
  EquitySale: 'ขายหุ้น', // ขายหุ้น
  DividendReceived: 'รับเงินปันผล', // รับเงินปันผล
  EquityMethodAdjustment: 'ปรับตามวิธีส่วนได้เสีย', // ปรับตามวิธีส่วนได้เสีย
  //+++++++++++++
  RealEstatePurchase: 'ซื้ออสังหาริมทรัพย์', // ซื้ออสังหาริมทรัพย์
  RentalIncome: 'รับค่าเช่า', // รับค่าเช่า
  MutualFundInvestment: 'ลงทุนกองทุนรวม', // ลงทุนกองทุนรวม
  DisposalGain: 'กำไรจากการจำหน่าย', // กำไร/ขาดทุนจากการจำหน่าย
  // DisposalLoss: 'ขาดทุนจากการจำหน่าย', // ขาดทุนจากการจำหน่าย
  SavingSharePayment: 'จ่ายค่าแชร์', // ลงทุน แชร์/ออมหมุนเวียน
  SavingShareIncome: 'รับค่าแชร์', // รับค่า แชร์/ออมหมุนเวียน
  InsurancePremium: 'จ่ายเบี้ยประกัน', // การซื้อประกัน / จ่ายเบี้ยประกัน
  InsuranceBenefit: 'ผลประโยชน์จากกรมธรรม์', // ผลประโยชน์จากกรมธรรม์ (เงินคืน/คุ้มครอง)
  // BorrowingsTransactionType
  Drawdown: 'เบิกเงินกู้',
  Repayment: 'ชำระคืนเงินกู้',
  BorrowingInterestAccrual: 'บันทึกดอกเบี้ยกู้ยืมค้างจ่าย',
  BorrowingRefinance: 'รีไฟแนนซ์เงินกู้',

  // PayablesTransactionType
  InvoiceReceived: 'รับใบแจ้งหนี้ / ตั้งเจ้าหนี้',
  PaymentMade: 'ชำระเงินให้เจ้าหนี้',
  CreditNoteReceived: 'รับใบลดหนี้',

  // OperatingRevenueTransactionType
  ServiceInvoiced: 'ออกใบแจ้งหนี้ค่าบริการ',
  RevenueRecognition: 'รับรู้รายได้',
  CashReceived: 'รับชำระเงิน',

  // InterestIncomeTransactionType
  InterestReceived: 'รับดอกเบี้ย',
  InterestIncomeAccrued: 'บันทึกดอกเบี้ยค้างรับ',

  // DividendIncomeTransactionType
  //DividendReceived: 'รับเงินปันผล',
  DividendDeclared: 'บันทึกเงินปันผลค้างรับ',

  // OperatingExpenseTransactionType
  ExpenseIncurred: 'บันทึกค่าใช้จ่าย',
  ExpensePaid: 'ชำระค่าใช้จ่าย',
  BrokerFeePaid: 'ชำระค่าธรรมเนียมนายหน้า',

  // InterestExpenseTransactionType
  InterestExpenseAccrued: 'บันทึกดอกเบี้ยจ่ายค้างจ่าย',
  InterestPaid: 'ชำระดอกเบี้ย',

  // BadDebtExpenseTransactionType
  ProvisionRecognized: 'รับรู้ค่าเผื่อหนี้สงสัยจะสูญ',
  BadDebtWrittenOff: 'ตัดจำหน่ายหนี้สูญ',

  // DisposalLossTransactionType
  AssetDisposed: 'บันทึกการตัดจำหน่ายทรัพย์สิน',
  FairValueLossAdjusted: 'ปรับปรุงขาดทุนจากมูลค่ายุติธรรม',

  // PaidInCapitalTransactionType
  CapitalContribution: 'การเพิ่มทุน / รับชำระค่าหุ้น',
  CapitalReduction: 'การลดทุน / คืนทุน',

  // RetainedEarningsTransactionType
  DividendPayout: 'จ่ายเงินปันผล',
  AppropriationOfEarnings: 'จัดสรรกำไรสะสมเข้าทุนสำรอง',
  UnappropriatedTransfer: 'โอนทุนสำรองกลับเข้ากำไรสะสม',

  // OtherReservesTransactionType
  SharePremiumReceived: 'รับส่วนเกินมูลค่าหุ้น',
  ReserveAllocation: 'จัดสรรทุนสำรองตามกฎหมาย',
  RevaluationAdjustment: 'ปรับปรุงส่วนเกินทุนจากการตีราคาสินทรัพย์',
  //+++++++++++CashAndDepositsSubType
  Cash: 'เงินสด', // เงินสด
  SavingsAccount: 'บัญชีออมทรัพย์', // บัญชีออมทรัพย์
  FixedDeposit: 'เงินฝากประจำ', // เงินฝากประจำ

  //+++++++++LoansReceivableSubType
  PersonalLoan: 'เงินกู้บุคคล', // เงินกู้บุคคล
  BusinessLoan: 'เงินกู้ธุรกิจ', // เงินกู้ธุรกิจ

  //++++++++++SecuritiesSubType
  GovernmentBond: 'พันธบัตรรัฐบาล', // พันธบัตรรัฐบาล
  CorporateBond: 'หุ้นกู้เอกชน', // หุ้นกู้เอกชน

  //++++++++++EquityHoldingsSubType
  ListedEquity: 'หุ้นสามัญ', // หุ้นสามัญที่จดทะเบียนในตลาดหลักทรัพย์
  PrivateEquity: 'หุ้นส่วน', // หุ้นส่วน/ทุนในกิจการที่ไม่จดทะเบียน

  //+++++++++++OtherInvestmentsSubType
  RealEstate: 'อสังหาริมทรัพย์', // อสังหาริมทรัพย์เพื่อการลงทุน
  MutualFund: 'กองทุนรวม', // กองทุนรวม
  CommunitySavingShare: 'เล่นแชร์', // การเล่นแชร์ / ออมหมุนเวียนในชุมชน
  Insurance: 'การซื้อประกัน', // การซื้อประกัน / กรมธรรม์เพื่อการลงทุนหรือคุ้มครอง
  //++++++Session++++++++++
  Port_Id: 'ระหัส พอร์ต',
  Credit_Port_Id: 'ระหัส เครดิต พอร์ต',
  Debit_Port_Id: 'ระหัส เดบิต พอร์ต',
  Session_Type: 'ประเภทเซสชัน',
  Total_Amount: 'จำนวนเงินรวม',
  Total_Count: 'จำนวนรายการรวม',
  Session_Description: 'รายละเอียดรอบการบันทึก',
  Session_Detail: 'รายละเอียดรอบการบันทึก',
  Session_Details: 'รายละเอียดรอบการบันทึกทั้งหมด',
  Session_Transaction: 'รายการธุรกรรมประจำรอบ',
  Session_Transactions: 'รายการธุรกรรมทั้งหมดประจำรอบ',
  //++++++++Port state
  Draft: 'ร่างรายการ',
  //Active: 'มีผลใช้งาน',
  Pending: 'รอการอนุมัติหรือตรวจสอบ',
  Suspended: 'ระงับชั่วคราว',
  Closed: 'ปิดรายการ / ชำระครบถ้วน',
  Cancelled: 'ยกเลิกรายการ',
  WrittenOff: 'ตัดสูญหรือจำหน่ายออก',
  Defaulted: 'ผิดนัดชำระ / NPL',
  Matured: 'ครบกำหนดชำระ',
  //++++++Notify++++++++
  Payment_delay: 'ชำระเงินล่าช้า / ค้างชำระ', // ชำระเงินล่าช้า / ค้างชำระ
  Interest_rate_changed: 'มีการเปลี่ยนแปลงอัตราดอกเบี้ย', // มีการเปลี่ยนแปลงอัตราดอกเบี้ย
  Maturity_approaching: 'ใกล้ถึงวันครบกำหนดชำระ / สัญญาหมดอายุ', // ใกล้ถึงวันครบกำหนดชำระ / สัญญาหมดอายุ
  Overdue_principal: 'เงินต้นค้างชำระเกินกำหนด', // เงินต้นค้างชำระเกินกำหนด
  Would_you_like_to_delete: 'ต้องการลบหรือไม่',
  Item_deleted_successfully: 'ลบรายการสำเร็จ',
  Failed_to_delete_item: 'ลบรายการไม่สำเร็จ',
  Deletion_cancelled_by_user: 'ผู้ใช้ยกเลิกการลบ'
}
