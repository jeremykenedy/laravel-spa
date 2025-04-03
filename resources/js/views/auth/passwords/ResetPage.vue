<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto border rounded">
          <div class="border-b p-4 font-semibold text-gray-700 dark:text-gray-300">
            {{ $t('reset_your_password') }}
          </div>
          <div class="p-4">
            <div
              v-if="success.value"
              class="mx-auto text-center py-6 bg-green-500 rounded border-0 text-white relative"
            >
              <CheckCircleIcon class="h-20 w-20 mx-auto" />
              <p class="font-semibold">
                {{ $t('password_reset_success') }}
              </p>
            </div>

            <router-link v-if="success.value" :to="{ name: 'auth.login' }" class="w-full">
              <AppButton primary :text="$t('signin')" class="mt-4 w-full">
                <template #text>
                  {{ $t('signin') }}
                  <ArrowLeftOnRectangleIcon class="ml-2 h-6 w-6" />
                </template>
              </AppButton>
            </router-link>

            <div v-if="!success.value">
              <form class="mx-auto w-full md:w-10/12 md:p-4" @submit.prevent="submitResetPassword">
                <input id="username" name="username" type="hidden" readonly disabled />
                <input id="email" v-model="resetForm.email" type="hidden" autocomplete="email" readonly disabled />
                <div class="my-1 w-full py-2 mb-2 sm:flex sm:items-center sm:justify-between">
                  <label
                    for="password"
                    class="w-4/12 dark:text-gray-100"
                    :class="{
                      'text-red-500 dark:text-red-500':
                        validationErrors?.password || validationErrors?.password_confirmation,
                    }"
                  >
                    {{ $t('password') }}
                  </label>
                  <div class="w-full sm:mt-0 sm:w-8/1">
                    <input
                      id="password"
                      v-model="resetForm.password"
                      type="password"
                      name="password"
                      autocomplete="new-password"
                      class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none2"
                      :class="{
                        'text-red-500 dark:text-red-500 dark:border-red-500':
                          validationErrors?.password || validationErrors?.password_confirmation,
                      }"
                      :disabled="processing.value"
                    />
                    <div v-if="validationErrors?.password" class="absolute">
                      <div
                        v-for="message in validationErrors?.password"
                        :key="message"
                        class="mt-1 text-xs text-red-500"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-1 w-full py-2 mb-2 sm:flex sm:items-center sm:justify-between">
                  <label
                    for="password_confirmation"
                    class="w-4/12 dark:text-gray-100"
                    :class="{
                      'text-red-500 dark:text-red-500':
                        validationErrors?.password || validationErrors?.password_confirmation,
                    }"
                  >
                    {{ $t('confirm_password') }}
                  </label>
                  <div class="w-full sm:mt-0 sm:w-8/1">
                    <input
                      id="password_confirmation"
                      v-model="resetForm.password_confirmation"
                      type="password"
                      autocomplete="new-password"
                      name="password_confirmation"
                      class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none2"
                      :class="{
                        'text-red-500 dark:text-red-500 dark:border-red-500':
                          validationErrors?.password || validationErrors?.password_confirmation,
                      }"
                      :disabled="processing.value"
                    />
                    <div v-if="validationErrors?.password_confirmation" class="absolute">
                      <div
                        v-for="message in validationErrors?.password_confirmation"
                        :key="message"
                        class="mt-1 text-xs text-red-500"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="validationErrors?.email" class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-start">
                  <div v-for="message in validationErrors?.email" :key="message" class="mt-1 text-sm text-red-500">
                    {{ message }}
                  </div>
                </div>

                <div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end">
                  <div class="mt-3 flex w-full items-center justify-end sm:mt-0 sm:w-8/12">
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
                        <CircleSvg v-if="processing.value" class="mr-2 h-5 w-5" />
                        {{ $t('reset_password') }}
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
  </div>
</template>

<script setup>
import useAuth from '@composables/auth';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const route = useRoute();

onMounted(() => {
  resetForm.token = route.params.token;
  resetForm.email = route.query.email;
});

const { resetForm, validationErrors, processing, submitResetPassword, success } = useAuth();
</script>
<script>
import CircleSvg from '@components/common/CircleSvg.vue';
import { CheckCircleIcon, PaperAirplaneIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    CircleSvg,
    CheckCircleIcon,
    PaperAirplaneIcon,
    ArrowLeftOnRectangleIcon,
  },
};
</script>

<style scoped></style>
