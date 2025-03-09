<template>
  <client-only>
    <umo-editor v-bind="options" />
  </client-only>
</template>

<script setup>
import { UmoEditor } from '@umoteam/editor';

const options = ref({
  theme: 'light',
});
</script>
