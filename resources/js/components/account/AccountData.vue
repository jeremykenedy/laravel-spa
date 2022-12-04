<template>
  <div class="">
    <div
      class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl"
      >
        <span class="block">
          Your Data <span class="text-indigo-600">On Demand</span></span
        >
        <span class="block text-gray-700 dark:text-gray-500"
          >Download your user data.</span
        >
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <UserDownloadData />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserDownloadData from '@components/users/UserDownloadData.vue';

export default {
  name: 'AccountData',
  components: {
    UserDownloadData,
  },
};
</script>
