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
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import { track } from '@services/analytics';

export default {
  name: 'UserDownloadData',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, [
      'userIs',
      'userCan',
    ]),
    ...mapActions(useToastStore, [
      'popToast',
      'success',
      'error',
    ]),
    track,
    async triggerUserDataDownload() {
      // HERE :: TODO
    },
    userDataDownloadConfirmed() {
      // HERE :: TODO
    },
  },
};
</script>
