<template>
  <div v-if="show" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-700 dark:bg-opacity-75" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-slate-900 sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pt-5 pb-4 dark:bg-slate-900 sm:p-6 sm:pb-4">
            <div v-if="hasBodySlot" class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <slot v-if="hasBodySlot" name="body" />
            </div>

            <div v-else class="sm:flex sm:items-start">
              <div
                v-if="showIcon"
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <ExclamationTriangleIcon class="h-6 w-6 text-red-500" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 id="modal-title" class="mb-4 mt-0 text-lg font-medium leading-6 text-red-500 dark:text-red-400">
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    {{ text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="hasFooterSlot" class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <slot v-if="hasFooterSlot" name="footer" />
          </div>
          <div v-else class="flex justify-between px-4 py-3 sm:px-6">
            <AppButton v-if="showCancelButton" :text="cancelText" class="mr-3" @click="$emit('cancel')" />
            <AppButton v-if="showConfirmButton" danger :text="confirmText" @click="$emit('confirm')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { track } from '@services/analytics';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'AppDeleteModal',
  components: {
    ExclamationTriangleIcon,
  },
  props: {
    show: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    showCancelButton: { type: Boolean, default: true },
    cancelText: { type: String, default: 'Cancel' },
    showConfirmButton: { type: Boolean, default: true },
    confirmText: { type: String, default: 'Confirm Delete' },
    title: { type: String, default: 'Delete account' },
    text: {
      type: String,
      default:
        'Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.',
    },
  },
  data() {
    return {
      blank: 'AppDeleteModal',
    };
  },
  computed: {
    hasBodySlot() {
      return this.$slots.body;
    },
    hasFooterSlot() {
      return this.$slots.footer;
    },
  },
  methods: {
    track,
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
