<template>
  <AppModal :show-modal="showingForm" @close-modal="closeModal">
    <template #title>
      {{ newUser ? 'Create User' : 'Editing User ' + userName }}
    </template>

    <template #body>
      <!-- <Errors v-if="errors && !isObjEmpty(errors) && useInlineMessage" :content="errors" container-class="w-100 mb-5" type="error" @close="errors = {}" /> -->

      <form @submit.prevent>
        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 mr-2">
            <img
              v-if="form && form.avatar"
              :src="form.avatar"
              :alt="form.name"
              class="float-left ml-2 mr-2 mt-1 h-10 w-10 rounded-full"
            />
            <UserCircleIcon v-else class="float-left ml-2 mr-2 mt-1 h-10 w-10 text-gray-500" />
          </div>
          <div class="flex-item relative mb-3 flex-auto">
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
              <span class="fas fa-user" :class="errors && errors.name ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <input
              id="email"
              v-model="form.email"
              type="text"
              placeholder="E-mail"
              name="email"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.email
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-envelope" :class="errors && errors.email ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              autocomplete="on"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.password
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-user-shield" :class="errors && errors.password ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 flex-auto">
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              placeholder="Password Confirmation"
              name="password_confirmation"
              autocomplete="on"
              class="relative w-full rounded border bg-white dark:bg-gray-900 dark:text-gray-300 px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.password
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span class="fas fa-user-shield" :class="errors && errors.password ? 'text-red-600' : 'text-slate-300'" />
            </span>
          </div>
        </div>

        <div class="relative flex w-full flex-wrap items-stretch">
          <div class="flex-item relative ml-2 flex-auto">
            <h6 class="text-xs uppercase">
              Verified:
              <AppButton
                :disabled="loading || submitting"
                class="float-right ml-3 mb-2 bg-yellow-600 px-1 py-0 text-sm font-medium leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-lg focus:shadow-lg active:shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600"
                style="width: 80px"
                @click="toggleUserVerified"
              >
                <template #text>
                  {{ form && form.email_verified_at ? 'Un-Verify' : 'Verify' }}
                </template>
              </AppButton>
            </h6>
            <div class="mt-2 whitespace-nowrap text-xs">
              {{ form && form.email_verified_at ? parseDisplayDate(form.email_verified_at) : 'Not Verified' }}
            </div>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 ml-3 flex-auto">
            <div class="my-1 mr-3 w-full py-2 sm:flex sm:items-center">
              <div
                :class="loading || submitting ? 'default disabled cursor-pointer' : 'cursor-pointer'"
                @click="form.theme_dark = !form.theme_dark"
              >
                <SwitchComp
                  :default-checked="form.theme_dark"
                  :class="form.theme_dark ? 'bg-gray-500' : 'bg-gray-400'"
                  class="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 float-left"
                  style="margin-top: 5px"
                >
                  <span class="sr-only">Toggle Theme</span>
                  <span
                    aria-hidden="true"
                    :class="form.theme_dark ? 'translate-x-4 bg-gray-800' : 'translate-x-0 bg-white'"
                    class="pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
                  />

                  <SunIcon v-if="!form.theme_dark" class="text-white h-4 w-4" />
                  <MoonIcon v-if="form.theme_dark" class="absolute h-4 w-4 text-gray-800" style="left: -1px" />
                </SwitchComp>

                <div class="inline-flex text-sm ml-4 mt-1">
                  {{ form.theme_dark ? 'Dark Theme' : 'Light Theme' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="authenticated && user && userCan('edit.roles') && userCan('view.roles')"
          class="relative mb-3 flex w-full flex-wrap items-stretch"
        >
          <div class="flex-item relative flex-auto">
            <h6>User Roles</h6>
            <Multiselect
              v-model="form.roles"
              :options="availableRoles"
              track-by="id"
              label="name"
              mode="tags"
              placeholder="Select user roles"
              class="dark:bg-gray-900 dark:text-gray-300"
            />
          </div>
        </div>

        <div
          v-if="enablePermissons && authenticated && user && userCan('edit.permissions') && userCan('view.permissions')"
          class="relative mb-3 flex w-full flex-wrap items-stretch"
        >
          <div class="flex-item relative flex-auto">
            <h6>User Permissions</h6>
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

        <p v-if="enablePermissons" class="italic">
          Note: It is best practice to create a role with attached permissions rather than assign a permission directly.
        </p>

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
      <hr />
      <div style="width: 100%">
        <AppButton
          v-if="changed"
          :disabled="loading || submitting || !changed"
          class="float-left"
          primary
          @click="submit"
        >
          <template #text>
            {{ newUser ? (submitting ? 'Creating' : 'Create') : submitting ? 'Updating' : 'Update' }}
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

<script lang="ts">
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';
import moment from 'moment';
import AppModal from '@components/common/AppModal.vue';
import Multiselect from '@vueform/multiselect';
// import Errors from '@components/common/ErrorsNotice.vue';
import { Switch as SwitchComp } from '@headlessui/vue';
import { isEmpty, validateEmail, parseDisplayDate, isObjEmpty } from '@services/utilities';
import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'UserFormModal',
  components: {
    AppModal,
    UserCircleIcon,
    Multiselect,
    // Errors,
    SunIcon,
    MoonIcon,
    SwitchComp,
  },
  props: {
    showingForm: { type: Boolean, default: false },
    newUser: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    userEditing: { type: Object, default: null },
    availableRoles: { type: Array, default: null },
    availablePermissions: { type: Array, default: null },
    useInlineMessage: { type: Boolean, default: true },
    enablePermissons: { type: Boolean, default: false }, // Careful: Using this will not auto-detach roles for users. // You must also update UsersController.php
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
  data() {
    return {
      userName: '',
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        roles: [],
        permissions: [],
        theme_dark: false,
        email_verified_at: null,
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
    if (self.userEditing) {
      self.form = clonedeep(self.userEditing);
      if (self.userEditing.name) {
        self.userName = self.userEditing.name;
      }
      if (self.userEditing.roles) {
        const JSON_Obj = self.userEditing.roles;
        self.form.roles = [];
        for (const key in JSON_Obj) {
          self.form.roles.push(JSON_Obj[key].id);
        }
      }
      if (self.userEditing.permissions) {
        const JSON_Obj = self.userEditing.permissions;
        self.form.permissions = [];
        for (const key in JSON_Obj) {
          self.form.permissions.push(JSON_Obj[key].id);
        }
      }
      setTimeout(() => {
        self.ready = true;
      }, 100);
    } else {
      self.ready = true;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan']),
    ...mapActions(useToastStore, ['popToast']),
    isEmpty,
    isObjEmpty,
    validateEmail,
    parseDisplayDate,
    toggleUserVerified() {
      if (this.form.email_verified_at) {
        this.form.email_verified_at = null;
      } else {
        this.form.email_verified_at = true;
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    async checkEmail() {
      const emailEmpty = this.isEmpty(this.form.email);
      if (emailEmpty) {
        this.popToast({
          message: 'Email is required',
          timer: 5000,
          icon: 'error',
        });
        this.errors.email = true;
      } else {
        const emailValid = await this.validateEmail(this.form.email, true);
        if (!emailValid) {
          this.popToast({
            message: 'Email is invalid',
            timer: 5000,
            icon: 'error',
          });
          this.errors.email = true;
        }
      }
    },
    async submit() {
      this.error = null;
      this.submitting = true;
      if (this.newUser) {
        await this.createUser();
      }
      if (!this.newUser) {
        await this.updateUser();
      }
      this.submitting = false;
    },
    async createUser() {
      await axios
        .post('/api/users/create-user', this.form)
        .then(({ data }) => {
          this.$emit('userCreated', data.user);
          this.popToast({
            message: 'User Successfully Created!',
            timer: 5000,
            icon: 'success',
          });
          this.submitting = false;
        })
        .catch(({ res }) => {
          if (res.status === 422) {
            const { errors } = res.data;
            this.errors = errors;
            // this.popToast({
            //   message: Object.values(errors).flat().toString(),
            //   timer: 5000,
            //   icon: 'error',
            // });
          } else {
            this.popToast({
              message: 'Error Creating User',
              timer: 5000,
              icon: 'error',
            });
          }
          this.submitting = false;
        });
      this.submitting = false;
    },
    async updateUser() {
      await axios
        .patch(`/api/users/update-user/${this.userEditing.id}`, this.form)
        .then(({ data }) => {
          this.$emit('userUpdated', data.user);
          this.popToast({
            message: `User ${data.user.name} Successfully Updated!`,
            timer: 5000,
            icon: 'success',
          });
          this.submitting = false;
        })
        .catch(({ err }) => {
          if (err && err.status === 422) {
            const { errors } = err.data;
            this.errors = errors;
            this.popToast({
              message: Object.values(errors).flat().toString(),
              timer: 5000,
              icon: 'error',
            });
          } else {
            this.popToast({
              message: 'Error Updating User',
              timer: 5000,
              icon: 'error',
            });
          }
          this.submitting = false;
        });
      this.submitting = false;
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
