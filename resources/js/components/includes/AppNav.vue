<template>
  <Popover class="relative bg-white dark:bg-slate-800 z-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div
        class="flex items-center justify-between border-b-2 border-gray-100 py-6 dark:border-slate-700 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link :to="{ name: 'home' }" @click="closeDrop">
            <span class="sr-only">{{ appName }}</span>
            <svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500 dark:text-indigo-300">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                fill="currentColor"
              />
            </svg>
          </router-link>
        </div>

        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800 dark:hover:bg-slate-800"
            @click="openDrop"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
          <!-- TODO: ADMIN/KIOSK ROUTER LINK HERE -->

          <NavLink v-if="authenticated && user" route-name="dashboard" @nav-clicked="closeDrop">
            <template #iconBefore>
              <BuildingLibraryIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink v-if="authenticated && user" route-name="home" @nav-clicked="closeDrop">
            <template #iconBefore>
              <HomeIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink route-name="about" @nav-clicked="closeDrop">
            <template #iconBefore>
              <InformationCircleIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink route-name="terms" @nav-clicked="closeDrop">
            <template #iconBefore>
              <DocumentTextIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink route-name="pricing" @nav-clicked="closeDrop">
            <template #iconBefore>
              <BuildingStorefrontIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink route-name="support" @nav-clicked="closeDrop">
            <template #iconBefore>
              <ChatBubbleLeftEllipsisIcon class="h-6 w-6" />
            </template>
          </NavLink>
        </PopoverGroup>

        <div v-if="authenticated" class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <LeaveImpersonation classes="float-right mr-4" />
          <ToggleDarkMode v-if="authenticated && user" />

          <div v-if="authenticated && user" ref="dropMenu" class="relative">
            <div
              class="cursor-pointer items-center p-3 text-base font-medium tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
              @click="drop = !drop"
            >
              {{ user && user.name ? user.name : '' }}

              <!-- TODO: EMAIL VERIFIED AT INFO HERE -->

              <img
                v-if="user && user.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="float-right ml-2 mt-0 h-6 w-6 rounded-full"
              />
              <UserCircleIcon v-else class="float-right ml-2 mt-0 h-6 w-6" />
            </div>

            <div
              v-show="drop"
              class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900"
              @click="drop = !drop"
            >
              <!-- TODO: ADMIN INFO SIGNAL HERE -->
              <!-- TODO: SUPER ADMIN / KIOSK DASHBOARD LINK HERE -->
              <!-- TODO: SETTINGS LINK HERE -->

              <div
                class="flex cursor-pointer items-center rounded-b hover:rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-600 hover:text-white"
                @click.prevent="(logout(), closeDrop())"
              >
                <ArrowRightOnRectangleIcon class="mr-2 h-6 w-6" />
                {{ $t('logout') }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="!authenticated" class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <ToggleDarkMode />

          <router-link
            v-slot="{ isActive }"
            :to="{ name: 'auth.login' }"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              {{ $t('signin') }}
            </span>
          </router-link>
          <router-link v-slot="{ isActive }" :to="{ name: 'auth.register' }" @click="closeDrop">
            <AppButton primary :text="$t('signup')" class="ml-8" :class="[isActive && 'opacity-60']" />
          </router-link>
        </div>

        <transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <PopoverPanel
            v-show="drop"
            v-slot="{ close }"
            focus
            class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div
              class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-slate-900"
            >
              <div class="px-5 pt-5 pb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <!-- <img class="h-8 w-auto" :src="logo" :alt="appName" /> -->
                    <span class="sr-only">{{ appName }}</span>

                    <router-link :to="{ name: 'home' }" @click="close">
                      <svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                          fill="currentColor"
                        />
                      </svg>
                    </router-link>
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800"
                    >
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
              </div>
              <div class="space-y-6 py-6 px-5">
                <div class="">
                  <div v-if="user && authenticated">
                    <img
                      v-if="user && user.avatar"
                      :src="user.avatar"
                      :alt="user.name"
                      class="float-left mt-0 mr-2 h-6 w-6 rounded-full"
                    />
                    <UserCircleIcon v-else class="float-left mt-0 h-6 w-6 mr-2 text-gray-500" />
                    <div
                      class="mb-6 text-left ml-2 text-base font-medium cursor-default text-gray-500 dark:text-gray-300"
                    >
                      {{ user && user.name ? user.name : '' }}
                    </div>
                  </div>

                  <!-- TODO: ADMIN/KIOSK LINK HERE -->

                  <div v-if="authenticated" class="mb-6 text-left">
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'dashboard' }"
                      class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      @click="close"
                    >
                      <span :class="[isActive && 'text-gray-800 hover:text-gray-900 dark:text-gray-600']">
                        <BuildingLibraryIcon class="float-left mr-2 h-6 w-6" />
                        Dashboard
                      </span>
                    </router-link>
                  </div>

                  <div class="mb-6 text-left">
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'about' }"
                      class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      @click="close"
                    >
                      <span :class="[isActive && 'text-gray-800 hover:text-gray-900 dark:text-gray-600']">
                        <InformationCircleIcon class="float-left mr-2 h-6 w-6" />
                        {{ $t('about') }}
                      </span>
                    </router-link>
                  </div>

                  <div class="mb-6 text-left">
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'terms' }"
                      class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      @click="close"
                    >
                      <span :class="[isActive && 'text-gray-800 hover:text-gray-900 dark:text-gray-600']">
                        <DocumentTextIcon class="float-left mr-2 h-6 w-6" />
                        {{ $t('terms') }}
                      </span>
                    </router-link>
                  </div>

                  <div class="mb-6 text-left">
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'pricing' }"
                      class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      @click="close"
                    >
                      <span :class="[isActive && 'text-gray-800 hover:text-gray-900 dark:text-gray-600']">
                        <BuildingStorefrontIcon class="float-left mr-2 h-6 w-6" />
                        {{ $t('pricing') }}
                      </span>
                    </router-link>
                  </div>

                  <div class="mb-6 text-left">
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'support' }"
                      class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      @click="close"
                    >
                      <span :class="[isActive && 'text-gray-800 hover:text-gray-900 dark:text-gray-600']">
                        <ChatBubbleLeftEllipsisIcon class="float-left mr-2 h-6 w-6" />
                        {{ $t('support') }}
                      </span>
                    </router-link>
                  </div>

                  <div class="mr-2 mb-7 w-full float-left">
                    <ToggleDarkMode class="float-left mr-0" />
                    <div
                      class="ml-3 text-base font-medium float-left text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                      style="margin-top: 3px"
                    >
                      {{ darkMode ? $t('disable') : $t('enable') }}
                      {{ $t('dark_mode') }}
                    </div>
                  </div>
                </div>

                <div v-if="!authenticated">
                  <router-link v-slot="{ isActive }" :to="{ name: 'auth.register' }">
                    <AppButton
                      primary
                      :text="$t('signup')"
                      class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      :class="[isActive && 'opacity-60']"
                      @click="close"
                    />
                  </router-link>

                  <p class="mt-6 text-center text-base font-medium text-gray-500">
                    {{ $t('existing_customer') }}?
                    {{ ' ' }}
                    <router-link
                      v-slot="{ isActive }"
                      :to="{ name: 'auth.login' }"
                      class="whitespace-nowrap text-base font-medium text-indigo-500 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400"
                      @click="close"
                    >
                      <span
                        :class="[
                          isActive &&
                            'text-indigo-800 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-500',
                        ]"
                      >
                        {{ $t('signin') }}
                      </span>
                    </router-link>
                  </p>
                </div>

                <div v-if="authenticated && user">
                  <LeaveImpersonation full classes="mb-5" @clicked="closeDrop()" />

                  <AppButton
                    primary
                    text="Logout"
                    type="button"
                    class="flex w-full items-center justify-center px-4 py-2"
                    @click.prevent="(logout(), closeDrop())"
                  >
                    <template #text>
                      <ArrowRightOnRectangleIcon class="mr-2 h-6 w-6" />
                      {{ $t('logout') }}
                    </template>
                  </AppButton>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </div>
    </div>
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    />
  </Popover>
