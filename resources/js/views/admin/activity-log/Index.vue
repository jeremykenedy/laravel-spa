<template>
    <div class="container my-2">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <!-- Header -->
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h4 class="mb-0">Activity Logs</h4>
                        </div>

                        <!-- Search and Filter -->
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <div class="border-1 bg-white">
                                    <i class="fas fa-search text-muted me-2"></i>
                                    <input type="text" v-model="searchTerm" class="search-box" placeholder="Search activities..."
                                           @input="applyFilters"
                                    >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex gap-2 flex-wrap">
                                      <span
                                          class="badge filter-badge px-3 py-2"
                                          :class="{ active: activeFilter === 'all' }"
                                          @click="updateFilter('all')"
                                      >
                                        All
                                      </span>
                                    <span
                                        class="badge filter-badge px-3 py-2"
                                        :class="{ active: activeFilter === 'created' }"
                                        @click="updateFilter('created')"
                                    >
                                        Created
                                    </span>
                                    <span
                                        class="badge filter-badge px-3 py-2"
                                        :class="{ active: activeFilter === 'updated' }"
                                        @click="updateFilter('updated')"
                                    >
                                        Updated
                                    </span>
                                    <span
                                        class="badge filter-badge px-3 py-2"
                                        :class="{ active: activeFilter === 'login' }"
                                        @click="updateFilter('login')"
                                    >
                                        Login
                                    </span>
                                    <span
                                        class="badge filter-badge px-3 py-2"
                                        :class="{ active: activeFilter === 'logout' }"
                                        @click="updateFilter('logout')"
                                    >
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Activity Timeline -->
                        <div class="activity-timeline">
                            <!-- Activity Item -->
                            <template v-if="activities?.data?.length > 0">
                                <div v-for="activity in activities?.data" class="activity-item bg-white">
                                    <div class="d-flex gap-3">
                                        <div class="activity-icon "
                                             :class="{
                                                  'bg-success-soft text-success': activity.event === 'updated' || activity.event === 'created' || activity.event === 'login',
                                                  'bg-warning-soft text-warning': activity.event === 'logout',
                                                  'bg-danger-soft text-danger': activity.event === 'error',
                                                  'bg-info-soft text-info': !['updated', 'created', 'login', 'logout', 'error'].includes(activity.event)
                                             }"
                                        >
                                            <i class="fas fa-user-check"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex justify-content-between align-items-center mb-2">
                                                <h6 class="mb-0">{{ activity.event }}</h6>
                                                <span class="activity-date">{{ activity.format_created_at }}</span>
                                            </div>
                                            <p class="text-muted mb-2">{{ activity.description}}</p>
                                            <div class="d-flex align-items-center">
                                                <div class="activity-user me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                                    </svg>
                                                </div>
                                                <span class="text-muted small">IP: {{ activity?.properties?.ip }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Pagination -->
                        <!-- Pagination -->
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <span class="text-muted small">
                              Showing {{ rangeStart }}-{{ rangeEnd }} of {{ total }}
                            </span>
                            <nav>
                                <ul class="pagination pagination-sm mb-0">
                                    <!-- Previous Button -->
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                                            </svg>
                                        </a>
                                    </li>

                                    <!-- Page Numbers -->
                                    <li
                                        v-for="page in totalPages"
                                        :key="page"
                                        class="page-item"
                                        :class="{ active: page === currentPage }"
                                    >
                                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                    </li>

                                    <!-- Next Button -->
                                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {useRoute} from "vue-router";
import useActivityLogs from '@/composables/activityLogs.js'

const {activities, getActivityLogs, activeFilter, searchTerm, currentPage, rangeStart, rangeEnd, totalPages, total, updateFilter, applyFilters, changePage} = useActivityLogs()

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
