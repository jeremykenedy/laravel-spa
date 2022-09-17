<template>
  <footer class="max-w-container mx-auto mt-32 w-full px-4 sm:px-6 lg:px-8">
    <div class="border-t border-slate-900/5 py-4 dark:border-slate-700">
      <p
        class="text-center text-sm leading-6 text-slate-500 dark:text-gray-300"
      >
        &copy; {{ theYear }} {{ company }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  components: {},
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      company: 'Jeremy Edgar Kenedy',
    };
  },
  computed: {
    theYear() {
      const startYear = '2022';
      const currentYear = new Date().getFullYear();
      if (currentYear == startYear) {
        return currentYear;
      }
      return startYear + '-' + currentYear;
    },
  },
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
