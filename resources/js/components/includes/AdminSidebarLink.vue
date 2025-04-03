<template>
  <span>
    <router-link v-if="!url" :to="{ name: routeName }" @click.prevent="navClicked()">
      <div
        class="flex h-10 w-full items-center rounded-lg pl-4 text-blue-400"
        :class="
          currentRouteName == routeName
            ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
        "
      >
        <slot v-if="hasIconSlot" name="icon" />
        <span v-if="text" class="ml-2">{{ text }}</span>
      </div>
    </router-link>

    <a
      v-if="url"
      :href="url"
      target="_blank"
      class="flex h-10 w-full items-center rounded-lg pl-4 text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <slot v-if="hasIconSlot" name="icon" />
      <span v-if="text" class="ml-2 truncate">{{ text }}</span>
    </a>
  </span>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'AdminSidebarLink',
  props: {
    routeName: { type: String, default: null },
    text: { type: String, default: null },
    url: { type: String, default: null },
  },
  computed: {
    hasIconSlot() {
      return this.$slots.icon;
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    track,
    navClicked() {
      this.track('Clicked ' + this.routeName + ' Admin Sidebar Link');
      this.$emit('navClicked');
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
