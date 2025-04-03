<template>
  <div
    class="relative mx-auto flex w-full items-start rounded border border-green-100 bg-green-100 px-4 py-3 text-green-500 md:p-2"
    role="alert shadow"
  >
    <span class="block w-full text-left sm:inline">
      {{ content }}
    </span>
    <span class="" @click="$emit('close')">
      <XMarkIcon class="h-5 w-5 cursor-pointer font-bold" />
    </span>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    XMarkIcon,
  },
  props: {
    content: {
      type: String,
      default: 'Success!',
    },
  },
};
</script>
