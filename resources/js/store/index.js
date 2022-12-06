// import Vue from 'vue';
import { createStore } from 'vuex';
import sharedMutations from 'vuex-shared-mutations';
import auth from '@store/modules/auth';
import toast from '@store/modules/toast';
import sidebar from '@store/modules/sidebar';
import persistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    auth,
    toast,
    sidebar,
  },
  plugins: [
    sharedMutations({
      predicate: ['SET_USER', 'SET_AUTHENTICATION', 'SET_THEME'],
    }),
    persistedState({
      storage: window.sessionStorage,
    }),
  ],
});
