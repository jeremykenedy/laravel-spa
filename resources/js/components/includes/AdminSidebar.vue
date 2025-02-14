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
      <AdminSidebarLink
        v-if="authenticated && user"
        routeName="dashboard"
        :text="$t('dashboard')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <BuildingLibraryIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && (userIs('superadmin') || userCan('view.users'))"
        routeName="users.index"
        :text="$t('users')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <UsersIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        routeName="permissions.index"
        :text="$t('permissions')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <ShieldCheckIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        routeName="roles.index"
        :text="$t('roles')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <ShieldExclamationIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        routeName="posts.index"
        :text="$t('posts')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <PencilIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        routeName="categories.index"
        :text="$t('categories')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <TagIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        routeName="browser_sessions.index"
        :text="$t('browser_sessions')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <GlobeAltIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        routeName="activity_log.index"
        :text="$t('activity_logs')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <LifebuoyIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <div class="text-xs/6 font-semibold text-gray-600 dark:text-gray-300 px-1 pt-5">
        External Resources
      </div>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://heroicons.com"
        text="Heroicons"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <!-- <svg viewBox="0 0 210 190" fill="none" aria-hidden="true" class="h-7"><path fill-rule="evenodd" clip-rule="evenodd" d="m78.091 0 5.967 5.676c15.038 14.306 35.323 23.067 57.663 23.067.356 0 .711-.002 1.065-.006l6.363-.08 1.988 6.072a102.026 102.026 0 0 1 5.045 31.782c0 47.391-32.269 87.19-75.928 98.477l-2.163.559-2.163-.559C32.27 153.701 0 113.902 0 66.511c0-11.085 1.769-21.772 5.045-31.782l1.988-6.072 6.363.08c.354.004.71.006 1.065.006 22.34 0 42.625-8.761 57.664-23.067L78.09 0ZM19.846 46.033a84.814 84.814 0 0 0-2.492 20.478c0 38.459 25.662 70.919 60.737 81.006 35.075-10.087 60.738-42.547 60.738-81.006 0-7.071-.866-13.93-2.493-20.478-22.009-1.16-42.166-9.387-58.245-22.453-16.079 13.066-36.235 21.293-58.245 22.453Z" fill="#8B5CF6"></path></svg> -->
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">H</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://tailwindui.com"
        text="Tailwind UI"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">UI</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://tailwindcss.com/docs/styling-with-utility-classes"
        text="Tailwind CSS"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">T</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://vuejs.org/guide/introduction.html"
        text="Vue.js"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">V</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://pinia.vuejs.org/core-concepts/"
        text="Pinia"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">P</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://laravel.com/docs"
        text="Laravel"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">L</span>
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://herd.laravel.com/docs/macos/getting-started/installation"
        text="Laravel Herd"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">LH</span>
        </template>
      </AdminSidebarLink>
    </div>

  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import useAuth from '@composables/auth'
import { useAuthStore } from "@store/auth";
import { useSideBarStore } from "@store/sidebar";
import AdminSidebarLink from '@components/includes/AdminSidebarLink.vue';
import {
  UsersIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  CogIcon,
  ServerStackIcon,
  GlobeAltIcon,
  LifebuoyIcon,
  PencilIcon,
  TagIcon,
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
    PencilIcon,
    TagIcon,
    AdminSidebarLink,
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

    ...mapActions(useAuthStore, [
      'userIs',
      'userCan',
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
