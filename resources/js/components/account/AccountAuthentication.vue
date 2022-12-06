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
        class="grid grid-cols-1 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="provider in user.providers"
          :key="provider.id"
          class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"
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
import { parseDisplayDate, capitalizeFirstLetter } from '@services/common';

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
    ...mapState('auth', {
      user: (state) => state.user,
    }),
    ...mapGetters({
      // authenticated: 'auth/authenticated',
      // user: 'auth/user',
      // roles: 'auth/roles',
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
      revokeProvider: 'auth/revokeProvider',
    }),
    track,
    parseDisplayDate,
    capitalizeFirstLetter,
    providerIcon(provider) {
      if (provider.toLowerCase() == 'apple') {
        return 'fa-brands fa-apple text-gray-800 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'google') {
        return 'fa-brands fa-google text-red-500 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'microsoft') {
        return 'fa-brands fa-microsoft text-blue-300 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'tiktok') {
        return 'fa-brands fa-tiktok text-pink-600 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'youtube') {
        return 'fa-brands fa-youtube text-red-600 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'instagram') {
        return 'fa-brands fa-instagram text-gray-800 dark:text-gray-200';
      }
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
    triggerRevoke(provider) {
      const self = this;
      const title = '<strong>Revoke ';
      `${self.capitalizeFirstLetter(provider.provider)}?</strong>`;
      const html =
        'Are you sure you want to <strong>Revoke</strong><br>' +
        `${self.capitalizeFirstLetter(
          provider.provider,
        )} Authentication?<br><br><small><span class="far fa-clock fa-fw fa-xs mr-1"></span>First Used: ${self.parseDisplayDate(
          provider.created_at,
        )}</small><br><small><span class="far fa-clock fa-fw fa-xs mr-1"></span>Last Used: ${self.parseDisplayDate(
          provider.updated_at,
        )}</small>`;
      const icon = 'warning';
      const confirmButtonColor = '#FF0000';
      const denyButtonColor = '#777777';
      const confirmButtonText = 'Confirm Revoke';
      const denyButtonText = 'Cancel';
      self.$swal
        .fire({
          title,
          icon,
          html,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor,
          denyButtonColor,
          confirmButtonText,
          denyButtonText,
        })
        .then((result) => {
          if (result.isConfirmed) {
            self
              .revokeProvider(provider)
              .then((response) => {
                self.popToast({
                  message: 'Provider successfully revoked',
                  timer: 5000,
                  icon: 'success',
                });
              })
              .catch((err) => {
                self.popToast({
                  message: 'Error revoking provider',
                  timer: 10000,
                  icon: 'error',
                });
              });
          } else if (result.isDenied) {
            //
          }
        });
    },
  },
};
</script>

<style scoped>
:deep() .text-white {
  color: #ffffff !important;
}
</style>
<style lang="scss" scoped></style>
