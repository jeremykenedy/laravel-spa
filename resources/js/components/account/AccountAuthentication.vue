<template>
  <div>
    <div
      v-if="user && user.providers && user.providers.length == 0"
      class="p-10 text-center text-gray-600"
    >
      <div>
        <PowerIcon class="ml-auto mr-auto mb-4 h-12 w-12" />
      </div>
      <h2 class="text-lg">No authorization applications are connected.</h2>
    </div>
    <div v-if="user && user.providers && user.providers.length > 0">
      <div
        class="grid grid-cols-1 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="provider in user.providers"
          :key="provider.id"
          class="mb-5 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"
        >
          <div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2">
            <span class="fa-4x mb-2" :class="providerIcon(provider.provider)" />
            <h5
              class="mb-2 text-lg font-extrabold capitalize text-gray-900 dark:text-white"
            >
              {{ provider.provider }}
            </h5>
            <div
              v-if="provider.created_at"
              class="mb-1 mb-3 text-gray-500 dark:text-gray-400"
              style="line-height: 1.2; font-size: 0.7em"
            >
              <span
                class="font-bold uppercase text-gray-700 dark:text-gray-200"
              >
                <span class="far fa-clock" /> First Used:
              </span>
              <br />
              {{ parseDisplayDate(provider.created_at) }}
            </div>
            <div
              v-if="provider.updated_at"
              class="mb-1 text-gray-500 dark:text-gray-400"
              style="line-height: 1.2; font-size: 0.7em"
            >
              <span
                class="font-bold uppercase text-gray-700 dark:text-gray-200"
              >
                <span class="far fa-clock" /> Last Used:
              </span>
              <br />
              {{ parseDisplayDate(provider.updated_at) }}
            </div>
            <div class="mt-4 flex space-x-3 md:mt-3">
              <AppButton
                danger
                text="Revoke"
                @click="triggerRevoke(provider)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear-both" />
  </div>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import { track } from '@services/analytics';
import { PowerIcon } from '@heroicons/vue/24/outline';
import { parseDisplayDate } from '@services/common';

export default {
  name: 'AccountAuthentication',
  components: {
    PowerIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      blank: 'AccountAuthentication',
    };
  },
  computed: {
    // ...mapState('sidebar', {
    //   sideBarOpen: (state) => state.sideBarOpen,
    //   fullScreenSideBarOpen: (state) => state.fullScreenSideBarOpen,
    // }),
    // ...mapState('auth', {
    //   user: (state) => state.user,
    //   roles: (state) => state.roles,
    //   token: (state) => state.token,
    //   logins: (state) => state.logins,
    // }),
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  // created() {},
  // mounted() {},
  // beforeUnmount() {},
  // updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    track,
    parseDisplayDate,
    providerIcon(provider) {
      if (provider.toLowerCase() == 'facebook') {
        return 'fa-brands fa-facebook text-blue-600 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'github') {
        return 'fa-brands fa-github text-gray-700 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'twitch') {
        return 'fa-brands fa-twitch text-blue-300 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'linkedin') {
        return 'fa-brands fa-linkedin text-blue-900 dark:text-gray-200';
      }
      return 'fa-solid fa-plug-circle-check text-gray-600 dark:text-gray-200';
    },
    triggerRevoke(provider) {},
  },
};
</script>

<style scoped>
:deep() .text-white {
  color: #ffffff !important;
}
</style>
<style lang="scss" scoped></style>
