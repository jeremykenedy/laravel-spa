<template>
  <router-link v-slot="{ isActive }" :to="{ name: routeName }"
    class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
    @click.prevent="navClicked()">
    <span :class="[
      isActive &&
      'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
    ]">
      <slot v-if="hasIconBeforeSlot" name="iconBefore" />
      <span v-if="text">{{ text }}</span>
      <slot v-if="hasIconAfterSlot" name="iconAfter" />
    </span>
  </router-link>
</template>

<script>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { track } from '@services/analytics';

export default {
  name: 'NavLink',
  props: {
    routeName: { type: String, default: null },
    text: { type: String, default: null },
  },
  computed: {
    hasIconBeforeSlot() {
      return this.$slots.iconBefore;
    },
    hasIconAfterSlot() {
      return this.$slots.iconAfter;
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
:deep() .text-white {
  color: #ffffff !important;
}
</style>
<style lang="scss" scoped>
</style>
