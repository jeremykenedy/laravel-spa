<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'admin' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Admin
          </router-link>
        </li>

        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'app-settings' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              App Settings
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <div v-if="!dataReady">
      <div class="text-gray-700 dark:text-gray-100">
        <div class="pt-10 pb-10 text-center">
          <span class="fa fa-circle-notch fa-spin fa-5x" />
        </div>
      </div>
    </div>

    <div v-if="dataReady">
      <h3 class="text-2xl font-semibold">Authentication Settings</h3>
      <hr class="mt-3 w-10 pb-4" />
      <div>
        <div
          v-for="authSetting in authSettings"
          :key="'auth_setting_' + authSetting.id"
        >
          <div v-if="authSetting.name == 'appFbKey'">
            <h4 class="w-100 mb-2 text-xl font-semibold">
              <i class="fa-brands fa-square-facebook fa-fw" /> Facebook
            </h4>
          </div>
          <div v-if="authSetting.name == 'appFbKey'" class="ml-8">
            API Key: {{ authSetting.val }}
          </div>
          <div v-if="authSetting.name == 'enableFbLogin'" class="ml-8">
            <div class="relative flex items-center">
              <div class="my-1 mr-3 w-full sm:flex sm:items-center">
                <span class="d-inline-block float-left mr-3">
                  API {{ authSetting.val ? 'Enabled' : 'Disab;ed' }}
                </span>
                <span
                  :class="
                    loading
                      ? 'default disabled cursor-pointer'
                      : 'cursor-pointer'
                  "
                >
                  <span
                    class="fa-solid fa-fw fa-2x float-left mr-4 text-slate-600"
                    :class="authSetting.val ? 'fa-toggle-on' : 'fa-toggle-off'"
                  />
                  <span
                    v-if="loading"
                    class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                    style="left: -1.4em; top: 1.2em"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div>{{ authSettings }}</div> -->
      </div>
    </div>

    <!-- {{ someThing() }} -->

    <!-- <div class="relative flex items-center">
  <div class="my-1 mr-3 w-full py-2 sm:flex sm:items-center">
    <span
      :class="
        loading ? 'default disabled cursor-pointer' : 'cursor-pointer'
      "
      @click="toggleTheme()"
    >
      <span
        class="fa-solid fa-fw fa-2x float-left mr-4 text-slate-600"
        :class="form.theme_dark ? 'fa-toggle-on' : 'fa-toggle-off'"
      />
      <span
        v-if="loading"
        class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
        style="left: -1.4em; top: 1.2em"
      />
    </span>
  </div>
</div> -->
  </div>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'AppSettings',
  components: {
    ChevronRightIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      dataReady: false,
      authSettings: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getAppSettings();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getAppSettings() {
      this.dataReady = false;
      await axios
        .get(`/api/app-settings`)
        .then(({ data }) => {
          this.authSettings = data.authSettings;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Getting App Settings`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },

    someThing() {
      // const a = this.authSettings.find((x) => x.name === 'appFbKey');

      // console.log(a);
      console.log('here@2');

      // authSettings;
      // const keyFound = this.authSettings.find((s) => s.name == 'appFbKey');
      // console.log(keyFound);
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
