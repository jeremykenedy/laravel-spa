<template>
  <AppButton
    primary
    text="Download"
    :loading="loading"
    class="inline-flex items-center justify-center px-5 py-3"
    :icon="loading ? 'fa fa-circle-notch fa-spin' : 'fa fa-download'"
    @click="triggerUserDataDownload()"
  />
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';
import { track } from '@services/analytics';
import axios from 'axios';

export default {
  name: 'UserDownloadData',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    track,
    async triggerUserDataDownload() {
      this.loading = true;
      try {
        const response = await axios.post(`/api/user/${this.user.id}/data`);
        if (
          response &&
          response.data &&
          response.data.status &&
          response.data.status == 'success'
        ) {
          this.loading = false;
          this.userDataDownloadConfirmed();
          this.track(
            'User Triggered Data Download Successfully',
            'user actions',
            'trigger download success',
          );
        } else {
          this.loading = false;
          this.popToast({
            message: 'Failed to trigger data download.',
            timer: 10000,
            icon: 'error',
          });
        }
      } catch (e) {
        this.loading = false;
        this.popToast({
          message: 'Failed to trigger data download.',
          timer: 10000,
          icon: 'error',
        });
      }
    },
    userDataDownloadConfirmed() {
      this.$swal
        .fire({
          title: 'Success!',
          icon: 'success',
          html:
            'Your data will be ready for download shortly. <br>A download link has been sent to your email <br>' +
            this.user.email,
          showCancelButton: false,
          showDenyButton: false,
          confirmButtonColor: '#008000',
          confirmButtonText: 'Dismiss',
        })
        .then((result) => {
          if (result.isConfirmed) {
            //
          } else if (result.isDenied) {
            //
          }
        });
    },
  },
};
</script>
