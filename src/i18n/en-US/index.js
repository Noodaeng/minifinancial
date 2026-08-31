// This is just an example,
// so you can safely delete all default props below

export default {
  themes: {
    'bcs-default': 'Default',
    'bcs-dark': 'Dark',
    'bcs-medium': 'Medium'
  },
  // Direct integration for Quasar q-date
  dateLocale: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    firstDayOfWeek: 0,
    pluralDay: 'days'
  },
  Mini_Financial: 'Mini Financial',
  Login_failed_Please_check_Username_or_Password: 'Login failed. Please check Username or Password',
  failed: 'Action failed',
  success: 'Action was successful',
  Id: 'Id',
  Type: 'Type',
  Item_saved_successfully: 'Item saved successfully',
  User: 'User',
  Password: 'Password',
  Assets: 'Assets',
  Liabilities: 'Liabilities',
  Equity: 'Equity',
  Revenue: 'Revenue',
  Expenses: 'Expenses',
  System_Management: 'System Management',
  System_Configure: 'System Configure',
  Preference: 'Preference',
  Search: 'Search',
  Description: 'Description',
  Unknow_name: 'Unknow name',
  Times: 'Times',
  Close: 'Close',
  Acknowledge_All: 'Acknowledge All',
  Loan_Warnings: 'Loan Warnings',
  notifications: 'notifications',
  requiring_attention: 'requiring_attention',
  PortId: 'PortId',
  Notify_Code: 'Notify_Code',
  Warning_Description: 'Warning / Description',
  Show_entry: 'Show entry',
  No_: 'No.',
  Export_to_Excel: 'Export to Excel',
  Export_to_PDF: 'Export to PDF',
  Show_all: 'Show_all',
  //+++++++Customer+++++++++++++++++
  Customer: 'Customer',
  Customers: 'Customers',
  Customers_and_Brokers: 'Customers and Brokers',
  Customer_Accounts: 'Customer Accounts',
  Card_Id: 'Card Id',
  Name: 'Name',
  Field_is_required: 'Field is required',
  Email: 'e-mail',
  Phone: 'Phone',
  Line_Id: 'Line Id',
  Address: 'Address',
  Credit_limit: 'Credit limit',
  Create_on: 'Create On',
  Create_by: 'Create By',
  Customer_category: 'Customer category',
  Remark: 'Remark',
  SuperPrime: 'Super-prime', // ลูกค้าชั้นพิเศษ
  Prime: 'Prime', // ลูกค้าชั้นดี
  NearPrime: 'Near-prime', // ลูกค้ากึ่งดี
  Subprime: 'Subprime', // ลูกค้าชั้นเลว
  Customer_Id: 'Customer Id',
  Customer_Name: 'Customer Name',
  Amount: 'Amount',
  Total: 'Total',
  Loan_amount: 'Loan Amount',
  // "Interest": "Interest",
  Total_paid: 'Total Paid',
  Shortage_amount: 'Shortage Amount',
  Paid_count: 'Paid Count',
  Start_loan: 'Loan Start Date',
  Last_refinance: 'Last Refinance Date',
  //++++++Broker++++++++
  Broker: 'Broker',
  Broker_Accounts: 'Broker Accounts',
  //+++++++++Port investment+++++++++++
  Session_List: 'Session List',
  Asset_Ports: 'Asset Ports',
  CashAndDeposits: 'Cash And Deposits',
  LoansReceivable: 'Loans Receivable',
  Securities: 'Securities',
  EquityHoldings: 'Equity Holdings',
  OtherInvestments: 'Other investments',
  Port_Investments: 'Port investments',
  Port_description: 'Port description',
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
  Port_type: 'Port type',
  Port_sub_type: 'Port sub type',
  Status: 'Status',
  Interest: 'Interest',
  Payment_period: 'Payment_period',
  Payment_rate: 'Payment rate',
  Period: 'Period',
  Active: 'Active',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  days: 'days',
  weeks: 'weeks',
  months: 'months',
  years: 'years',
  //++++++++++++
  Liability_Ports: 'Liability Ports',
  Borrowings: 'Borrowings',
  Payables: 'Payables',
  //++++++++++++
  Revenue_Ports: 'Revenue Ports',
  OperatingRevenue: 'Operating Revenue',
  InterestIncome: 'Interest Income',
  DividendIncome: 'Dividend Income',
  //+++++++++++++
  Expense_Ports: 'Expense Ports',
  OperatingExpense: 'Operating Expense',
  InterestExpense: 'Interest Expense',
  BadDebtExpense: 'BadDebt Expense',
  DisposalLoss: 'Disposal Loss',
  //++++++++++++
  Equity_Ports: 'Equity Ports',
  PaidInCapital: 'Paid-in Capital',
  RetainedEarnings: 'Retained Earnings',
  OtherReserves: 'Other Reserves',
  //++++++++++++
  Deposit: 'Deposit', // ฝากเงิน
  Withdrawal: 'Withdrawal', // ถอนเงิน
  //InterestIncome: 'Interest Income', // รับดอกเบี้ย
  Transfer: 'Transfer', // โอนเงิน
  //++++++++++++
  LoanIssued: 'Loan Issued', // ปล่อยกู้
  LoanRepayment: 'Loan Repayment', // รับชำระคืน
  LoanInterestAccrual: 'Loan Interest Accrual', // ดอกเบี้ยค้างรับ
  BadDebtWriteOff: 'Bad Debt Write Off', // ตัดหนี้สูญ
  LoanReFinance: 'Re-Finance', // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
  BrokerPayment: 'Broker Payment', //จ่ายค่านายหน้า
  //+++++++++++++
  SecurityPurchase: 'Security Purchase', // ซื้อพันธบัตร/หุ้นกู้
  SecuritySale: 'Security Sale', // ขายพันธบัตร/หุ้นกู้
  CouponPayment: 'Coupon Payment', // รับคูปอง/ดอกเบี้ย
  FairValueAdjustment: 'FairValue Adjustment', // ปรับมูลค่ายุติธรรม
  //+++++++++++++
  EquityPurchase: 'Equity Purchase', // ซื้อหุ้น
  EquitySale: 'Equity Sale', // ขายหุ้น
  DividendReceived: 'Dividend Received', // รับเงินปันผล
  EquityMethodAdjustment: 'Equity Method Adjustment', // ปรับตามวิธีส่วนได้เสีย
  //+++++++++++++
  RealEstatePurchase: 'Real Estate Purchase', // ซื้ออสังหาริมทรัพย์
  RentalIncome: 'Rental Income', // รับค่าเช่า
  MutualFundInvestment: 'Mutual Fund Investment', // ลงทุนกองทุนรวม
  DisposalGain: 'Disposal Gain ', // กำไร/ขาดทุนจากการจำหน่าย
  //DisposalLoss: 'Disposal Loss', // ขาดทุนจากการจำหน่าย
  SavingSharePayment: 'Saving Share Payment', // ลงทุน แชร์/ออมหมุนเวียน
  SavingShareIncome: 'Saving Share Income', // รับค่า แชร์/ออมหมุนเวียน
  InsurancePremium: 'Insurance Premium', // การซื้อประกัน / จ่ายเบี้ยประกัน
  InsuranceBenefit: 'Insurance Benefit', // ผลประโยชน์จากกรมธรรม์ (เงินคืน/คุ้มครอง)
  //+++++++++ BorrowingsTransactionType----1
  Drawdown: 'Drawdown', // เบิกเงินกู้ / รับเงินกู้ยืม
  Repayment: ' Repayment', // ชำระคืนเงินกู้
  BorrowingInterestAccrual: 'Borrowing Interest Accrual', // ดอกเบี้ยค้างจ่าย (รับรู้ดอกเบี้ย)
  BorrowingRefinance: 'Borrowing Refinance', // รีไฟแนนซ์
  //++++++++PayablesTransactionType
  InvoiceReceived: 'Invoice Received', // รับใบแจ้งหนี้ / ตั้งเจ้าหนี้
  PaymentMade: 'Payment Made', // ชำระเงินให้เจ้าหนี้
  CreditNoteReceived: 'Credit Note Received', // รับใบลดหนี้
  //+++++++++OperatingRevenueTransactionType
  ServiceInvoiced: 'Service Invoiced', // ออกใบแจ้งหนี้ค่าบริการ / รายได้
  RevenueRecognition: 'Revenue Recognition', // รับรู้รายได้
  CashReceived: 'Cash Received', // รับชำระเงินสด
  //+++++++++InterestIncomeTransactionType
  InterestReceived: 'Interest Received', // รับดอกเบี้ยเข้าบัญชี
  InterestIncomeAccrued: 'Interest Income Accrued', // บันทึกดอกเบี้ยค้างรับ
  //+++++++++++DividendIncomeTransactionType
  //DividendReceived: 'Dividend Received', // รับเงินปันผล
  DividendDeclared: 'Dividend Declared', // ประกาศจ่ายเงินปันผล (ค้างรับ)
  //++++++++++++OperatingExpenseTransactionType
  ExpenseIncurred: 'Expense Incurred', // บันทึกค่าใช้จ่าย
  ExpensePaid: 'Expense Paid', // ชำระค่าใช้จ่าย
  BrokerFeePaid: 'Broker FeePaid', // ชำระค่าธรรมเนียมโบรกเกอร์
  //++++++++++++InterestExpenseTransactionType
  InterestExpenseAccrued: 'Interest Expense Accrued', // ตั้งตั้งดอกเบี้ยค้างจ่าย
  InterestPaid: 'Interest Paid', // จ่ายดอกเบี้ย
  //+++++++++++BadDebtExpenseTransactionType
  ProvisionRecognized: 'Provision Recognized', // รับรู้ค่าเผื่อหนี้สงสัยจะสูญ
  BadDebtWrittenOff: 'Bad Debt Written Off', // ตัดจำหน่ายหนี้สูญ
  //++++++++++DisposalLossTransactionType
  AssetDisposed: 'Asset Disposed', // บันทึกขาดทุนจากการขายทรัพย์สิน
  FairValueLossAdjusted: 'Fair Value Loss Adjusted', // ปรับมูลค่ายุติธรรม (ขาดทุน)
  //++++++++++PaidInCapitalTransactionType
  CapitalContribution: 'Capital Contribution', // การเพิ่มทุน / ชำระค่าหุ้น (Capital Inflow)
  CapitalReduction: 'Capital Reduction', // การลดทุน / คืนทุน (Capital Outflow)
  //++++++++++RetainedEarningsTransactionType
  DividendPayout: 'Dividend Payout', // การจ่ายเงินปันผลให้ผู้ถือหุ้น (Dividend Paid)
  AppropriationOfEarnings: 'Appropriation Of Earnings', // การจัดสรรกำไรสะสมเข้าสำรอง (Appropriation to Reserves)
  UnappropriatedTransfer: 'Unappropriated Transfer', // การโอนสำรองกลับเข้ากำไรสะสม (Transfer Back to Retained Earnings)
  //+++++++++++OtherReservesTransactionType
  SharePremiumReceived: 'Share Premium Received', // รับส่วนเกินมูลค่าหุ้น (Share Premium Received)
  ReserveAllocation: 'Reserve Allocation', // รับโอนจัดสรรสำรองตามกฎหมาย (Legal Reserve Allocation)
  RevaluationAdjustment: 'Revaluation Adjustment', // ปรับปรุงส่วนเกินทุนจากการตีราคา assets (Revaluation Adjustment)

  //+++++++++++CashAndDepositsSubType---2
  Cash: 'Cash', // เงินสด
  SavingsAccount: 'Savings Account', // บัญชีออมทรัพย์
  FixedDeposit: 'Fixed Deposit', // เงินฝากประจำ

  //+++++++++LoansReceivableSubType
  PersonalLoan: 'Personal Loan', // เงินกู้บุคคล
  BusinessLoan: 'Business Loan', // เงินกู้ธุรกิจ

  //++++++++++SecuritiesSubType
  GovernmentBond: 'Government Bond', // พันธบัตรรัฐบาล
  CorporateBond: 'Corporate Bond', // หุ้นกู้เอกชน

  //++++++++++EquityHoldingsSubType
  ListedEquity: 'Listed Equity', // หุ้นสามัญที่จดทะเบียนในตลาดหลักทรัพย์
  PrivateEquity: 'Private Equity', // หุ้นส่วน/ทุนในกิจการที่ไม่จดทะเบียน

  //+++++++++++OtherInvestmentsSubType
  RealEstate: 'Real Estate', // อสังหาริมทรัพย์เพื่อการลงทุน
  MutualFund: 'Mutual Fund', // กองทุนรวม
  CommunitySavingShare: 'Community Saving Share', // การเล่นแชร์ / ออมหมุนเวียนในชุมชน
  Insurance: 'Insurance', // การซื้อประกัน / กรมธรรม์เพื่อการลงทุนหรือคุ้มครอง
  //++++++Session++++++++++
  Port_Id: 'Port Id',
  Credit_Port_Id: 'Credit Port Id',
  Debit_Port_Id: 'Debit Port Id',
  Session_Type: 'Session Type',
  Total_Amount: 'Total Amount',
  Total_Count: 'Total Count',
  Session_Description: 'Session Description',
  Session_Detail: 'Session Detail',
  Session_Details: 'Session Details',
  Session_Transaction: 'Session Transaction',
  Session_Transactions: 'Session Transactions',
  //++++++++Port state
  Draft: 'Draft',
  //Active: 'Active',
  Pending: 'Pending Approval',
  Suspended: 'Suspended',
  Closed: 'Settled / Closed',
  Cancelled: 'Cancelled',
  WrittenOff: 'Written Off',
  Defaulted: 'Defaulted / Non-Performing',
  Matured: 'Matured / Due for Settlement',
  //++++++Notify++++++++

  Payment_delay: 'Payment delay', // ชำระเงินล่าช้า / ค้างชำระ
  Interest_rate_changed: 'Interest rate changed', // มีการเปลี่ยนแปลงอัตราดอกเบี้ย
  Maturity_approaching: 'Maturity approaching', // ใกล้ถึงวันครบกำหนดชำระ / สัญญาหมดอายุ
  Overdue_principal: 'Overdue principal', // เงินต้นค้างชำระเกินกำหนด
  Would_you_like_to_delete: 'Would you like to delete',
  Item_deleted_successfully: 'Item deleted successfully',
  Failed_to_delete_item: 'Failed to delete item',
  Deletion_cancelled_by_user: 'Deletion cancelled by user'
}
