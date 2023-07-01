# Custom i18n For Astro

This project shows how to implement internationalization in Astro.

## Key areas of the project

1. `src/i18n` - where all the logic resides
2. `src/index.astro` - is the entry point which redirects to the defaultLang when `/` route is hit.
3. `src/[lang]/index.astro` - All routes should be in the `[lang]` folder so that we can catch the intended locale ie. `/en/about` etc

---

## Usage

1. Create/copy the `src/i18n` folder to your `src` directory
2. (Optional) Add alias to `tsconfig.json` for easier imports

   ```json
   {
     "extends": "astro/tsconfigs/strict",

     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```

3. Create `src/pages/index.astro` with the following

   ```
   ---
   import { getLangFromUrl } from "@/i18n";

   const lang = getLangFromUrl(Astro.url);

   return Astro.redirect(`/${lang}/`);
   ---

   ```

4. Create a folder `src/[lang]`.All your routes should reside here so that we can match `[lang]` to our languages.

   You can now use translations on your pages as below

   ```
   ---
    import { getLangFromUrl, useTranslations } from "@/i18n";
    import Layout from "@/layouts/Layout.astro";

    const lang = getLangFromUrl(Astro.url);
    const t = useTranslations(lang);
    ---

    <Layout title="About">
        <h1>{t("nav.about")}</h1>
    </Layout>

   ```

<br />

## The i18n Folder

This folder contains the following files:

```
📦i18n
 ┣ 📜LanguagePicker.astro
 ┣ 📜config.ts
 ┣ 📜index.ts
 ┗ 📜utils.ts
```

<br />

### 🌟 `LanguagePicker.astro`

It displays a language switcher.

You can style it and add custom functionality

```jsx
<select name="language" id="i18n-language-picker">
  {Object.entries(languages).map(([lang, label]) => (
    <option value={lang}>{label}</option>
  ))}
</select>
```

<br />

### 🌟 `config.ts`

This file defines the configuration for supported languages, default language, and translations.

```ts
/**
 * Add Supported languages to this object.
 */
export const languages = {
  en: "English",
  fr: "Français",
};

/**
 * Set default language.
 *
 * NOTE: its type is of the languages object
 */
export const defaultLang: Languages = "en";

/**
 * Translations object containing translations for different languages.
 *
 * NOTE: it should have keys  matching the languages object keys
 * then the actual translations in {key : value} pairs.
 * values can be strings or objects with keys
 */
export const translations = {
  en: {
    nav: { home: "Home", about: "About" },
    footer: { title: "The Footer title" },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos" },
  },
} as const;
```

<br />

### 🌟 `utils.ts`

This file contains utility functions used for language detection and translation.

```ts
/**
 * Retrieves the language code from the URL path ie. Astro.url
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Languages;
  return defaultLang;
}

/**
 * Returns the translation value for a given translation key using the default language.
 * You can customize the fallback mechanism here
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
   * If the translation key is found, it returns the corresponding translation.
   * If the translation key is not found, it falls back to the default language translation.
   * If neither the translation key nor the default language translation is found, it returns a placeholder `__${defaultFallbackKeys}__`.
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
```
