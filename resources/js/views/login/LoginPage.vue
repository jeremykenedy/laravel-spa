<template>
  <section>
    <div class="mx-auto mt-10 max-w-7xl px-4 text-gray-800 sm:px-6">
      <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img :src="loginImage" class="w-full" :alt="loginImageAlt" />
        </div>
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
          <form @submit.prevent="submitLogin">
            <div class="mb-7 md:mt-16 lg:mt-12">
              <label for="email" class="text-small mb-2 hidden" :class="{ 'text-red-500': validationErrors?.email }">
                {{ $t('email') }}
              </label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                autofocus
                autocomplete="username"
                class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:text-gray-100 dark:bg-gray-800"
                :class="{ 'border-red-500': validationErrors?.email }"
                :disabled="processing.value"
                :placeholder="$t('email')"
              />
              <div v-for="message in validationErrors?.email" :key="message" class="mt-1 text-sm text-red-500 absolute">
                {{ message }}
              </div>
            </div>
            <div class="mb-7">
              <label
                for="password"
                class="text-small mb-2 hidden"
                :class="{ 'text-red-500': validationErrors?.password }"
              >
                {{ $t('password') }}
              </label>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                autocomplete="current-password"
                class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:text-gray-100 dark:bg-gray-800"
                :class="{ 'border-red-500': validationErrors?.password }"
                :disabled="processing.value"
                :placeholder="$t('password')"
              />
              <div v-if="validationErrors?.password" class="absolute">
                <div v-for="message in validationErrors?.password" :key="message" class="mt-1 text-sm text-red-500">
                  {{ message }}
                </div>
              </div>
            </div>
            <div class="mb-6 flex items-center justify-between">
              <div class="form-group form-check">
                <input
                  id="flexCheckIndeterminate"
                  v-model="loginForm.remember"
                  name="remember"
                  type="checkbox"
                  class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none dark:bg-gray-800"
                />
                <label
                  class="form-check-label inline-block cursor-pointer text-gray-800 dark:text-gray-100 mt-1"
                  for="flexCheckIndeterminate"
                  >{{ $t('remember_me') }}</label
                >
              </div>
              <router-link
                :to="{ name: 'auth.forgot-password' }"
                class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 mb-2"
              >
                {{ $t('forgot_password') }}
              </router-link>
            </div>
            <div class="text-center lg:text-left">
              <AppButton
                primary
                :loading="processing.value"
                :disabled="processing.value"
                :text="processing.value ? $t('login') : $t('login')"
                btn-class="leading-snug px-7 py-3 text-sm uppercase leading-snug shadow-md"
                :class="{ 'opacity-25': processing.value }"
                type="submit"
              >
                <template #text>
                  <ArrowRightOnRectangleIcon v-if="!processing.value" class="mr-2 h-6 w-6" />
                  <CircleSvg v-if="processing.value" class="mr-2 h-6 w-6" />
                  {{ $t('login') }}
                </template>
              </AppButton>

              <div v-if="socialLoginsEnabled" class="mt-5">
                <div
                  class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"
                >
                  <p class="mx-4 mb-0 text-center font-semibold dark:text-gray-400 cursor-default">Or</p>
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

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAuth from '@composables/auth';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
const { userCan, userIs, user, authenticated, socials } = useAuthStore();
const { popToast, success, error } = useToastStore();
const toast = useToastStore();
const router = useRouter();
const { loginForm, validationErrors, processing, submitLogin } = useAuth();
const socialLoginsEnabled = computed(() => {
  if (Object.values(socials).find((v) => v == '1')) {
    return true;
  }
  return false;
});
</script>

<script>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import CircleSvg from '@components/common/CircleSvg.vue';
import SocialiteLogins from '@components/auth/SocialiteLogins.vue';
import loginImg from '@img/login.png';

export default {
  name: 'LoginPage',
  components: {
    ArrowRightOnRectangleIcon,
    CircleSvg,
    SocialiteLogins,
  },
  props: {
    showSmLogin: { type: Boolean, default: true },
  },
  data() {
    return {
      loginImage: loginImg,
      loginImageAlt: 'Login Image',
    };
  },
};
</script>
