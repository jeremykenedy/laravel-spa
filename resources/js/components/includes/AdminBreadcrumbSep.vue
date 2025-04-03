<template>
  <li class="flex items-center">
    <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
  </li>
</template>

<script>
import { track } from '@services/analytics';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'AdminBreadcrumbSep',
  components: {
    ChevronRightIcon,
  },
};
</script>
