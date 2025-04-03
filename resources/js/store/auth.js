import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import useDarkMode from '@composables/darkmode';
import Cookies from 'js-cookie';
import { useToastStore } from '@store/toast';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authenticated = ref(false);
    const user = ref({});
    const currentUserToken = ref(null);
    const impersonatorToken = ref(null);
    const token = ref(Cookies.get('token'));
    const toast = useToastStore();
    const socials = ref({
      facebook: false,
      twitter: false,
      instagram: false,
      github: false,
      youtube: false,
      google: false,
      linkedin: false,
      twitch: false,
      apple: false,
      microsoft: false,
      tiktok: false,
      zoho: false,
      stackexchange: false,
      gitlab: false,
      reddit: false,
      snapchat: false,
      meetup: false,
      bitbucket: false,
      atlassian: false,
      // NEW_PROVIDER_PLUG :: Put New Provider HERE
    });

    const login = () => {
      return axios
        .get('/api/user')
        .then(({ data }) => {
          user.value = data;
          authenticated.value = true;
        })
        .catch(({ res }) => {
          user.value = {};
          authenticated.value = false;
        });
    };

    const fetchOauthUrl = async (provider) => {
      try {
        const response = await axios.post(`/api/oauth/${provider.provider}`);
        if (response && response.data && response.data.url) {
          return response.data.url;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    };

    const revokeProvider = async (payload) => {
      try {
        const response = await axios.post(`/api/oauth-revoke/${payload.id}`).then((res) => {
          if (
            res.status &&
            res.status == 200 &&
            res.data &&
            res.data.status &&
            res.data.status == 'success' &&
            res.data.user &&
            res.data.user.id
          ) {
            user.value = res.data.user;
            return res;
          }
          throw res;
        });
      } catch (error) {
        throw error;
      }
    };

    const getLogins = async () => {
      return await axios
        .get('/api/logins')
        .then((res) => {
          if (res && res.data && res.data.logins) {
            socials.value = res.data.logins;
          } else {
            throw res;
          }
        })
        .catch((err) => {
          throw err.response;
        });
    };

    const getUser = () => {
      return axios
        .get('/api/user')
        .then(({ data }) => {
          if (data.success) {
            user.value = data.data;
            authenticated.value = true;
            // router.push({name: 'dashboard'})
            if (user.value.theme_dark) {
              document.documentElement.className = 'dark';
              localStorage.setItem('data-theme', 'dark');
            } else {
              document.documentElement.className = 'light';
              localStorage.setItem('data-theme', 'light');
            }
          } else {
            user.value = {};
            authenticated.value = false;
          }
        })
        .catch(({ res }) => {
          user.value = {};
          authenticated.value = false;
        });
    };

    const getUserByToken = async (payload) => {
      await axios
        .post('/api/user-by-token', { token: payload.token })
        .then(async (res) => {
          if (res && res.data && res.data.id) {
            const u = res.data;
            user.value = u;
            authenticated.value = true;
            if (u.theme_dark) {
              document.documentElement.className = 'dark';
              localStorage.setItem('data-theme', 'dark');
            } else {
              document.documentElement.className = 'light';
              localStorage.setItem('data-theme', 'light');
            }
            saveToken({ token: payload.token });
            toast.success('Successfully logged in');
          } else {
            user.value = {};
            authenticated.value = false;
            toast.error('An error occurred.');
          }
        })
        .catch((err) => {
          user.value = {};
          authenticated.value = false;
          toast.error('An error occurred.');
          throw err.response;
        });
    };

    const logout = () => {
      Cookies.remove('token');
      user.value = {};
      authenticated.value = false;
    };

    const setWorkingToken = (payload) => {
      Cookies.set('token', payload.token, { expires: 365 });
      currentUserToken.value = payload.token;
      impersonatorToken.value = payload.impersonatorToken.plainTextToken;
    };

    const saveToken = (payload) => {
      Cookies.set('token', payload.token, { expires: 365 });
      token.value = payload.token;
    };

    function userIs(role) {
      if (!this.user || !this.user.id || !this.user.roles || this.user.roles.length <= 0) {
        return false;
      }
      for (var i = 0; i < this.user.roles.length; i++) {
        if (
          this.user.roles[i].slug.toLowerCase() == role.toLowerCase() ||
          this.user.roles[i].name.toLowerCase() == role.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    }

    function userCan(permission) {
      if (!this.user || !this.user.id || !this.user.permissions || this.user.permissions.length <= 0) {
        return false;
      }
      for (var i = 0; i < this.user.permissions.length; i++) {
        if (
          this.user.permissions[i].slug.toLowerCase() == permission.toLowerCase() ||
          this.user.permissions[i].name.toLowerCase() == permission.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    }

    function loginEnabled(social) {
      for (const [key, value] of Object.entries(this.socials)) {
        if (key == social) {
          if (value == 1) {
            return true;
          }
        }
      }
      return false;
    }

    return {
      authenticated,
      user,
      login,
      getLogins,
      getUser,
      getUserByToken,
      logout,
      currentUserToken,
      impersonatorToken,
      setWorkingToken,
      userIs,
      userCan,
      socials,
      token,
      fetchOauthUrl,
      loginEnabled,
      revokeProvider,
    };
  },
  {
    persist: true,
  },
);
