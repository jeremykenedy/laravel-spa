<template>
  <div>
    <ul
      v-if="showPagination"
      class="list-reset border-grey-light mb-2 flex w-auto rounded border font-sans"
    >
      <li>
        <span
          class="hover:bg-blue text-blue border-grey-light block cursor-pointer border-r px-3 py-1 hover:text-white"
          :class="pagination.current_page == 1 ? 'disabled opacity-50' : ''"
          @click.prevent="change(pagination.current_page - 1)"
        >
          <ChevronLeftIcon class="ml-2 mr-2 h-6 w-6" />
          <span class="sr-only">Previous</span>
        </span>
      </li>
      <li v-for="page in pages" :key="page">
        <span
          class="block cursor-pointer rounded px-3 py-1"
          :class="
            page == pagination.current_page
              ? 'border-blue disabled border-r bg-slate-900 text-white'
              : 'text-blue-400 hover:bg-slate-600 hover:text-white'
          "
          @click.stop="change(page)"
        >
          {{ page }}
        </span>
      </li>
      <li>
        <span
          class="hover:bg-blue text-blue block cursor-pointer px-3 py-1 hover:text-white"
          :class="
            pagination.current_page == pagination.last_page
              ? 'disabled opacity-50'
              : ''
          "
          @click.prevent="change(pagination.current_page + 1)"
        >
          <ChevronRightIcon class="ml-2 mr-2 h-6 w-6" />
          <span class="sr-only">Next</span>
        </span>
      </li>
    </ul>
    <div class="mb-2 text-center text-xs">
      Showing page {{ pagination.current_page }} of {{ pagination.last_page }}
      <br />
      (Total Records: {{ pagination.total }})
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'Pagination',
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
  },
  props: {
    pagination: { type: Object, required: true },
    offset: { type: Number, default: 4 },
  },
  computed: {
    pages() {
      if (!this.pagination.to) {
        return null;
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      const pages = [];
      for (let page = from; page <= to; page++) {
        pages.push(page);
      }
      return pages;
    },
    showPagination() {
      if (this.pages.length > 1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    change: function (page) {
      this.$emit('paginate', page);
    },
  },
};
</script>
