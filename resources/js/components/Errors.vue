<template>
  <div
    class="relative mx-auto flex w-full items-start rounded border border border-red-100 bg-red-100 px-4 py-3 text-red-500 md:w-10/12 md:p-2"
    role="alert shadow"
  >
    <span v-if="!content.errors" class="block w-full text-center sm:inline">{{
      content.message
    }}</span>
    <div v-else class="block w-full text-center sm:inline">
      <ul class="text-left text-sm">
        <li v-for="error in content.errors" :key="error.index">
          <ul>
            <li v-for="e in error" :key="e.index">
              {{ e }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
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
    type: {
      type: String,
      default: 'success',
    },
    content: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
