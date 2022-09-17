import { createStore } from 'vuex';
import sharedMutations from 'vuex-shared-mutations';
import auth from '@/store/auth';
import toast from '@/store/toast';

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
  },
  plugins: [
    sharedMutations({
      predicate: ['setUser', 'setAuthentication', 'setTheme'],
    }),
  ],
});
