<template>
  <div id="edit_post" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
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
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'posts.edit' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('edit_post') }}
            </span>
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'posts.edit' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ post.title }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <router-link v-if="userCan('create.articles')" :to="{ name: 'posts.create' }" class="float-right mb-2 ml-2">
      <AppButton v-tippy="$t('create_post')" secondary class="px-2 py-2 text-sm font-medium">
        <template #text>
          <span class="fas fa-plus fa-fw ml-2 mr-2" />
          <span class="sr-only">{{ $t('create_new_post') }}</span>
        </template>
      </AppButton>
    </router-link>

    <AppButton v-tippy="'Go to Posts'" secondary @click.prevent="cancelForm"
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2">
      <template #text>
        <span class="fas fa-reply fa-fw ml-2 mr-2" />
        <span class="sr-only">{{ $t('cancel') }}</span>
      </template>
    </AppButton>
    <AppButton v-tippy="$t('clear')" warning @click.prevent="clearForm"
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2">
      <template #text>
        <span class="fas fa-close fa-fw ml-2 mr-2" />
        <span class="sr-only">{{ $t('clear') }}</span>
      </template>
    </AppButton>
    <AppButton v-tippy="$t('save')" primary submit @click.prevent="submitForm"
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2">
      <template #text>
        <span class="fas fa-save fa-fw ml-2 mr-2" />
        <span class="sr-only">{{ $t('save') }}</span>
      </template>
    </AppButton>

    <div class="clear-both">

      <form @submit.prevent="submitForm">

        <div class="space-y-12">
          <div class="pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div class="col-span-full">
                <label for="post-title" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300">Title</label>
                <div class="mt-2">
                  <input v-model="post.title" type="text" name="post-title" id="post-title"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 dark:outline outline-1 dark:bg-gray-900 dark:border-none dark:text-gray-100 dark:outline-0 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  {{ errors.title }}
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.title">
                    {{ message }}
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label for="categories"
                  class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300">Categories</label>
                <div class="mt-2 grid grid-cols-1">
                  <v-select multiple v-model="post.categories" :options="categoryList" :reduce="category => category.id"
                    label="name" placeholder="Select category" id="categories" name="categories" />
                </div>

                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  {{ errors.categories }}
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.categories">
                    {{ message }}
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label for="about" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300">Content</label>
                <div class="mt-2">
                  <TextEditorComponent v-model="post.content" />
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.content">
                    {{ message }}
                  </div>
                </div>
              </div>

              <div class="col-span-full rounded">
                <label for="cover-photo"
                  class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300">Thumbnail</label>
                <DropZone v-model="post.thumbnail" />
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.thumbnail">
                    {{ message }}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center gap-x-6 actions">
          <AppButton secondary @click.prevent="cancelForm">
            <template #text>
              {{ $t('cancel') }}
            </template>
          </AppButton>
          <AppButton primary submit @click.prevent="submitForm" class="px-5">
            <template #text>
              {{ $t('save') }}
            </template>
          </AppButton>
        </div>

      </form>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, watch, reactive, ref, watchEffect } from "vue";
import useCategories from "@/composables/categories";
import usePosts from "@/composables/posts";
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import { useRoute, useRouter } from "vue-router";
import { useForm, useField, defineRule } from "vee-validate";
import { required, min } from "@/validation/rules"
import TextEditorComponent from "@/components/common/TextEditorComponent.vue";
import DropZone from "@/components/common/DropZone.vue";

import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  TrashIcon,
  FunnelIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline';
defineRule('required', required)
defineRule('min', min);

// Define a validation schema
const schema = {
  title: 'required|min:5',
  content: 'required|min:50',
  categories: 'required'
}
// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema })
// Define actual fields for validation
const { value: title } = useField('title', null, { initialValue: '' });
const { value: content } = useField('content', null, { initialValue: '' });
const { value: categories } = useField('categories', null, { initialValue: '', label: 'category' });
const { categoryList, getCategoryList } = useCategories()
const { post: postData, getPost, updatePost, validationErrors, isLoading, deletePost } = usePosts()
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();
const toast = useToastStore();
const router = useRouter();

const post = reactive({
  title,
  content,
  categories,
  thumbnail: ''
})
const route = useRoute()

function submitForm() {
  updatePost(post);

  // validate().then(form => {
  //   if (form.valid) updatePost(post)
  // })
}
onMounted(() => {
  getPost(route.params.id)
  getCategoryList()
})

// https://vuejs.org/api/reactivity-core.html#watcheffect
watchEffect(() => {
  post.id = postData.value.id
  post.title = postData.value.title
  post.content = postData.value.content
  post.thumbnail = postData.value.original_image
  post.categories = postData.value.categories
});

function clearForm() {
  post.title = '';
  post.content = '';
  post.categories = null;
  post.thumbnail = '';
  success('Cleared');
}

function cancelForm() {
  success('Cancelled Editing');
  router.push({ name: 'posts.index' });
}

</script>
