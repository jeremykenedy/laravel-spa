<template>
  <AppModal :show-modal="showingForm" @close-modal="closeModal">
    <template #title>
      {{ newPermission ? 'Create Permission' : 'Editing Permission ' + permissionName }}
    </template>
    <template #body>
      <Errors
        v-if="errors && useInlineMessage"
        :content="errors"
        :errors="errors"
        container-class="w-100 mb-5"
        type="error"
        @close="errors = null"
      />

      <form @submit.prevent>
        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <label for="name"> Name </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Name"
              name="name"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.name
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300"
            >
              <span class="fas fa-lock" :class="errors && errors.name ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <label for="slug"> Slug </label>
            <input
              id="slug"
              v-model="form.slug"
              type="text"
              placeholder="Slug"
              name="slug"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.slug
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-code" :class="errors && errors.slug ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <label for="description"> Description </label>
            <textarea
              id="description"
              v-model="form.description"
              type="text"
              placeholder="Description"
              name="description"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.description
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-pencil" :class="errors && errors.description ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 max-w-2xl flex-auto">
            <h6>Permission Roles</h6>
            <Multiselect
              v-model="form.roles"
              :options="availableRoles"
              track-by="id"
              label="name"
              mode="tags"
              class="dark:bg-gray-900 dark:text-gray-300"
              placeholder="Select permission roles"
            />
          </div>
        </div>
        <div
          v-if="permission && permission.users && permission.users.length && permission.users.length > 0"
          class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch"
        >
          <div class="flex-item relative flex-auto text-xs">
            <strong class="text-red-400"><span class="fas fa-warning fa-fw mr-1" />Warning</strong>: This will affect
            <span class="font-bold">{{ permission.users.length }}</span> User{{
              permission.users.length > 1 ? 's' : ''
            }}
          </div>
        </div>

        <div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative flex-auto text-xs uppercase">
            <div v-if="form.created_at" class="float-left">
              Created at:
              <div class="text-xs font-bold">
                {{ parseDisplayDate(form.created_at) }}
              </div>
            </div>
          </div>
          <div class="flex-item relative flex-auto text-xs uppercase">
            <div v-if="form.updated_at" class="float-right">
              Updated at:
              <div class="text-xs font-bold">
                {{ parseDisplayDate(form.updated_at) }}
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div style="width: 100%">
        <AppButton
          v-if="changed"
          :disabled="loading || submitting || !changed"
          primary
          class="float-left"
          @click="submit"
        >
          <template #text>
            {{ newPermission ? (submitting ? 'Creating' : 'Create') : submitting ? 'Updating' : 'Update' }}
            <span v-if="submitting" class="fa fa-circle-notch fa-spin ml-3" />
          </template>
        </AppButton>
        <AppButton :disabled="loading || submitting" class="float-right" secondary @click="closeModal">
          <template #text>
            {{ changed ? 'Cancel' : 'Close' }}
          </template>
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@components/common/AppModal.vue';
import axios from 'axios';
import { mapActions } from 'pinia';
import clonedeep from 'lodash.clonedeep';
import moment from 'moment';
import Multiselect from '@vueform/multiselect';
import Errors from '@components/common/ErrorsNotice.vue';
import { useToastStore } from '@store/toast';

export default {
  name: 'PermissionFormModal',
  components: {
    AppModal,
    Multiselect,
    Errors,
  },
  props: {
    showingForm: { type: Boolean, default: false },
    newPermission: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    permission: { type: Object, default: null },
    useInlineMessage: { type: Boolean, default: false },
    availableRoles: { type: Array, default: null },
  },
  setup() {
    return {};
  },
  data() {
    return {
      permissionName: '',
      form: {
        name: null,
        slug: null,
        description: null,
        roles: [],
        model: 'Permission',
      },
      submitting: false,
      errors: null,
      changed: false,
      ready: false,
    };
  },
  computed: {},
  watch: {
    form: {
      handler(newValue, oldValue) {
        if (this.ready) {
          this.changed = true;
        }
      },
      deep: true,
      immediate: false,
    },
  },
  created() {},
  mounted() {
    const self = this;
    if (self.permission) {
      self.form = clonedeep(self.permission);
      if (self.permission.name) {
        self.permissionName = self.permission.name;
      }
      self.form.roles = self.form.roles.map((el) => el.id);
      setTimeout(() => {
        self.ready = true;
      }, 100);
    } else {
      self.ready = true;
    }
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions(useToastStore, ['popToast']),
    parseDisplayDate(date) {
      if (date && date != true) {
        return moment(date).format('MMM Do YYYY, h:mma');
      }
      return moment(new Date()).format('MMM Do YYYY, h:mma');
    },
    async submit() {
      this.error = null;
      this.submitting = true;
      if (this.newPermission) {
        await this.createPermission();
      } else {
        await this.updatePermission();
      }
      this.submitting = false;
    },
    formValid() {
      this.errors = null;
      if (!this.form) {
        return false;
      }
      if (!this.form.name) {
        this.errors = {};
        this.errors.name = 'Missing Permission Name';
      }
      if (!this.form.slug) {
        if (!this.errors) {
          this.errors = {};
        }
        this.errors.slug = 'Missing Permission Slug';
      }
      if (!this.errors) {
        return true;
      }
      return false;
    },
    async createPermission() {
      const self = this;
      if (!this.formValid()) {
        this.submitting = false;
        this.popToast({
          message: 'Error Validating Permission',
          timer: 5000,
          icon: 'error',
        });
        return;
      }
      await axios
        .post('/api/permissions/create-permission', this.form)
        .then(({ data }) => {
          this.$emit('permissionCreated', data.permission);
          this.popToast({
            message: 'Permission Successfully Created!',
            timer: 5000,
            icon: 'success',
          });
          this.submitting = false;
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            const { errors } = response.data;
            this.errors = errors;
            // this.popToast({
            //   message: Object.values(errors).flat().toString(),
            //   timer: 5000,
            //   icon: 'error',
            // });
          } else {
            this.popToast({
              message: 'Error Creating Permission',
              timer: 5000,
              icon: 'error',
            });
          }
          this.submitting = false;
        });
      this.submitting = false;
    },
    async updatePermission() {
      const self = this;
      if (!this.formValid()) {
        this.submitting = false;
        this.popToast({
          message: 'Error Validating Permission',
          timer: 5000,
          icon: 'error',
        });
        return;
      }
      await axios
        .patch(`/api/permissions/update-permission/${self.permission.id}`, self.form)
        .then(({ data }) => {
          self.$emit('permissionUpdated', data.permission);
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
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
:deep() .multiselect-option {
  background: transparent;
  color: #777;
}

:deep() .multiselect-option.is-pointed {
  background: #10b981;
  color: #ffffff;
}
</style>
