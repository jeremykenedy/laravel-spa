<template>
  <AppModal :show-modal="showingForm" @close-modal="closeModal">
    <template #title>
      {{ newRole ? 'Create Role' : 'Editing Role ' + roleName }}
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
          <div class="flex-item relative mb-3 flex-auto">
            <label for="level"> Level </label>
            <input
              id="level"
              v-model="form.level"
              type="number"
              placeholder="Level"
              name="level"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.level
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-pencil" :class="errors && errors.level ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 max-w-2xl flex-auto">
            <h6>Role Permissions</h6>
            <Multiselect
              v-model="form.permissions"
              :options="availablePermissions"
              track-by="id"
              label="name"
              class="dark:bg-gray-900 dark:text-gray-300"
              mode="tags"
              placeholder="Select role permissions"
            />
          </div>
        </div>

        <div
          v-if="role && role.users && role.users.length && role.users.length > 0"
          class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch"
        >
          <div class="flex-item relative flex-auto text-xs">
            <strong class="text-red-400"><span class="fas fa-warning fa-fw mr-1" />Warning</strong>: This will affect
            <span class="font-bold">{{ role.users.length }}</span> User{{ role.users.length > 1 ? 's' : '' }}
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
          class="float-left"
          primary
          @click="submit"
        >
          <template #text>
            {{ newRole ? (submitting ? 'Creating' : 'Create') : submitting ? 'Updating' : 'Update' }}
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
  name: 'UserFormModal',
  components: {
    AppModal,
    Multiselect,
    Errors,
  },
  props: {
    showingForm: { type: Boolean, default: false },
    newRole: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    role: { type: Object, default: null },
    useInlineMessage: { type: Boolean, default: false },
    availablePermissions: { type: Array, default: null },
  },
  data() {
    return {
      roleName: '',
      form: {
        name: null,
        slug: null,
        description: null,
        level: 0,
        permissions: [],
      },
      submitting: false,
      errors: null,
      changed: false,
      ready: false,
    };
  },
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
  mounted() {
    const self = this;
    if (self.role) {
      self.form = clonedeep(self.role);
      if (self.role.name) {
        self.roleName = self.role.name;
      }
      self.form.permissions = self.form.permissions.map((el) => el.id);
      setTimeout(() => {
        self.ready = true;
      }, 100);
    } else {
      self.ready = true;
    }
  },
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
      if (this.newRole) {
        await this.createRole();
      }
      if (!this.newRole) {
        await this.updateRole();
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
        this.errors.name = 'Missing Role Name';
      }
      if (!this.form.slug) {
        if (!this.errors) {
          this.errors = {};
        }
        this.errors.slug = 'Missing Role Slug';
      }
      if (!this.errors) {
        return true;
      }
      return false;
    },
    async createRole() {
      const self = this;
      if (!this.formValid()) {
        this.submitting = false;
        this.popToast({
          message: 'Error Validating Role',
          timer: 5000,
          icon: 'error',
        });
        return;
      }
      await axios
        .post('/api/roles/create-role', this.form)
        .then(({ data }) => {
          this.$emit('roleCreated', data.role);
          this.popToast({
            message: 'Role Successfully Created!',
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
              message: 'Error Creating Role',
              timer: 5000,
              icon: 'error',
            });
          }
          this.submitting = false;
        });
      this.submitting = false;
    },
    async updateRole() {
      const self = this;
      if (!this.formValid()) {
        this.submitting = false;
        this.popToast({
          message: 'Error Validating Role',
          timer: 5000,
          icon: 'error',
        });
        return;
      }
      await axios
        .patch(`/api/roles/update-role/${self.role.id}`, self.form)
        .then(({ data }) => {
          self.$emit('roleUpdated', data.role);
          self.popToast({
            message: `Role ${data.role.name} Successfully Updated!`,
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
              message: 'Error Updating Role',
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
