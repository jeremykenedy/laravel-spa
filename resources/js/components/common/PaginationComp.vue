<template>
  <span class="vue-pagination">
    <vue-awesome-paginate
      :total-items="totalPages"
      :items-per-page="itemsPerPage"
      :max-pages-shown="maxPagesShown"
      :disable-breakpoint-buttons="disableBreakpointButtons"
      :show-ending-buttons="showEndingButtons"
      :model-value="currentPage"
      @click="changePage"
    >
      <template #first-page-button>
        <ChevronDoubleLeftIcon class="size-6 mx-auto" />
      </template>

      <template #prev-button>
        <ChevronLeftIcon class="size-6 mx-auto" />
      </template>

      <template #next-button>
        <ChevronRightIcon class="size-6 mx-auto" />
      </template>

      <template #last-page-button>
        <ChevronDoubleRightIcon class="size-6 mx-auto" />
      </template>
    </vue-awesome-paginate>
  </span>
</template>

<script>
import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/24/outline';

export default {
  components: {
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
  },
  props: {
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    showEndingButtons: { type: Boolean, default: false },
    disableBreakpointButtons: { type: Boolean, default: false },
    itemsPerPage: { type: Number, default: 1 },
    maxPagesShown: { type: Number, default: 4 },
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>

<style lang="scss">
.vue-pagination {
  .pagination-container {
    @apply flex;
    column-gap: 5px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    @apply rounded cursor-pointer bg-gray-100 text-black dark:bg-gray-900 dark:text-white;
    &:hover {
      @apply bg-gray-300 dark:bg-gray-700;
    }
    &.active-page {
      @apply cursor-default bg-blue-300 hover:bg-blue-300 text-white dark:bg-blue-800 dark:hover:bg-blue-800;
    }
  }
  .back-button,
  .next-button,
  .last-page-button,
  .first-page-button {
    // @apply bg-gray-200;
  }
}
</style>
