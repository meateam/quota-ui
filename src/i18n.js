import Vue from "vue";
import VueI18n from "vue-i18n";
import he from './locales/he.json';
import en from './locales/en.json';

Vue.use(VueI18n);

export default new VueI18n({
  locale: "he",
  fallbackLocale: "he",
  messages: {
    he,
    en,
  },
});
