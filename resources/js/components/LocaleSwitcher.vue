<template>
  <li v-if="Object.keys(locales).length > 1" class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ locales[locale] }}
    </a>
    <div class="dropdown-menu">
      <a v-for="(value, key) in locales" :key="key" class="dropdown-item" href="#" @click.prevent="setLocale(key)">
        {{ value }}
      </a>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadMessages } from '@/plugins/i18n';
import { useLangStore } from '@/store/lang';

const store = useLangStore();
const i18n = useI18n({ useScope: 'global' });

const locale = computed(() => store.langLocale);
const locales = computed(() => store.langLocales);

function setLocale(locale) {
  if (i18n.locale !== locale) {
    loadMessages(locale);
    store.setLocale(locale);
  }
}
</script>

<style scoped></style>
