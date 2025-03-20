<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold float-left ml-2 mt-2" aria-label="Breadcrumb">
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
          <router-link v-slot="{ isActive }" :to="{ name: 'settings.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            {{ $t('settings') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'profile.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('profile') }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">

          Profile Content

        </div>
      </div>
    </div>

  </div>

  <!--   <div class="card border-0">
    <div class="card-header bg-transparent">
      <h5 class="float-start">Profile</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="profile.name" class="form-control" id="name">
          <div class="text-danger mt-1">
            {{ errors.name }}
          </div>
          <div class="text-danger mt-1">
            <div v-for="message in validationErrors?.name">
              {{ message }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="profile.email" class="form-control" id="email">
          <div class="text-danger mt-1">
            {{ errors.email }}
          </div>
          <div class="text-danger mt-1">
            <div v-for="message in validationErrors?.email">
              {{ message }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <button :disabled="isLoading" class="btn btn-primary">
            <div v-show="isLoading" class=""></div>
            <span v-if="isLoading">Processing...</span>
            <span v-else>Update</span>
          </button>
        </div>
      </form>
    </div>
  </div> -->
</template>

<script setup>
import { onMounted, reactive, watchEffect } from "vue";
import { useForm, useField, defineRule } from "vee-validate";
import { required, min } from "@/validation/rules"
import useProfile from "@/composables/profile";
import SettingsNav from '@pages/settings/SettingsNav.vue';
defineRule('required', required)
// defineRule('email', email)
defineRule('min', min);

const schema = {
  name: 'required|min:3',
  email: 'required',
}
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema })
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: email } = useField('email', null, { initialValue: '' });
const { profile: profileData, getProfile, updateProfile, validationErrors, isLoading } = useProfile()
const profile = reactive({
  name,
  email
})
function submitForm() {
  validate().then(form => { if (form.valid) updateProfile(profile) })
}
onMounted(() => {
  getProfile()
})

watchEffect(() => {
  profile.name = profileData.value.name
  profile.email = profileData.value.email
})
</script>

<script>
import moment from 'moment';
import {
  ChevronRightIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'Roles',
  components: {
    ChevronRightIcon,
  },
  computed: {
  },
  mounted() {
  },
  data() {
  },
  methods: {
  },
};

</script>
