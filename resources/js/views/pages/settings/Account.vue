<template>
  <div
    class="rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800"
  >
    Account
  </div>
  <div class="rounded-b-lg bg-white p-4 dark:bg-slate-800">
    <!-- <Success v-if="success" :content="success" @close="success = null" /> -->
    <!-- <Errors v-if="errors" :content="errors" @close="errors = null" /> -->
    <div class="border-b-2 border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap justify-evenly text-center text-sm font-medium text-gray-500 dark:text-gray-400"
      >
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
            Authentication
          </span>
        </li>

        <!--
        <li
          class="mr-2 cursor-pointer"
          style="margin-top: 3px; margin-bottom: -2px"
          @click="changeTab('data')"
        >
          <span
            class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
            :class="
              activeTab == 'data'
                ? 'active border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500'
                : ''
            "
          >
            <CircleStackIcon class="mr-1 h-5 w-5" />
            Data
          </span>
        </li>

        <li
          class="mr-2 cursor-pointer"
          style="margin-top: 3px; margin-bottom: -2px"
          @click="changeTab('privacy')"
        >
          <span
            class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
            :class="
              activeTab == 'privacy'
                ? 'active border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
                : ''
            "
          >
            <ShieldExclamationIcon class="mr-1 h-5 w-5" />
            Privacy
          </span>
        </li>
        -->

        <li
          class="mr-2 cursor-pointer"
          style="margin-top: 3px; margin-bottom: -2px"
          @click="changeTab('administration')"
        >
          <span
            class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
            :class="
              activeTab == 'administration'
                ? 'active border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                : ''
            "
          >
            <ExclamationTriangleIcon class="mr-1 h-5 w-5" />
            Administration
          </span>
        </li>
      </ul>
    </div>

    <div
      class="rounded-b-lg bg-gray-50 p-4"
      :class="
        activeTab == 'administration' ? 'dark:bg-gray-900' : 'dark:bg-gray-800'
      "
    >
      <AccountAuthentication v-if="activeTab == 'authentication'" />
      <AccountData v-if="activeTab == 'data'" />
      <AccountPrivacy v-if="activeTab == 'privacy'" />
      <AccountAdministration v-if="activeTab == 'administration'" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { track } from '@services/analytics';
import {
  ShieldExclamationIcon,
  CircleStackIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline';

import AccountAdministration from '@components/account/AccountAdministration.vue';
import AccountAuthentication from '@components/account/AccountAuthentication.vue';
import AccountData from '@components/account/AccountData.vue';
import AccountPrivacy from '@components/account/AccountPrivacy.vue';

export default {
  components: {
    ShieldExclamationIcon,
    CircleStackIcon,
    UserCircleIcon,
    ExclamationTriangleIcon,
    AccountAdministration,
    AccountAuthentication,
    AccountData,
    AccountPrivacy,
  },
  data() {
    return {
      activeTab: 'authentication',
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    track,
    changeTab(tab) {
      this.activeTab = tab;
      this.track('clicked tab: ' + tab);
    },
  },
};
</script>

<style scoped>
:deep() .text-white {
  color: #ffffff !important;
}
</style>
