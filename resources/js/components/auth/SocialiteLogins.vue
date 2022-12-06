<template>
  <div class="flex flex-wrap justify-around">
    <span
      v-if="logins.facebook == 1"
      class="fa-brands fa-square-facebook fa-3x mr-3 mb-2 cursor-pointer text-blue-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('facebook')"
    />
    <span
      v-if="logins.twitter == 1"
      class="fa-brands fa-twitter fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('twitter')"
    />
    <span
      v-if="logins.instagram == 1"
      class="fa-brands fa-instagram fa-3x mr-3 mb-2 cursor-pointer text-gray-700 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('instagram')"
    />
    <span
      v-if="logins.github == 1"
      class="fa-brands fa-github fa-3x mr-3 mb-2 cursor-pointer text-gray-800 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('github')"
    />
    <span
      v-if="logins.youtube == 1"
      class="fa-brands fa-youtube fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('youtube')"
    />
    <span
      v-if="logins.google == 1"
      class="fa-brands fa-google fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('google')"
    />
    <span
      v-if="logins.linkedin == 1"
      class="fa-brands fa-linkedin fa-3x mr-3 mb-2 cursor-pointer text-blue-700 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('linkedin')"
    />
    <span
      v-if="logins.twitch == 1"
      class="fa-brands fa-twitch fa-3x mr-3 mb-2 cursor-pointer text-blue-600 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('twitch')"
    />
    <span
      v-if="logins.apple == 1"
      class="fa-brands fa-apple fa-3x mr-3 mb-2 cursor-pointer text-gray-800 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('apple')"
    />
    <span
      v-if="logins.microsoft == 1"
      class="fa-brands fa-microsoft fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('microsoft')"
    />
    <span
      v-if="logins.tiktok == 1"
      class="fa-brands fa-tiktok fa-3x mr-3 mb-2 cursor-pointer text-pink-600 opacity-80 transition duration-300 hover:opacity-100"
      :class="loading ? 'disabled opacity-40' : ''"
      @click="socialiteLogin('tiktok')"
    />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { mapGetters, mapActions } from 'vuex';
import { track } from '@services/analytics';

export default {
  name: 'SocialiteLogins',
  components: {},
  props: {},
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
    ...mapGetters({
      logins: 'auth/logins',
      token: 'auth/token',
    }),
    socialLoginsEnabled() {
      if (Object.values(this.logins).find((v) => v == '1')) {
        return true;
      }
      return false;
    },
  },
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage);
  },
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
      fetchOauthUrl: 'auth/fetchOauthUrl',
      saveToken: 'auth/saveToken',
      getUser: 'auth/getUser',
      getUserByToken: 'auth/getUserByToken',
    }),
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
        this.track(
          `Social Login Provider Failed to Login: ${provider}`,
          'error',
          'auth-error',
        );
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
      self.popToast({
        message: 'Successfully logged in',
        timer: 2500,
        icon: 'success',
      });
      self.track(
        'Social Login Provider Logged in Successfully',
        'login',
        'social login success',
      );
      await self.saveToken({ token: e.data.token }).then((response) => {
        self.getUserByToken({ token: e.data.token }).then(() => {
          setTimeout(() => {
            self.$router.push({ name: 'dashboard' });
          }, 1);
        });
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
      const dualScreenLeft =
        window.screenLeft !== undefined
          ? window.screenLeft
          : window.screen.left;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screen.top;
      const width = window.innerWidth || document.documentElement.clientWidth;
      window.screen.width;
      const height =
        window.innerHeight || document.documentElement.clientHeight;
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
