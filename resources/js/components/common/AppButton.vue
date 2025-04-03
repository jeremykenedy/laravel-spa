<template>
  <button
    class="button inline-flex items-center justify-center"
    :class="(loading || disabled ? 'opacity-50 ' : '') + btnClasses + ' ' + btnClass"
    :disabled="loading || disabled"
    @click="clickButton"
  >
    <slot v-if="hasTextSlot" name="text" />
    <span v-else>
      {{ text }}
      <span v-if="icon" class="fa-fw" :class="icon" />
      {{ textAfter }}
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
    textAfter: { type: String, default: '' },
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
  data() {
    return {
      //
    };
  },
  computed: {
    hasTextSlot() {
      return this.$slots.text;
    },
    hasTextAfterSlot() {
      return this.$slots.textAfter;
    },
    btnClasses() {
      let buttonClasses = `
        px-4
        py-3
        whitespace-nowrap
        rounded
        text-base
        font-medium
        leading-none
        shadow-sm
        transition
        duration-150
        ease-in-out
      `;

      if (this.primary) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-indigo-600
          hover:bg-indigo-900
          dark:bg-indigo-600
          dark:hover:bg-indigo-400
          border-indigo-600
          hover:border-indigo-900
          dark:border-indigo-600
          dark:hover:border-indigo-400
          border-1
          border
        `;
      } else if (this.secondary) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-slate-600
          hover:bg-slate-900
          dark:bg-slate-600
          dark:hover:bg-slate-400
          border-slate-600
          hover:border-slate-900
          dark:border-slate-600
          dark:hover:border-slate-400
          border-1
          border
        `;
      } else if (this.info) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-blue-600
          hover:bg-blue-900
          dark:bg-blue-600
          dark:hover:bg-blue-400
          border-blue-600
          hover:border-blue-900
          dark:border-blue-600
          dark:hover:border-blue-400
          border-1
          border
        `;
      } else if (this.accent) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-teal-600
          hover:bg-teal-900
          dark:bg-teal-600
          dark:hover:bg-teal-400
          border-teal-600
          hover:border-teal-900
          dark:border-teal-600
          dark:hover:border-teal-400
          border-1
          border
        `;
      } else if (this.success) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-green-600
          hover:bg-green-900
          dark:bg-green-600
          dark:hover:bg-green-400
          border-green-600
          hover:border-green-900
          dark:border-green-600
          dark:hover:border-green-400
          border-1
          border
        `;
      } else if (this.warning) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-yellow-600
          hover:bg-yellow-900
          dark:bg-yellow-600
          dark:hover:bg-yellow-400
          border-yellow-600
          hover:border-yellow-900
          dark:border-yellow-600
          dark:hover:border-yellow-400
          border-1
          border
        `;
      } else if (this.danger) {
        buttonClasses += `
          text-white
          dark:text-white
          bg-red-600
          hover:bg-red-900
          dark:bg-red-600
          dark:hover:bg-red-400
          border-red-600
          hover:border-red-900
          dark:border-red-600
          dark:hover:border-red-400
          border-1
          border
        `;
      } else if (this.transparent) {
        // t = 'gray';
        buttonClasses += '';
      } else {
        buttonClasses += '';
      }

      return buttonClasses;
    },
  },
  methods: {
    clickButton() {
      this.$emit('buttonClicked');
    },
  },
};
</script>
