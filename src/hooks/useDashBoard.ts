import { ref } from 'vue'
import { i18n } from '../i18n'
import { CategoryMeta } from '../types/myTypes'
import { AccountCategory } from '../types/myEnums'

export function useDashBoard() {
  const { t } = i18n.global
  const initialized = ref(false)
  const categoryMetadata: Record<AccountCategory, CategoryMeta> = {
    [AccountCategory.Assets]: {
      value: AccountCategory.Assets,
      name: 'Assets',
      labelTh: t('Assets'),
      description: 'ลูกหนี้',
      drEffect: '+',
      crEffect: '-',
      icon: 'account_balance_wallet',
      color: 'blue-7'
    },
    [AccountCategory.Liabilities]: {
      value: AccountCategory.Liabilities,
      name: 'Liabilities',
      labelTh: t('Liabilities'),
      drEffect: '-',
      crEffect: '+',
      icon: 'receipt_long',
      color: 'orange-8'
    },
    [AccountCategory.Equity]: {
      value: AccountCategory.Equity,
      name: 'Equity',
      labelTh: t('Equity'),
      drEffect: '-',
      crEffect: '+',
      icon: 'pie_chart',
      color: 'purple-7'
    },
    [AccountCategory.Revenue]: {
      value: AccountCategory.Revenue,
      name: 'Revenue',
      labelTh: t('Revenue'),
      drEffect: '-',
      crEffect: '+',
      icon: 'trending_up',
      color: 'positive'
    },
    [AccountCategory.Expenses]: {
      value: AccountCategory.Expenses,
      name: 'Expenses',
      labelTh: t('Expenses'),
      drEffect: '+',
      crEffect: '-',
      icon: 'trending_down',
      color: 'negative'
    }
  }
  return {
    categoryMetadata,
    initialized
  }
}
