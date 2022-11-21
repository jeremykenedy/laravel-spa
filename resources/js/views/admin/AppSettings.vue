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
          class="mb-3"
        >
          <div class="setting-group mb-3">
            <div v-if="authSetting.key == 'enableFbLogin'">
              <h4 class="w-100 mb-3 text-xl font-semibold">
                <i
                  class="fa-brands fa-square-facebook fa-fw text-blue-600 dark:text-blue-600"
                />
                Facebook
              </h4>
            </div>

            <div
              v-if="authSetting.key == 'enableFbLogin'"
              class="ml-8 mr-5 mb-3"
            >
              <div class="relative mb-1 flex items-center">
                <div
                  class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                  @click="
                    updateSetting(authSetting.val == '1' ? 0 : 1, authSetting)
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
                        authSetting.val && authSetting.val == 1 ? true : false
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
                    {{ authSetting.name }}
                    {{ authSetting.val == '1' ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="authSetting.key == 'appFbId'" class="ml-8 mr-5">
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div v-if="authSetting.key == 'appFbSecret'" class="ml-8 mr-5 mb-3">
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div v-if="authSetting.key == 'appFbRedirect'" class="ml-8 mr-5">
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div
              v-if="authSetting.key == 'appFbRedirect'"
              class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
            />
          </div>

          <div class="setting-group">
            <div v-if="authSetting.key == 'enableTwitterLogin'">
              <h4 class="w-100 mb-3 text-xl font-semibold">
                <i
                  class="fa-brands fa-twitter fa-fw text-blue-300 dark:text-blue-300"
                />
                Twitter
              </h4>
            </div>

            <div
              v-if="authSetting.key == 'enableTwitterLogin'"
              class="ml-8 mr-5 mb-3"
            >
              <div class="relative mb-1 flex items-center">
                <div
                  class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                  @click="
                    updateSetting(authSetting.val == '1' ? 0 : 1, authSetting)
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
                        authSetting.val && authSetting.val == 1 ? true : false
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
                    {{ authSetting.name }}
                    {{ authSetting.val == '1' ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="authSetting.key == 'appTwitterId'" class="ml-8 mr-5">
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div
              v-if="authSetting.key == 'appTwitterSecret'"
              class="ml-8 mr-5 mb-3"
            >
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div
              v-if="authSetting.key == 'appTwitterRedirect'"
              class="ml-8 mr-5"
            >
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>
            <div
              v-if="authSetting.key == 'appTwitterRedirect'"
              class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
            />
          </div>

          <div class="setting-group">
            <div v-if="authSetting.key == 'enableGoogleLogin'">
              <h4 class="w-100 mb-3 text-xl font-semibold">
                <i
                  class="fa-brands fa-google fa-fw text-green-600 dark:text-green-500"
                />
                Google
              </h4>
            </div>

            <div
              v-if="authSetting.key == 'enableGoogleLogin'"
              class="ml-8 mr-5 mb-3"
            >
              <div class="relative mb-1 flex items-center">
                <div
                  class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"
                  @click="
                    updateSetting(authSetting.val == '1' ? 0 : 1, authSetting)
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
                        authSetting.val && authSetting.val == 1 ? true : false
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
                    {{ authSetting.name }}
                    {{ authSetting.val == '1' ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="authSetting.key == 'appGoogleId'" class="ml-8 mr-5">
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div
              v-if="authSetting.key == 'appGoogleSecret'"
              class="ml-8 mr-5 mb-3"
            >
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>

            <div
              v-if="authSetting.key == 'appGoogleRedirect'"
              class="ml-8 mr-5"
            >
              <label
                class="m:w-3/12 mb-1 inline-flex w-10/12"
                :for="authSetting.key"
                >{{ authSetting.name }}:
              </label>
              <input
                :id="authSetting.key"
                type="text"
                :name="authSetting.key"
                :placeholder="authSetting.name"
                :disabled="!dataReady || loading"
                class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"
                :value="authSetting.val"
                @blur="updateSetting($event.target.value, authSetting)"
                @keyup.enter="$event.target.blur()"
              />
            </div>
            <div
              v-if="authSetting.key == 'appGoogleRedirect'"
              class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
            />
          </div>
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
    async updateSetting(newValue, setting) {
      const index = this.authSettings.indexOf(setting);
      const a = setting;
      if (newValue != a.val) {
        setting.val = newValue;
        await axios
          .patch(`/api/app-settings/` + setting.id, setting)
          .then(({ data }) => {
            if (index !== -1) {
              this.authSettings[index] = data.data;
            }
            this.loading = false;
            this.popToast({
              message: `App Setting Updated`,
              timer: 5000,
              icon: 'success',
            });
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
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
