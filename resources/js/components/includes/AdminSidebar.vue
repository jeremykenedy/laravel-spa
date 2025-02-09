<template>
  <div id="main-nav"
    class="fixed z-30 h-screen w-1/2 border-r bg-white dark:bg-slate-800 md:top-0 md:left-0 md:w-1/3 lg:block lg:w-64"
    :class="sideBarOpenGetter ? '' : 'hidden'">

    <div class="mb-8 flex h-20 w-full items-center border-b px-4">
      <div class="flex justify-center lg:w-0 lg:flex-1">
        <router-link :to="{ name: 'home' }">
          <svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500 dark:text-indigo-300">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
              fill="currentColor"></path>
          </svg>
          <p class="sr-only text-3xl font-semibold text-blue-400">
            {{ appName }}
          </p>
        </router-link>
      </div>
    </div>

    <div class="mb-4 px-4">
      <router-link v-slot="{ isActive }" :to="{ name: 'dashboard' }" @click="toggleSidebar">
        <div class="flex h-10 w-full items-center rounded-lg pl-4 text-blue-400" :class="currentRouteName == 'dashboard'
          ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
          : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
          ">
          <BuildingLibraryIcon class="mr-2 mb-1 h-6 w-6" />
          <span class="">{{ $t('dashboard') }}</span>
        </div>
      </router-link>

      <!--
      <li v-if="can('user-list')" class="nav-item">
        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-people"
            viewBox="0 0 16 16">
            <path
              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span class="d-none d-sm-inline ps-2">User Manager</span>
        </a>
        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
          <li v-if="can('permission-list')" class="nav-link w-100">
            <router-link :to="{ name: 'permissions.index' }" class="nav-link px-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
              </svg>
              <span class="d-none d-sm-inline ps-2">Permissions</span>
            </router-link>
          </li>
          <li v-if="can('role-list')" class="nav-link">
            <router-link :to="{ name: 'roles.index' }" class="nav-link px-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
              </svg>
              <span class="d-none d-sm-inline ps-2">Roles</span>
            </router-link>
          </li>
          <li v-if="can('user-list')" class="nav-link">
            <router-link :to="{ name: 'users.index' }" class="nav-link px-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
              </svg>
              <span class="d-none d-sm-inline ps-2">Users</span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="can('post-list')" class="nav-item">
        <router-link :to="{ name: 'posts.index' }" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          <span class="d-none d-sm-inline ps-2">Posts</span>
        </router-link>
      </li>

      <li v-if="can('category-list')" class="nav-item">
        <router-link :to="{ name: 'categories.index' }" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          <span class="d-none d-sm-inline ps-2">Categories</span>
        </router-link>
      </li>
      -->

      <router-link v-slot="{ isActive }" :to="{ name: 'browser_sessions.index' }" @click="toggleSidebar">
        <div class="flex h-10 w-full items-center rounded-lg pl-4 text-blue-400" :class="currentRouteName == 'browser_sessions.index'
          ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
          : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
          ">
          <GlobeAltIcon class="mr-2 mb-1 h-6 w-6" />
          <span class="">{{ $t('browser_sessions') }}</span>
        </div>
      </router-link>

      <router-link v-slot="{ isActive }" :to="{ name: 'activity_log.index' }" @click="toggleSidebar">
        <div class="flex h-10 w-full items-center rounded-lg pl-4 text-blue-400" :class="currentRouteName == 'activity_log.index'
          ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
          : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
          ">
          <LifebuoyIcon class="mr-2 mb-1 h-6 w-6" />
          <span class="">{{ $t('activity_logs') }}</span>
        </div>
      </router-link>

    </div>

  </div>
</template>

<script setup>
import { useAbility } from '@casl/vue'
const { can } = useAbility();
</script>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import useAuth from '@composables/auth'
import { useAuthStore } from "@store/auth";
import { useSideBarStore } from "@store/sidebar";
import {
  UsersIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  CogIcon,
  ServerStackIcon,
  GlobeAltIcon,
  LifebuoyIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'AdminSidebar',
  components: {
    UsersIcon,
    BuildingLibraryIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon,
    ServerStackIcon,
    CogIcon,
    GlobeAltIcon,
    LifebuoyIcon,
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
    appName() {
      return APP_NAME;
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
  },
};
</script>

<style scoped>
</style>
<style lang="scss" scoped>
</style>
