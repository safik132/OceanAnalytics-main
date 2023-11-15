// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "../src/translations.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translations.en,
    },
    ar: {
      translation: translations.ar,
    },
    dn: {
      translation: translations.dn,
    },
  },
  lng: "en", // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
