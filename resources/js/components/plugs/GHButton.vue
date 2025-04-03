<template>
  <div>
    <!--
    <iframe
      src="https://ghbtns.com/github-btn.html?user=jeremykenedy&repo=laravel-spa&type=star&count=true"
      frameborder="0"
      scrolling="0"
      width="170px"
      height="20px"
      class="d-block ml-auto mr-auto"
    />
    -->
    <github-button
      :href="repo"
      :data-color-scheme="colors"
      :data-size="size"
      :data-show-count="showCount"
      :aria-label="ariaLabel"
      @click="track"
    >
      Star
    </github-button>
  </div>
</template>

<script lang="ts">
// import { track } from '@services/analytics';
import GithubButton from 'vue-github-button';

export default {
  name: 'GHButton',
  components: { GithubButton },
  props: {
    repo: {
      type: String,
      default: 'https://github.com/jeremykenedy/laravel-spa',
    },
    colors: {
      type: String,
      default: 'no-preference: light; light: light; dark: dark_high_contrast;',
    },
    size: { type: String, default: 'large' },
    showCount: { type: Boolean, default: true },
    ariaLabel: {
      type: String,
      default: 'Star buttons/github-buttons on GitHub',
    },
  },
  methods: {
    track,
  },
};
</script>
