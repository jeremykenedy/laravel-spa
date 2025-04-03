<template>
  <div id="users" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="users.index" :text="$t('users')" />
    </AdminBreadcrumbContainer>

    <AppButton
      v-if="authenticated && user && userCan('create.users')"
      v-tippy="$t('create_new_user')"
      :disabled="showCreateUserForm || !dataReady"
      class="float-right mb-2 px-2 py-2 text-sm font-medium"
      secondary
      @click="triggerCreateUser"
    >
      <template #text>
        <UserPlusIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
        <CircleSvg v-if="!dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
        <span class="sr-only">{{ $t('create_new_user') }}</span>
      </template>
    </AppButton>

    <div
      v-if="authenticated && user && (userIs('superadmin') || userCan('view.users'))"
      class="mt-2 grid grid-cols-1 float-left clear-both mb-4 w-full sm:w-6/12 lg:w-4/12"
    >
      <input
        id="search_users"
        v-model="search_global"
        type="text"
        name="search_users"
        class="col-start-1 row-start-1 block w-full rounded-md placeholder:text-gray-400 pl-9 dark:bg-gray-900 dark:text-gray-200 border-0"
        :placeholder="$t('search_users') + '...'"
        @keydown.enter="getUsers()"
      />
      <MagnifyingGlassIcon
        class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-600 sm:size-4"
      />
    </div>

    <easy-data-table
      v-if="dataReady && authenticated && user && userCan('view.users')"
      :key="usersTableKey"
      ref="usersTable"
      v-model:server-options="paginationOptions"
      :headers="tableHeaders"
      :items="users"
      :server-items-length="usersLength"
      :loading="loading"
      :rows-items="perPage"
      no-hover
      must-sort
      body-item-class-name="text-xs"
      class="clear-both"
    >
      <template #item-name="item">
        <div class="flex">
          <img
            v-if="item && item.avatar"
            :src="item.avatar"
            :alt="item.name"
            class="h-8 w-8 cursor-default rounded-full border shadow float-left"
          />
          <UserCircleIcon v-else class="mt-0 h-8 w-8 cursor-default shadow float-left" />

          <input
            v-model="item.name"
            v-tippy="'Edit Name'"
            type="text"
            class="rounded border-0 text-sm mr-3 px-1 ml-2"
            style="field-sizing: content"
            :class="locked(item) ? 'disabled bg-transparent' : 'bg-gray-100 dark:bg-gray-800'"
            :readonly="locked(item)"
            @blur="update('name', item)"
          />
        </div>
      </template>

      <template #item-email="item">
        <a
          v-if="locked(item)"
          v-tippy="'Send email to ' + item.email"
          class="rounded border-0 text-sm whitespace-nowrap mr-2 pl-1"
          :href="'mailto:' + item.email"
        >
          {{ item.email }}
        </a>
        <input
          v-if="!locked(item)"
          v-model="item.email"
          v-tippy="'Edit Email'"
          type="text"
          class="rounded border-0 text-sm whitespace-nowrap mr-2 pl-1"
          style="field-sizing: content"
          :class="locked(item) ? 'disabled bg-transparent' : 'bg-gray-100 dark:bg-gray-800'"
          :readonly="locked(item)"
          @blur="update('email', item)"
        />
      </template>

      <template #item-theme_dark="item">
        <AppButton
          v-tippy="item.theme_dark ? $t('toggle_theme_light') : $t('toggle_theme_dark')"
          :disabled="locked(item)"
          :loading="!dataReady"
          class="mr-2 px-1 py-1 text-sm"
          @click="update('theme_dark', item)"
        >
          <template #text>
            <SunIcon v-if="!item.theme_dark" class="h-5 w-5 ml-4" />
            <MoonIcon v-if="item.theme_dark" class="h-5 w-5 ml-4" />
          </template>
        </AppButton>
      </template>

      <template #item-roles="item">
        <RolesBadges v-if="item && item.roles" class="mr-1 mb-1" :roles="item.roles" />
      </template>

      <template #item-permissions="item">
        <div v-if="item.permissions">
          <div
            v-for="permission in item.permissions"
            :key="permission.id"
            :value="permission"
            class="mr-1 mb-1 cursor-default rounded text-xs font-medium whitespace-nowrap"
          >
            <small>
              {{ permission.name }}
            </small>
          </div>
        </div>
      </template>

      <template #item-email_verified_at="item">
        <div class="whitespace-nowrap">
          <div class="text-xs text-center">
            {{ item.email_verified_at ? parseDisplayDate(item.email_verified_at) : $t('not_verified') }}
          </div>
          <div class="ml-auto mr-auto text-center">
            <div class="text-center ml-auto mr-auto">
              <AppButton
                v-tippy="item.email_verified_at ? 'Toggle to unverified' : 'Toggle to verified'"
                :loading="!dataReady"
                :disabled="locked(item)"
                class="p-0 mr-1"
                @click.prevent="toggleVerify(item)"
              >
                <template #text>
                  <i
                    v-tippy="locked(item) ? (item.email_verified_at ? 'Verified' : 'Un-Verified') : null"
                    class="fa-solid text-center fa-1x"
                    :class="item.email_verified_at ? 'fa-square-check text-green-500' : 'fa-square-xmark text-red-500'"
                  />
                </template>
              </AppButton>

              <AppButton
                v-if="!item.email_verified_at"
                v-tippy="'Send ' + item.name + ' email to verify'"
                :loading="!dataReady"
                :disabled="locked(item)"
                @click="triggerUserConfirmEmail(item)"
              >
                <template #text>
                  <EnvelopeIcon class="mt-0 h-4 w-4 text-gray-700 dark:text-gray-400" />
                </template>
              </AppButton>
            </div>
          </div>
        </div>
      </template>

      <template #item-created_at="item">
        <div class="text-xs text-center">
          {{ item.created_at ? parseDisplayDate(item.created_at) : null }}
        </div>
      </template>

      <template #item-updated_at="item">
        <div class="text-xs text-center">
          {{ item.updated_at ? parseDisplayDate(item.updated_at) : null }}
        </div>
      </template>

      <template #item-actions="item">
        <div class="whitespace-nowrap">
          <AppButton
            v-if="authenticated && user && (userIs('superadmin') || userCan('edit.users'))"
            :loading="!dataReady"
            class="mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white"
            :btn-class="
              locked(item)
                ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
                : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            "
            :btn-hover-class="
              locked(item)
                ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
                : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            "
            :btn-class-dark="
              locked(item)
                ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
                : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            "
            :btn-hover-class-dark="
              locked(item)
                ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
                : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            "
            @click="toggleLock(item, false)"
          >
            <template #text>
              <LockClosedIcon v-if="locked(item) && dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <LockOpenIcon v-if="!locked(item) && dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
              <span class="sr-only">{{ locked(item) ? 'Unlock' : 'Lock' }} {{ $t('user_settings') }}</span>
            </template>
          </AppButton>

          <AppButton
            v-if="authenticated && user && (userIs('superadmin') || userCan('edit.users'))"
            v-tippy="$t('edit_user')"
            warning
            :disabled="locked(item)"
            :loading="!dataReady"
            class="mr-2 px-1 py-1 text-sm"
            @click="triggerEditUser(item)"
          >
            <template #text>
              <PencilSquareIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
              <span class="sr-only">{{ $t('edit_user') }}</span>
            </template>
          </AppButton>

          <AppButton
            v-if="authenticated && user && (userIs('superadmin') || userCan('delete.users'))"
            v-tippy="$t('delete_user')"
            danger
            :disabled="locked(item)"
            :loading="!dataReady"
            class="mr-2 px-1 py-1 text-sm"
            @click="triggerDeleteUser(item)"
          >
            <template #text>
              <TrashIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
              <span class="sr-only">{{ $t('delete_user') }}</span>
            </template>
          </AppButton>

          <ImpersonateUser
            v-if="user.id != item.id && authenticated && user && (userIs('superadmin') || userCan('impersonate.users'))"
            :person="item"
            :loading="!dataReady"
            :disabled="!dataReady || locked(item)"
            class="mr-2 px-1 py-1 text-sm"
          />
        </div>
      </template>
    </easy-data-table>

    <UserFormModal
      :key="userFormKey"
      :showing-form="showCreateUserForm"
      :user-editing="userEditing"
      :new-user="creatingNewUser"
      :available-roles="availableRoles"
      :available-permissions="availablePermissions"
      @close-modal="closeUserForm"
      @user-created="userCreated"
      @user-updated="userUpdated"
    />
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useAuth from '@composables/auth';
import axios from 'axios';
import UserFormModal from '@components/users/UserFormModal.vue';
import CircleSvg from '@components/common/CircleSvg.vue';
// import PerPage from '@components/common/PerPage.vue';
import RolesBadges from '@components/roles/RolesBadges.vue';
import { inputNotEmpty, validateEmail, parseDisplayDate } from '@services/utilities';
import ImpersonateUser from '@components/common/ImpersonateUser.vue';

