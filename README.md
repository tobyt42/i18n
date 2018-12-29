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

### HasKey check

With `hasKey` you can check whether a translation exists.

```
import i18n, { hasKey } from "@tobyt/i18n";

if (hasKey("some.key.modifier")) {
    console.log("translation", i18n("some.key.modifier"));
} else {
    console.log("translation", i18n("some.key"));
}
```
