<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto border rounded">
          <div class="border-b p-4 font-semibold text-gray-700">
            {{ $t('reset_your_password') }}
          </div>
          <div class="p-4">
            <div v-if="success" class="mx-auto text-center py-6 bg-green-500 rounded border-0 text-white relative">
              <span class="absolute top-2 right-2 cursor-pointer font-bold" @click="dismissSuccess">
                <XMarkIcon class="h-5 w-5" />
              </span>
              <CheckCircleIcon class="h-20 w-20 mx-auto" />
              <p class="font-semibold">
                {{ $t('send_email_success') }}
              </p>
            </div>
            <form class="mx-auto w-full md:w-10/12 md:p-4" @submit.prevent="submitForgotPassword">
              <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between">
                <label
                  for="email"
                  class="w-4/12 dark:text-gray-200"
                  :class="{
                    'text-red-500': validationErrors?.email,
                  }"
                >
                  {{ $t('email') }}
                </label>
                <div class="sm:mt-0 sm:w-8/12">
                  <input
                    id="email"
                    v-model="forgotForm.email"
                    type="email"
                    name="email"
                    autocomplete="username"
                    :class="{
                      'border-red-500': validationErrors?.email,
                    }"
                    :disabled="processing.value"
                    class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none"
                    autofocus
                  />
                  <div v-if="validationErrors?.email" class="absolute">
                    <div v-for="message in validationErrors?.email" :key="message" class="mt-1 text-sm text-red-500">
                      {{ message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-1 mt-7 w-full py-2 sm:flex sm:items-center sm:justify-end">
                <div class="flex w-full items-center justify-between sm:mt-0 sm:w-8/12">
                  <AppButton
                    :loading="processing.value"
                    :disabled="processing.value || success"
                    :text="processing.value ? 'Send Email' : 'Send Email'"
                    btn-class="uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
                    type="submit"
                  >
                    <template #text>
                      <PaperAirplaneIcon v-if="!processing.value && !success" class="mr-2 h-6 w-6" />
                      <CheckCircleIcon v-if="!processing.value && success" class="mr-2 h-6 w-6" />
                      <CircleSvg v-if="processing.value" class="mr-2 h-6 w-6" />
                      {{ $t('send_email') }}
                    </template>
                  </AppButton>
                  <router-link :to="{ name: 'auth.login' }" class="text-sm font-bold text-blue-500 hover:underline">
                    <span class="fa fa-reply fa-fw" /> {{ $t('go_back') }}
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/composables/auth';
const { forgotForm, validationErrors, processing, submitForgotPassword, success, dismissSuccess } = useAuth();
</script>
<script>
import CircleSvg from '@components/common/CircleSvg.vue';
import { PaperAirplaneIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    CircleSvg,
    CheckCircleIcon,
  },
  props: {
    useSuccess: { type: Boolean, default: true },
  },
};
</script>

<style scoped></style>
