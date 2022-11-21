<template>
  <div class="mx-auto max-w-screen-lg text-gray-900">
    <div class="flex justify-center">
      <div class="flex-1">
        <div class="w-auto rounded border dark:border-gray-600">
          <div
            class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200"
          >
            Dashboard
          </div>
          <div
            class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300"
          >
            <h1 class="mt-4 mb-4 text-center text-2xl">
              {{ greeting }},
              {{ user && user.name ? user.name : 'Registered User' }}!
            </h1>
            <div v-if="roles" class="mb-6 text-center">
              <hr class="mx-auto mb-3 w-10" />
              <h2 class="mb-5">Your Roles</h2>
              <RolesBadges :roles="roles" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RolesBadges from '@components/roles/RolesBadges.vue';

export default {
  name: 'Dashboard',
  components: {
    RolesBadges,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    greeting() {
      const date = new Date();
      const currentTime = date.getHours();
      let greeting;
      if (currentTime >= 0 && currentTime <= 12) {
        greeting = 'Good Morning';
      } else if (currentTime > 12 && currentTime <= 18) {
        greeting = 'Good Afternoon';
      } else {
        greeting = 'Good Evening';
      }
      return greeting;
    },
  },
};
</script>
