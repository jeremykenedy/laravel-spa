<template>
  <div>
    <div v-if="!socialLoginsEnabled" class="p-10 text-center text-gray-600">
      <div>
        <PowerIcon class="ml-auto mr-auto mb-4 h-12 w-12" />
      </div>
      <h2 class="text-lg">No applications are available for integration.</h2>
    </div>
    <div v-if="socialLoginsEnabled">
      <div
        class="grid grid-cols-1 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(provider, index) in enabledProviders"
          :key="provider + '_' + index"
          class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"
        >
          <div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2">
            <span class="fa-4x mb-2" :class="providerIcon(provider.provider)" />
            <h5
              class="mb-0 text-lg font-extrabold capitalize text-gray-900 dark:text-white"
            >
              {{ provider.provider }}
            </h5>
            <div
              v-if="provider.created_at"
              class="mb-1 mb-3 text-gray-600 dark:text-gray-400"
              style="line-height: 1.2; font-size: 0.6em"
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
              class="mb-0 text-gray-600 dark:text-gray-400"
              style="line-height: 1.2; font-size: 0.6em"
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
                v-tippy="
                  'Disconnect ' +
                  capitalizeFirstLetter(provider.provider) +
                  ' from your account.'
                "
                danger
                text="Revoke"
                icon="fa-solid fa-xmark fa-fw"
                @click="triggerRevoke(provider)"
              />
            </div>
          </div>
        </div>

        <div
          v-for="(provider, index) in disabledProviders"
          :key="provider + '_' + index"
          class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"
        >
          <div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2">
            <span class="fa-4x mb-2" :class="providerIcon(provider)" />
            <h5
              class="mb-2 text-lg font-extrabold capitalize text-gray-900 dark:text-white"
            >
              {{ provider }}
            </h5>
            <div class="mt-4 mb-5 flex space-x-3 md:mt-5">
              <AppButton
                v-tippy="
                  'Connect ' +
                  capitalizeFirstLetter(provider) +
                  ' to your account.'
                "
                accent
                text="Connect"
                icon="fa-solid fa-plug-circle-plus fw-fw"
                @click="triggerConnect(provider)"
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
import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
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
  data() {
    return {
      loading: false,
      window: {},
      authWindowTitle: 'Authentication Provider Authorization',
    };
  },
  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
      logins: 'auth/logins',
    }),
    socialLoginsEnabled() {
      if (Object.values(this.logins).find((v) => v == '1')) {
        return true;
      }
      return false;
    },
    allowedProviders() {
      const providers = [];
      for (const key in this.logins) {
        if (this.logins[key] != false && this.logins[key] != '0') {
          providers.push(key);
        }
      }
      return providers.sort();
    },
    enabledProviders() {
      const providers = [];
      this.user.providers.forEach((provider, index) => {
        const found = this.allowedProviders.find((p) => p == provider.provider);
        if (found) {
          providers.push(provider);
        }
      });
      return providers;
    },
    disabledProviders() {
      let providers = this.allowedProviders;
      this.user.providers.forEach((provider, index) => {
        providers = providers.filter((p) => p != provider.provider);
      });
      return providers;
    },
  },
  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage);
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
      revokeProvider: 'auth/revokeProvider',
      fetchOauthUrl: 'auth/fetchOauthUrl',
      getUser: 'auth/getUser',
    }),
    track,
    parseDisplayDate,
    capitalizeFirstLetter,
    providerConnected(provider, user) {
      const found = user.providers.find((p) => p.provider == provider);
      if (found) {
        return found;
      }
      return false;
    },
    providerIcon(provider) {
      if (provider.toLowerCase() == 'apple') {
        return 'fa-brands fa-apple text-gray-800 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'twitter') {
        return 'fa-brands fa-twitter text-blue-300 dark:text-blue-200';
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
      if (provider.toLowerCase() == 'zoho') {
        return 'fas fa-z text-yellow-500 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'stackexchange') {
        return 'fa-brands fa-stack-exchange text-blue-400 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'gitlab') {
        return 'fa-brands fa-square-gitlab text-orange-400 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'reddit') {
        return 'fa-brands fa-square-reddit text-orange-700 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'snapchat') {
        return 'fa-brands fa-square-snapchat text-yellow-400 dark:text-gray-200';
      }
      if (provider.toLowerCase() == 'meetup') {
        return 'fa-brands fa-meetup text-red-400 dark:text-gray-200';
      }

      // NEW_PROVIDER_PLUG :: Put New Provider HERE

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
    async triggerConnect(provider) {
      this.track(
        `Social Login Provider Clicked: ${provider}`,
        'clicked',
        'user-account',
      );
      this.loading = true;
      try {
        await axios.get('/sanctum/csrf-cookie').then((response) => {});
        const url = await this.fetchOauthUrl({ provider }).then((response) => {
          this.loading = false;
          return response;
        });
        this.window = this.openWindow(url, this.authWindowTitle);
      } catch (e) {
        this.track(
          `Social Provider Failed to Authorize: ${provider}`,
          'error',
          'auth-error',
        );
        this.popToast({
          message: 'Failed authorize provider.',
          timer: 10000,
          icon: 'error',
        });
        this.window.close();
        this.loading = false;
      }
    },
    async onMessage(e) {
      const self = this;
      if (e.origin !== window.origin || !e.data.token) {
        // self.popToast({
        //   message: 'An Error Occurred',
        //   timer: 5000,
        //   icon: 'error',
        // });
        return;
      }
      if (e.data.token && e.data.token == 'cannot_add') {
        self.popToast({
          message: 'Unable to authorize provider',
          timer: 5000,
          icon: 'error',
        });
      } else {
        self.popToast({
          message: 'Successfully authorized provider',
          timer: 2500,
          icon: 'success',
        });
        self.getUser().then((response) => {
          //
        });
      }
    },
    openWindow(url, title, options = {}) {
      if (typeof url === 'object') {
        options = url;
        url = '';
      }
      options = {
        url,
        title,
        width: 600,
        height: 720,
        ...options,
      };
      const dualScreenLeft =
        window.screenLeft !== undefined
          ? window.screenLeft
          : window.screen.left;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screen.top;
      const width = window.innerWidth || document.documentElement.clientWidth;
      window.screen.width;
      const height =
        window.innerHeight || document.documentElement.clientHeight;
      window.screen.height;

      options.left = width / 2 - options.width / 2 + dualScreenLeft;
      options.top = height / 2 - options.height / 2 + dualScreenTop;

      const optionsStr = Object.keys(options)
        .reduce((acc, key) => {
          acc.push(`${key}=${options[key]}`);
          return acc;
        }, [])
        .join(',');
      const newWindow = window.open(url, title, optionsStr);
      if (window.focus) {
        newWindow.focus();
      }
      return newWindow;
    },
  },
};
</script>
