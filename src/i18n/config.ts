/**
 * Supported languages object.
 */
export const languages = {
  en: "English",
  fr: "Français",
};

/**
 * Default language.
 */
export const defaultLang: Languages = "en";

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
export type Languages = keyof typeof languages;
export type Translation = typeof translations;
