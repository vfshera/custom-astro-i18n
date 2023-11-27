import { translations, type Locale, defaultLang } from "./config";

/**
 * Retrieves the language code from the URL path ie. Astro.url
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Locale;
  return defaultLang;
}

/**
 * Loads json translations
 * */
export const useTranslation = async (lang: Locale) => translations[lang]();

/**
 *  translate paths
 */
export function useTranslatedPath(lang: Locale) {
  return (path: string, l: Locale = lang) => `/${l}${path}`;
}

/**
 * Sanitizes HTML content in translations by keeping only allowed tags.
 * This function removes any HTML tags that are not in the specified list of allowed tags.
 *
 * @param input - The input string containing HTML content.
 * @returns A sanitized string with only allowed HTML tags.
 */
export function sanitizeTranslations(input: string): string {
  // List of allowed HTML tags
  const allowedTags = ["strong", "br", "em", "i", "b"];

  // Regular expression for matching HTML tags
  const htmlTagRegex = /<\/?([^\s>]+)(\s[^>]*)*(>|$)/g;

  return input.replace(htmlTagRegex, (match) => {
    // Extract the tag from the match
    const tag = match.replace(/<\/?([^\s>]+)(\s[^>]*)*(>|$)/, "$1");

    // Check if the matched tag is in the allowedTags array
    if (allowedTags.includes(tag)) {
      return match; // Keep the allowed tag
    } else {
      return ""; // Remove the disallowed tag
    }
  });
}
