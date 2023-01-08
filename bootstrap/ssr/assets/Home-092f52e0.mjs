import { mapGetters as e } from 'vuex';
import { ChatBubbleLeftEllipsisIcon as t } from '@heroicons/vue/24/outline';
import {
  resolveComponent as s,
  mergeProps as r,
  useSSRContext as o,
} from 'vue';
import {
  ssrRenderAttrs as a,
  ssrRenderComponent as i,
  ssrInterpolate as m,
} from 'vue/server-renderer';
import { _ as u } from '../app2.mjs';
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
const n = {
  name: 'Home',
  components: { ChatBubbleLeftEllipsisIcon: t },
  props: {},
  setup: () => ({}),
  data: () => ({}),
  computed: {
    ...e({ authenticated: 'auth/authenticated', user: 'auth/user' }),
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
const p = n.setup;
n.setup = (e, t) => {
  const s = o();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/views/pages/Home.vue',
    ),
    p ? p(e, t) : void 0
  );
};
const l = u(n, [
  [
    'ssrRender',
    function (e, t, o, u, n, p, l, d) {
      const c = s('ChatBubbleLeftEllipsisIcon');
      t(
        `<div${a(
          r({ class: 'rounded-lg p-12 text-center' }, u),
        )}><div class="mb-5 flex items-center justify-between">`,
      ),
        t(
          i(
            c,
            {
              class:
                'r-2 flex h-20 w-20 w-0 flex-1 justify-start text-indigo-400 dark:text-indigo-200',
            },
            null,
            o,
          ),
        ),
        t(
          `</div><h1 class="mb-5 text-4xl font-medium text-slate-700 dark:text-slate-100"> Welcome${m(
            e.user && e.user.name ? ' ' + e.user.name : '',
          )}! </h1>`,
        ),
        e.user && e.user.name
          ? t(
              '<h4 class="mb-5 text-2xl font-medium text-slate-700 dark:text-slate-100"> Thank you for being a member! </h4>',
            )
          : t('\x3c!----\x3e'),
        t(
          '<p class="text-2xl text-slate-500 dark:text-slate-300"> Laravel / Vite / Vue3 / TailwindCSS </p></div>',
        );
    },
  ],
]);
export { l as default };
