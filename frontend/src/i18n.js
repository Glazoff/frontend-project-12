import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationCommon from './locales/ru/common.json'
import translationAuth from './locales/ru/auth.json'
import translationChat from './locales/ru/chat.json'
import translationPages from './locales/ru/pages.json'

const resources = {
  ru: {
    translation: {
      common: translationCommon,
      auth: translationAuth,
      chat: translationChat,
      pages: translationPages,
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
