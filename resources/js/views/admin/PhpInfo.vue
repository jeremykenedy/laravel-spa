<template>
  <div id="serverInfo" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="phpinfo" :text="$t('server_info')" />
    </AdminBreadcrumbContainer>

    <div class="clear-both px-1">
      <div v-if="!dataReady">
        <div class="text-gray-700 dark:text-gray-100">
          <div class="pt-10 pb-10 text-center">
            <span class="fa fa-circle-notch fa-spin fa-5x" />
          </div>
        </div>
      </div>
      <div v-if="dataReady" class="php-info">
        <div v-html-safe="info" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';

export default {
  name: 'PhpInfo',
  data() {
    return {
      dataReady: false,
      info: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
  },
  mounted() {
    this.getServerInfo();
  },
  methods: {
    // ...mapActions({
    //   popToast: 'toast/popToast',
    // }),
    async getServerInfo() {
      this.dataReady = false;
      await axios
        .get('/api/server-info')
        .then(({ data }) => {
          this.info = data.info;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          // this.popToast({
          //   message: 'Error Getting Server Information',
          //   timer: 5000,
          //   icon: 'error',
          // });
          this.dataReady = true;
        });
    },
  },
};
</script>
