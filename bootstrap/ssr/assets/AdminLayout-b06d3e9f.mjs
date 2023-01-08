import { mapState as e, mapGetters as r, mapActions as t } from 'vuex';
import {
  HomeIcon as a,
  BuildingLibraryIcon as s,
  InformationCircleIcon as l,
  Bars3Icon as o,
  XMarkIcon as n,
  CogIcon as i,
  ArrowLeftOnRectangleIcon as d,
  UserCircleIcon as u,
  Bars3BottomLeftIcon as c,
  UsersIcon as g,
  ShieldCheckIcon as p,
  ShieldExclamationIcon as h,
  ServerStackIcon as m,
} from '@heroicons/vue/24/outline';
import { Switch as b } from '@headlessui/vue';
import {
  resolveComponent as x,
  resolveDirective as v,
  mergeProps as f,
  withCtx as y,
  createVNode as w,
  createTextVNode as k,
  useSSRContext as S,
  openBlock as $,
  createBlock as A,
  toDisplayString as B,
} from 'vue';
import {
  ssrRenderAttrs as O,
  ssrRenderClass as I,
  ssrRenderComponent as C,
  ssrGetDirectiveProps as _,
  ssrRenderAttr as T,
  ssrRenderStyle as D,
  ssrInterpolate as L,
} from 'vue/server-renderer';
import { _ as N, A as R } from '../app2.mjs';
import 'moment';
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
const U = {
  name: 'AdminNavBar',
  components: {
    HomeIcon: a,
    BuildingLibraryIcon: s,
    InformationCircleIcon: l,
    Bars3Icon: o,
    XMarkIcon: n,
    CogIcon: i,
    ArrowLeftOnRectangleIcon: d,
    UserCircleIcon: u,
    Bars3BottomLeftIcon: c,
    Switch: b,
  },
  props: {},
  setup: () => ({}),
  data: () => ({
    dropDownOpen: !1,
    form: { theme_dark: !1 },
    errors: null,
    success: '',
    loading: !1,
  }),
  computed: {
    ...e('sidebar', {
      sideBarOpen: (e) => e.sideBarOpen,
      fullScreenSideBarOpen: (e) => e.fullScreenSideBarOpen,
    }),
    ...r({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.form.theme_dark = this.user.theme_dark;
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...t({
      toggleSidebar: 'sidebar/toggleSidebar',
      toggleFullScreenSidebar: 'sidebar/toggleFullScreenSidebar',
      updateTheme: 'auth/theme',
      popToast: 'toast/popToast',
      logout: 'auth/logout',
    }),
    toggleSidebarTrigger() {
      this.toggleSidebar(), this.closeDrop();
    },
    toggleFullScreenSidebarTrigger() {
      this.toggleFullScreenSidebar(), this.closeDrop();
    },
    closeDrop() {
      this.dropDownOpen = !1;
    },
    openDrop() {
      this.dropDownOpen = !0;
    },
    async toggleTheme() {
      (this.loading = !0), (this.errors = null), (this.success = '');
      try {
        await this.updateTheme(this.form).then((e) => {
          e &&
            e.data &&
            e.data.user &&
            e.data.user.id &&
            ((this.form.theme_dark = e.data.user.theme_dark),
            this.popToast({
              message: 'Theme Saved',
              timer: 2e3,
              icon: 'success',
            }));
        });
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
  },
};
const F = U.setup;
U.setup = (e, r) => {
  const t = S();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/components/admin/AdminNavBar.vue',
    ),
    F ? F(e, r) : void 0
  );
};
const j = N(U, [
    [
      'ssrRender',
      function (e, r, t, a, s, l, o, n) {
        const i = x('Bars3Icon'),
          d = x('XMarkIcon'),
          u = x('Bars3BottomLeftIcon'),
          c = x('router-link'),
          g = x('BuildingLibraryIcon'),
          p = x('HomeIcon'),
          h = x('InformationCircleIcon'),
          m = x('Switch'),
          b = x('UserCircleIcon'),
          S = x('CogIcon'),
          $ = x('ArrowLeftOnRectangleIcon'),
          A = v('tippy');
        r(
          `<div${O(
            f({ class: 'sticky top-0 z-40' }, a),
          )}><div class="flex h-20 w-full items-center justify-between border-b bg-white px-6 dark:bg-slate-800"><div class="flex"><div class="mr-4 inline-block flex items-center lg:hidden"><button class="${I(
            [
              e.sideBarOpen
                ? 'bg-slate-100 text-gray-900 dark:text-gray-100'
                : '',
              'navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800',
            ],
          )}">`,
        ),
          e.sideBarOpen
            ? r('\x3c!----\x3e')
            : r('<span class="sr-only">Open menu</span>'),
          e.sideBarOpen
            ? r('<span class="sr-only">CLose menu</span>')
            : r('\x3c!----\x3e'),
          e.sideBarOpen
            ? r('\x3c!----\x3e')
            : r(C(i, { class: 'h-6 w-6', 'aria-hidden': 'true' }, null, t)),
          e.sideBarOpen
            ? r(C(d, { class: 'h-6 w-6', 'aria-hidden': 'true' }, null, t))
            : r('\x3c!----\x3e'),
          r(
            '</button></div><div class="hidden lg:inline-flex"><div class="mr-4 inline-block flex items-center"><button class="navbar-burger rounded text-gray-600 hover:border-white hover:text-gray-500 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-800">',
          ),
          e.fullScreenSideBarOpen
            ? r('\x3c!----\x3e')
            : r('<span class="sr-only">Open menu</span>'),
          e.fullScreenSideBarOpen
            ? r('<span class="sr-only">CLose menu</span>')
            : r('\x3c!----\x3e'),
          e.fullScreenSideBarOpen
            ? r('\x3c!----\x3e')
            : r(C(i, { class: 'h-6 w-6', 'aria-hidden': 'true' }, null, t)),
          e.fullScreenSideBarOpen
            ? r(C(u, { class: 'h-6 w-6', 'aria-hidden': 'true' }, null, t))
            : r('\x3c!----\x3e'),
          r('</button></div></div><div as="nav" class="ml-5 flex space-x-10">'),
          e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
            ? r(
                C(
                  c,
                  {
                    to: { name: 'admin' },
                    class:
                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                    onClick: n.closeDrop,
                  },
                  {
                    default: y(({ isActive: e }, r, t, a) => {
                      if (!r)
                        return [
                          w(
                            'span',
                            {
                              class: [
                                e &&
                                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                              ],
                            },
                            [w(g, { class: 'float-left mr-2 h-6 w-6' })],
                            2,
                          ),
                        ];
                      r(
                        `<span class="${I([
                          e &&
                            'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                        ])}"${a}>`,
                      ),
                        r(
                          C(
                            g,
                            { class: 'float-left mr-2 h-6 w-6' },
                            null,
                            t,
                            a,
                          ),
                        ),
                        r('</span>');
                    }),
                    _: 1,
                  },
                  t,
                ),
              )
            : r('\x3c!----\x3e'),
          e.authenticated
            ? r(
                C(
                  c,
                  {
                    to: { name: 'dashboard' },
                    class:
                      'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                    onClick: n.closeDrop,
                  },
                  {
                    default: y(({ isActive: e }, r, t, a) => {
                      if (!r)
                        return [
                          w(
                            'span',
                            {
                              class: [
                                e &&
                                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                              ],
                            },
                            [w(p, { class: 'float-left mr-2 h-6 w-6' })],
                            2,
                          ),
                        ];
                      r(
                        `<span class="${I([
                          e &&
                            'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                        ])}"${a}>`,
                      ),
                        r(
                          C(
                            p,
                            { class: 'float-left mr-2 h-6 w-6' },
                            null,
                            t,
                            a,
                          ),
                        ),
                        r('</span>');
                    }),
                    _: 1,
                  },
                  t,
                ),
              )
            : r('\x3c!----\x3e'),
          r(
            C(
              c,
              {
                to: { name: 'about' },
                class:
                  'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                onClick: n.closeDrop,
              },
              {
                default: y(({ isActive: e }, r, t, a) => {
                  if (!r)
                    return [
                      w(
                        'span',
                        {
                          class: [
                            e &&
                              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                          ],
                        },
                        [w(h, { class: 'float-left mr-2 h-6 w-6' })],
                        2,
                      ),
                    ];
                  r(
                    `<span class="${I([
                      e &&
                        'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                    ])}"${a}>`,
                  ),
                    r(C(h, { class: 'float-left mr-2 h-6 w-6' }, null, t, a)),
                    r('</span>');
                }),
                _: 1,
              },
              t,
            ),
          ),
          r(
            `</div></div><div class="relative flex items-center"><div class="my-1 mr-5 mt-2 w-full py-2 sm:flex sm:items-center"><span${O(
              f(
                {
                  class: o.loading
                    ? 'default disabled cursor-pointer'
                    : 'cursor-pointer',
                },
                _(
                  e,
                  A,
                  'Toggle Theme ' + (o.form.theme_dark ? 'Light' : 'Dark'),
                ),
              ),
            )}>`,
          ),
          r(
            C(
              m,
              {
                modelValue: o.form.theme_dark,
                'onUpdate:modelValue': (e) => (o.form.theme_dark = e),
                class: [
                  o.form.theme_dark ? 'bg-gray-500' : 'bg-gray-400',
                  'relative inline-flex h-[26px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                ],
              },
              {
                default: y((e, r, t, a) => {
                  if (!r)
                    return [
                      w('span', { class: 'sr-only' }, 'Toggle Theme'),
                      w(
                        'span',
                        {
                          'aria-hidden': 'true',
                          class: [
                            o.form.theme_dark
                              ? 'translate-x-5 bg-gray-800'
                              : 'translate-x-0 bg-white',
                            'pointer-events-none inline-block h-[22px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                          ],
                        },
                        null,
                        2,
                      ),
                    ];
                  r(
                    `<span class="sr-only"${a}>Toggle Theme</span><span aria-hidden="true" class="${I(
                      [
                        o.form.theme_dark
                          ? 'translate-x-5 bg-gray-800'
                          : 'translate-x-0 bg-white',
                        'pointer-events-none inline-block h-[22px] w-[24px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                      ],
                    )}"${a}></span>`,
                  );
                }),
                _: 1,
              },
              t,
            ),
          ),
          r('</span></div>'),
          e.user && e.user.avatar
            ? r(
                `<img${T('src', e.user.avatar)}${T(
                  'alt',
                  e.user.name,
                )} class="h-8 w-8 cursor-pointer rounded-full border shadow-lg">`,
              )
            : r(
                C(
                  b,
                  {
                    class: 'float-right ml-2 mt-0 h-8 w-8 cursor-pointer',
                    onClick: (e) => (o.dropDownOpen = !o.dropDownOpen),
                  },
                  null,
                  t,
                ),
              ),
          r(
            `</div></div><div class="relative mt-1"><div style="${D(
              o.dropDownOpen ? null : { display: 'none' },
            )}" class="absolute right-5 z-10 flex w-auto flex-col whitespace-nowrap rounded border bg-white shadow-md dark:bg-slate-900">`,
          ),
          e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
            ? r(
                C(
                  c,
                  { to: { name: 'admin' } },
                  {
                    default: y(({ isActive: e }, r, t, a) => {
                      if (!r)
                        return [
                          w(
                            'span',
                            {
                              class: [
                                'flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                e
                                  ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                  : 'text-gray-700',
                              ],
                            },
                            [w(g, { class: 'mr-2 h-6 w-6' }), k(' Admin ')],
                            2,
                          ),
                        ];
                      r(
                        `<span class="${I([
                          e
                            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                            : 'text-gray-700',
                          'flex items-center rounded-t p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                        ])}"${a}>`,
                      ),
                        r(C(g, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                        r(' Admin </span>');
                    }),
                    _: 1,
                  },
                  t,
                ),
              )
            : r('\x3c!----\x3e'),
          e.authenticated
            ? r(
                C(
                  c,
                  { to: { name: 'dashboard' } },
                  {
                    default: y(({ isActive: r }, t, a, s) => {
                      if (!t)
                        return [
                          w(
                            'span',
                            {
                              class: [
                                'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                r
                                  ? e.roles &&
                                    (e.roles.admin || e.roles.superAdmin)
                                    ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                    : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                                  : e.roles &&
                                    (e.roles.admin || e.roles.superAdmin)
                                  ? 'text-gray-700'
                                  : 'rounded-t text-gray-700',
                              ],
                            },
                            [w(p, { class: 'mr-2 h-6 w-6' }), k(' Dashboard ')],
                            2,
                          ),
                        ];
                      t(
                        `<span class="${I([
                          r
                            ? e.roles && (e.roles.admin || e.roles.superAdmin)
                              ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                              : 'cursor-default whitespace-nowrap rounded-t bg-slate-500 text-white'
                            : e.roles && (e.roles.admin || e.roles.superAdmin)
                            ? 'text-gray-700'
                            : 'rounded-t text-gray-700',
                          'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                        ])}"${s}>`,
                      ),
                        t(C(p, { class: 'mr-2 h-6 w-6' }, null, a, s)),
                        t(' Dashboard </span>');
                    }),
                    _: 1,
                  },
                  t,
                ),
              )
            : r('\x3c!----\x3e'),
          e.authenticated
            ? r(
                C(
                  c,
                  { to: { name: 'settings' } },
                  {
                    default: y(({ isActive: e }, r, t, a) => {
                      if (!r)
                        return [
                          w(
                            'span',
                            {
                              class: [
                                'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                                e
                                  ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                                  : 'text-gray-700',
                              ],
                            },
                            [w(S, { class: 'mr-2 h-6 w-6' }), k(' Settings ')],
                            2,
                          ),
                        ];
                      r(
                        `<span class="${I([
                          e
                            ? 'cursor-default whitespace-nowrap bg-slate-500 text-white'
                            : 'text-gray-700',
                          'flex items-center p-4 pr-10 pl-8 hover:bg-slate-800 hover:text-white',
                        ])}"${a}>`,
                      ),
                        r(C(S, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                        r(' Settings </span>');
                    }),
                    _: 1,
                  },
                  t,
                ),
              )
            : r('\x3c!----\x3e'),
          r(
            '<div class="flex cursor-pointer items-center rounded-b p-4 pr-10 pl-8 text-gray-700 hover:bg-slate-800 hover:text-white">',
          ),
          r(C($, { class: 'mr-2 h-6 w-6' }, null, t)),
          r(' Logout </div></div></div></div>');
      },
    ],
  ]),
  z = {
    name: 'AdminSidebar',
    components: {
      UsersIcon: g,
      BuildingLibraryIcon: s,
      ShieldCheckIcon: p,
      ShieldExclamationIcon: h,
      ServerStackIcon: m,
      CogIcon: i,
    },
    props: { appName: { type: String, default: 'Workflow' } },
    setup: () => ({}),
    data: () => ({}),
    computed: {
      ...e('sidebar', {
        sideBarOpen: (e) => e.sideBarOpen,
        fullScreenSideBarOpen: (e) => e.fullScreenSideBarOpen,
      }),
      ...r({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        roles: 'auth/roles',
      }),
      currentRouteName() {
        return this.$route.name;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    beforeUnmount() {},
    updated() {},
    methods: {
      ...t({
        toggleSidebar: 'sidebar/toggleSidebar',
        toggleFullScreenSidebar: 'sidebar/toggleFullScreenSidebar',
        popToast: 'toast/popToast',
      }),
    },
  };
const M = z.setup;
z.setup = (e, r) => {
  const t = S();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/components/admin/AdminSidebar.vue',
    ),
    M ? M(e, r) : void 0
  );
};
const E = {
  name: 'AdminLayout',
  components: {
    AdminNavBar: j,
    AdminSidebar: N(z, [
      [
        'ssrRender',
        function (e, r, t, a, s, l, o, n) {
          const i = x('router-link'),
            d = x('BuildingLibraryIcon'),
            u = x('UsersIcon'),
            c = x('ShieldCheckIcon'),
            g = x('ShieldExclamationIcon'),
            p = x('ServerStackIcon'),
            h = x('CogIcon');
          r(
            `<div${O(
              f(
                {
                  id: 'main-nav',
                  class: [
                    'fixed z-30 h-screen w-1/2 border-r bg-white dark:bg-slate-800 md:top-0 md:left-0 md:w-1/3 lg:block lg:w-64',
                    e.sideBarOpen ? '' : 'hidden',
                  ],
                },
                a,
              ),
            )}><div class="mb-8 flex h-20 w-full items-center border-b px-4"><div class="flex justify-center lg:w-0 lg:flex-1">`,
          ),
            r(
              C(
                i,
                { to: { name: 'home' } },
                {
                  default: y((e, r, t, a) => {
                    if (!r)
                      return [
                        ($(),
                        A(
                          'svg',
                          {
                            viewBox: '0 0 50 31',
                            class:
                              'h-6 w-auto text-indigo-500 dark:text-indigo-300',
                          },
                          [
                            w('path', {
                              'fill-rule': 'evenodd',
                              'clip-rule': 'evenodd',
                              d: 'M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z',
                              fill: 'currentColor',
                            }),
                          ],
                        )),
                        w(
                          'p',
                          {
                            class:
                              'sr-only text-3xl font-semibold text-blue-400',
                          },
                          B(s.appName),
                          1,
                        ),
                      ];
                    r(
                      `<svg viewBox="0 0 50 31" class="h-6 w-auto text-indigo-500 dark:text-indigo-300"${a}><path fill-rule="evenodd" clip-rule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="currentColor"${a}></path></svg><p class="sr-only text-3xl font-semibold text-blue-400"${a}>${L(
                        s.appName,
                      )}</p>`,
                    );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            r('</div></div><div class="mb-4 px-4">'),
            e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
              ? r(
                  C(
                    i,
                    { to: { name: 'admin' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  'admin' == n.currentRouteName
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(d, { class: 'mr-2 mb-1 h-6 w-6' }),
                                w('span', { class: '' }, 'Admin'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            'admin' == n.currentRouteName
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(d, { class: 'mr-2 mb-1 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>Admin</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            e.authenticated && e.roles && e.roles.superAdmin
              ? r(
                  C(
                    i,
                    { to: { name: 'users' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  e
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(u, { class: 'mr-2 mb-1 h-6 w-6' }),
                                w('span', { class: '' }, 'Users'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            e
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(u, { class: 'mr-2 mb-1 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>Users</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            e.authenticated && e.roles && e.roles.superAdmin
              ? r(
                  C(
                    i,
                    { to: { name: 'roles' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  e
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(c, { class: 'mr-2 h-6 w-6' }),
                                w('span', { class: '' }, 'Roles'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            e
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(c, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>Roles</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            e.authenticated && e.roles && e.roles.superAdmin
              ? r(
                  C(
                    i,
                    { to: { name: 'permissions' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  e
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(g, { class: 'mr-2 h-6 w-6' }),
                                w('span', { class: '' }, 'Permissions'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            e
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(g, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>Permissions</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            e.authenticated && e.roles && e.roles.superAdmin
              ? r(
                  C(
                    i,
                    { to: { name: 'phpinfo' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  e
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(p, { class: 'mr-2 h-6 w-6' }),
                                w('span', { class: '' }, 'Server Info'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            e
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(p, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>Server Info</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            e.authenticated && e.roles && e.roles.superAdmin
              ? r(
                  C(
                    i,
                    { to: { name: 'app-settings' }, onClick: e.toggleSidebar },
                    {
                      default: y(({ isActive: e }, r, t, a) => {
                        if (!r)
                          return [
                            w(
                              'div',
                              {
                                class: [
                                  'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                                  e
                                    ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                ],
                              },
                              [
                                w(h, { class: 'mr-2 h-6 w-6' }),
                                w('span', { class: '' }, 'App Settings'),
                              ],
                              2,
                            ),
                          ];
                        r(
                          `<div class="${I([
                            e
                              ? 'cursor-default bg-gray-200 text-blue-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-900'
                              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                            'flex h-10 w-full items-center rounded-lg pl-4 text-blue-400',
                          ])}"${a}>`,
                        ),
                          r(C(h, { class: 'mr-2 h-6 w-6' }, null, t, a)),
                          r(`<span class=""${a}>App Settings</span></div>`);
                      }),
                      _: 1,
                    },
                    t,
                  ),
                )
              : r('\x3c!----\x3e'),
            r('</div></div>');
        },
      ],
    ]),
    AppFooter: R,
  },
  props: {},
  setup: () => ({}),
  data: () => ({}),
  computed: {
    ...e('sidebar', {
      sideBarOpen: (e) => e.sideBarOpen,
      fullScreenSideBarOpen: (e) => e.fullScreenSideBarOpen,
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
const H = E.setup;
E.setup = (e, r) => {
  const t = S();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/layouts/AdminLayout.vue',
    ),
    H ? H(e, r) : void 0
  );
};
const P = N(E, [
  [
    'ssrRender',
    function (e, r, t, a, s, l, o, n) {
      const i = x('AdminSidebar'),
        d = x('AdminNavBar'),
        u = x('router-view'),
        c = x('AppFooter');
      r(
        `<div${O(
          f({ id: 'main-body', class: 'leading-normal tracking-normal' }, a),
        )}><div class="flex flex-wrap">`,
      ),
        r(C(i, { class: e.fullScreenSideBarOpen ? '' : 'lg:hidden' }, null, t)),
        r(
          `<div id="main-content" class="${I([
            (e.sideBarOpen ? 'overlay ' : ' ') +
              (e.fullScreenSideBarOpen ? 'lg:pl-64' : ''),
            'min-h-screen w-full bg-white pl-0 dark:bg-slate-800',
          ])}">`,
        ),
        r(C(d, null, null, t)),
        r('<div class="mb-20 bg-white dark:bg-slate-800">'),
        r(C(u, null, null, t)),
        r('</div>'),
        r(
          C(
            c,
            {
              class: 'sticky top-[100vh] w-full',
              'footer-class': 'border-slate-900/5 dark:border-slate-700',
              'border-class': '',
            },
            null,
            t,
          ),
        ),
        r('</div></div></div>');
    },
  ],
]);
export { P as default };
