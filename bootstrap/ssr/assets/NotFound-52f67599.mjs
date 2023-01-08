import { mapGetters as e } from 'vuex';
import {
  resolveComponent as t,
  mergeProps as o,
  withCtx as r,
  createVNode as s,
  useSSRContext as u,
} from 'vue';
import {
  ssrRenderAttrs as a,
  ssrRenderComponent as i,
} from 'vue/server-renderer';
import { _ as p } from '../app2.mjs';
import 'moment';
import '@headlessui/vue';
import '@heroicons/vue/24/outline';
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
const d = {
  name: 'NotFound',
  components: {},
  props: {},
  setup: () => ({}),
  data: () => ({}),
  computed: {
    ...e({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    (document.getElementById('plugs').src = '/build/assets/plugs-12bd3189.png'),
      (document.getElementById('fourZeroFour').src =
        '/build/assets/404-508db666.png');
  },
  beforeUnmount() {},
  updated() {},
  methods: {},
};
const l = d.setup;
d.setup = (e, t) => {
  const o = u();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/views/pages/NotFound.vue',
    ),
    l ? l(e, t) : void 0
  );
};
const m = p(d, [
  [
    'ssrRender',
    function (e, u, p, d, l, m, n, v) {
      const c = t('router-link'),
        g = t('AppButton');
      u(
        `<div${a(
          o(
            {
              class:
                'flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 dark:bg-white md:gap-28 md:py-20 md:px-44 lg:flex-row lg:px-24 lg:py-24',
            },
            d,
          ),
        )}><div class="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24"><div class="relative"><div class="absolute"><div class=""><h1 class="my-2 text-2xl font-bold text-gray-800"> Looks like you&#39;ve found the doorway to the great nothing </h1><p class="my-7 text-gray-800"> Sorry about that! Please visit our hompage to get where you need to go. </p>`,
      ),
        u(
          i(
            c,
            { to: e.authenticated ? { name: 'dashboard' } : { name: 'home' } },
            {
              default: r((e, t, o, r) => {
                if (!t)
                  return [
                    s(g, {
                      primary: '',
                      text: 'Take me there!',
                      class: 'py-4 px-8 sm:w-full lg:w-auto',
                    }),
                  ];
                t(
                  i(
                    g,
                    {
                      primary: '',
                      text: 'Take me there!',
                      class: 'py-4 px-8 sm:w-full lg:w-auto',
                    },
                    null,
                    o,
                    r,
                  ),
                );
              }),
              _: 1,
            },
            p,
          ),
        ),
        u(
          '</div></div><div><img id="fourZeroFour" alt="404"></div></div></div><div><img id="plugs" alt="plugs"></div></div>',
        );
    },
  ],
]);
export { m as default };
