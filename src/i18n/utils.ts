import { translations, type Languages, defaultLang, TPath } from "./config";

/**
 * Retrieves the language code from the URL path.
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Languages;
  return defaultLang;
}

/**
 * Returns the translation value for a given translation key using the default language.
 */
function translationFallback(keys: string[], defaultFallbackKeys: string) {
  let value: any = translations;

  for (let key of [defaultLang, ...keys]) {
    if (value && typeof value === "object" && key in value) {
      value = value[key as keyof typeof value];
    } else {
      value = `__${defaultFallbackKeys}__`;
    }
  }

  return value as string;
}

/**
 * Returns a translation function for the specified language.
 */
export function useTranslations(lang: Languages) {
  /**
   * Translates the given translation key.
   */
  return function t(translationKey: TPath) {
    const keys = translationKey.split(".");
    let value: any = translations;

    for (let key of [lang, ...keys]) {
      if (value && typeof value === "object" && key in value) {
        value = value[key as keyof typeof value];
      } else {
        value = translationFallback(keys, `${lang}.${translationKey}`);
      }
    }

    return value as string;
  };
}
