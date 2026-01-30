import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app }) => {
  // Use default locale for static generation, will be updated client-side
  const locale = process.client && app.$cookies ? app.$cookies.get("locale") : null;
  app.i18n = new VueI18n({
    locale: locale || "en",
    fallbackLocale: "en",
    messages: {
      ja: require("~/lang/ja.json"),
      en: require("~/lang/en.json"),
    },
  });
};
