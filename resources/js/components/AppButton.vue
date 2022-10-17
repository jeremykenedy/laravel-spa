<template>
  <button
    class="button inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-3 text-base font-medium leading-none shadow-sm"
    :class="
      loading || disabled
        ? 'opacity-50 ' +
          btnClass +
          ' ' +
          btnColor +
          ' ' +
          btnHoverClass +
          ' ' +
          btnHoverColor +
          btnClassDark +
          ' ' +
          btnColorDark +
          ' ' +
          btnHoverClassDark +
          ' ' +
          btnHoverColorDark
        : btnClass +
          ' ' +
          btnColor +
          ' ' +
          btnHoverClass +
          ' ' +
          btnHoverColor +
          btnClassDark +
          ' ' +
          btnColorDark +
          ' ' +
          btnHoverClassDark +
          ' ' +
          btnHoverColorDark
    "
    :disabled="loading || disabled"
  >
    <slot v-if="hasTextSlot" name="text" />
    <span v-else>
      {{ text }}
      <i v-if="icon" class="fa-fw" :class="icon" />
    </span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'AppButton',
  components: {},
  props: {
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
    icon: { type: String, default: null },
    btnClass: { type: String, default: 'bg-indigo-600' },
    btnHoverClass: { type: String, default: 'hover:bg-indigo-700' },
    btnColor: { type: String, default: 'text-white' },
    btnHoverColor: { type: String, default: 'hover:bg-indigo-700' },
    btnClassDark: { type: String, default: 'dark:bg-indigo-600' },
    btnHoverClassDark: { type: String, default: 'hover:dark:bg-indigo-600' },
    btnColorDark: { type: String, default: 'dark:text-white' },
    btnHoverColorDark: {
      type: String,
      default: 'dark:hover:bg-indigo-700',
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {
    hasTextSlot() {
      return this.$slots.text;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
