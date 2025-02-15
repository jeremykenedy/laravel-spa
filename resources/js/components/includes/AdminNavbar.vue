<template>
  <div class="sticky top-0 z-40">
    <div class="flex h-20 w-full items-center justify-between border-b bg-white px-6 dark:bg-slate-800">
      <div class="flex">

        <div class="mr-4 flex items-center lg:hidden">
          <button
            class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
            :class="sideBarOpenGetter ? 'bg-slate-100 text-gray-900 dark:text-gray-100' : ''
              " @click="toggleSidebarTrigger()">
            <span v-if="!sideBarOpenGetter" class="sr-only">Open menu</span>
            <span v-if="sideBarOpenGetter" class="sr-only">CLose menu</span>
            <Bars3Icon v-if="!sideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-if="sideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div class="hidden lg:inline-flex">
          <div class="mr-4 flex items-center">
            <button
              class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
              @click="toggleFullScreenSidebarTrigger()">
              <span v-if="!fullScreenSideBarOpenGetter" class="sr-only">Open menu</span>
              <span v-if="fullScreenSideBarOpenGetter" class="sr-only">CLose menu</span>
              <Bars3Icon v-if="!fullScreenSideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
              <Bars3BottomLeftIcon v-if="fullScreenSideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <!-- && roles && (roles.admin || roles.superAdmin) -->

        <div as="nav" class="ml-5 space-x-10 hidden md:flex">
          <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'dashboard' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              <BuildingLibraryIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>

          <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'home' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              <HomeIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>

          <router-link v-slot="{ isActive }" :to="{ name: 'about' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              <InformationCircleIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>

          <router-link v-slot="{ isActive }" :to="{ name: 'terms' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              <DocumentTextIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>
        </div>
      </div>

      <div class="relative flex items-center">
        <!--
        <div class="my-1 mr-3 w-full py-2 sm:flex sm:items-center">
          <span
            v-tippy="'Toggle Theme ' + (form.theme_dark ? 'Light' : 'Dark')"
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
        -->

        <div class="my-1 mr-5 mt-2 w-full py-2 sm:flex sm:items-center">
          <ToggleDarkMode class="m-0" />
        </div>
        <img v-if="user && user.avatar" :src="user.avatar" :alt="user.name"
          class="h-8 w-8 cursor-pointer rounded-full border shadow-lg" @click="dropDownOpen = !dropDownOpen" />
        <UserCircleIcon v-else class="float-right ml-2 mt-0 h-8 w-8 cursor-pointer"
          @click="dropDownOpen = !dropDownOpen" />
      </div>
    </div>

    <div ref="dropMenu" class="relative mt-1">
      <div v-show="dropDownOpen"
        class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900"
        @click="dropDownOpen = !dropDownOpen">
        <!--
        <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'admin.index' }">
          <span class="flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white" :class="isActive
            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
            : 'text-gray-700'
            ">
            <BuildingLibraryIcon class="mr-2 h-6 w-6" />
            Admin
          </span>
        </router-link>
        -->

        <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'dashboard' }">
          <span class="flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="currentRouteName == 'dashboard'
            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
            : 'text-gray-700'
            ">
            <HomeIcon class="mr-2 h-6 w-6" />
            {{ $t('dashboard') }}
          </span>
        </router-link>

        <!--
        <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'settings' }">
          <span class="flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white" :class="isActive
            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
            : 'text-gray-700'
            ">
            <CogIcon class="mr-2 h-6 w-6" />
            Settings
          </span>
        </router-link>
        -->

        <div
          class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white"
          @click.prevent="logout()">
          <ArrowRightOnRectangleIcon class="mr-2 h-6 w-6"></ArrowRightOnRectangleIcon>
          {{ $t('logout') }}
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from "@store/auth";
import { useSideBarStore } from "@store/sidebar";
import useAuth from '@composables/auth'
import useProfile from "@composables/profile";
import { parseDisplayDate } from '@services/common';
import ToggleDarkMode from '@components/ToggleDarkMode.vue';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HomeIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  Bars3BottomLeftIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'AdminNavBar',
  components: {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    HomeIcon,
    BuildingLibraryIcon,
    InformationCircleIcon,
    Bars3BottomLeftIcon,
    DocumentTextIcon,
    ToggleDarkMode,
    ArrowRightOnRectangleIcon,
  },
  data() {
    return {
      dropDownOpen: false,
    };
  },
  computed: {
    ...mapState(useAuth, [
      'processing',
      'getAbilities',
    ]),
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
    ...mapState(useSideBarStore, [
      'sideBarOpenGetter',
      'fullScreenSideBarOpenGetter'
    ]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions(useAuth, [
      'logout',
    ]),
    ...mapActions(useSideBarStore, [
      'toggleSidebar',
      'toggleFullScreenSidebar',
    ]),
    toggleSidebarTrigger() {
      this.toggleSidebar();
      this.closeDrop();
    },
    toggleFullScreenSidebarTrigger() {
      this.toggleFullScreenSidebar();
      this.closeDrop();
    },
    closeDrop() {
      this.dropDownOpen = false;
    },
    openDrop() {
      this.dropDownOpen = true;
    },
  },
};
</script>

<style scoped>
</style>
<style lang="scss" scoped>
</style>
