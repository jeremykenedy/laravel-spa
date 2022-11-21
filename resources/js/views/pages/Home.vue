<template>
  <div class="rounded-lg p-12 text-center">
    <div class="mb-5 flex items-center justify-between">
      <ChatBubbleLeftEllipsisIcon
        class="r-2 flex h-20 w-20 w-0 flex-1 justify-start text-indigo-400 dark:text-indigo-200"
      />
    </div>
    <h1 class="mb-5 text-4xl font-medium text-slate-700 dark:text-slate-100">
      Welcome{{ user && user.name ? ' ' + user.name : '' }}!
    </h1>
    <h4
      v-if="user && user.name"
      class="mb-5 text-2xl font-medium text-slate-700 dark:text-slate-100"
    >
      Thank you for being a member!
    </h4>
    <p class="text-2xl text-slate-500 dark:text-slate-300">
      Laravel / Vite / Vue3 / TailwindCSS
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'Home',
  components: { ChatBubbleLeftEllipsisIcon },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
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
