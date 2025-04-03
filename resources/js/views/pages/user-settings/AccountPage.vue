<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.index" :text="$t('settings')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.account" :text="$t('account')" />
    </AdminBreadcrumbContainer>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">
          <div class="border-b-2 border-gray-200 dark:border-gray-700 mb-4">
            <ul class="flex flex-wrap justify-evenly text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <li
                class="mr-2 cursor-pointer"
                style="margin-top: 3px; margin-bottom: -2px"
                @click="changeTab('authentication')"
              >
                <span
                  class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                  :class="
                    activeTab == 'authentication'
                      ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : ''
                  "
                >
                  <UserCircleIcon class="mr-1 h-5 w-5" />
                  {{ $t('authentication') }}
                </span>
              </li>

              <li class="mr-2 cursor-pointer" style="margin-top: 3px; margin-bottom: -2px" @click="changeTab('data')">
                <span
                  class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                  :class="
                    activeTab == 'data'
                      ? 'active border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500'
                      : ''
                  "
                >
                  <CircleStackIcon class="mr-1 h-5 w-5" />
                  {{ $t('data') }}
                </span>
              </li>
            </ul>
          </div>

          <AccountAuthentication v-if="activeTab == 'authentication'" />
          <AccountData v-if="activeTab == 'data'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref, watchEffect } from 'vue';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import useAuth from '@composables/auth';
import { track } from '@services/analytics';
import moment from 'moment';
import SettingsNav from '@pages/user-settings/SettingsNav.vue';
import AccountData from '@pages/user-settings/AccountData.vue';
import AccountAuthentication from '@pages/user-settings/AccountAuthentication.vue';
import { CircleStackIcon, UserCircleIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'AccountPage',
  components: {
    SettingsNav,
    AccountData,
    AccountAuthentication,
    CircleStackIcon,
    UserCircleIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      activeTab: 'authentication',
    };
  },
  computed: {
    ...mapState(useAuth, ['processing']),
    ...mapState(useAuthStore, ['user', 'authenticated', 'socials']),
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    track,
    changeTab(tab) {
      this.activeTab = tab;
      this.track(`clicked tab: ${tab}`);
    },
  },
};
</script>
