import e from 'moment';
import {
  UserCircleIcon as t,
  ChevronRightIcon as s,
  LockClosedIcon as a,
  LockOpenIcon as r,
  PencilSquareIcon as o,
  TrashIcon as i,
} from '@heroicons/vue/24/outline';
import { mapActions as n, mapGetters as l } from 'vuex';
import d from 'axios';
import {
  A as m,
  a as p,
  P as c,
} from './default.css_vue_type_style_index_0_src_true_lang-6d22712f.mjs';
import u from 'lodash.clonedeep';
import g from '@vueform/multiselect';
import { E as h } from './Errors-cfd7b346.mjs';
import {
  resolveComponent as f,
  mergeProps as b,
  withCtx as x,
  createTextVNode as w,
  toDisplayString as v,
  openBlock as y,
  createBlock as k,
  createCommentVNode as P,
  createVNode as $,
  withModifiers as C,
  withDirectives as D,
  vModelText as _,
  useSSRContext as R,
  resolveDirective as U,
} from 'vue';
import {
  ssrRenderComponent as E,
  ssrInterpolate as T,
  ssrRenderAttr as M,
  ssrRenderClass as V,
  ssrRenderStyle as S,
  ssrRenderAttrs as B,
  ssrGetDirectiveProps as F,
  ssrGetDynamicModelProps as N,
} from 'vue/server-renderer';
import { _ as I, C as j } from '../app2.mjs';
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
const A = {
  name: 'PermissionFormModal',
  components: { AppModal: m, UserCircleIcon: t, Multiselect: g, Errors: h },
  props: {
    showingForm: { type: Boolean, default: !1 },
    newPermission: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    permission: { type: Object, default: null },
    useInlineMessage: { type: Boolean, default: !1 },
    availableRoles: { type: Array, default: null },
  },
  setup: () => ({}),
  data: () => ({
    permissionName: '',
    form: {
      name: null,
      slug: null,
      description: null,
      roles: [],
      model: 'Permission',
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
    e.permission
      ? ((e.form = u(e.permission)),
        e.permission.name && (e.permissionName = e.permission.name),
        (e.form.roles = e.form.roles.map((e) => e.id)),
        setTimeout(() => {
          e.ready = !0;
        }, 100))
      : (e.ready = !0);
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...n({ popToast: 'toast/popToast' }),
    parseDisplayDate: (t) =>
      t && 1 != t
        ? e(t).format('MMM Do YYYY, h:mma')
        : e(new Date()).format('MMM Do YYYY, h:mma'),
    async submit() {
      (this.error = null),
        (this.submitting = !0),
        this.newPermission
          ? await this.createPermission()
          : await this.updatePermission(),
        (this.submitting = !1);
    },
    formValid() {
      return (
        (this.errors = null),
        !!this.form &&
          (this.form.name ||
            ((this.errors = {}),
            (this.errors.name = 'Missing Permission Name')),
          this.form.slug ||
            (this.errors || (this.errors = {}),
            (this.errors.slug = 'Missing Permission Slug')),
          !this.errors)
      );
    },
    async createPermission() {
      if (!this.formValid())
        return (
          (this.submitting = !1),
          void this.popToast({
            message: 'Error Validating Permission',
            timer: 5e3,
            icon: 'error',
          })
        );
      await d
        .post('/api/permissions/create-permission', this.form)
        .then(({ data: e }) => {
          this.$emit('permissionCreated', e.permission),
            this.popToast({
              message: 'Permission Successfully Created!',
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
              message: 'Error Creating Permission',
              timer: 5e3,
              icon: 'error',
            });
          this.submitting = !1;
        }),
        (this.submitting = !1);
    },
    async updatePermission() {
      const e = this;
      if (!this.formValid())
        return (
          (this.submitting = !1),
          void this.popToast({
            message: 'Error Validating Permission',
            timer: 5e3,
            icon: 'error',
          })
        );
      await d
        .patch(`/api/permissions/update-permission/${e.permission.id}`, e.form)
        .then(({ data: t }) => {
          e.$emit('permissionUpdated', t.permission),
            e.popToast({
              message: `Permission ${t.permission.name} Successfully Updated!`,
              timer: 5e3,
              icon: 'success',
            }),
            (e.submitting = !1);
        })
        .catch(({ response: t }) => {
          if (422 === t.status) {
            const { errors: s } = t.data;
            e.errors = s;
          } else
            e.popToast({
              message: 'Error Updating Permission',
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
const Y = A.setup;
A.setup = (e, t) => {
  const s = R();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/components/roles/PermissionFormModal.vue',
    ),
    Y ? Y(e, t) : void 0
  );
};
const L = {
  name: 'Permissions',
  components: {
    ChevronRightIcon: s,
    PermissionFormModal: I(A, [
      [
        'ssrRender',
        function (e, t, s, a, r, o, i, n) {
          const l = f('AppModal'),
            d = f('Errors'),
            m = f('Multiselect'),
            p = f('AppButton');
          t(
            E(
              l,
              b({ 'show-modal': r.showingForm, onCloseModal: n.closeModal }, a),
              {
                title: x((e, t, s, a) => {
                  if (!t)
                    return [
                      w(
                        v(
                          r.newPermission
                            ? 'Create Permission'
                            : 'Editing Permission ' + i.permissionName,
                        ),
                        1,
                      ),
                    ];
                  t(
                    `${T(
                      r.newPermission
                        ? 'Create Permission'
                        : 'Editing Permission ' + i.permissionName,
                    )}`,
                  );
                }),
                body: x((e, t, s, a) => {
                  if (!t)
                    return [
                      i.errors && r.useInlineMessage
                        ? (y(),
                          k(
                            d,
                            {
                              key: 0,
                              content: i.errors,
                              errors: i.errors,
                              'container-class': 'w-100 mb-5',
                              type: 'error',
                              onClose: (e) => (i.errors = null),
                            },
                            null,
                            8,
                            ['content', 'errors', 'onClose'],
                          ))
                        : P('', !0),
                      $(
                        'form',
                        { onSubmit: C(() => {}, ['prevent']) },
                        [
                          $(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              $(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  $('label', { for: 'name' }, ' Name '),
                                  D(
                                    $(
                                      'input',
                                      {
                                        id: 'name',
                                        'onUpdate:modelValue': (e) =>
                                          (i.form.name = e),
                                        type: 'text',
                                        placeholder: 'Name',
                                        name: 'name',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          i.errors && i.errors.name
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[_, i.form.name]],
                                  ),
                                  $(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300',
                                    },
                                    [
                                      $(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-lock',
                                            i.errors && i.errors.name
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
                          $(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              $(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  $('label', { for: 'slug' }, ' Slug '),
                                  D(
                                    $(
                                      'input',
                                      {
                                        id: 'slug',
                                        'onUpdate:modelValue': (e) =>
                                          (i.form.slug = e),
                                        type: 'text',
                                        placeholder: 'Slug',
                                        name: 'slug',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          i.errors && i.errors.slug
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[_, i.form.slug]],
                                  ),
                                  $(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      $(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-code',
                                            i.errors && i.errors.slug
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
                          $(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              $(
                                'div',
                                { class: 'flex-item relative mb-3 flex-auto' },
                                [
                                  $(
                                    'label',
                                    { for: 'description' },
                                    ' Description ',
                                  ),
                                  D(
                                    $(
                                      'textarea',
                                      {
                                        id: 'description',
                                        'onUpdate:modelValue': (e) =>
                                          (i.form.description = e),
                                        type: 'text',
                                        placeholder: 'Description',
                                        name: 'description',
                                        class: [
                                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                                          i.errors && i.errors.description
                                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                                        ],
                                      },
                                      null,
                                      10,
                                      ['onUpdate:modelValue'],
                                    ),
                                    [[_, i.form.description]],
                                  ),
                                  $(
                                    'span',
                                    {
                                      class:
                                        'absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug',
                                    },
                                    [
                                      $(
                                        'span',
                                        {
                                          class: [
                                            'fas fa-pencil',
                                            i.errors && i.errors.description
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
                          $(
                            'div',
                            {
                              class:
                                'relative mb-3 flex w-full flex-wrap items-stretch',
                            },
                            [
                              $(
                                'div',
                                {
                                  class:
                                    'flex-item relative mb-3 max-w-2xl flex-auto',
                                },
                                [
                                  $('h6', null, 'Permission Roles'),
                                  $(
                                    m,
                                    {
                                      modelValue: i.form.roles,
                                      'onUpdate:modelValue': (e) =>
                                        (i.form.roles = e),
                                      options: r.availableRoles,
                                      'track-by': 'id',
                                      label: 'name',
                                      mode: 'tags',
                                      placeholder: 'Select permission roles',
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
                          r.permission &&
                          r.permission.users &&
                          r.permission.users.length &&
                          r.permission.users.length > 0
                            ? (y(),
                              k(
                                'div',
                                {
                                  key: 0,
                                  class:
                                    'relative mb-3 mt-5 flex w-full flex-wrap items-stretch',
                                },
                                [
                                  $(
                                    'div',
                                    {
                                      class:
                                        'flex-item relative flex-auto text-xs',
                                    },
                                    [
                                      $('strong', { class: 'text-red-400' }, [
                                        $('span', {
                                          class: 'fas fa-warning fa-fw mr-1',
                                        }),
                                        w('Warning'),
                                      ]),
                                      w(': This will affect '),
                                      $(
                                        'span',
                                        { class: 'font-bold' },
                                        v(r.permission.users.length),
                                        1,
                                      ),
                                      w(
                                        ' User' +
                                          v(
                                            r.permission.users.length > 1
                                              ? 's'
                                              : '',
                                          ),
                                        1,
                                      ),
                                    ],
                                  ),
                                ],
                              ))
                            : P('', !0),
                          $(
                            'div',
                            {
                              class:
                                'relative mb-3 mt-5 flex w-full flex-wrap items-stretch',
                            },
                            [
                              $(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  i.form.created_at
                                    ? (y(),
                                      k(
                                        'div',
                                        { key: 0, class: 'float-left' },
                                        [
                                          w(' Created at: '),
                                          $(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            v(
                                              n.parseDisplayDate(
                                                i.form.created_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : P('', !0),
                                ],
                              ),
                              $(
                                'div',
                                {
                                  class:
                                    'flex-item relative flex-auto text-xs uppercase',
                                },
                                [
                                  i.form.updated_at
                                    ? (y(),
                                      k(
                                        'div',
                                        { key: 0, class: 'float-right' },
                                        [
                                          w(' Updated at: '),
                                          $(
                                            'div',
                                            { class: 'text-xs font-bold' },
                                            v(
                                              n.parseDisplayDate(
                                                i.form.updated_at,
                                              ),
                                            ),
                                            1,
                                          ),
                                        ],
                                      ))
                                    : P('', !0),
                                ],
                              ),
                            ],
                          ),
                        ],
                        40,
                        ['onSubmit'],
                      ),
                    ];
                  i.errors && r.useInlineMessage
                    ? t(
                        E(
                          d,
                          {
                            content: i.errors,
                            errors: i.errors,
                            'container-class': 'w-100 mb-5',
                            type: 'error',
                            onClose: (e) => (i.errors = null),
                          },
                          null,
                          s,
                          a,
                        ),
                      )
                    : t('\x3c!----\x3e'),
                    t(
                      `<form data-v-50b02258${a}><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative mb-3 flex-auto" data-v-50b02258${a}><label for="name" data-v-50b02258${a}> Name </label><input id="name"${M(
                        'value',
                        i.form.name,
                      )} type="text" placeholder="Name" name="name" class="${V([
                        i.errors && i.errors.name
                          ? 'border-red-500 text-red-600 placeholder-red-500 dark:placeholder-red-600'
                          : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                        'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                      ])}" data-v-50b02258${a}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-slate-300" data-v-50b02258${a}><span class="${V(
                        [
                          i.errors && i.errors.name
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-lock',
                        ],
                      )}" data-v-50b02258${a}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative mb-3 flex-auto" data-v-50b02258${a}><label for="slug" data-v-50b02258${a}> Slug </label><input id="slug"${M(
                        'value',
                        i.form.slug,
                      )} type="text" placeholder="Slug" name="slug" class="${V([
                        i.errors && i.errors.slug
                          ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                          : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                        'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                      ])}" data-v-50b02258${a}><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-50b02258${a}><span class="${V(
                        [
                          i.errors && i.errors.slug
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-code',
                        ],
                      )}" data-v-50b02258${a}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative mb-3 flex-auto" data-v-50b02258${a}><label for="description" data-v-50b02258${a}> Description </label><textarea id="description" type="text" placeholder="Description" name="description" class="${V(
                        [
                          i.errors && i.errors.description
                            ? 'border-red-500 text-red-600 placeholder-red-500 dark:text-red-600 dark:placeholder-red-600'
                            : 'border-transparent text-slate-600 placeholder-slate-300 dark:placeholder-slate-400',
                          'relative w-full rounded border bg-white bg-white px-3 py-3 pr-10 text-sm shadow outline-none focus:outline-none',
                        ],
                      )}" data-v-50b02258${a}>${T(
                        i.form.description,
                      )}</textarea><span class="absolute absolute right-0 z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug" data-v-50b02258${a}><span class="${V(
                        [
                          i.errors && i.errors.description
                            ? 'text-red-600'
                            : 'text-slate-300',
                          'fas fa-pencil',
                        ],
                      )}" data-v-50b02258${a}></span></span></div></div><div class="relative mb-3 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative mb-3 max-w-2xl flex-auto" data-v-50b02258${a}><h6 data-v-50b02258${a}>Permission Roles</h6>`,
                    ),
                    t(
                      E(
                        m,
                        {
                          modelValue: i.form.roles,
                          'onUpdate:modelValue': (e) => (i.form.roles = e),
                          options: r.availableRoles,
                          'track-by': 'id',
                          label: 'name',
                          mode: 'tags',
                          placeholder: 'Select permission roles',
                        },
                        null,
                        s,
                        a,
                      ),
                    ),
                    t('</div></div>'),
                    r.permission &&
                    r.permission.users &&
                    r.permission.users.length &&
                    r.permission.users.length > 0
                      ? t(
                          `<div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative flex-auto text-xs" data-v-50b02258${a}><strong class="text-red-400" data-v-50b02258${a}><span class="fas fa-warning fa-fw mr-1" data-v-50b02258${a}></span>Warning</strong>: This will affect <span class="font-bold" data-v-50b02258${a}>${T(
                            r.permission.users.length,
                          )}</span> User${T(
                            r.permission.users.length > 1 ? 's' : '',
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `<div class="relative mb-3 mt-5 flex w-full flex-wrap items-stretch" data-v-50b02258${a}><div class="flex-item relative flex-auto text-xs uppercase" data-v-50b02258${a}>`,
                    ),
                    i.form.created_at
                      ? t(
                          `<div class="float-left" data-v-50b02258${a}> Created at: <div class="text-xs font-bold" data-v-50b02258${a}>${T(
                            n.parseDisplayDate(i.form.created_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      `</div><div class="flex-item relative flex-auto text-xs uppercase" data-v-50b02258${a}>`,
                    ),
                    i.form.updated_at
                      ? t(
                          `<div class="float-right" data-v-50b02258${a}> Updated at: <div class="text-xs font-bold" data-v-50b02258${a}>${T(
                            n.parseDisplayDate(i.form.updated_at),
                          )}</div></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div></form>');
                }),
                footer: x((e, t, s, a) => {
                  if (!t)
                    return [
                      $('div', { style: { width: '100%' } }, [
                        i.changed
                          ? (y(),
                            k(
                              p,
                              {
                                key: 0,
                                disabled:
                                  r.loading || i.submitting || !i.changed,
                                class:
                                  'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                                onClick: n.submit,
                              },
                              {
                                text: x(() => [
                                  w(
                                    v(
                                      r.newPermission
                                        ? i.submitting
                                          ? 'Creating'
                                          : 'Create'
                                        : i.submitting
                                        ? 'Updating'
                                        : 'Update',
                                    ) + ' ',
                                    1,
                                  ),
                                  i.submitting
                                    ? (y(),
                                      k('span', {
                                        key: 0,
                                        class:
                                          'fa fa-circle-notch fa-spin ml-3',
                                      }))
                                    : P('', !0),
                                ]),
                                _: 1,
                              },
                              8,
                              ['disabled', 'onClick'],
                            ))
                          : P('', !0),
                        $(
                          p,
                          {
                            disabled: r.loading || i.submitting,
                            class:
                              'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                            onClick: n.closeModal,
                          },
                          {
                            text: x(() => [
                              w(v(i.changed ? 'Cancel' : 'Close'), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['disabled', 'onClick'],
                        ),
                      ]),
                    ];
                  t(
                    `<div style="${S({ width: '100%' })}" data-v-50b02258${a}>`,
                  ),
                    i.changed
                      ? t(
                          E(
                            p,
                            {
                              disabled: r.loading || i.submitting || !i.changed,
                              class:
                                'float-left border border-green-800 bg-transparent bg-transparent text-sm font-medium text-green-800 text-white shadow-md transition duration-150 ease-in-out hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:border-green-800 dark:hover:bg-green-800',
                              onClick: n.submit,
                            },
                            {
                              text: x((e, t, s, a) => {
                                if (!t)
                                  return [
                                    w(
                                      v(
                                        r.newPermission
                                          ? i.submitting
                                            ? 'Creating'
                                            : 'Create'
                                          : i.submitting
                                          ? 'Updating'
                                          : 'Update',
                                      ) + ' ',
                                      1,
                                    ),
                                    i.submitting
                                      ? (y(),
                                        k('span', {
                                          key: 0,
                                          class:
                                            'fa fa-circle-notch fa-spin ml-3',
                                        }))
                                      : P('', !0),
                                  ];
                                t(
                                  `${T(
                                    r.newPermission
                                      ? i.submitting
                                        ? 'Creating'
                                        : 'Create'
                                      : i.submitting
                                      ? 'Updating'
                                      : 'Update',
                                  )} `,
                                ),
                                  i.submitting
                                    ? t(
                                        `<span class="fa fa-circle-notch fa-spin ml-3" data-v-50b02258${a}></span>`,
                                      )
                                    : t('\x3c!----\x3e');
                              }),
                              _: 1,
                            },
                            s,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    t(
                      E(
                        p,
                        {
                          disabled: r.loading || i.submitting,
                          class:
                            'float-right border border-gray-700 bg-transparent bg-transparent text-sm font-medium text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:shadow-lg active:shadow-lg dark:hover:bg-gray-700',
                          onClick: n.closeModal,
                        },
                        {
                          text: x((e, t, s, a) => {
                            if (!t)
                              return [w(v(i.changed ? 'Cancel' : 'Close'), 1)];
                            t(`${T(i.changed ? 'Cancel' : 'Close')}`);
                          }),
                          _: 1,
                        },
                        s,
                        a,
                      ),
                    ),
                    t('</div>');
                }),
                _: 1,
              },
              s,
            ),
          );
        },
      ],
      ['__scopeId', 'data-v-50b02258'],
    ]),
    CircleSvg: j,
    LockClosedIcon: a,
    LockOpenIcon: r,
    PencilSquareIcon: o,
    TrashIcon: i,
    PerPage: p,
    Pagination: c,
  },
  props: { showDownload: { type: Boolean, default: !1 } },
  setup: () => ({}),
  data: () => ({
    dataReady: !1,
    permissionsData: null,
    pagination: {},
    perPage: 25,
    showCreatePermissionForm: !1,
    permissionEditing: null,
    creatingNewPermission: !1,
    permissionFormKey: 432489,
    tableColumns: [
      'id',
      'name',
      'slug',
      'description',
      'roles',
      'users',
      'created_at',
      'updated_at',
      'actions',
    ],
    tableOptions: {
      name: 'permissionsTable',
      perPage: 25,
      uniqueKey: 'id',
      highlightMatches: !0,
      columnsDropdown: !1,
      skin: null,
      saveState: !0,
      storage: 'local',
      headings: { actions: '' },
      columnsClasses: {
        id: 'text-sm text-nowrap',
        name: 'text-sm text-nowrap',
        slug: 'text-sm text-nowrap',
        description: 'text-sm text-nowrap',
        model: 'text-sm text-nowrap',
        roles: 'text-sm text-nowrap',
        users: 'text-sm text-nowrap',
        created_at: 'text-sm text-nowrap',
        updated_at: 'text-sm text-nowrap',
        actions: 'text-nowrap',
      },
      texts: {},
      orderBy: { column: 'id', ascending: !1 },
      pagination: { virtual: !0 },
      sortIcon: {
        base: 'ml-1 fa-fw fas',
        up: 'fa-sort-up',
        down: 'fa-sort-down',
        is: 'fa-sort',
      },
      filterable: [
        'id',
        'name',
        'slug',
        'description',
        'model',
        'created_at',
        'updated_at',
        'roles',
        'users',
      ],
      sortable: [
        'id',
        'name',
        'slug',
        'description',
        'model',
        'created_at',
        'updated_at',
        'roles',
        'users',
      ],
      dateColumns: ['created_at', 'updated_at'],
      filterByColumn: !1,
      editableColumns: ['name'],
    },
    rowsUnlocked: [],
    availableRoles: [],
    rolesDataReady: !1,
    permissionsTableKey: 432876,
  }),
  computed: {
    ...l({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getPermissions(), this.getRoles();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...n({ popToast: 'toast/popToast' }),
    perPageChanged(e) {
      (this.perPage = parseInt(e)),
        (this.pagination.current_page = 1),
        this.getPermissions();
    },
    async getRoles() {
      (this.rolesDataReady = !1),
        await d
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
    async getPermissions(e = null) {
      e && (this.pagination.current_page = e),
        await d
          .get(
            `/api/permissions-paginated?page=${this.pagination.current_page}&per=${this.perPage}`,
          )
          .then(({ data: e }) => {
            (this.permissionsData = e.data),
              delete e.data,
              (this.pagination = e),
              (this.dataReady = !0),
              (this.permissionsTableKey += 1);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting Permissions',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          }),
        (this.dataReady = !0);
    },
    triggerDeletePermission(e) {
      const t = this;
      e.name;
      t.$swal
        .fire({
          title: '<strong>Delete Permission?</strong>',
          icon: 'warning',
          html: 'Are you sure you want to <strong>Delete',
          showCancelButton: !1,
          showDenyButton: !0,
          confirmButtonColor: '#FF0000',
          denyButtonColor: '#777777',
          confirmButtonText: 'Delete',
          denyButtonText: 'Cancel',
        })
        .then((s) => {
          s.isConfirmed
            ? this.deletePermission(e)
            : s.isDenied &&
              t.popToast({ message: 'Cancelled', timer: 2e3, icon: 'error' });
        });
    },
    async deletePermission(e) {
      await d
        .delete(`/api/permissions/delete/permission/${e.id}`)
        .then(({ data: t }) => {
          (this.permissionsData = this.permissionsData.filter(
            (e) => e.id != t.id,
          )),
            (this.rowsUnlocked = this.rowsUnlocked.filter((t) => t != e.id)),
            (this.pagination.total = this.pagination.total - 1),
            this.getPermissions(
              this.pagination.current_page
                ? this.pagination.current_page
                : null,
            ),
            (this.rowsUnlocked = []),
            this.popToast({
              message: 'Successfully Deleted Permission!',
              timer: 5e3,
              icon: 'success',
            });
        })
        .catch(({ response: e }) => {
          this.popToast({
            message: 'Error Deleting Permission',
            timer: 5e3,
            icon: 'error',
          }),
            (this.dataReady = !0);
        });
    },
    closePermissionForm() {
      (this.permissionEditing = null),
        (this.creatingNewPermission = !1),
        (this.showCreatePermissionForm = !1);
    },
    triggerEditPermission(e) {
      (this.permissionFormKey += 1),
        (this.permissionEditing = e),
        (this.creatingNewPermission = !1),
        (this.showCreatePermissionForm = !0);
    },
    permissionUpdated(e) {
      (this.permissionsData = this.permissionsData.map((t) =>
        t.id !== e.id ? t : e,
      )),
        (this.rowsUnlocked = []),
        this.getPermissions(),
        this.closePermissionForm();
    },
    permissionCreated(e) {
      this.permissionsData.push(e),
        (this.rowsUnlocked = []),
        this.getPermissions(),
        this.closePermissionForm();
    },
    triggerCreatePermission() {
      (this.permissionFormKey += 1),
        (this.creatingNewPermission = !0),
        (this.showCreatePermissionForm = !0),
        (this.permissionEditing = null);
    },
    parseDisplayDate: (t) => e(t).format('MMM Do YYYY, h:mma'),
    inputValid: (e, t) =>
      '' != t[e] && null != t[e] && 0 != t[e].length && t[e].length > 0,
    async update(e, t) {
      const s = this;
      if (!this.inputValid(e, t))
        return (
          (this.submitting = !1),
          void this.popToast({
            message: 'Error Validating Permission',
            timer: 5e3,
            icon: 'error',
          })
        );
      await d
        .patch(`/api/permissions/update-permission/${t.id}`, t)
        .then(({ data: e }) => {
          s.permissionUpdated(e.permission),
            s.popToast({
              message: `Permission ${e.permission.name} Successfully Updated!`,
              timer: 5e3,
              icon: 'success',
            }),
            (s.submitting = !1);
        })
        .catch(({ response: e }) => {
          if (422 === e.status) {
            const { errors: t } = e.data;
            s.errors = t;
          } else
            s.popToast({
              message: 'Error Updating Permission',
              timer: 5e3,
              icon: 'error',
            });
          s.submitting = !1;
        }),
        (s.submitting = !1);
    },
    toggleLock(e, t = !1) {
      const s = this.rowsUnlocked.find((t) => t == e.id);
      t
        ? ((this.rowsUnlocked = []), this.rowsUnlocked.push(e.id))
        : s
        ? (this.rowsUnlocked = this.rowsUnlocked.filter((t) => t != e.id))
        : this.rowsUnlocked.push(e.id);
    },
    locked(e) {
      return !this.rowsUnlocked.find((t) => t == e.id);
    },
  },
};
const K = L.setup;
L.setup = (e, t) => {
  const s = R();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/views/admin/Permissions.vue',
    ),
    K ? K(e, t) : void 0
  );
};
const z = I(L, [
  [
    'ssrRender',
    function (e, t, s, a, r, o, i, n) {
      const l = f('router-link'),
        d = f('ChevronRightIcon'),
        m = f('PerPage'),
        p = f('AppButton'),
        c = f('CircleSvg'),
        u = f('v-client-table'),
        g = f('LockClosedIcon'),
        h = f('LockOpenIcon'),
        C = f('PencilSquareIcon'),
        R = f('TrashIcon'),
        M = f('Pagination'),
        S = f('PermissionFormModal'),
        I = U('tippy');
      let j, A, Y;
      t(
        `<div${B(
          b(
            {
              id: 'permissions',
              class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200',
            },
            a,
          ),
        )}><nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb"><ol class="inline-flex list-none p-0"><li class="flex items-center">`,
      ),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              E(
                l,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: x(({ isActive: e }, t, s, a) => {
                    if (!t) return [w(' Admin ')];
                    t(' Admin ');
                  }),
                  _: 1,
                },
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li><li class="flex items-center">'),
        t(E(d, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, s)),
        t('</li><li class="flex items-center">'),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              E(
                l,
                {
                  to: { name: 'permissions' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: x(({ isActive: e }, t, s, a) => {
                    if (!t)
                      return [
                        $(
                          'span',
                          {
                            class: [
                              e &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' Permissions ',
                          2,
                        ),
                      ];
                    t(
                      `<span class="${V([
                        e &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}"${a}> Permissions </span>`,
                    );
                  }),
                  _: 1,
                },
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li></ol>'),
        i.dataReady
          ? t(
              E(
                m,
                {
                  items: i.permissionsData,
                  'per-page': i.perPage,
                  class: 'float-right mb-2',
                  style: { 'margin-top': '-0.5em' },
                  onChanged: n.perPageChanged,
                },
                null,
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</nav><div class="flex justify-end">'),
        t(
          E(
            p,
            b(
              {
                disabled: i.showCreatePermissionForm || !i.dataReady,
                class: 'mb-2 px-2 py-2 text-sm font-medium',
                onClick: n.triggerCreatePermission,
              },
              F(e, I, 'Create Permission'),
            ),
            {
              text: x((e, t, s, a) => {
                if (!t)
                  return [
                    i.dataReady
                      ? (y(),
                        k('span', {
                          key: 0,
                          class: 'fas fa-plus fa-fw ml-2 mr-2',
                        }))
                      : P('', !0),
                    i.dataReady
                      ? P('', !0)
                      : (y(),
                        k(c, { key: 1, class: 'ml-2 mr-2 mt-0 h-4 w-4' })),
                    $('span', { class: 'sr-only' }, 'Create New Permission'),
                  ];
                i.dataReady
                  ? t(`<span class="fas fa-plus fa-fw ml-2 mr-2"${a}></span>`)
                  : t('\x3c!----\x3e'),
                  i.dataReady
                    ? t('\x3c!----\x3e')
                    : t(E(c, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, s, a)),
                  t(`<span class="sr-only"${a}>Create New Permission</span>`);
              }),
              _: 1,
            },
            s,
          ),
        ),
        r.showDownload
          ? t(
              E(
                p,
                b(
                  {
                    class: 'mb-2 ml-3 px-2 py-2 text-sm font-medium',
                    onClick: (t) =>
                      e.$refs.permissionsTable.downloadCsv(
                        (e.filename = 'permissions.csv'),
                      ),
                  },
                  F(e, I, 'Download Data'),
                ),
                {
                  text: x((e, t, s, a) => {
                    if (!t) return [w(' Download ')];
                    t(' Download ');
                  }),
                  _: 1,
                },
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</div>'),
        i.dataReady
          ? t(
              E(
                u,
                {
                  ref: 'permissionsTable',
                  key: i.permissionsTableKey,
                  data: i.permissionsData,
                  columns: i.tableColumns,
                  options: i.tableOptions,
                },
                {
                  name: x((t, s, a, r) => {
                    if (!s)
                      return [
                        D(
                          $(
                            'input',
                            {
                              'onUpdate:modelValue': (e) => (t.row.name = e),
                              type: 'text',
                              class: [
                                'rounded border-0 bg-transparent text-sm',
                                n.locked(t.row) ? 'disabled' : '',
                              ],
                              readonly: n.locked(t.row),
                              onBlur: (e) => n.update('name', t.row),
                            },
                            null,
                            42,
                            ['onUpdate:modelValue', 'readonly', 'onBlur'],
                          ),
                          [
                            [_, t.row.name],
                            [I, 'Edit Permission Name'],
                          ],
                        ),
                      ];
                    s(
                      `<input${B(
                        ((j = b(
                          {
                            value: t.row.name,
                            type: 'text',
                            class: [
                              'rounded border-0 bg-transparent text-sm',
                              n.locked(t.row) ? 'disabled' : '',
                            ],
                            readonly: n.locked(t.row),
                          },
                          F(e, I, 'Edit Permission Name'),
                        )),
                        b(j, N(j, t.row.name))),
                      )}${r}>`,
                    );
                  }),
                  slug: x((t, s, a, r) => {
                    if (!s)
                      return [
                        D(
                          $(
                            'input',
                            {
                              'onUpdate:modelValue': (e) => (t.row.slug = e),
                              type: 'text',
                              class: [
                                'rounded border-0 bg-transparent text-sm',
                                n.locked(t.row) ? 'disabled' : '',
                              ],
                              readonly: n.locked(t.row),
                              onBlur: (e) => n.update('slug', t.row),
                            },
                            null,
                            42,
                            ['onUpdate:modelValue', 'readonly', 'onBlur'],
                          ),
                          [
                            [_, t.row.slug],
                            [I, 'Edit Permission Slug'],
                          ],
                        ),
                      ];
                    s(
                      `<input${B(
                        ((A = b(
                          {
                            value: t.row.slug,
                            type: 'text',
                            class: [
                              'rounded border-0 bg-transparent text-sm',
                              n.locked(t.row) ? 'disabled' : '',
                            ],
                            readonly: n.locked(t.row),
                          },
                          F(e, I, 'Edit Permission Slug'),
                        )),
                        b(A, N(A, t.row.slug))),
                      )}${r}>`,
                    );
                  }),
                  description: x((t, s, a, r) => {
                    if (!s)
                      return [
                        D(
                          $(
                            'input',
                            {
                              'onUpdate:modelValue': (e) =>
                                (t.row.description = e),
                              type: 'text',
                              class: [
                                'rounded border-0 bg-transparent text-sm',
                                n.locked(t.row) ? 'disabled' : '',
                              ],
                              readonly: n.locked(t.row),
                              onBlur: (e) => n.update('description', t.row),
                            },
                            null,
                            42,
                            ['onUpdate:modelValue', 'readonly', 'onBlur'],
                          ),
                          [
                            [_, t.row.description],
                            [I, 'Edit Permission Description'],
                          ],
                        ),
                      ];
                    s(
                      `<input${B(
                        ((Y = b(
                          {
                            value: t.row.description,
                            type: 'text',
                            class: [
                              'rounded border-0 bg-transparent text-sm',
                              n.locked(t.row) ? 'disabled' : '',
                            ],
                            readonly: n.locked(t.row),
                          },
                          F(e, I, 'Edit Permission Description'),
                        )),
                        b(Y, N(Y, t.row.description))),
                      )}${r}>`,
                    );
                  }),
                  roles: x((e, t, s, a) => {
                    if (!t) return [w(v(e.row.roles.length), 1)];
                    t(`${T(e.row.roles.length)}`);
                  }),
                  users: x((e, t, s, a) => {
                    if (!t) return [w(v(e.row.users.length), 1)];
                    t(`${T(e.row.users.length)}`);
                  }),
                  created_at: x((e, t, s, a) => {
                    if (!t)
                      return [
                        w(
                          v(
                            e.row.created_at
                              ? n.parseDisplayDate(e.row.created_at)
                              : null,
                          ),
                          1,
                        ),
                      ];
                    t(
                      `${T(
                        e.row.created_at
                          ? n.parseDisplayDate(e.row.created_at)
                          : null,
                      )}`,
                    );
                  }),
                  updated_at: x((e, t, s, a) => {
                    if (!t)
                      return [
                        w(
                          v(
                            e.row.updated_at
                              ? n.parseDisplayDate(e.row.updated_at)
                              : null,
                          ),
                          1,
                        ),
                      ];
                    t(
                      `${T(
                        e.row.updated_at
                          ? n.parseDisplayDate(e.row.updated_at)
                          : null,
                      )}`,
                    );
                  }),
                  actions: x((t, s, a, r) => {
                    if (!s)
                      return [
                        $(
                          p,
                          {
                            loading: !i.dataReady,
                            class:
                              'mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white',
                            'btn-class':
                              (n.locked(t.row),
                              'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                            'btn-hover-class':
                              (n.locked(t.row),
                              'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                            'btn-class-dark':
                              (n.locked(t.row),
                              'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                            'btn-hover-class-dark':
                              (n.locked(t.row),
                              'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                            onClick: (e) => n.toggleLock(t.row, !1),
                          },
                          {
                            text: x(() => [
                              n.locked(t.row) && i.dataReady
                                ? (y(),
                                  k(g, {
                                    key: 0,
                                    class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                  }))
                                : P('', !0),
                              !n.locked(t.row) && i.dataReady
                                ? (y(),
                                  k(h, {
                                    key: 1,
                                    class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                  }))
                                : P('', !0),
                              i.dataReady
                                ? P('', !0)
                                : (y(),
                                  k(c, { key: 2, class: 'mr-2 h-3 w-3' })),
                              $(
                                'span',
                                { class: 'sr-only' },
                                v(n.locked(t.row) ? 'Unlock' : 'Lock') +
                                  ' User Settings',
                                1,
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          [
                            'loading',
                            'btn-class',
                            'btn-hover-class',
                            'btn-class-dark',
                            'btn-hover-class-dark',
                            'onClick',
                          ],
                        ),
                        D(
                          (y(),
                          k(
                            p,
                            {
                              warning: '',
                              disabled: n.locked(t.row),
                              loading: !i.dataReady,
                              class: 'mr-2 px-1 py-1 text-sm',
                              onClick: (e) => n.triggerEditPermission(t.row),
                            },
                            {
                              text: x(() => [
                                i.dataReady
                                  ? (y(),
                                    k(C, {
                                      key: 0,
                                      class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                    }))
                                  : P('', !0),
                                i.dataReady
                                  ? P('', !0)
                                  : (y(),
                                    k(c, { key: 1, class: 'mr-2 h-3 w-3' })),
                                $(
                                  'span',
                                  { class: 'sr-only' },
                                  'Edit Permission',
                                ),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['disabled', 'loading', 'onClick'],
                          )),
                          [[I, 'Edit Permission']],
                        ),
                        D(
                          (y(),
                          k(
                            p,
                            {
                              danger: '',
                              disabled: n.locked(t.row),
                              loading: !i.dataReady,
                              class: 'mr-2 px-1 py-1 text-sm',
                              onClick: (e) => n.triggerDeletePermission(t.row),
                            },
                            {
                              text: x(() => [
                                i.dataReady
                                  ? (y(),
                                    k(R, {
                                      key: 0,
                                      class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                    }))
                                  : P('', !0),
                                i.dataReady
                                  ? P('', !0)
                                  : (y(),
                                    k(c, { key: 1, class: 'mr-2 h-3 w-3' })),
                                $(
                                  'span',
                                  { class: 'sr-only' },
                                  'Delete Permission',
                                ),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['disabled', 'loading', 'onClick'],
                          )),
                          [[I, 'Delete Permission']],
                        ),
                      ];
                    s(
                      E(
                        p,
                        {
                          loading: !i.dataReady,
                          class:
                            'mr-2 inline-block rounded px-1 py-1 text-sm font-medium leading-snug leading-snug text-gray-700 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:text-white',
                          'btn-class':
                            (n.locked(t.row),
                            'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                          'btn-hover-class':
                            (n.locked(t.row),
                            'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                          'btn-class-dark':
                            (n.locked(t.row),
                            'bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                          'btn-hover-class-dark':
                            (n.locked(t.row),
                            'hover:bg-transparent focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent dark:hover:bg-transparent'),
                          onClick: (e) => n.toggleLock(t.row, !1),
                        },
                        {
                          text: x((e, s, a, r) => {
                            if (!s)
                              return [
                                n.locked(t.row) && i.dataReady
                                  ? (y(),
                                    k(g, {
                                      key: 0,
                                      class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                    }))
                                  : P('', !0),
                                !n.locked(t.row) && i.dataReady
                                  ? (y(),
                                    k(h, {
                                      key: 1,
                                      class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                    }))
                                  : P('', !0),
                                i.dataReady
                                  ? P('', !0)
                                  : (y(),
                                    k(c, { key: 2, class: 'mr-2 h-3 w-3' })),
                                $(
                                  'span',
                                  { class: 'sr-only' },
                                  v(n.locked(t.row) ? 'Unlock' : 'Lock') +
                                    ' User Settings',
                                  1,
                                ),
                              ];
                            n.locked(t.row) && i.dataReady
                              ? s(
                                  E(
                                    g,
                                    { class: 'ml-2 mr-2 mt-0 h-4 w-4' },
                                    null,
                                    a,
                                    r,
                                  ),
                                )
                              : s('\x3c!----\x3e'),
                              !n.locked(t.row) && i.dataReady
                                ? s(
                                    E(
                                      h,
                                      { class: 'ml-2 mr-2 mt-0 h-4 w-4' },
                                      null,
                                      a,
                                      r,
                                    ),
                                  )
                                : s('\x3c!----\x3e'),
                              i.dataReady
                                ? s('\x3c!----\x3e')
                                : s(
                                    E(c, { class: 'mr-2 h-3 w-3' }, null, a, r),
                                  ),
                              s(
                                `<span class="sr-only"${r}>${T(
                                  n.locked(t.row) ? 'Unlock' : 'Lock',
                                )} User Settings</span>`,
                              );
                          }),
                          _: 2,
                        },
                        a,
                        r,
                      ),
                    ),
                      s(
                        E(
                          p,
                          b(
                            {
                              warning: '',
                              disabled: n.locked(t.row),
                              loading: !i.dataReady,
                              class: 'mr-2 px-1 py-1 text-sm',
                              onClick: (e) => n.triggerEditPermission(t.row),
                            },
                            F(e, I, 'Edit Permission'),
                          ),
                          {
                            text: x((e, t, s, a) => {
                              if (!t)
                                return [
                                  i.dataReady
                                    ? (y(),
                                      k(C, {
                                        key: 0,
                                        class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                      }))
                                    : P('', !0),
                                  i.dataReady
                                    ? P('', !0)
                                    : (y(),
                                      k(c, { key: 1, class: 'mr-2 h-3 w-3' })),
                                  $(
                                    'span',
                                    { class: 'sr-only' },
                                    'Edit Permission',
                                  ),
                                ];
                              i.dataReady
                                ? t(
                                    E(
                                      C,
                                      { class: 'ml-2 mr-2 mt-0 h-4 w-4' },
                                      null,
                                      s,
                                      a,
                                    ),
                                  )
                                : t('\x3c!----\x3e'),
                                i.dataReady
                                  ? t('\x3c!----\x3e')
                                  : t(
                                      E(
                                        c,
                                        { class: 'mr-2 h-3 w-3' },
                                        null,
                                        s,
                                        a,
                                      ),
                                    ),
                                t(
                                  `<span class="sr-only"${a}>Edit Permission</span>`,
                                );
                            }),
                            _: 2,
                          },
                          a,
                          r,
                        ),
                      ),
                      s(
                        E(
                          p,
                          b(
                            {
                              danger: '',
                              disabled: n.locked(t.row),
                              loading: !i.dataReady,
                              class: 'mr-2 px-1 py-1 text-sm',
                              onClick: (e) => n.triggerDeletePermission(t.row),
                            },
                            F(e, I, 'Delete Permission'),
                          ),
                          {
                            text: x((e, t, s, a) => {
                              if (!t)
                                return [
                                  i.dataReady
                                    ? (y(),
                                      k(R, {
                                        key: 0,
                                        class: 'ml-2 mr-2 mt-0 h-4 w-4',
                                      }))
                                    : P('', !0),
                                  i.dataReady
                                    ? P('', !0)
                                    : (y(),
                                      k(c, { key: 1, class: 'mr-2 h-3 w-3' })),
                                  $(
                                    'span',
                                    { class: 'sr-only' },
                                    'Delete Permission',
                                  ),
                                ];
                              i.dataReady
                                ? t(
                                    E(
                                      R,
                                      { class: 'ml-2 mr-2 mt-0 h-4 w-4' },
                                      null,
                                      s,
                                      a,
                                    ),
                                  )
                                : t('\x3c!----\x3e'),
                                i.dataReady
                                  ? t('\x3c!----\x3e')
                                  : t(
                                      E(
                                        c,
                                        { class: 'mr-2 h-3 w-3' },
                                        null,
                                        s,
                                        a,
                                      ),
                                    ),
                                t(
                                  `<span class="sr-only"${a}>Delete Permission</span>`,
                                );
                            }),
                            _: 2,
                          },
                          a,
                          r,
                        ),
                      );
                  }),
                  afterBody: x((e, t, s, a) => {
                    if (!t)
                      return [
                        $('tfoot', null, [
                          $('tr', null, [
                            $('td', { colspan: '10' }, [
                              $(
                                M,
                                {
                                  pagination: i.pagination,
                                  offset: 4,
                                  onPaginate: n.getPermissions,
                                },
                                null,
                                8,
                                ['pagination', 'onPaginate'],
                              ),
                            ]),
                          ]),
                        ]),
                      ];
                    t(`<tfoot${a}><tr${a}><td colspan="10"${a}>`),
                      t(
                        E(
                          M,
                          {
                            pagination: i.pagination,
                            offset: 4,
                            onPaginate: n.getPermissions,
                          },
                          null,
                          s,
                          a,
                        ),
                      ),
                      t('</td></tr></tfoot>');
                  }),
                  _: 1,
                },
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t(
          E(
            S,
            {
              key: i.permissionFormKey,
              'showing-form': i.showCreatePermissionForm,
              permission: i.permissionEditing,
              'new-permission': i.creatingNewPermission,
              'available-roles': i.availableRoles,
              onCloseModal: n.closePermissionForm,
              onPermissionCreated: n.permissionCreated,
              onPermissionUpdated: n.permissionUpdated,
            },
            null,
            s,
          ),
        ),
        t('</div>');
    },
  ],
]);
export { z as default };
