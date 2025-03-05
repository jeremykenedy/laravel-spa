<template>

  <div id="posts" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 mt-2 ml-2 text-sm font-semibold float-left" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'dashboard' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            {{ $t('dashboard') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'posts.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('posts') }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <div v-if="posts && posts.data && posts.data.length == 0">
      <div class="mx-auto py-14">
        <div class="relative isolate overflow-hidden bg-white dark:bg-gray-900 px-6 py-44 text-center dark:shadow-2xl sm:rounded sm:px-16">
          <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-700 dark:text-white sm:text-5xl">
            {{ $t('no_posts') }}
          </h2>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="float-right mb-2">
              <AppButton
                v-tippy="$t('create_post')"
                secondary
                class="px-5 py-2 font-medium"
              >
                <template #text>
                  {{ $t('create_new_post') }}
                  <span class="fas fa-plus fa-fw ml-2" />
                </template>
              </AppButton>
            </router-link>
          </div>
          <svg viewBox="0 0 1024 1024" class="hidden dark:block absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="posts && posts.data && posts.data.length > 0">
      <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="float-right mb-2">
        <AppButton
          v-tippy="$t('create_post')"
          secondary
          class="px-2 py-2 text-sm font-medium"
        >
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
          v-model="search_global"
          type="text"
          name="search_posts"
          id="search_posts"
          :placeholder="$t('search_posts')+'...'"
          class="col-start-1 row-start-1 block w-full rounded-md placeholder:text-gray-400 pl-9 dark:bg-gray-900 dark:text-gray-200 border-0"
        >
        <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-600 sm:size-4" />
      </div>



      <EasyDataTable
        v-model:server-options="paginationOptions"
        :headers="tableHeaders"
        :items="posts.data"
        :rows-items="perPage"
        :loading = '!dataReady'
        :key="postsTableKey"
        :server-items-length="postsLength"
        ref="postsTable"
        no-hover
        must-sort
        body-item-class-name="text-xs"
        class="clear-both"
      >
        <template #item-categories="item">
          <div v-for="category in item.categories" :key="category.name+category.id" class="text-xs text-center">
            {{ category.name }}
          </div>
        </template>

        <template #item-content="item">
          <div v-html="item.content.slice(0, 50) + '...'"></div>
        </template>

        <template #item-thumbnail="item">
          <!-- {{ item.resized_image }} -->
          <img :src="item.original_image" :alt="item.title" height="70">
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




<!-- TrashIcon

userCan('edit.articles')
v-if="can('post-edit')"
<router-link :to="{ name: 'posts.edit', params: { id: post.id } }"
class="badge bg-primary">Edit
</router-link>

userCan('delete.articles')
v-if="can('post-delete')"
<a href="#" @click.prevent="deletePost(post.id)"
class="ms-2 badge bg-danger">Delete</a>

 -->

          <AppButton
            v-if="userCan('delete.articles')"
            v-tippy="$t('delete_post')"
            danger
            :disabled="!dataReady"
            :loading='!dataReady'
            class="mr-2 px-1 py-1 text-sm"
            @click="deletePost(item)"
          >
            <template #text>
              <TrashIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
              <span class="sr-only">{{ $t('delete_post') }}</span>
            </template>
          </AppButton>

        </template>


      </EasyDataTable>
    </div>




<!--
  <div class="row justify-content-center my-2">
    <div class="col-md-12">
      <div class="card border-0">
        <div class="card-header bg-transparent">
          <h5 class="float-start">Posts</h5>
          v-if="can('post-create')"
          <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="btn btn-primary btn-sm float-end">
            Create Post
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
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <v-select multiple v-model="search_category" :options="categoryList" :reduce="category => category.id"
                      label="name" class="form-control w-100" />
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_content" type="text" class="inline-block mt-1 form-control"
                      placeholder="Filter by Content">
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
                  <th class="px-6 py-3 text-left">
                    <div class="flex flex-row">
                      <div class="font-medium text-uppercase">
                        Thumbnail
                      </div>
                    </div>
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left">
                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
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
                <tr v-for="post in posts.data" :key="post.id">
                  <td class="px-6 py-4 text-sm" width="20">
                    {{ post.id }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    {{ post.title }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <img :src="post.original_image" alt="image" height="70">
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <div v-for="category in post.categories">
                      {{ category.name }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <div v-html="post.content.slice(0, 100) + '...'"></div>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    {{ post.created_at }}
                  </td>
                  <td class="px-6 py-4 text-sm">

                    v-if="can('post-edit')"
                    <router-link :to="{ name: 'posts.edit', params: { id: post.id } }"
                      class="badge bg-primary">Edit
                    </router-link>

                    v-if="can('post-delete')"
                    <a href="#" @click.prevent="deletePost(post.id)"
                      class="ms-2 badge bg-danger">Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <Pagination :data="posts" :limit="3"
            @pagination-change-page="page => getPosts(page, search_category, search_id, search_title, search_content, search_global, orderColumn, orderDirection)"
            class="mt-4" />
        </div>
      </div>
    </div>
  </div>
 -->




  </div>




</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import usePosts from "@/composables/posts";
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import useCategories from "@/composables/categories";
import { parseDisplayDate } from "@services/utilities";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

const { posts, getPosts, deletePost } = usePosts();
const { categoryList, getCategoryList } = useCategories();
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();

const search_category = ref('');
const search_id = ref('');
const search_title = ref('');
const search_content = ref('');
const search_global = ref('');
const orderColumn = ref('created_at');
const orderDirection = ref('desc');
const dataReady = ref(false);
const postsTableKey = ref(43298654);
const postsLength = ref(0);
const paginationOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: 'id',
  sortType: 'asc',
});

const perPage = [
  10, 25, 50, 100, 500, 1000, 10000
];

const tableHeaders = [
  { text: "ID", value: "id", sortable: true },
  { text: "TITLE", value: "title", sortable: true },
  { text: "CONTENT", value: "content", sortable: true, width: 200 },
  { text: "THUMBNAIL", value: "resized_image", sortable: true },
  { text: "CATEGORIES", value: "categories", sortable: true },
  { text: "CREATED AT", value: "created_at", sortable: true, width: 140 },
  { text: "UPDATED AT", value: "updated_at", sortable: true, width: 140 },
  { text: "ACTIONS", value: "actions" },
];

onMounted(() => {
  getPosts().then(() => {
    dataReady.value = true;
  })
  getCategoryList();
});

const updateOrdering = (column) => {
  orderColumn.value = column;
  orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
  getPosts(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value,
    orderColumn.value,
    orderDirection.value
  );
};










watch(search_category, (current) => {
  getPosts(
    1,
    current,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value
  )
}, { deep: true });

watch(search_id, (current) => {
  getPosts(
    1,
    search_category.value,
    current,
    search_title.value,
    search_content.value,
    search_global.value
  )
}, { deep: true });

watch(search_title, (current) => {
  getPosts(
    1,
    search_category.value,
    search_id.value,
    current,
    search_content.value,
    search_global.value
  )
}, { deep: true });

watch(search_content, (current) => {
  getPosts(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    current,
    search_global.value
  )
}, { deep: true });

watch(search_global, _.debounce((current) => {
  getPosts(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    search_content.value,
    current
  )
}, 200));

watch(posts, (current) => {
  postsLength.value = current.data.length;
}, { deep: true });

watch(paginationOptions, (current) => {
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
  )
}, { deep: true });

</script>
