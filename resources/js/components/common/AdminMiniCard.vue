<template>
  <figure
    class="flex flex-col justify-left p-6 text-left rounded-lg shadow dark:shadow-none bg-gray-100 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700"
  >
    <figcaption class="flex justify-left text-gray-700 dark:text-gray-300">
      <slot v-if="hasIconSlot" name="icon" />
      <div class="space-y-0.5 font-medium dark:text-white text-left ms-3">
        <slot v-if="hasContentSlot" name="content" />
      </div>
    </figcaption>
  </figure>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'AdminMiniCard',
  computed: {
    hasIconSlot() {
      return this.$slots.icon;
    },
    hasContentSlot() {
      return this.$slots.content;
    },
  },
  methods: {
    clickButton() {
      this.$emit('buttonClicked');
    },
    track,
  },
};
</script>
