<template>
  <div class="mx-auto max-w-screen-lg text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border dark:border-gray-600 m-5">
          <div class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200">
            {{ $t('dashboard') }}
          </div>
          <div class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300">
            <h1 class="mt-4 mb-4 text-center text-2xl">
              {{ greeting() }},
              {{ user && user.name ? user.name : 'Registered User' }}!
            </h1>
            <!-- HERE -->
          </div>
        </div>
        <div class="mt-3 mb-5 p-5 text-center">
          <GHButtons show-follow show-star show-fork show-issue show-watch show-sponsor show-download show-count
            show-tips />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from "@store/auth";
import GHButtons from '@components/plugs/GHButtons.vue';
import { greeting, providerIcon } from '@services/common';

export default {
  name: 'Dashboard',
  components: {
    GHButtons
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
  },
  methods: {
    greeting,
  },
};
</script>


<style scoped>
</style>
