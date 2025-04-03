import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore(
  'lang',
  () => {
    const { locale, locales } = window.config;
    const langLocale = ref(getLocale(locales, locale));
    const langLocales = locales;

    const setLocale = (newLocale) => {
      langLocale.value = newLocale;
      Cookies.set('locale', newLocale, { expires: 365 });
    };

    return { langLocale, langLocales, setLocale };
  },
  {
    persist: true,
  },
);

/**
 * @param  {String[]} locales
 * @param  {String} fallback
 * @return {String}
 */
function getLocale(locales, fallback) {
  const locale = Cookies.get('locale');

  if (Object.prototype.hasOwnProperty.call(locales, locale)) {
    return locale;
  } else if (locale) {
    Cookies.remove('locale');
  }

  return fallback;
}
