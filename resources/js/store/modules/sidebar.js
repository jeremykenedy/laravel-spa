export default {
  namespaced: true,
  state() {
    return {
      sideBarOpen: false,
      fullScreenSideBarOpen: true,
    };
  },
  getters: {
    sideBarOpen: (state) => {
      return state.sideBarOpen;
    },
    fullScreenSideBarOpen: (state) => {
      return state.fullScreenSideBarOpen;
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    toggleFullScreenSidebar(state) {
      state.fullScreenSideBarOpen = !state.fullScreenSideBarOpen;
    },
  },
  actions: {
    toggleSidebar(context) {
      context.commit('toggleSidebar');
    },
    toggleFullScreenSidebar(context) {
      context.commit('toggleFullScreenSidebar');
    },
  },
};
