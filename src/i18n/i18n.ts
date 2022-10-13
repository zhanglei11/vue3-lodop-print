import { createI18n } from 'vue-i18n'; //引入vue-i18n组件
import messages from './index';
// const language = (
//   (navigator.language ? navigator.language : navigator.userLanguage) || "zh"
// ).toLowerCase();
const activeI18n: string | null = !localStorage.getItem('activeI18n') ?
  'zh' :
  localStorage.getItem('activeI18n');
const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: activeI18n,
  messages
});

export default i18n;

