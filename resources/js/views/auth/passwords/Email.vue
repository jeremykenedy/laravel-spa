<template>
    <div class="container">
        <div class="row justify-content-center my-5">
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <form @submit.prevent="submitForgotPassword">
                            <div class="">
                                <!-- Email -->
                                <div class="mb-3">
                                    <label for="email" class="form-label">{{ $t('email') }}</label>
                                    <input v-model="forgotForm.email" id="email" type="email" class="form-control" autofocus autocomplete="username">
                                    <!-- Validation Errors -->
                                    <div class="text-danger mt-1">
                                        <div v-for="message in validationErrors?.email">
                                            {{ message }}
                                        </div>
                                    </div>
                                </div>
                                <!-- Buttons -->
                                <div class="flex items-center justify-end mt-4">
                                    <button class="btn btn-primary" :class="{ 'opacity-25': processing }" :disabled="processing">
                                        {{ $t('send_password_reset_link') }}
                                    </button>
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
import useAuth from '@/composables/auth'

const { forgotForm, validationErrors, processing, submitForgotPassword } = useAuth();
</script>

<style scoped>

</style>
