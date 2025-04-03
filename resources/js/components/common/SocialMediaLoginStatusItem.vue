<template>
  <span
    v-tippy="loginEnabled(name) ? $t('enabled') : $t('disabled')"
    class="fa-brands fa-fw"
    :class="
      'fa-' +
      icon +
      ' ' +
      (loginEnabled(name)
        ? enabledClass
          ? enabledClass
          : 'text-gray-800 dark:text-gray-200 '
        : disabledClass
          ? disabledClass
          : 'text-gray-400 dark:text-gray-600 ')
    "
  />
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';

export default {
  name: 'SocialMediaLoginStatusItem',
  props: {
    icon: { type: String },
    name: { type: String },
    enabledClass: { type: String, default: null },
    disabledClass: { type: String, default: null },
  },
  methods: {
    ...mapActions(useAuthStore, ['loginEnabled']),
  },
};
</script>
