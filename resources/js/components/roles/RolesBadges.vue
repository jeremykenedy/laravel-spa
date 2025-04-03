<template>
  <div v-if="roles">
    <span
      v-for="(role, index) in roles"
      :key="role.id"
      :value="role"
      class="mr-2 cursor-default rounded px-2.5 py-0.5 text-xs font-medium"
      :class="badgeClass(role, index)"
    >
      {{ role.name }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RolesBadges',
  props: {
    roles: { type: Object, required: true },
  },
  methods: {
    badgeClass(role, index) {
      if (role.slug == 'superadmin') {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
      } else if (role.slug == 'admin') {
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      } else if (role.slug == 'moderator') {
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
      } else if (role.slug == 'editor') {
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      } else if (role.slug == 'user') {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
      }
      return 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200';
    },
  },
};
</script>
