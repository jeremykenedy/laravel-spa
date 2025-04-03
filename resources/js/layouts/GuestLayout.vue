<template>
  <div class="min-h-screen bg-white dark:bg-slate-800">
    <div id="top_border" />
    <OctoCat v-if="showOctoCat" position="right-top" animated-eye animated-ear animated-arm show-face />
    <Navbar />
    <div class="w-full">
      <router-view v-slot="{ Component }" class="p-6">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@components/includes/AppNav.vue';
import OctoCat from '@components/plugs/OctoCat.vue';

export default {
  components: {
    Navbar,
    OctoCat,
  },
  computed: {
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
        this.currentRouteName == 'app-settings' ||
        this.currentRouteName == 'phpinfo'
      ) {
        return true;
      }
      return false;
    },
    showOctoCat() {
      if (this.currentRouteName == 'home' || this.currentRouteName == 'about' || this.currentRouteName == 'terms') {
        return true;
      }
      return false;
    },
  },
};
</script>
