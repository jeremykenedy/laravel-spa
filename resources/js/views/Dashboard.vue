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
              <span
                v-if="roles.superAdmin"
                class="mr-2 cursor-default rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800"
                >Super Admin</span
              >
              <span
                v-if="roles.admin"
                class="mr-2 cursor-default rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >Admin</span
              >
              <span
                v-if="roles.moderator"
                class="mr-2 cursor-default rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
                >Moderator</span
              >
              <span
                v-if="roles.editor"
                class="mr-2 cursor-default rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
                >Editor</span
              >
              <span
                v-if="roles.user"
                class="mr-2 cursor-default rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
                >User</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
