import {defineStore} from 'pinia'
import axios from 'axios';
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const user = ref({})
  const currentUserToken = ref(null)
  const impersonatorToken = ref(null)
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

  const logout = (() => {
    user.value = {}
    authenticated.value = false
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
    logout,
    currentUserToken,
    impersonatorToken,
    userIs,
    userCan,
  }
}, {
  persist: true
})
