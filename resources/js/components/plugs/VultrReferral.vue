<template>
  <div>
    <div
      v-if="VULTR_REFERRAL_ENABLED"
      class="border-1 mb-5 inline-block flex-auto items-center rounded-md border border-blue-400 bg-gray-100 p-0 shadow-lg dark:bg-gray-900"
    >
      <a
        :href="VULTR_REFERRAL_LINK"
        target="_blank"
        style="min-height: 200px; min-width: 300px"
        @click="track('User Clicked Vultr Referral Link')"
      >
        <img
          :src="referralImage"
          alt="Vultr Hosting Services"
          class="ml-auto mr-auto mb-4 rounded-t"
          style="width: 100%; max-width: 300px"
        />
        <h2 class="mb-4 text-2xl font-medium text-slate-700 dark:text-slate-100">
          <em>Try <strong>VULTR</strong> for free with </em>
          <br />
          <strong>$100 free credit!</strong>
        </h2>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { track } from '@services/analytics';
import vultr1 from '@img/vendor-logos/vultr-1.webp';
import vultr2 from '@img/vendor-logos/vultr-2.png';

export default {
  name: 'VultrReferral',
  data() {
    return {
      VULTR_REFERRAL_ENABLED: VULTR_REFERRAL_ENABLED,
      VULTR_REFERRAL_LINK: VULTR_REFERRAL_LINK,
      images: [vultr1, vultr2],
    };
  },
  computed: {
    referralImage() {
      return this.images[Math.floor(Math.random() * this.images.length)];
    },
  },
  methods: {
    track,
  },
};
</script>
