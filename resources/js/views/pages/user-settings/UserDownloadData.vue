<template>
  <AppButton
    primary
    text="Process Download"
    :loading="loading"
    class="inline-flex items-center justify-center px-5 py-3"
    :icon="loading ? 'fa fa-circle-notch fa-spin' : 'fa fa-download'"
    @click="triggerUserDataDownload()"
  />
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import { track } from '@services/analytics';

export default {
  name: 'UserDownloadData',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
  },
  methods: {
    ...mapActions(useAuthStore, ['userIs', 'userCan']),
    ...mapActions(useToastStore, ['popToast', 'success', 'error']),
    track,
    async triggerUserDataDownload() {
      this.loading = true;
      try {
        const response = await axios.post(`/api/user/${this.user.id}/data`);
        if (response && response.data && response.data.status && response.data.status == 'success') {
          this.loading = false;
          this.userDataDownloadConfirmed();
          this.track('User Triggered Data Download Successfully', 'user actions', 'trigger download success');
        } else {
          this.loading = false;
          this.error('Failed to trigger data download.');
        }
      } catch (e) {
        this.loading = false;
        this.error('Failed to trigger data download.');
      }
    },
    userDataDownloadConfirmed() {
      this.$swal
        .fire({
          title: 'Success!',
          icon: 'success',
          html: `Your data will be ready for download shortly. <br>A download link has been sent to your email <br>${this.user.email}`,
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
