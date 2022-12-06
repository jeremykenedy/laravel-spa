<template>
  <tr class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100">
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        {{ role.id }}
      </div>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center whitespace-nowrap">
        {{ role.name }}
      </div>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        {{ role.slug }}
      </div>
    </td>
    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center text-xs">
        {{ role.description }}
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        {{ role.level }}
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        <span v-if="role.created_at" class="whitespace-nowrap text-xs">
          {{ parseDisplayDate(role.created_at) }}
        </span>
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center">
        <span v-if="role.updated_at" class="whitespace-nowrap text-xs">
          {{ parseDisplayDate(role.updated_at) }}
        </span>
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div
        v-if="role && role.users && role.users.length >= 0"
        class="flex items-center"
      >
        {{ role.users.length }}
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div
        v-if="role && role.permissions && role.permissions.length >= 0"
        class="flex items-center"
      >
        {{ role.permissions.length }}
      </div>
    </td>

    <td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">
      <div class="flex items-center whitespace-nowrap">
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
          warning
          :disabled="locked"
          :loading="!dataReady"
          class="mr-2 px-1 py-1 text-sm"
          @click="triggerEditRole"
        >
          <template #text>
            <PencilSquareIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only">Edit Role</span>
          </template>
        </AppButton>

        <AppButton
          danger
          :disabled="locked || (role && role.users && role.users.length > 0)"
          :loading="!dataReady"
          class="mr-2 px-1 py-1 text-sm"
          @click="triggerDeleteRole"
        >
          <template #text>
            <TrashIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only">Delete Role</span>
          </template>
        </AppButton>
      </div>
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
} from '@heroicons/vue/24/outline';
import CircleSvg from '@components/CircleSvg.vue';
import { mapActions } from 'vuex';

export default {
  name: 'RolesTableRow',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    CircleSvg,
    PencilSquareIcon,
    TrashIcon,
  },
  props: {
    role: { type: Object, required: true },
    dataReady: { type: Boolean, default: false },
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
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
    triggerEditRole() {
      this.$emit('editRole', this.role);
    },
    triggerDeleteRole() {
      const self = this;
      const title = `<strong>Delete ${this.role.name}?</strong>`;
      const html = 'Are you sure you want to <strong>Delete';
      `${this.role.name}</strong>?<h6>This will delete the role.</h6>`;
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
            this.$emit('deleteRole', this.role);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
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
