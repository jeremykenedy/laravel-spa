<template>
  <div class="min-h-screen bg-white dark:bg-slate-800">
    <div id="top_border" />
    <OctoCat v-if="showOctoCat" />
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
import { mapGetters, mapActions } from 'vuex';
import AppNav from '@components/AppNav.vue';
import AppFooter from '@components/AppFooter.vue';
import VerifyNotice from '@components/VerifyNotice.vue';
import OctoCat from '@components/OctoCat.vue';

export default {
  components: {
    AppNav,
    VerifyNotice,
    AppFooter,
    OctoCat,
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
        this.currentRouteName == 'permissions' ||
        this.currentRouteName == 'settings' ||
        this.currentRouteName == 'users' ||
        this.currentRouteName == 'app-settings'
      ) {
        return true;
      }
      return false;
    },
    showOctoCat() {
      if (
        this.currentRouteName == 'home' ||
        this.currentRouteName == 'about' ||
        this.currentRouteName == 'terms'
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
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
