import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import en from './locales/en'

const LOCALE_KEY = 'cf-manager-locale'

export function getSavedLocale(): string {
  const saved = localStorage.getItem(LOCALE_KEY)
  if (saved === 'en' || saved === 'zh-CN') return saved
  // 根据浏览器语言自动选择
  const navLang = navigator.language
  if (navLang.startsWith('zh')) return 'zh-CN'
  return 'en'
}

export function saveLocale(locale: string) {
  localStorage.setItem(LOCALE_KEY, locale)
}

const savedLocale = getSavedLocale()

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    en
  }
})

export default i18n
