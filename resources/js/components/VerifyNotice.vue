<template>
  <div
    class="w-full bg-yellow-500 p-2 text-white opacity-90 shadow-md hover:opacity-100"
  >
    <div class="mx-auto flex max-w-screen-lg items-center justify-between">
      <div>
        {{
          loading
            ? 'Resending verification email to ' + user.email
            : sent
            ? 'A verification has been sent. Please check your mail inbox!'
            : 'Your email address is not verified. please check your mail inbox!'
        }}
      </div>
      <AppButton
        :loading="loading"
        :disabled="sent"
        btn-class="leading-snug inline-block rounded bg-blue-600 px-5 py-1 text-sm font-medium leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg "
        @click="resend"
      >
        <template #text>
          <CircleSvg v-if="loading" class="mr-2 h-3 w-3" />
          {{ loading ? 'Sending' : sent ? 'Email Sent!' : 'Resend link?' }}
        </template>
      </AppButton>
    </div>
  </div>
</template>

<script>
import CircleSvg from '@components/CircleSvg.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'VerifyNotice',
  components: {
    CircleSvg,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sent: false,
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
      popToast: 'toast/popToast',
    }),
    async resend() {
      this.loading = true;
      try {
        await this.verifyResend({ id: this.id }).then((response) => {
          this.sent = true;
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
