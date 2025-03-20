<template>
  <div id="categories" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">

    <AdminBreadcrumbContainer>
      <AdminBreadcrumb routeName="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb routeName="categories.index" :text="$t('categories')" />
    </AdminBreadcrumbContainer>

    <NoRecordsCTA v-if="startAmount == 0 && dataReady" :text="$t('no_categories')">
      <template #action>
        <router-link v-if="userCan('create.categories')" :to="{ name: 'categories.create' }" class="float-right mb-2">
          <AppButton v-tippy="$t('create_category')" secondary class="px-5 py-2 font-medium">
            <template #text>
              {{ $t('create_new_category') }}
              <span class="fas fa-plus fa-fw ml-2" />
            </template>
          </AppButton>
        </router-link>
      </template>
    </NoRecordsCTA>

    <div v-if="startAmount > 0 && items && items.data">
      <router-link v-if="userCan('create.categories')" :to="{ name: 'categories.create' }" class="float-right mb-2">
        <AppButton v-tippy="$t('create_category')" secondary class="px-2 py-2 text-sm font-medium">
          <template #text>
            <span class="fas fa-plus fa-fw ml-2 mr-2" />
            <span class="sr-only">{{ $t('create_new_category') }}</span>
          </template>
        </AppButton>
      </router-link>

      <div v-if="userCan('view.categories')"
        class="mt-2 grid grid-cols-1 float-left clear-both mb-4 w-full sm:w-6/12 lg:w-4/12">
        <input v-model="search_global" type="text" name="search_categories" id="search_categories"
          :placeholder="$t('search_categories') + '...'"
          class="col-start-1 row-start-1 block w-full rounded-md placeholder:text-gray-400 pl-9 dark:bg-gray-900 dark:text-gray-200 border-0">
        <MagnifyingGlassIcon
          class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-600 sm:size-4" />
      </div>

      <EasyDataTable v-model:server-options="paginationOptions" :headers="tableHeaders" :items="items.data"
        :rows-items="perPage" :loading='!dataReady' :key="itemsTableKey" :server-items-length="itemsLength"
        ref="itemsTable" no-hover must-sort body-item-class-name="text-xs" class="clear-both z-50" fixed-header>

        <template #header-id="header">
          {{ header.text }}
          <div class="filter-column">
            <div class="flex flex-row cursor-pointer"
              :class="orderColumn == 'id' ? 'active-filter' : ' inactive-filter'" @click="updateOrdering('id')">
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
            <!-- <Slider v-model="idCriteria" class="slider" /> -->
          </div>
        </template>

        <template #header-name="header">
          {{ header.text }}
          <div class="filter-column">
            <FunnelIcon class="ml-2 mr-2 mt-0 h-4 w-4" :class="showNameFilter ? 'rotate-90 text-white' : 'rotate-0'"
              @click.stop="showNameFilter = !showNameFilter" />
            <input v-if="showNameFilter" v-model="search_title" type="text" class="title-filter"
              placeholder="Filter by Name">
            <div class="flex flex-row cursor-pointer"
              :class="orderColumn == 'title' ? 'active-filter' : 'inactive-filter'" @click="updateOrdering('title')">
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #header-created_at="header">
          {{ header.text }}
          <div class="filter-column">
            <div class="flex flex-row cursor-pointer"
              :class="orderColumn == 'created_at' ? 'active-filter' : 'inactive-filter'"
              @click="updateOrdering('created_at')">
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #header-updated_at="header">
          {{ header.text }}
          <div class="filter-column">
            <div class="flex flex-row cursor-pointer"
              :class="orderColumn == 'updated_at' ? 'active-filter' : 'inactive-filter'"
              @click="updateOrdering('updated_at')">
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #item-created_at="item">
          <div class="text-xs text-center">
            {{ item.created_at ? parseDisplayDate(item.created_at) : null }}
          </div>
        </template>

        <template #item-updated_at="item">
          <div class="text-xs text-center">
            {{ item.updated_at ? parseDisplayDate(item.updated_at) : null }}
          </div>
        </template>

        <template #item-actions="item">
          <div class="whitespace-nowrap">
            <router-link :to="{ name: 'categories.edit', params: { id: item.id } }">
              <AppButton v-if="userCan('edit.categories')" v-tippy="$t('edit_category')" warning :disabled="!dataReady"
                :loading='!dataReady' class="mr-2 px-1 py-1 text-sm">
                <template #text>
                  <PencilIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
                  <span class="sr-only">{{ $t('edit_category') }}</span>
                </template>
              </AppButton>
            </router-link>

            <AppButton v-if="userCan('delete.categories')" v-tippy="$t('delete_category')" danger :disabled="!dataReady"
              :loading='!dataReady' class="mr-2 px-1 py-1 text-sm" @click="triggerDeleteCategory(item)">
              <template #text>
                <TrashIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
                <span class="sr-only">{{ $t('delete_category') }}</span>
              </template>
            </AppButton>
          </div>
        </template>



      </EasyDataTable>

    </div>
  </div>
</template>




