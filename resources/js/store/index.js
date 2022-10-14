// import Vue from 'vue';
import { createStore } from 'vuex';
import sharedMutations from 'vuex-shared-mutations';
import auth from '@/store/auth';
import toast from '@/store/toast';
import sidebar from '@/store/sidebar';

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
      predicate: ['setUser', 'setAuthentication', 'setTheme'],
    }),
  ],
});
