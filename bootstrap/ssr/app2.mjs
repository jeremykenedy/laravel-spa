import {
  resolveComponent as e,
  resolveDirective as t,
  mergeProps as a,
  withCtx as r,
  createVNode as s,
  toDisplayString as o,
  openBlock as n,
  createBlock as i,
  createCommentVNode as l,
  createTextVNode as d,
  withModifiers as c,
  withDirectives as u,
  vShow as p,
  Transition as m,
  useSSRContext as g,
  resolveDynamicComponent as h,
  defineAsyncComponent as x,
  createApp as f,
} from 'vue';
import { mapGetters as y, mapActions as v, createStore as k } from 'vuex';
import b from 'moment';
import {
  Popover as w,
  PopoverButton as C,
  PopoverGroup as T,
  PopoverPanel as _,
  Switch as A,
} from '@headlessui/vue';
import {
  HomeIcon as S,
  BuildingLibraryIcon as $,
  InformationCircleIcon as E,
  DocumentTextIcon as O,
  Bars3Icon as B,
  XMarkIcon as L,
  CogIcon as j,
  ArrowLeftOnRectangleIcon as N,
  ChevronDownIcon as U,
  UserCircleIcon as R,
} from '@heroicons/vue/24/outline';
import {
  ssrRenderComponent as I,
  ssrInterpolate as D,
  ssrRenderClass as P,
  ssrGetDirectiveProps as M,
  ssrRenderAttrs as G,
  ssrRenderAttr as z,
  ssrRenderStyle as H,
  ssrRenderVNode as Y,
  ssrRenderSlot as F,
} from 'vue/server-renderer';
import { createRouter as V, createWebHistory as K } from 'vue-router';
import W, { trackRouter as q } from 'vue-gtag-next';
import X from 'vuex-shared-mutations';
import Z from 'axios';
import J from 'js-cookie';
import Q from 'vuex-persistedstate';
import ee from 'vue-sweetalert2';
import { plugin as te } from 'vue-tippy';
import { ClientTable as ae } from 'v-tables-3';
import * as re from '@sentry/vue';
import { BrowserTracing as se } from '@sentry/tracing';
import oe from 'vue-html-secure';
function ne(e) {
  return b(e).format('MMM Do YYYY, h:mma');
}
function ie(e) {
  if (!e) return '';
  var t = e[0];
  return t < '\ud800' || t > '\udfff'
    ? e[0].toUpperCase() + e.slice(1)
    : e.slice(0, 2).toUpperCase() + e.slice(2);
}
function le() {
  const e = new Date().getHours();
  let t;
  return (
    (t =
      e >= 0 && e <= 12
        ? 'Good Morning'
        : e > 12 && e <= 18
        ? 'Good Afternoon'
        : 'Good Evening'),
    t
  );
}
function de(e = null) {
  return 'apple' == e.toLowerCase()
    ? 'fa-brands fa-apple text-gray-800 dark:text-gray-200'
    : 'twitter' == e.toLowerCase()
    ? 'fa-brands fa-twitter text-blue-300 dark:text-blue-200'
    : 'google' == e.toLowerCase()
    ? 'fa-brands fa-google text-red-500 dark:text-gray-200'
    : 'microsoft' == e.toLowerCase()
    ? 'fa-brands fa-microsoft text-blue-300 dark:text-gray-200'
    : 'tiktok' == e.toLowerCase()
    ? 'fa-brands fa-tiktok text-pink-600 dark:text-gray-200'
    : 'youtube' == e.toLowerCase()
    ? 'fa-brands fa-youtube text-red-600 dark:text-gray-200'
    : 'instagram' == e.toLowerCase()
    ? 'fa-brands fa-instagram text-gray-800 dark:text-gray-200'
    : 'facebook' == e.toLowerCase()
    ? 'fa-brands fa-facebook text-blue-600 dark:text-gray-200'
    : 'github' == e.toLowerCase()
    ? 'fa-brands fa-github text-gray-700 dark:text-gray-200'
    : 'twitch' == e.toLowerCase()
    ? 'fa-brands fa-twitch text-blue-300 dark:text-gray-200'
    : 'linkedin' == e.toLowerCase()
    ? 'fa-brands fa-linkedin text-blue-900 dark:text-gray-200'
    : 'zoho' == e.toLowerCase()
    ? 'fas fa-z text-yellow-500 dark:text-gray-200'
    : 'stackexchange' == e.toLowerCase()
    ? 'fa-brands fa-stack-exchange text-blue-400 dark:text-gray-200'
    : 'gitlab' == e.toLowerCase()
    ? 'fa-brands fa-square-gitlab text-orange-400 dark:text-gray-200'
    : 'reddit' == e.toLowerCase()
    ? 'fa-brands fa-square-reddit text-orange-700 dark:text-gray-200'
    : 'snapchat' == e.toLowerCase()
    ? 'fa-brands fa-square-snapchat text-yellow-400 dark:text-gray-200'
    : 'meetup' == e.toLowerCase()
    ? 'fa-brands fa-meetup text-red-400 dark:text-gray-200'
    : 'bitbucket' == e.toLowerCase()
    ? 'fa-brands fa-bitbucket text-blue-800 dark:text-gray-200'
    : 'atlassian' == e.toLowerCase()
    ? 'fa-brands fa-atlassian text-blue-800 dark:text-gray-200'
    : 'fa-solid fa-plug-circle-check text-gray-600 dark:text-gray-200';
}
const ce = (e, t) => {
    const a = e.__vccOpts || e;
    for (const [r, s] of t) a[r] = s;
    return a;
  },
  ue = {
    name: 'AppNav',
    components: {
      HomeIcon: S,
      BuildingLibraryIcon: $,
      InformationCircleIcon: E,
      DocumentTextIcon: O,
      Popover: w,
      PopoverButton: C,
      PopoverGroup: T,
      PopoverPanel: _,
      Bars3Icon: B,
      XMarkIcon: L,
      CogIcon: j,
      ArrowLeftOnRectangleIcon: N,
      ChevronDownIcon: U,
      UserCircleIcon: R,
      Switch: A,
    },
    props: {},
    data: () => ({
      appName: 'Workflow',
      drop: !1,
      errors: null,
      success: '',
      loading: !1,
    }),
    computed: {
      ...y({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        roles: 'auth/roles',
        currentUserToken: 'auth/currentUserToken',
        impersonatorToken: 'auth/impersonatorToken',
      }),
      isImpersonating() {
        return !(!this.currentUserToken || !this.impersonatorToken);
      },
    },
    methods: {
      ...v({
        logout: 'auth/logout',
        updateTheme: 'auth/theme',
        popToast: 'toast/popToast',
        leaveImpersonatingUser: 'auth/leaveImpersonatingUser',
      }),
      parseDisplayDate: ne,
      closeDrop() {
        this.drop = !1;
      },
      openDrop() {
        this.drop = !0;
      },
      async toggleTheme() {
        (this.loading = !0), (this.errors = null), (this.success = '');
        try {
          await this.updateTheme({ theme_dark: !this.user.theme_dark }).then(
            (e) => {
              e &&
                e.data &&
                e.data.user &&
                e.data.user.id &&
                this.popToast({
                  message: 'Theme Saved',
                  timer: 2e3,
                  icon: 'success',
                });
            },
          );
        } catch (e) {
          (this.errors = e.data),
            this.popToast({
              message: 'Error Updating Theme',
              timer: 5e3,
              icon: 'error',
            });
        }
        this.loading = !1;
      },
      async leaveImpersonating() {
        try {
          await this.leaveImpersonatingUser().then((e) => {});
        } catch (e) {
          this.popToast({
            message: 'Unable To Return To Yourself',
            timer: 5e3,
            icon: 'error',
          });
        }
      },
    },
  };
