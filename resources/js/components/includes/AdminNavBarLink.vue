<template>
  <span>
    <router-link v-if="routeName" :to="{ name: routeName }" @click.prevent="navClicked()">
      <span
        class="flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
        :class="
          itemClass +
          ' ' +
          (currentRouteName == routeName
            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white '
            : 'text-gray-700')
        "
      >
        <slot v-if="hasIconSlot" name="icon" />
        <span v-if="text" class="ml-2">{{ text }}</span>
      </span>
    </router-link>

    <div
      v-if="!routeName"
      class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white"
      @click.prevent="navClicked()"
    >
      <slot v-if="hasIconSlot" name="icon" />
      <span v-if="text" class="ml-2">{{ text }}</span>
    </div>
  </span>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'AdminNavBarLink',
  props: {
    routeName: { type: String, default: null },
    text: { type: String, default: null },
    itemClass: { type: String, default: null },
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
      this.track('Clicked ' + this.routeName + ' Admin NavBar Link');
      this.$emit('navClicked');
    },
  },
};
</script>
