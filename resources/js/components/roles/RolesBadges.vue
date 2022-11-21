<template>
  <div v-if="roles">
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
</template>

<script lang="ts">
export default {
  name: 'RolesBadges',
  components: {},
  props: {
    roles: { type: Object, required: true },
  },
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