const pe = ue.setup;
ue.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/AppNav.vue',
    ),
    pe ? pe(e, t) : void 0
  );
};
const me = ce(ue, [
    [
      'ssrRender',
      function (g, h, x, f, y, v, k, b) {
        const w = e('Popover'),
          C = e('router-link'),
          T = e('PopoverButton'),
          _ = e('Bars3Icon'),
          A = e('PopoverGroup'),
          S = e('BuildingLibraryIcon'),
          $ = e('HomeIcon'),
          E = e('InformationCircleIcon'),
          O = e('DocumentTextIcon'),
          B = e('AppButton'),
          L = e('Switch'),
          j = e('UserCircleIcon'),
          N = e('CogIcon'),
          U = e('ArrowLeftOnRectangleIcon'),
          R = e('PopoverPanel'),
          Y = e('XMarkIcon'),
          F = t('tippy');
        h(
          I(
            w,
            a({ class: 'relative bg-white dark:bg-slate-800' }, f),
            {
              default: r((e, t, h, x) => {
                if (!t)
                  return [
                    s('div', { class: 'mx-auto max-w-7xl px-4 sm:px-6' }, [
                      s(
                        'div',
                        {
                          class:
                            'flex items-center justify-between border-b-2 border-gray-100 py-6 dark:border-slate-700 md:justify-start md:space-x-10',
                        },
                        [
                          s(
                            'div',
                            { class: 'flex justify-start lg:w-0 lg:flex-1' },
                            [
                              s(
                                C,
                                { to: { name: 'home' }, onClick: b.closeDrop },
                                {
                                  default: r(() => [
                                    s(
                                      'span',
                                      { class: 'sr-only' },
                                      o(k.appName),
                                      1,
                                    ),
                                    (n(),
                                    i(
                                      'svg',
                                      {
                                        viewBox: '0 0 50 31',
                                        class:
                                          'h-6 w-auto text-indigo-500 dark:text-indigo-300',
                                      },
                                      [
                                        s('path', {
                                          'fill-rule': 'evenodd',
                                          'clip-rule': 'evenodd',
                                          d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                                          fill: 'currentColor',
                                        }),
                                      ],
                                    )),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['onClick'],
                              ),
                            ],
                          ),
                          s('div', { class: '-my-2 -mr-2 md:hidden' }, [
                            s(
                              T,
                              {
                                class:
                                  'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800 dark:hover:bg-slate-800',
                                onClick: b.openDrop,
                              },
                              {
                                default: r(() => [
                                  s('span', { class: 'sr-only' }, 'Open menu'),
                                  s(_, {
                                    class: 'h-6 w-6',
                                    'aria-hidden': 'true',
                                  }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['onClick'],
                            ),
                          ]),
                          s(
                            A,
                            { as: 'nav', class: 'hidden space-x-10 md:flex' },
                            {
                              default: r(() => [
                                g.authenticated &&
                                g.roles &&
                                (g.roles.admin || g.roles.superAdmin)
                                  ? (n(),
                                    i(
                                      C,
                                      {
                                        key: 0,
                                        to: { name: 'admin' },
                                        class:
                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                        onClick: b.closeDrop,
                                      },
                                      {
                                        default: r(({ isActive: e }) => [
                                          s(
                                            'span',
                                            {
                                              class: [
                                                e &&
                                                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                              ],
                                            },
                                            [
                                              s(S, {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              }),
                                            ],
                                            2,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['onClick'],
                                    ))
                                  : l('', !0),
                                g.authenticated
                                  ? (n(),
                                    i(
                                      C,
                                      {
                                        key: 1,
                                        to: { name: 'dashboard' },
                                        class:
                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                        onClick: b.closeDrop,
                                      },
                                      {
                                        default: r(({ isActive: e }) => [
                                          s(
                                            'span',
                                            {
                                              class: [
                                                e &&
                                                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                              ],
                                            },
                                            [
                                              s($, {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              }),
                                            ],
                                            2,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['onClick'],
                                    ))
                                  : l('', !0),
                                s(
                                  C,
                                  {
                                    to: { name: 'about' },
                                    class:
                                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                    onClick: b.closeDrop,
                                  },
                                  {
                                    default: r(({ isActive: e }) => [
                                      s(
                                        'span',
                                        {
                                          class: [
                                            e &&
                                              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                          ],
                                        },
                                        [
                                          s(E, {
                                            class: 'float-left mr-2 h-6 w-6',
                                          }),
                                        ],
                                        2,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['onClick'],
                                ),
                                s(
                                  C,
                                  {
                                    to: { name: 'terms' },
                                    class:
                                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                    onClick: b.closeDrop,
                                  },
                                  {
                                    default: r(({ isActive: e }) => [
                                      s(
                                        'span',
                                        {
                                          class: [
                                            e &&
                                              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                          ],
                                        },
                                        [
                                          s(O, {
                                            class: 'float-left mr-2 h-6 w-6',
                                          }),
                                        ],
                                        2,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['onClick'],
                                ),
                              ]),
                              _: 1,
                            },
                          ),
                          g.authenticated && g.user
                            ? (n(),
                              i(
                                'div',
                                {
                                  key: 0,
                                  class:
                                    'hidden items-center justify-end md:flex md:flex-1 lg:w-0',
                                },
                                [
                                  b.isImpersonating
                                    ? u(
                                        (n(),
                                        i(
                                          B,
                                          {
                                            key: 0,
                                            icon: 'fa-solid fa-user-secret',
                                            class:
                                              'float-right mr-4 h-3 w-3 rounded',
                                            style: {
                                              background:
                                                'transparent !important',
                                            },
                                            onClick: b.leaveImpersonating,
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        )),
                                        [[F, 'Return to your account']],
                                      )
                                    : l('', !0),
                                  u(
                                    (n(),
                                    i(
                                      'span',
                                      {
                                        class: [
                                          'mr-2',
                                          k.loading
                                            ? 'default disabled cursor-pointer'
                                            : 'cursor-pointer',
                                        ],
                                        onClick: (e) => b.toggleTheme(),
                                      },
                                      [
                                        s(
                                          L,
                                          {
                                            'default-checked':
                                              g.user.theme_dark,
                                            class: [
                                              g.user.theme_dark
                                                ? 'bg-gray-500'
                                                : 'bg-gray-400',
                                              'relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                                            ],
                                          },
                                          {
                                            default: r(() => [
                                              s(
                                                'span',
                                                { class: 'sr-only' },
                                                'Toggle Theme',
                                              ),
                                              s(
                                                'span',
                                                {
                                                  'aria-hidden': 'true',
                                                  class: [
                                                    g.user.theme_dark
                                                      ? 'translate-x-4 bg-gray-800'
                                                      : 'translate-x-0 bg-white',
                                                    'pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                                  ],
                                                },
                                                null,
                                                2,
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['default-checked', 'class'],
                                        ),
                                      ],
                                      10,
                                      ['onClick'],
                                    )),
                                    [
                                      [
                                        F,
                                        'Toggle Theme ' +
                                          (g.user.theme_dark
                                            ? 'Light'
                                            : 'Dark'),
                                      ],
                                    ],
                                  ),
                                  s(
                                    'div',
                                    { ref: 'dropMenu', class: 'relative' },
                                    [
                                      s(
                                        'div',
                                        {
                                          class:
                                            'cursor-pointer items-center p-3 text-base font-medium tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                          onClick: (e) => (k.drop = !k.drop),
                                        },
                                        [
                                          d(
                                            o(
                                              g.user && g.user.name
                                                ? g.user.name
                                                : '',
                                            ) + ' ',
                                            1,
                                          ),
                                          g.user.email_verified_at
                                            ? l('', !0)
                                            : u(
                                                (n(),
                                                i(
                                                  'span',
                                                  {
                                                    key: 0,
                                                    class:
                                                      'fa-solid fa-exclamation-circle fa-xs text-orange-600',
                                                    style: {
                                                      position: 'absolute',
                                                      top: '12px',
                                                      right: '38px',
                                                    },
                                                  },
                                                  null,
                                                  512,
                                                )),
                                                [[F, 'Email Not Verified']],
                                              ),
                                          g.user && g.user.avatar
                                            ? (n(),
                                              i(
                                                'img',
                                                {
                                                  key: 1,
                                                  src: g.user.avatar,
                                                  alt: g.user.name,
                                                  class:
                                                    'float-right ml-2 mt-0 h-6 w-6 rounded-full',
                                                },
                                                null,
                                                8,
                                                ['src', 'alt'],
                                              ))
                                            : (n(),
                                              i(j, {
                                                key: 2,
                                                class:
                                                  'float-right ml-2 mt-0 h-6 w-6',
                                              })),
                                        ],
                                        8,
                                        ['onClick'],
                                      ),
                                      u(
                                        s(
                                          'div',
                                          {
                                            class:
                                              'absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900',
                                            onClick: (e) => (k.drop = !k.drop),
                                          },
                                          [
                                            g.authenticated &&
                                            g.roles &&
                                            (g.roles.admin ||
                                              g.roles.superAdmin)
                                              ? (n(),
                                                i(
                                                  C,
                                                  {
                                                    key: 0,
                                                    to: { name: 'admin' },
                                                  },
                                                  {
                                                    default: r(
                                                      ({ isActive: e }) => [
                                                        s(
                                                          'span',
                                                          {
                                                            class: [
                                                              'flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                                              e
                                                                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                                                : 'text-gray-700',
                                                            ],
                                                          },
                                                          [
                                                            s(S, {
                                                              class:
                                                                'mr-2 h-6 w-6',
                                                            }),
                                                            d(' Admin '),
                                                          ],
                                                          2,
                                                        ),
                                                      ],
                                                    ),
                                                    _: 1,
                                                  },
                                                ))
                                              : l('', !0),
                                            g.authenticated
                                              ? (n(),
                                                i(
                                                  C,
                                                  {
                                                    key: 1,
                                                    to: { name: 'dashboard' },
                                                  },
                                                  {
                                                    default: r(
                                                      ({ isActive: e }) => [
                                                        s(
                                                          'span',
                                                          {
                                                            class: [
                                                              'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                                              e
                                                                ? g.roles &&
                                                                  (g.roles
                                                                    .admin ||
                                                                    g.roles
                                                                      .superAdmin)
                                                                  ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                                                  : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                                                                : g.roles &&
                                                                  (g.roles
                                                                    .admin ||
                                                                    g.roles
                                                                      .superAdmin)
                                                                ? 'text-gray-700'
                                                                : 'rounded-t text-gray-700',
                                                            ],
                                                          },
                                                          [
                                                            s($, {
                                                              class:
                                                                'mr-2 h-6 w-6',
                                                            }),
                                                            d(' Dashboard '),
                                                          ],
                                                          2,
                                                        ),
                                                      ],
                                                    ),
                                                    _: 1,
                                                  },
                                                ))
                                              : l('', !0),
                                            g.authenticated
                                              ? (n(),
                                                i(
                                                  C,
                                                  {
                                                    key: 2,
                                                    to: { name: 'settings' },
                                                  },
                                                  {
                                                    default: r(
                                                      ({ isActive: e }) => [
                                                        s(
                                                          'span',
                                                          {
                                                            class: [
                                                              'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                                              e
                                                                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                                                : 'text-gray-700',
                                                            ],
                                                          },
                                                          [
                                                            s(N, {
                                                              class:
                                                                'mr-2 h-6 w-6',
                                                            }),
                                                            d(' Settings '),
                                                          ],
                                                          2,
                                                        ),
                                                      ],
                                                    ),
                                                    _: 1,
                                                  },
                                                ))
                                              : l('', !0),
                                            s(
                                              'div',
                                              {
                                                class:
                                                  'flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white',
                                                onClick: c(
                                                  (e) => (
                                                    g.logout(), b.closeDrop()
                                                  ),
                                                  ['prevent'],
                                                ),
                                              },
                                              [
                                                s(U, { class: 'mr-2 h-6 w-6' }),
                                                d(' Logout '),
                                              ],
                                              8,
                                              ['onClick'],
                                            ),
                                          ],
                                          8,
                                          ['onClick'],
                                        ),
                                        [[p, k.drop]],
                                      ),
                                    ],
                                    512,
                                  ),
                                ],
                              ))
                            : l('', !0),
                          g.authenticated
                            ? l('', !0)
                            : (n(),
                              i(
                                'div',
                                {
                                  key: 1,
                                  class:
                                    'hidden items-center justify-end md:flex md:flex-1 lg:w-0',
                                },
                                [
                                  s(
                                    C,
                                    {
                                      to: { name: 'login' },
                                      class:
                                        'whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                      onClick: b.closeDrop,
                                    },
                                    {
                                      default: r(({ isActive: e }) => [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                            ],
                                          },
                                          ' Sign in ',
                                          2,
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['onClick'],
                                  ),
                                  s(
                                    C,
                                    {
                                      to: { name: 'register' },
                                      onClick: b.closeDrop,
                                    },
                                    {
                                      default: r(({ isActive: e }) => [
                                        s(
                                          B,
                                          {
                                            primary: '',
                                            text: 'Sign Up',
                                            class: [
                                              'ml-8',
                                              [e && 'opacity-60'],
                                            ],
                                          },
                                          null,
                                          8,
                                          ['class'],
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['onClick'],
                                  ),
                                ],
                              )),
                        ],
                      ),
                    ]),
                    s(
                      m,
                      {
                        'enter-active-class': 'duration-200 ease-out',
                        'enter-from-class': 'opacity-0 scale-95',
                        'enter-to-class': 'opacity-100 scale-100',
                        'leave-active-class': 'duration-100 ease-in',
                        'leave-from-class': 'opacity-100 scale-100',
                        'leave-to-class': 'opacity-0 scale-95',
                      },
                      {
                        default: r(() => [
                          u(
                            s(
                              R,
                              {
                                focus: '',
                                class:
                                  'absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden',
                              },
                              {
                                default: r(({ close: e }) => [
                                  s(
                                    'div',
                                    {
                                      class:
                                        'divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-slate-900',
                                    },
                                    [
                                      s('div', { class: 'px-5 pt-5 pb-6' }, [
                                        s(
                                          'div',
                                          {
                                            class:
                                              'flex items-center justify-between',
                                          },
                                          [
                                            s('div', null, [
                                              s(
                                                'span',
                                                { class: 'sr-only' },
                                                o(k.appName),
                                                1,
                                              ),
                                              s(
                                                C,
                                                {
                                                  to: { name: 'home' },
                                                  onClick: e,
                                                },
                                                {
                                                  default: r(
                                                    ({ isActive: e }) => [
                                                      (n(),
                                                      i(
                                                        'svg',
                                                        {
                                                          viewBox: '0 0 50 31',
                                                          class:
                                                            'h-6 w-auto text-indigo-500',
                                                        },
                                                        [
                                                          s('path', {
                                                            'fill-rule':
                                                              'evenodd',
                                                            'clip-rule':
                                                              'evenodd',
                                                            d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                                                            fill: 'currentColor',
                                                          }),
                                                        ],
                                                      )),
                                                    ],
                                                  ),
                                                  _: 2,
                                                },
                                                1032,
                                                ['onClick'],
                                              ),
                                            ]),
                                            s('div', { class: '-mr-2' }, [
                                              s(
                                                T,
                                                {
                                                  class:
                                                    'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800',
                                                },
                                                {
                                                  default: r(() => [
                                                    s(
                                                      'span',
                                                      { class: 'sr-only' },
                                                      'Close menu',
                                                    ),
                                                    s(Y, {
                                                      class: 'h-6 w-6',
                                                      'aria-hidden': 'true',
                                                    }),
                                                  ]),
                                                  _: 1,
                                                },
                                              ),
                                            ]),
                                          ],
                                        ),
                                      ]),
                                      s(
                                        'div',
                                        { class: 'space-y-6 py-6 px-5' },
                                        [
                                          s('div', { class: '' }, [
                                            g.authenticated &&
                                            g.roles &&
                                            (g.roles.admin ||
                                              g.roles.superAdmin)
                                              ? (n(),
                                                i(
                                                  'div',
                                                  {
                                                    key: 0,
                                                    class: 'mb-6 text-left',
                                                  },
                                                  [
                                                    s(
                                                      C,
                                                      {
                                                        to: { name: 'admin' },
                                                        class:
                                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                        onClick: e,
                                                      },
                                                      {
                                                        default: r(
                                                          ({ isActive: e }) => [
                                                            s(
                                                              'span',
                                                              {
                                                                class: [
                                                                  e &&
                                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                                ],
                                                              },
                                                              [
                                                                s($, {
                                                                  class:
                                                                    'float-left mr-2 h-6 w-6',
                                                                }),
                                                                d(' Admin '),
                                                              ],
                                                              2,
                                                            ),
                                                          ],
                                                        ),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['onClick'],
                                                    ),
                                                  ],
                                                ))
                                              : l('', !0),
                                            g.authenticated
                                              ? (n(),
                                                i(
                                                  'div',
                                                  {
                                                    key: 1,
                                                    class: 'mb-6 text-left',
                                                  },
                                                  [
                                                    s(
                                                      C,
                                                      {
                                                        to: {
                                                          name: 'dashboard',
                                                        },
                                                        class:
                                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                        onClick: e,
                                                      },
                                                      {
                                                        default: r(
                                                          ({ isActive: e }) => [
                                                            s(
                                                              'span',
                                                              {
                                                                class: [
                                                                  e &&
                                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                                ],
                                                              },
                                                              [
                                                                s($, {
                                                                  class:
                                                                    'float-left mr-2 h-6 w-6',
                                                                }),
                                                                d(
                                                                  ' Dashboard ',
                                                                ),
                                                              ],
                                                              2,
                                                            ),
                                                          ],
                                                        ),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['onClick'],
                                                    ),
                                                  ],
                                                ))
                                              : l('', !0),
                                            s(
                                              'div',
                                              { class: 'mb-6 text-left' },
                                              [
                                                s(
                                                  C,
                                                  {
                                                    to: { name: 'about' },
                                                    class:
                                                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                    onClick: e,
                                                  },
                                                  {
                                                    default: r(
                                                      ({ isActive: e }) => [
                                                        s(
                                                          'span',
                                                          {
                                                            class: [
                                                              e &&
                                                                'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                            ],
                                                          },
                                                          [
                                                            s(E, {
                                                              class:
                                                                'float-left mr-2 h-6 w-6',
                                                            }),
                                                            d(' About '),
                                                          ],
                                                          2,
                                                        ),
                                                      ],
                                                    ),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ['onClick'],
                                                ),
                                              ],
                                            ),
                                            s(
                                              'div',
                                              { class: 'mb-6 text-left' },
                                              [
                                                s(
                                                  C,
                                                  {
                                                    to: { name: 'terms' },
                                                    class:
                                                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                    onClick: e,
                                                  },
                                                  {
                                                    default: r(
                                                      ({ isActive: e }) => [
                                                        s(
                                                          'span',
                                                          {
                                                            class: [
                                                              e &&
                                                                'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                            ],
                                                          },
                                                          [
                                                            s(O, {
                                                              class:
                                                                'float-left mr-2 h-6 w-6',
                                                            }),
                                                            d(' Terms '),
                                                          ],
                                                          2,
                                                        ),
                                                      ],
                                                    ),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ['onClick'],
                                                ),
                                              ],
                                            ),
                                            s(
                                              'div',
                                              { class: 'mb-7 text-left' },
                                              [
                                                g.authenticated
                                                  ? (n(),
                                                    i(
                                                      C,
                                                      {
                                                        key: 0,
                                                        to: {
                                                          name: 'settings',
                                                        },
                                                        class:
                                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                        onClick: e,
                                                      },
                                                      {
                                                        default: r(
                                                          ({ isActive: e }) => [
                                                            s(
                                                              'span',
                                                              {
                                                                class: [
                                                                  e &&
                                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                                ],
                                                              },
                                                              [
                                                                s(N, {
                                                                  class:
                                                                    'float-left mr-2 h-6 w-6',
                                                                }),
                                                                d(' Settings '),
                                                              ],
                                                              2,
                                                            ),
                                                          ],
                                                        ),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['onClick'],
                                                    ))
                                                  : l('', !0),
                                              ],
                                            ),
                                            g.authenticated && g.user
                                              ? (n(),
                                                i(
                                                  'div',
                                                  {
                                                    key: 2,
                                                    class: [
                                                      'mr-2 mb-10',
                                                      k.loading
                                                        ? 'default disabled cursor-pointer'
                                                        : 'cursor-pointer',
                                                    ],
                                                    onClick: (e) =>
                                                      b.toggleTheme(),
                                                  },
                                                  [
                                                    s(
                                                      L,
                                                      {
                                                        'default-checked':
                                                          g.user.theme_dark,
                                                        class: [
                                                          g.user.theme_dark
                                                            ? 'bg-gray-500'
                                                            : 'bg-gray-400',
                                                          'relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                                                        ],
                                                      },
                                                      {
                                                        default: r(() => [
                                                          s(
                                                            'span',
                                                            {
                                                              class: 'sr-only',
                                                            },
                                                            'Toggle Theme',
                                                          ),
                                                          s(
                                                            'span',
                                                            {
                                                              'aria-hidden':
                                                                'true',
                                                              class: [
                                                                g.user
                                                                  .theme_dark
                                                                  ? 'translate-x-3 bg-gray-800'
                                                                  : 'translate-x-0 bg-white',
                                                                'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                                              ],
                                                            },
                                                            null,
                                                            2,
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      [
                                                        'default-checked',
                                                        'class',
                                                      ],
                                                    ),
                                                    s(
                                                      'span',
                                                      {
                                                        class:
                                                          'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                      },
                                                      ' Toggle Theme ' +
                                                        o(
                                                          g.user.theme_dark
                                                            ? 'Light'
                                                            : 'Dark',
                                                        ),
                                                      1,
                                                    ),
                                                  ],
                                                  10,
                                                  ['onClick'],
                                                ))
                                              : l('', !0),
                                            b.isImpersonating && g.authenticated
                                              ? (n(),
                                                i(
                                                  'div',
                                                  {
                                                    key: 3,
                                                    class: 'mb-8 text-left',
                                                    style: {
                                                      'margin-top': '-0.5em',
                                                    },
                                                  },
                                                  [
                                                    s(
                                                      'div',
                                                      {
                                                        class:
                                                          'cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                        onClick: (t) => (
                                                          b.leaveImpersonating(),
                                                          e()
                                                        ),
                                                      },
                                                      [
                                                        s('span', {
                                                          class:
                                                            'fa-solid fa-user-secret fa-fw mr-2 ml-1',
                                                        }),
                                                        d(
                                                          ' Return to your account ',
                                                        ),
                                                      ],
                                                      8,
                                                      ['onClick'],
                                                    ),
                                                  ],
                                                ))
                                              : l('', !0),
                                          ]),
                                          g.authenticated
                                            ? l('', !0)
                                            : (n(),
                                              i('div', { key: 0 }, [
                                                s(
                                                  C,
                                                  { to: { name: 'register' } },
                                                  {
                                                    default: r(
                                                      ({ isActive: t }) => [
                                                        s(
                                                          B,
                                                          {
                                                            primary: '',
                                                            text: 'Sign up',
                                                            class: [
                                                              'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700',
                                                              [
                                                                t &&
                                                                  'opacity-60',
                                                              ],
                                                            ],
                                                            onClick: e,
                                                          },
                                                          null,
                                                          8,
                                                          ['class', 'onClick'],
                                                        ),
                                                      ],
                                                    ),
                                                    _: 2,
                                                  },
                                                  1024,
                                                ),
                                                s(
                                                  'p',
                                                  {
                                                    class:
                                                      'mt-6 text-center text-base font-medium text-gray-500',
                                                  },
                                                  [
                                                    d(
                                                      ' Existing customer? ' +
                                                        o(' ') +
                                                        ' ',
                                                    ),
                                                    s(
                                                      C,
                                                      {
                                                        to: { name: 'login' },
                                                        class:
                                                          'whitespace-nowrap text-base font-medium text-indigo-500 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400',
                                                        onClick: e,
                                                      },
                                                      {
                                                        default: r(
                                                          ({ isActive: e }) => [
                                                            s(
                                                              'span',
                                                              {
                                                                class: [
                                                                  e &&
                                                                    'text-indigo-800 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-500',
                                                                ],
                                                              },
                                                              ' Sign in ',
                                                              2,
                                                            ),
                                                          ],
                                                        ),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['onClick'],
                                                    ),
                                                  ],
                                                ),
                                              ])),
                                          g.authenticated
                                            ? (n(),
                                              i('div', { key: 1 }, [
                                                s(
                                                  B,
                                                  {
                                                    primary: '',
                                                    text: 'Logout',
                                                    type: 'button',
                                                    class:
                                                      'flex w-full items-center justify-center px-4 py-2',
                                                    onClick: c(
                                                      (e) => (
                                                        g.logout(),
                                                        b.closeDrop()
                                                      ),
                                                      ['prevent'],
                                                    ),
                                                  },
                                                  {
                                                    text: r(() => [
                                                      s(U, {
                                                        class: 'mr-2 h-6 w-6',
                                                      }),
                                                      d(' Logout '),
                                                    ]),
                                                    _: 1,
                                                  },
                                                  8,
                                                  ['onClick'],
                                                ),
                                              ]))
                                            : l('', !0),
                                        ],
                                      ),
                                    ],
                                  ),
                                ]),
                                _: 1,
                              },
                              512,
                            ),
                            [[p, k.drop]],
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                  ];
                t(
                  `<div class="mx-auto max-w-7xl px-4 sm:px-6"${x}><div class="flex items-center justify-between border-b-2 border-gray-100 py-6 dark:border-slate-700 md:justify-start md:space-x-10"${x}><div class="flex justify-start lg:w-0 lg:flex-1"${x}>`,
                ),
                  t(
                    I(
                      C,
                      { to: { name: 'home' }, onClick: b.closeDrop },
                      {
                        default: r((e, t, a, r) => {
                          if (!t)
                            return [
                              s('span', { class: 'sr-only' }, o(k.appName), 1),
                              (n(),
                              i(
                                'svg',
                                {
                                  viewBox: '0 0 50 31',
                                  class:
                                    'h-6 w-auto text-indigo-500 dark:text-indigo-300',
                                },
                                [
                                  s('path', {
                                    'fill-rule': 'evenodd',
                                    'clip-rule': 'evenodd',
                                    d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                                    fill: 'currentColor',
                                  }),
                                ],
                              )),
                            ];
                          t(
                            `<span class="sr-only"${r}>${D(
                              k.appName,
                            )}</span><svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500 dark:text-indigo-300"${r}><path fill-rule="evenodd" clip-rule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="currentColor"${r}></path></svg>`,
                          );
                        }),
                        _: 1,
                      },
                      h,
                      x,
                    ),
                  ),
                  t(`</div><div class="-my-2 -mr-2 md:hidden"${x}>`),
                  t(
                    I(
                      T,
                      {
                        class:
                          'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800 dark:hover:bg-slate-800',
                        onClick: b.openDrop,
                      },
                      {
                        default: r((e, t, a, r) => {
                          if (!t)
                            return [
                              s('span', { class: 'sr-only' }, 'Open menu'),
                              s(_, { class: 'h-6 w-6', 'aria-hidden': 'true' }),
                            ];
                          t(`<span class="sr-only"${r}>Open menu</span>`),
                            t(
                              I(
                                _,
                                { class: 'h-6 w-6', 'aria-hidden': 'true' },
                                null,
                                a,
                                r,
                              ),
                            );
                        }),
                        _: 1,
                      },
                      h,
                      x,
                    ),
                  ),
                  t('</div>'),
                  t(
                    I(
                      A,
                      { as: 'nav', class: 'hidden space-x-10 md:flex' },
                      {
                        default: r((e, t, a, o) => {
                          if (!t)
                            return [
                              g.authenticated &&
                              g.roles &&
                              (g.roles.admin || g.roles.superAdmin)
                                ? (n(),
                                  i(
                                    C,
                                    {
                                      key: 0,
                                      to: { name: 'admin' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                      onClick: b.closeDrop,
                                    },
                                    {
                                      default: r(({ isActive: e }) => [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                            ],
                                          },
                                          [
                                            s(S, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                          ],
                                          2,
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['onClick'],
                                  ))
                                : l('', !0),
                              g.authenticated
                                ? (n(),
                                  i(
                                    C,
                                    {
                                      key: 1,
                                      to: { name: 'dashboard' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                      onClick: b.closeDrop,
                                    },
                                    {
                                      default: r(({ isActive: e }) => [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                            ],
                                          },
                                          [
                                            s($, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                          ],
                                          2,
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['onClick'],
                                  ))
                                : l('', !0),
                              s(
                                C,
                                {
                                  to: { name: 'about' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                  onClick: b.closeDrop,
                                },
                                {
                                  default: r(({ isActive: e }) => [
                                    s(
                                      'span',
                                      {
                                        class: [
                                          e &&
                                            'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                        ],
                                      },
                                      [
                                        s(E, {
                                          class: 'float-left mr-2 h-6 w-6',
                                        }),
                                      ],
                                      2,
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['onClick'],
                              ),
                              s(
                                C,
                                {
                                  to: { name: 'terms' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                  onClick: b.closeDrop,
                                },
                                {
                                  default: r(({ isActive: e }) => [
                                    s(
                                      'span',
                                      {
                                        class: [
                                          e &&
                                            'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                        ],
                                      },
                                      [
                                        s(O, {
                                          class: 'float-left mr-2 h-6 w-6',
                                        }),
                                      ],
                                      2,
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['onClick'],
                              ),
                            ];
                          g.authenticated &&
                          g.roles &&
                          (g.roles.admin || g.roles.superAdmin)
                            ? t(
                                I(
                                  C,
                                  {
                                    to: { name: 'admin' },
                                    class:
                                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                    onClick: b.closeDrop,
                                  },
                                  {
                                    default: r(({ isActive: e }, t, a, r) => {
                                      if (!t)
                                        return [
                                          s(
                                            'span',
                                            {
                                              class: [
                                                e &&
                                                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                              ],
                                            },
                                            [
                                              s(S, {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              }),
                                            ],
                                            2,
                                          ),
                                        ];
                                      t(
                                        `<span class="${P([
                                          e &&
                                            'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                        ])}"${r}>`,
                                      ),
                                        t(
                                          I(
                                            S,
                                            {
                                              class: 'float-left mr-2 h-6 w-6',
                                            },
                                            null,
                                            a,
                                            r,
                                          ),
                                        ),
                                        t('</span>');
                                    }),
                                    _: 1,
                                  },
                                  a,
                                  o,
                                ),
                              )
                            : t('\x3c!----\x3e'),
                            g.authenticated
                              ? t(
                                  I(
                                    C,
                                    {
                                      to: { name: 'dashboard' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                      onClick: b.closeDrop,
                                    },
                                    {
                                      default: r(({ isActive: e }, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              {
                                                class: [
                                                  e &&
                                                    'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                                ],
                                              },
                                              [
                                                s($, {
                                                  class:
                                                    'float-left mr-2 h-6 w-6',
                                                }),
                                              ],
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="${P([
                                            e &&
                                              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                          ])}"${r}>`,
                                        ),
                                          t(
                                            I(
                                              $,
                                              {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              },
                                              null,
                                              a,
                                              r,
                                            ),
                                          ),
                                          t('</span>');
                                      }),
                                      _: 1,
                                    },
                                    a,
                                    o,
                                  ),
                                )
                              : t('\x3c!----\x3e'),
                            t(
                              I(
                                C,
                                {
                                  to: { name: 'about' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                  onClick: b.closeDrop,
                                },
                                {
                                  default: r(({ isActive: e }, t, a, r) => {
                                    if (!t)
                                      return [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                            ],
                                          },
                                          [
                                            s(E, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                          ],
                                          2,
                                        ),
                                      ];
                                    t(
                                      `<span class="${P([
                                        e &&
                                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                      ])}"${r}>`,
                                    ),
                                      t(
                                        I(
                                          E,
                                          { class: 'float-left mr-2 h-6 w-6' },
                                          null,
                                          a,
                                          r,
                                        ),
                                      ),
                                      t('</span>');
                                  }),
                                  _: 1,
                                },
                                a,
                                o,
                              ),
                            ),
                            t(
                              I(
                                C,
                                {
                                  to: { name: 'terms' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                                  onClick: b.closeDrop,
                                },
                                {
                                  default: r(({ isActive: e }, t, a, r) => {
                                    if (!t)
                                      return [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                            ],
                                          },
                                          [
                                            s(O, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                          ],
                                          2,
                                        ),
                                      ];
                                    t(
                                      `<span class="${P([
                                        e &&
                                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                      ])}"${r}>`,
                                    ),
                                      t(
                                        I(
                                          O,
                                          { class: 'float-left mr-2 h-6 w-6' },
                                          null,
                                          a,
                                          r,
                                        ),
                                      ),
                                      t('</span>');
                                  }),
                                  _: 1,
                                },
                                a,
                                o,
                              ),
                            );
                        }),
                        _: 1,
                      },
                      h,
                      x,
                    ),
                  ),
                  g.authenticated && g.user
                    ? (t(
                        `<div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0"${x}>`,
                      ),
                      b.isImpersonating
                        ? t(
                            I(
                              B,
                              a(
                                {
                                  icon: 'fa-solid fa-user-secret',
                                  class: 'float-right mr-4 h-3 w-3 rounded',
                                  style: {
                                    background: 'transparent !important',
                                  },
                                  onClick: b.leaveImpersonating,
                                },
                                M(g, F, 'Return to your account'),
                              ),
                              null,
                              h,
                              x,
                            ),
                          )
                        : t('\x3c!----\x3e'),
                      t(
                        `<span${G(
                          a(
                            {
                              class: [
                                'mr-2',
                                k.loading
                                  ? 'default disabled cursor-pointer'
                                  : 'cursor-pointer',
                              ],
                            },
                            M(
                              g,
                              F,
                              'Toggle Theme ' +
                                (g.user.theme_dark ? 'Light' : 'Dark'),
                            ),
                          ),
                        )}${x}>`,
                      ),
                      t(
                        I(
                          L,
                          {
                            'default-checked': g.user.theme_dark,
                            class: [
                              g.user.theme_dark ? 'bg-gray-500' : 'bg-gray-400',
                              'relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                            ],
                          },
                          {
                            default: r((e, t, a, r) => {
                              if (!t)
                                return [
                                  s(
                                    'span',
                                    { class: 'sr-only' },
                                    'Toggle Theme',
                                  ),
                                  s(
                                    'span',
                                    {
                                      'aria-hidden': 'true',
                                      class: [
                                        g.user.theme_dark
                                          ? 'translate-x-4 bg-gray-800'
                                          : 'translate-x-0 bg-white',
                                        'pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                      ],
                                    },
                                    null,
                                    2,
                                  ),
                                ];
                              t(
                                `<span class="sr-only"${r}>Toggle Theme</span><span aria-hidden="true" class="${P(
                                  [
                                    g.user.theme_dark
                                      ? 'translate-x-4 bg-gray-800'
                                      : 'translate-x-0 bg-white',
                                    'pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                  ],
                                )}"${r}></span>`,
                              );
                            }),
                            _: 1,
                          },
                          h,
                          x,
                        ),
                      ),
                      t(
                        `</span><div class="relative"${x}><div class="cursor-pointer items-center p-3 text-base font-medium tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"${x}>${D(
                          g.user && g.user.name ? g.user.name : '',
                        )} `,
                      ),
                      g.user.email_verified_at
                        ? t('\x3c!----\x3e')
                        : t(
                            `<span${G(
                              a(
                                {
                                  class:
                                    'fa-solid fa-exclamation-circle fa-xs text-orange-600',
                                  style: {
                                    position: 'absolute',
                                    top: '12px',
                                    right: '38px',
                                  },
                                },
                                M(g, F, 'Email Not Verified'),
                              ),
                            )}${x}></span>`,
                          ),
                      g.user && g.user.avatar
                        ? t(
                            `<img${z('src', g.user.avatar)}${z(
                              'alt',
                              g.user.name,
                            )} class="float-right ml-2 mt-0 h-6 w-6 rounded-full"${x}>`,
                          )
                        : t(
                            I(
                              j,
                              { class: 'float-right ml-2 mt-0 h-6 w-6' },
                              null,
                              h,
                              x,
                            ),
                          ),
                      t(
                        `</div><div style="${H(
                          k.drop ? null : { display: 'none' },
                        )}" class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900"${x}>`,
                      ),
                      g.authenticated &&
                      g.roles &&
                      (g.roles.admin || g.roles.superAdmin)
                        ? t(
                            I(
                              C,
                              { to: { name: 'admin' } },
                              {
                                default: r(({ isActive: e }, t, a, r) => {
                                  if (!t)
                                    return [
                                      s(
                                        'span',
                                        {
                                          class: [
                                            'flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                            e
                                              ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                              : 'text-gray-700',
                                          ],
                                        },
                                        [
                                          s(S, { class: 'mr-2 h-6 w-6' }),
                                          d(' Admin '),
                                        ],
                                        2,
                                      ),
                                    ];
                                  t(
                                    `<span class="${P([
                                      e
                                        ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                        : 'text-gray-700',
                                      'flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                    ])}"${r}>`,
                                  ),
                                    t(
                                      I(
                                        S,
                                        { class: 'mr-2 h-6 w-6' },
                                        null,
                                        a,
                                        r,
                                      ),
                                    ),
                                    t(' Admin </span>');
                                }),
                                _: 1,
                              },
                              h,
                              x,
                            ),
                          )
                        : t('\x3c!----\x3e'),
                      g.authenticated
                        ? t(
                            I(
                              C,
                              { to: { name: 'dashboard' } },
                              {
                                default: r(({ isActive: e }, t, a, r) => {
                                  if (!t)
                                    return [
                                      s(
                                        'span',
                                        {
                                          class: [
                                            'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                            e
                                              ? g.roles &&
                                                (g.roles.admin ||
                                                  g.roles.superAdmin)
                                                ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                                : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                                              : g.roles &&
                                                (g.roles.admin ||
                                                  g.roles.superAdmin)
                                              ? 'text-gray-700'
                                              : 'rounded-t text-gray-700',
                                          ],
                                        },
                                        [
                                          s($, { class: 'mr-2 h-6 w-6' }),
                                          d(' Dashboard '),
                                        ],
                                        2,
                                      ),
                                    ];
                                  t(
                                    `<span class="${P([
                                      e
                                        ? g.roles &&
                                          (g.roles.admin || g.roles.superAdmin)
                                          ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                          : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                                        : g.roles &&
                                          (g.roles.admin || g.roles.superAdmin)
                                        ? 'text-gray-700'
                                        : 'rounded-t text-gray-700',
                                      'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                    ])}"${r}>`,
                                  ),
                                    t(
                                      I(
                                        $,
                                        { class: 'mr-2 h-6 w-6' },
                                        null,
                                        a,
                                        r,
                                      ),
                                    ),
                                    t(' Dashboard </span>');
                                }),
                                _: 1,
                              },
                              h,
                              x,
                            ),
                          )
                        : t('\x3c!----\x3e'),
                      g.authenticated
                        ? t(
                            I(
                              C,
                              { to: { name: 'settings' } },
                              {
                                default: r(({ isActive: e }, t, a, r) => {
                                  if (!t)
                                    return [
                                      s(
                                        'span',
                                        {
                                          class: [
                                            'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                            e
                                              ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                              : 'text-gray-700',
                                          ],
                                        },
                                        [
                                          s(N, { class: 'mr-2 h-6 w-6' }),
                                          d(' Settings '),
                                        ],
                                        2,
                                      ),
                                    ];
                                  t(
                                    `<span class="${P([
                                      e
                                        ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                        : 'text-gray-700',
                                      'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                    ])}"${r}>`,
                                  ),
                                    t(
                                      I(
                                        N,
                                        { class: 'mr-2 h-6 w-6' },
                                        null,
                                        a,
                                        r,
                                      ),
                                    ),
                                    t(' Settings </span>');
                                }),
                                _: 1,
                              },
                              h,
                              x,
                            ),
                          )
                        : t('\x3c!----\x3e'),
                      t(
                        `<div class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white"${x}>`,
                      ),
                      t(I(U, { class: 'mr-2 h-6 w-6' }, null, h, x)),
                      t(' Logout </div></div></div></div>'))
                    : t('\x3c!----\x3e'),
                  g.authenticated
                    ? t('\x3c!----\x3e')
                    : (t(
                        `<div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0"${x}>`,
                      ),
                      t(
                        I(
                          C,
                          {
                            to: { name: 'login' },
                            class:
                              'whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                            onClick: b.closeDrop,
                          },
                          {
                            default: r(({ isActive: e }, t, a, r) => {
                              if (!t)
                                return [
                                  s(
                                    'span',
                                    {
                                      class: [
                                        e &&
                                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                      ],
                                    },
                                    ' Sign in ',
                                    2,
                                  ),
                                ];
                              t(
                                `<span class="${P([
                                  e &&
                                    'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                                ])}"${r}> Sign in </span>`,
                              );
                            }),
                            _: 1,
                          },
                          h,
                          x,
                        ),
                      ),
                      t(
                        I(
                          C,
                          { to: { name: 'register' }, onClick: b.closeDrop },
                          {
                            default: r(({ isActive: e }, t, a, r) => {
                              if (!t)
                                return [
                                  s(
                                    B,
                                    {
                                      primary: '',
                                      text: 'Sign Up',
                                      class: ['ml-8', [e && 'opacity-60']],
                                    },
                                    null,
                                    8,
                                    ['class'],
                                  ),
                                ];
                              t(
                                I(
                                  B,
                                  {
                                    primary: '',
                                    text: 'Sign Up',
                                    class: ['ml-8', [e && 'opacity-60']],
                                  },
                                  null,
                                  a,
                                  r,
                                ),
                              );
                            }),
                            _: 1,
                          },
                          h,
                          x,
                        ),
                      ),
                      t('</div>')),
                  t('</div></div>'),
                  t(
                    I(
                      R,
                      {
                        style: k.drop ? null : { display: 'none' },
                        focus: '',
                        class:
                          'absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden',
                      },
                      {
                        default: r(({ close: e }, t, a, u) => {
                          if (!t)
                            return [
                              s(
                                'div',
                                {
                                  class:
                                    'divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-slate-900',
                                },
                                [
                                  s('div', { class: 'px-5 pt-5 pb-6' }, [
                                    s(
                                      'div',
                                      {
                                        class:
                                          'flex items-center justify-between',
                                      },
                                      [
                                        s('div', null, [
                                          s(
                                            'span',
                                            { class: 'sr-only' },
                                            o(k.appName),
                                            1,
                                          ),
                                          s(
                                            C,
                                            {
                                              to: { name: 'home' },
                                              onClick: e,
                                            },
                                            {
                                              default: r(({ isActive: e }) => [
                                                (n(),
                                                i(
                                                  'svg',
                                                  {
                                                    viewBox: '0 0 50 31',
                                                    class:
                                                      'h-6 w-auto text-indigo-500',
                                                  },
                                                  [
                                                    s('path', {
                                                      'fill-rule': 'evenodd',
                                                      'clip-rule': 'evenodd',
                                                      d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                                                      fill: 'currentColor',
                                                    }),
                                                  ],
                                                )),
                                              ]),
                                              _: 2,
                                            },
                                            1032,
                                            ['onClick'],
                                          ),
                                        ]),
                                        s('div', { class: '-mr-2' }, [
                                          s(
                                            T,
                                            {
                                              class:
                                                'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800',
                                            },
                                            {
                                              default: r(() => [
                                                s(
                                                  'span',
                                                  { class: 'sr-only' },
                                                  'Close menu',
                                                ),
                                                s(Y, {
                                                  class: 'h-6 w-6',
                                                  'aria-hidden': 'true',
                                                }),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                        ]),
                                      ],
                                    ),
                                  ]),
                                  s('div', { class: 'space-y-6 py-6 px-5' }, [
                                    s('div', { class: '' }, [
                                      g.authenticated &&
                                      g.roles &&
                                      (g.roles.admin || g.roles.superAdmin)
                                        ? (n(),
                                          i(
                                            'div',
                                            { key: 0, class: 'mb-6 text-left' },
                                            [
                                              s(
                                                C,
                                                {
                                                  to: { name: 'admin' },
                                                  class:
                                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                  onClick: e,
                                                },
                                                {
                                                  default: r(
                                                    ({ isActive: e }) => [
                                                      s(
                                                        'span',
                                                        {
                                                          class: [
                                                            e &&
                                                              'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                          ],
                                                        },
                                                        [
                                                          s($, {
                                                            class:
                                                              'float-left mr-2 h-6 w-6',
                                                          }),
                                                          d(' Admin '),
                                                        ],
                                                        2,
                                                      ),
                                                    ],
                                                  ),
                                                  _: 2,
                                                },
                                                1032,
                                                ['onClick'],
                                              ),
                                            ],
                                          ))
                                        : l('', !0),
                                      g.authenticated
                                        ? (n(),
                                          i(
                                            'div',
                                            { key: 1, class: 'mb-6 text-left' },
                                            [
                                              s(
                                                C,
                                                {
                                                  to: { name: 'dashboard' },
                                                  class:
                                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                  onClick: e,
                                                },
                                                {
                                                  default: r(
                                                    ({ isActive: e }) => [
                                                      s(
                                                        'span',
                                                        {
                                                          class: [
                                                            e &&
                                                              'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                          ],
                                                        },
                                                        [
                                                          s($, {
                                                            class:
                                                              'float-left mr-2 h-6 w-6',
                                                          }),
                                                          d(' Dashboard '),
                                                        ],
                                                        2,
                                                      ),
                                                    ],
                                                  ),
                                                  _: 2,
                                                },
                                                1032,
                                                ['onClick'],
                                              ),
                                            ],
                                          ))
                                        : l('', !0),
                                      s('div', { class: 'mb-6 text-left' }, [
                                        s(
                                          C,
                                          {
                                            to: { name: 'about' },
                                            class:
                                              'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                            onClick: e,
                                          },
                                          {
                                            default: r(({ isActive: e }) => [
                                              s(
                                                'span',
                                                {
                                                  class: [
                                                    e &&
                                                      'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                  ],
                                                },
                                                [
                                                  s(E, {
                                                    class:
                                                      'float-left mr-2 h-6 w-6',
                                                  }),
                                                  d(' About '),
                                                ],
                                                2,
                                              ),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ['onClick'],
                                        ),
                                      ]),
                                      s('div', { class: 'mb-6 text-left' }, [
                                        s(
                                          C,
                                          {
                                            to: { name: 'terms' },
                                            class:
                                              'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                            onClick: e,
                                          },
                                          {
                                            default: r(({ isActive: e }) => [
                                              s(
                                                'span',
                                                {
                                                  class: [
                                                    e &&
                                                      'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                  ],
                                                },
                                                [
                                                  s(O, {
                                                    class:
                                                      'float-left mr-2 h-6 w-6',
                                                  }),
                                                  d(' Terms '),
                                                ],
                                                2,
                                              ),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ['onClick'],
                                        ),
                                      ]),
                                      s('div', { class: 'mb-7 text-left' }, [
                                        g.authenticated
                                          ? (n(),
                                            i(
                                              C,
                                              {
                                                key: 0,
                                                to: { name: 'settings' },
                                                class:
                                                  'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                onClick: e,
                                              },
                                              {
                                                default: r(
                                                  ({ isActive: e }) => [
                                                    s(
                                                      'span',
                                                      {
                                                        class: [
                                                          e &&
                                                            'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                        ],
                                                      },
                                                      [
                                                        s(N, {
                                                          class:
                                                            'float-left mr-2 h-6 w-6',
                                                        }),
                                                        d(' Settings '),
                                                      ],
                                                      2,
                                                    ),
                                                  ],
                                                ),
                                                _: 2,
                                              },
                                              1032,
                                              ['onClick'],
                                            ))
                                          : l('', !0),
                                      ]),
                                      g.authenticated && g.user
                                        ? (n(),
                                          i(
                                            'div',
                                            {
                                              key: 2,
                                              class: [
                                                'mr-2 mb-10',
                                                k.loading
                                                  ? 'default disabled cursor-pointer'
                                                  : 'cursor-pointer',
                                              ],
                                              onClick: (e) => b.toggleTheme(),
                                            },
                                            [
                                              s(
                                                L,
                                                {
                                                  'default-checked':
                                                    g.user.theme_dark,
                                                  class: [
                                                    g.user.theme_dark
                                                      ? 'bg-gray-500'
                                                      : 'bg-gray-400',
                                                    'relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                                                  ],
                                                },
                                                {
                                                  default: r(() => [
                                                    s(
                                                      'span',
                                                      { class: 'sr-only' },
                                                      'Toggle Theme',
                                                    ),
                                                    s(
                                                      'span',
                                                      {
                                                        'aria-hidden': 'true',
                                                        class: [
                                                          g.user.theme_dark
                                                            ? 'translate-x-3 bg-gray-800'
                                                            : 'translate-x-0 bg-white',
                                                          'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                                        ],
                                                      },
                                                      null,
                                                      2,
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['default-checked', 'class'],
                                              ),
                                              s(
                                                'span',
                                                {
                                                  class:
                                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                },
                                                ' Toggle Theme ' +
                                                  o(
                                                    g.user.theme_dark
                                                      ? 'Light'
                                                      : 'Dark',
                                                  ),
                                                1,
                                              ),
                                            ],
                                            10,
                                            ['onClick'],
                                          ))
                                        : l('', !0),
                                      b.isImpersonating && g.authenticated
                                        ? (n(),
                                          i(
                                            'div',
                                            {
                                              key: 3,
                                              class: 'mb-8 text-left',
                                              style: { 'margin-top': '-0.5em' },
                                            },
                                            [
                                              s(
                                                'div',
                                                {
                                                  class:
                                                    'cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                                  onClick: (t) => (
                                                    b.leaveImpersonating(), e()
                                                  ),
                                                },
                                                [
                                                  s('span', {
                                                    class:
                                                      'fa-solid fa-user-secret fa-fw mr-2 ml-1',
                                                  }),
                                                  d(' Return to your account '),
                                                ],
                                                8,
                                                ['onClick'],
                                              ),
                                            ],
                                          ))
                                        : l('', !0),
                                    ]),
                                    g.authenticated
                                      ? l('', !0)
                                      : (n(),
                                        i('div', { key: 0 }, [
                                          s(
                                            C,
                                            { to: { name: 'register' } },
                                            {
                                              default: r(({ isActive: t }) => [
                                                s(
                                                  B,
                                                  {
                                                    primary: '',
                                                    text: 'Sign up',
                                                    class: [
                                                      'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700',
                                                      [t && 'opacity-60'],
                                                    ],
                                                    onClick: e,
                                                  },
                                                  null,
                                                  8,
                                                  ['class', 'onClick'],
                                                ),
                                              ]),
                                              _: 2,
                                            },
                                            1024,
                                          ),
                                          s(
                                            'p',
                                            {
                                              class:
                                                'mt-6 text-center text-base font-medium text-gray-500',
                                            },
                                            [
                                              d(
                                                ' Existing customer? ' +
                                                  o(' ') +
                                                  ' ',
                                              ),
                                              s(
                                                C,
                                                {
                                                  to: { name: 'login' },
                                                  class:
                                                    'whitespace-nowrap text-base font-medium text-indigo-500 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400',
                                                  onClick: e,
                                                },
                                                {
                                                  default: r(
                                                    ({ isActive: e }) => [
                                                      s(
                                                        'span',
                                                        {
                                                          class: [
                                                            e &&
                                                              'text-indigo-800 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-500',
                                                          ],
                                                        },
                                                        ' Sign in ',
                                                        2,
                                                      ),
                                                    ],
                                                  ),
                                                  _: 2,
                                                },
                                                1032,
                                                ['onClick'],
                                              ),
                                            ],
                                          ),
                                        ])),
                                    g.authenticated
                                      ? (n(),
                                        i('div', { key: 1 }, [
                                          s(
                                            B,
                                            {
                                              primary: '',
                                              text: 'Logout',
                                              type: 'button',
                                              class:
                                                'flex w-full items-center justify-center px-4 py-2',
                                              onClick: c(
                                                (e) => (
                                                  g.logout(), b.closeDrop()
                                                ),
                                                ['prevent'],
                                              ),
                                            },
                                            {
                                              text: r(() => [
                                                s(U, { class: 'mr-2 h-6 w-6' }),
                                                d(' Logout '),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['onClick'],
                                          ),
                                        ]))
                                      : l('', !0),
                                  ]),
                                ],
                              ),
                            ];
                          t(
                            `<div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-slate-900"${u}><div class="px-5 pt-5 pb-6"${u}><div class="flex items-center justify-between"${u}><div${u}><span class="sr-only"${u}>${D(
                              k.appName,
                            )}</span>`,
                          ),
                            t(
                              I(
                                C,
                                { to: { name: 'home' }, onClick: e },
                                {
                                  default: r(({ isActive: e }, t, a, r) => {
                                    if (!t)
                                      return [
                                        (n(),
                                        i(
                                          'svg',
                                          {
                                            viewBox: '0 0 50 31',
                                            class: 'h-6 w-auto text-indigo-500',
                                          },
                                          [
                                            s('path', {
                                              'fill-rule': 'evenodd',
                                              'clip-rule': 'evenodd',
                                              d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                                              fill: 'currentColor',
                                            }),
                                          ],
                                        )),
                                      ];
                                    t(
                                      `<svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500"${r}><path fill-rule="evenodd" clip-rule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="currentColor"${r}></path></svg>`,
                                    );
                                  }),
                                  _: 2,
                                },
                                a,
                                u,
                              ),
                            ),
                            t(`</div><div class="-mr-2"${u}>`),
                            t(
                              I(
                                T,
                                {
                                  class:
                                    'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-800',
                                },
                                {
                                  default: r((e, t, a, r) => {
                                    if (!t)
                                      return [
                                        s(
                                          'span',
                                          { class: 'sr-only' },
                                          'Close menu',
                                        ),
                                        s(Y, {
                                          class: 'h-6 w-6',
                                          'aria-hidden': 'true',
                                        }),
                                      ];
                                    t(
                                      `<span class="sr-only"${r}>Close menu</span>`,
                                    ),
                                      t(
                                        I(
                                          Y,
                                          {
                                            class: 'h-6 w-6',
                                            'aria-hidden': 'true',
                                          },
                                          null,
                                          a,
                                          r,
                                        ),
                                      );
                                  }),
                                  _: 2,
                                },
                                a,
                                u,
                              ),
                            ),
                            t(
                              `</div></div></div><div class="space-y-6 py-6 px-5"${u}><div class=""${u}>`,
                            ),
                            g.authenticated &&
                            g.roles &&
                            (g.roles.admin || g.roles.superAdmin)
                              ? (t(`<div class="mb-6 text-left"${u}>`),
                                t(
                                  I(
                                    C,
                                    {
                                      to: { name: 'admin' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                      onClick: e,
                                    },
                                    {
                                      default: r(({ isActive: e }, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              {
                                                class: [
                                                  e &&
                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                ],
                                              },
                                              [
                                                s($, {
                                                  class:
                                                    'float-left mr-2 h-6 w-6',
                                                }),
                                                d(' Admin '),
                                              ],
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="${P([
                                            e &&
                                              'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                          ])}"${r}>`,
                                        ),
                                          t(
                                            I(
                                              $,
                                              {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              },
                                              null,
                                              a,
                                              r,
                                            ),
                                          ),
                                          t(' Admin </span>');
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t('</div>'))
                              : t('\x3c!----\x3e'),
                            g.authenticated
                              ? (t(`<div class="mb-6 text-left"${u}>`),
                                t(
                                  I(
                                    C,
                                    {
                                      to: { name: 'dashboard' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                      onClick: e,
                                    },
                                    {
                                      default: r(({ isActive: e }, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              {
                                                class: [
                                                  e &&
                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                ],
                                              },
                                              [
                                                s($, {
                                                  class:
                                                    'float-left mr-2 h-6 w-6',
                                                }),
                                                d(' Dashboard '),
                                              ],
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="${P([
                                            e &&
                                              'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                          ])}"${r}>`,
                                        ),
                                          t(
                                            I(
                                              $,
                                              {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              },
                                              null,
                                              a,
                                              r,
                                            ),
                                          ),
                                          t(' Dashboard </span>');
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t('</div>'))
                              : t('\x3c!----\x3e'),
                            t(`<div class="mb-6 text-left"${u}>`),
                            t(
                              I(
                                C,
                                {
                                  to: { name: 'about' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                  onClick: e,
                                },
                                {
                                  default: r(({ isActive: e }, t, a, r) => {
                                    if (!t)
                                      return [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                            ],
                                          },
                                          [
                                            s(E, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                            d(' About '),
                                          ],
                                          2,
                                        ),
                                      ];
                                    t(
                                      `<span class="${P([
                                        e &&
                                          'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                      ])}"${r}>`,
                                    ),
                                      t(
                                        I(
                                          E,
                                          { class: 'float-left mr-2 h-6 w-6' },
                                          null,
                                          a,
                                          r,
                                        ),
                                      ),
                                      t(' About </span>');
                                  }),
                                  _: 2,
                                },
                                a,
                                u,
                              ),
                            ),
                            t(`</div><div class="mb-6 text-left"${u}>`),
                            t(
                              I(
                                C,
                                {
                                  to: { name: 'terms' },
                                  class:
                                    'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                  onClick: e,
                                },
                                {
                                  default: r(({ isActive: e }, t, a, r) => {
                                    if (!t)
                                      return [
                                        s(
                                          'span',
                                          {
                                            class: [
                                              e &&
                                                'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                            ],
                                          },
                                          [
                                            s(O, {
                                              class: 'float-left mr-2 h-6 w-6',
                                            }),
                                            d(' Terms '),
                                          ],
                                          2,
                                        ),
                                      ];
                                    t(
                                      `<span class="${P([
                                        e &&
                                          'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                      ])}"${r}>`,
                                    ),
                                      t(
                                        I(
                                          O,
                                          { class: 'float-left mr-2 h-6 w-6' },
                                          null,
                                          a,
                                          r,
                                        ),
                                      ),
                                      t(' Terms </span>');
                                  }),
                                  _: 2,
                                },
                                a,
                                u,
                              ),
                            ),
                            t(`</div><div class="mb-7 text-left"${u}>`),
                            g.authenticated
                              ? t(
                                  I(
                                    C,
                                    {
                                      to: { name: 'settings' },
                                      class:
                                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                                      onClick: e,
                                    },
                                    {
                                      default: r(({ isActive: e }, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              {
                                                class: [
                                                  e &&
                                                    'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                                ],
                                              },
                                              [
                                                s(N, {
                                                  class:
                                                    'float-left mr-2 h-6 w-6',
                                                }),
                                                d(' Settings '),
                                              ],
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="${P([
                                            e &&
                                              'text-gray-800 hover:text-gray-900 dark:text-gray-600',
                                          ])}"${r}>`,
                                        ),
                                          t(
                                            I(
                                              N,
                                              {
                                                class:
                                                  'float-left mr-2 h-6 w-6',
                                              },
                                              null,
                                              a,
                                              r,
                                            ),
                                          ),
                                          t(' Settings </span>');
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                )
                              : t('\x3c!----\x3e'),
                            t('</div>'),
                            g.authenticated && g.user
                              ? (t(
                                  `<div class="${P([
                                    k.loading
                                      ? 'default disabled cursor-pointer'
                                      : 'cursor-pointer',
                                    'mr-2 mb-10',
                                  ])}"${u}>`,
                                ),
                                t(
                                  I(
                                    L,
                                    {
                                      'default-checked': g.user.theme_dark,
                                      class: [
                                        g.user.theme_dark
                                          ? 'bg-gray-500'
                                          : 'bg-gray-400',
                                        'relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                                      ],
                                    },
                                    {
                                      default: r((e, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              { class: 'sr-only' },
                                              'Toggle Theme',
                                            ),
                                            s(
                                              'span',
                                              {
                                                'aria-hidden': 'true',
                                                class: [
                                                  g.user.theme_dark
                                                    ? 'translate-x-3 bg-gray-800'
                                                    : 'translate-x-0 bg-white',
                                                  'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                                ],
                                              },
                                              null,
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="sr-only"${r}>Toggle Theme</span><span aria-hidden="true" class="${P(
                                            [
                                              g.user.theme_dark
                                                ? 'translate-x-3 bg-gray-800'
                                                : 'translate-x-0 bg-white',
                                              'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                                            ],
                                          )}"${r}></span>`,
                                        );
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t(
                                  `<span class="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"${u}> Toggle Theme ${D(
                                    g.user.theme_dark ? 'Light' : 'Dark',
                                  )}</span></div>`,
                                ))
                              : t('\x3c!----\x3e'),
                            b.isImpersonating && g.authenticated
                              ? t(
                                  `<div class="mb-8 text-left" style="${H({
                                    'margin-top': '-0.5em',
                                  })}"${u}><div class="cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"${u}><span class="fa-solid fa-user-secret fa-fw mr-2 ml-1"${u}></span> Return to your account </div></div>`,
                                )
                              : t('\x3c!----\x3e'),
                            t('</div>'),
                            g.authenticated
                              ? t('\x3c!----\x3e')
                              : (t(`<div${u}>`),
                                t(
                                  I(
                                    C,
                                    { to: { name: 'register' } },
                                    {
                                      default: r(({ isActive: t }, a, r, o) => {
                                        if (!a)
                                          return [
                                            s(
                                              B,
                                              {
                                                primary: '',
                                                text: 'Sign up',
                                                class: [
                                                  'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700',
                                                  [t && 'opacity-60'],
                                                ],
                                                onClick: e,
                                              },
                                              null,
                                              8,
                                              ['class', 'onClick'],
                                            ),
                                          ];
                                        a(
                                          I(
                                            B,
                                            {
                                              primary: '',
                                              text: 'Sign up',
                                              class: [
                                                'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700',
                                                [t && 'opacity-60'],
                                              ],
                                              onClick: e,
                                            },
                                            null,
                                            r,
                                            o,
                                          ),
                                        );
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t(
                                  `<p class="mt-6 text-center text-base font-medium text-gray-500"${u}> Existing customer? ${D(
                                    ' ',
                                  )} `,
                                ),
                                t(
                                  I(
                                    C,
                                    {
                                      to: { name: 'login' },
                                      class:
                                        'whitespace-nowrap text-base font-medium text-indigo-500 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400',
                                      onClick: e,
                                    },
                                    {
                                      default: r(({ isActive: e }, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(
                                              'span',
                                              {
                                                class: [
                                                  e &&
                                                    'text-indigo-800 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-500',
                                                ],
                                              },
                                              ' Sign in ',
                                              2,
                                            ),
                                          ];
                                        t(
                                          `<span class="${P([
                                            e &&
                                              'text-indigo-800 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-500',
                                          ])}"${r}> Sign in </span>`,
                                        );
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t('</p></div>')),
                            g.authenticated
                              ? (t(`<div${u}>`),
                                t(
                                  I(
                                    B,
                                    {
                                      primary: '',
                                      text: 'Logout',
                                      type: 'button',
                                      class:
                                        'flex w-full items-center justify-center px-4 py-2',
                                      onClick: (e) => (
                                        g.logout(), b.closeDrop()
                                      ),
                                    },
                                    {
                                      text: r((e, t, a, r) => {
                                        if (!t)
                                          return [
                                            s(U, { class: 'mr-2 h-6 w-6' }),
                                            d(' Logout '),
                                          ];
                                        t(
                                          I(
                                            U,
                                            { class: 'mr-2 h-6 w-6' },
                                            null,
                                            a,
                                            r,
                                          ),
                                        ),
                                          t(' Logout ');
                                      }),
                                      _: 2,
                                    },
                                    a,
                                    u,
                                  ),
                                ),
                                t('</div>'))
                              : t('\x3c!----\x3e'),
                            t('</div></div>');
                        }),
                        _: 1,
                      },
                      h,
                      x,
                    ),
                  );
              }),
              _: 1,
            },
            x,
          ),
        );
      },
    ],
  ]),
  ge = {
    name: 'AppFooter',
    components: {},
    props: {
      footerClass: {
        type: String,
        default: 'max-w-container mx-auto mt-32 w-full px-4 sm:px-6 lg:px-8',
      },
      borderClass: {
        type: String,
        default: 'border-slate-900/5 dark:border-slate-700',
      },
    },
    setup: () => ({}),
    data: () => ({ company: 'Jeremy Edgar Kenedy' }),
    computed: {
      theYear() {
        const e = '2022',
          t = new Date().getFullYear();
        return t == e ? t : `${e}-${t}`;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    beforeUnmount() {},
    updated() {},
    methods: {},
  };
const he = ge.setup;
ge.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/AppFooter.vue',
    ),
    he ? he(e, t) : void 0
  );
};
const xe = ce(ge, [
    [
      'ssrRender',
      function (e, t, r, s, o, n, i, l) {
        t(
          `<footer${G(a({ class: o.footerClass }, s))}><div class="${P([
            o.borderClass,
            'border-t py-4',
          ])}"><p class="text-center text-sm leading-6 text-slate-500 dark:text-gray-300"> © ${D(
            l.theYear,
          )} ${D(i.company)}. All rights reserved. </p></div></footer>`,
        );
      },
    ],
  ]),
  fe = {
    props: {
      stroke: { type: String, default: '#fff' },
      w: { type: Number, default: 38 },
      h: { type: Number, default: 38 },
    },
    computed: {
      viewBox() {
        return `0 0 ${this.w} ${this.h}`;
      },
    },
  };
const ye = fe.setup;
fe.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/CircleSvg.vue',
    ),
    ye ? ye(e, t) : void 0
  );
};
const ve = ce(fe, [
    [
      'ssrRender',
      function (e, t, r, s, o, n, i, l) {
        t(
          `<svg${G(
            a(
              {
                width: o.w,
                height: o.h,
                viewBox: l.viewBox,
                xmlns: 'http://www.w3.org/2000/svg',
                stroke: o.stroke,
              },
              s,
            ),
          )}><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".8" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g></svg>`,
        );
      },
    ],
  ]),
  ke = {
    name: 'VerifyNotice',
    components: { CircleSvg: ve },
    props: { id: { type: Number, required: !0 } },
    data: () => ({ sent: !1, loading: !1 }),
    computed: {
      ...y({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        roles: 'auth/roles',
      }),
    },
    methods: {
      ...v({ verifyResend: 'auth/verifyResend', popToast: 'toast/popToast' }),
      async resend() {
        this.loading = !0;
        try {
          await this.verifyResend({ id: this.id }).then((e) => {
            (this.sent = !0),
              (this.loading = !1),
              this.popToast({
                message: 'Email sent.',
                timer: 5e3,
                icon: 'success',
              });
          });
        } catch (e) {
          this.popToast({
            message: 'An errored, please try again later.',
            timer: 5e3,
            icon: 'error',
          }),
            (this.loading = !1);
        }
      },
    },
  };
const be = ke.setup;
ke.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/VerifyNotice.vue',
    ),
    be ? be(e, t) : void 0
  );
};
const we = ce(ke, [
  [
    'ssrRender',
    function (t, s, c, u, p, m, g, h) {
      const x = e('AppButton'),
        f = e('CircleSvg');
      s(
        `<div${G(
          a(
            {
              class:
                'w-full bg-yellow-500 p-2 text-white opacity-90 shadow-md hover:opacity-100',
            },
            u,
          ),
        )}><div class="mx-auto flex max-w-screen-lg items-center justify-between"><div>${D(
          g.loading
            ? 'Resending verification email to ' + t.user.email
            : g.sent
            ? 'A verification has been sent. Please check your mail inbox!'
            : 'Your email address is not verified. please check your mail inbox!',
        )}</div>`,
      ),
        s(
          I(
            x,
            {
              primary: '',
              loading: g.loading,
              disabled: g.sent,
              'btn-class':
                'leading-snug inline-block px-5 py-1 text-xs font-medium',
              onClick: h.resend,
            },
            {
              text: r((e, t, a, r) => {
                if (!t)
                  return [
                    g.loading
                      ? (n(), i(f, { key: 0, class: 'mr-2 h-3 w-3' }))
                      : l('', !0),
                    d(
                      ' ' +
                        o(
                          g.loading
                            ? 'Sending'
                            : g.sent
                            ? 'Email Sent!'
                            : 'Resend link?',
                        ),
                      1,
                    ),
                  ];
                g.loading
                  ? t(I(f, { class: 'mr-2 h-3 w-3' }, null, a, r))
                  : t('\x3c!----\x3e'),
                  t(
                    ` ${D(
                      g.loading
                        ? 'Sending'
                        : g.sent
                        ? 'Email Sent!'
                        : 'Resend link?',
                    )}`,
                  );
              }),
              _: 1,
            },
            c,
          ),
        ),
        s('</div></div>');
    },
  ],
]);
function Ce(e, t = 'click event', a = 'clicked', r = 1) {
  GA_ENABLED &&
    this.$gtag.event(e, { event_category: t, event_label: a, value: r });
}
const Te = {
  name: 'OctoCat',
  props: {
    url: {
      type: String,
      default: 'https://github.com/jeremykenedy/laravel-spa',
    },
  },
  data: () => ({}),
  methods: { ...v({ popToast: 'toast/popToast' }), track: Ce },
};
const _e = Te.setup;
Te.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/OctoCat.vue',
    ),
    _e ? _e(e, t) : void 0
  );
};
const Ae = {
  components: {
    AppNav: me,
    VerifyNotice: we,
    AppFooter: xe,
    OctoCat: ce(Te, [
      [
        'ssrRender',
        function (e, t, r, s, o, n, i, l) {
          t(
            `<a${G(
              a(
                {
                  href: o.url,
                  class: 'github-corner',
                  'aria-label': 'View source on GitHub',
                  target: '_blank',
                },
                s,
              ),
            )} data-v-42300ba5><svg width="80" height="80" viewBox="0 0 250 250" style="${H(
              {
                fill: '#151513',
                color: '#fff',
                position: 'absolute',
                top: '0',
                border: '0',
                right: '0',
              },
            )}" aria-hidden="true" data-v-42300ba5><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" data-v-42300ba5></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="${H(
              { 'transform-origin': '130px 106px' },
            )}" class="octo-arm" data-v-42300ba5></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body" data-v-42300ba5></path></svg></a>`,
          );
        },
      ],
      ['__scopeId', 'data-v-42300ba5'],
    ]),
  },
  computed: {
    ...y({ authenticated: 'auth/authenticated', user: 'auth/user' }),
    currentRouteName() {
      return this.$route.name;
    },
    isAdminPage() {
      return (
        'admin' == this.currentRouteName ||
        'roles' == this.currentRouteName ||
        'permissions' == this.currentRouteName ||
        'settings' == this.currentRouteName ||
        'users' == this.currentRouteName ||
        'app-settings' == this.currentRouteName ||
        'phpinfo' == this.currentRouteName
      );
    },
    showOctoCat() {
      return (
        'home' == this.currentRouteName ||
        'about' == this.currentRouteName ||
        'terms' == this.currentRouteName
      );
    },
  },
  methods: { ...v({ popToast: 'toast/popToast' }) },
};
const Se = Ae.setup;
Ae.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add('resources/js/views/App.vue'),
    Se ? Se(e, t) : void 0
  );
};
const $e = ce(Ae, [
  [
    'ssrRender',
    function (t, o, l, d, c, u, p, g) {
      const x = e('OctoCat'),
        f = e('VerifyNotice'),
        y = e('AppNav'),
        v = e('router-view'),
        k = e('AppFooter'),
        b = e('AppToast');
      o(
        `<div${G(
          a({ class: 'min-h-screen bg-white dark:bg-slate-800' }, d),
        )}><div id="top_border"></div>`,
      ),
        g.showOctoCat ? o(I(x, null, null, l)) : o('\x3c!----\x3e'),
        'home' !== t.$route.name &&
        'verify-email' !== t.$route.name &&
        t.authenticated &&
        t.user &&
        t.user.id &&
        !t.user.email_verified_at &&
        !g.isAdminPage
          ? o(I(f, { id: t.user.id }, null, l))
          : o('\x3c!----\x3e'),
        g.isAdminPage ? o('\x3c!----\x3e') : o(I(y, null, null, l)),
        o('<div class="w-full">'),
        o(
          I(
            v,
            { class: g.isAdminPage ? '' : 'p-6' },
            {
              default: r(({ Component: e }, t, a, o) => {
                if (!t)
                  return [
                    s(
                      m,
                      { name: 'fade', mode: 'out-in' },
                      { default: r(() => [(n(), i(h(e)))]), _: 2 },
                      1024,
                    ),
                  ];
                t(''), Y(t, s(h(e), null, null), a, o);
              }),
              _: 1,
            },
            l,
          ),
        ),
        o('</div>'),
        g.isAdminPage
          ? o('\x3c!----\x3e')
          : o(I(k, { class: 'sticky top-[100vh] w-full' }, null, l)),
        o(I(b, null, null, l)),
        o('</div>');
    },
  ],
]);
function Ee({ store: e, next: t }) {
  return e.getters['auth/authenticated'] ? t() : t({ name: 'login' });
}
function Oe({ store: e, next: t }) {
  return e.getters['auth/authenticated'] ? t({ name: 'dashboard' }) : t();
}
const Be = [
    {
      path: '/',
      component: () => import('./assets/Home-092f52e0.mjs'),
      name: 'home',
    },
    {
      path: '/about',
      component: () => import('./assets/About-8055ba51.mjs'),
      name: 'about',
    },
    {
      path: '/terms',
      component: () => import('./assets/Terms-3b1605fc.mjs'),
      name: 'terms',
    },
    {
      path: '/dashboard',
      component: () => import('./assets/Dashboard-00d0a96f.mjs'),
      name: 'dashboard',
      meta: { middleware: [Ee] },
    },
    {
      path: '/admin',
      component: () => import('./assets/AdminLayout-b06d3e9f.mjs'),
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('./assets/Admin-1aef526f.mjs'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('./assets/Users-fcead5b0.mjs'),
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('./assets/Roles-53fcb449.mjs'),
        },
        {
          path: 'permissions',
          name: 'permissions',
          component: () => import('./assets/Permissions-d779932d.mjs'),
        },
        {
          path: 'phpinfo',
          name: 'phpinfo',
          component: x(() => import('./assets/PhpInfo-c54b8303.mjs')),
        },
        {
          path: 'app-settings',
          name: 'app-settings',
          component: () => import('./assets/AppSettings-493dc486.mjs'),
        },
      ],
      meta: {
        middleware: [
          function ({ store: e, next: t }) {
            return e.getters['auth/authenticated'] &&
              (e.state.auth.roles.superAdmin || e.state.auth.roles.admin)
              ? t()
              : t({ name: 'NotFound' });
          },
        ],
      },
    },
    {
      path: '/login',
      component: () => import('./assets/Login-3d895534.mjs'),
      name: 'login',
      meta: { middleware: [Oe] },
    },
    {
      path: '/forgot-password',
      component: () => import('./assets/ForgotPassword-ca93934f.mjs'),
      name: 'forgot-password',
      meta: { middleware: [Oe] },
    },
    {
      path: '/reset-password/:token',
      props: (e) => ({ token: e.params.token, email: e.query.email }),
      component: () => import('./assets/ResetPassword-4e7ca3b7.mjs'),
      name: 'reset-password',
      meta: { middleware: [Oe] },
    },
    {
      path: '/register',
      component: () => import('./assets/Register-c8d7fa41.mjs'),
      name: 'register',
      meta: { middleware: [Oe] },
    },
    {
      path: '/verify-email/:id/:hash',
      props: (e) => ({ id: e.params.id, hash: e.params.hash }),
      component: () => import('./assets/VerifyEmail-3b245fb1.mjs'),
      name: 'verify-email',
    },
    {
      path: '/settings',
      component: () => import('./assets/Settings-a3568c63.mjs'),
      redirect: { name: 'account' },
      name: 'settings',
      meta: { middleware: [Ee] },
      children: [
        {
          path: 'account',
          component: () => import('./assets/Account-db07883a.mjs'),
          name: 'account',
          meta: { middleware: [Ee] },
        },
        {
          path: 'profile',
          component: () => import('./assets/Profile-8dc4ce3e.mjs'),
          name: 'profile',
          meta: { middleware: [Ee] },
        },
        {
          path: 'password',
          component: () => import('./assets/Password-0f549b05.mjs'),
          name: 'password',
          meta: { middleware: [Ee] },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./assets/NotFound-52f67599.mjs'),
      name: 'NotFound',
    },
  ],
  Le = k({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      auth: {
        namespaced: !0,
        state: () => ({
          authenticated: !1,
          user: null,
          roles: {
            superAdmin: !1,
            admin: !1,
            moderator: !1,
            editor: !1,
            user: !1,
          },
          token: J.get('token'),
          logins: {
            facebook: !1,
            twitter: !1,
            instagram: !1,
            github: !1,
            youtube: !1,
            google: !1,
            linkedin: !1,
            twitch: !1,
            apple: !1,
            microsoft: !1,
            tiktok: !1,
            zoho: !1,
            stackexchange: !1,
            gitlab: !1,
            reddit: !1,
            snapchat: !1,
            meetup: !1,
            bitbucket: !1,
            atlassian: !1,
          },
          currentUserToken: null,
          impersonatorToken: null,
        }),
        getters: {
          user: (e) => e.user,
          roles: (e) => e.roles,
          verified: (e) => (e.user ? e.user.email_verified_at : null),
          id: (e) => (e.user ? e.user.id : null),
          authenticated: (e) => e.authenticated,
          token: (e) => e.token,
          logins: (e) => e.logins,
          currentUserToken: (e) => e.currentUserToken,
          impersonatorToken: (e) => e.impersonatorToken,
        },
        mutations: {
          SET_AUTHENTICATION(e, t = !1) {
            e.authenticated = t;
          },
          SET_USER(e, t = null) {
            (e.user = t),
              t && t.roles && t.roles.length > 0
                ? t.roles.forEach((t, a) => {
                    'Super Admin' == t.name && (e.roles.superAdmin = !0),
                      'Admin' == t.name && (e.roles.admin = !0),
                      'Moderator' == t.name && (e.roles.moderator = !0),
                      'Editor' == t.name && (e.roles.editor = !0),
                      'User' == t.name && (e.roles.user = !0);
                  })
                : (e.roles = {
                    superAdmin: !1,
                    admin: !1,
                    moderator: !1,
                    editor: !1,
                    user: !1,
                  });
          },
          SET_THEME(e, t = null) {
            t
              ? document.documentElement.classList.add('dark')
              : document.documentElement.classList.remove('dark');
          },
          SET_TOKEN(e, { token: t, remember: a }) {
            (e.token = t), J.set('token', t, { expires: a ? 365 : null });
          },
          SET_WORKING_TOKENS(e, t) {
            (e.currentUserToken = t.currentUserToken),
              (e.impersonatorToken = t.impersonatorToken);
          },
          SET_LOGINS(e, t = null) {
            t && (e.logins = t);
          },
          LOGOUT(e) {
            (e.authenticated = !1),
              (e.user = null),
              (e.roles = {
                superAdmin: !1,
                admin: !1,
                moderator: !1,
                editor: !1,
                user: !1,
              }),
              document.documentElement.classList.remove('dark'),
              (e.token = null),
              (e.currentUserToken = null),
              (e.impersonatorToken = null),
              J.remove('token'),
              window.sessionStorage.clear();
          },
        },
        actions: {
          async login({ dispatch: e }, t) {
            try {
              await Z.get('/sanctum/csrf-cookie'),
                await Z.post('/api/login', t)
                  .then((t) => e('getUser'))
                  .catch((e) => {
                    throw e.response;
                  });
            } catch (a) {
              throw a;
            }
            Ue.push({ name: 'dashboard' });
          },
          async register({ commit: e }, t) {
            await Z.get('/sanctum/csrf-cookie');
            const a = await Z.post('/api/register', t);
            if (201 == a.status && a && a.data && a.data.user && a.data.user.id)
              return (
                e('SET_USER', a.data.user),
                e('SET_THEME', a.data.user.theme_dark),
                e('SET_AUTHENTICATION', !0),
                a
              );
            throw (e('LOGOUT'), a.response);
          },
          async logout({ commit: e }) {
            await Z.post('/api/logout')
              .then((t) => {
                e('LOGOUT');
              })
              .catch((e) => {}),
              Ue.push({ name: 'home' });
          },
          async getUser({ commit: e }) {
            await Z.get('/api/user')
              .then((t) => {
                t && t.data && t.data.id
                  ? (e('SET_USER', t.data),
                    e('SET_THEME', t.data.theme_dark),
                    e('SET_AUTHENTICATION', !0))
                  : e('LOGOUT');
              })
              .catch((t) => {
                throw (e('LOGOUT'), t.response);
              });
          },
          async getUserByToken({ commit: e, dispatch: t }, a) {
            await Z.post('/api/user-by-token', { token: a.token })
              .then((t) => {
                t && t.data && t.data.id
                  ? (e('SET_USER', t.data),
                    e('SET_THEME', t.data.theme_dark),
                    e('SET_AUTHENTICATION', !0))
                  : e('LOGOUT');
              })
              .catch((t) => {
                throw (e('LOGOUT'), t.response);
              });
          },
          async profile({ commit: e }, t) {
            const a = await Z.patch('/api/profile', t);
            if (200 == a.status && a && a.data && a.data.user && a.data.user.id)
              return (
                e('SET_USER', a.data.user),
                e('SET_THEME', a.data.user.theme_dark),
                e('SET_AUTHENTICATION', !0),
                a
              );
            throw a.response;
          },
          async theme({ commit: e }, t) {
            const a = await Z.patch('/api/theme', t);
            if (200 == a.status && a && a.data && a.data.user && a.data.user.id)
              return (
                e('SET_USER', a.data.user),
                e('SET_THEME', a.data.user.theme_dark),
                e('SET_AUTHENTICATION', !0),
                a
              );
            throw a.response;
          },
          async password({ dispatch: e }, t) {
            const a = await Z.patch('/api/password', t);
            if (
              200 == a.status &&
              a &&
              a.data &&
              a.data.message &&
              'Password Updated Successfully' == a.data.message
            )
              return 'Success';
            throw a.response;
          },
          async verifyResend({ dispatch: e }, t) {
            const a = await Z.post('/api/verify-resend', t);
            if (200 != a.status) throw a;
            return a;
          },
          async verifyEmail({ dispatch: e }, t) {
            const a = await Z.post(`/api/verify-email/${t.id}/${t.hash}`);
            if (200 != a.status) throw a;
            return e('getUser'), a;
          },
          async forgotPassword({ dispatch: e }, t) {
            try {
              const e = await Z.post('/api/forgot-password', t);
              if (e && e.status && 200 == e.status && e.data && e.data.message)
                return e.data.message;
              throw e;
            } catch (a) {
              throw a;
            }
          },
          async resetPassword({ dispatch: e }, t) {
            try {
              const e = await Z.post('/api/reset-password', t);
              if (e && e.status && 200 == e.status && e.data && e.data.message)
                return e.data.message;
              throw e;
            } catch (a) {
              throw a;
            }
          },
          async fetchOauthUrl(e, { provider: t }) {
            try {
              const e = await Z.post(`/api/oauth/${t}`);
              if (e && e.data && e.data.url) return e.data.url;
              throw e;
            } catch (a) {
              throw a;
            }
          },
          async saveToken({ commit: e, dispatch: t }, a) {
            e('SET_TOKEN', a);
          },
          async getLogins({ commit: e }) {
            await Z.get('/api/logins')
              .then((t) => {
                if (!(t && t.data && t.data.logins)) throw t;
                e('SET_LOGINS', t.data.logins);
              })
              .catch((e) => {
                throw e.response;
              });
          },
          revokeProvider: async ({ commit: e, dispatch: t }, a) =>
            await Z.post(`/api/oauth-revoke/${a.id}`)
              .then((t) => {
                if (
                  t.status &&
                  200 == t.status &&
                  t.data &&
                  t.data.status &&
                  'success' == t.data.status &&
                  t.data.user &&
                  t.data.user.id
                )
                  return e('SET_USER', t.data.user), t;
                throw t;
              })
              .catch((e) => {
                throw e.response;
              }),
          deleteAccount: async ({ commit: e, dispatch: t }, a) =>
            await Z.delete(`/api/account/${a.id}/delete`)
              .then((t) => {
                if (
                  t.status &&
                  200 == t.status &&
                  t.data &&
                  t.data.status &&
                  'success' == t.data.status &&
                  !t.data.user
                )
                  return e('LOGOUT'), Ue.push({ name: 'home' }), t;
                throw t;
              })
              .catch((e) => {
                throw e.response;
              }),
          async impersonateUser({ commit: e, dispatch: t }, a) {
            await Z.get(`/api/impersonate/take/${a.user.id}`)
              .then((r) => {
                r && r.data && r.data.data && r.data.data.token
                  ? (e('LOGOUT'),
                    e('SET_WORKING_TOKENS', {
                      currentUserToken: r.data.data.token,
                      impersonatorToken: r.data.data.impersonatorToken,
                    }),
                    t('getUserByToken', { token: r.data.data.token }),
                    Ue.push({ name: 'home' }),
                    t(
                      'toast/popToast',
                      {
                        message: `Stealh mode activated. You are now acting as ${a.user.name}`,
                        timer: 5e3,
                        icon: 'success',
                      },
                      { root: !0 },
                    ))
                  : t(
                      'toast/popToast',
                      {
                        message: 'An error occurred, you are still yourself.',
                        timer: 5e3,
                        icon: 'error',
                      },
                      { root: !0 },
                    );
              })
              .catch((e) => {
                throw (
                  (t(
                    'toast/popToast',
                    {
                      message: 'An error occurred, you are still yourself.',
                      timer: 5e3,
                      icon: 'error',
                    },
                    { root: !0 },
                  ),
                  e.response)
                );
              });
          },
          async leaveImpersonatingUser({ commit: e, dispatch: t }, a) {
            await Z.get('/api/impersonate/leave')
              .then((a) => {
                a && a.data && a.data.data && a.data.data.token
                  ? (e('LOGOUT'),
                    t('getUserByToken', { token: a.data.data.token }),
                    Ue.push({ name: 'home' }),
                    t(
                      'toast/popToast',
                      {
                        message: 'You wake up and realize it was all dream!',
                        timer: 5e3,
                        icon: 'success',
                      },
                      { root: !0 },
                    ))
                  : t(
                      'toast/popToast',
                      {
                        message:
                          'An error occurred, you are still are not yourself!',
                        timer: 5e3,
                        icon: 'error',
                      },
                      { root: !0 },
                    );
              })
              .catch((e) => {
                throw (
                  (t(
                    'toast/popToast',
                    {
                      message: 'An error occurred, you are still yourself.',
                      timer: 5e3,
                      icon: 'error',
                    },
                    { root: !0 },
                  ),
                  e.response)
                );
              });
          },
        },
      },
      toast: {
        namespaced: !0,
        state: {
          toast: {
            icon: 'success',
            message: null,
            position: 'top-end',
            showConfirmButton: !1,
            timer: 3e3,
            timerProgressBar: !0,
            showCloseButton: !1,
          },
        },
        getters: { toast: (e) => e.toast },
        mutations: {
          SET_TOAST(e, t) {
            Object.prototype.hasOwnProperty.call(t, 'message') &&
              (e.toast.message = t.message),
              Object.prototype.hasOwnProperty.call(t, 'position') &&
                (e.toast.position = t.position),
              Object.prototype.hasOwnProperty.call(t, 'icon') &&
                (e.toast.icon = t.icon),
              Object.prototype.hasOwnProperty.call(t, 'showConfirmButton') &&
                (e.toast.showConfirmButton = t.showConfirmButton),
              Object.prototype.hasOwnProperty.call(t, 'timer') &&
                (e.toast.timer = t.timer),
              Object.prototype.hasOwnProperty.call(t, 'timerProgressBar') &&
                (e.toast.timerProgressBar = t.timerProgressBar),
              Object.prototype.hasOwnProperty.call(t, 'showCloseButton') &&
                (e.toast.showCloseButton = t.showCloseButton);
          },
        },
        actions: {
          popToast({ commit: e }, t) {
            e('SET_TOAST', {
              icon: 'success',
              message: null,
              position: 'bottom-end',
              showConfirmButton: !1,
              timer: 3e3,
              timerProgressBar: !0,
              showCloseButton: !1,
            }),
              e('SET_TOAST', t);
          },
          clearToast({ commit: e }) {
            e('SET_TOAST', {
              icon: 'success',
              message: null,
              position: 'bottom-end',
              showConfirmButton: !1,
              timer: 0,
              timerProgressBar: !0,
              showCloseButton: !1,
            });
          },
        },
      },
      sidebar: {
        namespaced: !0,
        state: () => ({ sideBarOpen: !1, fullScreenSideBarOpen: !0 }),
        getters: {
          sideBarOpen: (e) => e.sideBarOpen,
          fullScreenSideBarOpen: (e) => e.fullScreenSideBarOpen,
        },
        mutations: {
          toggleSidebar(e) {
            e.sideBarOpen = !e.sideBarOpen;
          },
          toggleFullScreenSidebar(e) {
            e.fullScreenSideBarOpen = !e.fullScreenSideBarOpen;
          },
        },
        actions: {
          toggleSidebar(e) {
            e.commit('toggleSidebar');
          },
          toggleFullScreenSidebar(e) {
            e.commit('toggleFullScreenSidebar');
          },
        },
      },
    },
    plugins: [
      X({ predicate: ['SET_USER', 'SET_AUTHENTICATION', 'SET_THEME'] }),
      Q({ storage: window.sessionStorage }),
    ],
  });
function je(e, t, a) {
  const r = t[a];
  return r
    ? (s) => {
        if (s) return e.next(s);
        r({ ...e, next: je(e, t, a + 1) });
      }
    : e.next;
}
const Ne = V({ history: K(), routes: Be });
Ne.beforeEach((e, t, a) => {
  if (!e.meta.middleware) return a();
  const { middleware: r } = e.meta,
    s = { to: e, from: t, store: Le, next: a };
  return r[0]({ ...s, next: je(s, r, 1) });
}),
  q(Ne);
const Ue = Ne,
  Re = {
    name: 'AppButton',
    components: {},
    props: {
      loading: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      text: { type: String, default: '' },
      icon: { type: String, default: null },
      btnClass: { type: String, default: '' },
      primary: { type: Boolean, default: !1 },
      secondary: { type: Boolean, default: !1 },
      accent: { type: Boolean, default: !1 },
      outline: { type: Boolean, default: !1 },
      success: { type: Boolean, default: !1 },
      warning: { type: Boolean, default: !1 },
      danger: { type: Boolean, default: !1 },
      info: { type: Boolean, default: !1 },
      transparent: { type: Boolean, default: !1 },
    },
    data: () => ({}),
    computed: {
      hasTextSlot() {
        return this.$slots.text;
      },
      btnClasses() {
        let e =
          '\n        px-4\n        py-3\n        whitespace-nowrap\n        rounded\n        text-base\n        font-medium\n        leading-none\n        shadow-sm\n        transition\n        duration-150\n        ease-in-out\n      ';
        return (
          this.primary
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-indigo-600\n          hover:bg-indigo-900\n          dark:bg-indigo-600\n          dark:hover:bg-indigo-400\n          border-indigo-600\n          hover:border-indigo-900\n          dark:border-indigo-600\n          dark:hover:border-indigo-400\n          border-1\n          border\n        ')
            : this.secondary
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-slate-600\n          hover:bg-slate-900\n          dark:bg-slate-600\n          dark:hover:bg-slate-400\n          border-slate-600\n          hover:border-slate-900\n          dark:border-slate-600\n          dark:hover:border-slate-400\n          border-1\n          border\n        ')
            : this.info
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-blue-600\n          hover:bg-blue-900\n          dark:bg-blue-600\n          dark:hover:bg-blue-400\n          border-blue-600\n          hover:border-blue-900\n          dark:border-blue-600\n          dark:hover:border-blue-400\n          border-1\n          border\n        ')
            : this.accent
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-teal-600\n          hover:bg-teal-900\n          dark:bg-teal-600\n          dark:hover:bg-teal-400\n          border-teal-600\n          hover:border-teal-900\n          dark:border-teal-600\n          dark:hover:border-teal-400\n          border-1\n          border\n        ')
            : this.success
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-green-600\n          hover:bg-green-900\n          dark:bg-green-600\n          dark:hover:bg-green-400\n          border-green-600\n          hover:border-green-900\n          dark:border-green-600\n          dark:hover:border-green-400\n          border-1\n          border\n        ')
            : this.warning
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-yellow-600\n          hover:bg-yellow-900\n          dark:bg-yellow-600\n          dark:hover:bg-yellow-400\n          border-yellow-600\n          hover:border-yellow-900\n          dark:border-yellow-600\n          dark:hover:border-yellow-400\n          border-1\n          border\n        ')
            : this.danger
            ? (e +=
                '\n          text-white\n          dark:text-white\n          bg-red-600\n          hover:bg-red-900\n          dark:bg-red-600\n          dark:hover:bg-red-400\n          border-red-600\n          hover:border-red-900\n          dark:border-red-600\n          dark:hover:border-red-400\n          border-1\n          border\n        ')
            : (this.transparent, (e += '')),
          e
        );
      },
    },
    methods: {
      clickButton() {
        this.$emit('buttonClicked');
      },
    },
  };
const Ie = Re.setup;
Re.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/common/AppButton.vue',
    ),
    Ie ? Ie(e, t) : void 0
  );
};
const De = ce(Re, [
    [
      'ssrRender',
      function (e, t, r, s, o, n, i, l) {
        t(
          `<button${G(
            a(
              {
                class: [
                  'button inline-flex items-center justify-center',
                  (o.loading || o.disabled ? 'opacity-50 ' : '') +
                    l.btnClasses +
                    ' ' +
                    o.btnClass,
                ],
                disabled: o.loading || o.disabled,
              },
              s,
            ),
          )}>`,
        ),
          l.hasTextSlot
            ? F(e.$slots, 'text', {}, null, t, r)
            : (t(`<span>${D(o.text)} `),
              o.icon
                ? t(`<span class="${P([o.icon, 'fa-fw'])}"></span>`)
                : t('\x3c!----\x3e'),
              t('</span>')),
          t('</button>');
      },
    ],
  ]),
  Pe = {
    name: 'Toast',
    computed: { ...y({ toast: 'toast/toast' }) },
    watch: {
      toast: {
        deep: !0,
        handler(e) {
          e.message && this.popToast();
        },
      },
    },
    methods: {
      ...v({ clearToast: 'toast/clearToast' }),
      async popToast() {
        await this.$swal
          .fire({
            toast: !0,
            position: this.toast.position,
            icon: this.toast.icon,
            showConfirmButton: this.toast.showConfirmButton,
            title: this.toast.message,
            timer: this.toast.timer,
            timerProgressBar: this.toast.timerProgressBar,
            showCloseButton: this.toast.showCloseButton,
            didOpen: (e) => {
              e.addEventListener('mouseenter', this.$swal.stopTimer),
                e.addEventListener('mouseleave', this.$swal.resumeTimer),
                e.addEventListener('click', () => {
                  this.$swal.close();
                });
            },
            showClass: { popup: '' },
            hideClass: { popup: '' },
          })
          .then((e) => e),
          this.clearToast();
      },
    },
  };
const Me = Pe.setup;
Pe.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/common/AppToast.vue',
    ),
    Me ? Me(e, t) : void 0
  );
};
const Ge = ce(Pe, [
    [
      'ssrRender',
      function (e, t, a, r, s, o, n, i) {
        t(`<div${G(r)}></div>`);
      },
    ],
  ]),
  ze = {
    name: 'AppSwitch',
    components: { Switch: A },
    props: {
      enabled: { type: Boolean, default: !1 },
      enableTooltip: { type: Boolean, default: !1 },
      tooltipOn: { type: String, default: 'Enable' },
      tooltipOff: { type: String, default: 'Disable' },
    },
  };
const He = ze.setup;
ze.setup = (e, t) => {
  const a = g();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/common/AppSwitch.vue',
    ),
    He ? He(e, t) : void 0
  );
};
const Ye = ce(ze, [
  [
    'ssrRender',
    function (o, n, i, l, d, c, u, p) {
      const m = e('Switch'),
        g = t('tippy');
      n(
        `<span${G(
          a(
            { class: 'mt-1 inline-block' },
            l,
            M(
              o,
              g,
              d.enableTooltip ? (d.enabled ? d.tooltipOff : d.tooltipOn) : null,
            ),
          ),
        )}>`,
      ),
        n(
          I(
            m,
            {
              class: [
                d.enabled
                  ? 'bg-green-600 dark:bg-green-500'
                  : 'bg-gray-400 dark:bg-gray-600',
                'relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
              ],
            },
            {
              default: r((e, t, a, r) => {
                if (!t)
                  return [
                    s('span', { class: 'sr-only' }, 'Use setting'),
                    s(
                      'span',
                      {
                        'aria-hidden': 'true',
                        class: [
                          d.enabled
                            ? 'translate-x-4 bg-white dark:bg-slate-800'
                            : 'translate-x-0 bg-white dark:bg-slate-800',
                          'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                        ],
                      },
                      null,
                      2,
                    ),
                  ];
                t(
                  `<span class="sr-only"${r}>Use setting</span><span aria-hidden="true" class="${P(
                    [
                      d.enabled
                        ? 'translate-x-4 bg-white dark:bg-slate-800'
                        : 'translate-x-0 bg-white dark:bg-slate-800',
                      'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                    ],
                  )}"${r}></span>`,
                );
              }),
              _: 1,
            },
            i,
          ),
        ),
        n('</span>');
    },
  ],
]);
Z.defaults.withCredentials = !0;
const Fe = f($e),
  Ve = GA_TAG,
  Ke = GA_ENABLED,
  We = APP_URL,
  qe = SENTRY_DSN,
  Xe = SENTRY_ENABLED;
SENTRY_FEEDBACK_ENABLED;
const Ze = ENVIRONMENT;
!(function (e = {}) {
  const {
    immediate: t = !1,
    onNeedRefresh: a,
    onOfflineReady: r,
    onRegistered: s,
    onRegisteredSW: o,
    onRegisterError: n,
  } = e;
  let i, l;
  l = (async function () {
    if ('serviceWorker' in navigator) {
      const { Workbox: e } = await import(
        './assets/workbox-window.prod.es5-77e1b1e1.mjs'
      );
      (i = new e('/sw.js', { scope: '/', type: 'classic' })),
        i.addEventListener('activated', (e) => {
          (!e.isUpdate && e.isExternal) || e.isUpdate
            ? window.location.reload()
            : null == r || r();
        }),
        i
          .register({ immediate: t })
          .then((e) => {
            o ? o('/sw.js', e) : null == s || s(e);
          })
          .catch((e) => {
            null == n || n(e);
          });
    }
  })();
})({ onOfflineReady() {} }),
  Xe &&
    re.init({
      app: Fe,
      dsn: qe,
      integrations: [
        new se({
          routingInstrumentation: re.vueRouterInstrumentation(Ue),
          tracePropagationTargets: ['localhost', We, /^\//],
        }),
      ],
      tracesSampleRate: 1,
      trackComponents: !0,
      hooks: ['activate', 'create', 'destroy', 'mount', 'update'],
      environment: Ze,
      beforeBreadcrumb: (e, t) => ('ui.click' === e.category ? null : e),
      beforeSend: (e, t) => (e.exception, e),
    }),
  Le.dispatch('auth/getLogins').then(() => {}),
  Le.dispatch('auth/getUser').then(() => {
    Xe &&
      (Le &&
      Le.state &&
      Le.state.auth &&
      Le.state.auth.user &&
      Le.state.auth.user.id &&
      Le.state.auth.user.name &&
      Le.state.auth.user.email &&
      Le.state.auth.authenticated
        ? re.setUser({
            id: Le.state.auth.user.id,
            username: Le.state.auth.user.name,
            email: Le.state.auth.user.email,
          })
        : re.setUser(null)),
      Fe.use(Le)
        .use(Ue)
        .use(ee)
        .use(ae, {}, 'tailwind')
        .use(te, {
          directive: 'tippy',
          component: 'tippy',
          componentSingleton: 'tippy-singleton',
          defaultProps: {
            arrow: !0,
            theme: 'material',
            animation: 'perspective',
            placement: 'auto-end',
            allowHTML: !0,
          },
        })
        .use(oe)
        .component('AppButton', De)
        .component('AppToast', Ge)
        .component('AppSwitch', Ye),
      Ke && Fe.use(W, { property: { id: Ve } }),
      Fe.mount('#app');
  });
export {
  xe as A,
  ve as C,
  ce as _,
  ne as a,
  ie as c,
  le as g,
  de as p,
  Ce as t,
};
