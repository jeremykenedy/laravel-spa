<template>
  <div id="password" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <AdminBreadcrumbContainer>
      <AdminBreadcrumb route-name="dashboard" :text="$t('dashboard')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.index" :text="$t('settings')" />
      <AdminBreadcrumbSep />
      <AdminBreadcrumb route-name="settings.password" :text="$t('security')" />
    </AdminBreadcrumbContainer>

    <div class="clear-both">
      <div class="text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between">
        <SettingsNav />
        <div class="none w-full rounded-md border dark:border-gray-500 p-4">
          <form class="mt-2" @submit.prevent="submitForm">
            <AppPasswordInput
              v-model="form.password"
              :label="$t('password')"
              placeholder="Enter password here"
              autocomplete="password"
              :disabled="loading"
              :error="errors.password"
            />
            <AppPasswordInput
              v-model="form.password_confirmation"
              :label="$t('password_confirmation')"
              placeholder="Enter password confirmation here"
              autocomplete="password"
              :disabled="loading"
              :error="errors.password_confirmation"
              class="mb-1"
            />
            <div class="md:flex md:items-center mb-3">
              <div class="md:w-3/12" />
              <div class="md:w-9/12">
                <AppButton
                  primary
                  :disabled="loading"
                  :loading="loading"
                  :text="loading ? 'Updating Password' : 'Update Password'"
                  class="w-full sm:w-auto"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import SettingsNav from '@pages/user-settings/SettingsNav.vue';
import AppPasswordInput from '@components/form/AppPasswordInput.vue';
import useProfile from '@/composables/profile';
import { useToastStore } from '@store/toast';

export default {
  name: 'PasswordPage',
  components: {
    SettingsNav,
    AppPasswordInput,
  },
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
      },
      loading: false,
      errors: {
        password: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
  },
  methods: {
    ...mapActions(useProfile, ['updatePassword']),
    ...mapActions(useToastStore, ['popToast', 'success', 'warning', 'error']),
    async submitForm() {
      if (this.validateForm()) {
        this.loading = true;
        try {
          await this.updatePassword(this.form).then((response) => {
            if (response && response == 'Success') {
              this.form.password = '';
              this.form.password_confirmation = '';
              this.success($t('pw_updated'));
            } else {
              this.error($t('pw_not_updated'));
            }
          });
          this.loading = false;
        } catch (e) {
          this.error($t('pw_not_updated'));
          this.loading = false;
        }
      } else {
        this.warning($t('pw_invalid_msg'));
      }
    },
    validateForm() {
      this.errors.password = null;
      this.errors.password_confirmation = null;
      let pass = true;
      if (this.form.password.length < 8) {
        this.errors.password = $t('pw_min_length_msg');
        pass = false;
      } else if (this.form.password.length > 200) {
        this.errors.password = $t('pw_max_length_msg');
        pass = false;
        // } else if(!/[A-Z]/.test(this.form.password)) {
        //   this.errors.password = 'Password must contain at least one uppercase letter.';
        //   pass = false;
      } else if (!(typeof this.form.password == 'string') || this.form.password instanceof String) {
        this.errors.password = $t('pw_invalid_msg');
        pass = false;
      }
      if (this.form.password != this.form.password_confirmation) {
        this.errors.password_confirmation = $t('pw_match_msg');
        pass = false;
      }
      return pass;
    },
  },
};
</script>
