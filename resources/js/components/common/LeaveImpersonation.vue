<template>
  <AppButton
    v-if="authenticated && user && isImpersonating && !full"
    v-tippy="$t('return_to_your_account')"
    icon="fa-solid fa-user-secret"
    class="h-3 w-3 rounded"
    :class="classes"
    warning
    @click.prevent="triggerLeaveImpersonatingUser()"
  />
  <AppButton
    v-if="authenticated && user && isImpersonating && full"
    v-tippy="$t('return_to_your_account')"
    type="button"
    icon="fa-solid fa-user-secret"
    warning
    class="flex w-full items-center justify-center px-4 py-4"
    :class="classes"
    :text-after="$t('leave_impersonating')"
    @click.prevent="triggerLeaveImpersonatingUser()"
  />
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useAuth from '@composables/auth';
import { track } from '@services/analytics';

export default {
  name: 'LeaveImpersonation',
  props: {
    full: { type: Boolean, default: false },
    classes: { type: String, default: null },
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated', 'impersonatorToken', 'currentUserToken']),
    currentRouteName() {
      return this.$route.name;
    },
    isImpersonating() {
      if (this.currentUserToken && this.impersonatorToken) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(useAuth, ['leaveImpersonatingUser']),
    ...mapActions(useToastStore, ['error']),
    track,
    async triggerLeaveImpersonatingUser() {
      this.$emit('clicked');
      this.track('Clicked ' + this.currentRouteName + ' Leave Impersonation');
      try {
        await this.leaveImpersonatingUser().then((response) => {
          this.$router.push({ name: 'users.index' });
        });
      } catch (e) {
        this.error('An error occurred, you are still are not yourself!');
      }
    },
  },
};
</script>
