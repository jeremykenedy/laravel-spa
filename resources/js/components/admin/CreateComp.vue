<template>
  <div class="row justify-content-center my-5">
    <div class="col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <!-- Title -->
            <div class="mb-3">
              <label for="post-title" class="form-label"> Title </label>
              <input id="post-title" v-model="post.title" type="text" class="form-control" />
              <div class="text-danger-600 mt-1">
                {{ errors.title }}
              </div>
              <div class="invalid-feedback mt-1">
                <div v-for="message in validationErrors?.title" :key="message">
                  {{ message }}
                </div>
              </div>
            </div>
            <!-- Content -->
            <div class="mb-3">
              <label for="post-content" class="form-label"> Content </label>
              <textarea id="post-content" v-model="post.content" class="form-control" />
              <div class="invalid-feedback mt-1">
                {{ errors.content }}
              </div>
              <div class="text-danger-600 mt-1">
                <div v-for="message in validationErrors?.content" :key="message">
                  {{ message }}
                </div>
              </div>
            </div>
            <!-- Category -->
            <div class="mb-3">
              <label for="post-category" class="form-label"> Category </label>
              <v-select
                v-model="post.category_id"
                :options="categories"
                :reduce="(category) => category.id"
                label="text"
                class="form-control"
              />
              <div class="invalid-feedback mt-1">
                {{ errors.category_id }}
              </div>
              <div class="invalid-feedback mt-1">
                <div v-for="message in validationErrors?.category_id" :key="message">
                  {{ message }}
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="thumbnail" class="form-label"> Thumbnail </label>
              <input
                id="thumbnail"
                type="file"
                class="form-control"
                @change="post.thumbnail = $event.target.files[0]"
              />
              <div class="text-danger-600 mt-1">
                <div v-for="message in validationErrors?.thumbnail" :key="message">
                  {{ message }}
                </div>
              </div>
            </div>
            <!-- Buttons -->
            <div class="mt-4">
              <button :disabled="isLoading" class="btn btn-primary">
                <div v-show="isLoading" class="" />
                <span v-if="isLoading">Processing...</span>
                <span v-else>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
import useCategories from '@/composables/categories';
import usePosts from '@/composables/posts';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '../../validation/rules';
defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
  title: 'required|min:5',
  content: 'required|min:50',
  category_id: 'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: title } = useField('title', null, { initialValue: '' });
const { value: content } = useField('content', null, { initialValue: '' });
const { value: category_id } = useField('category_id', null, {
  initialValue: '',
  label: 'category',
});
const { categories, getCategories } = useCategories();
const { storePost, validationErrors, isLoading } = usePosts();
const post = reactive({
  title,
  content,
  category_id,
  thumbnail: '',
});
function submitForm() {
  validate().then((form) => {
    if (form.valid) storePost(post);
  });
}
onMounted(() => {
  getCategories();
});
</script>
