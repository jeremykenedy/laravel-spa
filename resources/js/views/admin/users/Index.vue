<template>
  <div id="users" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 mt-2 ml-2 text-sm font-semibold float-left" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'dashboard' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            {{ $t('dashboard') }}
          </router-link>
        </li>

        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-if="authenticated" v-slot="{ isActive }" :to="{ name: 'users.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('users') }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <AppButton v-tippy="'Create User'" :disabled="showCreateUserForm || !dataReady"
      class="float-right mb-2 px-2 py-2 text-sm font-medium" secondary @click="triggerCreateUser">
      <template #text>
        <UserPlusIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
        <CircleSvg v-if="!dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
        <span class="sr-only">Create New User</span>
      </template>
    </AppButton>

    <easy-data-table v-if="dataReady" :headers="tableHeaders" v-model:server-options="paginationOptions" :items="users"
      ref="usersTable" :key="usersTableKey" :server-items-length="usersLength" :loading="loading" :rows-items="perPage"
      no-hover must-sort body-item-class-name="text-xs" class="clear-both">

      <template #item-name="item">
        <div class="flex">
          <img v-if="item && item.avatar" :src="item.avatar" :alt="item.name"
            class="h-8 w-8 cursor-default rounded-full border shadow float-left" />
          <UserCircleIcon v-else class="mt-0 h-8 w-8 cursor-default shadow float-left" />

          <input v-model="item.name" v-tippy="'Edit Name'" type="text"
            class="rounded border-0 bg-transparent text-sm mr-3 px-1 ml-2" style="field-sizing: content;"
            :class="locked(item) ? 'disabled' : ''" :readonly="locked(item)" @blur="update('name', item)" />
        </div>
      </template>

      <template #item-email="item">
        <input v-model="item.email" v-tippy="'Edit Email'" type="text"
          class="rounded border-0 bg-transparent text-sm whitespace-nowrap mr-2 pl-1" style="field-sizing: content;"
          :class="locked(item) ? 'disabled' : ''" :readonly="locked(item)" @blur="update('email', item)" />
      </template>

      <template #item-theme_dark="item">
        <SunIcon v-if="!item.theme_dark" v-tippy="'Light Mode'" class="h-5 w-5 ml-3" />
        <MoonIcon v-if="item.theme_dark" v-tippy="'Dark Mode'" class="h-5 w-5 ml-3" />
      </template>

      <template #item-roles="item">
        <RolesBadges v-if="item && item.roles" class="mr-1 mb-1" :roles="item.roles" />
      </template>

      <template #item-permissions="item">
        <div v-if="item.permissions">
          <div v-for="( permission, index ) in  item.permissions " :value="permission" :key="permission.id"
            class="mr-1 mb-1 cursor-default rounded text-xs font-medium whitespace-nowrap">
            <small>
              {{ permission.name }}
            </small>
          </div>
        </div>
      </template>

      <template #item-email_verified_at="item" class="whitespace-nowrap">
        <span class="text-xs">
          {{ item.email_verified_at ? parseDisplayDate(item.email_verified_at) : null }}
        </span>
      </template>

      <template #item-created_at="item">
        <span class="text-xs">
          {{ item.created_at ? parseDisplayDate(item.created_at) : null }}
        </span>
      </template>

      <template #item-updated_at="item">
        <span class="text-xs">
          {{ item.updated_at ? parseDisplayDate(item.updated_at) : null }}
        </span>
      </template>

      <template #item-actions="item">
        <AppButton :loading="!dataReady"
          class="mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white"
          :btn-class="locked(item)
            ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            " :btn-hover-class="locked(item)
    ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    " :btn-class-dark="locked(item)
    ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    " :btn-hover-class-dark="locked(item)
    ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
    " @click="toggleLock(item, false)">
          <template #text>
            <LockClosedIcon v-if="locked(item) && dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <LockOpenIcon v-if="!locked(item) && dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only">{{ locked(item) ? 'Unlock' : 'Lock' }} User Settings</span>
          </template>
        </AppButton>

      </template>

    </easy-data-table>



    <!--
    <UsersTable :users="users" :pagination="pagination" :per-page="perPage" :data-ready="dataReady"
      :available-roles="availableRoles" :lock-jiggled="lockJigled" @get-users="getUsers"
      @confirm-un-verify-user="confirmUnVerifyUser" @confirm-verify-user="confirmVerifyUser" @delete-user="deleteUser"
      @edit-user="editUser" @send-user-verification="sendUserVerification"
      @impersonate-user-triggered="impersonateUserTriggered" />
    -->

    <UserFormModal :key="userFormKey" :showing-form="showCreateUserForm" :user="userEditing" :new-user="creatingNewUser"
      :available-roles="availableRoles" @close-modal="closeUserForm" @user-created="userCreated"
      @user-updated="userUpdated" />

  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import moment from 'moment';
