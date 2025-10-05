import { createI18n } from 'vue-i18n'
import shavian from './locales/shavian.json'
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'

// Detect browser language
function getBrowserLocale() {
  const navigatorLocale = navigator.languages !== undefined
    ? navigator.languages[0]
    : navigator.language

  if (!navigatorLocale) {
    return 'es'
  }

  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0]
  return trimmedLocale
}

// Get saved locale or browser locale
function getStartingLocale() {
  const savedLocale = localStorage.getItem('hyperdrive-locale')
  if (savedLocale) {
    return savedLocale
  }
  
  const browserLocale = getBrowserLocale()
  const supportedLocales = ['es', 'en', 'pt', 'shavian']
  
  return supportedLocales.includes(browserLocale) ? browserLocale : 'es'
}

const i18n = createI18n({
  legacy: false,
  locale: getStartingLocale(),
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    pt,
    shavian
  }
})

export default i18n
