<template>
  <div class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'admin' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Admin
          </router-link>
        </li>

        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'phpinfo' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              Server Info
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

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
</template>

<script lang="ts">
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapActions } from 'vuex';

export default {
  name: 'PhpInfo',
  components: { ChevronRightIcon },
  data() {
    return {
      dataReady: false,
      info: null,
    };
  },
  mounted() {
    this.getServerInfo();
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getServerInfo() {
      this.dataReady = false;
      await axios
        .get('/api/server-info')
        .then(({ data }) => {
          this.info = data.info;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: 'Error Getting Server Information',
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
