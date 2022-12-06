<template>
  <tr class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100">
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        <div class="h-10 w-10 flex-shrink-0">
          <img
            class="h-full w-full rounded-full"
            :src="user.avatar"
            :alt="user.name"
          />
        </div>
        <div class="ml-3">
          <p class="whitespace-nowrap text-xs">
            {{ user.name }}
          </p>
        </div>
      </div>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500">
      <div class="flex items-center">
        <a
          class="whitespace-nowrap"
          :href="'mailto:' + user.email"
          title="send email"
        >
          {{ user.email }}
        </a>
      </div>
    </td>
    <td
      class="whitespace-nowrap border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500"
    >
      <p>
        <span v-if="user.roles && user.roles.length">
          <span
            v-for="role in user.roles"
            :key="'user_' + user.id + '_role_' + role.id"
          >
            <span
              class="m-1 inline-block cursor-default whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-bold"
              :class="roleClass(role.slug)"
            >
              {{ role.name }}
            </span>
          </span>
        </span>
      </p>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500">
      <p v-if="user.created_at" class="whitespace-nowrap">
        {{ parseDisplayDate(user.created_at) }}
      </p>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500">
      <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
        <div class="whitespace-nowrap">
          <div
            class="inline rounded px-1 py-0"
            :class="
              user.email_verified_at
                ? 'bg-green-700 text-gray-100'
                : 'bg-red-700 text-gray-100'
            "
          >
            {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
          </div>
          <AppButton
            v-if="!user.email_verified_at"
            :disabled="locked"
            :loading="!dataReady"
            class="ml-2 inline-block rounded bg-transparent px-1 py-2 text-xs font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            btn-class="text-yellow-700 dark:bg-transparent hover:bg-gray-200"
            btn-class-dark="bg-transparent dark:bg-transparent dark:hover:bg-gray-900"
            @click="triggerUserConfirmEmail"
          >
            <template #text>
              <span class="far fa-paper fa-fw fa-sm fa-regular fa-envelope" />
            </template>
          </AppButton>
          <AppButton
            :disabled="locked"
            :loading="!dataReady"
            class="ml-1 inline-block rounded bg-transparent px-1 py-2 text-xs font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            btn-class="text-yellow-700 dark:bg-transparent dark:hover:bg-gray-900 hover:bg-gray-200"
            btn-class-dark="bg-transparent dark:bg-transparent dark:hover:bg-gray-900"
            @click="fireVerification"
          >
            <template #text>
              <span
                v-if="!user.email_verified_at"
                class="far fa-circle fa-fw fa-sm"
              />
              <span
                v-if="user.email_verified_at"
                class="far fa-circle-check fa-fw fa-sm"
              />
            </template>
          </AppButton>
        </div>

        <div v-if="user.email_verified_at" class="inset-0 py-1">
          {{ parseDisplayDate(user.email_verified_at) }}
        </div>
      </span>
    </td>
    <td
      class="whitespace-nowrap border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"
    >
      <AppButton
        :loading="!dataReady"
        class="mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white"
        :btn-class="
          locked
            ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
        "
        :btn-hover-class="
          locked
            ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
        "
        :btn-class-dark="
          locked
            ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
        "
        :btn-hover-class-dark="
          locked
            ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
            : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
        "
        @click="locked = !locked"
      >
        <template #text>
          <LockClosedIcon
            v-if="locked && dataReady"
            class="ml-2 mr-2 mt-0 h-4 w-4"
          />
          <LockOpenIcon
            v-if="!locked && dataReady"
            class="ml-2 mr-2 mt-0 h-4 w-4"
          />
          <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
          <span class="sr-only"
            >{{ locked ? 'Unlock' : 'Lock' }} User Settings</span
          >
        </template>
      </AppButton>
      <AppButton
        v-tippy="'Edit User'"
        warning
        :disabled="locked"
        :loading="!dataReady"
        class="mr-2 px-1 py-1 text-sm"
        @click="triggerEditUser"
      >
        <template #text>
          <PencilSquareIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
          <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
          <span class="sr-only">Edit User</span>
        </template>
      </AppButton>

      <AppButton
        v-tippy="'Delete User'"
        danger
        :disabled="locked"
        :loading="!dataReady"
        class="mr-2 px-1 py-1 text-sm"
        @click="triggerDeleteUser"
      >
        <template #text>
          <TrashIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
          <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
          <span class="sr-only">Delete User</span>
        </template>
      </AppButton>

      <AppButton
        v-tippy="'Impersonate User'"
        secondary
        :disabled="locked"
        :loading="!dataReady"
        class="mr-2 px-1 py-1 text-sm"
        @click="triggerImpersonateUser"
      >
        <template #text>
          <UserCircleIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
          <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
          <span class="sr-only">Impersonate User</span>
        </template>
      </AppButton>
    </td>
  </tr>
</template>

<script lang="ts">
import moment from 'moment';
import {
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline';
import CircleSvg from '@components/CircleSvg.vue';
import { mapActions } from 'vuex';

export default {
  name: 'UsersTableRow',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    CircleSvg,
    PencilSquareIcon,
    TrashIcon,
    UserCircleIcon,
  },
  props: {
    user: { type: Object, required: true },
    dataReady: { type: Boolean, default: false },
    availableRoles: { type: Array, default: null },
    lockJiggled: { type: Boolean, default: false },
  },
  setup() {
    return {};
  },
  data() {
    return {
      locked: true,
    };
  },
  computed: {},
  watch: {
    lockJiggled(jiggled) {
      this.locked = true;
    },
  },
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    roleClass(slug) {
      if (slug == 'admin') {
        return 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-gray-100';
      }
      if (slug == 'super.admin') {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-gray-100';
      }
      if (slug == 'user') {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-gray-100';
      }
      if (slug == 'editor') {
        return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-gray-100';
      }
      if (slug == 'moderator') {
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-gray-100';
      }
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    },
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
    fireVerification() {
      const self = this;
      const verified = this.user.email_verified_at;
      let title = `<strong>Verify ${this.user.name}?</strong>`;
      let html = 'Are you sure you want to <strong>Verify';
      `${this.user.name}</strong>?<small> (${this.user.email})</small>`;
      let icon = 'warning';
      let confirmButtonColor = '#FF0000';
      let denyButtonColor = '#777777';
      let confirmButtonText = 'Verify';
      let denyButtonText = 'Cancel';

      if (verified) {
        title = `<strong>Un-Verify ${this.user.name}?</strong>`;
        html = 'Are you sure you want to <strong>Un-Verify';
        `${this.user.name}</strong>?<small> (${this.user.email})</small>`;
        icon = 'warning';
        confirmButtonColor = '#FF0000';
        denyButtonColor = '#777777';
        confirmButtonText = 'Un-Verify';
        denyButtonText = 'Cancel';
      }
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
            if (verified) {
              this.$emit('confirmUnVerifyUser', this.user);
            } else {
              this.$emit('confirmVerifyUser', this.user);
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
    triggerEditUser() {
      this.$emit('editUser', this.user);
    },
    triggerDeleteUser() {
      const self = this;
      const title = `<strong>Delete ${this.user.name}?</strong>`;
      const html = 'Are you sure you want to <strong>Delete';
      `${this.user.name}</strong>?<small> (${this.user.email})</small><h6>This will delete the user.</h6>`;
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
            this.$emit('deleteUser', this.user);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
    triggerUserConfirmEmail() {
      const self = this;
      const title = `<strong>Send ${this.user.name} verification email</strong>`;
      const html = 'Are you sure you want to <strong>Send ';
      `${this.user.name}<small> (${this.user.email})</small> a Verification Email</strong>?<h6>This will send the user an email.</h6>`;
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
            this.$emit('sendUserVerification', this.user);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
    triggerImpersonateUser() {
      this.$emit('impersonateUserTriggered', this.user);
    },
  },
};
</script>
