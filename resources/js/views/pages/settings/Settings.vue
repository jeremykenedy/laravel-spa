<template>
  <div
    class="mx-auto max-w-screen-lg text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between"
  >
    <div
      class="mr-0 mb-6 w-full rounded-md border dark:border-gray-500 dark:bg-slate-800 md:mb-0 md:mr-6 md:w-4/12"
    >
      <div class="border-b p-4 font-semibold dark:border-gray-500">
        Settings
      </div>

      <div class="flex flex-col rounded-md bg-white dark:bg-slate-800">
        <router-link
          :to="{ name: 'account' }"
          class="flex items-center border-b p-4 hover:bg-slate-800 hover:text-white dark:border-gray-600 dark:hover:bg-slate-900"
          active-class="text-white bg-slate-600"
          @click="track('clicked tab: Account')"
        >
          <CogIcon class="mr-3 h-5 w-5" />
          Account
        </router-link>
        <router-link
          :to="{ name: 'profile' }"
          class="flex items-center border-b p-4 hover:bg-slate-800 hover:text-white dark:border-gray-600 dark:hover:bg-slate-900"
          active-class="text-white bg-slate-600"
          @click="track('clicked tab: Profile')"
        >
          <UserIcon class="mr-3 h-5 w-5" />
          Profile
        </router-link>
        <router-link
          :to="{ name: 'password' }"
          class="flex items-center rounded-b-md p-4 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-900"
          active-class="text-white bg-slate-600"
          @click="track('clicked tab: Password')"
        >
          <KeyIcon class="mr-3 h-5 w-5" />
          Password
        </router-link>
      </div>
    </div>
    <div class="none w-full rounded-md border dark:border-gray-500">
      <router-view />
    </div>
  </div>
</template>

<script>
import { UserIcon, KeyIcon, CogIcon } from '@heroicons/vue/24/outline';
import { track } from '@services/analytics';

export default {
  components: {
    CogIcon,
    UserIcon,
    KeyIcon,
  },
  methods: {
    track,
  },
};
</script>
