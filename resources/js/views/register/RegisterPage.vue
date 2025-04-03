<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border">
          <div class="border-b px-4 py-3 font-semibold text-gray-600">
            {{ $t('register') }}
          </div>
          <div class="rounded bg-white p-4 dark:bg-slate-800">
            <!-- <Errors v-if="errors && useInlineMessage" :content="form.errors" type="error" @close="errors = null" /> -->
            <form class="mx-auto w-full rounded md:w-10/12 md:p-4" @submit.prevent="submitRegister">
              <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
                <label
                  for="name"
                  class="w-4/12"
                  :class="validationErrors?.name ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'"
                >
                  {{ $t('name') }}
                </label>
                <div class="sm:mt-0 sm:w-8/12">
                  <input
                    id="name"
                    v-model="registerForm.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    :class="{ 'border-red-500': validationErrors?.name }"
                    :disabled="processing.value"
                    class="w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  />
                  <div v-for="message in validationErrors?.name" :key="message" class="text-xs text-red-500 absolute">
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
                <label
                  for="email"
                  class="w-4/12 dark:text-gray-200"
                  :class="validationErrors?.email ? 'text-red-500' : 'text-gray-700 dark:text-gray-200 '"
                >
                  {{ $t('email') }}
                </label>
                <div class="sm:mt-0 sm:w-8/12">
                  <input
                    id="email"
                    v-model="registerForm.email"
                    type="email"
                    name="email"
                    autocomplete="username"
                    :class="{ 'border-red-500': validationErrors?.email }"
                    :disabled="processing.value"
                    class="w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  />
                  <div v-for="message in validationErrors?.email" :key="message" class="text-xs text-red-500 absolute">
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
                <label
                  for="password"
                  class="w-4/12"
                  :class="validationErrors?.password ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'"
                >
                  {{ $t('password') }}
                </label>
                <div class="sm:mt-0 sm:w-8/12">
                  <input
                    id="password"
                    v-model="registerForm.password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    :class="{ 'border-red-500': validationErrors?.password }"
                    :disabled="processing.value"
                    class="w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  />
                  <div
                    v-for="message in validationErrors?.password"
                    :key="message"
                    class="text-xs text-red-500 absolute"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
                <label
                  for="Password confirm"
                  class="w-4/12"
                  :class="validationErrors?.password ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'"
                >
                  {{ $t('confirm_password') }}
                </label>
                <div class="sm:mt-0 sm:w-8/12">
                  <input
                    id="password_confirmation"
                    v-model="registerForm.password_confirmation"
                    type="password"
                    name="password_confirmation"
                    :class="{ 'border-red-500': validationErrors?.password }"
                    :disabled="processing.value"
                    class="w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  />
                  <div
                    v-for="message in validationErrors?.password_confirmation"
                    :key="message"
                    class="text-xs text-red-500 absolute"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="my-1 w-full rounded py-2 sm:flex sm:items-center sm:justify-end">
                <div class="mt-3 flex w-full items-center justify-between rounded sm:mt-0 sm:w-8/12">
                  <AppButton
                    primary
                    :loading="processing.value"
                    :disabled="processing.value"
                    :text="processing.value ? $t('register') : $t('register')"
                    btn-class="uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
                    type="submit"
                  >
                    <template #text>
                      <ArrowRightOnRectangleIcon v-if="!processing.value" class="mr-2 h-6 w-6" />
                      <CircleSvg v-if="processing.value" class="mr-2 h-6 w-6" />
                      {{ $t('register') }}
                    </template>
                  </AppButton>
                  <span class="text-sm">
                    <span class="mr-1 cursor-default text-gray-700 dark:text-gray-200">
                      {{ $t('alreadymember') }}
                    </span>
                    <router-link
                      :to="{ name: 'auth.login' }"
                      class="text-sm font-bold text-blue-500 hover:text-blue-300"
                    >
                      {{ $t('signin') }}
                    </router-link>
                  </span>
                </div>
              </div>
            </form>
            <div v-if="socialLoginsEnabled" class="mt-5">
              <div
                class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"
              >
                <p class="mx-4 mb-0 text-center font-semibold">Or</p>
              </div>
              <h3 class="mb-3 font-bold text-gray-700">Register with</h3>
              <SocialiteLogins signup />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useAuth from '@/composables/auth';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import SocialiteLogins from '@components/auth/SocialiteLogins.vue';
import CircleSvg from '@components/common/CircleSvg.vue';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
// import Errors from '@components/ErrorsNotice.vue';
const { registerForm, validationErrors, processing, submitRegister } = useAuth();
const { socials } = useAuthStore();
const socialLoginsEnabled = computed(() => {
  if (Object.values(socials).find((v) => v == '1')) {
    return true;
  }
  return false;
});
</script>
