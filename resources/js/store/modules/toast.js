export default {
  namespaced: true,
  state: {
    toast: {
      icon: 'success',
      message: null,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showCloseButton: false,
    },
  },
  getters: {
    toast(state) {
      return state.toast;
    },
  },
  mutations: {
    SET_TOAST(state, data) {
      if (Object.prototype.hasOwnProperty.call(data, 'message')) {
        state.toast.message = data.message;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'position')) {
        state.toast.position = data.position;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'icon')) {
        state.toast.icon = data.icon;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'showConfirmButton')) {
        state.toast.showConfirmButton = data.showConfirmButton;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'timer')) {
        state.toast.timer = data.timer;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'timerProgressBar')) {
        state.toast.timerProgressBar = data.timerProgressBar;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'showCloseButton')) {
        state.toast.showCloseButton = data.showCloseButton;
      }
    },
  },
  actions: {
    popToast({ commit }, toast) {
      commit('SET_TOAST', {
        icon: 'success',
        message: null,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
      });
      commit('SET_TOAST', toast);
    },
    clearToast({ commit }) {
      commit('SET_TOAST', {
        icon: 'success',
        message: null,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 0,
        timerProgressBar: true,
        showCloseButton: false,
      });
    },
  },
};
