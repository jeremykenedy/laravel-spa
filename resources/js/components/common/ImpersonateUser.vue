<template>
  <AppButton
    v-if="authenticated && user && (userIs('superadmin') || userCan('impersonate.users'))"
    v-tippy="$t('impersonate_user')"
    secondary
    :disabled="disabled || loading"
    :loading="loading"
    class="mr-2 px-1 py-1 text-sm"
    :class="classes"
    @click.prevent="triggerImpersonateUser()"
  >
    <template #text>
      <UserCircleIcon v-if="!loading" class="ml-2 mr-2 mt-0 h-4 w-4" />
      <CircleSvg v-if="loading" class="mr-2 h-3 w-3" />
      <span class="sr-only">{{ $t('impersonate_user') }}</span>
    </template>
  </AppButton>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import useAuth from '@composables/auth';
import { track } from '@services/analytics';
import CircleSvg from '@components/common/CircleSvg.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'ImpersonateUser',
  components: {
    CircleSvg,
    UserCircleIcon,
  },
  props: {
    person: { type: Object },
    classes: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
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
    ...mapActions(useAuth, ['impersonateUser']),
    ...mapActions(useToastStore, ['error']),
    ...mapActions(useAuthStore, ['userIs', 'userCan', 'getUser']),
    track,
    async triggerImpersonateUser() {
      this.$emit('clicked');
      this.track('Clicked ' + this.currentRouteName + ' Impersonate User');
      try {
        await this.impersonateUser({ user: this.person }).then((response) => {
          this.$router.push({ name: 'dashboard' });
        });
      } catch (e) {
        this.error('An error occurred, you are still are not yourself!');
      }
    },
  },
};
</script>
