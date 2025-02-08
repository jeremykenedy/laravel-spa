<template>
  <span v-tippy="'Switch Theme to ' + (darkMode ? 'Light' : 'Dark') + ' Mode'" class="mr-8"
    :class="isLoading.value ? 'default disabled cursor-pointer' : 'cursor-pointer'" @click="switchDarkMode()">
    <Switch :default-checked="darkMode" :class="darkMode ? 'bg-gray-500' : 'bg-gray-400'"
      class="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      style="margin-top: 5px;">
      <span class="sr-only">Toggle Theme</span>
      <span aria-hidden="true" :class="darkMode
        ? 'translate-x-4 bg-gray-800'
        : 'translate-x-0 bg-white'
        "
        class="pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out" />
    </Switch>
  </span>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useDarkMode from "@composables/darkmode";
import { useAuthStore } from "@store/auth";
import { Switch } from '@headlessui/vue';

export default {
  name: 'ToggleDarkMode',
  components: {
    Switch,
  },
  mounted() {
    this.checkDarkMode();
  },
  computed: {
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
    ...mapState(useDarkMode, [
      'isLoading',
    ]),
  },
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    ...mapActions(useDarkMode, [
      'toggleDarkMode',
      'enableDarkMode',
      'disableDarkMode',
    ]),
    checkDarkMode() {
      if (this.user && this.user.id) {
        // localStorage.setItem("darkmode", this.user.theme_dark)
        if (this.user.theme_dark) {
          this.enableDarkMode();
          this.darkMode = true;
        } else {
          this.disableDarkMode();
          this.darkMode = false;
        }
      } else {
        let lst = localStorage.getItem("data-theme");
        if (lst == 'dark') {
          this.enableDarkMode();
          this.darkMode = true;
        } else {
          this.disableDarkMode();
          this.darkMode = false;
        }
      }
    },
    switchDarkMode() {
      let theme;
      this.toggleDarkMode(false);
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        theme = 'dark'
      } else {
        theme = 'light'
      }
      window.dispatchEvent(new CustomEvent('theme-localstorage-changed', {
        detail: {
          storage: theme
        }
      }));
    },
  },
}
</script>
