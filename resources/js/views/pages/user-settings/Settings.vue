<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">

    <AdminBreadcrumbContainer>
      <AdminBreadcrumb routeName="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb routeName="settings.index" :text="$t('settings')" />
    </AdminBreadcrumbContainer>

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
import moment from 'moment';
import SettingsNav from '@pages/user-settings/SettingsNav.vue';
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
