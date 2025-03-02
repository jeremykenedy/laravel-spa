import {defineStore} from 'pinia'
import axios from 'axios';
import {ref} from "vue";
import useDarkMode from "@composables/darkmode";
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const user = ref({})
  const currentUserToken = ref(null)
  const impersonatorToken = ref(null)
  const token = Cookies.get('token')
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

  const login = (() => {
    return axios.get('/api/user').then(({data}) => {
      user.value = data
      authenticated.value = true
    }).catch(({res}) => {
      user.value = {}
      authenticated.value = false
    })
  })

  const getUser = (() => {
    return axios.get('/api/user').then(({data}) => {
      if (data.success) {
        user.value = data.data
        authenticated.value = true
        // router.push({name: 'dashboard'})
        if (user.value.theme_dark) {
          document.documentElement.className = 'dark';
          localStorage.setItem("data-theme", "dark");
        } else {
          document.documentElement.className = 'light';
          localStorage.setItem("data-theme", "light");
        }
      } else {
        user.value = {}
        authenticated.value = false
      }
    }).catch(({res}) => {
      user.value = {}
      authenticated.value = false
    })
  })

  const getUserByToken = async (payload) => {
    await axios.post('/api/user-by-token', { token: payload.token })
      .then(async res => {
        if (res && res.data && res.data.id) {
          const u = res.data
          user.value = u;
          authenticated.value = true;
          if (u.theme_dark) {
            document.documentElement.className = 'dark';
            localStorage.setItem("data-theme", "dark");
          } else {
            document.documentElement.className = 'light';
            localStorage.setItem("data-theme", "light");
          }
        } else {
          user.value = {}
          authenticated.value = false
        }
      })
      .catch((err) => {
        user.value = {}
        authenticated.value = false
        throw err.response;
      });
  }

  const logout = (() => {
    Cookies.remove('token');
    user.value = {}
    authenticated.value = false
  })

  const setWorkingToken = ((payload) => {
    Cookies.set('token', payload.token, { expires: 365 });
    currentUserToken.value = payload.token;
    impersonatorToken.value = payload.impersonatorToken.plainTextToken;
  })

  function userIs(role) {
    if (!this.user || !this.user.id || !this.user.roles || this.user.roles.length <= 0) {
      return false;
    }
    for (var i = 0; i < this.user.roles.length; i++) {
      if ((this.user.roles[i].slug.toLowerCase() == role.toLowerCase()) || (this.user.roles[i].name.toLowerCase() == role.toLowerCase())) {
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
      if ((this.user.permissions[i].slug.toLowerCase() == permission.toLowerCase()) || (this.user.permissions[i].name.toLowerCase() == permission.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  return {
    authenticated,
    user,
    login,
    getUser,
    getUserByToken,
    logout,
    currentUserToken,
    impersonatorToken,
    setWorkingToken,
    userIs,
    userCan,
  }
}, {
  persist: true
})
