Password.vue
<template>
  <div
    class="rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800"
  >
    Password
  </div>
  <div class="bg-white p-4 dark:bg-slate-800">
    <Success v-if="success" :content="success" @close="success = null" />
    <Errors v-if="errors" :content="errors" @close="errors = null" />
    <form class="mx-auto w-full md:w-10/12 md:p-4" @submit.prevent="update">
      <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
        <label for="password" class="w-4/12"> Password </label>
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          autocomplete="on"
          class="mt-3 ml-1 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"
        />
        <span
          class="fa fa-fw ml-3"
          :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          style="width: 1.45em"
          @click="showPassword = !showPassword"
        />
      </div>
      <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
        <label for="password confirmation" class="w-4/12">
          Confirm password
        </label>
        <input
          v-model="form.password_confirmation"
          :type="showConfirmPassword ? 'text' : 'password'"
          name="password_confirmation"
          class="mt-3 ml-1 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"
        />

        <span
          class="fa fa-fw ml-3"
          style="width: 1.45em"
          :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click="showConfirmPassword = !showConfirmPassword"
        />
      </div>
      <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end">
        <div
          class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12"
        >
          <AppButton
            :loading="loading"
            :disabled="loading || !submitEnabled"
            :text="loading ? 'Update' : 'Update'"
            btn-class="uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
            type="submit"
          >
            <template #text>
              <CircleSvg v-if="loading" class="mr-2 h-5 w-5" />
              Update
            </template>
          </AppButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Errors from '@components/Errors.vue';
import Success from '@components/Success.vue';
import CircleSvg from '@components/CircleSvg.vue';

export default {
  components: {
    Errors,
    Success,
    CircleSvg,
  },
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
      },
      errors: null,
      success: '',
      loading: false,

      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    submitEnabled() {
      if (
        this.form.password &&
        this.form.password_confirmation &&
        this.form.password.length > 5 &&
        this.form.password == this.form.password_confirmation
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      updatePassword: 'auth/password',
      popToast: 'toast/popToast',
    }),
    async update() {
      this.loading = true;
      this.errors = null;
      this.success = '';
      try {
        await this.updatePassword(this.form).then((response) => {
          if (response && response == 'Success') {
            this.form.password = '';
            this.form.password_confirmation = '';
            this.popToast({
              message: 'Password Updated Successfully',
              timer: 2000,
              icon: 'success',
            });
          }
        });
      } catch (e) {
        this.errors = e.data;
        let msg = 'Error Updating Password';
        if (e && e.response && e.response.data && e.response.data.message) {
          msg = e.response.data.message;
        }
        this.popToast({
          message: msg,
          timer: 5000,
          icon: 'error',
        });
      }
      this.loading = false;
    },
  },
};
</script>
