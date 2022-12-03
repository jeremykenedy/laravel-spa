<template>
  <section>
    <div class="mx-auto mt-10 max-w-7xl px-4 text-gray-800 sm:px-6">
      <div
        class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center"
      >
        <div
          class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
        >
          <img :src="loginImage" class="w-full" :alt="loginImageAlt" />
        </div>
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
          <form @submit.prevent="login">
            <div class="mb-6 md:mt-16 lg:mt-12">
              <label
                for="email"
                class="text-small mb-2 inline-block hidden"
                :class="{ 'text-red-500': errors && errors.email }"
              >
                E-mail Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="text"
                class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                :class="{ 'border-red-500': errors && errors.email }"
                :disabled="loading"
                placeholder="Email Address"
              />
              <div
                v-if="errors && errors.email"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.email[0] }}
              </div>
            </div>

            <div class="mb-6">
              <label
                for="password"
                class="text-small mb-2 inline-block hidden"
                :class="{ 'text-red-500': errors && errors.password }"
              >
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                autocomplete="on"
                class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                :class="{ 'border-red-500': errors && errors.password }"
                :disabled="loading"
                placeholder="Password"
              />
              <div
                v-if="errors && errors.password"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.password[0] }}
              </div>
            </div>

            <div class="mb-6 flex items-center justify-between">
              <div class="form-group form-check">
                <input
                  id="exampleCheck2"
                  type="checkbox"
                  class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                />
                <label
                  class="form-check-label mt-1 inline-block cursor-pointer text-gray-800 dark:text-gray-100"
                  for="exampleCheck2"
                  >Remember me</label
                >
              </div>
              <router-link
                :to="{ name: 'forgot-password' }"
                class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Forgot password?
              </router-link>
            </div>

            <div class="text-center lg:text-left">
              <AppButton
                primary
                :loading="loading"
                :disabled="loading"
                :text="loading ? 'Login' : 'Login'"
                btn-class="leading-snug px-7 py-3 text-sm uppercase leading-snug shadow-md"
                type="submit"
              >
                <template #text>
                  <ArrowRightOnRectangleIcon
                    v-if="!loading"
                    class="mr-2 h-6 w-6"
                  />
                  <CircleSvg v-if="loading" class="mr-2 h-6 w-6" />
                  Login
                </template>
              </AppButton>

              <p class="mt-4 mb-0 pt-1 text-sm">
                <span
                  class="mr-2 cursor-default text-gray-700 dark:text-gray-300"
                >
                  Don't have an account?
                </span>
                <router-link
                  :to="{ name: 'register' }"
                  class="font-bold text-red-500 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                >
                  Register
                </router-link>
              </p>

              <div v-if="socialLoginsEnabled" class="mt-5">
                <div
                  class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"
                >
                  <p class="mx-4 mb-0 text-center font-semibold">Or</p>
                </div>
                <h3 class="mb-3 font-bold text-gray-700">Login with</h3>
                <SocialiteLogins />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import CircleSvg from '@components/CircleSvg.vue';
import SocialiteLogins from '@components/auth/SocialiteLogins.vue';

export default {
  name: 'Login',
  components: {
    ArrowRightOnRectangleIcon,
    CircleSvg,
    SocialiteLogins,
  },
  props: {
    showSmLogin: { type: Boolean, default: true },
  },
  setup() {
    return {};
  },
  data() {
    return {
      loginImage:
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp',
      loginImageAlt: 'Login Image',
      form: {
        email: '',
        password: '',
      },
      errors: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      logins: 'auth/logins',
    }),
    socialLoginsEnabled() {
      if (!this.showSmLogin) {
        return false;
      }
      const a = Object.values(this.logins);
      const b = a.find((v) => v == '1');
      if (b) {
        return true;
      }
      return false;
    },
  },
  watch: {},
  methods: {
    ...mapActions({
      appLogin: 'auth/login',
      popToast: 'toast/popToast',
    }),
    async login() {
      this.loading = true;
      this.errors = null;
      try {
        await this.appLogin(this.form).then((response) => {
          this.loading = false;
          // this.$router.push({ name: 'home' })
        });
      } catch (e) {
        if (e.status === 422) {
          this.errors = e.data.errors;
          this.popToast({
            message: Object.values(this.errors).flat().toString(),
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
