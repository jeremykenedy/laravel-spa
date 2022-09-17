<template>
  <div class="mx-auto max-w-screen-md text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto border">
          <div class="border p-4 font-semibold">Verify your email !</div>

          <div class="bg-white p-4">
            <success
              v-if="success"
              :content="success"
              @close="success = null"
            />
            <errors v-if="errors" :content="errors" @close="errors = null" />

            <!-- <div v-if="errors" class="md:w-10/12 md:p-2 w-full mx-auto text-sm text-red-500 text-white text-center">
                        {{errors}}
                    </div> -->

            <div
              class="my-1 mx-auto mt-3 flex w-full items-center justify-center py-2 sm:mt-0 sm:w-8/12 md:w-10/12 md:p-4"
            >
              <div
                v-if="busy"
                class="flex items-center justify-center rounded-sm bg-blue-500 p-2 px-6 text-white hover:bg-blue-600"
              >
                <circle-svg class="h-6 w-6" />
              </div>
              <button
                v-else
                :class="
                  'rounded-sm p-3 text-white' +
                  (!errors
                    ? ' bg-blue-500 hover:bg-blue-600'
                    : ' bg-red-400 text-white hover:bg-red-600')
                "
                @click="errors ? resend() : verify()"
              >
                {{ errors ? 'Oops ! Resend ?' : 'Click to Verify' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { XIcon } from '@heroicons/vue/solid'
import Errors from '../components/Errors.vue';
import Success from '../components/Success.vue';
import CircleSvg from '../components/CircleSvg.vue';
export default {
  components: {
    // XIcon,
    Errors,
    Success,
    CircleSvg,
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
      busy: false,
    };
  },
  methods: {
    async verify() {
      this.busy = true;
      this.errors = null;
      this.success = '';
      await this.$store
        .dispatch('verifyEmail', { id: this.id, hash: this.hash })
        .then((res) => {
          this.success = res.data.message
            ? res.data.message + ' Redirecting ...'
            : ' Redirecting ...';
          setTimeout(() => {
            this.$router.push({ name: 'home' });
          }, 1000);
        })
        .catch((err) => {
          this.errors = 'internal error ! plzase try again later .';
        });
      this.busy = false;
    },

    resend() {
      this.errors = null;
      this.success = '';
      this.$store
        .dispatch('verifyResend', { id: this.id })
        .then((res) => {
          this.success = res.data.message + ' Redirecting ...';
          setTimeout(() => {
            this.$router.push({ name: 'home' });
          }, 1000);
        })
        .catch((err) => {
          this.errors = 'internal error ! plzase try again later .';
          setTimeout(() => {
            this.$router.push({ name: 'home' });
          }, 1000);
        });
    },
  },
};
</script>
