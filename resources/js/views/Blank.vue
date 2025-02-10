<template>
    <div>
        <h1>
            {{ blank }}
        </h1>
    </div>
</template>

<script>

import { watch, ref, watchEffect } from 'vue'
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from "@store/auth";
import useAuth from '@composables/auth'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { track } from '@services/analytics';

export default {
  name: 'Blank',
  components: {
    ArrowRightOnRectangleIcon
  },
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
    ...mapState(useAuth, [
      'processing',
      'getAbilities',
    ]),
    ...mapState(useAuthStore, [
      'user',
      'authenticated',
    ]),
  },
  watch: {},
  created() { },
  mounted() { },
  beforeUnmount() { },
  updated() { },
  methods: {
    ...mapActions(useAuth, [
      'logout',
    ]),
    clickButton() {
      this.$emit('buttonClicked');
    },
    track,
  },
};
</script>

<style scoped>
:deep() .text-white {
  color: #ffffff !important;
}
</style>
<style lang="scss" scoped>
</style>
