<template>
  <div id="create_category" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
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
          <router-link v-slot="{ isActive }" :to="{ name: 'categories.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('categories') }}
            </span>
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'categories.create' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('create_category') }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <AppButton v-tippy="$t('cancel')" secondary @click.prevent="cancelForm"
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
                <label for="category-name" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300">Category
                  Name</label>
                <div class="mt-2">
                  <input v-model="category.name" type="text" name="category-name" id="category-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 dark:outline outline-1 dark:bg-gray-900 dark:border-none dark:text-gray-100 dark:outline-0 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  {{ errors.name }}
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.name">
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
          <AppButton warning @click.prevent="clearForm">
            <template #text>
              {{ $t('clear') }}
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
import { reactive } from "vue";
import useCategories from "@/composables/categories";
import { useForm, useField, defineRule } from "vee-validate";
import { required, min } from "@/validation/rules"
import { useAuthStore } from "@store/auth";
import { useToastStore } from "@store/toast";
import { useRoute, useRouter } from "vue-router";

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
  name: 'required|min:3'
}
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema })
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { storeCategory, validationErrors, isLoading } = useCategories()
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();
const toast = useToastStore();
const router = useRouter();

const category = reactive({
  name
})

function clearForm() {
  category.name = '';
  success('Cleared');
}

function cancelForm() {
  success('Cancelled');
  router.push({ name: 'categories.index' });
}

function submitForm() {
  validate().then(form => { if (form.valid) storeCategory(category) })
}
</script>
