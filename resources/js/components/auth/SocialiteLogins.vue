<template>
  <div v-if="socialLoginsEnabled" class="flex flex-wrap justify-around">
    <span
      v-if="socials.facebook == 1"
      v-tippy="loginText + ' Facebook'"
      class="fa-brands fa-square-facebook fa-3x mr-3 mb-2 cursor-pointer text-blue-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('facebook')"
    />
    <span
      v-if="socials.twitter == 1"
      v-tippy="loginText + ' X'"
      class="fa-brands fa-x fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('twitter')"
    />
    <span
      v-if="socials.instagram == 1"
      v-tippy="loginText + ' Instagram'"
      class="fa-brands fa-instagram fa-3x mr-3 mb-2 cursor-pointer text-gray-700 dark:text-gray-400 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('instagram')"
    />
    <span
      v-if="socials.github == 1"
      v-tippy="loginText + ' GitHub'"
      class="far fa-brands fa-github fa-3x mr-3 mb-2 cursor-pointer text-gray-800 dark:text-gray-100 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('github')"
    />
    <span
      v-if="socials.youtube == 1"
      v-tippy="loginText + ' YouTube'"
      class="fa-brands fa-youtube fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('youtube')"
    />
    <span
      v-if="socials.google == 1"
      v-tippy="loginText + ' Google'"
      class="fa-brands fa-google fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('google')"
    />
    <span
      v-if="socials.linkedin == 1"
      v-tippy="loginText + ' LinkedIn'"
      class="fa-brands fa-linkedin fa-3x mr-3 mb-2 cursor-pointer text-blue-700 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('linkedin')"
    />
    <span
      v-if="socials.twitch == 1"
      v-tippy="loginText + ' Twitch'"
      class="fa-brands fa-twitch fa-3x mr-3 mb-2 cursor-pointer text-blue-600 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('twitch')"
    />
    <span
      v-if="socials.apple == 1"
      v-tippy="loginText + ' Apple'"
      class="fa-brands fa-apple fa-3x mr-3 mb-2 cursor-pointer text-gray-800 dark:text-gray-300 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('apple')"
    />
    <span
      v-if="socials.microsoft == 1"
      v-tippy="loginText + ' Microsoft'"
      class="fa-brands fa-microsoft fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('microsoft')"
    />
    <span
      v-if="socials.tiktok == 1"
      v-tippy="loginText + ' TikTok'"
      class="fa-brands fa-tiktok fa-3x mr-3 mb-2 cursor-pointer text-pink-600 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('tiktok')"
    />
    <span
      v-if="socials.zoho == 1"
      v-tippy="loginText + ' Zoho'"
      class="fas fa-z fa-3x mr-3 mb-2 cursor-pointer text-yellow-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('zoho')"
    />
    <span
      v-if="socials.stackexchange == 1"
      v-tippy="loginText + ' StackExchange'"
      class="fa-brands fa-stack-exchange fa-3x mr-3 mb-2 cursor-pointer text-blue-400 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('stackexchange')"
    />
    <span
      v-if="socials.gitlab == 1"
      v-tippy="loginText + ' GitLab'"
      class="fa-brands fa-square-gitlab fa-3x mr-3 mb-2 cursor-pointer text-orange-400 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('gitlab')"
    />
    <span
      v-if="socials.reddit == 1"
      v-tippy="loginText + ' GitLab'"
      class="fa-brands fa-square-reddit fa-3x mr-3 mb-2 cursor-pointer text-orange-700 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('reddit')"
    />
    <span
      v-if="socials.snapchat == 1"
      v-tippy="loginText + ' Snapchat'"
      class="fa-brands fa-square-snapchat fa-3x mr-3 mb-2 cursor-pointer text-yellow-400 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('snapchat')"
    />
    <span
      v-if="socials.meetup == 1"
      v-tippy="loginText + ' Meetup'"
      class="fa-brands fa-meetup fa-3x mr-3 mb-2 cursor-pointer text-red-400 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('meetup')"
    />
    <span
      v-if="socials.atlassian == 1"
      v-tippy="loginText + ' Atlassian'"
      class="fa-brands fa-atlassian fa-3x mr-3 mb-2 cursor-pointer text-blue-800 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('atlassian')"
    />

    <!-- NEW_PROVIDER_PLUG :: Put New Provider HERE -->
  </div>
</template>

<script>
import * as Vue from 'vue';
import { mapStores, mapState, mapActions } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import { useRoute, useRouter } from 'vue-router';
import { track } from '@services/analytics';

export default {
  name: 'SocialiteLogins',
  components: {},
  props: {
    signup: { type: Boolean, default: false },
  },
  setup() {
    return {};
  },
  data() {
    return {
      loading: false,
      window: {},
      authWindowTitle: 'Authentication Login',
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated', 'token', 'socials']),
    currentRouteName() {
      return this.$route.name;
    },
    appName() {
      return APP_NAME;
    },
    socialLoginsEnabled() {
      if (Object.values(this.socials).find((v) => v == '1')) {
        return true;
      }
      return false;
    },
    loginText() {
      if (this.signup) {
        return 'Sign up using ';
      }
      return 'Login using ';
    },
  },
  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage);
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan', 'getUser', 'fetchOauthUrl', 'getUserByToken', 'saveToken']),
    ...mapActions(useToastStore, ['popToast', 'success', 'error']),
    track,
    async socialiteLogin(provider) {
      this.track(`Social Login Provider Clicked: ${provider}`);
      this.loading = true;
      try {
        await axios.get('/sanctum/csrf-cookie').then((response) => {});
        const url = await this.fetchOauthUrl({ provider }).then((response) => {
          this.loading = false;
          return response;
        });
        this.window = this.openWindow(url, this.authWindowTitle);
      } catch (e) {
        this.track(`Social Login Provider Failed to Login: ${provider}`, 'error', 'auth-error');
        this.popToast({
          message: 'Failed to log in.',
          timer: 10000,
          icon: 'error',
        });
        this.window.close();
        this.loading = false;
      }
    },
    async onMessage(e) {
      const self = this;
      if (e.origin !== window.origin || !e.data.token) {
        return;
      }
      await axios.get('/sanctum/csrf-cookie').then((response) => {});
      self.getUserByToken({ token: e.data.token }).then((res) => {
        self.track('Social Login Provider Logged in Successfully', 'login', 'social login success');
        setTimeout(() => {
          self.$router.push({ name: 'dashboard' });
        }, 1);
      });
    },
    openWindow(url, title, options = {}) {
      if (typeof url === 'object') {
        options = url;
        url = '';
      }
      options = {
        url,
        title,
        width: 600,
        height: 720,
        ...options,
      };
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;
      const width = window.innerWidth || document.documentElement.clientWidth;
      window.screen.width;
      const height = window.innerHeight || document.documentElement.clientHeight;
      window.screen.height;

      options.left = width / 2 - options.width / 2 + dualScreenLeft;
      options.top = height / 2 - options.height / 2 + dualScreenTop;

      const optionsStr = Object.keys(options)
        .reduce((acc, key) => {
          acc.push(`${key}=${options[key]}`);
          return acc;
        }, [])
        .join(',');
      const newWindow = window.open(url, title, optionsStr);
      if (window.focus) {
        newWindow.focus();
      }
      return newWindow;
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
