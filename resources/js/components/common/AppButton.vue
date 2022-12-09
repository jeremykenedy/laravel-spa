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
      <span v-if="icon" class="fa-fw" :class="icon" />
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
    info: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
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
          border-transparent
          hover:text-gray-400
          active:text-white
          active:bg-gray-500
          focus:text-white
          focus:bg-gray-500
          dark:text-gray-300
          dark:hover:text-white
          dark:hover:bg-transparent
          shadow-none
          focus:shadow-lg
          focus:outline-none
          focus:ring-0
          font-medium
          transition
          duration-150
          ease-in-out
      `;
      if (this.primary) {
        t = 'indigo';
        buttonClasses += ' text-white';
      } else if (this.secondary) {
        t = 'slate';
        buttonClasses += ' text-white';
      } else if (this.info) {
        t = 'blue';
        buttonClasses += ' text-white';
      } else if (this.accent) {
        t = 'gray';
        buttonClasses += ' text-white';
      } else if (this.success) {
        t = 'green';
        buttonClasses += ' text-white';
      } else if (this.warning) {
        t = 'yellow';
        buttonClasses += ' text-white';
      } else if (this.transparent) {
        t = 'gray';
        buttonClasses +=
          'bg-transparent text-gray-500 hover:text-gray-800 focus:text-gray-800 active:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100';
      } else {
        buttonClasses +=
          ' text-gray-700 hover:text-gray-900 hover:bg-gray-500 hover:text-gray-100';
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
            dark:hover:bg-red-400
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
            hover:bg-${t}-900
            dark:text-white
            dark:bg-${t}-600
            dark:hover:bg-${t}-400
            border
            border-transparent
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            font-medium
            transition
            duration-150
            ease-in-out
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
