// SUPPORTED LANGUAGES
export const languages = {
  en: "English",
  fr: "Français",
};

// DEFAULT LANGUAGE
export const defaultLang: Languages = "en";

// TRANSLATIONS
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

// -------------------------------------------------------------------------------------------------------------------------

/**
 * TYPES
 */

export type Languages = keyof typeof languages;
export type Translation = typeof translations;
