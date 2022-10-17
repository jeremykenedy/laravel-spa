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
    <UsersTable
      :users="users"
      :pagination="pagination"
      :per-page="perPage"
      :data-ready="dataReady"
      @get-users="getUsers"
      @confirm-un-verify-user="confirmUnVerifyUser"
      @confirm-verify-user="confirmVerifyUser"
    />
  </div>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import PerPage from '@components/PerPage.vue';
import UsersTable from '@components/admin/UsersTable.vue';

export default {
  name: 'Users',
  components: {
    ChevronRightIcon,
    PerPage,
    UsersTable,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
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
    async confirmUnVerifyUser(value) {
      await axios
        .post('/api/users/toggleVerify', {
          action: 'unVerifyUser',
          user: value,
        })
        .then(({ data }) => {
          this.users = this.users.map((u) => (u.id !== data.id ? u : data));
          this.popToast({
            message: `Successfully Un-Verified!`,
            timer: 5000,
            icon: 'warning',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Un-Verifying User`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    async confirmVerifyUser(value) {
      await axios
        .post('/api/users/toggleVerify', {
          action: 'confirmVerifyUser',
          user: value,
        })
        .then(({ data }) => {
          this.users = this.users.map((u) => (u.id !== data.id ? u : data));
          this.popToast({
            message: `Successfully Verified!`,
            timer: 5000,
            icon: 'warning',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Verifying User`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
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
