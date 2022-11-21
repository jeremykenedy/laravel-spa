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
          <div
            v-else
            class="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6"
          >
            <button
              class="mr-1 mb-1 rounded border border-solid border-red-500 bg-transparent px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:bg-red-500 hover:text-white focus:outline-none active:bg-red-600"
              type="button"
              @click="closeModal()"
            >
              Close
            </button>
            <button
              class="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
              type="button"
              @click="confirmModal()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
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
    closeModal: function () {
      this.$emit('closeModal');
    },
    confirmModal: function () {
      this.$emit('confirmModal');
    },
  },
};
</script>
