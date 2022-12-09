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
              <span
                class="fa-solid fa-circle-user fa-fw fa-1x mr-3"
                style="margin-top: 2px"
              />
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
              <span
                class="fa-solid fa-chart-simple fa-fw fa-1x mr-3"
                style="margin-top: 2px"
              />
              Analytics
            </span>
          </li>
          <!--
          <li class="mr-2 cursor-pointer" @click="changeTab('general')">
            <span
              class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              :class="
                activeTab == 'general'
                  ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : ''
              "
            >
              <svg
                aria-hidden="true"
                class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                :class="
                  activeTab == 'general'
                    ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                    : ''
                "
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

          <li class="mr-2 cursor-pointer" @click="changeTab('monitoring')">
            <span
              class="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              :class="
                activeTab == 'monitoring'
                  ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : ''
              "
            >
              <span
                class="fa-solid fa-shield-halved fa-fw fa-1x mr-3"
                style="margin-top: 2px"
              />
              Monitoring
            </span>
          </li>
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
                    <span
                      class="fa-brands fa-square-facebook fa-fw text-blue-600 dark:text-blue-600"
                    />
                    Facebook
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableFbLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appFbId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appFbSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appFbRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appFbRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableTwitterLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-twitter fa-fw text-blue-300 dark:text-blue-300"
                    />
                    Twitter
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableTwitterLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitterId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitterSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitterRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appTwitterRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableGoogleLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-google fa-fw text-green-600 dark:text-green-500"
                    />
                    Google
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableGoogleLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGoogleId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGoogleSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGoogleRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appGoogleRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableInstagramLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-instagram fa-fw text-yellow-600 dark:text-yellow-400"
                    />
                    Instagram
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableInstagramLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appInstagramId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appInstagramSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appInstagramRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appInstagramRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableGitHubLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-github fa-fw text-gray-100 dark:text-gray-100"
                    />
                    Github
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableGitHubLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitHubId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitHubSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitHubRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appGitHubRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableLinkedInLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-linkedin fa-fw text-blue-600 dark:text-blue-600"
                    />
                    LinkedIn
                  </h4>
                </div>

                <AppSettingToggle
                  v-if="setting.key == 'enableLinkedInLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appLinkedInId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appLinkedInSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appLinkedInRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appLinkedInRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableTwitchLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-twitch fa-fw text-blue-600 dark:text-blue-600"
                    />
                    Twitch
                  </h4>
                </div>

                <AppSettingToggle
                  v-if="setting.key == 'enableTwitchLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitchId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitchSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTwitchRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appTwitchRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableYouTubeLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-youtube fa-fw text-red-500 dark:text-red-500"
                    />
                    YouTube
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableYouTubeLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appYouTubeId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appYouTubeSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appYouTubeRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appYouTubeRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableAppleLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-apple fa-fw text-white-500 dark:text-white-500"
                    />
                    Apple
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableAppleLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleTeamId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleKeyId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleKeyId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appApplePrivateKey"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appAppleRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appAppleRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableMicrosoftLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-microsoft fa-fw text-blue-300 dark:text-blue-300"
                    />
                    Microsoft
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableMicrosoftLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appMicrosoftId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appMicrosoftSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appMicrosoftRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appMicrosoftRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableTikTokLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-tiktok fa-fw text-pink-500 dark:text-pink-500"
                    />
                    TikTok
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableTikTokLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTikTokId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTikTokSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appTikTokRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appTikTokRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableZoHoLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fas fa-z fa-fw text-yellow-400 dark:text-yellow-300"
                    />
                    <img
                      id="zoho"
                      :src="zohoImgUrl"
                      alt="Zoho"
                      class=""
                      style="
                        width: 100%;
                        max-width: 60px;
                        margin: -10px 0 0 5px;
                        display: inline-block;
                      "
                    />
                    <span class="sr-only"> ZoHo </span>
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableZoHoLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appZoHoId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appZoHoSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appZoHoRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appZoHoRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableStackExchangeLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-stack-exchange fa-fw text-blue-400 dark:text-blue-400"
                    />
                    Stack Exchange
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableStackExchangeLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appStackExchangeId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appStackExchangeKey'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appStackExchangeSite'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appStackExchangeSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appStackExchangeRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appStackExchangeRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <div class="setting-group mb-3">
                <div v-if="setting.key == 'enableGitLabLogin'">
                  <h4 class="w-100 mb-3 text-xl font-semibold">
                    <span
                      class="fa-brands fa-square-gitlab fa-fw text-orange-400 dark:text-orange-400"
                    />
                    GitLab
                  </h4>
                </div>
                <AppSettingToggle
                  v-if="setting.key == 'enableGitLabLogin'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitLabId'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitLabSecret'"
                  class="ml-8 mr-5 mb-3"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <AppSettingTextInput
                  v-if="setting.key == 'appGitLabRedirect'"
                  class="ml-8 mr-5"
                  :setting="setting"
                  :loading="loading"
                  :disabled="!dataReady"
                  @update-setting="appSettingUpdateTriggered"
                />
                <div
                  v-if="setting.key == 'appGitLabRedirect'"
                  class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"
                />
              </div>

              <!-- NEW_PROVIDER_PLUG :: Put New Provider HERE -->
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
                  <span
                    class="fa-brands fa-google fa-fw text-green-500 dark:text-green-500"
                  />
                  Google Analytics
                </h4>
              </div>
              <AppSettingToggle
                v-if="setting.key == 'enableGoogleAnalytics'"
                class="ml-8 mr-5 mb-3"
                :setting="setting"
                :loading="loading"
                @update-setting="appSettingUpdateTriggered"
              />
              <AppSettingTextInput
                v-if="setting.key == 'appGoogleAnalyticsKey'"
                class="ml-8 mr-5"
                :setting="setting"
                :loading="loading"
                :disabled="!dataReady"
                @update-setting="appSettingUpdateTriggered"
              />
            </div>
          </div>
        </div>

        <div v-if="activeTab == 'general'">
          <h3 class="text-2xl font-semibold">General Settings</h3>
          <hr class="mt-3 w-10 pb-4" />
        </div>

        <div v-if="activeTab == 'monitoring'">
          <h3 class="text-2xl font-semibold">Monitoring Settings</h3>
          <hr class="mt-3 w-10 pb-4" />
          <div
            v-for="setting in monitoringSettings"
            :key="'monitoring_settings_' + setting.id"
            class="mb-3"
          >
            <div class="setting-group mb-3">
              <div v-if="setting.key == 'enableSentryMonitoring'">
                <h4 class="w-100 mb-3 text-xl font-semibold">
                  <svg
                    class="css-1mxa28m e10nushx4 float-left mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 72 66"
                    width="28"
                    height="28"
                    style="margin-top: -1px"
                  >
                    <path
                      d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
                      transform="translate(11, 11)"
                      :fill="user.theme_dark ? '#ffffff' : '#362d59'"
                    ></path>
                  </svg>
                  Sentry.io Monitoring
                </h4>
              </div>

              <AppSettingToggle
                v-if="setting.key == 'enableSentryMonitoring'"
                class="ml-8 mr-5 mb-3"
                :setting="setting"
                :loading="loading"
                @update-setting="appSettingUpdateTriggered"
              />

              <AppSettingToggle
                v-if="setting.key == 'enableSentryMonitoringFeedbakForm'"
                class="ml-8 mr-5 mb-3"
                :setting="setting"
                :loading="loading"
                @update-setting="appSettingUpdateTriggered"
              />

              <AppSettingTextInput
                v-if="setting.key == 'sentryIoDSN'"
                class="ml-8 mr-5"
                :setting="setting"
                :loading="loading"
                :disabled="!dataReady"
                @update-setting="appSettingUpdateTriggered"
              />

              <AppButton
                v-if="setting.key == 'sentryIoDSN' && sentryEnabled"
                secondary
                text="Throw Test Error"
                class="ml-8 mr-5 mb-3 mt-4"
                @click="throwTestError"
              />
            </div>
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
import { track } from '@services/analytics';
import AppSettingToggle from '@components/form/AppSettingToggle.vue';
import AppSettingTextInput from '@components/form/AppSettingTextInput.vue';
import zohoLight from '@img/vendor-logos/zoho-monocrome-white.png';
import zohoDark from '@img/vendor-logos/zoho-monocrome-black.png';

