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
            <h5 class="mb-0 text-lg font-extrabold capitalize text-gray-900 dark:text-white">
              {{ provider.provider }}
            </h5>
            <div
              v-if="provider.created_at"
              class="mb-3 text-gray-600 dark:text-gray-400"
              style="line-height: 1.2; font-size: 0.6em"
            >
              <span class="font-bold uppercase text-gray-700 dark:text-gray-200">
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
              <span class="font-bold uppercase text-gray-700 dark:text-gray-200">
                <span class="far fa-clock" /> Last Used:
              </span>
              <br />
              {{ parseDisplayDate(provider.updated_at) }}
            </div>

            <div class="mt-4 flex space-x-3 md:mt-3">
              <AppButton
                v-tippy="'Disconnect ' + capitalizeFirstLetter(provider.provider) + ' from your account.'"
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
            <h5 class="mb-2 text-lg font-extrabold capitalize text-gray-900 dark:text-white">
              {{ provider }}
            </h5>
            <div class="mt-4 mb-5 flex space-x-3 md:mt-5">
              <AppButton
                v-tippy="'Connect ' + capitalizeFirstLetter(provider) + ' to your account.'"
                :disabled="loading"
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
    <div class="clear-both clearfix" />
  </div>
</template>

<script>
import { watch, ref, watchEffect } from 'vue';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useAuth from '@composables/auth';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { track } from '@services/analytics';
import { parseDisplayDate, capitalizeFirstLetter, providerIcon } from '@services/common';
import { PowerIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'AccountAuthentication',
  components: {
    PowerIcon,
  },
  props: {},
  emits: ['buttonClicked'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(useAuth, ['processing']),
    ...mapState(useAuthStore, ['user', 'authenticated', 'socials']),
    socialLoginsEnabled() {
      if (Object.values(this.socials).find((v) => v == '1')) {
        return true;
      }
      return false;
    },
    allowedProviders() {
      const providers = [];
      for (const key in this.socials) {
        if (this.socials[key] != false && this.socials[key] != '0') {
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
  watch: {},
  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage);
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan', 'fetchOauthUrl', 'getUser', 'getUserByToken', 'revokeProvider']),
    ...mapActions(useToastStore, ['popToast', 'success', 'error']),
    clickButton() {
      this.$emit('buttonClicked');
    },
    track,
    parseDisplayDate,
    capitalizeFirstLetter,
    providerIcon,
    providerConnected(provider, user) {
      const found = user.providers.find((p) => p.provider == provider);
      if (found) {
        return found;
      }
      return false;
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
                self.success('Provider successfully revoked');
              })
              .catch((err) => {
                self.error('Error revoking provider');
              });
          } else if (result.isDenied) {
            //
          }
        });
    },
    async triggerConnect(provider) {
      this.track(`Social Login Provider Clicked: ${provider}`, 'clicked', 'user-account');
      this.loading = true;
      try {
        await axios.get('/sanctum/csrf-cookie').then((response) => {});
        const url = await this.fetchOauthUrl({ provider }).then((response) => {
          this.loading = false;
          return response;
        });
        this.track(
          `Social Provider succesfully Authorized to Authorize: ${provider}, User Id: ${this.user.id}`,
          'error',
          'auth-error',
        );
        this.window = this.openWindow(url, this.authWindowTitle);
      } catch (e) {
        this.track(`Social Provider Failed to Authorize: ${provider}`, 'error', 'auth-error');
        self.error('Failed authorize provider.');
        this.window.close();
        this.loading = false;
      }
    },
    async onMessage(e) {
      const self = this;
      if (e.origin !== window.origin || !e.data.token) {
        return;
      }
      if (e.data.token && e.data.token == 'cannot_add') {
        self.error('Unable to authorize provider.');
      } else {
        self.success('Successfully authorized provider.');
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
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;
      const width = window.innerWidth || document.documentElement.clientWidth;
      window.screen.width;
      const height = window.innerHeight || document.documentElement.clientHeight;
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
