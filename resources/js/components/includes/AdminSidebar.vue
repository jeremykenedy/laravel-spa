<template>
  <div
    id="main-nav"
    class="fixed z-30 h-screen w-1/2 border-r bg-white dark:bg-slate-800 md:top-0 md:left-0 md:w-1/3 lg:block lg:w-64"
    :class="sideBarOpenGetter ? '' : 'hidden'"
  >
    <div class="mb-8 flex h-20 w-full items-center border-b px-4">
      <div class="flex justify-center lg:w-0 lg:flex-1">
        <router-link :to="{ name: 'home' }">
          <svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500 dark:text-indigo-300">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
              fill="currentColor"
            />
          </svg>
          <p class="sr-only text-3xl font-semibold text-blue-400">
            {{ appName }}
          </p>
        </router-link>
      </div>
    </div>

    <nav class="mb-4 px-4 flex flex-1 flex-col">
      <AdminSidebarLink
        v-if="authenticated && user"
        route-name="dashboard"
        :text="$t('dashboard')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <BuildingLibraryIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        route-name="browser_sessions.index"
        :text="$t('browser_sessions')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <GlobeAltIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user"
        route-name="activity_log.index"
        :text="$t('activity_logs')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <LifebuoyIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <div
        v-if="
          userCan('view.users') ||
          userCan('view.permissions') ||
          userCan('view.roles') ||
          userCan('view.articles') ||
          userCan('view.categories') ||
          userIs('superadmin')
        "
        class="text-xs/6 font-semibold text-gray-600 dark:text-gray-300 px-1 pt-5"
      >
        {{ $t('admin') }}
      </div>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        route-name="admin.index"
        :text="$t('admin')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <BuildingOfficeIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userCan('view.users')"
        route-name="users.index"
        :text="$t('users')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <UsersIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userCan('view.permissions')"
        route-name="permissions.index"
        :text="$t('permissions')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <ShieldCheckIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userCan('view.roles')"
        route-name="roles.index"
        :text="$t('roles')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <ShieldExclamationIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userCan('view.articles')"
        route-name="posts.index"
        :text="$t('posts')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <PencilIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userCan('view.categories')"
        route-name="categories.index"
        :text="$t('categories')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <TagIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        route-name="phpinfo"
        :text="$t('server_info')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <ServerStackIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <AdminSidebarLink
        v-if="authenticated && user && userIs('superadmin')"
        route-name="app-settings"
        :text="$t('app_settings')"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <CogIcon class="h-6 w-6" />
        </template>
      </AdminSidebarLink>

      <div class="text-xs/6 font-semibold text-gray-600 dark:text-gray-300 px-1 pt-5">
        {{ $t('external_resources') }}
      </div>

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://heroicons.com"
        text="Heroicons"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span
            class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3"
            >H</span
          >
        </template>
      </AdminSidebarLink>

      <!--
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

      <AdminSidebarLink
        v-if="authenticated && user"
        url="https://hc200ok.github.io/vue3-easy-data-table-doc/getting-started.html"
        text="Vue3 Table"
        @nav-clicked="toggleSidebar"
      >
        <template #icon>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white mr-3">VT</span>
        </template>
      </AdminSidebarLink>
      -->
    </nav>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import useAuth from '@composables/auth';
import { useAuthStore } from '@store/auth';
import { useSideBarStore } from '@store/sidebar';
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
  BuildingOfficeIcon,
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
    BuildingOfficeIcon,
  },
  computed: {
    ...mapState(useAuth, ['processing']),
    ...mapState(useAuthStore, ['user', 'authenticated']),
    ...mapState(useSideBarStore, ['sideBarOpenGetter', 'fullScreenSideBarOpenGetter']),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
  },
  methods: {
    ...mapActions(useAuth, ['logout']),
    ...mapActions(useAuthStore, ['userIs', 'userCan']),
    ...mapActions(useSideBarStore, ['toggleSidebar', 'toggleFullScreenSidebar']),
  },
};
</script>
