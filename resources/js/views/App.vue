<template>
  <div class="min-h-screen bg-white dark:bg-slate-800">
    <VerifyNotice
      v-if="
        $route.name !== 'home' &&
        authenticated &&
        user &&
        user.id &&
        !user.email_verified_at
      "
      :id="user.id"
    />
    <AppNav />
    <div class="w-full">
      <router-view v-slot="{ Component }" class="p-6">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <AppFooter class="sticky top-[100vh] w-full" />
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
