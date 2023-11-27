/**
 * Supported languages object.
 */
export const locales = {
  en: "English",
  fr: "Français",
};

/**
 * Default language.
 */
export const defaultLang: Locale = "en";

/**
 * Translations object containing translations for different languages.
 */
export const translations = {
  en: () => import("./translations/en.json").then((module) => module.default),
  fr: () => import("./translations/fr.json").then((module) => module.default),
} as const;

/**
 * Types
 */
export type Locale = keyof typeof locales;
export type Translation = typeof translations;
