import { translations, type Languages, defaultLang } from "./config";

/**
 * Retrieves the language code from the URL path ie. Astro.url
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Languages;
  return defaultLang;
}

/**
 * Loads json translations
 *  */
export const useTranslation = async (lang: Languages) => translations[lang]();