</template>

<script>
import { ref } from 'vue';
import { parseDisplayDate } from '@services/common';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import useAuth from '@composables/auth';
import ToggleDarkMode from '@components/ToggleDarkMode.vue';
import NavLink from '@components/includes/NavLink.vue';
import LeaveImpersonation from '@components/common/LeaveImpersonation.vue';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import {
  Bars3Icon,
  HomeIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'AppNav',
  components: {
    HomeIcon,
    BuildingLibraryIcon,
    InformationCircleIcon,
    DocumentTextIcon,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Bars3Icon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    ToggleDarkMode,
    BuildingStorefrontIcon,
    ChatBubbleLeftEllipsisIcon,
    NavLink,
    LeaveImpersonation,
  },
  mounted() {
    if (this.user && this.user.id) {
      if (this.user.theme_dark) {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    } else {
      this.theme = localStorage.getItem('data-theme');
    }
    window.addEventListener('theme-localstorage-changed', (event) => {
      this.theme = event.detail.storage;
    });
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
    ...mapState(useAuth, ['processing']),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
    darkMode() {
      if (this.theme == 'dark') {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      drop: false,
      errors: null,
      success: '',
      theme: null,
    };
  },
  methods: {
    ...mapActions(useAuth, ['logout']),
    parseDisplayDate,
    closeDrop() {
      this.drop = false;
    },
    openDrop() {
      this.drop = true;
    },
  },
};
</script>
