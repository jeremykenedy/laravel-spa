<template>
  <div class="mx-auto py-14">
    <div
      class="relative isolate overflow-hidden bg-white dark:bg-gray-900 px-6 py-44 text-center dark:shadow-2xl sm:rounded sm:px-16"
    >
      <slot v-if="hasTextSlot" name="text" />
      <span v-else>
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-700 dark:text-white sm:text-5xl">
          {{ text }}
        </h2>
      </span>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <slot v-if="hasActionSlot" name="action" />
      </div>
      <svg
        viewBox="0 0 1024 1024"
        class="hidden dark:block absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoRecordsCTA',
  props: {
    text: { type: String, default: '' },
  },
  computed: {
    hasTextSlot() {
      return this.$slots.text;
    },
    hasActionSlot() {
      return this.$slots.action;
    },
  },
};
</script>
