import {ref, inject, computed} from 'vue'
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

export default function useActivityLogs() {
    const route = useRoute();
    const router = useRouter();

    const activities = ref();
    const activeFilter = ref(route.query.filter || 'all');
    const searchTerm = ref(route.query.search || '');
    // Pagination
    const currentPage = ref(parseInt(route.query.page) || 1); // Current page
    const perPage = ref(15); // Items per page
    const total = ref(0); // Total number of items

    // Pagination Helpers
    const totalPages = computed(() => Math.ceil(total.value / perPage.value));
    const rangeStart = computed(() => (currentPage.value - 1) * perPage.value + 1);
    const rangeEnd = computed(() =>
        Math.min(currentPage.value * perPage.value, total.value)
    );

    const isLoading = ref(false)

    const getActivityLogs = (() => {
        const params = {
            filter: activeFilter.value !== 'all' ? activeFilter.value : undefined,
            search: searchTerm.value || undefined,
            page: currentPage.value,
            per_page: perPage.value,
        };

        axios.get(`/api/activity-logs/`, { params })
            .then(({data}) => {
                activities.value = data;
                total.value = data.meta.total
            })
    });

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
            applyFilters();
        }
    };

    const updateFilter = (filter) => {
        activeFilter.value = filter;
        applyFilters();
    };

    const applyFilters = () => {
        setTimeout(() => {
            router.push({
                query: {
                    filter: activeFilter.value !== 'all' ? activeFilter.value : undefined,
                    search: searchTerm.value || undefined,
                    page: currentPage.value,
                },
            });
        }, 300)
    };

    return {
        getActivityLogs,
        activities,
        activeFilter,
        isLoading,
        rangeStart,
        rangeEnd,
        total,
        currentPage,
        totalPages,
        changePage,
        updateFilter,
        searchTerm,
        applyFilters,
    }
}
