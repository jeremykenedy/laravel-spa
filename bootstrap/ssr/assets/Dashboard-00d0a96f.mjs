import { mapState as e, mapGetters as r } from 'vuex';
import { R as t } from './RolesBadges-5ee6b7bc.mjs';
import { _ as s, g as a, p as o, a as d } from '../app2.mjs';
import { PowerIcon as i } from '@heroicons/vue/24/outline';
import {
  resolveComponent as l,
  resolveDirective as n,
  mergeProps as c,
  withCtx as p,
  openBlock as g,
  createBlock as u,
  createVNode as v,
  createCommentVNode as m,
  toDisplayString as h,
  Fragment as x,
  renderList as b,
  createTextVNode as y,
  useSSRContext as f,
} from 'vue';
import {
  ssrRenderAttrs as k,
  ssrInterpolate as $,
  ssrRenderComponent as w,
  ssrGetDirectiveProps as D,
  ssrRenderList as _,
  ssrRenderClass as P,
  ssrRenderStyle as R,
} from 'vue/server-renderer';
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
const j = {
  name: 'Dashboard',
  components: { RolesBadges: t, PowerIcon: i },
  data: () => ({}),
  computed: {
    ...e('auth', { user: (e) => e.user }),
    ...r({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
      logins: 'auth/logins',
    }),
    socialLoginsEnabled() {
      return !!Object.values(this.logins).find((e) => '1' == e);
    },
    allowedProviders() {
      const e = [];
      for (const r in this.logins)
        0 != this.logins[r] && '0' != this.logins[r] && e.push(r);
      return e.sort();
    },
    enabledProviders() {
      const e = [];
      return (
        this.user.providers.forEach((r, t) => {
          this.allowedProviders.find((e) => e == r.provider) && e.push(r);
        }),
        e
      );
    },
    disabledProviders() {
      let e = this.allowedProviders;
      return (
        this.user.providers.forEach((r, t) => {
          e = e.filter((e) => e != r.provider);
        }),
        e
      );
    },
  },
  methods: { greeting: a, providerIcon: o, parseDisplayDate: d },
};
const z = j.setup;
j.setup = (e, r) => {
  const t = f();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/views/pages/Dashboard.vue',
    ),
    z ? z(e, r) : void 0
  );
};
const I = s(j, [
  [
    'ssrRender',
    function (e, r, t, s, a, o, d, i) {
      const f = l('RolesBadges'),
        j = l('router-link'),
        z = l('PowerIcon'),
        I = n('tippy');
      r(
        `<div${k(
          c({ class: 'mx-auto max-w-screen-lg text-gray-900' }, s),
        )}><div class="flex justify-center"><div class="flex-1"><div class="w-auto rounded border dark:border-gray-600"><div class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200"> Dashboard </div><div class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300"><h1 class="mt-4 mb-4 text-center text-2xl">${$(
          i.greeting(),
        )}, ${$(
          e.user && e.user.name ? e.user.name : 'Registered User',
        )}! </h1>`,
      ),
        e.roles
          ? (r(
              '<div class="mb-6 text-center"><hr class="mx-auto mb-3 w-10"><h2 class="mb-5">Your Roles</h2>',
            ),
            r(w(f, { roles: e.roles }, null, t)),
            r('</div>'))
          : r('\x3c!----\x3e'),
        i.socialLoginsEnabled
          ? (r('<div>'),
            r(
              w(
                j,
                c(
                  { to: { name: 'account' } },
                  D(e, I, 'Go to application service providers'),
                ),
                {
                  default: p((r, t, s, a) => {
                    if (!t)
                      return [
                        0 == e.user.providers.length
                          ? (g(),
                            u(
                              'div',
                              {
                                key: 0,
                                class:
                                  'rounded-lg bg-slate-100 p-10 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-slate-200 hover:text-gray-800 dark:bg-slate-900 hover:dark:bg-slate-700 hover:dark:text-white',
                              },
                              [
                                v('div', null, [
                                  v(z, {
                                    class: 'ml-auto mr-auto mb-4 h-12 w-12',
                                  }),
                                ]),
                                v(
                                  'h2',
                                  { class: 'text-lg' },
                                  ' No applications are integrated into your account. ',
                                ),
                              ],
                            ))
                          : m('', !0),
                        e.user.providers.length > 0
                          ? (g(),
                            u('div', { key: 1 }, [
                              v('hr', { class: 'mx-auto mb-3 w-10' }),
                              v(
                                'h3',
                                { class: 'mb-5 text-center' },
                                h(e.user.providers.length) +
                                  ' Application ' +
                                  h(1 != e.user.providers.length ? 's' : '') +
                                  ' integrated into your account ',
                                1,
                              ),
                              v(
                                'div',
                                {
                                  class:
                                    'grid grid-cols-2 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
                                },
                                [
                                  (g(!0),
                                  u(
                                    x,
                                    null,
                                    b(
                                      i.enabledProviders,
                                      (e, r) => (
                                        g(),
                                        u(
                                          'div',
                                          {
                                            key: e + '_' + r,
                                            class:
                                              'mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-900 hover:dark:bg-slate-700',
                                          },
                                          [
                                            v(
                                              'div',
                                              {
                                                class:
                                                  'flex flex-col items-center pt-4 pb-4 pl-2 pr-2',
                                              },
                                              [
                                                v(
                                                  'span',
                                                  {
                                                    class: [
                                                      'fa-4x mb-2',
                                                      i.providerIcon(
                                                        e.provider,
                                                      ),
                                                    ],
                                                  },
                                                  null,
                                                  2,
                                                ),
                                                v(
                                                  'h5',
                                                  {
                                                    class:
                                                      'mb-0 text-lg font-extrabold capitalize text-gray-900 dark:text-white',
                                                  },
                                                  h(e.provider),
                                                  1,
                                                ),
                                                e.created_at
                                                  ? (g(),
                                                    u(
                                                      'div',
                                                      {
                                                        key: 0,
                                                        class:
                                                          'mb-1 mb-3 text-gray-600 dark:text-gray-400',
                                                        style: {
                                                          'line-height': '1.2',
                                                          'font-size': '0.6em',
                                                        },
                                                      },
                                                      [
                                                        v(
                                                          'span',
                                                          {
                                                            class:
                                                              'font-bold uppercase text-gray-700 dark:text-gray-200',
                                                          },
                                                          [
                                                            v('span', {
                                                              class:
                                                                'far fa-clock',
                                                            }),
                                                            y(' First Used: '),
                                                          ],
                                                        ),
                                                        v('br'),
                                                        y(
                                                          ' ' +
                                                            h(
                                                              i.parseDisplayDate(
                                                                e.created_at,
                                                              ),
                                                            ),
                                                          1,
                                                        ),
                                                      ],
                                                    ))
                                                  : m('', !0),
                                                e.updated_at
                                                  ? (g(),
                                                    u(
                                                      'div',
                                                      {
                                                        key: 1,
                                                        class:
                                                          'mb-0 text-gray-600 dark:text-gray-400',
                                                        style: {
                                                          'line-height': '1.2',
                                                          'font-size': '0.6em',
                                                        },
                                                      },
                                                      [
                                                        v(
                                                          'span',
                                                          {
                                                            class:
                                                              'font-bold uppercase text-gray-700 dark:text-gray-200',
                                                          },
                                                          [
                                                            v('span', {
                                                              class:
                                                                'far fa-clock',
                                                            }),
                                                            y(' Last Used: '),
                                                          ],
                                                        ),
                                                        v('br'),
                                                        y(
                                                          ' ' +
                                                            h(
                                                              i.parseDisplayDate(
                                                                e.updated_at,
                                                              ),
                                                            ),
                                                          1,
                                                        ),
                                                      ],
                                                    ))
                                                  : m('', !0),
                                              ],
                                            ),
                                          ],
                                        )
                                      ),
                                    ),
                                    128,
                                  )),
                                ],
                              ),
                            ]))
                          : m('', !0),
                      ];
                    0 == e.user.providers.length
                      ? (t(
                          `<div class="rounded-lg bg-slate-100 p-10 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-slate-200 hover:text-gray-800 dark:bg-slate-900 hover:dark:bg-slate-700 hover:dark:text-white"${a}><div${a}>`,
                        ),
                        t(
                          w(
                            z,
                            { class: 'ml-auto mr-auto mb-4 h-12 w-12' },
                            null,
                            s,
                            a,
                          ),
                        ),
                        t(
                          `</div><h2 class="text-lg"${a}> No applications are integrated into your account. </h2></div>`,
                        ))
                      : t('\x3c!----\x3e'),
                      e.user.providers.length > 0
                        ? (t(
                            `<div${a}><hr class="mx-auto mb-3 w-10"${a}><h3 class="mb-5 text-center"${a}>${$(
                              e.user.providers.length,
                            )} Application ${$(
                              1 != e.user.providers.length ? 's' : '',
                            )} integrated into your account </h3><div class="grid grid-cols-2 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"${a}>\x3c!--[--\x3e`,
                          ),
                          _(i.enabledProviders, (e, r) => {
                            t(
                              `<div class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-900 hover:dark:bg-slate-700"${a}><div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2"${a}><span class="${P(
                                [i.providerIcon(e.provider), 'fa-4x mb-2'],
                              )}"${a}></span><h5 class="mb-0 text-lg font-extrabold capitalize text-gray-900 dark:text-white"${a}>${$(
                                e.provider,
                              )}</h5>`,
                            ),
                              e.created_at
                                ? t(
                                    `<div class="mb-1 mb-3 text-gray-600 dark:text-gray-400" style="${R(
                                      {
                                        'line-height': '1.2',
                                        'font-size': '0.6em',
                                      },
                                    )}"${a}><span class="font-bold uppercase text-gray-700 dark:text-gray-200"${a}><span class="far fa-clock"${a}></span> First Used: </span><br${a}> ${$(
                                      i.parseDisplayDate(e.created_at),
                                    )}</div>`,
                                  )
                                : t('\x3c!----\x3e'),
                              e.updated_at
                                ? t(
                                    `<div class="mb-0 text-gray-600 dark:text-gray-400" style="${R(
                                      {
                                        'line-height': '1.2',
                                        'font-size': '0.6em',
                                      },
                                    )}"${a}><span class="font-bold uppercase text-gray-700 dark:text-gray-200"${a}><span class="far fa-clock"${a}></span> Last Used: </span><br${a}> ${$(
                                      i.parseDisplayDate(e.updated_at),
                                    )}</div>`,
                                  )
                                : t('\x3c!----\x3e'),
                              t('</div></div>');
                          }),
                          t('\x3c!--]--\x3e</div></div>'))
                        : t('\x3c!----\x3e');
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            r('</div>'))
          : r('\x3c!----\x3e'),
        r('</div></div></div></div></div>');
    },
  ],
]);
export { I as default };
