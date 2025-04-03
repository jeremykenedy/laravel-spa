<template>
  <router-link
    :to="{ name: routeName }"
    class="flex items-center border-b p-4 whitespace-nowrap"
    :class="
      itemClass +
      ' ' +
      (currentRouteName == routeName
        ? 'cursor-default bg-slate-600 text-gray-100'
        : 'cursor-pointer hover:bg-slate-800 hover:text-white')
    "
    @click.prevent="navClicked()"
  >
    <slot v-if="hasIconSlot" name="icon" />
    <span v-if="text" class="ml-3">{{ text }}</span>
  </router-link>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'SettingsNavLink',
  props: {
    routeName: { type: String, default: null },
    text: { type: String, default: null },
    itemClass: { type: String, default: null },
  },
  emits: ['navClicked'],
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    hasIconSlot() {
      return this.$slots.icon;
    },
  },
  methods: {
    track,
    navClicked() {
      this.track('Clicked Settings Tab ' + this.routeName);
      this.$emit('navClicked');
    },
  },
};
</script>
