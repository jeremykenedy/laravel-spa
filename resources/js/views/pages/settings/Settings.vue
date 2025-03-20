<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold float-left ml-2 mt-2" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">

        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'dashboard' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            {{ $t('dashboard') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>

        <li class="flex items-center">
          <div class="cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500">
            {{ $t('settings') }}
          </div>
        </li>
      </ol>
    </nav>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">

          Settings Content

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { watch, ref, watchEffect } from 'vue'
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from "@store/auth";
import useAuth from '@composables/auth'
import { track } from '@services/analytics';
import SettingsNav from '@pages/settings/SettingsNav.vue';
import {
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'Settings',
  components: {
    ArrowRightOnRectangleIcon,
    ChevronRightIcon,
    SettingsNav,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState(useAuth, [
      'processing',
    ]),
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
  },
  watch: {},
  created() { },
  mounted() { },
  beforeUnmount() { },
  updated() { },
  methods: {
    ...mapActions(useAuth, [
      'logout',
    ]),
    clickButton() {
      this.$emit('buttonClicked');
    },
    track,
  },
};
</script>
