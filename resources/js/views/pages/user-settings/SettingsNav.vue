<template>
  <div class="mr-0 mb-6 w-full rounded-md border dark:border-gray-500 dark:bg-slate-800 md:mb-0 md:mr-6 md:w-4/12">
    <div class="flex flex-col rounded-md bg-white dark:bg-slate-800">
      <SettingsNavLink route-name="settings.index" :text="$t('settings')" item-class="rounded-t">
        <template #icon>
          <CogIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>

      <SettingsNavLink route-name="settings.account" :text="$t('account')" item-class="rounded-t">
        <template #icon>
          <Cog6ToothIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>

      <SettingsNavLink route-name="settings.profile" :text="$t('profile')" item-class="rounded-b">
        <template #icon>
          <UserIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>

      <SettingsNavLink route-name="settings.password" :text="$t('security')" item-class="rounded-b">
        <template #icon>
          <KeyIcon class="h-5 w-5" />
        </template>
      </SettingsNavLink>
    </div>
  </div>
</template>

<script>
import { track } from '@services/analytics';
import SettingsNavLink from '@pages/user-settings/SettingsNavLink.vue';
import { CogIcon, Cog6ToothIcon, KeyIcon, UserIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'SettingsNav',
  components: {
    SettingsNavLink,
    CogIcon,
    Cog6ToothIcon,
    KeyIcon,
    UserIcon,
  },
  emits: ['navClicked'],
  methods: {
    track,
    navClicked() {
      this.track('Clicked ' + this.routeName + ' Admin NavBar Link');
      this.$emit('navClicked');
    },
  },
};
</script>
