// @ts-ignore
import i18n from 'i18next';
// @ts-ignore
import * as LngDetector from 'i18next-browser-languagedetector';
import * as locales from 'locales';

i18n.use(LngDetector).init({
  whitelist: ['en', 'en-US', 'fr'],
  fallbackLng: 'en',
  ns: ['common', 'errors'],
  defaultNS: 'common',
  debug: false,
  resources: {
    en: locales.en,
    'en-US': locales.en,
    fr: locales.fr,
  },
  detection: {
    order: ['navigator'],
  },
});

export default i18n;
