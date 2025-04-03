<template>
  <div id="create_category" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="admin.index" :text="$t('admin')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="categories.index" :text="$t('categories')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="categories.create" :text="$t('create_category')" />
    </AdminBreadcrumbContainer>

    <AppButton
      v-tippy="$t('cancel')"
      secondary
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2"
      @click.prevent="cancelForm"
    >
      <template #text>
        <span class="fas fa-reply fa-fw ml-2 mr-2" />
        <span class="sr-only">{{ $t('cancel') }}</span>
      </template>
    </AppButton>
    <AppButton
      v-tippy="$t('clear')"
      warning
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2"
      @click.prevent="clearForm"
    >
      <template #text>
        <span class="fas fa-close fa-fw ml-2 mr-2" />
        <span class="sr-only">{{ $t('clear') }}</span>
      </template>
    </AppButton>
    <AppButton
      v-tippy="$t('save')"
      primary
      submit
      class="px-2 py-2 text-sm font-medium float-right mb-2 ml-2"
      @click.prevent="submitForm"
    >
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
                <label for="category-name" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >Category Name</label
                >
                <div class="mt-2">
                  <input
                    id="category-name"
                    v-model="category.name"
                    type="text"
                    name="category-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 dark:outline outline-1 dark:bg-gray-900 dark:border-none dark:text-gray-100 dark:outline-0 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  {{ errors.name }}
                </div>
                <div class="text-red-500 dark:text-red-400 mt-1 text-sm font-bold">
                  <div v-for="message in validationErrors?.name" :key="message">
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
          <AppButton primary submit class="px-5" @click.prevent="submitForm">
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
import { reactive } from 'vue';
import useCategories from '@/composables/categories';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import { useRoute, useRouter } from 'vue-router';

import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  TrashIcon,
  FunnelIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
  name: 'required|min:3',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { storeCategory, validationErrors, isLoading } = useCategories();
const { userCan, userIs, user, authenticated } = useAuthStore();
const { popToast, success, error } = useToastStore();
const toast = useToastStore();
const router = useRouter();

const category = reactive({
  name,
});

function clearForm() {
  category.name = '';
  success('Cleared');
}

function cancelForm() {
  success('Cancelled');
  router.push({ name: 'categories.index' });
}

function submitForm() {
  validate().then((form) => {
    if (form.valid) storeCategory(category);
  });
}
</script>
