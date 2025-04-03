<template>
  <div id="posts" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="posts.index" :text="$t('posts')" />
    </AdminBreadcrumbContainer>

    <NoRecordsCTA v-if="startAmount == 0 && dataReady" :text="$t('no_posts')">
      <template #action>
        <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="float-right mb-2">
          <AppButton v-tippy="$t('create_post')" secondary class="px-5 py-2 font-medium">
            <template #text>
              {{ $t('create_new_post') }}
              <span class="fas fa-plus fa-fw ml-2" />
            </template>
          </AppButton>
        </router-link>
      </template>
    </NoRecordsCTA>

    <div v-if="startAmount > 0 && items && items.data">
      <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="float-right mb-2">
        <AppButton v-tippy="$t('create_post')" secondary class="px-2 py-2 text-sm font-medium">
          <template #text>
            <span class="fas fa-plus fa-fw ml-2 mr-2" />
            <span class="sr-only">{{ $t('create_new_post') }}</span>
          </template>
        </AppButton>
      </router-link>

      <div
        v-if="userCan('view.articles')"
        class="mt-2 grid grid-cols-1 float-left clear-both mb-4 w-full sm:w-6/12 lg:w-4/12"
      >
        <input
          id="search_posts"
          v-model="search_global"
          type="text"
          name="search_posts"
          :placeholder="$t('search_posts') + '...'"
          class="col-start-1 row-start-1 block w-full rounded-md placeholder:text-gray-400 pl-9 dark:bg-gray-900 dark:text-gray-200 border-0"
        />
        <MagnifyingGlassIcon
          class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-600 sm:size-4"
        />
      </div>

      <EasyDataTable
        :key="itemsTableKey"
        ref="postsTable"
        v-model:server-options="paginationOptions"
        :headers="tableHeaders"
        :items="items.data"
        :rows-items="perPage"
        :loading="!dataReady"
        :server-items-length="itemsLength"
        no-hover
        must-sort
        body-item-class-name="text-xs"
        class="clear-both z-50"
        fixed-header
      >
        <template #header-id="header">
          {{ header.text }}
          <div class="filter-column">
            <div
              class="flex flex-row cursor-pointer"
              :class="orderColumn == 'id' ? 'active-filter' : ' inactive-filter'"
              @click="updateOrdering('id')"
            >
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
            <!-- <Slider v-model="idCriteria" class="slider" /> -->
          </div>
        </template>

        <template #header-title="header">
          {{ header.text }}
          <div class="filter-column">
            <FunnelIcon
              class="ml-2 mr-2 mt-0 h-4 w-4"
              :class="showNameFilter ? 'rotate-90 text-white' : 'rotate-0'"
              @click.stop="showNameFilter = !showNameFilter"
            />
            <input
              v-if="showNameFilter"
              v-model="search_title"
              type="text"
              class="title-filter"
              placeholder="Filter by Title"
            />
            <div
              class="flex flex-row cursor-pointer"
              :class="orderColumn == 'title' ? 'active-filter' : 'inactive-filter'"
              @click="updateOrdering('title')"
            >
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #header-categories="header">
          {{ header.text }}
          <div class="filter-column">
            <FunnelIcon
              class="ml-2 mr-2 mt-0 h-4 w-4"
              :class="showCategoriesFilter ? 'rotate-90 text-white' : 'rotate-0'"
              @click.stop="showCategoriesFilter = !showCategoriesFilter"
            />
            <v-select
              v-if="showCategoriesFilter"
              v-model="search_category"
              multiple
              :options="categoryList"
              :reduce="(category) => category.id"
              label="name"
              class="categories-filter"
            />
          </div>
        </template>

        <template #header-created_at="header">
          {{ header.text }}
          <div class="filter-column">
            <div
              class="flex flex-row cursor-pointer"
              :class="orderColumn == 'created_at' ? 'active-filter' : 'inactive-filter'"
              @click="updateOrdering('created_at')"
            >
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #header-updated_at="header">
          {{ header.text }}
          <div class="filter-column">
            <div
              class="flex flex-row cursor-pointer"
              :class="orderColumn == 'updated_at' ? 'active-filter' : 'inactive-filter'"
              @click="updateOrdering('updated_at')"
            >
              <ChevronDownIcon v-if="orderDirection == 'desc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
              <ChevronUpIcon v-if="orderDirection == 'asc'" class="ml-2 mr-2 mt-0 h-4 w-4" />
            </div>
          </div>
        </template>

        <template #item-categories="item">
          <div v-for="category in item.categories" :key="category.name + category.id" class="text-xs text-center">
            {{ category.name }}
          </div>
        </template>

        <template #item-content="item">
          <div v-html-safe="item.content.slice(0, 50) + '...'" />
        </template>

        <template #item-thumbnail="item">
          <!-- {{ item.resized_image }} -->
          <img :src="item.original_image" :alt="item.title" height="70" />
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
            <router-link :to="{ name: 'posts.edit', params: { id: item.id } }">
              <AppButton
                v-if="userCan('edit.articles')"
                v-tippy="$t('edit_post')"
                warning
                :disabled="!dataReady"
                :loading="!dataReady"
                class="mr-2 px-1 py-1 text-sm"
              >
                <template #text>
                  <PencilIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
                  <span class="sr-only">{{ $t('edit_post') }}</span>
                </template>
              </AppButton>
            </router-link>

            <AppButton
              v-if="userCan('delete.articles')"
              v-tippy="$t('delete_post')"
              danger
              :disabled="!dataReady"
              :loading="!dataReady"
              class="mr-2 px-1 py-1 text-sm"
              @click="triggerDeletePost(item)"
            >
              <template #text>
                <TrashIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
                <span class="sr-only">{{ $t('delete_post') }}</span>
              </template>
            </AppButton>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import usePosts from '@/composables/posts';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useCategories from '@/composables/categories';
