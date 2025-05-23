import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-CN',
    defaultNS: 'common', // 你可以保留默认命名空间
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 按需加载指定命名空间的文件
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
