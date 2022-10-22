<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div
          class="w-auto rounded border-gray-300 bg-white p-3 text-gray-800 shadow dark:bg-slate-900 dark:text-gray-100"
        >
          <success v-if="success" :content="success" @close="success = null" />
          <errors
            v-if="errors"
            :content="errors"
            container-class="w-full"
            @close="errors = null"
          />

          <h5 class="border-gray-300 p-3 pt-6 text-center font-semibold">
            {{
              user && user.email_verified_at
                ? 'Your email is already confirmed'
                : 'Please confirm verification of your email'
            }}
          </h5>

          <div class="rounded p-4">
            <div
              class="my-1 mx-auto mt-3 flex w-full items-center justify-center py-2 sm:mt-0 sm:w-8/12 md:w-10/12 md:p-4"
            >
              <div v-if="user && user.email_verified_at">
                <div class="text-center">
                  <router-link
                    v-if="authenticated"
                    v-slot="{ isActive }"
                    :to="{ name: 'dashboard' }"
                    class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
                    @click="closeDrop"
                  >
                    <HomeIcon class="mx-auto mb-3 h-20 w-20 text-center" />
                    <span class="sr-only">Go Home</span>
                  </router-link>
                </div>
              </div>
              <div v-else>
                <div
                  v-if="loading"
                  class="flex items-center justify-center rounded-sm bg-blue-500 p-2 px-6 text-white hover:bg-blue-600"
                >
                  Verifying Email
                  <circle-svg class="ml-3 h-5 w-5" />
                </div>
                <AppButton
                  v-else
                  :disabled="loading"
                  :loading="loading"
                  @click="errors ? resend() : verify()"
                >
                  <template #text>
                    {{
                      errors ? 'Oops! Resend Verification?' : 'Click to Verify'
                    }}
                    <span
                      class="fa-fw fa-envelope ml-2"
                      :class="errors ? 'far fa-envelope' : 'fas fa-check'"
                    />
                  </template>
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Errors from '../components/Errors.vue';
import Success from '../components/Success.vue';
import CircleSvg from '../components/CircleSvg.vue';
import { HomeIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    Errors,
    Success,
    CircleSvg,
    HomeIcon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errors: null,
      success: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  methods: {
    ...mapActions({
      verifyResend: 'auth/verifyResend',
      verifyEmail: 'auth/verifyEmail',
      popToast: 'toast/popToast',
    }),
    async verify() {
      this.loading = true;
      this.errors = null;
      this.success = '';
      try {
        await this.verifyEmail({ id: this.id, hash: this.hash }).then(
          (response) => {
            this.loading = false;
            this.success = 'Email Successfully Verified. Redirecting ...';
            this.popToast({
              message: 'Email Successfully Verified',
              timer: 5000,
              icon: 'success',
            });
            setTimeout(() => {
              this.$router.push({ name: 'dashboard' });
            }, 1000);
          },
        );
      } catch (e) {
        this.errors = 'An errored, please try again later';
        this.popToast({
          message: 'An errored, please try again later.',
          timer: 5000,
          icon: 'error',
        });
        this.loading = false;
      }
      this.loading = false;
    },
    async resend() {
      this.loading = true;
      try {
        await this.verifyResend({ id: this.id }).then((response) => {
          this.loading = false;
          this.popToast({
            message: 'Email sent.',
            timer: 5000,
            icon: 'success',
          });
        });
      } catch (e) {
        this.popToast({
          message: 'An errored, please try again later.',
          timer: 5000,
          icon: 'error',
        });
        this.loading = false;
      }
    },
  },
};
</script>
