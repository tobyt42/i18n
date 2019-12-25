const properties = { en: {} };
let path = ["en"];
let fallbackLocale;

function getTranslation(key, locale) {
  if (locale) {
    return properties[locale][key];
  }

  if (fallbackLocale && properties[fallbackLocale][key]) {
    console.warn(
      `missing i18n key for locale <${path}> <${key}>, falling back to <${fallbackLocale}>`
    );
    return properties[fallbackLocale][key];
  }

  console.warn(`missing i18n key for locale <${path}>: <${key}>`);
  return `(???:${key}:???)`;
}

export default function i18n(key, params, queryLocales) {
  const localePath = queryLocales
    ? queryLocales.filter(locale => properties[locale])
    : path;

  const localeWithKey = localePath.find(locale => properties[locale][key]);

  const translation = getTranslation(key, localeWithKey);

  if (!params) {
    return translation;
  }

  return Object.keys(params).reduce(
    (accum, param) =>
      accum.replace(new RegExp(`\\[${param}\\]`, "g"), params[param]),
    translation
  );
}

export function getLocales() {
  return path.slice();
}

export function tokenExists(key) {
  return path.some(locale => !!properties[locale][key]);
}

export function setLocale(locale) {
  const lcLocale = locale.toLowerCase();

  path = [lcLocale];
  properties[lcLocale] = properties[lcLocale] || {};

  if (locale.indexOf("-") !== -1) {
    const language = lcLocale.split("-")[0];
    path.push(language);
    properties[language] = properties[language] || {};
  }
}

export function setFallbackLocale(locale) {
  fallbackLocale = locale;
}

export function addTranslations(locale, translations) {
  const lcLocale = locale.toLowerCase();
  properties[lcLocale] = Object.assign(
    {},
    properties[lcLocale] || {},
    translations
  );
}
