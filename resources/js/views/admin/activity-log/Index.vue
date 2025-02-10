<template>
  <div class="mx-auto max-w-screen-lg text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border dark:border-gray-600 m-5">
          <div class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200">
            {{ $t('activity_logs') }}
          </div>
          <div class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300">
            <ul v-if="activities?.data?.length > 0" role="list" class="divide-y divide-gray-300 dark:divide-gray-600">
              <li v-for="activity in activities?.data" class="py-4">
                <div class="flex items-center gap-x-3">
                  <i class="fas fa-user-check rounded h-8 w-9 p-1 text-center text-2xl" :class="{
                    'bg-green-700 text-white': activity.event === 'updated' || activity.event === 'created' || activity.event === 'login',
                    'bg-orange-700 text-white': activity.event === 'logout',
                    'bg-red-700 text-white': activity.event === 'error',
                    'bg-blue-700 text-white': !['updated', 'created', 'login', 'logout', 'error'].includes(activity.event)
                  }" />
                  <h3 class="flex-auto truncate text-sm/6 font-bold text-gray-800 dark:text-gray-200 capitalize">
                    {{ activity.event }}
                  </h3>
                  <span class="flex-none text-xs text-gray-600 dark:text-gray-400">
                    <time :datetime="activity.format_created_at">{{ activity.format_created_at }}</time>
                  </span>
                </div>
                <p class="mt-1 truncate text-sm text-gray-700 dark:text-gray-300">{{ activity.description }}</p>
                <p class="mt-1 truncate text-gray-700 dark:text-gray-300 text-xs">{{ $t('ip_address') }} <span
                    class="font-mono text-gray-600">{{ activity?.properties?.ip }}</span>
                </p>
              </li>
            </ul>
          </div>

          <div class="text-center mb-4">
            <Pagination
              :total-pages="totalPages"
              :current-page="currentPage"
              @change-page="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, watchEffect } from 'vue'
import { useRoute } from "vue-router";
import useActivityLogs from '@/composables/activityLogs.js'
import Pagination from '@components/common/Pagination.vue';

const { activities,
  getActivityLogs,
  activeFilter,
  searchTerm,
  currentPage,
  rangeStart,
  rangeEnd,
  totalPages,
  total,
  updateFilter,
  applyFilters,
  changePage
} = useActivityLogs()
const route = useRoute();

watch(
  () => route.query,
  (newQuery) => {
    activeFilter.value = newQuery?.filter || 'all';
    searchTerm.value = newQuery?.search || '';
    currentPage.value = parseInt(newQuery.page) || 1;
    getActivityLogs()
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