import axios from 'axios';
import UserFormModal from '@components/users/UserFormModal.vue';
import CircleSvg from '@components/common/CircleSvg.vue';
import PerPage from '@components/common/PerPage.vue';
import RolesBadges from '@components/roles/RolesBadges.vue';
import {
  ChevronRightIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'Users',
  components: {
    ChevronRightIcon,
    LockClosedIcon,
    LockOpenIcon,
    PencilSquareIcon,
    TrashIcon,
    CircleSvg,
    UserPlusIcon,
    PerPage,
    UserFormModal,
    RolesBadges,
    UserCircleIcon,
    SunIcon,
    MoonIcon,
    EasyDataTable: window['vue3-easy-data-table'],
  },
  watch: {
    paginationOptions: {
      handler(newValue, oldValue) {
        this.getUsers();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
  },
  data() {
    return {
      users: [],
      tableHeaders: [
        { text: "ID", value: "id", sortable: true },
        { text: "NAME", value: "name", sortable: true },
        { text: "EMAIL", value: "email", sortable: true },
        { text: "THEME", value: "theme_dark", sortable: true },
        { text: "ROLES", value: "roles", width: 150 },
        { text: "PERMISSIONS", value: "permissions" },
        { text: "VERIFIED AT", value: "email_verified_at", sortable: true, width: 140 },
        { text: "CREATED AT", value: "created_at", sortable: true, width: 140 },
        { text: "UPDATED AT", value: "updated_at", sortable: true, width: 140 },
        { text: "ACTIONS", value: "actions" },
      ],
      dataReady: false,
      showCreateUserForm: false,
      userEditing: null,
      creatingNewUser: false,
      usersTableKey: 4234655,
      userFormKey: 432489,
      availableRoles: [],
      rolesDataReady: false,
      rowsUnlocked: [],
      usersLength: 0,
      loading: false,
      paginationOptions: {
        page: 1,
        rowsPerPage: 25,
        sortBy: 'id',
        sortType: 'asc',
      },
      perPage: [
        10, 25, 50, 100, 500, 1000, 'All'
      ],
    };
  },
  mounted() {
    this.getRoles();
    this.getUsers();
  },
  methods: {
    ...mapActions(useAuthStore, [
      'userIs',
      'userCan',
      // 'verifyResend',
      // 'impersonateUser',
    ]),
    ...mapActions(useToastStore, [
      'popToast',
    ]),
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
    async getUsers() {
      this.loading = true;
      await axios
        .get(
          `/api/users?page=${this.paginationOptions.page}&per=${this.paginationOptions.rowsPerPage}&sortBy=${this.paginationOptions.sortBy}&sortType=${this.paginationOptions.sortType}`,
        )
        .then(({ data }) => {
          this.usersLength = data.total;
          this.paginationOptions.page = data.current_page;
          this.users = data.data;
          delete data.data;
          this.dataReady = true;
          this.loading = false;
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Getting Users',
            timer: 5000,
            icon: 'error',
          });
          this.loading = false;
          this.dataReady = true;
        });
      this.dataReady = true;
    },
    async confirmUnVerifyUser(value) {
      await axios
        .post('/api/users/toggle-verify', {
          action: 'unVerifyUser',
          user: value,
        })
        .then(({ data }) => {
          this.users = this.users.map((u) => (u.id !== data.id ? u : data));
          this.popToast({
            message: 'Successfully Un-Verified!',
            timer: 5000,
            icon: 'warning',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Un-Verifying User',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    async confirmVerifyUser(value) {
      await axios
        .post('/api/users/toggle-verify', {
          action: 'confirmVerifyUser',
          user: value,
        })
        .then(({ data }) => {
          this.users = this.users.map((u) => (u.id !== data.id ? u : data));
          this.popToast({
            message: 'Successfully Verified!',
            timer: 5000,
            icon: 'success',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Verifying User',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    async deleteUser(value) {
      await axios
        .delete(`/api/users/delete/user/${value.id}`)
        .then(({ data }) => {
          this.users = this.users.filter((u) => u.id != data.id);
          this.popToast({
            message: 'Successfully Deleted!',
            timer: 5000,
            icon: 'success',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Deleting User',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    async getRoles() {
      this.rolesDataReady = false;
      await axios
        .get('/api/roles')
        .then(({ data }) => {
          this.availableRoles = data.roles;
          this.rolesDataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Getting Roles',
            timer: 5000,
            icon: 'error',
          });
          this.rolesDataReady = true;
        });
    },
    triggerCreateUser() {
      this.userFormKey += 1;
      this.creatingNewUser = true;
      this.showCreateUserForm = true;
      this.userEditing = null;
    },
    triggerUpdateUser(user) {
      this.creatingNewUser = false;
      this.userEditing = user;
    },
    userCreated(data) {
      this.users.push(data);
      this.getUsers(); // Realign just in case.
      this.closeUserForm();
    },
    userUpdated(data) {
      this.users = this.users.map((u) => (u.id !== data.id ? u : data));
      this.getUsers(); // Realign just in case.
      this.jiggleTheLock();
      this.closeUserForm();
    },



    toggleLock(row, reset = false) {
      const found = this.rowsUnlocked.find((i) => i == row.id);
      if (reset) {
        this.rowsUnlocked = [];
        this.rowsUnlocked.push(row.id);
      } else if (found) {
        this.rowsUnlocked = this.rowsUnlocked.filter((i) => i != row.id);
      } else {
        this.rowsUnlocked.push(row.id);
      }
    },
    locked(row) {
      const found = this.rowsUnlocked.find((obj) => obj == row.id);
      if (found) {
        return false;
      }
      return true;
    },


    closeUserForm() {
      this.userEditing = null;
      this.creatingNewUser = false;
      this.showCreateUserForm = false;
    },
    editUser(user) {
      this.userFormKey += 1;
      this.userEditing = user;
      this.creatingNewUser = false;
      this.showCreateUserForm = true;
    },
    async sendUserVerification(user) {
      try {
        await this.verifyResend({ id: user.id }).then((response) => {
          this.popToast({
            message: 'Email sent.',
            timer: 5000,
            icon: 'success',
          });
        });
      } catch (e) {
        this.popToast({
          message: 'An errored, please try again later.',
          timer: 5000,
          icon: 'error',
        });
      }
    },
    async impersonateUserTriggered(user) {
      try {
        await this.impersonateUser({ user }).then((response) => {
          //
        });
      } catch (e) {
        this.popToast({
          message: 'Unable To Impersonate User',
          timer: 5000,
          icon: 'error',
        });
      }
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
