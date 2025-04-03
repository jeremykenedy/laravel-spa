<template>
  <div id="admin" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
    </AdminBreadcrumbContainer>

    <div v-if="user && user.roles" class="float-right mb-6 text-center">
      <RolesBadges :roles="user.roles" />
    </div>

    <div class="clear-both mb-6 items-center justify-between lg:flex">
      <p class="mb-2 text-2xl font-semibold lg:mb-0">
        {{ greeting() }}, {{ user && user.name ? user.name : $t('registered_user') }}!
      </p>
    </div>

    <div class="mb-20 -m-3 flex flex-wrap">
      <router-link
        v-if="authenticated && user && userIs('superadmin')"
        :to="{ name: 'users.index' }"
        class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12"
      >
        <AdminMiniCard class="m-3">
          <template #icon>
            <UsersIcon class="h-10 w-10" />
          </template>
          <template #content>
            <LoadingCircle v-if="loading" />
            <div v-if="!loading">
              {{ users }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('registered_users') }}
            </div>
          </template>
        </AdminMiniCard>
      </router-link>

      <router-link
        v-if="authenticated && user && userIs('superadmin')"
        :to="{ name: 'roles.index' }"
        class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12"
      >
        <AdminMiniCard class="m-3">
          <template #icon>
            <ShieldCheckIcon class="h-10 w-10" />
          </template>
          <template #content>
            <LoadingCircle v-if="loading" />
            <div v-if="!loading">
              {{ roles }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('roles') }}
            </div>
          </template>
        </AdminMiniCard>
      </router-link>

      <router-link
        v-if="authenticated && user && userIs('superadmin')"
        :to="{ name: 'permissions.index' }"
        class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12"
      >
        <AdminMiniCard class="m-3">
          <template #icon>
            <ShieldExclamationIcon class="h-10 w-10" />
          </template>
          <template #content>
            <LoadingCircle v-if="loading" />
            <div v-if="!loading">
              {{ permissions }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('permissions') }}
            </div>
          </template>
        </AdminMiniCard>
      </router-link>

      <router-link
        v-if="authenticated && user && userIs('superadmin')"
        :to="{ name: 'app-settings' }"
        class="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12"
      >
        <AdminMiniCard class="m-3">
          <template #icon>
            <LockClosedIcon class="h-10 w-10" />
          </template>
          <template #content>
            <LoadingCircle v-if="loading" />
            <SocialMediaLoginStatus v-if="!loading" />
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('logins_enabled') }}
            </div>
          </template>
        </AdminMiniCard>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useAuth from '@composables/auth';
import RolesBadges from '@components/roles/RolesBadges.vue';
import { greeting, providerIcon } from '@services/common';
import { track } from '@services/analytics';
import AdminMiniCard from '@components/common/AdminMiniCard.vue';
import SocialMediaLoginStatus from '@components/common/SocialMediaLoginStatus.vue';
import LoadingCircle from '@components/common/LoadingCircle.vue';
import axios from 'axios';

import { LockClosedIcon, UsersIcon, ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'AdminPage',
  components: {
    RolesBadges,
    LockClosedIcon,
    AdminMiniCard,
    SocialMediaLoginStatus,
    LoadingCircle,
    UsersIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon,
  },
  data() {
    return {
      dataReady: false,
      loading: false,
      dashboardData: [],
      users: 0,
      roles: 0,
      permissions: 0,
    };
  },
  mounted() {
    this.getDashboardData();
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated', 'socials']),
  },
  methods: {
    greeting,
    ...mapActions(useAuthStore, ['userIs', 'userCan']),
    ...mapActions(useToastStore, ['popToast', 'success', 'error']),
    async getDashboardData() {
      this.loading = true;
      await axios
        .get('/api/dashboard/data')
        .then(({ data }) => {
          this.dashboardData = data;
          this.users = data.users;
          this.roles = data.roles;
          this.permissions = data.permissions;
        })
        .catch(({ response }) => {
          this.error('Error Getting Dashboard Data');
        });
      this.loading = false;
      this.dataReady = true;
    },
    track,
  },
};
</script>