import {
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'UsersPage',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    PencilSquareIcon,
    TrashIcon,
    CircleSvg,
    UserPlusIcon,
    // PerPage,
    UserFormModal,
    RolesBadges,
    UserCircleIcon,
    SunIcon,
    MoonIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    EasyDataTable: window['vue3-easy-data-table'],
    ImpersonateUser,
  },
  data() {
    return {
      users: [],
      tableHeaders: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'NAME', value: 'name', sortable: true },
        { text: 'EMAIL', value: 'email', sortable: true },
        { text: 'THEME', value: 'theme_dark', width: 130, sortable: true },
        { text: 'ROLES', value: 'roles', width: 140 },
        { text: 'PERMISSIONS', value: 'permissions' },
        {
          text: 'VERIFIED AT',
          value: 'email_verified_at',
          sortable: true,
          width: 140,
        },
        { text: 'CREATED AT', value: 'created_at', sortable: true, width: 140 },
        { text: 'UPDATED AT', value: 'updated_at', sortable: true, width: 140 },
        { text: 'ACTIONS', value: 'actions' },
      ],
      dataReady: false,
      showCreateUserForm: false,
      userEditing: null,
      creatingNewUser: false,
      usersTableKey: 4234655,
      userFormKey: 432489,
      availableRoles: [],
      rolesDataReady: false,
      availablePermissions: [],
      permissionsDataReady: false,
      rowsUnlocked: [],
      usersLength: 0,
      loading: false,
      paginationOptions: {
        page: 1,
        rowsPerPage: 25,
        sortBy: 'id',
        sortType: 'asc',
      },
      perPage: [10, 25, 50, 100, 500, 1000, 10000],
      search_global: '',
    };
  },
  mounted() {
    this.getRoles();
    this.getPermissions();
    this.getUsers();
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
  },
  watch: {
    paginationOptions: {
      handler(newValue, oldValue) {
        this.getUsers();
      },
      deep: true,
      immediate: true,
    },
    search_global: {
      handler(newValue, oldValue) {
        const self = this;
        setTimeout(function () {
          self.getUsers();
        }, 600);
      },
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan', 'getUser']),
    ...mapActions(useAuth, ['verifyResend', 'impersonateUser']),
    ...mapActions(useToastStore, ['popToast']),
    inputNotEmpty,
    validateEmail,
    parseDisplayDate,
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
    async getUsers() {
      this.loading = true;
      if (this.authenticated && this.user && this.userCan('view.users')) {
        await axios
          .get(
            `/api/users?page=${this.paginationOptions.page}&per=${this.paginationOptions.rowsPerPage}&sortBy=${this.paginationOptions.sortBy}&sortType=${this.paginationOptions.sortType}&search=${this.search_global}`,
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
      }
      this.dataReady = true;
    },
    async getRoles() {
      this.rolesDataReady = false;
      if (this.authenticated && this.user && this.userCan('view.roles')) {
        await axios
          .get('/api/roles')
          .then(({ data }) => {
            this.availableRoles = data.roles;
          })
          .catch(({ response }) => {
            this.popToast({
              message: 'Error Getting Roles',
              timer: 5000,
              icon: 'error',
            });
          });
      }
      this.rolesDataReady = true;
    },
    async getPermissions() {
      this.permissionsDataReady = false;

      if (this.authenticated && this.user && this.userCan('view.permissions')) {
        await axios
          .get('/api/permissions')
          .then(({ data }) => {
            this.availablePermissions = data.permissions;
            this.permissionsDataReady = true;
          })
          .catch(({ response }) => {
            this.popToast({
              message: 'Error Getting Permissions',
              timer: 5000,
              icon: 'error',
            });
            this.permissionsDataReady = true;
          });
      }

      this.permissionsDataReady = true;
    },
    async update(key, row) {
      const self = this;
      let update = false;
      let cu = this.users.find((u) => u.id === row.id);

      if (key == 'email') {
        if (cu.email != row.email) {
          update = true;
        }
      }

      if (key == 'name') {
        if (cu.name != row.name) {
          update = true;
        }
      }

      if (key == 'theme_dark') {
        row.theme_dark = !row.theme_dark;
        update = true;
      }

      if (update) {
        if (key != 'theme_dark') {
          if (!this.inputNotEmpty(key, row)) {
            this.popToast({
              message: key + ' is required',
              timer: 5000,
              icon: 'error',
            });
            return;
          }
        }
        if (key == 'email') {
          const emailValid = await this.validateEmail(row[key]);
          if (!emailValid) {
            this.popToast({
              message: 'Invalid Email',
              timer: 5000,
              icon: 'error',
            });
            return;
          }
        }

        row['roles'] = row['roles'].map((value) => value.id);

        await axios
          .patch(`/api/users/update-user/${row.id}`, row)
          .then(({ data }) => {
            self.userUpdated(data.user);
            self.popToast({
              message: `User ${data.user.name} Successfully Updated!`,
              timer: 5000,
              icon: 'success',
            });
            if (row.id == this.user.id) {
              self.getUser();
            }
            self.submitting = false;
          })
          .catch(({ response }) => {
            if (response.status === 422) {
              const { errors } = response.data;
              self.errors = errors;
              self.popToast({
                message: Object.values(errors).flat().toString(),
                timer: 5000,
                icon: 'error',
              });
            } else {
              self.popToast({
                message: 'Error Updating User',
                timer: 5000,
                icon: 'error',
              });
            }
            self.submitting = false;
          });
        self.submitting = false;
      }
    },
    triggerUpdateUser(user) {
      this.creatingNewUser = false;
      this.userEditing = user;
    },
    closeUserForm() {
      this.userEditing = null;
      this.creatingNewUser = false;
      this.showCreateUserForm = false;
    },
    triggerEditUser(user) {
      this.userFormKey += 1;
      this.userEditing = user;
      this.creatingNewUser = false;
      this.showCreateUserForm = true;
    },
    userUpdated(data) {
      this.users = this.users.map((u) => (u.id !== data.id ? u : data));
      // this.getUsers(); // Realign just in case.
      this.toggleLock(data, false);
      this.closeUserForm();
    },
    userCreated(data) {
      this.users.push(data);
      this.getUsers(); // Realign just in case.
      this.closeUserForm();
    },
    triggerCreateUser() {
      this.userFormKey += 1;
      this.creatingNewUser = true;
      this.showCreateUserForm = true;
      this.userEditing = null;
    },
    triggerUserConfirmEmail(user) {
      const self = this;
      const title = `<strong>Send ${user.name} verification email</strong>`;
      const html = `Are you sure you want to <strong>Send ${user.name}<small> (${user.email})</small> a Verification Email</strong>?<h6>This will send the user an email.</h6>`;
      const icon = 'info';
      const confirmButtonColor = '#10b981';
      const denyButtonColor = '#777777';
      const confirmButtonText = 'Confirm Send';
      const denyButtonText = 'Cancel';
      self.$swal
        .fire({
          title,
          icon,
          html,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor,
          denyButtonColor,
          confirmButtonText,
          denyButtonText,
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.sendUserVerification(user);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
    triggerDeleteUser(user) {
      const self = this;
      const title = `<strong>Delete ${user.name}?</strong>`;
      const html = `Are you sure you want to <strong>Delete ${user.name}</strong>?<small> (${user.email})</small><h6>This will delete the user.</h6>`;
      const icon = 'warning';
      const confirmButtonColor = '#FF0000';
      const denyButtonColor = '#777777';
      const confirmButtonText = 'Delete';
      const denyButtonText = 'Cancel';
      self.$swal
        .fire({
          title,
          icon,
          html,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor,
          denyButtonColor,
          confirmButtonText,
          denyButtonText,
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.deleteUser(user);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
    toggleVerify(user) {
      const self = this;
      const title = '<strong>Toggle Verfification</strong>';
      const html = `Are you sure you want to <strong> ${user.email_verified_at ? 'Un-Verify' : 'Verify'}</strong> ${user.name}?`;
      const icon = 'warning';
      const confirmButtonText = 'Confirm';
      const denyButtonText = 'Cancel';
      self.$swal
        .fire({
          title,
          icon,
          html,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonText,
          denyButtonText,
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (user.email_verified_at) {
              self.confirmUnVerifyUser(user);
            } else {
              self.confirmVerifyUser(user);
            }
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
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
