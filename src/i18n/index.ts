import { createI18n } from 'vue-i18n'
import messages from './messages'

export  const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  legacy: false,
  globalInjection: true,
  messages,
})

