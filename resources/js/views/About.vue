<template>
  <div class="py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <div class="mb-5 flex items-center justify-between">
          <InformationCircleIcon
            class="r-2 flex h-20 w-20 w-0 flex-1 justify-start text-indigo-400 dark:text-indigo-200"
          />
        </div>

        <h2 class="text-lg font-semibold text-indigo-600 dark:text-gray-100">
          Vue Tailwind CSS
        </h2>
        <p
          class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
        >
          A better way to single page app
        </p>
        <p
          class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto"
        >
          A Laravel 9, Vite 3, Vue 3 SPA (w/ Vue Router), Tailwind CSS (w/ Forms
          Plugin & Aspect Ratio Plugin), Axios, Headless UI, Heroicons, eslint,
          &amp; TypeScript starter template.
        </p>
      </div>

      <div class="mt-10">
        <dl
          class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0"
        >
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div
                class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white"
              >
                <component
                  :is="feature.icon"
                  class="h-6 w-6"
                  aria-hidden="true"
                />
              </div>
              <p
                class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                {{ feature.name }}
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'About',
  components: {
    BoltIcon,
    ChatBubbleBottomCenterTextIcon,
    GlobeAltIcon,
    ScaleIcon,
    InformationCircleIcon,
  },
  props: {},
  data() {
    return {
      features: [
        {
          name: 'Vue 3',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: GlobeAltIcon,
        },
        {
          name: 'Tailwind CSS',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: ScaleIcon,
        },
        {
          name: 'Vite 3',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: BoltIcon,
        },
        {
          name: 'Laravel 9',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: ChatBubbleBottomCenterTextIcon,
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>

<style lang="scss" scoped></style>
