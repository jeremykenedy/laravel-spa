<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border">
          <div class="border-b p-4 font-semibold text-gray-600">Register</div>

          <div class="rounded bg-white p-4 dark:bg-slate-800">
            <errors
              v-if="errors && useInlineMessage"
              :content="errors"
              type="error"
              @close="errors = null"
            />

            <form
              class="mx-auto w-full rounded md:w-10/12 md:p-4"
              @submit.prevent="register"
            >
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="Name"
                  class="w-4/12"
                  :class="
                    errors && errors.name
                      ? 'text-red-500'
                      : 'text-gray-700 dark:text-gray-200'
                  "
                >
                  Name
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  :class="{ 'border-red-500': errors && errors.name }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="Email"
                  class="w-4/12"
                  :class="
                    errors && errors.email
                      ? 'text-red-500'
                      : 'text-gray-700 dark:text-gray-200'
                  "
                >
                  Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  :class="{ 'border-red-500': errors && errors.email }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="Password"
                  class="w-4/12"
                  :class="
                    errors && errors.password
                      ? 'text-red-500'
                      : 'text-gray-700 dark:text-gray-200'
                  "
                >
                  Password
                </label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  :class="{ 'border-red-500': errors && errors.password }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="Password confirm"
                  class="w-4/12"
                  :class="
                    errors && errors.password
                      ? 'text-red-500'
                      : 'text-gray-700 dark:text-gray-200'
                  "
                >
                  Confirm Password
                </label>
                <input
                  v-model="form.password_confirmation"
                  type="password"
                  name="password_confirmation"
                  :class="{ 'border-red-500': errors && errors.password }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>

              <div
                class="my-1 w-full rounded py-2 sm:flex sm:items-center sm:justify-end"
              >
                <div
                  class="mt-3 flex w-full items-center justify-between rounded sm:mt-0 sm:w-8/12"
                >
                  <AppButton
                    :loading="loading"
                    :disabled="loading"
                    :text="loading ? 'Register' : 'Register'"
                    btn-class="uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
                    type="submit"
                  >
                    <template #text>
                      <ArrowRightOnRectangleIcon
                        v-if="!loading"
                        class="mr-2 h-6 w-6"
                      />
                      <CircleSvg v-if="loading" class="mr-2 h-6 w-6" />
                      Register
                    </template>
                  </AppButton>

                  <span class="text-sm">
                    <span
                      class="mr-1 cursor-default text-gray-700 dark:text-gray-200"
                    >
                      Already a member?
                    </span>
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-sm font-bold text-blue-500 hover:text-blue-300"
                    >
                      Sing In
                    </router-link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleSvg from '../components/CircleSvg.vue';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import Errors from '../components/Errors.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    ArrowRightOnRectangleIcon,
    CircleSvg,
    Errors,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: null,
      loading: false,
      useInlineMessage: false,
    };
  },
  methods: {
    ...mapActions({
      registerApp: 'auth/register',
      popToast: 'toast/popToast',
    }),
    async register() {
      this.loading = true;
      this.errors = null;
      this.success = '';
      try {
        await this.registerApp(this.form).then((response) => {
          this.loading = false;
          this.$router.push({ name: 'dashboard' });
        });
      } catch (e) {
        if (e.response.status === 422) {
          this.errors = e.response.data.errors;
          // this.errors = {}
          // this.errors.message = Object.values(e.response.data.errors)
          //   .flat()
          //   .toString()
          // this.errors.errors = Object.values(e.response.data.errors)
          this.popToast({
            message: Object.values(e.response.data.errors).flat().toString(),
            timer: 5000,
            icon: 'error',
          });
        }
        if (e.status === 401) {
          this.popToast({
            message: `Invalid Email or Password`,
            timer: 5000,
            icon: 'error',
          });
        }
        this.loading = false;
      }
    },
  },
};
</script>
