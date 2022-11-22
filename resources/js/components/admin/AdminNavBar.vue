<template>
  <div class="sticky top-0 z-40">
    <div
      class="flex h-20 w-full items-center justify-between border-b bg-white px-6 dark:bg-slate-800"
    >
      <div class="flex">
        <div class="mr-4 inline-block flex items-center lg:hidden">
          <button
            class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
            :class="
              sideBarOpen ? 'bg-slate-100 text-gray-900 dark:text-gray-100' : ''
            "
            @click="toggleSidebarTrigger()"
          >
            <span v-if="!sideBarOpen" class="sr-only">Open menu</span>
            <span v-if="sideBarOpen" class="sr-only">CLose menu</span>
            <Bars3Icon v-if="!sideBarOpen" class="h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-if="sideBarOpen" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div class="hidden lg:inline-flex">
          <div class="mr-4 inline-block flex items-center">
            <button
              class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800"
              @click="toggleFullScreenSidebarTrigger()"
            >
              <span v-if="!fullScreenSideBarOpen" class="sr-only"
                >Open menu</span
              >
              <span v-if="fullScreenSideBarOpen" class="sr-only"
                >CLose menu</span
              >
              <Bars3Icon
                v-if="!fullScreenSideBarOpen"
                class="h-6 w-6"
                aria-hidden="true"
              />
              <Bars3BottomLeftIcon
                v-if="fullScreenSideBarOpen"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
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
          <span
            v-tippy="'Toggle Theme ' + (form.theme_dark ? 'Light' : 'Dark')"
            :class="
              loading ? 'default disabled cursor-pointer' : 'cursor-pointer'
            "
            @click="toggleTheme()"
          >
            <Switch
              v-model="form.theme_dark"
              :class="form.theme_dark ? 'bg-gray-500' : 'bg-gray-400'"
              class="relative inline-flex h-[26px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span class="sr-only">Toggle Theme</span>
              <span
                aria-hidden="true"
                :class="
                  form.theme_dark
                    ? 'translate-x-5 bg-gray-800'
                    : 'translate-x-0 bg-white'
                "
                class="pointer-events-none inline-block h-[22px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </span>
        </div>

        <img
          v-if="user && user.avatar"
          :src="user.avatar"
          :alt="user.name"
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

    <div ref="dropMenu" class="relative mt-1">
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
  </div>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import {
  Bars3Icon,
  HomeIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  XMarkIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  // ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline';
import { Switch } from '@headlessui/vue';

export default {
  name: 'AdminNavBar',
  components: {
    HomeIcon,
    BuildingLibraryIcon,
    InformationCircleIcon,
    Bars3Icon,
    XMarkIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
    // ChevronDownIcon,
    UserCircleIcon,
    Bars3BottomLeftIcon,
    Switch, // eslint-disable-line
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      dropDownOpen: false,
      form: {
        theme_dark: false,
      },
      errors: null,
      success: '',
      loading: false,
    };
  },
  computed: {
    ...mapState('sidebar', {
      sideBarOpen: (state) => state.sideBarOpen,
      fullScreenSideBarOpen: (state) => state.fullScreenSideBarOpen,
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
  mounted() {
    this.form.theme_dark = this.user.theme_dark;
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      toggleSidebar: 'sidebar/toggleSidebar',
      toggleFullScreenSidebar: 'sidebar/toggleFullScreenSidebar',
      updateTheme: 'auth/theme',
      popToast: 'toast/popToast',
      logout: 'auth/logout',
    }),
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
    async toggleTheme() {
      this.loading = true;
      this.errors = null;
      this.success = '';
      this.form.theme_dark = !this.form.theme_dark;
      try {
        await this.updateTheme(this.form).then((response) => {
          if (
            response &&
            response.data &&
            response.data.user &&
            response.data.user.id
          ) {
            this.form.theme_dark = response.data.user.theme_dark;
            this.popToast({
              message: `Theme Saved`,
              timer: 2000,
              icon: 'success',
            });
          }
        });
      } catch (e) {
        this.errors = e.data;
        this.popToast({
          message: `Error Updating Theme`,
          timer: 5000,
          icon: 'error',
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
