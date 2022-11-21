<template>
  <button
    class="button inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-3 text-base font-medium leading-none shadow-sm"
    :class="
      (loading || disabled ? 'opacity-50 ' : '') + btnClasses + ' ' + btnClass
    "
    :disabled="loading || disabled"
    @click="clickButton"
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
    btnClass: { type: String, default: '' },
    primary: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    accent: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
    danger: { type: Boolean, default: false },
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
    btnClasses() {
      let t = null;
      let buttonClasses = `
          bg-transparent
          border
          border-1
          text-gray-500
          hover:text-white
          hover:bg-gray-500
          active:text-white
          active:bg-gray-500
          focus:text-white
          focus:bg-gray-500
          dark:text-white
          dark:hover:bg-gray-500
          shadow-none
      `;
      if (this.primary) {
        t = 'indigo';
      }
      if (this.secondary) {
        t = 'slate';
      }
      if (this.accent) {
        t = 'teal';
      }
      if (this.success) {
        t = 'green';
      }
      if (this.warning) {
        t = 'yellow';
      }
      if (this.danger) {
        t = 'red';
        if (this.outline) {
          buttonClasses = `
            bg-transparent
            border
            border-1
            border-red-400
            text-red-400
            hover:text-white
            hover:bg-red-700
          `;
        } else {
          buttonClasses = `
            bg-red-600
            hover:bg-red-800
            text-white
            dark:text-white
            dark:bg-red-600
            dark:hover:bg-red-500
            border
            border-transparent
          `;
        }
      }
      if (t) {
        if (this.outline) {
          buttonClasses = `
            bg-transparent
            border
            border-1
            border-${t}-400
            text-${t}-400
            hover:text-white
            hover:bg-${t}-700
          `;
        } else {
          buttonClasses = `
            bg-${t}-600
            hover:bg-${t}-800
            text-white
            dark:text-white
            dark:bg-${t}-600
            dark:hover:bg-${t}-500
            border
            border-transparent
          `;
        }
      }

      return buttonClasses;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    clickButton() {
      this.$emit('buttonClicked');
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
