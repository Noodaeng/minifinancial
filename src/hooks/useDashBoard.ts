import { reactive } from 'vue' // <-- Import reactive
import { i18n } from '../i18n'
import { useApi } from '../services/api'
import { CategoryMeta, AccountCategorySummary } from '../types/myTypes'
import { AccountCategory } from '../types/myEnums'
import { showError } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'

export function useDashBoard() {
  const { t } = i18n.global

  // 1. Wrap in reactive() so property mutations trigger UI updates
  const categoryMetadata = reactive<Record<AccountCategory | number, CategoryMeta>>({
    [AccountCategory.Assets]: {
      value: AccountCategory.Assets,
      name: 'Assets',
      labelTh: t('Assets'),
      description: 'ลูกหนี้',
      drEffect: '+',
      crEffect: '-',
      icon: 'account_balance_wallet',
      color: 'blue-7',
      totalCredit: 0,
      totalDebit: 0
    },
    [AccountCategory.Liabilities]: {
      value: AccountCategory.Liabilities,
      name: 'Liabilities',
      labelTh: t('Liabilities'),
      drEffect: '-',
      crEffect: '+',
      icon: 'receipt_long',
      color: 'orange-8',
      totalCredit: 0,
      totalDebit: 0
    },
    [AccountCategory.Equity]: {
      value: AccountCategory.Equity,
      name: 'Equity',
      labelTh: t('Equity'),
      drEffect: '-',
      crEffect: '+',
      icon: 'pie_chart',
      color: 'purple-7',
      totalCredit: 0,
      totalDebit: 0
    },
    [AccountCategory.Revenue]: {
      value: AccountCategory.Revenue,
      name: 'Revenue',
      labelTh: t('Revenue'),
      drEffect: '-',
      crEffect: '+',
      icon: 'trending_up',
      color: 'positive',
      totalCredit: 0,
      totalDebit: 0
    },
    [AccountCategory.Expenses]: {
      value: AccountCategory.Expenses,
      name: 'Expenses',
      labelTh: t('Expenses'),
      drEffect: '+',
      crEffect: '-',
      icon: 'trending_down',
      color: 'negative',
      totalCredit: 0,
      totalDebit: 0
    }
  })

  const Init = async () => {
    try {
      const result = await getSessionSummaryByAccountCategory()
      console.log('sessions=========>>', result)

      // Reset totals
      Object.values(categoryMetadata).forEach(cat => {
        cat.totalCredit = 0
        cat.totalDebit = 0
      })

      // Populate totals (Vue will now detect these mutations!)
      result.forEach(item => {
        const accCat = categoryMetadata[item.category]
        if (accCat) {
          if (item.type === 'credit') {
            accCat.totalCredit = item.totalAmount
          } else if (item.type === 'debit') {
            accCat.totalDebit = item.totalAmount
          }
        }
      })
    } catch (err) {
      await showError(err)
    }
  }

  // +++++++++++ Api call ++++++++++
  async function getSessionSummaryByAccountCategory(): Promise<AccountCategorySummary[]> {
    try {
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const api = useApi()
      const response = await api.post(
        `${baseUrl}/api/sessionRpt/getSessionSummaryByAccountCategory`,
        {
          token: secretToken
        }
      )
      return response.data?.data || []
    } catch (err: any) {
      await showError(err)
      return []
    }
  }

  return {
    categoryMetadata,
    Init
  }
}
