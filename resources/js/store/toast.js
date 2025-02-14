import {defineStore} from 'pinia'

export const useToastStore = defineStore('toast', {
  namespaced: true,
  state: () => ({
    toast: {
      icon: 'success',
      message: null,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showCloseButton: false,
    },
  }),
  actions: {
    async popToast(details) {
      await Swal.fire({
        toast: true,
        position: details.position ? details.position : this.toast.position,
        icon: details.icon ? details.icon : this.toast.icon,
        title: details.message ? details.message : this.toast.message,
        showConfirmButton: details.showConfirmButton ? details.showConfirmButton : this.toast.showConfirmButton,
        timer: details.timer ? details.timer : this.toast.timer,
        showCloseButton: details.showCloseButton ? details.showCloseButton : this.toast.showCloseButton,
        timerProgressBar: details.timerProgressBar ? details.timerProgressBar : this.toast.timerProgressBar,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
          toast.addEventListener('click', () => {
            Swal.close();
          });
        },
        showClass: {
          popup: '',
          // icon: ''
        },
        hideClass: {
          popup: '',
        },
      })
      .then((result) => result);
    },
  },
  persist: true,
})
