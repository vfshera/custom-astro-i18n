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
  en: {
    nav: { home: "Home", about: "About", twitter: "Twitter" },
    footer: { title: "Footer" },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos" },
    job: {
      desc: "This is a dev",
    },
    terms: {
      join: "Welcome to translations",
    },
  },
} as const;

/**
 * Types
 */
export type Languages = keyof typeof languages;
export type Translation = typeof translations;

export type NonEmptyPath<T, P = ""> = {
  [K in keyof T]: T[K] extends object
    ? NonEmptyPath<T[K], `${P}${K}.`>
    : `${P}${K}`;
}[keyof T];

export type TPath =
  NonEmptyPath<Translation> extends `${infer Lang}.${infer Rest}`
    ? Rest
    : never;
