<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.index" :text="$t('settings')" />
    </AdminBreadcrumbContainer>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">
          <div class="flex flex-wrap">
            <router-link
              v-if="authenticated && user"
              :to="{ name: 'settings.account' }"
              class="w-full sm:w-12/12 md:w-12/12 lg:w-12/12 xl:w-4/12"
            >
              <figure
                class="m-2 flex flex-col justify-left p-6 text-left rounded-lg shadow dark:shadow-none bg-gray-100 text-gray-600 dark:border-slate-900 dark:bg-slate-900 hover:shadow-sm hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                <figcaption class="flex justify-left items-center text-gray-700 dark:text-gray-300">
                  <i class="fa fa-cog fa-fw fa-2x" />
                  <div class="space-y-0.5 font-medium text-gray-700 dark:text-white text-left ms-3">
                    <div>Account</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Logins and your data.</div>
                  </div>
                </figcaption>
              </figure>
            </router-link>

            <router-link
              v-if="authenticated && user"
              :to="{ name: 'settings.profile' }"
              class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-4/12"
            >
              <figure
                class="m-2 flex flex-col justify-left p-6 text-left rounded-lg shadow dark:shadow-none bg-gray-100 text-gray-600 dark:border-slate-900 dark:bg-slate-900 hover:shadow-sm hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                <figcaption class="flex justify-left items-center text-gray-700 dark:text-gray-300">
                  <i class="fa fa-user fa-fw fa-2x" />
                  <div class="space-y-0.5 font-medium text-gray-700 dark:text-white text-left ms-3">
                    <div>Profile</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Username and email.</div>
                  </div>
                </figcaption>
              </figure>
            </router-link>

            <router-link
              v-if="authenticated && user"
              :to="{ name: 'settings.password' }"
              class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-4/12"
            >
              <figure
                class="m-2 flex flex-col justify-left p-6 text-left rounded-lg shadow dark:shadow-none bg-gray-100 text-gray-600 dark:border-slate-900 dark:bg-slate-900 hover:shadow-sm hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                <figcaption class="flex justify-left items-center text-gray-700 dark:text-gray-300">
                  <i class="fa fa-key fa-fw fa-2x" />
                  <div class="space-y-0.5 font-medium text-gray-700 dark:text-white text-left ms-3">
                    <div>Security</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Password and security.</div>
                  </div>
                </figcaption>
              </figure>
            </router-link>
          </div>
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

export default {
  name: 'SettingsPage',
  components: {
    SettingsNav,
  },
  props: {},
  emits: ['buttonClicked'],
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState(useAuth, ['processing']),
    ...mapState(useAuthStore, ['user', 'authenticated']),
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions(useAuth, ['logout']),
    clickButton() {
      this.$emit('buttonClicked');
    },
    track,
  },
};
</script>
