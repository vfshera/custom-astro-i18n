import {
  translations,
  type Languages,
  type Translation,
  defaultLang,
} from "./config";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Languages;
  return defaultLang;
}

export function useTranslations(lang: Languages) {
  return function t(key: keyof Translation[Languages]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
