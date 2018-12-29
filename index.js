const properties = { en: {} };
let path = ["en"];

export default function i18n(key, params) {
  const localeWithKey = path.find(locale => properties[locale][key]);

  if (!localeWithKey) {
    console.error(`missing i18n key for locale <${path}>: <${key}>`);
    return `(???:${key}:???)`;
  }

  const translation = properties[localeWithKey][key];

  if (!params) {
    return translation;
  }

  return Object.keys(params).reduce(
    (accum, param) =>
      accum.replace(new RegExp(`\\[${param}\\]`, "g"), params[param]),
    translation
  );
}

export function hasKey(key) {
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

export function addTranslations(locale, translations) {
  const lcLocale = locale.toLowerCase();
  properties[lcLocale] = Object.assign(
    {},
    properties[lcLocale] || {},
    translations
  );
}
