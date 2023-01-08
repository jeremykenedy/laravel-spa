import { E as s } from './Errors-cfd7b346.mjs';
import { S as e } from './Success-4b3d058c.mjs';
import { _ as r, C as o } from '../app2.mjs';
import { CheckCircleIcon as t } from '@heroicons/vue/24/outline';
import { mapActions as i } from 'vuex';
import {
  resolveComponent as a,
  mergeProps as n,
  withCtx as d,
  openBlock as l,
  createBlock as m,
  createCommentVNode as c,
  createTextVNode as u,
  useSSRContext as p,
} from 'vue';
import {
  ssrRenderAttrs as w,
  ssrRenderComponent as f,
  ssrRenderClass as g,
  ssrRenderAttr as v,
  ssrIncludeBooleanAttr as h,
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
const b = {
  components: { Errors: s, Success: e, CircleSvg: o, CheckCircleIcon: t },
  props: {
    useErrors: { type: Boolean, default: !1 },
    useSuccess: { type: Boolean, default: !1 },
    token: { type: String, required: !0 },
    email: { type: String, required: !0 },
  },
  data: () => ({
    form: { password: '', password_confirmation: '' },
    errors: null,
    success: null,
    loading: !1,
  }),
  created() {},
  methods: {
    ...i({ resetPassword: 'auth/resetPassword', popToast: 'toast/popToast' }),
    async reset() {
      (this.loading = !0), (this.errors = null), (this.success = null);
      try {
        await this.resetPassword({
          email: this.email,
          token: this.token,
          ...this.form,
        }).then((s) => {
          (this.loading = !1),
            (this.success = s),
            this.popToast({
              message: `${s} redirecting ...`,
              timer: 1e4,
              icon: 'success',
            }),
            setTimeout(() => {
              this.$router.push({ name: 'login' });
            }, 1e3);
        });
      } catch (s) {
        s.response && 422 === s.response.status
          ? ((this.errors = s.response.data.errors),
            this.popToast({
              message: Object.values(s.response.data.errors).flat().toString(),
              timer: 1e4,
              icon: 'error',
            }))
          : s.response && 401 === s.response.status
          ? ((this.errors = { message: s.response.data.message }),
            this.popToast({
              message: 'Unauthorized',
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
const x = b.setup;
b.setup = (s, e) => {
  const r = p();
  return (
    (r.modules || (r.modules = new Set())).add(
      'resources/js/views/pages/ResetPassword.vue',
    ),
    x ? x(s, e) : void 0
  );
};
const y = r(b, [
  [
    'ssrRender',
    function (s, e, r, o, t, i, p, b) {
      const x = a('Success'),
        y = a('Errors'),
        S = a('AppButton'),
        j = a('CheckCircleIcon'),
        $ = a('CircleSvg');
      e(
        `<div${w(
          n({ class: 'mx-auto max-w-screen-md text-gray-900' }, o),
        )}><div class="flex justify-center"><div class="flex-1"><div class="w-auto border"><div class="border-b p-4 font-semibold text-gray-700"> Reset your password </div><div class="bg-white p-4">`,
      ),
        t.useSuccess && p.success
          ? e(
              f(
                x,
                { content: p.success, onClose: (s) => (p.success = null) },
                null,
                r,
              ),
            )
          : e('\x3c!----\x3e'),
        t.useErrors && p.errors
          ? e(
              f(
                y,
                { content: p.errors, onClose: (s) => (p.errors = null) },
                null,
                r,
              ),
            )
          : e('\x3c!----\x3e'),
        e(
          `<form class="mx-auto w-full md:w-10/12 md:p-4"><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="password" class="${g(
            [
              {
                'text-red-500':
                  p.errors && p.errors.errors && p.errors.errors.password,
              },
              'w-4/12',
            ],
          )}"> Password </label><input id="password"${v(
            'value',
            p.form.password,
          )} type="password" name="password" autocomplete="on" class="${g([
            {
              'border-red-500':
                p.errors && p.errors.errors && p.errors.errors.password,
            },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            h(p.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="password_confirmation" class="${g(
            [
              {
                'text-red-500':
                  p.errors &&
                  p.errors.errors &&
                  p.errors.errors.password_confirmation,
              },
              'w-4/12',
            ],
          )}"> Confirm Password </label><input id="password_confirmation"${v(
            'value',
            p.form.password_confirmation,
          )} type="password" name="password_confirmation" class="${g([
            {
              'border-red-500':
                p.errors &&
                p.errors.errors &&
                p.errors.errors.password_confirmation,
            },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            h(p.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end"><div class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12">`,
        ),
        e(
          f(
            S,
            {
              loading: p.loading,
              disabled: p.loading || p.success,
              text: (p.loading, 'Send Email'),
              'btn-class':
                'uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg ',
              type: 'submit',
            },
            {
              text: d((s, e, r, o) => {
                if (!e)
                  return [
                    !p.loading && p.success
                      ? (l(), m(j, { key: 0, class: 'mr-2 h-6 w-6' }))
                      : c('', !0),
                    p.loading
                      ? (l(), m($, { key: 1, class: 'mr-2 h-5 w-5' }))
                      : c('', !0),
                    u(' Reset Password '),
                  ];
                !p.loading && p.success
                  ? e(f(j, { class: 'mr-2 h-6 w-6' }, null, r, o))
                  : e('\x3c!----\x3e'),
                  p.loading
                    ? e(f($, { class: 'mr-2 h-5 w-5' }, null, r, o))
                    : e('\x3c!----\x3e'),
                  e(' Reset Password ');
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
export { y as default };
