<template>
  <div v-if="ghBbuttonEnable" class="github-buttons">
    <github-button
      v-if="showFollow && ghUser"
      :href="ghBaseUrl + ghUser"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="followTitle + ghUser + ' on ' + serviceName"
      class="gh-button"
      @click="track('Clicked ' + followTitle + ghUser + ' on ' + serviceName)"
    >
      {{ followTitle }}{{ ghUser }}
    </github-button>
    <github-button
      v-if="showStar && ghUser && ghRepo"
      v-tippy="showTips ? starTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName : null"
      :href="ghBaseUrl + ghUser + '/' + ghRepo"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-icon="starIcon"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="starTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName"
      class="gh-button"
      @click="track('Clicked ' + starTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName)"
    >
      {{ starTitle }}
    </github-button>
    <github-button
      v-if="showFork && ghUser && ghRepo"
      v-tippy="showTips ? starTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName : null"
      :href="ghBaseUrl + ghUser + '/' + ghRepo + '/fork'"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-icon="forkIcon"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="forkTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName"
      class="gh-button"
      @click="track('Clicked ' + forkTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName)"
    >
      {{ forkTitle }}
    </github-button>
    <github-button
      v-if="showIssue && ghUser && ghRepo"
      v-tippy="
        showTips ? 'Show ' + issueTitle + ' for ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName : null
      "
      :href="ghBaseUrl + ghUser + '/' + ghRepo + '/issues'"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-icon="issueIcon"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="issueTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName"
      class="gh-button"
      @click="track('Clicked ' + issueTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName)"
    >
      {{ issueTitle }}
    </github-button>
    <github-button
      v-if="showWatch && ghUser && ghRepo"
      v-tippy="showTips ? watchTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName : null"
      :href="ghBaseUrl + ghUser + '/' + ghRepo + '/subscription'"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-icon="watchIcon"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="watchTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName"
      class="gh-button"
      @click="track('Clicked ' + watchTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' on ' + serviceName)"
    >
      {{ watchTitle }}
    </github-button>

    <github-button
      v-if="showSponsor && ghUser"
      v-tippy="showTips ? 'Sponsor @' + ghUser + ' on GitHub' : null"
      :href="ghBaseUrl + 'sponsors/' + ghUser"
      :data-icon="sponsorIcon"
      :data-size="size"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :aria-label="'Sponsor @' + ghUser + ' on GitHub'"
      class="gh-button"
      @click="track('Clicked ' + sponsorTitle + ' ' + ghBaseUrl + 'sponsors/' + ghUser)"
    >
      {{ sponsorTitle }}
    </github-button>

    <github-button
      v-if="showDownload && ghUser && ghRepo"
      v-tippy="
        showTips ? downloadTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' directly from ' + serviceName : null
      "
      :href="ghBaseUrl + ghUser + '/' + ghRepo + '/archive/HEAD.zip'"
      :data-color-scheme="isDarkMode ? darkVariant : lightVariant"
      :data-icon="downloadIcon"
      :data-size="size"
      :data-show-count="showCountString"
      :aria-label="downloadTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' directly from ' + serviceName"
      class="gh-button"
      @click="
        track('Clicked ' + downloadTitle + ' ' + ghBaseUrl + ghUser + '/' + ghRepo + ' directly from ' + serviceName)
      "
    >
      {{ downloadTitle }}
    </github-button>
  </div>
</template>

<script lang="ts">
import { mapStores, mapState, mapActions } from 'pinia';
import { track } from '@services/analytics';
import GithubButton from 'vue-github-button';
import { useAuthStore } from '@/store/auth';
// https://buttons.github.io/

export default {
  name: 'GHButtons',
  components: { GithubButton },
  props: {
    serviceName: { type: String, default: 'GitHub' },
    lightVariant: { type: String, default: 'light' }, // light_high_contrast
    darkVariant: { type: String, default: 'dark_high_contrast' }, // dark dark_dimmed
    size: { type: String, default: 'large' },
    showTips: { type: Boolean, default: false },
    showCount: { type: Boolean, default: false },
    showFollow: { type: Boolean, default: false },
    showStar: { type: Boolean, default: false },
    showFork: { type: Boolean, default: false },
    showIssue: { type: Boolean, default: false },
    showWatch: { type: Boolean, default: false },
    showSponsor: { type: Boolean, default: false },
    showDownload: { type: Boolean, default: false },
    followTitle: { type: String, default: 'Follow @' },
    starIcon: { type: String, default: 'octicon-star' },
    starTitle: { type: String, default: 'Star' },
    forkIcon: { type: String, default: 'octicon-repo-forked' },
    forkTitle: { type: String, default: 'Fork' },
    issueIcon: { type: String, default: 'octicon-issue-opened' },
    issueTitle: { type: String, default: 'Issue' },
    watchIcon: { type: String, default: 'octicon-eye' },
    watchTitle: { type: String, default: 'Watch' },
    downloadIcon: { type: String, default: 'octicon-download' },
    downloadTitle: { type: String, default: 'Download' },
    sponsorTitle: { type: String, default: 'Sponsor' },
    sponsorIcon: { type: String, default: 'octicon-heart' },
    frequency: { type: String, default: 'recurring' }, // one-time
  },
  mounted() {
    if (this.user && this.user.id) {
      localStorage.setItem('data-theme', this.user.theme_dark);
      if (this.user.theme_dark) {
        this.darkMode = 'dark';
      } else {
        this.darkMode = 'light';
      }
    } else {
      this.darkMode = localStorage.getItem('data-theme');
    }
    window.addEventListener('theme-localstorage-changed', (event) => {
      this.darkMode = event.detail.storage;
    });
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
    isDarkMode() {
      if (this.darkMode == 'dark') {
        return true;
      }
      return false;
    },
    showCountString() {
      return this.showCount.toString();
    },
    ghBbuttonEnable() {
      return GH_BUTTONS_ENABLED;
    },
    ghBaseUrl() {
      return GH_BUTTONS_BASE_URL;
    },
    ghUser() {
      return GH_BUTTONS_USERNAME;
    },
    ghRepo() {
      return GH_BUTTONS_REPO;
    },
  },
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    track,
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
