<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto border">
          <div class="border-b p-4 font-semibold text-gray-700">
            {{ $t('reset_your_password') }}
          </div>
          <div class="bg-white p-4">


            <!-- TODO :: HERE -->
            <form @submit.prevent="submitResetPassword">


              <div class="mb-3">
                <label for="email" class="form-label">{{ $t('email') }}</label>
                <input v-model="resetForm.email" id="email" type="email" class="form-control" autofocus
                  autocomplete="email" readonly disabled>

                <div class="text-danger mt-1">
                  <div v-for="message in validationErrors?.email">
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">{{ $t('password') }}</label>
                <input v-model="resetForm.password" id="password" type="password" class="form-control">

                <div class="text-danger mt-1">
                  <div v-for="message in validationErrors?.password">
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label">{{ $t('confirm_password') }}</label>
                <input v-model="resetForm.password_confirmation" id="password_confirmation" type="password"
                  class="form-control">

                <div class="text-danger mt-1">
                  <div v-for="message in validationErrors?.password_confirmation">
                    {{ message }}
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end mt-4">
                <button class="btn btn-primary" :class="{ 'opacity-25': processing }" :disabled="processing">
                  {{ $t('reset_password') }}
                </button>
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
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const route = useRoute();

onMounted(() => {
  resetForm.token = route.params.token;
  resetForm.email = route.query.email
})

const { resetForm, validationErrors, processing, submitResetPassword } = useAuth();
</script>

<style scoped>
</style>
