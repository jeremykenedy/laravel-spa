<template>
  <AppButton
    text="Buy me a coffee"
    type="button"
    class="bmc-button inline-block rounded-lg bg-red-500 pl-5 pr-6 pt-4 pb-4 shadow-lg hover:bg-red-600 hover:shadow-none"
    @click.prevent="openLink"
  >
    <template #text>
      <svg height="546px" version="1.1" viewBox="0 0 569 546" width="569px" xmlns="http://www.w3.org/2000/svg">
        <title>Patreon logo</title>
        <g>
          <circle cx="362.589996" cy="204.589996" data-fill="1" fill="#FFFFFF" r="204.589996" />
          <rect data-fill="1" height="545.799988" width="100" x="0" y="0" />
        </g>
      </svg>
      <span class="text-1xl ml-2 font-bold text-white">{{ patreonText }}</span>
    </template>
  </AppButton>
</template>

<script>
import { track } from '@services/analytics';

export default {
  name: 'BmcButtons',
  props: {
    baseUrl: { type: String, default: 'https://www.patreon.com/bePatron?u=' },
    patreonId: { type: String, default: '10119959' },
    patreonText: { type: String, default: 'Become a Patron!' },
  },
  mounted() {
    const scr = document.createElement('script');
    scr.setAttribute('src', 'https://c6.patreon.com/becomePatronButton.bundle.js');
    document.head.appendChild(scr);
  },
  methods: {
    track,
    openLink() {
      this.track('Clicked ' + this.patreonText + ' Button');
      window.open(this.baseUrl + this.patreonId, '_blank');
    },
  },
};
</script>

<style scoped>
.bmc-button span {
  font-family: 'Nunito', sans-serif;
}

svg {
  height: 1rem;
  width: 1rem;
}
</style>
