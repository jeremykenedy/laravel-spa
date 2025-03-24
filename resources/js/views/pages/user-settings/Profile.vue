<template>
  <div id="profile" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">

    <AdminBreadcrumbContainer>
      <AdminBreadcrumb routeName="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb routeName="settings.index" :text="$t('settings')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb routeName="settings.profile" :text="$t('profile')" />
    </AdminBreadcrumbContainer>

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
import SettingsNav from '@pages/user-settings/SettingsNav.vue';
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
    return {
      //
    };
  },
  methods: {
  },
};

</script>
