<template>
  <div class="mr-0 mb-6 w-full rounded-md border dark:border-gray-500 dark:bg-slate-800 md:mb-0 md:mr-6 md:w-4/12">
    <div class="flex flex-col rounded-md bg-white dark:bg-slate-800">
      <!--
      <router-link :to="{ name: 'account' }"
        class="flex items-center border-b p-4 hover:bg-slate-800 hover:text-white dark:border-gray-600 dark:hover:bg-slate-900"
        active-class="text-white bg-slate-600" @click="track('clicked tab: Account')">
        <CogIcon class="mr-3 h-5 w-5" />
        Account
      </router-link>
      -->

      <SettingsNavLink routeName="settings.index" :text="$t('settings')" itemClass="rounded-t">
        <template #icon>
          <Cog6ToothIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>

      <SettingsNavLink routeName="profile.index" :text="$t('profile')" itemClass="rounded-b">
        <template #icon>
          <UserIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>

      <!--
      <router-link :to="{ name: 'password' }"
        class="flex items-center rounded-b-md p-4 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-900"
        active-class="text-white bg-slate-600" @click="track('clicked tab: Password')">
        <KeyIcon class="mr-3 h-5 w-5" />
        Password
      </router-link>
      -->
    </div>

  </div>
</template>

<script>
import { track } from '@services/analytics';
import SettingsNavLink from '@pages/settings/SettingsNavLink.vue';
import {
  Cog6ToothIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'SettingsNav',
  components: {
    SettingsNavLink,
    Cog6ToothIcon,
    UserIcon,
  },
  methods: {
    track,
    navClicked() {
      this.track('Clicked ' + this.routeName + ' Admin NavBar Link');
      this.$emit('navClicked');
    },
  },
};
</script>
