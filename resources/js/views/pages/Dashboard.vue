<template>
  <div class="mx-auto max-w-screen-lg text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border dark:border-gray-600">
          <div
            class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200"
          >
            Dashboard
          </div>
          <div
            class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300"
          >
            <h1 class="mt-4 mb-4 text-center text-2xl">
              {{ greeting() }},
              {{ user && user.name ? user.name : 'Registered User' }}!
            </h1>
            <div v-if="roles" class="mb-6 text-center">
              <hr class="mx-auto mb-3 w-10" />
              <h2 class="mb-5">Your Roles</h2>
              <RolesBadges :roles="roles" />
            </div>

            <div v-if="socialLoginsEnabled">
              <router-link
                v-tippy="'Go to application service providers'"
                :to="{ name: 'account' }"
              >
                <div
                  v-if="user.providers.length == 0"
                  class="rounded-lg bg-slate-100 p-10 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-slate-200 hover:text-gray-800 dark:bg-slate-900 hover:dark:bg-slate-700 hover:dark:text-white"
                >
                  <div>
                    <PowerIcon class="ml-auto mr-auto mb-4 h-12 w-12" />
                  </div>
                  <h2 class="text-lg">
                    No applications are integrated into your account.
                  </h2>
                </div>
                <div v-if="user.providers.length > 0">
                  <hr class="mx-auto mb-3 w-10" />
                  <h3 class="mb-5 text-center">
                    {{ user.providers.length }} Application
                    {{ user.providers.length != 1 ? 's' : '' }} integrated into
                    your account
                  </h3>
                  <div
                    class="grid grid-cols-2 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  >
                    <div
                      v-for="(provider, index) in enabledProviders"
                      :key="provider + '_' + index"
                      class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-900 hover:dark:bg-slate-700"
                    >
                      <div
                        class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2"
                      >
                        <span
                          class="fa-4x mb-2"
                          :class="providerIcon(provider.provider)"
                        />
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
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="mt-3 mb-5 p-5 text-center">
          <GHButtons
            show-follow
            show-star
            show-fork
            show-issue
            show-watch
            show-download
            show-count
            show-tips
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import RolesBadges from '@components/roles/RolesBadges.vue';
import { greeting, providerIcon, parseDisplayDate } from '@services/common';
import { PowerIcon } from '@heroicons/vue/24/outline';
import GHButtons from '@components/GHButtons.vue';

export default {
  name: 'Dashboard',
  components: {
    RolesBadges,
    PowerIcon,
    GHButtons,
  },
  data() {
    return {};
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
  methods: {
    greeting,
    providerIcon,
    parseDisplayDate,
  },
};
</script>
