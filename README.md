# i18n

i18n is a simple ultra-lightweight internationalisation tool, inspired by br-i18n (bundled with [BRJS](https://github.com/BladeRunnerJS/brjs))

## Usage

### Add translations

Translations can be added with `addTranslations`. This can be called multiple times. You could choose to keep all translations in one file at the app root, or keep the files closer to the usage, have separate files per locale etc.

```
import { addTranslations } from "@tobyt/i18n";

addTranslations("en", {
    "some.key": "some.key"
});

addTranslations("en-US", {
    "some.key": "some.other.value"
})
```

### Set locale

With `setLocale` you can select the locale for a user. You need to ensure you only set the locale to one for which you have provided translations. The locale string can be a language and region, e.g. "en-GB", or just a language, e.g. "en". When setting a region, the translator will always look up the regional value first before falling back to the language-only translations.

```
import { setLocale } from "@tobyt/i18n";

setLocale("en-GB");
```

### Lookup translations

```
import i18n from "@tobyt/i18n";

console.log("translation", i18n("some.key"));
```

### Check whether a translation token exists

With `tokenExists` you can check whether a translation exists.

```
import i18n, { tokenExists } from "@tobyt/i18n";

if (tokenExists("some.key.modifier")) {
    console.log("translation", i18n("some.key.modifier"));
} else {
    console.log("translation", i18n("some.key"));
}
```

### Missing translations behaviour

By default, translations are looked up in their regional and language locale only (e.g. `de-DE` first, `de` second if not found). If a translation is missing for the language locale, a placeholder `(???:some.key:???)` is displayed.

If you wish, you can define a fallback locale which is queried if no translation can be found in the user locales (e.g. `de-DE` first, `de` second, and finally `en`).

```
import { setFallbackLocale } from "@tobyt/i18n";

setFallbackLocale("en");
```
