<template>
  <div class="sticky top-0 z-40">
    <div class="flex h-20 w-full items-center justify-between border-b bg-white px-6 dark:bg-slate-800">
      <div class="flex">
        <div class="mr-4 flex items-center lg:hidden">
          <button
            class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
            :class="sideBarOpenGetter ? 'bg-slate-100 text-gray-900 dark:text-gray-100' : ''"
            @click.prevent="toggleSidebarTrigger()"
          >
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
              @click.prevent="toggleFullScreenSidebarTrigger()"
            >
              <span v-if="!fullScreenSideBarOpenGetter" class="sr-only">Open menu</span>
              <span v-if="fullScreenSideBarOpenGetter" class="sr-only">CLose menu</span>
              <Bars3Icon v-if="!fullScreenSideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
              <Bars3BottomLeftIcon v-if="fullScreenSideBarOpenGetter" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav as="nav" class="ml-5 space-x-10 hidden md:flex">
          <NavLink v-if="authenticated" route-name="dashboard" @nav-clicked="closeDrop">
            <template #iconBefore>
              <BuildingLibraryIcon class="h-6 w-6" />
            </template>
          </NavLink>

          <NavLink route-name="home" @nav-clicked="closeDrop">
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
        </nav>
      </div>

      <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div class="grid flex-1 grid-cols-1" />
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <ToggleDarkMode class="-mr-1" />
          <div class="h-6 w-px bg-gray-200 dark:bg-gray-600" aria-hidden="true" />
          <div class="relative">
            <button
              id="user-menu-button"
              type="button"
              class="-m-1.5 flex items-center p-1.5"
              aria-expanded="false"
              aria-haspopup="true"
              @click="dropDownOpen = !dropDownOpen"
            >
              <span class="sr-only">Open user menu</span>
              <img
                v-if="user && user.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="size-8 rounded-full bg-gray-50 cursor-pointer border shadow-lg dark:border-gray-500"
              />
              <UserCircleIcon
                v-else
                class="size-9 rounded-full bg-gray-50 cursor-pointer text-gray-700 dark:text-gray-200"
              />
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm/6 font-semibold text-gray-700 dark:text-gray-200" aria-hidden="true">
                  {{ user && user.name ? user.name : '' }}
                </span>
                <svg
                  class="ml-2 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div ref="dropMenu" class="relative mt-1 z-50">
      <div
        v-show="dropDownOpen"
        class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900 transition ease-in-out duration-75"
        @click="dropDownOpen = !dropDownOpen"
      >
        <AdminNavBarLink
          v-if="authenticated && user"
          route-name="dashboard"
          :text="$t('dashboard')"
          item-class="rounded-t"
        >
          <template #icon>
            <BuildingLibraryIcon class="h-6 w-6" />
          </template>
        </AdminNavBarLink>

        <AdminNavBarLink v-if="authenticated && user" route-name="settings.index" :text="$t('settings')">
          <template #icon>
            <Cog6ToothIcon class="h-6 w-6" />
          </template>
        </AdminNavBarLink>

        <AdminNavBarLink
          v-if="authenticated && user"
          :text="$t('logout')"
          item-class="rounded-b"
          @nav-clicked="logout()"
        >
          <template #icon>
            <ArrowRightOnRectangleIcon class="h-6 w-6" />
          </template>
        </AdminNavBarLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useSideBarStore } from '@store/sidebar';
import useAuth from '@composables/auth';
import useProfile from '@composables/profile';
import { parseDisplayDate } from '@services/common';
import ToggleDarkMode from '@components/ToggleDarkMode.vue';
import NavLink from '@components/includes/NavLink.vue';
import AdminNavBarLink from '@components/includes/AdminNavBarLink.vue';
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
  Cog6ToothIcon,
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
    NavLink,
    AdminNavBarLink,
    Cog6ToothIcon,
  },
  data() {
    return {
      dropDownOpen: false,
    };
  },
  computed: {
    ...mapState(useAuth, ['processing']),
    ...mapState(useAuthStore, ['user', 'authenticated']),
    ...mapState(useSideBarStore, ['sideBarOpenGetter', 'fullScreenSideBarOpenGetter']),
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions(useAuth, ['logout']),
    ...mapActions(useSideBarStore, ['toggleSidebar', 'toggleFullScreenSidebar']),
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

<style scoped></style>
<style lang="scss" scoped></style>
