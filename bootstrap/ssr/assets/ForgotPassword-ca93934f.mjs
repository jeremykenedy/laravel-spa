import { S as s } from './Success-4b3d058c.mjs';
import { E as e } from './Errors-cfd7b346.mjs';
import { _ as r, C as o } from '../app2.mjs';
import {
  PaperAirplaneIcon as t,
  CheckCircleIcon as a,
} from '@heroicons/vue/24/outline';
import { mapActions as i } from 'vuex';
import {
  resolveComponent as l,
  mergeProps as n,
  withCtx as c,
  openBlock as m,
  createBlock as u,
  createCommentVNode as d,
  createTextVNode as p,
  createVNode as g,
  useSSRContext as f,
} from 'vue';
import {
  ssrRenderAttrs as v,
  ssrRenderComponent as h,
  ssrRenderClass as w,
  ssrRenderAttr as x,
  ssrIncludeBooleanAttr as b,
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
const y = {
  components: {
    Success: s,
    Errors: e,
    CircleSvg: o,
    PaperAirplaneIcon: t,
    CheckCircleIcon: a,
  },
  props: {
    useErrors: { type: Boolean, default: !1 },
    useSuccess: { type: Boolean, default: !1 },
  },
  data: () => ({
    form: { email: '' },
    errors: null,
    success: null,
    loading: !1,
  }),
  methods: {
    ...i({ forgotPassword: 'auth/forgotPassword', popToast: 'toast/popToast' }),
    async send() {
      (this.loading = !0), (this.errors = null), (this.success = null);
      try {
        await this.forgotPassword(this.form).then((s) => {
          (this.loading = !1),
            (this.success = s),
            this.popToast({ message: s, timer: 1e4, icon: 'success' });
        });
      } catch (s) {
        s.response && 422 === s.response.status
          ? ((this.errors = { message: s.response.data.message }),
            this.popToast({
              message: s.response.data.message,
              timer: 1e4,
              icon: 'error',
            }))
          : s.response && 401 === s.response.status
          ? ((this.errors = { message: s.response.data.message }),
            this.popToast({
              message: 'Invalid Email',
              timer: 1e4,
              icon: 'error',
            }))
          : this.popToast({
              message: 'An error occured',
              timer: 1e4,
              icon: 'error',
            }),
          (this.loading = !1);
      }
    },
  },
};
const E = y.setup;
y.setup = (s, e) => {
  const r = f();
  return (
    (r.modules || (r.modules = new Set())).add(
      'resources/js/views/pages/ForgotPassword.vue',
    ),
    E ? E(s, e) : void 0
  );
};
const S = r(y, [
  [
    'ssrRender',
    function (s, e, r, o, t, a, i, f) {
      const y = l('Success'),
        E = l('Errors'),
        S = l('AppButton'),
        k = l('PaperAirplaneIcon'),
        j = l('CheckCircleIcon'),
        C = l('CircleSvg'),
        P = l('router-link');
      e(
        `<div${v(
          n({ class: 'mx-auto max-w-screen-md text-gray-900' }, o),
        )}><div class="flex justify-center"><div class="flex-1"><div class="w-auto border"><div class="border-b p-4 font-semibold text-gray-700"> Forgot your Password? </div><div class="bg-white p-4">`,
      ),
        t.useSuccess && i.success
          ? e(
              h(
                y,
                { content: i.success, onClose: (s) => (i.success = null) },
                null,
                r,
              ),
            )
          : e('\x3c!----\x3e'),
        t.useErrors && i.errors
          ? e(
              h(
                E,
                { content: i.errors, onClose: (s) => (i.errors = null) },
                null,
                r,
              ),
            )
          : e('\x3c!----\x3e'),
        e(
          `<form class="mx-auto w-full md:w-10/12 md:p-4"><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="Email" class="${w(
            [
              {
                'text-red-500':
                  i.errors && i.errors.errors && i.errors.errors.email,
              },
              'w-4/12',
            ],
          )}"> Email </label><input${x(
            'value',
            i.form.email,
          )} type="email" name="email" class="${w([
            {
              'border-red-500':
                i.errors && i.errors.errors && i.errors.errors.email,
            },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            b(i.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end"><div class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12">`,
        ),
        e(
          h(
            S,
            {
              loading: i.loading,
              disabled: i.loading || i.success,
              text: (i.loading, 'Send Email'),
              'btn-class':
                'uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg ',
              type: 'submit',
            },
            {
              text: c((s, e, r, o) => {
                if (!e)
                  return [
                    i.loading || i.success
                      ? d('', !0)
                      : (m(), u(k, { key: 0, class: 'mr-2 h-6 w-6' })),
                    !i.loading && i.success
                      ? (m(), u(j, { key: 1, class: 'mr-2 h-6 w-6' }))
                      : d('', !0),
                    i.loading
                      ? (m(), u(C, { key: 2, class: 'mr-2 h-6 w-6' }))
                      : d('', !0),
                    p(' Send Email '),
                  ];
                i.loading || i.success
                  ? e('\x3c!----\x3e')
                  : e(h(k, { class: 'mr-2 h-6 w-6' }, null, r, o)),
                  !i.loading && i.success
                    ? e(h(j, { class: 'mr-2 h-6 w-6' }, null, r, o))
                    : e('\x3c!----\x3e'),
                  i.loading
                    ? e(h(C, { class: 'mr-2 h-6 w-6' }, null, r, o))
                    : e('\x3c!----\x3e'),
                  e(' Send Email ');
              }),
              _: 1,
            },
            r,
          ),
        ),
        e(
          h(
            P,
            {
              to: { name: 'login' },
              class: 'text-sm font-bold text-blue-500 hover:underline',
            },
            {
              default: c((s, e, r, o) => {
                if (!e)
                  return [
                    g('span', { class: 'fa fa-reply fa-fw' }),
                    p(' Go back '),
                  ];
                e(`<span class="fa fa-reply fa-fw"${o}></span> Go back `);
              }),
              _: 1,
            },
            r,
          ),
        ),
        e('</div></div></form></div></div></div></div></div>');
    },
  ],
]);
export { S as default };
