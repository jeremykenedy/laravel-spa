<template>
  <li class="flex items-center">
    <router-link
      :to="{ name: routeName }"
      class="font-semibold"
      :class="
        currentRouteName == routeName
          ? 'cursor-default disabled text-gray-800 dark:text-gray-500'
          : 'cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400'
      "
      @click.prevent="navClicked()"
    >
      <span v-if="text">{{ text }}</span>
    </router-link>
  </li>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'AdminBreadcrumb',
  props: {
    routeName: { type: String, default: null },
    text: { type: String, default: null },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    track,
    navClicked() {
      this.track('Clicked ' + this.routeName + ' Nav Link');
      this.$emit('navClicked');
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
