import {
  LockClosedIcon as e,
  LockOpenIcon as t,
  PencilSquareIcon as a,
  TrashIcon as r,
  UserCircleIcon as s,
  ChevronRightIcon as l,
} from '@heroicons/vue/24/outline';
import { mapActions as o, mapGetters as i } from 'vuex';
import n from 'axios';
import {
  P as d,
  A as c,
  a as p,
} from './default.css_vue_type_style_index_0_src_true_lang-6d22712f.mjs';
import m from 'moment';
import { C as u, _ as g } from '../app2.mjs';
import {
  resolveComponent as h,
  mergeProps as x,
  withCtx as f,
  openBlock as b,
  createBlock as v,
  createCommentVNode as y,
  createVNode as w,
  toDisplayString as k,
  useSSRContext as R,
  createTextVNode as $,
  withModifiers as C,
  withDirectives as D,
  vModelText as U,
  resolveDirective as T,
} from 'vue';
import {
  ssrRenderAttrs as _,
  ssrInterpolate as M,
  ssrRenderComponent as P,
  ssrRenderList as S,
  ssrRenderAttr as j,
  ssrRenderClass as E,
  ssrRenderStyle as F,
  ssrGetDirectiveProps as V,
} from 'vue/server-renderer';
import B from 'lodash.clonedeep';
import A from '@vueform/multiselect';
import { E as I } from './Errors-cfd7b346.mjs';
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
const N = {
  name: 'RolesTableRow',
  components: {
    LockClosedIcon: e,
    LockOpenIcon: t,
    CircleSvg: u,
    PencilSquareIcon: a,
    TrashIcon: r,
  },
  props: {
    role: { type: Object, required: !0 },
    dataReady: { type: Boolean, default: !1 },
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
    ...o({ popToast: 'toast/popToast' }),
    parseDisplayDate: (e) => m(e).format('MMM Do YYYY, h:mma'),
    triggerEditRole() {
      this.$emit('editRole', this.role);
    },
    triggerDeleteRole() {
      const e = this,
        t = `<strong>Delete ${this.role.name}?</strong>`;
      this.role.name;
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
            ? this.$emit('deleteRole', this.role)
            : t.isDenied &&
              e.popToast({ message: 'Cancelled', timer: 2e3, icon: 'error' });
        });
    },
  },
};
const L = N.setup;
N.setup = (e, t) => {
  const a = R();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/admin/RolesTableRow.vue',
    ),
    L ? L(e, t) : void 0
  );
};
const Y = {
  name: 'RolesTable',
  components: {
    Pagination: d,
    RolesTableRow: g(N, [
      [
        'ssrRender',
        function (e, t, a, r, s, l, o, i) {
          const n = h('AppButton'),
            d = h('LockClosedIcon'),
            c = h('LockOpenIcon'),
            p = h('CircleSvg'),
            m = h('PencilSquareIcon'),
            u = h('TrashIcon');
          t(
            `<tr${_(
              x(
                {
                  class:
                    'bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100',
                },
                r,
              ),
            )}><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center">${M(
              s.role.id,
            )}</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center whitespace-nowrap">${M(
              s.role.name,
            )}</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center">${M(
              s.role.slug,
            )}</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center text-xs">${M(
              s.role.description,
            )}</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center">${M(
              s.role.level,
            )}</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center">`,
          ),
            s.role.created_at
              ? t(
                  `<span class="whitespace-nowrap text-xs">${M(
                    i.parseDisplayDate(s.role.created_at),
                  )}</span>`,
                )
              : t('\x3c!----\x3e'),
            t(
              '</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center">',
            ),
            s.role.updated_at
              ? t(
                  `<span class="whitespace-nowrap text-xs">${M(
                    i.parseDisplayDate(s.role.updated_at),
                  )}</span>`,
                )
              : t('\x3c!----\x3e'),
            t(
              '</div></td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">',
            ),
            s.role && s.role.users && s.role.users.length >= 0
              ? t(
                  `<div class="flex items-center">${M(
                    s.role.users.length,
                  )}</div>`,
                )
              : t('\x3c!----\x3e'),
            t(
              '</td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500">',
            ),
            s.role && s.role.permissions && s.role.permissions.length >= 0
              ? t(
                  `<div class="flex items-center">${M(
                    s.role.permissions.length,
                  )}</div>`,
                )
              : t('\x3c!----\x3e'),
            t(
              '</td><td class="border-b border-gray-300 px-5 py-5 text-sm dark:border-gray-500"><div class="flex items-center whitespace-nowrap">',
            ),
            t(
              P(
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
                  text: f((e, t, a, r) => {
                    if (!t)
                      return [
                        o.locked && s.dataReady
                          ? (b(),
                            v(d, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : y('', !0),
                        !o.locked && s.dataReady
                          ? (b(),
                            v(c, { key: 1, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : y('', !0),
                        s.dataReady
                          ? y('', !0)
                          : (b(), v(p, { key: 2, class: 'mr-2 h-3 w-3' })),
                        w(
                          'span',
                          { class: 'sr-only' },
                          k(o.locked ? 'Unlock' : 'Lock') + ' User Settings',
                          1,
                        ),
                      ];
                    o.locked && s.dataReady
                      ? t(P(d, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      !o.locked && s.dataReady
                        ? t(
                            P(
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
                        : t(P(p, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(
                        `<span class="sr-only"${r}>${M(
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
              P(
                n,
                {
                  warning: '',
                  disabled: o.locked,
                  loading: !s.dataReady,
                  class: 'mr-2 px-1 py-1 text-sm',
                  onClick: i.triggerEditRole,
                },
                {
                  text: f((e, t, a, r) => {
                    if (!t)
                      return [
                        s.dataReady
                          ? (b(),
                            v(m, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : y('', !0),
                        s.dataReady
                          ? y('', !0)
                          : (b(), v(p, { key: 1, class: 'mr-2 h-3 w-3' })),
                        w('span', { class: 'sr-only' }, 'Edit Role'),
                      ];
                    s.dataReady
                      ? t(P(m, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(P(p, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(`<span class="sr-only"${r}>Edit Role</span>`);
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t(
              P(
                n,
                {
                  danger: '',
                  disabled:
                    o.locked ||
                    (s.role && s.role.users && s.role.users.length > 0),
                  loading: !s.dataReady,
                  class: 'mr-2 px-1 py-1 text-sm',
                  onClick: i.triggerDeleteRole,
                },
                {
                  text: f((e, t, a, r) => {
                    if (!t)
                      return [
                        s.dataReady
                          ? (b(),
                            v(u, { key: 0, class: 'ml-2 mr-2 mt-0 h-4 w-4' }))
                          : y('', !0),
                        s.dataReady
                          ? y('', !0)
                          : (b(), v(p, { key: 1, class: 'mr-2 h-3 w-3' })),
                        w('span', { class: 'sr-only' }, 'Delete Role'),
                      ];
                    s.dataReady
                      ? t(P(u, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r))
                      : t('\x3c!----\x3e'),
                      s.dataReady
                        ? t('\x3c!----\x3e')
                        : t(P(p, { class: 'mr-2 h-3 w-3' }, null, a, r)),
                      t(`<span class="sr-only"${r}>Delete Role</span>`);
                  }),
                  _: 1,
                },
                a,
              ),
            ),
            t('</div></td></tr>');
        },
      ],
    ]),
  },
  props: {
    dataReady: { type: Boolean, default: !1 },
    lockJiggled: { type: Boolean, default: !1 },
    rolesData: { type: Array, default: () => [] },
    pagination: { type: Object, default: () => ({}) },
  },
  setup: () => ({}),
  data: () => ({ offset: 4 }),
  computed: {
    ...i({
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
    ...o({ popToast: 'toast/popToast' }),
    getRoles(e) {
      this.$emit('getRoles', e);
    },
    deleteRole(e) {
      this.$emit('deleteRole', e);
    },
    editRole(e) {
      this.$emit('editRole', e);
    },
  },
};
const z = Y.setup;
Y.setup = (e, t) => {
  const a = R();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/admin/RolesTable.vue',
    ),
    z ? z(e, t) : void 0
  );
};
const J = g(Y, [
    [
      'ssrRender',
      function (e, t, a, r, s, l, o, i) {
        const n = h('RolesTableRow'),
          d = h('Pagination');
        t(
          `<div${_(
            x(
              {
                class: 'overflow-x-scroll rounded-lg shadow',
                style: { width: '100%' },
              },
              r,
            ),
          )}><table class="min-w-full leading-normal" aria-describedby="Users Table"><thead><tr class="border-b-2 border-gray-300 bg-gray-200 text-gray-600 dark:border-gray-500 dark:bg-slate-900 dark:text-gray-200"><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Id </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Name </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Slug </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Description </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Level </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Updated At </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Updated At </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Users </th><th class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"> Permissions </th><th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"></th></tr></thead>`,
        ),
          s.dataReady
            ? (t('<tbody>\x3c!--[--\x3e'),
              S(s.rolesData, (e) => {
                t(
                  P(
                    n,
                    {
                      role: e,
                      'data-ready': s.dataReady,
                      'lock-jiggled': s.lockJiggled,
                      onEditRole: i.editRole,
                      onDeleteRole: i.deleteRole,
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
                '<tbody><tr class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100"><td colspan="10" class="pt-10 pb-10 text-center"><span class="fa fa-circle-notch fa-spin fa-5x text-gray-400"></span></td></tr></tbody>',
              ),
          t('<tfoot class="w-full text-center"><tr><td colspan="10">'),
          s.dataReady && s.rolesData && s.rolesData.length >= 1
            ? (t(
                '<div class="xs:flex-row xs:justify-between flex flex-col items-center px-3 py-3 dark:bg-slate-700">',
              ),
              t(
                P(
                  d,
                  {
                    pagination: s.pagination,
                    offset: 4,
                    onPaginate: i.getRoles,
                  },
                  null,
                  a,
                ),
              ),
              t('</div>'))
            : t('\x3c!----\x3e'),
          t('</td></tr></tfoot></table></div>');
      },
    ],
  ]),
  O = {
    name: 'UserFormModal',
    components: { AppModal: c, UserCircleIcon: s, Multiselect: A, Errors: I },
    props: {
      showingForm: { type: Boolean, default: !1 },
      newRole: { type: Boolean, default: !0 },
      loading: { type: Boolean, default: !1 },
      role: { type: Object, default: null },
      useInlineMessage: { type: Boolean, default: !1 },
      availablePermissions: { type: Array, default: null },
    },
    setup: () => ({}),
    data: () => ({
      roleName: '',
      form: {
        name: null,
        slug: null,
        description: null,
        level: 0,
        permissions: [],
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
      e.role
        ? ((e.form = B(e.role)),
          e.role.name && (e.roleName = e.role.name),
          (e.form.permissions = e.form.permissions.map((e) => e.id)),
          setTimeout(() => {
            e.ready = !0;
          }, 100))
        : (e.ready = !0);
    },
    beforeUnmount() {},
    updated() {},
    methods: {
      ...o({ popToast: 'toast/popToast' }),
      parseDisplayDate: (e) =>
        e && 1 != e
          ? m(e).format('MMM Do YYYY, h:mma')
          : m(new Date()).format('MMM Do YYYY, h:mma'),
      async submit() {
        (this.error = null),
          (this.submitting = !0),
          this.newRole && (await this.createRole()),
          this.newRole || (await this.updateRole()),
          (this.submitting = !1);
      },
      formValid() {
        return (
          (this.errors = null),
          !!this.form &&
            (this.form.name ||
              ((this.errors = {}), (this.errors.name = 'Missing Role Name')),
            this.form.slug ||
              (this.errors || (this.errors = {}),
              (this.errors.slug = 'Missing Role Slug')),
            !this.errors)
        );
      },
      async createRole() {
        if (!this.formValid())
          return (
            (this.submitting = !1),
            void this.popToast({
              message: 'Error Validating Role',
              timer: 5e3,
              icon: 'error',
            })
          );
        await n
          .post('/api/roles/create-role', this.form)
          .then(({ data: e }) => {
            this.$emit('roleCreated', e.role),
              this.popToast({
                message: 'Role Successfully Created!',
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
                message: 'Error Creating Role',
                timer: 5e3,
                icon: 'error',
              });
            this.submitting = !1;
          }),
          (this.submitting = !1);
      },
      async updateRole() {
        const e = this;
        if (!this.formValid())
          return (
            (this.submitting = !1),
            void this.popToast({
              message: 'Error Validating Role',
              timer: 5e3,
              icon: 'error',
            })
          );
        await n
          .patch(`/api/roles/update-role/${e.role.id}`, e.form)
          .then(({ data: t }) => {
            e.$emit('roleUpdated', t.role),
              e.popToast({
                message: `Role ${t.role.name} Successfully Updated!`,
                timer: 5e3,
                icon: 'success',
              }),
              (e.submitting = !1);
          })
          .catch(({ response: t }) => {
            if (422 === t.status) {
              const { errors: a } = t.data;
              e.errors = a;
            } else
              e.popToast({
                message: 'Error Updating Role',
                timer: 5e3,
                icon: 'error',
              });
            e.submitting = !1;
          }),
          (e.submitting = !1);
      },
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
const q = O.setup;
O.setup = (e, t) => {
  const a = R();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/roles/RoleFormModal.vue',
    ),
    q ? q(e, t) : void 0
  );
};
const K = {
  name: 'Roles',
  components: {
    ChevronRightIcon: l,
    RolesTable: J,
    RoleFormModal: g(O, [
      [
        'ssrRender',
        function (e, t, a, r, s, l, o, i) {
          const n = h('AppModal'),
            d = h('Errors'),
            c = h('Multiselect'),
            p = h('AppButton');
          t(
            P(
              n,
              x({ 'show-modal': s.showingForm, onCloseModal: i.closeModal }, r),
              {
                title: f((e, t, a, r) => {
                  if (!t)
                    return [
                      $(
                        k(
                          s.newRole
                            ? 'Create Role'
                            : 'Editing Role ' + o.roleName,
                        ),
                        1,
                      ),
                    ];
                  t(
                    `${M(
                      s.newRole ? 'Create Role' : 'Editing Role ' + o.roleName,
                    )}`,
                  );
                }),
                body: f((e, t, a, r) => {
                  if (!t)
                    return [
                      o.errors && s.useInlineMessage
                        ? (b(),
                          v(
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
                        : y('', !0),
                      w(
                        'form',
                        { onSubmit: C(() => {}, ['prevent']) },
                        [
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  w('label', { for: 'name' }, ' Name '),
                                  D(
                                    w(
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
                                    [[U, o.form.name]],
                                  ),
                                  w(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300',
                                    },
                                    [
                                      w(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-lock',
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
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  w('label', { for: 'slug' }, ' Slug '),
                                  D(
                                    w(
                                      'input',
                                      {
                                        id: 'slug',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.slug = e),
                                        type: 'text',
                                        placeholder: 'Slug',
                                        name: 'slug',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.slug
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[U, o.form.slug]],
                                  ),
                                  w(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      w(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-code',
                                            o.errors && o.errors.slug
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
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  w(
                                    'label',
                                    { for: 'description' },
                                    ' Description ',
                                  ),
                                  D(
                                    w(
                                      'textarea',
                                      {
                                        id: 'description',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.description = e),
                                        type: 'text',
                                        placeholder: 'Description',
                                        name: 'description',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.description
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[U, o.form.description]],
                                  ),
                                  w(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      w(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-pencil',
                                            o.errors && o.errors.description
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
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  w('label', { for: 'level' }, ' Level '),
                                  D(
                                    w(
                                      'input',
                                      {
                                        id: 'level',
                                        'onUpdate:modelValue': (e) =>
                                          (o.form.level = e),
                                        type: 'number',
                                        placeholder: 'Level',
                                        name: 'level',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          o.errors && o.errors.level
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[U, o.form.level]],
                                  ),
                                  w(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      w(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-pencil',
                                            o.errors && o.errors.level
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
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                {
                                  class:
                                    'flex-item relative mb-3 max-w-2xl flex-auto',
                                },
                                [
                                  w('h6', null, 'Role Permissions'),
                                  w(
                                    c,
                                    {
                                      modelValue: o.form.permissions,
                                      'onUpdate:modelValue': (e) =>
                                        (o.form.permissions = e),
                                      options: s.availablePermissions,
                                      'track-by': 'id',
                                      label: 'name',
                                      mode: 'tags',
                                      placeholder: 'Select role permissions',
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
                          s.role &&
                          s.role.users &&
                          s.role.users.length &&
                          s.role.users.length > 0
                            ? (b(),
                              v(
                                'div',
                                {
                                  key: 0,
                                  class:
                                    'relative mb-3 mt-5 flex w-full flex-wrap items-stretch',
                                },
                                [
                                  w(
                                    'div',
                                    {
                                      class:
                                        'flex-item relative flex-auto text-xs',
                                    },
                                    [
                                      w('strong', { class: 'text-red-400' }, [
                                        w('span', {
                                          class: 'fas fa-warning fa-fw mr-1',
                                        }),
                                        $('Warning'),
                                      ]),
                                      $(': This will affect '),
                                      w(
                                        'span',
                                        { class: 'font-bold' },
                                        k(s.role.users.length),
                                        1,
                                      ),
                                      $(
                                        ' User' +
                                          k(s.role.users.length > 1 ? 's' : ''),
                                        1,
                                      ),
                                    ],
                                  ),
                                ],
                              ))
                            : y('', !0),
                          w(
                            'div',
                            {
                              class:
                                'relative mb-3 mt-5 flex w-full flex-wrap items-stretch',
                            },
                            [
                              w(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  o.form.created_at
                                    ? (b(),
                                      v(
                                        'div',
                                        { key: 0, class: 'float-left' },
                                        [
                                          $(' Created at: '),
                                          w(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            k(
                                              i.parseDisplayDate(
                                                o.form.created_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : y('', !0),
                                ],
                              ),
                              w(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  o.form.updated_at
                                    ? (b(),
                                      v(
                                        'div',
                                        { key: 0, class: 'float-right' },
                                        [
                                          $(' Updated at: '),
                                          w(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            k(
                                              i.parseDisplayDate(
                                                o.form.updated_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : y('', !0),
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
                        P(
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
                      `<form data-v-3283c55c${r}><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative mb-3 flex-auto" data-v-3283c55c${r}><label for="name" data-v-3283c55c${r}> Name </label><input id="name"${j(
                        'value',
                        o.form.name,
                      )} type="text" placeholder="Name" name="name" class="${E([
                        o.errors && o.errors.name
                          ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                          : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                        'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                      ])}" data-v-3283c55c${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300" data-v-3283c55c${r}><span class="${E(
                        [
                          o.errors && o.errors.name
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-lock',
                        ],
                      )}" data-v-3283c55c${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative mb-3 flex-auto" data-v-3283c55c${r}><label for="slug" data-v-3283c55c${r}> Slug </label><input id="slug"${j(
                        'value',
                        o.form.slug,
                      )} type="text" placeholder="Slug" name="slug" class="${E([
                        o.errors && o.errors.slug
                          ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                          : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                        'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                      ])}" data-v-3283c55c${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-3283c55c${r}><span class="${E(
                        [
                          o.errors && o.errors.slug
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-code',
                        ],
                      )}" data-v-3283c55c${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative mb-3 flex-auto" data-v-3283c55c${r}><label for="description" data-v-3283c55c${r}> Description </label><textarea id="description" type="text" placeholder="Description" name="description" class="${E(
                        [
                          o.errors && o.errors.description
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-3283c55c${r}>${M(
                        o.form.description,
                      )}</textarea><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-3283c55c${r}><span class="${E(
                        [
                          o.errors && o.errors.description
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-pencil',
                        ],
                      )}" data-v-3283c55c${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative mb-3 flex-auto" data-v-3283c55c${r}><label for="level" data-v-3283c55c${r}> Level </label><input id="level"${j(
                        'value',
                        o.form.level,
                      )} type="number" placeholder="Level" name="level" class="${E(
                        [
                          o.errors && o.errors.level
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-3283c55c${r}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-3283c55c${r}><span class="${E(
                        [
                          o.errors && o.errors.level
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-pencil',
                        ],
                      )}" data-v-3283c55c${r}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative mb-3 max-w-2xl flex-auto" data-v-3283c55c${r}><h6 data-v-3283c55c${r}>Role Permissions</h6>`,
                    ),
                    t(
                      P(
                        c,
                        {
                          modelValue: o.form.permissions,
                          'onUpdate:modelValue': (e) =>
                            (o.form.permissions = e),
                          options: s.availablePermissions,
                          'track-by': 'id',
                          label: 'name',
                          mode: 'tags',
                          placeholder: 'Select role permissions',
                        },
                        null,
                        a,
                        r,
                      ),
                    ),
                    t('</div></div>'),
                    s.role &&
                    s.role.users &&
                    s.role.users.length &&
                    s.role.users.length > 0
                      ? t(
                          `<div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative flex-auto text-xs" data-v-3283c55c${r}><strong class="text-red-400" data-v-3283c55c${r}><span class="fas fa-warning fa-fw mr-1" data-v-3283c55c${r}></span>Warning</strong>: This will affect <span class="font-bold" data-v-3283c55c${r}>${M(
                            s.role.users.length,
                          )}</span> User${M(
                            s.role.users.length > 1 ? 's' : '',
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `<div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch" data-v-3283c55c${r}><div class="flex-item relative flex-auto text-xs uppercase" data-v-3283c55c${r}>`,
                    ),
                    o.form.created_at
                      ? t(
                          `<div class="float-left" data-v-3283c55c${r}> Created at: <div class="text-xs font-bold" data-v-3283c55c${r}>${M(
                            i.parseDisplayDate(o.form.created_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `</div><div class="flex-item relative flex-auto text-xs uppercase" data-v-3283c55c${r}>`,
                    ),
                    o.form.updated_at
                      ? t(
                          `<div class="float-right" data-v-3283c55c${r}> Updated at: <div class="text-xs font-bold" data-v-3283c55c${r}>${M(
                            i.parseDisplayDate(o.form.updated_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div></form>');
                }),
                footer: f((e, t, a, r) => {
                  if (!t)
                    return [
                      w('div', { style: { width: '100%' } }, [
                        o.changed
                          ? (b(),
                            v(
                              p,
                              {
                                key: 0,
                                disabled:
                                  s.loading || o.submitting || !o.changed,
                                class:
                                  'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                                onClick: i.submit,
                              },
                              {
                                text: f(() => [
                                  $(
                                    k(
                                      s.newRole
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
                                    ? (b(),
                                      v('span', {
                                        key: 0,
                                        class:
                                          'fa fa-circle-notch fa-spin ml-3',
                                      }))
                                    : y('', !0),
                                ]),
                                _: 1,
                              },
                              8,
                              ['disabled', 'onClick'],
                            ))
                          : y('', !0),
                        w(
                          p,
                          {
                            disabled: s.loading || o.submitting,
                            class:
                              'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                            onClick: i.closeModal,
                          },
                          {
                            text: f(() => [
                              $(k(o.changed ? 'Cancel' : 'Close'), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['disabled', 'onClick'],
                        ),
                      ]),
                    ];
                  t(
                    `<div style="${F({ width: '100%' })}" data-v-3283c55c${r}>`,
                  ),
                    o.changed
                      ? t(
                          P(
                            p,
                            {
                              disabled: s.loading || o.submitting || !o.changed,
                              class:
                                'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                              onClick: i.submit,
                            },
                            {
                              text: f((e, t, a, r) => {
                                if (!t)
                                  return [
                                    $(
                                      k(
                                        s.newRole
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
                                      ? (b(),
                                        v('span', {
                                          key: 0,
                                          class:
                                            'fa fa-circle-notch fa-spin ml-3',
                                        }))
                                      : y('', !0),
                                  ];
                                t(
                                  `${M(
                                    s.newRole
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
                                        `<span class="fa fa-circle-notch fa-spin ml-3" data-v-3283c55c${r}></span>`,
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
                      P(
                        p,
                        {
                          disabled: s.loading || o.submitting,
                          class:
                            'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                          onClick: i.closeModal,
                        },
                        {
                          text: f((e, t, a, r) => {
                            if (!t)
                              return [$(k(o.changed ? 'Cancel' : 'Close'), 1)];
                            t(`${M(o.changed ? 'Cancel' : 'Close')}`);
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
      ['__scopeId', 'data-v-3283c55c'],
    ]),
    CircleSvg: u,
    PerPage: p,
  },
  props: {},
  setup: () => ({}),
  data: () => ({
    dataReady: !1,
    rolesData: null,
    pagination: {},
    perPage: 25,
    lockJigled: !1,
    showCreateRoleForm: !1,
    roleEditing: null,
    creatingNewRole: !1,
    roleFormKey: 432489,
    availablePermissions: [],
    permissionsDataReady: !1,
  }),
  computed: {
    ...i({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getRoles(), this.getPermissions();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...o({ popToast: 'toast/popToast' }),
    perPageChanged(e) {
      (this.perPage = parseInt(e)),
        (this.pagination.current_page = 1),
        this.getRoles();
    },
    async getRoles(e = null) {
      e && (this.pagination.current_page = e),
        await n
          .get(
            `/api/roles-complete?page=${this.pagination.current_page}&per=${this.perPage}`,
          )
          .then(({ data: e }) => {
            (this.rolesData = e.data),
              delete e.data,
              (this.pagination = e),
              (this.dataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Roles',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          }),
        (this.dataReady = !0);
    },
    async getPermissions() {
      (this.permissionsDataReady = !1),
        await n
          .get('/api/permissions')
          .then(({ data: e }) => {
            (this.availablePermissions = e.permissions),
              (this.permissionsDataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Permissions',
              timer: 5e3,
              icon: 'error',
            }),
              (this.permissionsDataReady = !0);
          }),
        (this.permissionsDataReady = !0);
    },
    async deleteRole(e) {
      await n
        .delete(`/api/roles/delete/role/${e.id}`)
        .then(({ data: e }) => {
          (this.rolesData = this.rolesData.filter((t) => t.id != e.id)),
            this.popToast({
              message: 'Successfully Deleted Role!',
              timer: 5e3,
              icon: 'success',
            });
        })
        .catch(({ response: e }) => {
          this.popToast({
            message: 'Error Deleting Role',
            timer: 5e3,
            icon: 'error',
          }),
            (this.dataReady = !0);
        });
    },
    jiggleTheLock() {
      const e = this;
      (e.lockJigled = !0),
        setTimeout(() => {
          e.lockJigled = !1;
        }, 1);
    },
    closeRoleForm() {
      (this.roleEditing = null),
        (this.creatingNewRole = !1),
        (this.showCreateRoleForm = !1);
    },
    editRole(e) {
      (this.roleFormKey += 1),
        (this.roleEditing = e),
        (this.creatingNewRole = !1),
        (this.showCreateRoleForm = !0);
    },
    roleUpdated(e) {
      (this.rolesData = this.rolesData.map((t) => (t.id !== e.id ? t : e))),
        this.getRoles(),
        this.jiggleTheLock(),
        this.closeRoleForm();
    },
    roleCreated(e) {
      this.rolesData.push(e), this.getRoles(), this.closeRoleForm();
    },
    triggerCreateRole() {
      (this.roleFormKey += 1),
        (this.creatingNewRole = !0),
        (this.showCreateRoleForm = !0),
        (this.roleEditing = null);
    },
  },
};
const G = K.setup;
K.setup = (e, t) => {
  const a = R();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/views/admin/Roles.vue',
    ),
    G ? G(e, t) : void 0
  );
};
const W = g(K, [
  [
    'ssrRender',
    function (e, t, a, r, s, l, o, i) {
      const n = h('router-link'),
        d = h('ChevronRightIcon'),
        c = h('PerPage'),
        p = h('AppButton'),
        m = h('CircleSvg'),
        u = h('RolesTable'),
        g = h('RoleFormModal'),
        k = T('tippy');
      t(
        `<div${_(
          x(
            {
              id: 'roles',
              class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200',
            },
            r,
          ),
        )}><nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb"><ol class="inline-flex list-none p-0"><li class="flex items-center">`,
      ),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              P(
                n,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: f(({ isActive: e }, t, a, r) => {
                    if (!t) return [$(' Admin ')];
                    t(' Admin ');
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li><li class="flex items-center">'),
        t(P(d, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a)),
        t('</li><li class="flex items-center">'),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              P(
                n,
                {
                  to: { name: 'roles' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: f(({ isActive: e }, t, a, r) => {
                    if (!t)
                      return [
                        w(
                          'span',
                          {
                            class: [
                              e &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' Roles ',
                          2,
                        ),
                      ];
                    t(
                      `<span class="${E([
                        e &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}"${r}> Roles </span>`,
                    );
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li></ol>'),
        o.dataReady
          ? t(
              P(
                c,
                {
                  items: o.rolesData,
                  'per-page': o.perPage,
                  class: 'float-right mb-2',
                  style: { 'margin-top': '-0.5em' },
                  onChanged: i.perPageChanged,
                },
                null,
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</nav>'),
        t(
          P(
            p,
            x(
              {
                disabled: o.showCreateRoleForm || !o.dataReady,
                class: 'float-right mb-2 px-2 py-2 text-sm font-medium',
                onClick: i.triggerCreateRole,
              },
              V(e, k, 'Create Role'),
            ),
            {
              text: f((e, t, a, r) => {
                if (!t)
                  return [
                    o.dataReady
                      ? (b(),
                        v('span', {
                          key: 0,
                          class: 'fas fa-plus fa-fw ml-2 mr-2',
                        }))
                      : y('', !0),
                    o.dataReady
                      ? y('', !0)
                      : (b(),
                        v(m, { key: 1, class: 'ml-2 mr-2 mt-0 h-4 w-4' })),
                    w('span', { class: 'sr-only' }, 'Create New Role'),
                  ];
                o.dataReady
                  ? t(`<span class="fas fa-plus fa-fw ml-2 mr-2"${r}></span>`)
                  : t('\x3c!----\x3e'),
                  o.dataReady
                    ? t('\x3c!----\x3e')
                    : t(P(m, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a, r)),
                  t(`<span class="sr-only"${r}>Create New Role</span>`);
              }),
              _: 1,
            },
            a,
          ),
        ),
        t(
          P(
            u,
            {
              'roles-data': o.rolesData,
              pagination: o.pagination,
              'per-page': o.perPage,
              'data-ready': o.dataReady,
              'lock-jiggled': o.lockJigled,
              onGetRoles: i.getRoles,
              onEditRole: i.editRole,
              onDeleteRole: i.deleteRole,
            },
            null,
            a,
          ),
        ),
        t(
          P(
            g,
            {
              key: o.roleFormKey,
              'showing-form': o.showCreateRoleForm,
              role: o.roleEditing,
              'new-role': o.creatingNewRole,
              'available-permissions': o.availablePermissions,
              onCloseModal: i.closeRoleForm,
              onRoleCreated: i.roleCreated,
              onRoleUpdated: i.roleUpdated,
            },
            null,
            a,
          ),
        ),
        t('</div>');
    },
  ],
]);
export { W as default };
