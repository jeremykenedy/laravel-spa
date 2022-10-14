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
    </nav>

    <div>
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                User
              </th>
              <th
                class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Email
              </th>
              <th
                class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Role(s)
              </th>
              <th
                class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Created at
              </th>
              <th
                class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Status
              </th>
            </tr>
          </thead>

          <tbody v-if="dataReady">
            <tr v-for="user in users" :key="user.id">
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-full w-full rounded-full"
                      :src="user.avatar"
                      :alt="user.name"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="whitespace-no-wrap text-gray-900">
                      {{ user.name }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div class="flex items-center">
                  <a
                    class="whitespace-no-wrap text-gray-900"
                    :href="'mailto:' + user.email"
                    title="send email"
                  >
                    {{ user.email }}
                  </a>
                </div>
              </td>

              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap text-gray-900">
                  <span v-if="user.roles && user.roles.length">
                    <span
                      v-for="role in user.roles"
                      :key="'user_' + user.id + '_role_' + role.id"
                    >
                      <span
                        class="mr-1 cursor-default rounded px-2.5 py-0.5 text-sm font-medium"
                        :class="roleClass(role.slug)"
                      >
                        {{ role.name }}
                      </span>
                    </span>
                  </span>
                </p>
              </td>
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p
                  v-if="user.created_at"
                  class="whitespace-no-wrap text-gray-900"
                >
                  {{ parseDisplayDate(user.created_at) }}
                </p>
              </td>
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <span
                  class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 rounded-full opacity-50"
                    :class="
                      user.email_verified_at ? 'bg-green-200' : 'bg-red-200'
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
            <td colspan="5" class="pt-10 pb-10 text-center">
              <i class="fa fa-circle-notch fa-spin fa-5x text-gray-400" />
            </td>
          </tbody>
        </table>
        <!--
        <div
          v-if="dataReady"
          class="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5"
        >
          <span class="xs:text-sm text-xs text-gray-900">
            Showing 1 to 4 of 50 Entries
          </span>
          <div class="xs:mt-0 mt-2 inline-flex">
            <button
              class="rounded-l bg-gray-300 py-2 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-400"
            >
              Prev
            </button>
            <button
              class="rounded-r bg-gray-300 py-2 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapGetters } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Users',
  components: {
    ChevronRightIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      users: {},
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
    async getUsers() {
      this.dataReady = false;
      await axios
        .get('/api/users')
        .then((res) => {
          if (
            res.data &&
            res.data.code &&
            res.data.code == 200 &&
            res.data.data &&
            res.data.data.users
          ) {
            this.users = res.data.data.users;
          } else {
            // Error
          }
        })
        .catch((err) => {
          // Error
        });
      this.dataReady = true;
    },
    roleClass(slug) {
      if (slug == 'admin') {
        return 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-300';
      } else if (slug == 'super.admin') {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300';
      } else if (slug == 'user') {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300';
      } else if (slug == 'editor') {
        return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300';
      } else if (slug == 'moderator') {
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300';
      }
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    },
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
