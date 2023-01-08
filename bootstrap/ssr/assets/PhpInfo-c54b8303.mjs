import e from 'axios';
import { ChevronRightIcon as t } from '@heroicons/vue/24/outline';
import { mapGetters as r, mapActions as a } from 'vuex';
import {
  resolveComponent as s,
  resolveDirective as o,
  mergeProps as i,
  withCtx as n,
  createTextVNode as d,
  createVNode as l,
  useSSRContext as m,
} from 'vue';
import {
  ssrRenderAttrs as p,
  ssrRenderComponent as c,
  ssrRenderClass as u,
  ssrGetDirectiveProps as v,
} from 'vue/server-renderer';
import { _ as h } from '../app2.mjs';
import 'moment';
import '@headlessui/vue';
import 'vue-router';
import 'vue-gtag-next';
import 'vuex-shared-mutations';
import 'js-cookie';
import 'vuex-persistedstate';
import 'vue-sweetalert2';
import 'vue-tippy';
import 'v-tables-3';
import '@sentry/vue';
import '@sentry/tracing';
import 'vue-html-secure';
const x = {
  name: 'PhpInfo',
  components: { ChevronRightIcon: t },
  data: () => ({ dataReady: !1, info: null }),
  computed: {
    ...r({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  mounted() {
    this.getServerInfo();
  },
  methods: {
    ...a({ popToast: 'toast/popToast' }),
    async getServerInfo() {
      (this.dataReady = !1),
        await e
          .get('/api/server-info')
          .then(({ data: e }) => {
            (this.info = e.info), (this.dataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Server Information',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          });
    },
  },
};
const f = x.setup;
x.setup = (e, t) => {
  const r = m();
  return (
    (r.modules || (r.modules = new Set())).add(
      'resources/js/views/admin/PhpInfo.vue',
    ),
    f ? f(e, t) : void 0
  );
};
const g = h(x, [
  [
    'ssrRender',
    function (e, t, r, a, m, h, x, f) {
      const g = s('router-link'),
        y = s('ChevronRightIcon'),
        k = o('html-safe');
      t(
        `<div${p(
          i({ class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200' }, a),
        )}><nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb"><ol class="inline-flex list-none p-0"><li class="flex items-center">`,
      ),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              c(
                g,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: n(({ isActive: e }, t, r, a) => {
                    if (!t) return [d(' Admin ')];
                    t(' Admin ');
                  }),
                  _: 1,
                },
                r,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li><li class="flex items-center">'),
        t(c(y, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, r)),
        t('</li><li class="flex items-center">'),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              c(
                g,
                {
                  to: { name: 'phpinfo' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: n(({ isActive: e }, t, r, a) => {
                    if (!t)
                      return [
                        l(
                          'span',
                          {
                            class: [
                              e &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' Server Info ',
                          2,
                        ),
                      ];
                    t(
                      `<span class="${u([
                        e &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}"${a}> Server Info </span>`,
                    );
                  }),
                  _: 1,
                },
                r,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li></ol></nav>'),
        x.dataReady
          ? t('\x3c!----\x3e')
          : t(
              '<div><div class="text-gray-700 dark:text-gray-100"><div class="pt-10 pb-10 text-center"><span class="fa fa-circle-notch fa-spin fa-5x"></span></div></div></div>',
            ),
        x.dataReady
          ? t(`<div class="php-info"><div${p(v(e, k, x.info))}></div></div>`)
          : t('\x3c!----\x3e'),
        t('</div>');
    },
  ],
]);
export { g as default };
