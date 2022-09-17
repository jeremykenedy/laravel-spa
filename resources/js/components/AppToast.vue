<template>
  <div></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Toast',
  computed: {
    ...mapGetters({
      toast: 'toast/toast',
    }),
  },
  watch: {
    toast: {
      deep: true,
      handler(newVal) {
        if (newVal.message) {
          this.popToast();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      clearToast: 'toast/clearToast',
    }),
    async popToast() {
      await this.$swal
        .fire({
          toast: true,
          position: this.toast.position,
          icon: this.toast.icon,
          showConfirmButton: this.toast.showConfirmButton,
          title: this.toast.message,
          timer: this.toast.timer,
          timerProgressBar: this.toast.timerProgressBar,
          showCloseButton: this.toast.showCloseButton,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer);
            toast.addEventListener('mouseleave', this.$swal.resumeTimer);
            toast.addEventListener('click', () => {
              this.$swal.close();
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
        .then((result) => {
          return result;
        });
      this.clearToast();
    },
  },
};
</script>
