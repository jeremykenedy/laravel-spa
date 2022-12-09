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
        primary
        :loading="loading"
        :disabled="sent"
        btn-class="leading-snug inline-block px-5 py-1 text-xs font-medium"
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
