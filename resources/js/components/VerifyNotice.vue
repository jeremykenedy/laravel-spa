<template>
  <div
    class="w-full bg-yellow-500 p-2 text-white opacity-80 shadow-md hover:opacity-100"
  >
    <div class="mx-auto flex max-w-screen-lg items-center justify-between">
      <div>
        Your email address is not verified , please check your mail inbox !
      </div>
      <button
        v-if="!sent"
        class="rounded bg-green-600 py-2 px-3 text-white"
        @click="resend"
      >
        resend link ?
      </button>
      <div
        v-else
        class="rounded bg-blue-600 py-2 px-3 text-white"
        @click="resend"
      >
        Email Sent !
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sent: false,
    };
  },
  methods: {
    resend() {
      this.$store
        .dispatch('verifyResend', { id: this.id })
        .then((res) => {
          // eslint-disable-line no-unused-vars
          this.sent = true;
        })
        .catch((err) => {
          // eslint-disable-line no-unused-vars
          this.error = 'internal error please try again later';
        });
    },
  },
};
</script>
