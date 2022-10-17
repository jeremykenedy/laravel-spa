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
          <p class="whitespace-no-wrap">
            {{ user.name }}
          </p>
        </div>
      </div>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
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
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <p v-if="user.created_at" class="whitespace-no-wrap">
        {{ parseDisplayDate(user.created_at) }}
      </p>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
        <div
          class="inline rounded px-1 py-0"
          :class="
            user.email_verified_at
              ? 'bg-green-700 text-green-900 dark:text-gray-100'
              : 'bg-red-700 text-red-900 dark:text-gray-100'
          "
        >
          {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
        </div>

        <AppButton
          v-if="!locked"
          :loading="!dataReady"
          class="inline-block rounded bg-transparent px-1 py-1 text-sm font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
          btn-class="bg-transparent dark:bg-transparent"
          btn-class-dark="bg-transparent dark:bg-transparent"
          @click="fireVerification"
        >
          <template #text>
            <i v-if="!user.email_verified_at" class="far fa-circle fa-fw" />
            <i
              v-if="user.email_verified_at"
              class="far fa-circle-check fa-fw"
            />
          </template>
        </AppButton>

        <div v-if="user.email_verified_at" class="inset-0 py-1">
          {{ parseDisplayDate(user.email_verified_at) }}
        </div>
      </span>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <AppButton
        :loading="!dataReady"
        class="inline-block rounded px-5 py-1 text-sm font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        :btn-class="
          locked
            ? 'bg-green-600 focus:bg-indigo-700 active:bg-indigo-800'
            : 'bg-red-600 focus:bg-red-700 active:bg-red-800'
        "
        :btn-hover-class="
          locked
            ? 'hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800'
            : 'hover:bg-red-700 focus:bg-red-700 active:bg-red-800'
        "
        :btn-class-dark="
          locked
            ? 'bg-green-600 focus:bg-indigo-700 active:bg-indigo-800'
            : 'bg-red-600 focus:bg-red-700 active:bg-red-800'
        "
        :btn-hover-class-dark="
          locked
            ? 'hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800'
            : 'hover:bg-red-700 focus:bg-red-700 active:bg-red-800'
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
        </template>
      </AppButton>
    </td>
  </tr>
</template>

<script lang="ts">
import moment from 'moment';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/vue/24/outline';
import CircleSvg from '@components/CircleSvg.vue';
import { mapActions } from 'vuex';

export default {
  name: 'UsersTableRow',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    CircleSvg,
  },
  props: {
    user: { type: Object, required: true },
    dataReady: { type: Boolean, default: false },
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
  watch: {},
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
    fireVerification() {
      const self = this;
      const verified = this.user.email_verified_at;
      let title = '<strong>Verify ' + this.user.name + '?</strong>';
      let html =
        'Are you sure you want to <strong>Verify' +
        this.user.name +
        '</strong>?<small> (' +
        this.user.email +
        ')</small>';
      let icon = 'warning';
      let confirmButtonColor = '#FF0000';
      let denyButtonColor = '#777777';
      let confirmButtonText = 'Verify';
      let denyButtonText = 'Cancel';

      if (verified) {
        title = '<strong>Un-Verify ' + this.user.name + '?</strong>';
        html =
          'Are you sure you want to <strong>Un-Verify' +
          this.user.name +
          '</strong>?<small> (' +
          this.user.email +
          ')</small>';
        icon = 'warning';
        confirmButtonColor = '#FF0000';
        denyButtonColor = '#777777';
        confirmButtonText = 'Un-Verify';
        denyButtonText = 'Cancel';
      }
      self.$swal
        .fire({
          title: title,
          icon: icon,
          html: html,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor: confirmButtonColor,
          denyButtonColor: denyButtonColor,
          confirmButtonText: confirmButtonText,
          denyButtonText: denyButtonText,
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
              message: `Cancelled`,
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
