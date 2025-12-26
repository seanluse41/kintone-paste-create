import i18next from 'i18next';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

i18next.init({
  lng: kintone.getLoginUser().language,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ja: { translation: ja }
  }
});

export default i18next;