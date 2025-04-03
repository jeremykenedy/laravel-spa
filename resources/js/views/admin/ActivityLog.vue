<template>
  <div id="activity_logs" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="activity_log.index" :text="$t('activity_logs')" />
    </AdminBreadcrumbContainer>

    <div class="mx-auto max-w-screen-lg text-gray-900 clear-both">
      <div class="flex justify-center">
        <div class="flex-1">
          <div class="w-auto rounded border dark:border-gray-600">
            <div class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200">
              {{ $t('activity_logs') }}
            </div>

            <div class="mx-4 mt-4">
              <div class="mt-2 grid grid-cols-1">
                <input
                  id="search"
                  v-model="searchTerm"
                  type="text"
                  name="search"
                  class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6 dark:bg-gray-900 dark:outline-gray-600 dark:text-gray-200"
                  placeholder="Search activities..."
                  @input="applyFilters"
                />
                <MagnifyingGlassIcon
                  class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-600 sm:size-4"
                />
              </div>
            </div>

            <div class="m-4 mb-0">
              <div class="grid grid-cols-1 sm:hidden">
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select
                  aria-label="Select a tab"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-gray-900 dark:outline-gray-600 dark:text-gray-200"
                  @change="handleFilterChange($event)"
                >
                  <option value="all">All</option>
                  <option value="created">Created</option>
                  <option value="updated" selected>Updated</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                </select>
              </div>
              <div class="hidden sm:block">
                <nav
                  class="isolate flex divide-x divide-gray-200 dark:divide-gray-500 rounded-lg shadow"
                  aria-label="Tabs"
                >
                  <div
                    class="group relative min-w-0 flex-1 overflow-hidden rounded-l-lg p-2 text-center text-sm font-medium focus:z-10"
                    :aria-current="activeFilter === 'all' ? 'page' : ''"
                    :class="
                      activeFilter === 'all'
                        ? 'cursor-default text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
                    "
                    @click.prevent="updateFilter('all')"
                  >
                    <span>All</span>
                    <span
                      aria-hidden="true"
                      class="absolute inset-x-0 bottom-0 h-0.5"
                      :class="activeFilter === 'all' ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-transparent'"
                    />
                  </div>
                  <div
                    class="group relative min-w-0 flex-1 overflow-hidden p-2 text-center text-sm font-medium focus:z-10"
                    :aria-current="activeFilter === 'created' ? 'page' : ''"
                    :class="
                      activeFilter === 'created'
                        ? 'cursor-default text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
                    "
                    @click.prevent="updateFilter('created')"
                  >
                    <span>Created</span>
                    <span
                      aria-hidden="true"
                      class="absolute inset-x-0 bottom-0 h-0.5"
                      :class="activeFilter === 'created' ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-transparent'"
                    />
                  </div>
                  <div
                    class="group relative min-w-0 flex-1 overflow-hidden p-2 text-center text-sm font-medium focus:z-10"
                    :aria-current="activeFilter === 'updated' ? 'page' : ''"
                    :class="
                      activeFilter === 'updated'
                        ? 'cursor-default text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
                    "
                    @click.prevent="updateFilter('updated')"
                  >
                    <span>Updated</span>
                    <span
                      aria-hidden="true"
                      class="absolute inset-x-0 bottom-0 h-0.5"
                      :class="activeFilter === 'updated' ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-transparent'"
                    />
                  </div>
                  <div
                    class="group relative min-w-0 flex-1 overflow-hidden p-2 text-center text-sm font-medium focus:z-10"
                    :aria-current="activeFilter === 'login' ? 'page' : ''"
                    :class="
                      activeFilter === 'login'
                        ? 'cursor-default text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
                    "
                    @click.prevent="updateFilter('login')"
                  >
                    <span>Login</span>
                    <span
                      aria-hidden="true"
                      class="absolute inset-x-0 bottom-0 h-0.5"
                      :class="activeFilter === 'login' ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-transparent'"
                    />
                  </div>
                  <div
                    class="group relative min-w-0 flex-1 overflow-hidden rounded-r-lg p-2 text-center text-sm font-medium focus:z-10"
                    :aria-current="activeFilter === 'logout' ? 'page' : ''"
                    :class="
                      activeFilter === 'logout'
                        ? 'cursor-default text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
                    "
                    @click.prevent="updateFilter('logout')"
                  >
                    <span>Logout</span>
                    <span
                      aria-hidden="true"
                      class="absolute inset-x-0 bottom-0 h-0.5"
                      :class="activeFilter === 'logout' ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-transparent'"
                    />
                  </div>
                </nav>
              </div>
            </div>

            <div class="rounded bg-white mx-4 my-2 dark:bg-slate-800 dark:text-gray-300">
              <ul v-if="activities?.data?.length > 0" role="list" class="divide-y divide-gray-300 dark:divide-gray-600">
                <li
                  v-for="activity in activities?.data"
                  :key="activity.event + '_' + activity.format_created_at"
                  class="py-4"
                >
                  <div class="flex items-center gap-x-3">
                    <i
                      class="fas fa-user-check rounded h-8 w-9 p-1 text-center text-2xl"
                      :class="{
                        'bg-green-700 text-white':
                          activity.event === 'updated' || activity.event === 'created' || activity.event === 'login',
                        'bg-orange-700 text-white': activity.event === 'logout',
                        'bg-red-700 text-white': activity.event === 'error',
                        'bg-blue-700 text-white': !['updated', 'created', 'login', 'logout', 'error'].includes(
                          activity.event,
                        ),
                      }"
                    />
                    <h3 class="flex-auto truncate text-sm/6 font-bold text-gray-800 dark:text-gray-200 capitalize">
                      {{ activity.event }}
                    </h3>
                    <span class="flex-none text-xs text-gray-600 dark:text-gray-400">
                      <time :datetime="activity.format_created_at">{{ activity.format_created_at }}</time>
                    </span>
                  </div>
                  <p class="mt-1 truncate text-sm text-gray-700 dark:text-gray-300">
                    {{ activity.description }}
                  </p>
                  <p class="mt-1 truncate text-gray-700 dark:text-gray-300 text-xs">
                    {{ $t('ip_address') }}
                    <span class="font-mono text-gray-600">{{ activity?.properties?.ip }}</span>
                  </p>
                </li>
              </ul>
              <div
                v-if="activities?.data?.length == 0"
                class="text-center p-6 my-6 bg-gray-200 dark:bg-gray-900 rounded"
              >
                {{ $t('no_records_found') }}
              </div>
            </div>

            <div v-if="activities?.data?.length > 0" class="text-center">
              <div class="flex items-center justify-between border-t rounded-b border-gray-200 px-4 py-3 sm:px-4">
                <div class="flex flex-1 justify-between md:hidden">
                  <div
                    :class="{ disabled: currentPage === 1 }"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-700"
                    @click.prevent="changePage(currentPage - 1)"
                  >
                    {{ $t('previous') }}
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <span class="font-medium">{{ currentPage }}</span>
                    of
                    <span class="font-medium">{{ totalPages }}</span>
                  </p>
                  <div
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-700"
                    :class="{ disabled: currentPage === totalPages }"
                    @click.prevent="changePage(currentPage + 1)"
                  >
                    {{ $t('next') }}
                  </div>
                </div>
                <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      <span class="font-medium">{{ rangeStart }}</span
                      >-<span class="font-medium">{{ rangeEnd }}</span>
                      of
                      <span class="font-medium">{{ total }}</span>
                      records
                    </p>
                  </div>
                  <div class="mt-2">
                    <Pagination :total-pages="totalPages" :current-page="currentPage" @change-page="changePage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import useActivityLogs from '@/composables/activityLogs.js';
import Pagination from '@components/common/PaginationComp.vue';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

const {
  activities,
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
  changePage,
} = useActivityLogs();
const route = useRoute();

watch(
  () => route.query,
  (newQuery) => {
    activeFilter.value = newQuery?.filter || 'all';
    searchTerm.value = newQuery?.search || '';
    currentPage.value = parseInt(newQuery.page) || 1;
    getActivityLogs();
  },
  {
    deep: true,
    immediate: true,
  },
);

function handleFilterChange(event) {
  this.updateFilter(event.target.value);
}
</script>