<!-- <template>
  <div class="row justify-content-center my-2">
    <div class="col-md-12">
      <div class="card border-0">
        <div class="card-header bg-transparent">
          <h5 class="float-start">Categories</h5>
          <router-link v-if="can('category-create')" :to="{ name: 'categories.create' }"
            class="btn btn-primary btn-sm float-end">
            Create Category
          </router-link>
        </div>
        <div class="card-body shadow-sm">
          <div class="mb-4">
            <input v-model="search_global" type="text" placeholder="Search..." class="form-control w-25">
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_id" type="text" class="inline-block mt-1 form-control"
                      placeholder="Filter by ID">
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_title" type="text" class="inline-block mt-1 form-control"
                      placeholder="Filter by Title">
                  </th>
                  <th class="px-6 py-3 text-start"></th>
                  <th class="px-6 py-3 text-start"></th>
                </tr>
                <tr>
                  <th class="px-6 py-3 text-start">
                    <div class="flex flex-row" @click="updateOrdering('id')">
                      <div class="font-medium text-uppercase"
                        :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
                        ID
                      </div>
                      <div class="select-none">
                        <span :class="{
                          'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                          'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                        }">&uarr;</span>
                        <span :class="{
                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                        }">&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="px-6 py-3 text-left">
                    <div class="flex flex-row" @click="updateOrdering('title')">
                      <div class="font-medium text-uppercase"
                        :class="{ 'font-bold text-blue-600': orderColumn === 'title' }">
                        Title
                      </div>
                      <div class="select-none">
                        <span :class="{
                          'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                          'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                        }">&uarr;</span>
                        <span :class="{
                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'title',
                        }">&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <div class="flex flex-row items-center justify-between cursor-pointer"
                      @click="updateOrdering('created_at')">
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        :class="{ 'font-bold text-blue-600': orderColumn === 'created_at' }">
                        Created at
                      </div>
                      <div class="select-none">
                        <span :class="{
                          'text-blue-600': orderDirection === 'asc' && orderColumn === 'created_at',
                          'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'created_at',
                        }">&uarr;</span>
                        <span :class="{
                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at',
                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'created_at',
                        }">&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in categories.data" :key="post.id">
                  <td class="px-6 py-4 text-sm">
                    {{ post.id }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    {{ post.name }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    {{ post.created_at }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <router-link v-if="can('category-edit')" :to="{ name: 'categories.edit', params: { id: post.id } }"
                      class="badge bg-primary">Edit
                    </router-link>
                    <a href="#" v-if="can('category-delete')" @click.prevent="deleteCategory(post.id)"
                      class="ms-2 badge bg-danger">Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <Pagination :data="categories" :limit="3"
            @pagination-change-page="page => getCategories(page, search_id, search_title, search_global, orderColumn, orderDirection)"
            class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>
 -->
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import useCategories from "@/composables/categories";
import { parseDisplayDate } from "@services/utilities";
import NoRecordsCTA from '@components/common/NoRecordsCTA.vue';
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  TrashIcon,
  FunnelIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline';

const { categories, getCategories, deleteCategory, categoryList, getCategoryList } = useCategories();
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();

const search_id = ref('');
const search_title = ref('');
const search_global = ref('');
const orderColumn = ref('id');
const orderDirection = ref('desc');
const dataReady = ref(false);
const itemsTableKey = ref(478953442);
const itemsLength = ref(0);
const paginationOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: 'id',
  sortType: 'asc',
});
const showNameFilter = ref(false);
const showCategoriesFilter = ref(false);
const startAmount = ref(0);
const items = computed(() => { return categories.value; })

const perPage = [
  10, 25, 50, 100, 500, 1000, 10000
];

const tableHeaders = ref([
  { text: "ID", value: "id", sortable: false },
  { text: "NAME", value: "name", sortable: false },
  { text: "POSTS", value: "posts.length", sortable: false },
  { text: "CREATED AT", value: "created_at", sortable: false, width: 160 },
  { text: "UPDATED AT", value: "updated_at", sortable: false, width: 160 },
  { text: "ACTIONS", value: "actions" },
]);

onMounted(() => {
  getCategories().then((ref) => {
    startAmount.value = ref.data.length;
    dataReady.value = true;
  })
});

const updateOrdering = (column) => {
  orderColumn.value = column;
  orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
  getCategories(
    1,
    search_id.value,
    search_title.value,
    search_global.value,
    orderColumn.value,
    orderDirection.value
  );
}

const triggerDeleteCategory = async (item) => {
  deleteCategory(item).then((ref) => {
    if (ref && ref.data) {
      search_id.value = '';
      search_title.value = '';
      search_global.value = '';
      orderColumn.value = 'id';
      orderDirection.value = 'desc';
      startAmount.value = ref.data.length;
    }
  })
};

watch(categories, (current) => {
  itemsLength.value = current.data.length;
}, { deep: true });

watch(search_id, (current, previous) => {
  getCategories(
    1,
    current,
    search_title.value,
    search_global.value
  )
}, { deep: true });

watch(search_title, (current, previous) => {
  getCategories(
    1,
    search_id.value,
    current,
    search_global.value
  )
}, { deep: true });

watch(search_global, _.debounce((current, previous) => {
  getCategories(
    1,
    search_id.value,
    search_title.value,
    current
  )
}, 200))

</script>
