<template>
  <div id="profile" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.index" :text="$t('settings')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.profile" :text="$t('profile')" />
    </AdminBreadcrumbContainer>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">
          <form @submit.prevent="submitForm">
            <AppTextInput
              v-model="profile.name"
              :label="$t('name')"
              placeholder="Enter name here"
              autocomplete="name"
              :disabled="isLoading"
              :error="errors.name"
              class="mt-1"
            >
              <template #message>
                <div class="text-danger mt-1">
                  <div v-for="message in validationErrors?.name" :key="message">
                    {{ message }}
                  </div>
                </div>
              </template>
            </AppTextInput>

            <AppTextInput
              v-model="profile.email"
              :label="$t('email')"
              placeholder="Enter email here"
              autocomplete="email"
              :disabled="isLoading"
              :error="errors.email"
            >
              <template #message>
                <div class="text-danger mt-1">
                  <div v-for="message in validationErrors?.email" :key="message">
                    {{ message }}
                  </div>
                </div>
              </template>
            </AppTextInput>
            <div class="md:flex md:items-center mb-2">
              <div class="md:w-3/12" />
              <div class="md:w-9/12">
                <AppButton
                  primary
                  :disabled="isLoading"
                  :loading="isLoading"
                  :text="isLoading ? 'Updating' : 'Update'"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';
import useProfile from '@/composables/profile';
import CircleSvg from '@components/common/CircleSvg.vue';
import SettingsNav from '@pages/user-settings/SettingsNav.vue';
import AppTextInput from '@components/form/AppTextInput.vue';

defineRule('required', required);
// defineRule('email', email)
defineRule('min', min);

const schema = {
  name: 'required|min:3',
  email: 'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: email } = useField('email', null, { initialValue: '' });
const { profile: profileData, getProfile, updateProfile, validationErrors, isLoading } = useProfile();
const profile = reactive({
  name,
  email,
});
function submitForm() {
  validate().then((form) => {
    if (form.valid) updateProfile(profile);
  });
}
onMounted(() => {
  getProfile();
});

watchEffect(() => {
  profile.name = profileData.value.name;
  profile.email = profileData.value.email;
});
</script>
