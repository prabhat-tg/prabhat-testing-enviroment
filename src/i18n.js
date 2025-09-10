import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import entranslations from "./Locales/en.json";
import hitranslations from "./Locales/hi.json";
import gutranslations from "./Locales/gu.json";
import mrtranslations from "./Locales/mr.json";

const getSavedLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en";
};

const resources = {
  en: { translation: entranslations },
  hi: { translation: hitranslations },
  gu: { translation: gutranslations },
  mr: { translation: mrtranslations },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedLanguage(), // Use client-safe function
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
