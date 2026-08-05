//load from db...
export default {
  themes: {
    'bcs-default': 'ค่าเริ่มต้น',
    'bcs-dark': 'โหมดมืด',
    'bcs-medium': 'ปานกลาง'
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
  //+++++++Customer+++++++++++++++++
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
  Create_On: 'วันทีลงทะเบียน',
  Create_By: 'ลงทะเบียนโดย',
  Customer_category: 'กลุ่มลูกค้า',
  Remark: 'หมายเหตุ',
  SuperPrime: 'ลูกค้าชั้นพิเศษ',
  Prime: 'ลูกค้าชั้นดี',
  NearPrime: 'ลูกค้ากึ่งดี',
  Subprime: 'ลูกค้าชั้นเลว',
  Customer_Id: 'ระหัส ลูกค้า',
  Customer_Name: 'ชื่อลูกค้า',
  Amount: 'จำนวน',
  //++++++Broker++++++++
  Broker_Accounts: 'บัญชีนายหน้า',
  //++++++Port++++++++++
  Asset_Ports: 'พอร์ต ทรัพย์สิน',
  CashAndDeposits: 'เงินสด / เงินฝาก',
  LoansReceivable: 'สินเชื่อและเงินให้กู้',
  Securities: 'การลงทุนในตราสาร',
  EquityHoldings: 'การลงทุนในกองทุน/หุ้น',
  OtherInvestments: 'อื่น ๆ',
  Port_Investments: 'พอร์ต ลงทุน',
  Port_description: 'ชื่อพอร์ต',
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
  Deposit: 'ฝากเงิน',
  Withdrawal: 'ถอนเงิน',
  //InterestIncome: 'รับดอกเบี้ย',
  Transfer: 'โอนเงิน',
  //++++++++++++
  LoanIssued: 'ปล่อยกู้', // ปล่อยกู้
  LoanRepayment: 'รับชำระคืน', // รับชำระคืน
  LoanInterestAccrual: 'ดอกเบี้ยค้างรับ', // ดอกเบี้ยค้างรับ
  BadDebtWriteOff: 'ตัดหนี้สูญ', // ตัดหนี้สูญ
  ReFinance: 'รีไฟแนนซ์', // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
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
  Session_Type: 'ประเภทเซสชัน'
}
