<template>
  <div id="main-body" class="leading-normal tracking-normal">
    <div class="flex flex-wrap">
      <AdminSidebar :class="fullScreenSideBarOpenGetter ? '' : 'lg:hidden'" />
      <div
        id="main-content"
        class="min-h-screen w-full bg-white pl-0 dark:bg-slate-800"
        :class="(sideBarOpenGetter ? 'overlay ' : ' ') + (fullScreenSideBarOpenGetter ? 'lg:pl-64' : '')"
      >
        <AdminNavbar />
        <div class="mb-20 bg-white dark:bg-slate-800">
          <Suspense>
            <router-view />
          </Suspense>
        </div>
        <AppFooter
          class="sticky top-[100vh] w-full"
          footer-class="border-slate-900/5 dark:border-slate-700"
          border-class=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useSideBarStore } from '@store/sidebar';
import AdminNavbar from '@components/includes/AdminNavbar.vue';
import AdminSidebar from '@components/includes/AdminSidebar.vue';
import AppFooter from '@components/includes/AppFooter.vue';

export default {
  components: {
    AdminNavbar,
    AdminSidebar,
    AppFooter,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    ...mapState(useSideBarStore, ['sideBarOpenGetter', 'fullScreenSideBarOpenGetter']),
  },
};
</script>
