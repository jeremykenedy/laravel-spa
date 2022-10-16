<template>
  <div id="users" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
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
            :to="{ name: 'users' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              Users
            </span>
          </router-link>
        </li>
      </ol>
      <PerPage
        :items="users"
        :per-page="perPage"
        class="float-right mb-2"
        style="margin-top: -0.5em"
        @changed="perPageChanged"
      />
    </nav>
    <div>
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr
              class="border-b-2 border-gray-300 bg-gray-200 text-gray-600 dark:border-gray-500 dark:bg-slate-900 dark:text-gray-200"
            >
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Role(s)
              </th>
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Created at
              </th>
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody v-if="dataReady">
            <tr
              v-for="user in users"
              :key="user.id"
              class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100"
            >
              <td
                class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
              >
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-full w-full rounded-full"
                      :src="user.avatar"
                      :alt="user.name"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="whitespace-no-wrap">
                      {{ user.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td
                class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
              >
                <div class="flex items-center">
                  <a
                    class="whitespace-no-wrap"
                    :href="'mailto:' + user.email"
                    title="send email"
                  >
                    {{ user.email }}
                  </a>
                </div>
              </td>

              <td
                class="whitespace-no-wrap border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
              >
                <p>
                  <span v-if="user.roles && user.roles.length">
                    <span
                      v-for="role in user.roles"
                      :key="'user_' + user.id + '_role_' + role.id"
                    >
                      <span
                        class="whitespace-no-wrap m-1 inline-block cursor-default rounded px-2.5 py-0.5 text-xs font-bold"
                        :class="roleClass(role.slug)"
                      >
                        {{ role.name }}
                      </span>
                    </span>
                  </span>
                </p>
              </td>
              <td
                class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
              >
                <p v-if="user.created_at" class="whitespace-no-wrap">
                  {{ parseDisplayDate(user.created_at) }}
                </p>
              </td>
              <td
                class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
              >
                <span
                  class="relative inline-block px-3 py-1 font-semibold leading-tight"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 rounded-full"
                    :class="
                      user.email_verified_at
                        ? 'bg-green-700 text-green-900 dark:text-gray-100'
                        : 'bg-red-700 text-red-900 dark:text-gray-100'
                    "
                  ></span>
                  <span class="relative">
                    {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
          <tbody v-if="!dataReady">
            <tr
              class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100"
            >
              <td colspan="5" class="pt-10 pb-10 text-center">
                <i class="fa fa-circle-notch fa-spin fa-5x text-gray-400" />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="dataReady && users && users.length >= 1"
          class="xs:flex-row xs:justify-between flex flex-col items-center px-3 py-3 dark:bg-slate-700"
        >
          <Pagination
            :pagination="pagination"
            :offset="4"
            @paginate="getUsers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import moment from 'moment';
import Pagination from '@components/Pagination.vue';
import PerPage from '@components/PerPage.vue';

export default {
  name: 'Users',
  components: {
    ChevronRightIcon,
    Pagination,
    PerPage,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      offset: 4,
      users: [],
      pagination: {},
      perPage: 10,
      dataReady: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getUsers();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    perPageChanged(value) {
      this.perPage = parseInt(value);
      this.pagination.current_page = 1;
      this.getUsers();
    },
    async getUsers(updatedPage = null) {
      if (updatedPage) {
        this.pagination.current_page = updatedPage;
      }
      await axios
        .get(
          `/api/users?page=${this.pagination.current_page}&per=${this.perPage}`,
        )
        .then(({ data }) => {
          this.users = data.data;
          delete data.data;
          this.pagination = data;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Getting Users`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
      this.dataReady = true;
    },
    roleClass(slug) {
      if (slug == 'admin') {
        return 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-gray-100';
      } else if (slug == 'super.admin') {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-gray-100';
      } else if (slug == 'user') {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-gray-100';
      } else if (slug == 'editor') {
        return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-gray-100';
      } else if (slug == 'moderator') {
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-gray-100';
      }
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    },
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
  },
};
</script>

<style scoped>
input:focus,
select:focus,
textarea:focus,
button:focus,
option:focus {
  outline: none !important;
  border: none !important;
}
</style>
<style lang="scss" scoped></style>
