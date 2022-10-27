<template>
  <div class="min-h-screen bg-white dark:bg-slate-800">
    <div id="top_border" />
    <VerifyNotice
      v-if="
        $route.name !== 'home' &&
        $route.name !== 'verify-email' &&
        authenticated &&
        user &&
        user.id &&
        !user.email_verified_at &&
        !isAdminPage
      "
      :id="user.id"
    />
    <AppNav v-if="!isAdminPage" />
    <div class="w-full">
      <router-view v-slot="{ Component }" :class="isAdminPage ? '' : 'p-6'">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <AppFooter v-if="!isAdminPage" class="sticky top-[100vh] w-full" />
    <AppToast />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppNav from '@components/AppNav.vue';
import AppFooter from '@components/AppFooter.vue';
import AppToast from '@components/AppToast.vue';
import VerifyNotice from '@components/VerifyNotice.vue';

export default {
  components: {
    AppNav,
    VerifyNotice,
    AppFooter,
    AppToast,
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
    currentRouteName() {
      return this.$route.name;
    },
    isAdminPage() {
      if (
        this.currentRouteName == 'admin' ||
        this.currentRouteName == 'roles' ||
        this.currentRouteName == 'settings' ||
        this.currentRouteName == 'users' ||
        this.currentRouteName == 'app-settings'
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
