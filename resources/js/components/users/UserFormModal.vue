<template>
  <AppModal :show-modal="showingForm" @close-modal="closeModal">
    <template #title>
      {{ newUser ? 'Create User' : 'Editing User ' + userName }}
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
          <div class="flex-item relative mb-3 mr-2">
            <img
              v-if="form && form.avatar"
              :src="form.avatar"
              class="float-left ml-2 mr-2 mt-1 h-10 w-10 rounded-full"
            />
            <UserCircleIcon
              v-else
              class="float-left ml-2 mr-2 mt-1 h-10 w-10 text-gray-500"
            />
          </div>
          <div class="flex-item relative mb-3 flex-auto">
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Name"
              name="name"
              class="relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.name
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300"
            >
              <span
                class="fas fa-user"
                :class="
                  errors && errors.name ? 'text-red-600' : 'text-slate-300'
                "
              />
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
              class="relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.email
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span
                class="fas fa-envelope"
                :class="
                  errors && errors.email ? 'text-red-600' : 'text-slate-300'
                "
              />
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
              class="relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.password
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span
                class="fas fa-user-shield"
                :class="
                  errors && errors.email ? 'text-red-600' : 'text-slate-300'
                "
              />
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
              class="relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none"
              :class="
                errors && errors.password
                  ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                  : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400'
              "
            />
            <span
              class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
            >
              <span
                class="fas fa-user-shield"
                :class="
                  errors && errors.email ? 'text-red-600' : 'text-slate-300'
                "
              />
            </span>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 ml-2 flex-auto">
            <h6 class="text-xs uppercase">
              Verified:
              <AppButton
                :disabled="loading || submitting"
                class="float-right ml-3 mb-2 bg-yellow-600 px-1 py-0 text-sm font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-lg focus:shadow-lg active:shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600"
                style="width: 80px"
                @click="toggleUserVerified"
              >
                <template #text>
                  {{ form && form.email_verified_at ? 'Un-Verify' : 'Verify' }}
                </template>
              </AppButton>
            </h6>
            <div class="mt-2 whitespace-nowrap text-xs">
              {{
                form && form.email_verified_at
                  ? parseDisplayDate(form.email_verified_at)
                  : 'Not Verified'
              }}
            </div>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative mb-3 ml-3 flex-auto">
            <div class="my-1 mr-3 w-full py-2 sm:flex sm:items-center">
              <span
                :class="
                  loading || submitting
                    ? 'default disabled cursor-pointer'
                    : 'cursor-pointer'
                "
                @click="form.theme_dark = !form.theme_dark"
              >
                <span
                  class="fa-solid fa-fw fa-2x float-left mr-4 text-slate-600 dark:text-gray-300"
                  :class="form.theme_dark ? 'fa-toggle-on' : 'fa-toggle-off'"
                />
                <span
                  v-if="loading"
                  class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
                  style="left: -1.4em; top: 1.2em"
                />
                <span class="mt-1 inline-block text-sm">
                  {{ form.theme_dark ? 'Dark Theme' : 'Light Theme' }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="relative mb-3 flex w-full flex-wrap items-stretch">
          <div class="flex-item relative flex-auto">
            <h6>User Roles</h6>
            <Multiselect
              v-model="form.roles"
              :options="availableRoles"
              track-by="id"
              label="name"
              mode="tags"
              placeholder="Select user roles"
            />
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
      <hr />
      <div style="width: 100%">
        <AppButton
          v-if="changed"
          :disabled="loading || submitting || !changed"
          class="float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800"
          @click="submit"
        >
          <template #text>
            {{
              newUser
                ? submitting
                  ? 'Creating'
                  : 'Create'
                : submitting
                ? 'Updating'
                : 'Update'
            }}
            <span v-if="submitting" class="fa fa-circle-notch fa-spin ml-3" />
          </template>
        </AppButton>
        <AppButton
          :disabled="loading || submitting"
          class="float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700"
          @click="closeModal"
        >
          <template #text>
            {{ changed ? 'Cancel' : 'Close' }}
          </template>
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts">
import AppModal from '@components/common/AppModal.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import clonedeep from 'lodash.clonedeep';
import moment from 'moment';
import Multiselect from '@vueform/multiselect';
import Errors from '@components/Errors.vue';

export default {
  name: 'UserFormModal',
  components: {
    AppModal,
    UserCircleIcon,
    Multiselect,
    Errors,
  },
  props: {
    showingForm: { type: Boolean, default: false },
    newUser: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    user: { type: Object, default: null },
    availableRoles: { type: Array, default: null },
    useInlineMessage: { type: Boolean, default: true },
  },
  setup() {
    return {};
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
        theme_dark: false,
        email_verified_at: null,
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
    if (self.user) {
      self.form = clonedeep(self.user);
      if (self.user.name) {
        self.userName = self.user.name;
      }
      if (self.user.roles) {
        const JSON_Obj = self.user.roles;
        self.form.roles = [];
        for (const key in JSON_Obj) {
          self.form.roles.push(JSON_Obj[key].id);
        }
      }
      setTimeout(function () {
        self.ready = true;
      }, 100);
    } else {
      self.ready = true;
    }
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    parseDisplayDate(date) {
      if (date && date != true) {
        return moment(date).format('MMM Do YYYY, h:mma');
      } else {
        return moment(new Date()).format('MMM Do YYYY, h:mma');
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
            message: `User Successfully Created!`,
            timer: 5000,
            icon: 'success',
          });
          this.submitting = false;
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            const errors = response.data.errors;
            this.errors = errors;
            // this.popToast({
            //   message: Object.values(errors).flat().toString(),
            //   timer: 5000,
            //   icon: 'error',
            // });
          } else {
            this.popToast({
              message: `Error Creating User`,
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
        .patch('/api/users/update-user/' + this.user.id, this.form)
        .then(({ data }) => {
          this.$emit('userUpdated', data.user);
          this.popToast({
            message: `User ${data.user.name} Successfully Updated!`,
            timer: 5000,
            icon: 'success',
          });
          this.submitting = false;
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            const errors = response.data.errors;
            this.errors = errors;
            // this.popToast({
            //   message: Object.values(errors).flat().toString(),
            //   timer: 5000,
            //   icon: 'error',
            // });
          } else {
            this.popToast({
              message: `Error Updating User`,
              timer: 5000,
              icon: 'error',
            });
          }
          this.submitting = false;
        });
      this.submitting = false;
    },
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
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
/deep/ .multiselect-option {
  background: transparent;
  color: #777;
}
/deep/ .multiselect-option.is-pointed {
  background: #10b981;
  color: #ffffff;
}
</style>
