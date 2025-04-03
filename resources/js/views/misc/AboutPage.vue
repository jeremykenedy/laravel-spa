<template>
  <div class="py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <div class="mb-5 flex items-center justify-between">
          <InformationCircleIcon
            class="r-2 flex h-20 w-20 w-0 flex-1 justify-start text-indigo-400 dark:text-indigo-200"
          />
        </div>
        <h2 class="text-lg font-semibold text-indigo-600 dark:text-gray-100">Vue Tailwind CSS</h2>
        <p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          A better way to single page app
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
          A Laravel, Vite, Vue SPA (w/ Vue Router), Tailwind CSS (w/ Forms Plugin & Aspect Ratio Plugin), Axios,
          Headless UI, Heroicons, eslint, &amp; TypeScript starter template.
        </p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
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
  CircleStackIcon,
  ShieldCheckIcon,
  ScaleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'AboutPage',
  components: {
    BoltIcon,
    ChatBubbleBottomCenterTextIcon,
    CircleStackIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    ScaleIcon,
    InformationCircleIcon,
  },
  props: {},
  data() {
    return {
      features: [
        {
          name: 'Laravel',
          description:
            'Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.Laravel is a web application framework with expressive, elegant syntax.',
          icon: ChatBubbleBottomCenterTextIcon,
        },
        {
          name: 'Vue',
          description:
            'Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
          icon: GlobeAltIcon,
        },
        {
          name: 'Tailwind CSS',
          description:
            "Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable — with zero-runtime.",
          icon: ScaleIcon,
        },
        {
          name: 'Socialite',
          description:
            'Laravel Socialite provides an expressive, fluent interface to OAuth authentication with Facebook, Twitter, Google, LinkedIn, GitHub, GitLab and Bitbucket. It handles almost all of the boilerplate social authentication code you are dreading writing.',
          icon: BoltIcon,
        },
        {
          name: 'Pinia',
          description:
            'The intuitive store for Vue.js. Type Safe, Extensible, and Modular by design. Forget you are even using a store. Stores are as familiar as components. API designed to let you write well organized stores.',
          icon: CircleStackIcon,
        },
        {
          name: 'Heroicons',
          description: 'Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.',
          icon: ShieldCheckIcon,
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
