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
            <div
              v-if="showSmLogin"
              class="flex flex-row items-center justify-center lg:justify-start"
            >
              <p class="mb-0 mr-4 text-lg">Sign in with</p>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="mx-1 inline-block rounded-full bg-blue-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="mx-1 inline-block rounded-full bg-blue-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  />
                </svg>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="mx-1 inline-block rounded-full bg-blue-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </button>
            </div>

            <div
              v-if="showSmLogin"
              class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"
            >
              <p class="mx-4 mb-0 text-center font-semibold">Or</p>
            </div>

            <div class="mb-6" :class="showSmLogin ? '' : 'md:mt-16 lg:mt-12'">
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
                :loading="loading"
                :disabled="loading"
                :text="loading ? 'Login' : 'Login'"
                btn-class="leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CircleSvg from '@components/CircleSvg.vue';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    ArrowRightOnRectangleIcon,
    CircleSvg,
  },
  props: {
    showSmLogin: { type: Boolean, default: false },
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
  computed: {},
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
