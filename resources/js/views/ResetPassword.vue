<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto border">
          <div class="border-b p-4 font-semibold text-gray-700">
            Reset your password
          </div>
          <div class="bg-white p-4">
            <Success
              v-if="useSuccess && success"
              :content="success"
              @close="success = null"
            />
            <Errors
              v-if="useErrors && errors"
              :content="errors"
              @close="errors = null"
            />
            <form
              class="mx-auto w-full md:w-10/12 md:p-4"
              @submit.prevent="reset"
            >
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="password"
                  class="w-4/12"
                  :class="{
                    'text-red-500':
                      errors && errors.errors && errors.errors.password,
                  }"
                >
                  Password
                </label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  name="password"
                  :class="{
                    'border-red-500':
                      errors && errors.errors && errors.errors.password,
                  }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
              >
                <label
                  for="password_confirmation"
                  class="w-4/12"
                  :class="{
                    'text-red-500':
                      errors &&
                      errors.errors &&
                      errors.errors.password_confirmation,
                  }"
                >
                  Confirm Password
                </label>
                <input
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  type="password"
                  name="password_confirmation"
                  :class="{
                    'border-red-500':
                      errors &&
                      errors.errors &&
                      errors.errors.password_confirmation,
                  }"
                  :disabled="loading"
                  class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12"
                />
              </div>
              <div
                class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end"
              >
                <div
                  class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12"
                >
                  <AppButton
                    :loading="loading"
                    :disabled="loading || success"
                    :text="loading ? 'Send Email' : 'Send Email'"
                    btn-class="uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
                    type="submit"
                  >
                    <template #text>
                      <CheckCircleIcon
                        v-if="!loading && success"
                        class="mr-2 h-6 w-6"
                      />
                      <CircleSvg v-if="loading" class="mr-2 h-5 w-5" />
                      Reset Password
                    </template>
                  </AppButton>
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
import Errors from '../components/Errors.vue';
import axios from 'axios';
import Success from '../components/Success.vue';
import CircleSvg from '../components/CircleSvg.vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import { mapActions } from 'vuex';

export default {
  components: {
    Errors,
    Success,
    CircleSvg,
    CheckCircleIcon,
  },
  props: {
    useErrors: { type: Boolean, default: false },
    useSuccess: { type: Boolean, default: false },
    token: { type: String, required: true },
    email: { type: String, required: true },
  },
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
      },
      errors: null,
      success: null,
      loading: false,
    };
  },
  created() {},
  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword',
      popToast: 'toast/popToast',
    }),
    async reset() {
      this.loading = true;
      this.errors = null;
      this.success = null;
      try {
        await this.resetPassword({
          email: this.email,
          token: this.token,
          ...this.form,
        }).then((response) => {
          this.loading = false;
          this.success = response;
          this.popToast({
            message: response + ' redirecting ...',
            timer: 10000,
            icon: 'success',
          });
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 1000);
        });
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.errors = e.response.data.errors;
          this.popToast({
            message: Object.values(e.response.data.errors).flat().toString(),
            timer: 10000,
            icon: 'error',
          });
        } else if (e.response && e.response.status === 401) {
          this.errors = { message: e.response.data.message };
          this.popToast({
            message: `Unauthorized`,
            timer: 10000,
            icon: 'error',
          });
        } else {
          this.popToast({
            message: `An error occured`,
            timer: 10000,
            icon: 'error',
          });
        }
        this.loading = false;
      }
    },
  },
};
</script>
