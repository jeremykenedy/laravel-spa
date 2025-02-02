<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <form @submit.prevent="submitLogin">
              <div class="">
                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">{{ $t('email') }}</label>
                  <input v-model="loginForm.email" id="email" type="email" class="form-control" autofocus
                    autocomplete="username">
                  <!-- Validation Errors -->
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.email">
                      {{ message }}
                    </div>
                  </div>
                </div>
                <!-- Password -->
                <div class="mb-4">
                  <label for="password" class="form-label">
                    {{ $t('password') }}
                  </label>
                  <input v-model="loginForm.password" id="password" type="password" class="form-control"
                    autocomplete="current-password">
                  <!-- Validation Errors -->
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.password">
                      {{ message }}
                    </div>
                  </div>
                </div>
                <!-- Remember me -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="remember" v-model="loginForm.remember"
                    id="flexCheckIndeterminate">
                  <label class="form-check-label" for="flexCheckIndeterminate">
                    {{ $t('remember_me') }}
                  </label>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end mt-4">
                  <button class="btn btn-primary" :class="{ 'opacity-25': processing }" :disabled="processing">
                    {{ $t('login') }}
                  </button>
                </div>
              </div>
              <router-link :to="{ name: 'auth.forgot-password' }">{{ $t('forgot_password') }}</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import useAuth from '@/composables/auth'

const { loginForm, validationErrors, processing, submitLogin } = useAuth();

</script>
