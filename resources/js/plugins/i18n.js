import { createI18n } from 'vue-i18n';
import { useLangStore } from '@/store/lang';

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true,
  runtimeOnly: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {}, // set locale messages
});

/**
 * @param {String} locale
 */
export async function loadMessages(locale) {
  if (Object.keys(i18n.global.getLocaleMessage(locale)).length === 0) {
    const messages = await import(/* webpackChunkName: '' */ `../lang/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages);
  }
  if (i18n.locale !== locale) {
    i18n.locale = locale;
    i18n.global.locale.value = locale;
  }
}

(async () => {
  try {
    // Load initial locale message (e.g., 'en')
    await loadMessages('en');

    const store = await useLangStore();
    const { langLocale } = store;

    // Update messages based on store locale
    if (langLocale !== i18n.locale) {
      await loadMessages(langLocale);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  }
})();

export default i18n;
