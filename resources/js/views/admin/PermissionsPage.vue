<template>
  <div id="permissions" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="permissions.index" :text="$t('permissions')" />
    </AdminBreadcrumbContainer>

    <div class="flex justify-end">
      <AppButton
        v-tippy="'Create Permission'"
        secondary
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
    </div>

    <easy-data-table
      v-if="dataReady"
      ref="permissionsTable"
      :key="permissionsTableKey"
      :headers="tableHeaders"
      :items="permissionsData"
      :loading="!dataReady"
      no-hover
      body-item-class-name="text-xs"
    >
      <template #item-name="item">
        <input
          v-model="item.name"
          v-tippy="'Edit Permission Name'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(item) ? 'disabled' : ''"
          :readonly="locked(item)"
          @blur="update('name', item)"
        />
      </template>
      <template #item-slug="item">
        <input
          v-model="item.slug"
          v-tippy="'Edit Permission Slug'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(item) ? 'disabled' : ''"
          :readonly="locked(item)"
          @blur="update('slug', item)"
        />
      </template>
      <template #item-description="item">
        <input
          v-model="item.description"
          v-tippy="'Edit Permission Description'"
          type="text"
          class="rounded border-0 bg-transparent text-sm"
          :class="locked(item) ? 'disabled' : ''"
          :readonly="locked(item)"
          @blur="update('description', item)"
        />
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
        <div class="text-nowrap">
          <AppButton
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
              <span class="sr-only">{{ locked(item) ? 'Unlock' : 'Lock' }} User Settings</span>
            </template>
          </AppButton>

          <AppButton
            v-tippy="'Edit Permission'"
            warning
            :disabled="locked(item)"
            :loading="!dataReady"
            class="mr-2 px-1 py-1 text-sm"
            @click="triggerEditPermission(item)"
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
            :disabled="locked(item)"
            :loading="!dataReady"
            class="mr-2 px-1 py-1 text-sm"
            @click="triggerDeletePermission(item)"
          >
            <template #text>
              <TrashIcon v-if="dataReady" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <CircleSvg v-if="!dataReady" class="mr-2 h-3 w-3" />
              <span class="sr-only">Delete Permission</span>
            </template>
          </AppButton>
        </div>
      </template>
    </easy-data-table>

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

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import moment from 'moment';
import axios from 'axios';
import CircleSvg from '@components/common/CircleSvg.vue';
import PermissionFormModal from '@components/roles/PermissionFormModal.vue';
import { LockClosedIcon, LockOpenIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'PermissionsPage',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    PencilSquareIcon,
    TrashIcon,
    CircleSvg,
    PermissionFormModal,
    EasyDataTable: window['vue3-easy-data-table'],
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
  mounted() {
    this.getPermissions();
    this.getRoles();
  },
  data() {
    return {
      dataReady: false,
      permissionsData: null,
      pagination: {},
      perPage: 1000000,
      showCreatePermissionForm: false,
      permissionEditing: null,
      creatingNewPermission: false,
      permissionFormKey: 432489,
      tableHeaders: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'NAME', value: 'name', sortable: true, width: 150 },
        { text: 'SLUG', value: 'slug', sortable: true, width: 100 },
        { text: 'DESCRIPTION', value: 'description', width: 150 },
        { text: 'ROLES', value: 'roles.length', sortable: true },
        { text: 'USERS', value: 'users.length', sortable: true },
        { text: 'CREATED AT', value: 'created_at', sortable: true, width: 140 },
        { text: 'UPDATED AT', value: 'updated_at', sortable: true, width: 140 },
        { text: 'ACTIONS', value: 'actions' },
      ],
      rowsUnlocked: [],
      availableRoles: [],
      rolesDataReady: false,
      permissionsTableKey: 432876,
      submitting: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan']),
    ...mapActions(useToastStore, ['popToast']),
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
        .get(`/api/permissions-paginated?page=${this.pagination.current_page}&per=${this.perPage}`)
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
      const html = `Are you sure you want to Delete<strong> ${row.name}</strong>?<h6 class="font-bold">This will delete the Permission.</h6><p class="font-extrabold">This cannot be undone.</p>`;
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
          this.permissionsData = this.permissionsData.filter((u) => u.id != data.id);
          this.rowsUnlocked = this.rowsUnlocked.filter((i) => i != value.id);
          this.pagination.total = this.pagination.total - 1;
          this.getPermissions(this.pagination.current_page ? this.pagination.current_page : null);
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
      this.permissionsData = this.permissionsData.map((u) => (u.id !== data.id ? u : data));
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
            self.popToast({
              message: Object.values(errors).flat().toString(),
              timer: 5000,
              icon: 'error',
            });
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
