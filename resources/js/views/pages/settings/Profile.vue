<template>
  <div>
    <div
      class="flex items-center justify-between rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800"
    >
      Profile
      <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
        {{
          verified
            ? `Verified on: ${moment(verified).format('MMM Do YYYY, h:mma')}`
            : 'Not verified !'
        }}
      </div>
    </div>
    <div class="rounded bg-white p-4 dark:border-gray-500 dark:bg-slate-800">
      <Success v-if="success" :content="success" @close="success = null" />
      <Errors v-if="errors" :content="errors" @close="errors = null" />
      <form class="mx-auto w-full md:w-10/12 md:p-4" @submit.prevent="update">
        <div
          class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
        >
          <label for="name" class="w-4/12"> Name </label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"
          />
        </div>
        <div
          class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"
        >
          <label for="Email" class="w-4/12"> Email </label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"
          />
        </div>
        <div class="my-1 w-full py-2 sm:flex sm:items-center">
          <label for="Email" class="w-4/12"> Theme </label>

          <AppSwitch
            :enabled="form.theme_dark"
            @click="form.theme_dark = !form.theme_dark"
          />
          <div class="float-left ml-2 mt-1">
            {{ form.theme_dark ? 'Dark' : 'Light' }}
          </div>

          <!--
          <span
            v-tippy="'Toggle Theme ' + (form.theme_dark ? 'Light' : 'Dark')"
            class="mr-2"
            :class="
              loading ? 'default disabled cursor-pointer' : 'cursor-pointer'
            "
            @click="form.theme_dark = !form.theme_dark"
          >
            <Switch
              v-model="form.theme_dark"
              :class="form.theme_dark ? 'bg-gray-500' : 'bg-gray-400'"
              class="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span class="sr-only">Toggle Theme</span>
              <span
                aria-hidden="true"
                :class="
                  form.theme_dark
                    ? 'translate-x-4 bg-gray-800'
                    : 'translate-x-0 bg-white'
                "
                class="pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </span>
 -->
          <!--

          <span
            class="cursor-pointer"
            @click="form.theme_dark = !form.theme_dark"
          >
            <i
              class="fa-solid fa-fw fa-2x float-left mr-4 text-slate-600"
              :class="form.theme_dark ? 'fa-toggle-on' : 'fa-toggle-off'"
            />
            <div class="float-left mt-2">
              {{ form.theme_dark ? 'Dark' : 'Light' }}
            </div>
          </span>

 -->
        </div>
        <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end">
          <div
            class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12"
          >
            <AppButton
              :loading="loading"
              :disabled="loading"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Errors from '@components/Errors.vue';
import Success from '@components/Success.vue';
import CircleSvg from '@components/CircleSvg.vue';
import moment from 'moment';

export default {
  components: {
    Errors,
    Success,
    CircleSvg,
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        theme_dark: false,
      },
      errors: null,
      success: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      verified: 'auth/verified',
      user: 'auth/user',
    }),
  },
  mounted() {
    this.form.name = this.user.name;
    this.form.email = this.user.email;
    this.form.theme_dark = this.user.theme_dark;
  },
  methods: {
    ...mapActions({
      updateProfile: 'auth/profile',
      popToast: 'toast/popToast',
    }),
    async update() {
      this.loading = true;
      this.errors = null;
      this.success = '';
      try {
        await this.updateProfile(this.form).then((response) => {
          if (
            response &&
            response.data &&
            response.data.user &&
            response.data.user.id
          ) {
            // this.success = 'Profile Updated Successfully'
            this.popToast({
              message: 'Profile Updated Successfully',
              timer: 2000,
              icon: 'success',
            });
          }
        });
      } catch (e) {
        this.errors = e.data;
        this.popToast({
          message: 'Error Updating Profile',
          timer: 5000,
          icon: 'error',
        });
      }
      this.loading = false;
    },
    moment() {
      return moment();
    },
  },
};
</script>

<style scoped>
:deep() .text-white {
  color: #ffffff !important;
}
</style>
