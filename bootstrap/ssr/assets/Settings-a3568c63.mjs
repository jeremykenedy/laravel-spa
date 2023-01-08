import {
  CogIcon as e,
  UserIcon as r,
  KeyIcon as t,
} from '@heroicons/vue/24/outline';
import { _ as s, t as o } from '../app2.mjs';
import {
  resolveComponent as a,
  mergeProps as i,
  withCtx as l,
  createVNode as d,
  createTextVNode as c,
  useSSRContext as m,
} from 'vue';
import {
  ssrRenderAttrs as n,
  ssrRenderComponent as u,
} from 'vue/server-renderer';
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
  components: { CogIcon: e, UserIcon: r, KeyIcon: t },
  methods: { track: o },
};
const p = v.setup;
v.setup = (e, r) => {
  const t = m();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/views/pages/settings/Settings.vue',
    ),
    p ? p(e, r) : void 0
  );
};
const b = s(v, [
  [
    'ssrRender',
    function (e, r, t, s, o, m, v, p) {
      const b = a('router-link'),
        g = a('CogIcon'),
        f = a('UserIcon'),
        h = a('KeyIcon'),
        w = a('router-view');
      r(
        `<div${n(
          i(
            {
              class:
                'mx-auto max-w-screen-lg text-gray-900 dark:text-gray-100 md:flex md:flex-row md:items-start md:justify-between',
            },
            s,
          ),
        )}><div class="mr-0 mb-6 w-full rounded-md border dark:border-gray-500 dark:bg-slate-800 md:mb-0 md:mr-6 md:w-4/12"><div class="border-b p-4 font-semibold dark:border-gray-500"> Settings </div><div class="flex flex-col rounded-md bg-white dark:bg-slate-800">`,
      ),
        r(
          u(
            b,
            {
              to: { name: 'account' },
              class:
                'flex items-center border-b p-4 hover:bg-slate-800 hover:text-white dark:border-gray-600 dark:hover:bg-slate-900',
              'active-class': 'text-white bg-slate-600',
              onClick: (e) => p.track('clicked tab: Account'),
            },
            {
              default: l((e, r, t, s) => {
                if (!r)
                  return [d(g, { class: 'mr-3 h-5 w-5' }), c(' Account ')];
                r(u(g, { class: 'mr-3 h-5 w-5' }, null, t, s)), r(' Account ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r(
          u(
            b,
            {
              to: { name: 'profile' },
              class:
                'flex items-center border-b p-4 hover:bg-slate-800 hover:text-white dark:border-gray-600 dark:hover:bg-slate-900',
              'active-class': 'text-white bg-slate-600',
              onClick: (e) => p.track('clicked tab: Profile'),
            },
            {
              default: l((e, r, t, s) => {
                if (!r)
                  return [d(f, { class: 'mr-3 h-5 w-5' }), c(' Profile ')];
                r(u(f, { class: 'mr-3 h-5 w-5' }, null, t, s)), r(' Profile ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r(
          u(
            b,
            {
              to: { name: 'password' },
              class:
                'flex items-center rounded-b-md p-4 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-900',
              'active-class': 'text-white bg-slate-600',
              onClick: (e) => p.track('clicked tab: Password'),
            },
            {
              default: l((e, r, t, s) => {
                if (!r)
                  return [d(h, { class: 'mr-3 h-5 w-5' }), c(' Password ')];
                r(u(h, { class: 'mr-3 h-5 w-5' }, null, t, s)), r(' Password ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r(
          '</div></div><div class="none w-full rounded-md border dark:border-gray-500">',
        ),
        r(u(w, null, null, t)),
        r('</div></div>');
    },
  ],
]);
export { b as default };
