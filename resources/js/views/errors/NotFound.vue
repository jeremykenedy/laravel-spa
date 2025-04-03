<template>
  <div
    class="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 dark:bg-white md:gap-28 md:py-20 md:px-44 lg:flex-row lg:px-24 lg:py-24"
  >
    <div class="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
      <div class="relative">
        <div class="absolute">
          <div class="">
            <h1 class="my-2 text-2xl font-bold text-gray-800">
              Looks like you've found the doorway to the great nothing
            </h1>
            <p class="my-7 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
            <router-link :to="authenticated ? { name: 'dashboard' } : { name: 'home' }">
              <AppButton
                primary
                :text="authenticated ? 'Go to Dashboard' : 'Go Home'"
                class="py-4 px-8 sm:w-full lg:w-auto"
              />
            </router-link>
          </div>
        </div>
        <div>
          <img id="fourZeroFour" alt="404" />
        </div>
      </div>
    </div>
    <div>
      <img id="plugs" alt="plugs" />
    </div>
  </div>
</template>

<script lang="ts">
import fourZeroFour from '@img/404.png';
import plugs from '@img/plugs.png';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/store/auth';

export default {
  name: 'NotFound',
  components: {},
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
    ...mapState(useAuthStore, ['user', 'authenticated']),
  },
  watch: {},
  created() {},
  mounted() {
    document.getElementById('plugs').src = plugs;
    document.getElementById('fourZeroFour').src = fourZeroFour;
  },
  beforeUnmount() {},
  updated() {},
  methods: {},
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
