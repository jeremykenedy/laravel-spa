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
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul
          class="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          <li class="mr-2 cursor-pointer" @click="changeTab('authentication')">
            <span
              class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              :class="
                activeTab == 'authentication'
                  ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : ''
              "
            >
              <svg
                aria-hidden="true"
                class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                :class="
                  activeTab == 'authentication'
                    ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                    : ''
                "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Authentication
            </span>
          </li>
          <li class="mr-2 cursor-pointer" @click="changeTab('analytics')">
            <span
              class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              :class="
                activeTab == 'analytics'
                  ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : ''
              "
            >
              <svg
                aria-hidden="true"
                class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                :class="
                  activeTab == 'analytics'
                    ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                    : ''
                "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              Analytics
            </span>
          </li>
          <!--
          <li class="mr-2 cursor-pointer" @click="changeTab('general')">
            <span
              class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              :class="activeTab == 'general' ? 'active text-blue-600 dark:border-blue-500 dark:text-blue-500 border-blue-600' : ''"
            >
              <svg
                aria-hidden="true"
                class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                :class="activeTab == 'general' ? 'active text-blue-600 dark:border-blue-500 dark:text-blue-500 border-blue-600' : ''"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                ></path></svg
              >General
            </span>
          </li>
          -->
        </ul>
      </div>
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div v-if="activeTab == 'authentication'">
          <h3 class="text-2xl font-semibold">Authentication Settings</h3>
          <hr class="mt-3 w-10 pb-4" />
          <div>
            <div
              v-for="setting in authSettings"
              :key="'auth_setting_' + setting.id"
              class="mb-3"
            >
              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableFbLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <i
                      class="fa-brands fa-square-facebook fa-fw text-blue-600 dark:text-blue-600"
                    />
                    Facebook
                  </h4>
                </div>

                <div
                  v-if="setting.key == 'enableFbLogin'"
                  class="ml-8 mr-5 mb-3"
                >
                  <div class="relative mb-1 flex items-center">
                    <div
                      class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                      @click="
                        updateSetting(setting.val == '1' ? 0 : 1, setting)
                      "
                    >
                      <span
                        class="mr-3"
                        :class="
                          loading
                            ? 'default disabled cursor-pointer'
                            : 'cursor-pointer'
                        "
                      >
                        <AppSwitch
                          :enabled="
                            setting.val && setting.val == 1 ? true : false
                          "
                          :enable-tooltip="true"
                          tooltip-on="Enable"
                          tooltip-off="Disable"
                        />
                        <span
                          v-if="loading"
                          class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                          style="left: -1.4em; top: 1.2em"
                        />
                      </span>
                      <span>
                        {{ setting.name }}
                        {{ setting.val == '1' ? 'Enabled' : 'Disabled' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="setting.key == 'appFbId'" class="ml-8 mr-5">
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div v-if="setting.key == 'appFbSecret'" class="ml-8 mr-5 mb-3">
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div v-if="setting.key == 'appFbRedirect'" class="ml-8 mr-5">
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div
                  v-if="setting.key == 'appFbRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group">
                <div v-if="setting.key == 'enableTwitterLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <i
                      class="fa-brands fa-twitter fa-fw text-blue-300 dark:text-blue-300"
                    />
                    Twitter
                  </h4>
                </div>

                <div
                  v-if="setting.key == 'enableTwitterLogin'"
                  class="ml-8 mr-5 mb-3"
                >
                  <div class="relative mb-1 flex items-center">
                    <div
                      class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                      @click="
                        updateSetting(setting.val == '1' ? 0 : 1, setting)
                      "
                    >
                      <span
                        class="mr-3"
                        :class="
                          loading
                            ? 'default disabled cursor-pointer'
                            : 'cursor-pointer'
                        "
                      >
                        <AppSwitch
                          :enabled="
                            setting.val && setting.val == 1 ? true : false
                          "
                          :enable-tooltip="true"
                          tooltip-on="Enable"
                          tooltip-off="Disable"
                        />
                        <span
                          v-if="loading"
                          class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                          style="left: -1.4em; top: 1.2em"
                        />
                      </span>
                      <span>
                        {{ setting.name }}
                        {{ setting.val == '1' ? 'Enabled' : 'Disabled' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="setting.key == 'appTwitterId'" class="ml-8 mr-5">
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div
                  v-if="setting.key == 'appTwitterSecret'"
                  class="ml-8 mr-5 mb-3"
                >
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div
                  v-if="setting.key == 'appTwitterRedirect'"
                  class="ml-8 mr-5"
                >
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>
                <div
                  v-if="setting.key == 'appTwitterRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group">
                <div v-if="setting.key == 'enableGoogleLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <i
                      class="fa-brands fa-google fa-fw text-green-600 dark:text-green-500"
                    />
                    Google
                  </h4>
                </div>

                <div
                  v-if="setting.key == 'enableGoogleLogin'"
                  class="ml-8 mr-5 mb-3"
                >
                  <div class="relative mb-1 flex items-center">
                    <div
                      class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                      @click="
                        updateSetting(setting.val == '1' ? 0 : 1, setting)
                      "
                    >
                      <span
                        class="mr-3"
                        :class="
                          loading
                            ? 'default disabled cursor-pointer'
                            : 'cursor-pointer'
                        "
                      >
                        <AppSwitch
                          :enabled="
                            setting.val && setting.val == 1 ? true : false
                          "
                          :enable-tooltip="true"
                          tooltip-on="Enable"
                          tooltip-off="Disable"
                        />
                        <span
                          v-if="loading"
                          class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                          style="left: -1.4em; top: 1.2em"
                        />
                      </span>
                      <span>
                        {{ setting.name }}
                        {{ setting.val == '1' ? 'Enabled' : 'Disabled' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="setting.key == 'appGoogleId'" class="ml-8 mr-5">
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div
                  v-if="setting.key == 'appGoogleSecret'"
                  class="ml-8 mr-5 mb-3"
                >
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>

                <div
                  v-if="setting.key == 'appGoogleRedirect'"
                  class="ml-8 mr-5"
                >
                  <label
                    class="m:w-3/12 mb-1 inline-flex w-10/12"
                    :for="setting.key"
                    >{{ setting.name }}:
                  </label>
                  <input
                    :id="setting.key"
                    type="text"
                    :name="setting.key"
                    :placeholder="setting.name"
                    :disabled="!dataReady || loading"
                    class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                    :value="setting.val"
                    @blur="updateSetting($event.target.value, setting)"
                    @keyup.enter="$event.target.blur()"
                  />
                </div>
                <div
                  v-if="setting.key == 'appGoogleRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab == 'analytics'">
          <h3 class="text-2xl font-semibold">Analytics Settings</h3>
          <hr class="mt-3 w-10 pb-4" />
          <div
            v-for="setting in analyticsSettings"
            :key="'analytic_settings_' + setting.id"
            class="mb-3"
          >
            <div class="setting-group mb-3">
              <div v-if="setting.key == 'enableGoogleAnalytics'">
                <h4 class="w-100 mb-3 text-xl font-semibold">
                  <i
                    class="fa-brands fa-google fa-fw text-green-500 dark:text-green-500"
                  />
                  Google Analytics
                </h4>
              </div>

              <div
                v-if="setting.key == 'enableGoogleAnalytics'"
                class="ml-8 mr-5 mb-3"
              >
                <div class="relative mb-1 flex items-center">
                  <div
                    class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                    @click="updateSetting(setting.val == '1' ? 0 : 1, setting)"
                  >
                    <span
                      class="mr-3"
                      :class="
                        loading
                          ? 'default disabled cursor-pointer'
                          : 'cursor-pointer'
                      "
                    >
                      <AppSwitch
                        :enabled="
                          setting.val && setting.val == 1 ? true : false
                        "
                        :enable-tooltip="true"
                        tooltip-on="Enable"
                        tooltip-off="Disable"
                      />
                      <span
                        v-if="loading"
                        class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                        style="left: -1.4em; top: 1.2em"
                      />
                    </span>
                    <span>
                      {{ setting.name }}
                      {{ setting.val == '1' ? 'Enabled' : 'Disabled' }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                v-if="setting.key == 'appGoogleAnalyticsKey'"
                class="ml-8 mr-5"
              >
                <label
                  class="m:w-3/12 mb-1 inline-flex w-10/12"
                  :for="setting.key"
                  >{{ setting.name }}:
                </label>
                <input
                  :id="setting.key"
                  type="text"
                  :name="setting.key"
                  :placeholder="setting.name"
                  :disabled="!dataReady || loading"
                  class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                  :value="setting.val"
                  @blur="updateSetting($event.target.value, setting)"
                  @keyup.enter="$event.target.blur()"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab == 'general'">
          <h3 class="text-2xl font-semibold">General Settings</h3>
          <hr class="mt-3 w-10 pb-4" />
        </div>
      </div>
    </div>
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
      analyticsSettings: null,
      generalSettings: null,
      loading: false,
      activeTab: 'authentication',
      appGaEnabled: GA_ENABLED, // eslint-disable-line
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
          this.analyticsSettings = data.analyticsSettings;
          this.generalSettings = data.generalSettings;
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
    async updateSetting(newValue, setting) {
      let index = null;
      if (setting && setting.group && setting.group == 'auth') {
        index = this.authSettings.indexOf(setting);
      }
      if (setting && setting.group && setting.group == 'analytics') {
        index = this.analyticsSettings.indexOf(setting);
      }
      if (setting && setting.group && setting.group == 'general') {
        index = this.generalSettings.indexOf(setting);
      }
      const a = setting;
      if (newValue != a.val) {
        setting.val = newValue;
        await axios
          .patch(`/api/app-settings/` + setting.id, setting)
          .then(({ data }) => {
            if (index !== -1) {
              if (setting && setting.group && setting.group == 'auth') {
                this.authSettings[index] = data.data;
              }
              if (setting && setting.group && setting.group == 'analytics') {
                this.analyticsSettings[index] = data.data;
              }
              if (setting && setting.group && setting.group == 'general') {
                this.generalSettings[index] = data.data;
              }
            }
            this.loading = false;
            this.popToast({
              message: `App Setting Updated`,
              timer: 5000,
              icon: 'success',
            });
            this.track(
              'App setting "' +
                setting.name +
                '" was updated from "' +
                a.val +
                '" to "' +
                setting.val +
                '"',
              'app event',
              'app setting updated',
            );
          })
          .catch(({ response }) => {
            this.popToast({
              message: `Error Updating Setting`,
              timer: 5000,
              icon: 'error',
            });
            this.loading = false;
          });
      }
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.track('clicked tab: ' + tab);
    },
    track(action, category = 'click event', label = 'clicked', value = 1) {
      if (this.appGaEnabled) {
        this.$gtag.event(action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
