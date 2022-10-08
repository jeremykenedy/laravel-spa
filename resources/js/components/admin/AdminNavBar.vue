<template>
  <div class="sticky top-0 z-40">
    <div
      class="flex h-20 w-full items-center justify-between border-b bg-white px-6 dark:bg-slate-800"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="mr-4 inline-block flex items-center lg:hidden">
          <button
            class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
            :class="sideBarOpen ? 'bg-slate-100 text-gray-900' : ''"
            @click="toggleSidebarTrigger()"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />

            <!--             <svg
              class="h-5 w-5"
              :style="{ fill: 'black' }"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg> -->
          </button>
        </div>

        <div as="nav" class="ml-5 flex space-x-10">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'admin' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              <BuildingLibraryIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>

          <router-link
            v-if="authenticated"
            v-slot="{ isActive }"
            :to="{ name: 'dashboard' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              <HomeIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>

          <router-link
            v-slot="{ isActive }"
            :to="{ name: 'about' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            @click="closeDrop"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              <InformationCircleIcon class="float-left mr-2 h-6 w-6" />
            </span>
          </router-link>
        </div>
      </div>

      <!-- right navbar -->
      <div class="relative flex items-center">
        <!--
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class="mr-3 fill-current hover:text-blue-500"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
          />
        </svg>
        -->
        <!-- <div class="mr-2">{{ user && user.name ? user.name : '' }}</div> -->
        <img
          v-if="user && user.avatar"
          :src="user.avatar"
          class="h-8 w-8 cursor-pointer rounded-full border shadow-lg"
          @click="dropDownOpen = !dropDownOpen"
        />
        <UserCircleIcon
          v-else
          class="float-right ml-2 mt-0 h-8 w-8 cursor-pointer"
          @click="dropDownOpen = !dropDownOpen"
        />
      </div>
    </div>

    <!-- dropdown menu -->
    <div ref="dropMenu" class="relative mt-1">
      <div
        v-show="dropDownOpen"
        class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900"
        @click="dropDownOpen = !dropDownOpen"
      >
        <router-link
          v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
          :to="{ name: 'admin' }"
        >
          <span
            class="flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                : 'text-gray-700'
            "
          >
            <BuildingLibraryIcon class="mr-2 h-6 w-6" />
            Admin
          </span>
        </router-link>
        <router-link
          v-if="authenticated"
          v-slot="{ isActive }"
          :to="{ name: 'dashboard' }"
        >
          <span
            class="flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? roles && (roles.admin || roles.superAdmin)
                  ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                  : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                : roles && (roles.admin || roles.superAdmin)
                ? 'text-gray-700'
                : 'rounded-t text-gray-700'
            "
          >
            <HomeIcon class="mr-2 h-6 w-6" />
            Dashboard
          </span>
        </router-link>

        <router-link
          v-if="authenticated"
          v-slot="{ isActive }"
          :to="{ name: 'settings' }"
        >
          <span
            class="flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                : 'text-gray-700'
            "
          >
            <CogIcon class="mr-2 h-6 w-6" />
            Settings
          </span>
        </router-link>

        <div
          class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white"
          @click.prevent="logout"
        >
          <ArrowLeftOnRectangleIcon
            class="mr-2 h-6 w-6"
          ></ArrowLeftOnRectangleIcon>
          Logout
        </div>
      </div>
    </div>

    <!--     <div
      class="absolute top-20 right-0 mr-6 w-48 rounded-b-lg border border-t-0 bg-gray-100 text-gray-700 shadow-xl"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Account</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Settings</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Logout</a>
    </div>

    <div ref="dropMenu" class="relative">
      <div
        class="cursor-pointer items-center p-3 text-base font-medium tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
        @click="dropDownOpen = !dropDownOpen"
      >
        {{ user && user.name ? user.name : '' }}
        <img
          v-if="user && user.avatar"
          :src="user.avatar"
          class="float-right ml-2 mt-0 h-6 w-6 rounded-full"
        />
        <UserCircleIcon v-else class="float-right ml-2 mt-0 h-6 w-6" />
      </div>

      <div
        v-show="dropDownOpen"
        class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900"
        @click="dropDownOpen = !dropDownOpen"
      >
        <router-link
          v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
          v-slot="{ isActive }"
          :to="{ name: 'admin' }"
        >
          <span
            class="flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                : 'text-gray-700'
            "
          >
            <BuildingLibraryIcon class="mr-2 h-6 w-6" />
            Admin
          </span>
        </router-link>
        <router-link
          v-if="authenticated"
          v-slot="{ isActive }"
          :to="{ name: 'dashboard' }"
        >
          <span
            class="flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                : 'text-gray-700'
            "
          >
            <HomeIcon class="mr-2 h-6 w-6" />
            Dashboard
          </span>
        </router-link>

        <router-link
          v-if="authenticated"
          v-slot="{ isActive }"
          :to="{ name: 'settings' }"
        >
          <span
            class="flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white"
            :class="
              isActive
                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                : 'text-gray-700'
            "
          >
            <CogIcon class="mr-2 h-6 w-6" />
            Settings
          </span>
        </router-link>

        <div
          class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white"
          @click.prevent="logout"
        >
          <ArrowLeftOnRectangleIcon
            class="mr-2 h-6 w-6"
          ></ArrowLeftOnRectangleIcon>
          Logout
        </div>
      </div>
    </div>
 -->
    <!-- dropdown menu end -->
  </div>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import {
  Bars3Icon,
  HomeIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  // XMarkIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  // ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'AdminNavBar',
  components: {
    HomeIcon,
    BuildingLibraryIcon,
    InformationCircleIcon,
    Bars3Icon,
    // XMarkIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
    // ChevronDownIcon,
    UserCircleIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      dropDownOpen: false,
    };
  },
  computed: {
    ...mapState('sidebar', {
      sideBarOpen: (state) => state.sideBarOpen,
    }),
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
    toggleSidebarTrigger() {
      this.toggleSidebar();
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
