import {
  BoltIcon as e,
  ChatBubbleBottomCenterTextIcon as t,
  GlobeAltIcon as i,
  ScaleIcon as a,
  InformationCircleIcon as o,
} from '@heroicons/vue/24/outline';
import {
  resolveComponent as r,
  mergeProps as s,
  createVNode as n,
  resolveDynamicComponent as l,
  useSSRContext as d,
} from 'vue';
import {
  ssrRenderAttrs as c,
  ssrRenderComponent as m,
  ssrRenderList as p,
  ssrRenderVNode as u,
  ssrInterpolate as x,
} from 'vue/server-renderer';
import { _ as g } from '../app2.mjs';
import 'vuex';
import 'moment';
import '@headlessui/vue';
import 'vue-router';
import 'vue-gtag-next';
import 'vuex-shared-mutations';
import 'axios';
import 'js-cookie';
import 'vuex-persistedstate';
import 'vue-sweetalert2';
import 'vue-tippy';
import 'v-tables-3';
import '@sentry/vue';
import '@sentry/tracing';
import 'vue-html-secure';
const v = {
  name: 'About',
  components: {
    BoltIcon: e,
    ChatBubbleBottomCenterTextIcon: t,
    GlobeAltIcon: i,
    ScaleIcon: a,
    InformationCircleIcon: o,
  },
  props: {},
  data: () => ({
    features: [
      {
        name: 'Vue 3',
        description:
          'Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
        icon: i,
      },
      {
        name: 'Tailwind CSS',
        description:
          "Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable — with zero-runtime.",
        icon: a,
      },
      {
        name: 'Socialite',
        description:
          'Laravel Socialite provides an expressive, fluent interface to OAuth authentication with Facebook, Twitter, Google, LinkedIn, GitHub, GitLab and Bitbucket. It handles almost all of the boilerplate social authentication code you are dreading writing.',
        icon: e,
      },
      {
        name: 'Laravel 9',
        description:
          'Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.Laravel is a web application framework with expressive, elegant syntax.',
        icon: t,
      },
    ],
  }),
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
const f = v.setup;
v.setup = (e, t) => {
  const i = d();
  return (
    (i.modules || (i.modules = new Set())).add(
      'resources/js/views/pages/About.vue',
    ),
    f ? f(e, t) : void 0
  );
};
const h = g(v, [
  [
    'ssrRender',
    function (e, t, i, a, o, d, g, v) {
      const f = r('InformationCircleIcon');
      t(
        `<div${c(
          s({ class: 'py-12' }, a),
        )}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="lg:text-center"><div class="mb-5 flex items-center justify-between">`,
      ),
        t(
          m(
            f,
            {
              class:
                'r-2 flex h-20 w-20 w-0 flex-1 justify-start text-indigo-400 dark:text-indigo-200',
            },
            null,
            i,
          ),
        ),
        t(
          '</div><h2 class="text-lg font-semibold text-indigo-600 dark:text-gray-100"> Vue Tailwind CSS </h2><p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"> A better way to single page app </p><p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto"> A Laravel 9, Vite 3, Vue 3 SPA (w/ Vue Router), Tailwind CSS (w/ Forms Plugin &amp; Aspect Ratio Plugin), Axios, Headless UI, Heroicons, eslint, &amp; TypeScript starter template. </p></div><div class="mt-10"><dl class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">\x3c!--[--\x3e',
        ),
        p(g.features, (e) => {
          t(
            '<div class="relative"><dt><div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">',
          ),
            u(
              t,
              n(l(e.icon), { class: 'h-6 w-6', 'aria-hidden': 'true' }, null),
              i,
            ),
            t(
              `</div><p class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">${x(
                e.name,
              )}</p></dt><dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">${x(
                e.description,
              )}</dd></div>`,
            );
        }),
        t('\x3c!--]--\x3e</dl></div></div></div>');
    },
  ],
]);
export { h as default };
