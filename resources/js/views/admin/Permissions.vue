<template>
  <div
    id="permissions"
    class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200"
  >
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
            :to="{ name: 'permissions' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              Permissions
            </span>
          </router-link>
        </li>
      </ol>
      <PerPage
        v-if="dataReady"
        :items="permissionsData"
        :per-page="perPage"
        class="float-right mb-2"
        style="margin-top: -0.5em"
        @changed="perPageChanged"
      />
    </nav>

    <div class="flex justify-end">
      <AppButton
        v-tippy="'Create Permission'"
        :disabled="showCreatePermissionForm || !dataReady"
        class="mb-2 px-2 py-2 text-sm font-medium"
        @click="triggerCreatePermission"
      >
        <template #text>
          <span v-if="dataReady" class="fas fa-plus fa-fw ml-2 mr-2" />
          <CircleSvg v-if="!dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
          <span class="sr-only">Create New Permission</span>
        </template>
      </AppButton>

      <AppButton
        v-if="showDownload"
        v-tippy="'Download Data'"
        class="mb-2 ml-3 px-2 py-2 text-sm font-medium"
        @click="
          $refs.permissionsTable.downloadCsv((filename = 'permissions.csv'))
        "
      >
        <template #text> Download </template>
      </AppButton>
    </div>

    <v-client-table
      v-if="dataReady"
      ref="permissionsTable"
      :key="permissionsTableKey"
      :data="permissionsData"
      :columns="tableColumns"
      :options="tableOptions"
    >
      <template #name="props">
        <input
          v-model="props.row.name"
          v-tippy="'Edit Permission Name'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(props.row) ? 'disabled' : ''"
          :readonly="locked(props.row)"
          @blur="update('name', props.row)"
        />
      </template>
      <template #slug="props">
        <input
          v-model="props.row.slug"
          v-tippy="'Edit Permission Slug'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(props.row) ? 'disabled' : ''"
          :readonly="locked(props.row)"
          @blur="update('slug', props.row)"
        />
      </template>
      <template #description="props">
        <input
          v-model="props.row.description"
          v-tippy="'Edit Permission Description'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(props.row) ? 'disabled' : ''"
          :readonly="locked(props.row)"
          @blur="update('description', props.row)"
        />
      </template>
      <template #roles="props">
        {{ props.row.roles.length }}
      </template>
      <template #users="props">
        {{ props.row.users.length }}
      </template>
      <template #created_at="props">
        {{
          props.row.created_at ? parseDisplayDate(props.row.created_at) : null
        }}
      </template>
      <template #updated_at="props">
        {{
          props.row.updated_at ? parseDisplayDate(props.row.updated_at) : null
        }}
      </template>
      <template #actions="props">
        <AppButton
          :loading="!dataReady"
          class="mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white"
          :btn-class="
            locked(props.row)
              ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
              : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
          "
          :btn-hover-class="
            locked(props.row)
              ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
              : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
          "
          :btn-class-dark="
            locked(props.row)
              ? 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
              : 'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
          "
          :btn-hover-class-dark="
            locked(props.row)
              ? 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
              : 'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'
          "
          @click="toggleLock(props.row, false)"
        >
          <template #text>
            <LockClosedIcon
              v-if="locked(props.row) && dataReady"
              class="ml-2 mr-2 mt-0 h-4 w-4"
            />
            <LockOpenIcon
              v-if="!locked(props.row) && dataReady"
              class="ml-2 mr-2 mt-0 h-4 w-4"
            />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only"
              >{{ locked(props.row) ? 'Unlock' : 'Lock' }} User Settings</span
            >
          </template>
        </AppButton>

        <AppButton
          v-tippy="'Edit Permission'"
          warning
          :disabled="locked(props.row)"
          :loading="!dataReady"
          class="mr-2 px-1 py-1 text-sm"
          @click="triggerEditPermission(props.row)"
        >
          <template #text>
            <PencilSquareIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only">Edit Permission</span>
          </template>
        </AppButton>

        <AppButton
          v-tippy="'Delete Permission'"
          danger
          :disabled="locked(props.row)"
          :loading="!dataReady"
          class="mr-2 px-1 py-1 text-sm"
          @click="triggerDeletePermission(props.row)"
        >
          <template #text>
            <TrashIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
            <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
            <span class="sr-only">Delete Permission</span>
          </template>
        </AppButton>
      </template>
      <template #afterBody>
        <tfoot>
          <tr>
            <td colspan="10">
              <Pagination
                :pagination="pagination"
                :offset="4"
                @paginate="getPermissions"
              />
            </td>
          </tr>
        </tfoot>
      </template>
    </v-client-table>
    <!-- <AnimatedTableLoader v-if="!dataReady" /> -->

    <PermissionFormModal
      :key="permissionFormKey"
      :showing-form="showCreatePermissionForm"
      :permission="permissionEditing"
      :new-permission="creatingNewPermission"
      :available-roles="availableRoles"
      @close-modal="closePermissionForm"
      @permission-created="permissionCreated"
      @permission-updated="permissionUpdated"
    />
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import {
  ChevronRightIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import PermissionFormModal from '@components/roles/PermissionFormModal.vue';
import CircleSvg from '@components/CircleSvg.vue';
import Pagination from '@components/Pagination.vue';
import PerPage from '@components/PerPage.vue';
// import AnimatedTableLoader from '@components/loaders/AnimatedTableLoader.vue';

export default {
  name: 'Permissions',
  components: {
    ChevronRightIcon,
    PermissionFormModal,
    CircleSvg,
    LockClosedIcon,
    LockOpenIcon,
    PencilSquareIcon,
    TrashIcon,
    PerPage,
    Pagination,
    // AnimatedTableLoader,
  },
  props: {
    showDownload: { type: Boolean, default: false },
  },
  setup() {
    return {};
  },
  data() {
    return {
      dataReady: false,
      permissionsData: null,
      pagination: {},
      perPage: 25,
      showCreatePermissionForm: false,
      permissionEditing: null,
      creatingNewPermission: false,
      permissionFormKey: 432489,
      tableColumns: [
        'id',
        'name',
        'slug',
        'description',
        // 'model',
        'roles',
        'users',
        'created_at',
        'updated_at',
        'actions',
      ],
      tableOptions: {
        name: 'permissionsTable',
        perPage: 25,
        uniqueKey: 'id',
        highlightMatches: true,
        columnsDropdown: false,
        skin: null,
        saveState: true,
        storage: 'local',
        headings: {
          actions: '',
        },
        columnsClasses: {
          id: 'text-sm text-nowrap',
          name: 'text-sm text-nowrap',
          slug: 'text-sm text-nowrap',
          description: 'text-sm text-nowrap',
          model: 'text-sm text-nowrap',
          roles: 'text-sm text-nowrap',
          users: 'text-sm text-nowrap',
          created_at: 'text-sm text-nowrap',
          updated_at: 'text-sm text-nowrap',
          actions: 'text-nowrap',
        },
        texts: {},
        orderBy: {
          column: 'id',
          ascending: false,
        },
        pagination: {
          virtual: true,
        },
        sortIcon: {
          base: 'ml-1 fa-fw fas',
          up: 'fa-sort-up',
          down: 'fa-sort-down',
          is: 'fa-sort',
        },
        filterable: [
          'id',
          'name',
          'slug',
          'description',
          'model',
          'created_at',
          'updated_at',
          'roles',
          'users',
        ],
        sortable: [
          'id',
          'name',
          'slug',
          'description',
          'model',
          'created_at',
          'updated_at',
          'roles',
          'users',
        ],
        dateColumns: ['created_at', 'updated_at'],
        filterByColumn: false,
        editableColumns: ['name'],
      },
      rowsUnlocked: [],
      availableRoles: [],
      rolesDataReady: false,
      permissionsTableKey: 432876,
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
    this.getPermissions();
    this.getRoles();
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
      this.getPermissions();
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
    async getPermissions(updatedPage = null) {
      if (updatedPage) {
        this.pagination.current_page = updatedPage;
      }
      await axios
        .get(
          `/api/permissions-paginated?page=${this.pagination.current_page}&per=${this.perPage}`,
        )
        .then(({ data }) => {
          this.permissionsData = data.data;
          delete data.data;
          this.pagination = data;
          this.dataReady = true;
          this.permissionsTableKey += 1;
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Getting Permissions',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
      this.dataReady = true;
    },
    triggerDeletePermission(row) {
      const self = this;
      const title = '<strong>Delete Permission?</strong>';
      const html = 'Are you sure you want to <strong>Delete';
      `${row.name}</strong>?<h6>This will delete the Permission.</h6>`;
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
            this.deletePermission(row);
          } else if (result.isDenied) {
            self.popToast({
              message: 'Cancelled',
              timer: 2000,
              icon: 'error',
            });
          }
        });
    },
    async deletePermission(value) {
      await axios
        .delete(`/api/permissions/delete/permission/${value.id}`)
        .then(({ data }) => {
          this.permissionsData = this.permissionsData.filter(
            (u) => u.id != data.id,
          );
          this.rowsUnlocked = this.rowsUnlocked.filter((i) => i != value.id);
          this.pagination.total = this.pagination.total - 1;
          this.getPermissions(
            this.pagination.current_page ? this.pagination.current_page : null,
          );
          this.rowsUnlocked = [];
          this.popToast({
            message: 'Successfully Deleted Permission!',
            timer: 5000,
            icon: 'success',
          });
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Deleting Permission',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
    closePermissionForm() {
      this.permissionEditing = null;
      this.creatingNewPermission = false;
      this.showCreatePermissionForm = false;
    },
    triggerEditPermission(permission) {
      this.permissionFormKey += 1;
      this.permissionEditing = permission;
      this.creatingNewPermission = false;
      this.showCreatePermissionForm = true;
    },
    permissionUpdated(data) {
      this.permissionsData = this.permissionsData.map((u) =>
        u.id !== data.id ? u : data,
      );
      this.rowsUnlocked = [];
      this.getPermissions(); // Realign just in case.
      this.closePermissionForm();
    },
    permissionCreated(data) {
      this.permissionsData.push(data);
      this.rowsUnlocked = [];
      this.getPermissions(); // Realign just in case.
      this.closePermissionForm();
    },
    triggerCreatePermission() {
      this.permissionFormKey += 1;
      this.creatingNewPermission = true;
      this.showCreatePermissionForm = true;
      this.permissionEditing = null;
    },
    parseDisplayDate(date) {
      return moment(date).format('MMM Do YYYY, h:mma');
    },
    inputValid(key, row) {
      if (row[key] == '' || row[key] == null || row[key].length == 0) {
        return false;
      }
      if (row[key].length > 0) {
        return true;
      }
      return false;
    },
    async update(key, row) {
      const self = this;
      if (!this.inputValid(key, row)) {
        this.submitting = false;
        this.popToast({
          message: 'Error Validating Permission',
          timer: 5000,
          icon: 'error',
        });
        return;
      }
      await axios
        .patch(`/api/permissions/update-permission/${row.id}`, row)
        .then(({ data }) => {
          self.permissionUpdated(data.permission);
          self.popToast({
            message: `Permission ${data.permission.name} Successfully Updated!`,
            timer: 5000,
            icon: 'success',
          });
          self.submitting = false;
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            const { errors } = response.data;
            self.errors = errors;
            // self.popToast({
            //   message: Object.values(errors).flat().toString(),
            //   timer: 5000,
            //   icon: 'error',
            // });
          } else {
            self.popToast({
              message: 'Error Updating Permission',
              timer: 5000,
              icon: 'error',
            });
          }
          self.submitting = false;
        });
      self.submitting = false;
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
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
