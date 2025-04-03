<template>
  <div
    class="relative mx-auto flex w-full items-start rounded border border-red-400 bg-red-400 px-4 py-3 text-white dark:border-red-600 dark:bg-red-600 md:p-2"
    :class="containerClass"
    role="alert shadow"
  >
    <span v-if="!errorsList && message" class="block w-full text-center sm:inline">{{ message }}</span>
    <div v-if="errorsList" class="block w-full text-center sm:inline">
      <ul class="text-left text-sm">
        <li v-for="error in errorsList" :key="error.index">
          <ul>
            <li v-for="err in error" :key="err.index">
              {{ err }}
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
    errors: {
      type: Object,
      default() {
        return {};
      },
    },
    containerClass: { type: String, default: 'md:w-10/12' },
  },
  computed: {
    message() {
      if (this.content && this.content.message) {
        return this.content.message;
      }
      return false;
    },
    errorsList() {
      if (this.errors) {
        return this.errors;
      }
      return false;
    },
  },
};
</script>
