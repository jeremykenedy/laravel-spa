<template>
  <div class="rounded-lg p-12 text-center">
    <div class="mb-5 flex items-center justify-between">
      <BanknotesIcon class="r-2 flex h-20 w-20 w-0 flex-1 justify-start text-green-400 dark:text-green-200" />
    </div>
    <h1 class="mb-5 text-4xl quicksand-font text-slate-500 dark:text-slate-100">
      Welcome {{ user && user.name ? ' ' + user.name : '' }}!
    </h1>
    <h1 class="mb-2 text-4xl mb-5 quicksand-font text-slate-500 dark:text-slate-300">
      {{ appName }}
    </h1>
    <p class="mb-2 text-2xl text-slate-500 dark:text-slate-300">Laravel / Vite / Vue3 / TailwindCSS</p>
    <div v-if="enableGhButtons" class="mb-3 p-5">
      <GHButtons show-star show-fork show-watch show-sponsor show-download show-count show-tips />
    </div>
    <div v-if="enableVultrReferral" class="mb-3">
      <VultrReferral />
    </div>
    <div v-if="enableBmcButtons" class="mb-3 pb-3">
      <BmcButtons />
    </div>
  </div>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import GHButtons from '@components/plugs/GHButtons.vue';
import BmcButtons from '@components/plugs/BmcButtons.vue';
import PatreonButton from '@components/plugs/PatreonButton.vue';
import VultrReferral from '@components/plugs/VultrReferral.vue';

export default {
  name: 'HomePage',
  components: {
    BanknotesIcon,
    GHButtons,
    BmcButtons,
    VultrReferral,
  },
  props: {
    enableGhButtons: { type: Boolean, default: true },
    enableVultrReferral: { type: Boolean, default: true },
    enableBmcButtons: { type: Boolean, default: true },
    enablePatreonButton: { type: Boolean, default: true },
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
  },
};
</script>
