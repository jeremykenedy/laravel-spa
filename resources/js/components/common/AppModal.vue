<template>
  <div>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
    >
      <div class="relative my-6 mx-auto w-auto" :class="modalWidthClass">
        <div
          class="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-slate-600"
        >
          <div class="flex items-start justify-between rounded-t p-5">
            <!-- border-b border-solid border-slate-200 -->
            <h3 class="text-3xl font-semibold">
              <slot v-if="hasTitleSlot" name="title" />
            </h3>
            <AppButton
              v-if="showClose"
              text="X"
              class="text-1xl float-right border-0 bg-transparent text-gray-600 shadow-none outline-none hover:text-gray-800 focus:outline-none"
              @click="closeModal()"
            />
          </div>
          <div class="relative flex-auto p-6">
            <slot v-if="hasBodySlot" name="body" />
          </div>
          <div v-if="hasFooterSlot" class="flex items-center justify-end p-6">
            <!-- rounded-b border-t border-solid border-slate-200 -->
            <slot v-if="hasFooterSlot" name="footer" />
          </div>
          <div v-else class="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
            <AppButton
              v-if="showConfirmButton"
              secondary
              class="mr-1 mb-1"
              :text="closeText"
              @click.prevent="closeModal()"
            />
            <AppButton
              v-if="showCloseButton"
              success
              class="mr-1 mb-1"
              :text="confirmText"
              @click.prevent="confirmModal()"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25" />
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    showModal: { type: Boolean, default: false },
    showClose: { type: Boolean, default: true },
    modalWidthClass: {
      type: String,
      default: 'min-w-[96%] sm:min-w-[60%] lg:min-w-[50%]',
    },
    showConfirmButton: { type: Boolean, default: true },
    showCloseButton: { type: Boolean, default: true },
    confirmText: { type: String, default: 'Confirm' },
    closeText: { type: String, default: 'Close' },
  },
  data() {
    return {};
  },
  computed: {
    hasTitleSlot() {
      return this.$slots.title;
    },
    hasBodySlot() {
      return this.$slots.body;
    },
    hasFooterSlot() {
      return this.$slots.footer;
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    confirmModal() {
      this.$emit('confirmModal');
    },
  },
};
</script>
