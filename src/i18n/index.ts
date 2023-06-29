export const languages = {
  en: "English",
  fr: "Français",
};

type Languages = keyof typeof languages;

export const defaultLang: Languages = "en";

export const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.twitter": "Twitter",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Languages;
  return defaultLang;
}

export function useTranslations(lang: Languages) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