import { parseDisplayDate } from '@services/utilities';
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
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

const { posts, getPosts, deletePost } = usePosts();
const { categoryList, getCategoryList } = useCategories();
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();

const search_category = ref('');
const search_id = ref('');
const search_title = ref('');
const search_content = ref('');
const search_global = ref('');
const orderColumn = ref('id');
const orderDirection = ref('desc');
const dataReady = ref(false);
const itemsTableKey = ref(43298654);
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
const items = computed(() => {
  return posts.value;
});

const perPage = [10, 25, 50, 100, 500, 1000, 10000];

const idCriteria = ref([1, 400]);

const tableHeaders = ref([
  { text: 'ID', value: 'id', sortable: false },
  { text: 'TITLE', value: 'title', sortable: false },
  { text: 'CONTENT', value: 'content', sortable: false, width: 200 },
  { text: 'THUMBNAIL', value: 'resized_image', sortable: false },
  { text: 'CATEGORIES', value: 'categories', sortable: false },
  { text: 'CREATED AT', value: 'created_at', sortable: false, width: 160 },
  { text: 'UPDATED AT', value: 'updated_at', sortable: false, width: 160 },
  { text: 'ACTIONS', value: 'actions' },
]);

onMounted(() => {
  getPosts().then((ref) => {
    startAmount.value = ref.data.length;
    dataReady.value = true;
  });
  getCategoryList();
});

const triggerDeletePost = async (post) => {
  deletePost(post).then((ref) => {
    if (ref && ref.data) {
      search_category.value = '';
      search_id.value = '';
      search_title.value = '';
      search_content.value = '';
      search_global.value = '';
      orderColumn.value = 'id';
      orderDirection.value = 'desc';
      startAmount.value = ref.data.length;
    }
  });
};

const updateOrdering = (column) => {
  orderColumn.value = column;
  orderDirection.value = orderDirection.value === 'asc' ? 'desc' : 'asc';
  getPosts(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value,
    orderColumn.value,
    orderDirection.value,
  );
};

watch(
  search_category,
  (current) => {
    getPosts(1, current, search_id.value, search_title.value, search_content.value, search_global.value);
  },
  { deep: true },
);

watch(
  search_id,
  (current) => {
    getPosts(1, search_category.value, current, search_title.value, search_content.value, search_global.value);
  },
  { deep: true },
);

watch(
  search_title,
  (current) => {
    getPosts(1, search_category.value, search_id.value, current, search_content.value, search_global.value);
  },
  { deep: true },
);

watch(
  search_content,
  (current) => {
    getPosts(1, search_category.value, search_id.value, search_title.value, current, search_global.value);
  },
  { deep: true },
);

watch(
  search_global,
  _.debounce((current) => {
    getPosts(1, search_category.value, search_id.value, search_title.value, search_content.value, current);
  }, 200),
);

watch(
  posts,
  (current) => {
    itemsLength.value = current.data.length;
  },
  { deep: true },
);

watch(
  paginationOptions,
  (current) => {
    getPosts(
      current.page,
      search_category.value,
      search_id.value,
      search_title.value,
      search_content.value,
      search_global.value,
      current.sortBy,
      current.sortType,
      current.rowsPerPage,
    );
  },
  { deep: true },
);
</script>