export default {
  name: 'AppSettings',
  components: {
    ChevronRightIcon,
    AppSettingToggle,
    AppSettingTextInput,
  },
  props: {},
  data() {
    return {
      dataReady: false,
      authSettings: null,
      analyticsSettings: null,
      generalSettings: null,
      monitoringSettings: null,
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
    sentryEnabled() {
      const status = this.monitoringSettings.find(
        (s) => s.key == 'enableSentryMonitoring',
      );
      if (status && status.val && status.val == 1) {
        return true;
      }
      return false;
    },
    zohoImgUrl() {
      if (this.user && this.user.theme_dark) {
        return zohoLight;
      } else {
        return zohoDark;
      }
    },
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
    track,
    async getAppSettings() {
      this.dataReady = false;
      await axios
        .get('/api/app-settings')
        .then(({ data }) => {
          this.authSettings = data.authSettings;
          this.analyticsSettings = data.analyticsSettings;
          this.generalSettings = data.generalSettings;
          this.monitoringSettings = data.monitoringSettings;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Getting App Settings',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    async updateSetting(newValue, setting) {
      let index = null;
      if (setting && setting.group && setting.group == 'auth') {
        // index = this.authSettings.indexOf(setting);
        index = this.authSettings.map((o) => o.name).indexOf(setting.name);
      }
      if (setting && setting.group && setting.group == 'analytics') {
        // index = this.analyticsSettings.indexOf(setting);
        index = this.analyticsSettings.map((o) => o.name).indexOf(setting.name);
      }
      if (setting && setting.group && setting.group == 'general') {
        // index = this.generalSettings.indexOf(setting);
        index = this.generalSettings.map((o) => o.name).indexOf(setting.name);
      }
      if (setting && setting.group && setting.group == 'monitoring') {
        // index = this.monitoringSettings.indexOf(setting);
        index = this.monitoringSettings
          .map((o) => o.name)
          .indexOf(setting.name);
      }
      const a = setting;
      if (newValue != a.val) {
        setting.val = newValue;
        await axios
          .patch(`/api/app-settings/${setting.id}`, setting)
          .then(({ data }) => {
            const message = 'App Setting Updated';
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
              if (setting && setting.group && setting.group == 'monitoring') {
                this.monitoringSettings[index] = data.data;
                // message = message + '. Reloading App.';
              }
            }
            this.loading = false;
            this.popToast({
              message,
              timer: 5000,
              icon: 'success',
            });
            this.track(
              `App setting "${setting.name}" was updated from "${a.val}" to "${setting.val}"`,
              'app event',
              'app setting updated',
            );
          })
          .catch(({ response }) => {
            this.popToast({
              message: 'Error Updating Setting',
              timer: 5000,
              icon: 'error',
            });
            this.loading = false;
          });
      }
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.track(`clicked tab: ${tab}`);
    },
    appSettingUpdateTriggered(val) {
      this.updateSetting(val.val, val.setting);
    },
    throwTestError() {
      this.popToast({
        message: 'Sentry Test Error Triggered',
        timer: 5000,
        icon: 'success',
      });
      throw new Error('Sentry Test Error');
    },
  },
};
</script>
