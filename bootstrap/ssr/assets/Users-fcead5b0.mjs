import {
  LockClosedIcon as e,
  LockOpenIcon as t,
  PencilSquareIcon as a,
  TrashIcon as r,
  UserCircleIcon as s,
  ChevronRightIcon as l,
  UserPlusIcon as o,
} from '@heroicons/vue/24/outline';
import { C as i, _ as n } from '../app2.mjs';
import { mapActions as d, mapGetters as c } from 'vuex';
import m from 'axios';
import {
  P as p,
  A as u,
  a as f,
} from './default.css_vue_type_style_index_0_src_true_lang-6d22712f.mjs';
import g from 'moment';
import {
  resolveComponent as h,
  resolveDirective as x,
  mergeProps as b,
  withCtx as y,
  createVNode as v,
  openBlock as w,
  createBlock as U,
  createCommentVNode as k,
  toDisplayString as $,
  useSSRContext as C,
  createTextVNode as _,
  withModifiers as R,
  withDirectives as V,
  vModelText as T,
} from 'vue';
import {
  ssrRenderAttrs as D,
  ssrRenderAttr as E,
  ssrInterpolate as B,
  ssrRenderList as I,
  ssrRenderClass as M,
  ssrRenderComponent as S,
  ssrGetDirectiveProps as F,
  ssrRenderStyle as j,
} from 'vue/server-renderer';
import P from 'lodash.clonedeep';
import A from '@vueform/multiselect';
import { E as N } from './Errors-cfd7b346.mjs';
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
const Y = {
  name: 'UsersTableRow',
  components: {
    LockClosedIcon: e,
    LockOpenIcon: t,
    CircleSvg: i,
    PencilSquareIcon: a,
    TrashIcon: r,
    UserCircleIcon: s,
  },
  props: {
    user: { type: Object, required: !0 },
    dataReady: { type: Boolean, default: !1 },
    availableRoles: { type: Array, default: null },
    lockJiggled: { type: Boolean, default: !1 },
  },
  setup: () => ({}),
  data: () => ({ locked: !0 }),
  computed: {},
  watch: {
    lockJiggled(e) {
      this.locked = !0;
    },
  },
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...d({ popToast: 'toast/popToast' }),
    roleClass: (e) =>
      'admin' == e
        ? 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-gray-100'
        : 'super.admin' == e
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-gray-100'
        : 'user' == e
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-gray-100'
        : 'editor' == e
        ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-gray-100'
        : 'moderator' == e
        ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-gray-100'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    parseDisplayDate: (e) => g(e).format('MMM Do YYYY, h:mma'),
    fireVerification() {
      const e = this,
        t = this.user.email_verified_at;
      let a = `<strong>Verify ${this.user.name}?</strong>`,
        r = 'Are you sure you want to <strong>Verify';
      this.user.name, this.user.email;
      let s = 'warning',
        l = '#FF0000',
        o = '#777777',
        i = 'Verify',
        n = 'Cancel';
      t &&
        ((a = `<strong>Un-Verify ${this.user.name}?</strong>`),
        (r = 'Are you sure you want to <strong>Un-Verify'),
        this.user.name,
        this.user.email,
        (s = 'warning'),
        (l = '#FF0000'),
        (o = '#777777'),
        (i = 'Un-Verify'),
        (n = 'Cancel')),
        e.$swal
          .fire({
            title: a,
            icon: s,
            html: r,
            showCancelButton: !1,
            showDenyButton: !0,
            confirmButtonColor: l,
            denyButtonColor: o,
            confirmButtonText: i,
            denyButtonText: n,
          })
          .then((a) => {
            a.isConfirmed
              ? t
                ? this.$emit('confirmUnVerifyUser', this.user)
                : this.$emit('confirmVerifyUser', this.user)
              : a.isDenied &&
                e.popToast({ message: 'Cancelled', timer: 2e3, icon: 'error' });
          });
    },
    triggerEditUser() {
      this.$emit('editUser', this.user);
    },
    triggerDeleteUser() {
      const e = this,
        t = `<strong>Delete ${this.user.name}?</strong>`;
      this.user.name, this.user.email;
      e.$swal
        .fire({
          title: t,
          icon: 'warning',
          html: 'Are you sure you want to <strong>Delete',
          showCancelButton: !1,
          showDenyButton: !0,
          confirmButtonColor: '#FF0000',
          denyButtonColor: '#777777',
          confirmButtonText: 'Delete',
          denyButtonText: 'Cancel',
        })
        .then((t) => {
          t.isConfirmed
            ? this.$emit('deleteUser', this.user)
            : t.isDenied &&
              e.popToast({ message: 'Cancelled', timer: 2e3, icon: 'error' });
        });
    },
    triggerUserConfirmEmail() {
      const e = this,
        t = `<strong>Send ${this.user.name} verification email</strong>`;
      this.user.name, this.user.email;
      e.$swal
        .fire({
          title: t,
          icon: 'info',
          html: 'Are you sure you want to <strong>Send ',
          showCancelButton: !1,
          showDenyButton: !0,
          confirmButtonColor: '#10b981',
          denyButtonColor: '#777777',
          confirmButtonText: 'Confirm Send',
          denyButtonText: 'Cancel',
        })
        .then((t) => {
          t.isConfirmed
            ? this.$emit('sendUserVerification', this.user)
            : t.isDenied &&
              e.popToast({ message: 'Cancelled', timer: 2e3, icon: 'error' });
        });
    },
    triggerImpersonateUser() {
      this.$emit('impersonateUserTriggered', this.user);
    },
  },
};
const L = Y.setup;
Y.setup = (e, t) => {
  const a = C();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/admin/UsersTableRow.vue',
    ),
    L ? L(e, t) : void 0
  );
};
const z = {
  name: 'UsersTable',
  components: {
    Pagination: p,
    UsersTableRow: n(Y, [
      [
        'ssrRender',
        function (e, t, a, r, s, l, o, i) {
          const n = h('AppButton'),
            d = h('LockClosedIcon'),
            c = h('LockOpenIcon'),
            m = h('CircleSvg'),
            p = h('PencilSquareIcon'),
            u = h('TrashIcon'),
            f = h('UserCircleIcon'),
            g = x('tippy');
          t(
            `<tr${D(
              b(
                {
                  class:
                    'bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100',
                },
                r,
              ),
            )}><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center"><div class="h-10 w-10 flex-shrink-0"><img class="h-full w-full rounded-full"${E(
              'src',
              s.user.avatar,
            )}${E(
              'alt',
              s.user.name,
            )}></div><div class="ml-3"><p class="whitespace-nowrap text-xs">${B(
              s.user.name,
            )}</p></div></div></td><td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500"><div class="flex items-center"><a class="whitespace-nowrap"${E(
              'href',
              'mailto:' + s.user.email,
            )} title="send email">${B(
              s.user.email,
            )}</a></div></td><td class="whitespace-nowrap border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500"><p>`,
          ),
            s.user.roles && s.user.roles.length
              ? (t('<span>\x3c!--[--\x3e'),
                I(s.user.roles, (e) => {
                  t(
                    `<span><span class="${M([
                      i.roleClass(e.slug),
                      'm-1 inline-block cursor-default whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-bold',
                    ])}">${B(e.name)}</span></span>`,
                  );
                }),
                t('\x3c!--]--\x3e</span>'))
              : t('\x3c!----\x3e'),
            t(
              '</p></td><td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500">',
            ),
            s.user.created_at
              ? t(
                  `<p class="whitespace-nowrap">${B(
                    i.parseDisplayDate(s.user.created_at),
                  )}</p>`,
                )
              : t('\x3c!----\x3e'),
            t(
              `</td><td class="border-b border-gray-300 px-5 py-5 text-xs dark:border-gray-500"><span class="relative inline-block px-3 py-1 font-semibold leading-tight"><div class="whitespace-nowrap"><div class="${M(
                [
                  s.user.email_verified_at
                    ? 'bg-green-700 text-gray-100'
                    : 'bg-red-700 text-gray-100',
                  'inline rounded px-1 py-0',
                ],
              )}">${B(
                s.user.email_verified_at ? 'Verified' : 'Unverified',
              )}</div>`,
            ),
            s.user.email_verified_at
              ? t('\x3c!----\x3e')
              : t(
                  S(
                    n,
                    {
                      disabled: o.locked,
                      loading: !s.dataReady,
                      class:
                        'ml-2 inline-block rounded bg-transparent px-1 py-2 text-xs font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg',
                      'btn-class':
                        'text-yellow-700 dark:bg-transparent hover:bg-gray-200',
                      'btn-class-dark':
                        'bg-transparent dark:bg-transparent dark:hover:bg-gray-900',
                      onClick: i.triggerUserConfirmEmail,
                    },
                    {
                      text: y((e, t, a, r) => {
                        if (!t)
                          return [
                            v('span', {
                              class:
                                'far fa-paper fa-fw fa-sm fa-regular fa-envelope',
                            }),
                          ];
                        t(
                          `<span class="far fa-paper fa-fw fa-sm fa-regular fa-envelope"${r}></span>`,
                        );
                      }),
                      _: 1,
                    },
                    a,
                  ),
                ),
            t(
              S(
                n,
                {
                  disabled: o.locked,
                  loading: !s.dataReady,
                  class:
                    'ml-1 inline-block rounded bg-transparent px-1 py-2 text-xs font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg',
                  'btn-class':
                    'text-yellow-700 dark:bg-transparent dark:hover:bg-gray-900 hover:bg-gray-200',
                  'btn-class-dark':
                    'bg-transparent dark:bg-transparent dark:hover:bg-gray-900',
                  onClick: i.fireVerification,
                },
                {
                  text: y((e, t, a, r) => {
                    if (!t)
                      return [
                        s.user.email_verified_at
                          ? k('', !0)
                          : (w(),
                            U('span', {
                              key: 0,
                              class: 'far fa-circle fa-fw fa-sm',
                            })),
                        s.user.email_verified_at
                          ? (w(),
                            U('span', {
                              key: 1,
                              class: 'far fa-circle-check fa-fw fa-sm',
                            }))
                          : k('', !0),
                      ];
                    s.user.email_verified_at
                      ? t('\x3c!----\x3e')
                      : t(
                          `<span class="far fa-circle fa-fw fa-sm"${r}></span>`,
                        ),
                      s.user.email_verified_at
                        ? t(
                            `<span class="far fa-circle-check fa-fw fa-sm"${r}></span>`,
                          )
                        : t('\x3c!----\x3e');
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t('</div>'),
            s.user.email_verified_at
              ? t(
                  `<div class="inset-0 py-1">${B(
                    i.parseDisplayDate(s.user.email_verified_at),
                  )}</div>`,
                )
              : t('\x3c!----\x3e'),
            t(
              '</span></td><td class="whitespace-nowrap border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">',
            ),
            t(
              S(
                n,
                {
                  loading: !s.dataReady,
                  class:
                    'mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white',
                  'btn-class':
                    (o.locked,
                    'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                  'btn-hover-class':
                    (o.locked,
                    'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                  'btn-class-dark':
                    (o.locked,
                    'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                  'btn-hover-class-dark':
                    (o.locked,
                    'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                  onClick: (e) => (o.locked = !o.locked),
                },
                {
                  text: y((e, t, a, r) => {
                    if (!t)
                      return [
                        o.locked && s.dataReady
                          ? (w(),
                            U(d, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : k('', !0),
                        !o.locked && s.dataReady
                          ? (w(),
                            U(c, { key: 1, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : k('', !0),
                        s.dataReady
                          ? k('', !0)
                          : (w(), U(m, { key: 2, class: 'mr-2 h-3 w-3' })),
                        v(
                          'span',
                          { class: 'sr-only' },
                          $(o.locked ? 'Unlock' : 'Lock') + ' User Settings',
                          1,
                        ),
                      ];
                    o.locked && s.dataReady
                      ? t(S(d, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      !o.locked && s.dataReady
                        ? t(
                            S(
                              c,
                              { class: 'ml-2 mr-2 mt-0 h-4 w-4' },
                              null,
                              a,
                              r,
                            ),
                          )
                        : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(S(m, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(
                        `<span class="sr-only"${r}>${B(
                          o.locked ? 'Unlock' : 'Lock',
                        )} User Settings</span>`,
                      );
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t(
              S(
                n,
                b(
                  {
                    warning: '',
                    disabled: o.locked,
                    loading: !s.dataReady,
                    class: 'mr-2 px-1 py-1 text-sm',
                    onClick: i.triggerEditUser,
                  },
                  F(e, g, 'Edit User'),
                ),
                {
                  text: y((e, t, a, r) => {
                    if (!t)
                      return [
                        s.dataReady
                          ? (w(),
                            U(p, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : k('', !0),
                        s.dataReady
                          ? k('', !0)
                          : (w(), U(m, { key: 1, class: 'mr-2 h-3 w-3' })),
                        v('span', { class: 'sr-only' }, 'Edit User'),
                      ];
                    s.dataReady
                      ? t(S(p, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(S(m, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(`<span class="sr-only"${r}>Edit User</span>`);
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t(
              S(
                n,
                b(
                  {
                    danger: '',
                    disabled: o.locked,
                    loading: !s.dataReady,
                    class: 'mr-2 px-1 py-1 text-sm',
                    onClick: i.triggerDeleteUser,
                  },
                  F(e, g, 'Delete User'),
                ),
                {
                  text: y((e, t, a, r) => {
                    if (!t)
                      return [
                        s.dataReady
                          ? (w(),
                            U(u, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : k('', !0),
                        s.dataReady
                          ? k('', !0)
                          : (w(), U(m, { key: 1, class: 'mr-2 h-3 w-3' })),
                        v('span', { class: 'sr-only' }, 'Delete User'),
                      ];
                    s.dataReady
                      ? t(S(u, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(S(m, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(`<span class="sr-only"${r}>Delete User</span>`);
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t(
              S(
                n,
                b(
                  {
                    secondary: '',
                    disabled: o.locked,
                    loading: !s.dataReady,
                    class: 'mr-2 px-1 py-1 text-sm',
                    onClick: i.triggerImpersonateUser,
                  },
                  F(e, g, 'Impersonate User'),
                ),
                {
                  text: y((e, t, a, r) => {
                    if (!t)
                      return [
                        s.dataReady
                          ? (w(),
                            U(f, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : k('', !0),
                        s.dataReady
                          ? k('', !0)
                          : (w(), U(m, { key: 1, class: 'mr-2 h-3 w-3' })),
                        v('span', { class: 'sr-only' }, 'Impersonate User'),
                      ];
                    s.dataReady
                      ? t(S(f, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(S(m, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(`<span class="sr-only"${r}>Impersonate User</span>`);
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t('</td></tr>');
        },
      ],
    ]),
  },
  props: {
    dataReady: { type: Boolean, default: !1 },
    lockJiggled: { type: Boolean, default: !1 },
    users: { type: Array, default: () => [] },
    pagination: { type: Object, default: () => ({}) },
    availableRoles: { type: Array, default: null },
  },
  setup: () => ({}),
  data: () => ({ offset: 4 }),
  computed: {
    ...c({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...d({ popToast: 'toast/popToast' }),
    getUsers(e) {
      this.$emit('getUsers', e);
    },
    confirmUnVerifyUser(e) {
      this.$emit('confirmUnVerifyUser', e);
    },
    confirmVerifyUser(e) {
      this.$emit('confirmVerifyUser', e);
    },
    deleteUser(e) {
      this.$emit('deleteUser', e);
    },
    editUser(e) {
      this.$emit('editUser', e);
    },
    sendUserVerification(e) {
      this.$emit('sendUserVerification', e);
    },
    impersonateUserTriggered(e) {
      this.$emit('impersonateUserTriggered', e);
    },
  },
};
const J = z.setup;
z.setup = (e, t) => {
  const a = C();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/admin/UsersTable.vue',
    ),
    J ? J(e, t) : void 0
  );
};
const O = n(z, [
    [
      'ssrRender',
      function (e, t, a, r, s, l, o, i) {
        const n = h('UsersTableRow'),
          d = h('Pagination');
        t(
          `<div${D(
            b(
              {
                class: 'overflow-x-scroll rounded-lg shadow',
                style: { width: '100%' },
              },
              r,
            ),
          )}><table class="min-w-full leading-normal" aria-describedby="Users Table"><thead><tr class="border-b-2 border-gray-300 bg-gray-200 text-gray-600 dark:border-gray-500 dark:bg-slate-900 dark:text-gray-200"><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> User </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Email </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Role(s) </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Created at </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Status </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Actions </th></tr></thead>`,
        ),
          s.dataReady
            ? (t('<tbody>\x3c!--[--\x3e'),
              I(s.users, (e) => {
                t(
                  S(
                    n,
                    {
                      user: e,
                      'data-ready': s.dataReady,
                      'available-roles': s.availableRoles,
                      'lock-jiggled': s.lockJiggled,
                      onConfirmUnVerifyUser: i.confirmUnVerifyUser,
                      onConfirmVerifyUser: i.confirmVerifyUser,
                      onDeleteUser: i.deleteUser,
                      onEditUser: i.editUser,
                      onSendUserVerification: i.sendUserVerification,
                      onImpersonateUserTriggered: i.impersonateUserTriggered,
                    },
                    null,
                    a,
                  ),
                );
              }),
              t('\x3c!--]--\x3e</tbody>'))
            : t('\x3c!----\x3e'),
          s.dataReady
            ? t('\x3c!----\x3e')
            : t(
                '<tbody><tr class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100"><td colspan="6" class="pt-10 pb-10 text-center"><span class="fa fa-circle-notch fa-spin fa-5x text-gray-400"></span></td></tr></tbody>',
              ),
          t('</table>'),
          s.dataReady && s.users && s.users.length >= 1
            ? (t(
                '<div class="xs:flex-row xs:justify-between flex flex-col items-center px-3 py-3 dark:bg-slate-700">',
              ),
              t(
                S(
                  d,
                  {
                    pagination: s.pagination,
                    offset: 4,
                    onPaginate: i.getUsers,
                  },
                  null,
                  a,
                ),
              ),
              t('</div>'))
            : t('\x3c!----\x3e'),
          t('</div>');
      },
    ],
  ]),
  q = {
    name: 'UserFormModal',
    components: { AppModal: u, UserCircleIcon: s, Multiselect: A, Errors: N },
    props: {
      showingForm: { type: Boolean, default: !1 },
      newUser: { type: Boolean, default: !0 },
      loading: { type: Boolean, default: !1 },
      user: { type: Object, default: null },
      availableRoles: { type: Array, default: null },
      useInlineMessage: { type: Boolean, default: !0 },
    },
    setup: () => ({}),
    data: () => ({
      userName: '',
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        roles: [],
        theme_dark: !1,
        email_verified_at: null,
      },
      submitting: !1,
      errors: null,
      changed: !1,
      ready: !1,
    }),
    computed: {},
    watch: {
      form: {
        handler(e, t) {
          this.ready && (this.changed = !0);
        },
        deep: !0,
        immediate: !1,
      },
    },
    created() {},
    mounted() {
      const e = this;
      if (e.user) {
        if (
          ((e.form = P(e.user)),
          e.user.name && (e.userName = e.user.name),
          e.user.roles)
        ) {
          const t = e.user.roles;
          e.form.roles = [];
          for (const a in t) e.form.roles.push(t[a].id);
        }
        setTimeout(() => {
          e.ready = !0;
        }, 100);
      } else e.ready = !0;
    },
    beforeUnmount() {},
    updated() {},
    methods: {
      ...d({ popToast: 'toast/popToast' }),
      parseDisplayDate: (e) =>
        e && 1 != e
          ? g(e).format('MMM Do YYYY, h:mma')
          : g(new Date()).format('MMM Do YYYY, h:mma'),
      async submit() {
        (this.error = null),
          (this.submitting = !0),
          this.newUser && (await this.createUser()),
          this.newUser || (await this.updateUser()),
          (this.submitting = !1);
      },
      async createUser() {
        await m
          .post('/api/users/create-user', this.form)
          .then(({ data: e }) => {
            this.$emit('userCreated', e.user),
              this.popToast({
                message: 'User Successfully Created!',
                timer: 5e3,
                icon: 'success',
              }),
              (this.submitting = !1);
          })
          .catch(({ response: e }) => {
            if (422 === e.status) {
              const { errors: t } = e.data;
              this.errors = t;
            } else
              this.popToast({
                message: 'Error Creating User',
                timer: 5e3,
                icon: 'error',
              });
            this.submitting = !1;
          }),
          (this.submitting = !1);
      },
      async updateUser() {
        await m
          .patch(`/api/users/update-user/${this.user.id}`, this.form)
          .then(({ data: e }) => {
            this.$emit('userUpdated', e.user),
              this.popToast({
                message: `User ${e.user.name} Successfully Updated!`,
                timer: 5e3,
                icon: 'success',
              }),
              (this.submitting = !1);
          })
          .catch(({ response: e }) => {
            if (422 === e.status) {
              const { errors: t } = e.data;
              this.errors = t;
            } else
              this.popToast({
                message: 'Error Updating User',
                timer: 5e3,
                icon: 'error',
              });
            this.submitting = !1;
          }),
          (this.submitting = !1);
      },
      toggleUserVerified() {
        this.form.email_verified_at
          ? (this.form.email_verified_at = null)
          : (this.form.email_verified_at = !0);
      },
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
const K = q.setup;
q.setup = (e, t) => {
  const a = C();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/users/UserFormModal.vue',
    ),
    K ? K(e, t) : void 0
  );
};
const G = {
  name: 'Users',
  components: {
    ChevronRightIcon: l,
    PerPage: f,
    UsersTable: O,
    UserPlusIcon: o,
    CircleSvg: i,
    UserFormModal: n(q, [
      [
        'ssrRender',
        function (e, t, a, r, s, l, o, i) {
          const n = h('AppModal'),
            d = h('Errors'),
            c = h('UserCircleIcon'),
            m = h('AppButton'),
            p = h('Multiselect');
          t(
            S(
              n,
              b({ 'show-modal': s.showingForm, onCloseModal: i.closeModal }, r),
              {
                title: y((e, t, a, r) => {
                  if (!t)
                    return [
                      _(
                        $(
                          s.newUser
                            ? 'Create User'
                            : 'Editing User ' + o.userName,
                        ),
                        1,
                      ),
                    ];
                  t(
                    `${B(
                      s.newUser ? 'Create User' : 'Editing User ' + o.userName,
                    )}`,
                  );
                }),
                body: y((e, t, a, r) => {
                  if (!t)
                    return [
                      o.errors && s.useInlineMessage
                        ? (w(),
                          U(
                            d,
                            {
                              key: 0,
                              content: o.errors,
                              errors: o.errors,
                              'container-class': 'w-100 mb-5',
                              type: 'error',
                              onClose: (e) => (o.errors = null),
                            },
                            null,
                            8,
                            ['content', 'errors', 'onClose'],
                          ))
                        : k('', !0),
                      v(
                        'form',
                        { onSubmit: R(() => {}, ['prevent']) },
                        [
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                { class: 'flex-item relative mb-3 mr-2' },
                                [
                                  o.form && o.form.avatar
                                    ? (w(),
                                      U(
                                        'img',
                                        {
                                          key: 0,
                                          src: o.form.avatar,
                                          alt: o.form.name,
                                          class:
                                            'float-left ml-2 mr-2 mt-1 h-10 w-10 rounded-full',
                                        },
                                        null,
                                        8,
                                        ['src', 'alt'],
                                      ))
                                    : (w(),
                                      U(c, {
                                        key: 1,
                                        class:
                                          'float-left ml-2 mr-2 mt-1 h-10 w-10 text-gray-500',
                                      })),
                                ],
                              ),
                              v(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  V(
                                    v(
                                      'input',
                                      {
                                        id: 'name',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.name = e),
                                        type: 'text',
                                        placeholder: 'Name',
                                        name: 'name',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.name
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[T, o.form.name]],
                                  ),
                                  v(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300',
                                    },
                                    [
                                      v(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-user',
                                            o.errors && o.errors.name
                                              ? 'text-red-600'
                                              : 'text-slate-300',
                                          ],
                                        },
                                        null,
                                        2,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  V(
                                    v(
                                      'input',
                                      {
                                        id: 'email',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.email = e),
                                        type: 'text',
                                        placeholder: 'E-mail',
                                        name: 'email',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.email
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[T, o.form.email]],
                                  ),
                                  v(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      v(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-envelope',
                                            o.errors && o.errors.email
                                              ? 'text-red-600'
                                              : 'text-slate-300',
                                          ],
                                        },
                                        null,
                                        2,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  V(
                                    v(
                                      'input',
                                      {
                                        id: 'password',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.password = e),
                                        type: 'password',
                                        placeholder: 'Password',
                                        name: 'password',
                                        autocomplete: 'on',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.password
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[T, o.form.password]],
                                  ),
                                  v(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      v(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-user-shield',
                                            o.errors && o.errors.email
                                              ? 'text-red-600'
                                              : 'text-slate-300',
                                          ],
                                        },
                                        null,
                                        2,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  V(
                                    v(
                                      'input',
                                      {
                                        id: 'password_confirmation',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.password_confirmation = e),
                                        type: 'password',
                                        placeholder: 'Password Confirmation',
                                        name: 'password_confirmation',
                                        autocomplete: 'on',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.password
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[T, o.form.password_confirmation]],
                                  ),
                                  v(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      v(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-user-shield',
                                            o.errors && o.errors.email
                                              ? 'text-red-600'
                                              : 'text-slate-300',
                                          ],
                                        },
                                        null,
                                        2,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                {
                                  class:
                                    'flex-item relative mb-3 ml-2 flex-auto',
                                },
                                [
                                  v('h6', { class: 'text-xs uppercase' }, [
                                    _(' Verified: '),
                                    v(
                                      m,
                                      {
                                        disabled: s.loading || o.submitting,
                                        class:
                                          'float-right ml-3 mb-2 bg-yellow-600 px-1 py-0 text-sm font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-lg focus:shadow-lg active:shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600',
                                        style: { width: '80px' },
                                        onClick: i.toggleUserVerified,
                                      },
                                      {
                                        text: y(() => [
                                          _(
                                            $(
                                              o.form && o.form.email_verified_at
                                                ? 'Un-Verify'
                                                : 'Verify',
                                            ),
                                            1,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['disabled', 'onClick'],
                                    ),
                                  ]),
                                  v(
                                    'div',
                                    { class: 'mt-2 whitespace-nowrap text-xs' },
                                    $(
                                      o.form && o.form.email_verified_at
                                        ? i.parseDisplayDate(
                                            o.form.email_verified_at,
                                          )
                                        : 'Not Verified',
                                    ),
                                    1,
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                {
                                  class:
                                    'flex-item relative mb-3 ml-3 flex-auto',
                                },
                                [
                                  v(
                                    'div',
                                    {
                                      class:
                                        'my-1 mr-3 w-full py-2 sm:flex sm:items-center',
                                    },
                                    [
                                      v(
                                        'span',
                                        {
                                          class:
                                            s.loading || o.submitting
                                              ? 'default disabled cursor-pointer'
                                              : 'cursor-pointer',
                                          onClick: (e) =>
                                            (o.form.theme_dark =
                                              !o.form.theme_dark),
                                        },
                                        [
                                          v(
                                            'span',
                                            {
                                              class: [
                                                'fa-solid fa-fw fa-2x float-left mr-4 text-slate-600 dark:text-gray-300',
                                                o.form.theme_dark
                                                  ? 'fa-toggle-on'
                                                  : 'fa-toggle-off',
                                              ],
                                            },
                                            null,
                                            2,
                                          ),
                                          s.loading
                                            ? (w(),
                                              U('span', {
                                                key: 0,
                                                class:
                                                  'fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600',
                                                style: {
                                                  left: '-1.4em',
                                                  top: '1.2em',
                                                },
                                              }))
                                            : k('', !0),
                                          v(
                                            'span',
                                            {
                                              class:
                                                'mt-1 inline-block text-sm',
                                            },
                                            $(
                                              o.form.theme_dark
                                                ? 'Dark Theme'
                                                : 'Light Theme',
                                            ),
                                            1,
                                          ),
                                        ],
                                        10,
                                        ['onClick'],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                { class: 'flex-item relative flex-auto' },
                                [
                                  v('h6', null, 'User Roles'),
                                  v(
                                    p,
                                    {
                                      modelValue: o.form.roles,
                                      'onUpdate:modelValue': (e) =>
                                        (o.form.roles = e),
                                      options: s.availableRoles,
                                      'track-by': 'id',
                                      label: 'name',
                                      mode: 'tags',
                                      placeholder: 'Select user roles',
                                    },
                                    null,
                                    8,
                                    [
                                      'modelValue',
                                      'onUpdate:modelValue',
                                      'options',
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          v(
                            'div',
                            {
                              class:
                                'relative mb-3 mt-5 flex w-full flex-wrap items-stretch',
                            },
                            [
                              v(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  o.form.created_at
                                    ? (w(),
                                      U(
                                        'div',
                                        { key: 0, class: 'float-left' },
                                        [
                                          _(' Created at: '),
                                          v(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            $(
                                              i.parseDisplayDate(
                                                o.form.created_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : k('', !0),
                                ],
                              ),
                              v(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  o.form.updated_at
                                    ? (w(),
                                      U(
                                        'div',
                                        { key: 0, class: 'float-right' },
                                        [
                                          _(' Updated at: '),
                                          v(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            $(
                                              i.parseDisplayDate(
                                                o.form.updated_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : k('', !0),
                                ],
                              ),
                            ],
                          ),
                        ],
                        40,
                        ['onSubmit'],
                      ),
                    ];
                  o.errors && s.useInlineMessage
                    ? t(
                        S(
                          d,
                          {
                            content: o.errors,
                            errors: o.errors,
                            'container-class': 'w-100 mb-5',
                            type: 'error',
                            onClose: (e) => (o.errors = null),
                          },
                          null,
                          a,
                          r,
                        ),
                      )
                    : t('\x3c!----\x3e'),
                    t(
                      `<form data-v-a1f3b03d${r}><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 mr-2" data-v-a1f3b03d${r}>`,
                    ),
                    o.form && o.form.avatar
                      ? t(
                          `<img${E('src', o.form.avatar)}${E(
                            'alt',
                            o.form.name,
                          )} class="float-left ml-2 mr-2 mt-1 h-10 w-10 rounded-full" data-v-a1f3b03d${r}>`,
                        )
                      : t(
                          S(
                            c,
                            {
                              class:
                                'float-left ml-2 mr-2 mt-1 h-10 w-10 text-gray-500',
                            },
                            null,
                            a,
                            r,
                          ),
                        ),
                    t(
                      `</div><div class="flex-item relative mb-3 flex-auto" data-v-a1f3b03d${r}><input id="name"${E(
                        'value',
                        o.form.name,
                      )} type="text" placeholder="Name" name="name" class="${M([
                        o.errors && o.errors.name
                          ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                          : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                        'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                      ])}" data-v-a1f3b03d${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300" data-v-a1f3b03d${r}><span class="${M(
                        [
                          o.errors && o.errors.name
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-user',
                        ],
                      )}" data-v-a1f3b03d${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 flex-auto" data-v-a1f3b03d${r}><input id="email"${E(
                        'value',
                        o.form.email,
                      )} type="text" placeholder="E-mail" name="email" class="${M(
                        [
                          o.errors && o.errors.email
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-a1f3b03d${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-a1f3b03d${r}><span class="${M(
                        [
                          o.errors && o.errors.email
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-envelope',
                        ],
                      )}" data-v-a1f3b03d${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 flex-auto" data-v-a1f3b03d${r}><input id="password"${E(
                        'value',
                        o.form.password,
                      )} type="password" placeholder="Password" name="password" autocomplete="on" class="${M(
                        [
                          o.errors && o.errors.password
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-a1f3b03d${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-a1f3b03d${r}><span class="${M(
                        [
                          o.errors && o.errors.email
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-user-shield',
                        ],
                      )}" data-v-a1f3b03d${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 flex-auto" data-v-a1f3b03d${r}><input id="password_confirmation"${E(
                        'value',
                        o.form.password_confirmation,
                      )} type="password" placeholder="Password Confirmation" name="password_confirmation" autocomplete="on" class="${M(
                        [
                          o.errors && o.errors.password
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-a1f3b03d${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-a1f3b03d${r}><span class="${M(
                        [
                          o.errors && o.errors.email
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-user-shield',
                        ],
                      )}" data-v-a1f3b03d${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 ml-2 flex-auto" data-v-a1f3b03d${r}><h6 class="text-xs uppercase" data-v-a1f3b03d${r}> Verified: `,
                    ),
                    t(
                      S(
                        m,
                        {
                          disabled: s.loading || o.submitting,
                          class:
                            'float-right ml-3 mb-2 bg-yellow-600 px-1 py-0 text-sm font-medium leading-snug leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-lg focus:shadow-lg active:shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600',
                          style: { width: '80px' },
                          onClick: i.toggleUserVerified,
                        },
                        {
                          text: y((e, t, a, r) => {
                            if (!t)
                              return [
                                _(
                                  $(
                                    o.form && o.form.email_verified_at
                                      ? 'Un-Verify'
                                      : 'Verify',
                                  ),
                                  1,
                                ),
                              ];
                            t(
                              `${B(
                                o.form && o.form.email_verified_at
                                  ? 'Un-Verify'
                                  : 'Verify',
                              )}`,
                            );
                          }),
                          _: 1,
                        },
                        a,
                        r,
                      ),
                    ),
                    t(
                      `</h6><div class="mt-2 whitespace-nowrap text-xs" data-v-a1f3b03d${r}>${B(
                        o.form && o.form.email_verified_at
                          ? i.parseDisplayDate(o.form.email_verified_at)
                          : 'Not Verified',
                      )}</div></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative mb-3 ml-3 flex-auto" data-v-a1f3b03d${r}><div class="my-1 mr-3 w-full py-2 sm:flex sm:items-center" data-v-a1f3b03d${r}><span class="${M(
                        s.loading || o.submitting
                          ? 'default disabled cursor-pointer'
                          : 'cursor-pointer',
                      )}" data-v-a1f3b03d${r}><span class="${M([
                        o.form.theme_dark ? 'fa-toggle-on' : 'fa-toggle-off',
                        'fa-solid fa-fw fa-2x float-left mr-4 text-slate-600 dark:text-gray-300',
                      ])}" data-v-a1f3b03d${r}></span>`,
                    ),
                    s.loading
                      ? t(
                          `<span class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600" style="${j(
                            { left: '-1.4em', top: '1.2em' },
                          )}" data-v-a1f3b03d${r}></span>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `<span class="mt-1 inline-block text-sm" data-v-a1f3b03d${r}>${B(
                        o.form.theme_dark ? 'Dark Theme' : 'Light Theme',
                      )}</span></span></div></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative flex-auto" data-v-a1f3b03d${r}><h6 data-v-a1f3b03d${r}>User Roles</h6>`,
                    ),
                    t(
                      S(
                        p,
                        {
                          modelValue: o.form.roles,
                          'onUpdate:modelValue': (e) => (o.form.roles = e),
                          options: s.availableRoles,
                          'track-by': 'id',
                          label: 'name',
                          mode: 'tags',
                          placeholder: 'Select user roles',
                        },
                        null,
                        a,
                        r,
                      ),
                    ),
                    t(
                      `</div></div><div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch" data-v-a1f3b03d${r}><div class="flex-item relative flex-auto text-xs uppercase" data-v-a1f3b03d${r}>`,
                    ),
                    o.form.created_at
                      ? t(
                          `<div class="float-left" data-v-a1f3b03d${r}> Created at: <div class="text-xs font-bold" data-v-a1f3b03d${r}>${B(
                            i.parseDisplayDate(o.form.created_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `</div><div class="flex-item relative flex-auto text-xs uppercase" data-v-a1f3b03d${r}>`,
                    ),
                    o.form.updated_at
                      ? t(
                          `<div class="float-right" data-v-a1f3b03d${r}> Updated at: <div class="text-xs font-bold" data-v-a1f3b03d${r}>${B(
                            i.parseDisplayDate(o.form.updated_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div></form>');
                }),
                footer: y((e, t, a, r) => {
                  if (!t)
                    return [
                      v('hr'),
                      v('div', { style: { width: '100%' } }, [
                        o.changed
                          ? (w(),
                            U(
                              m,
                              {
                                key: 0,
                                disabled:
                                  s.loading || o.submitting || !o.changed,
                                class:
                                  'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                                onClick: i.submit,
                              },
                              {
                                text: y(() => [
                                  _(
                                    $(
                                      s.newUser
                                        ? o.submitting
                                          ? 'Creating'
                                          : 'Create'
                                        : o.submitting
                                        ? 'Updating'
                                        : 'Update',
                                    ) + ' ',
                                    1,
                                  ),
                                  o.submitting
                                    ? (w(),
                                      U('span', {
                                        key: 0,
                                        class:
                                          'fa fa-circle-notch fa-spin ml-3',
                                      }))
                                    : k('', !0),
                                ]),
                                _: 1,
                              },
                              8,
                              ['disabled', 'onClick'],
                            ))
                          : k('', !0),
                        v(
                          m,
                          {
                            disabled: s.loading || o.submitting,
                            class:
                              'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                            onClick: i.closeModal,
                          },
                          {
                            text: y(() => [
                              _($(o.changed ? 'Cancel' : 'Close'), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['disabled', 'onClick'],
                        ),
                      ]),
                    ];
                  t(
                    `<hr data-v-a1f3b03d${r}><div style="${j({
                      width: '100%',
                    })}" data-v-a1f3b03d${r}>`,
                  ),
                    o.changed
                      ? t(
                          S(
                            m,
                            {
                              disabled: s.loading || o.submitting || !o.changed,
                              class:
                                'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                              onClick: i.submit,
                            },
                            {
                              text: y((e, t, a, r) => {
                                if (!t)
                                  return [
                                    _(
                                      $(
                                        s.newUser
                                          ? o.submitting
                                            ? 'Creating'
                                            : 'Create'
                                          : o.submitting
                                          ? 'Updating'
                                          : 'Update',
                                      ) + ' ',
                                      1,
                                    ),
                                    o.submitting
                                      ? (w(),
                                        U('span', {
                                          key: 0,
                                          class:
                                            'fa fa-circle-notch fa-spin ml-3',
                                        }))
                                      : k('', !0),
                                  ];
                                t(
                                  `${B(
                                    s.newUser
                                      ? o.submitting
                                        ? 'Creating'
                                        : 'Create'
                                      : o.submitting
                                      ? 'Updating'
                                      : 'Update',
                                  )} `,
                                ),
                                  o.submitting
                                    ? t(
                                        `<span class="fa fa-circle-notch fa-spin ml-3" data-v-a1f3b03d${r}></span>`,
                                      )
                                    : t('\x3c!----\x3e');
                              }),
                              _: 1,
                            },
                            a,
                            r,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      S(
                        m,
                        {
                          disabled: s.loading || o.submitting,
                          class:
                            'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                          onClick: i.closeModal,
                        },
                        {
                          text: y((e, t, a, r) => {
                            if (!t)
                              return [_($(o.changed ? 'Cancel' : 'Close'), 1)];
                            t(`${B(o.changed ? 'Cancel' : 'Close')}`);
                          }),
                          _: 1,
                        },
                        a,
                        r,
                      ),
                    ),
                    t('</div>');
                }),
                _: 1,
              },
              a,
            ),
          );
        },
      ],
      ['__scopeId', 'data-v-a1f3b03d'],
    ]),
  },
  props: {},
  setup: () => ({}),
  data: () => ({
    users: [],
    pagination: {},
    perPage: 10,
    dataReady: !1,
    showCreateUserForm: !1,
    userEditing: null,
    creatingNewUser: !1,
    userFormKey: 432489,
    availableRoles: [],
    rolesDataReady: !1,
    lockJigled: !1,
  }),
  computed: {
    ...c({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getRoles(), this.getUsers();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...d({
      popToast: 'toast/popToast',
      verifyResend: 'auth/verifyResend',
      impersonateUser: 'auth/impersonateUser',
    }),
    perPageChanged(e) {
      (this.perPage = parseInt(e)),
        (this.pagination.current_page = 1),
        this.getUsers();
    },
    async getUsers(e = null) {
      e && (this.pagination.current_page = e),
        await m
          .get(
            `/api/users?page=${this.pagination.current_page}&per=${this.perPage}`,
          )
          .then(({ data: e }) => {
            (this.users = e.data),
              delete e.data,
              (this.pagination = e),
              (this.dataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Users',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          }),
        (this.dataReady = !0);
    },
    async confirmUnVerifyUser(e) {
      await m
        .post('/api/users/toggle-verify', { action: 'unVerifyUser', user: e })
        .then(({ data: e }) => {
          (this.users = this.users.map((t) => (t.id !== e.id ? t : e))),
            this.popToast({
              message: 'Successfully Un-Verified!',
              timer: 5e3,
              icon: 'warning',
            });
        })
        .catch(({ response: e }) => {
          this.popToast({
            message: 'Error Un-Verifying User',
            timer: 5e3,
            icon: 'error',
          }),
            (this.dataReady = !0);
        });
    },
    async confirmVerifyUser(e) {
      await m
        .post('/api/users/toggle-verify', {
          action: 'confirmVerifyUser',
          user: e,
        })
        .then(({ data: e }) => {
          (this.users = this.users.map((t) => (t.id !== e.id ? t : e))),
            this.popToast({
              message: 'Successfully Verified!',
              timer: 5e3,
              icon: 'success',
            });
        })
        .catch(({ response: e }) => {
          this.popToast({
            message: 'Error Verifying User',
            timer: 5e3,
            icon: 'error',
          }),
            (this.dataReady = !0);
        });
    },
    async deleteUser(e) {
      await m
        .delete(`/api/users/delete/user/${e.id}`)
        .then(({ data: e }) => {
          (this.users = this.users.filter((t) => t.id != e.id)),
            this.popToast({
              message: 'Successfully Deleted!',
              timer: 5e3,
              icon: 'success',
            });
        })
        .catch(({ response: e }) => {
          this.popToast({
            message: 'Error Deleting User',
            timer: 5e3,
            icon: 'error',
          }),
            (this.dataReady = !0);
        });
    },
    async getRoles() {
      (this.rolesDataReady = !1),
        await m
          .get('/api/roles')
          .then(({ data: e }) => {
            (this.availableRoles = e.roles), (this.rolesDataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Roles',
              timer: 5e3,
              icon: 'error',
            }),
              (this.rolesDataReady = !0);
          });
    },
    triggerCreateUser() {
      (this.userFormKey += 1),
        (this.creatingNewUser = !0),
        (this.showCreateUserForm = !0),
        (this.userEditing = null);
    },
    triggerUpdateUser(e) {
      (this.creatingNewUser = !1), (this.userEditing = e);
    },
    userCreated(e) {
      this.users.push(e), this.getUsers(), this.closeUserForm();
    },
    userUpdated(e) {
      (this.users = this.users.map((t) => (t.id !== e.id ? t : e))),
        this.getUsers(),
        this.jiggleTheLock(),
        this.closeUserForm();
    },
    jiggleTheLock() {
      const e = this;
      (e.lockJigled = !0),
        setTimeout(() => {
          e.lockJigled = !1;
        }, 1);
    },
    closeUserForm() {
      (this.userEditing = null),
        (this.creatingNewUser = !1),
        (this.showCreateUserForm = !1);
    },
    editUser(e) {
      (this.userFormKey += 1),
        (this.userEditing = e),
        (this.creatingNewUser = !1),
        (this.showCreateUserForm = !0);
    },
    async sendUserVerification(e) {
      try {
        await this.verifyResend({ id: e.id }).then((e) => {
          this.popToast({
            message: 'Email sent.',
            timer: 5e3,
            icon: 'success',
          });
        });
      } catch (t) {
        this.popToast({
          message: 'An errored, please try again later.',
          timer: 5e3,
          icon: 'error',
        });
      }
    },
    async impersonateUserTriggered(e) {
      try {
        await this.impersonateUser({ user: e }).then((e) => {});
      } catch (t) {
        this.popToast({
          message: 'Unable To Impersonate User',
          timer: 5e3,
          icon: 'error',
        });
      }
    },
  },
};
const H = G.setup;
G.setup = (e, t) => {
  const a = C();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/views/admin/Users.vue',
    ),
    H ? H(e, t) : void 0
  );
};
const Q = n(G, [
  [
    'ssrRender',
    function (e, t, a, r, s, l, o, i) {
      const n = h('router-link'),
        d = h('ChevronRightIcon'),
        c = h('PerPage'),
        m = h('AppButton'),
        p = h('UserPlusIcon'),
        u = h('CircleSvg'),
        f = h('UsersTable'),
        g = h('UserFormModal'),
        $ = x('tippy');
      t(
        `<div${D(
          b(
            {
              id: 'users',
              class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200',
            },
            r,
          ),
        )} data-v-8114f2d7><nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb" data-v-8114f2d7><ol class="inline-flex list-none p-0" data-v-8114f2d7><li class="flex items-center" data-v-8114f2d7>`,
      ),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              S(
                n,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: y(({ isActive: e }, t, a, r) => {
                    if (!t) return [_(' Admin ')];
                    t(' Admin ');
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li><li class="flex items-center" data-v-8114f2d7>'),
        t(S(d, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a)),
        t('</li><li class="flex items-center" data-v-8114f2d7>'),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              S(
                n,
                {
                  to: { name: 'users' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: y(({ isActive: e }, t, a, r) => {
                    if (!t)
                      return [
                        v(
                          'span',
                          {
                            class: [
                              e &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' Users ',
                          2,
                        ),
                      ];
                    t(
                      `<span class="${M([
                        e &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}" data-v-8114f2d7${r}> Users </span>`,
                    );
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li></ol>'),
        t(
          S(
            c,
            {
              items: o.users,
              'per-page': o.perPage,
              class: 'float-right mb-2',
              style: { 'margin-top': '-0.5em' },
              onChanged: i.perPageChanged,
            },
            null,
            a,
          ),
        ),
        t('</nav>'),
        t(
          S(
            m,
            b(
              {
                disabled: o.showCreateUserForm || !o.dataReady,
                class: 'float-right mb-2 px-2 py-2 text-sm font-medium',
                onClick: i.triggerCreateUser,
              },
              F(e, $, 'Create User'),
            ),
            {
              text: y((e, t, a, r) => {
                if (!t)
                  return [
                    o.dataReady
                      ? (w(), U(p, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                      : k('', !0),
                    o.dataReady
                      ? k('', !0)
                      : (w(),
                        U(u, { key: 1, class: 'ml-2 mr-2 mt-0 h-4 w-4' })),
                    v('span', { class: 'sr-only' }, 'Create New User'),
                  ];
                o.dataReady
                  ? t(S(p, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                  : t('\x3c!----\x3e'),
                  o.dataReady
                    ? t('\x3c!----\x3e')
                    : t(S(u, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r)),
                  t(
                    `<span class="sr-only" data-v-8114f2d7${r}>Create New User</span>`,
                  );
              }),
              _: 1,
            },
            a,
          ),
        ),
        t(
          S(
            f,
            {
              users: o.users,
              pagination: o.pagination,
              'per-page': o.perPage,
              'data-ready': o.dataReady,
              'available-roles': o.availableRoles,
              'lock-jiggled': o.lockJigled,
              onGetUsers: i.getUsers,
              onConfirmUnVerifyUser: i.confirmUnVerifyUser,
              onConfirmVerifyUser: i.confirmVerifyUser,
              onDeleteUser: i.deleteUser,
              onEditUser: i.editUser,
              onSendUserVerification: i.sendUserVerification,
              onImpersonateUserTriggered: i.impersonateUserTriggered,
            },
            null,
            a,
          ),
        ),
        t(
          S(
            g,
            {
              key: o.userFormKey,
              'showing-form': o.showCreateUserForm,
              user: o.userEditing,
              'new-user': o.creatingNewUser,
              'available-roles': o.availableRoles,
              onCloseModal: i.closeUserForm,
              onUserCreated: i.userCreated,
              onUserUpdated: i.userUpdated,
            },
            null,
            a,
          ),
        ),
        t('</div>');
    },
  ],
  ['__scopeId', 'data-v-8114f2d7'],
]);
export { Q as default };
