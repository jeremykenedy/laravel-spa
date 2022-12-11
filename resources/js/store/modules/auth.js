import axios from 'axios';
import Cookies from 'js-cookie';
import toast from '@store/modules/toast';
import router from '@/router';

export default {
  namespaced: true,
  state() {
    return {
      authenticated: false,
      user: null,
      roles: {
        superAdmin: false,
        admin: false,
        moderator: false,
        editor: false,
        user: false,
      },
      token: Cookies.get('token'),
      logins: {
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
        // NEW_PROVIDER_PLUG :: Put New Provider HERE
      },
      currentUserToken: null,
      impersonatorToken: null,
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    roles(state) {
      return state.roles;
    },
    verified(state) {
      if (state.user) return state.user.email_verified_at;
      return null;
    },
    id(state) {
      if (state.user) return state.user.id;
      return null;
    },
    authenticated(state) {
      return state.authenticated;
    },
    token(state) {
      return state.token;
    },
    logins(state) {
      return state.logins;
    },
    currentUserToken(state) {
      return state.currentUserToken;
    },
    impersonatorToken(state) {
      return state.impersonatorToken;
    },
  },
  mutations: {
    SET_AUTHENTICATION(state, value = false) {
      state.authenticated = value;
    },
    SET_USER(state, payload = null) {
      state.user = payload;
      if (payload && payload.roles && payload.roles.length > 0) {
        payload.roles.forEach((role, index) => {
          if (role.name == 'Super Admin') {
            state.roles.superAdmin = true;
          }
          if (role.name == 'Admin') {
            state.roles.admin = true;
          }
          if (role.name == 'Moderator') {
            state.roles.moderator = true;
          }
          if (role.name == 'Editor') {
            state.roles.editor = true;
          }
          if (role.name == 'User') {
            state.roles.user = true;
          }
        });
      } else {
        state.roles = {
          superAdmin: false,
          admin: false,
          moderator: false,
          editor: false,
          user: false,
        };
      }
    },
    SET_THEME(state, payload = null) {
      if (payload) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    SET_TOKEN(state, { token, remember }) {
      state.token = token;
      Cookies.set('token', token, { expires: remember ? 365 : null });
    },
    SET_WORKING_TOKENS(state, payload) {
      state.currentUserToken = payload.currentUserToken;
      state.impersonatorToken = payload.impersonatorToken;
    },
    SET_LOGINS(state, payload = null) {
      if (payload) {
        state.logins = payload;
      }
    },
    LOGOUT(state) {
      state.authenticated = false;
      state.user = null;
      state.roles = {
        superAdmin: false,
        admin: false,
        moderator: false,
        editor: false,
        user: false,
      };
      document.documentElement.classList.remove('dark');
      state.token = null;
      state.currentUserToken = null;
      state.impersonatorToken = null;
      Cookies.remove('token');
      window.sessionStorage.clear();
    },
  },
  actions: {
    async login({ dispatch }, payload) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        await axios
          .post('/api/login', payload)
          .then((res) => dispatch('getUser'))
          .catch((err) => {
            throw err.response;
          });
      } catch (e) {
        throw e;
      }
      router.push({ name: 'dashboard' });
    },
    async register({ commit }, payload) {
      await axios.get('/sanctum/csrf-cookie');
      const res = await axios.post('/api/register', payload);
      if (
        res.status == 201 &&
        res &&
        res.data &&
        res.data.user &&
        res.data.user.id
      ) {
        commit('SET_USER', res.data.user);
        commit('SET_THEME', res.data.user.theme_dark);
        commit('SET_AUTHENTICATION', true);
        return res;
      }
      commit('LOGOUT');
      throw res.response;
    },
    async logout({ commit }) {
      await axios
        .post('/api/logout')
        .then((res) => {
          commit('LOGOUT');
        })
        .catch((err) => {});
      router.push({ name: 'home' });
    },
    async getUser({ commit }) {
      await axios
        .get('/api/user')
        .then((res) => {
          if (res && res.data && res.data.id) {
            commit('SET_USER', res.data);
            commit('SET_THEME', res.data.theme_dark);
            commit('SET_AUTHENTICATION', true);
          } else {
            commit('LOGOUT');
          }
        })
        .catch((err) => {
          commit('LOGOUT');
          throw err.response;
        });
    },
    async getUserByToken({ commit, dispatch }, payload) {
      await axios
        .post('/api/user-by-token', { token: payload.token })
        .then((res) => {
          if (res && res.data && res.data.id) {
            commit('SET_USER', res.data);
            commit('SET_THEME', res.data.theme_dark);
            commit('SET_AUTHENTICATION', true);
          } else {
            commit('LOGOUT');
          }
        })
        .catch((err) => {
          commit('LOGOUT');
          throw err.response;
        });
    },
    async profile({ commit }, payload) {
      const res = await axios.patch('/api/profile', payload);
      if (
        res.status == 200 &&
        res &&
        res.data &&
        res.data.user &&
        res.data.user.id
      ) {
        commit('SET_USER', res.data.user);
        commit('SET_THEME', res.data.user.theme_dark);
        commit('SET_AUTHENTICATION', true);
        return res;
      }
      // commit('LOGOUT');
      throw res.response;
    },
    async theme({ commit }, payload) {
      const res = await axios.patch('/api/theme', payload);
      if (
        res.status == 200 &&
        res &&
        res.data &&
        res.data.user &&
        res.data.user.id
      ) {
        commit('SET_USER', res.data.user);
        commit('SET_THEME', res.data.user.theme_dark);
        commit('SET_AUTHENTICATION', true);
        return res;
      }
      // commit('LOGOUT');
      throw res.response;
    },
    async password({ dispatch }, payload) {
      const res = await axios.patch('/api/password', payload);
      if (
        res.status == 200 &&
        res &&
        res.data &&
        res.data.message &&
        res.data.message == 'Password Updated Successfully'
      ) {
        return 'Success';
      }
      throw res.response;
    },
    async verifyResend({ dispatch }, payload) {
      const res = await axios.post('/api/verify-resend', payload);
      if (res.status != 200) throw res;
      return res;
    },
    async verifyEmail({ dispatch }, payload) {
      const res = await axios.post(
        `/api/verify-email/${payload.id}/${payload.hash}`,
      );
      if (res.status != 200) throw res;
      dispatch('getUser');
      return res;
    },
    async forgotPassword({ dispatch }, payload) {
      try {
        const response = await axios.post('/api/forgot-password', payload);
        if (
          response &&
          response.status &&
          response.status == 200 &&
          response.data &&
          response.data.message
        ) {
          return response.data.message;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    },
    async resetPassword({ dispatch }, payload) {
      try {
        const response = await axios.post('/api/reset-password', payload);
        if (
          response &&
          response.status &&
          response.status == 200 &&
          response.data &&
          response.data.message
        ) {
          return response.data.message;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    },
    async fetchOauthUrl(ctx, { provider }) {
      try {
        const response = await axios.post(`/api/oauth/${provider}`);
        if (response && response.data && response.data.url) {
          return response.data.url;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    },
    async saveToken({ commit, dispatch }, payload) {
      commit('SET_TOKEN', payload);
    },
    async getLogins({ commit }) {
      await axios
        .get('/api/logins')
        .then((res) => {
          if (res && res.data && res.data.logins) {
            commit('SET_LOGINS', res.data.logins);
          } else {
            throw res;
          }
        })
        .catch((err) => {
          throw err.response;
        });
    },
    async revokeProvider({ commit, dispatch }, payload) {
      return await axios
        .post(`/api/oauth-revoke/${payload.id}`)
        .then((res) => {
          if (
            res.status &&
            res.status == 200 &&
            res.data &&
            res.data.status &&
            res.data.status == 'success' &&
            res.data.user &&
            res.data.user.id
          ) {
            commit('SET_USER', res.data.user);
            return res;
          }
          throw res;
        })
        .catch((err) => {
          throw err.response;
        });
    },
    async deleteAccount({ commit, dispatch }, payload) {
      return await axios
        .delete(`/api/account/${payload.id}/delete`)
        .then((res) => {
          if (
            res.status &&
            res.status == 200 &&
            res.data &&
            res.data.status &&
            res.data.status == 'success' &&
            !res.data.user
          ) {
            commit('LOGOUT');
            router.push({ name: 'home' });

            return res;
          }
          throw res;
        })
        .catch((err) => {
          throw err.response;
        });
    },
    async impersonateUser({ commit, dispatch }, payload) {
      await axios
        .get(`/api/impersonate/take/${payload.user.id}`)
        .then((res) => {
          if (res && res.data && res.data.data && res.data.data.token) {
            commit('LOGOUT');
            commit('SET_WORKING_TOKENS', {
              currentUserToken: res.data.data.token,
              impersonatorToken: res.data.data.impersonatorToken,
            });
            dispatch('getUserByToken', { token: res.data.data.token });
            router.push({ name: 'home' });
            dispatch(
              'toast/popToast',
              {
                message: `Stealh mode activated. You are now acting as ${payload.user.name}`,
                timer: 5000,
                icon: 'success',
              },
              { root: true },
            );
          } else {
            dispatch(
              'toast/popToast',
              {
                message: 'An error occurred, you are still yourself.',
                timer: 5000,
                icon: 'error',
              },
              { root: true },
            );
          }
        })
        .catch((err) => {
          dispatch(
            'toast/popToast',
            {
              message: 'An error occurred, you are still yourself.',
              timer: 5000,
              icon: 'error',
            },
            { root: true },
          );
          throw err.response;
        });
    },
    async leaveImpersonatingUser({ commit, dispatch }, payload) {
      await axios
        .get(`/api/impersonate/leave`)
        .then((res) => {
          if (res && res.data && res.data.data && res.data.data.token) {
            commit('LOGOUT');
            dispatch('getUserByToken', { token: res.data.data.token });
            router.push({ name: 'home' });
            dispatch(
              'toast/popToast',
              {
                message: `You wake up and realize it was all dream!`,
                timer: 5000,
                icon: 'success',
              },
              { root: true },
            );
          } else {
            dispatch(
              'toast/popToast',
              {
                message: 'An error occurred, you are still are not yourself!',
                timer: 5000,
                icon: 'error',
              },
              { root: true },
            );
          }
        })
        .catch((err) => {
          dispatch(
            'toast/popToast',
            {
              message: 'An error occurred, you are still yourself.',
              timer: 5000,
              icon: 'error',
            },
            { root: true },
          );
          throw err.response;
        });
    },
  },
};
