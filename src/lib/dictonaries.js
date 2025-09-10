const dictionaries = {
  en: () => import("../Locales/en.json").then((module) => module.default),
  hi: () => import("../Locales/hi.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
