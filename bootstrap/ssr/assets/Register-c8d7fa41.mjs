import { mapGetters as e, mapActions as r } from 'vuex';
import { _ as s, C as t } from '../app2.mjs';
import { ArrowRightOnRectangleIcon as o } from '@heroicons/vue/24/outline';
import { E as a } from './Errors-cfd7b346.mjs';
import { S as i } from './SocialiteLogins-6af0e372.mjs';
import {
  resolveComponent as l,
  mergeProps as n,
  withCtx as d,
  openBlock as m,
  createBlock as u,
  createCommentVNode as p,
  createTextVNode as c,
  useSSRContext as g,
} from 'vue';
import {
  ssrRenderAttrs as f,
  ssrRenderComponent as b,
  ssrRenderClass as w,
  ssrRenderAttr as v,
  ssrIncludeBooleanAttr as x,
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
import 'vue-axios';
const y = {
  components: {
    ArrowRightOnRectangleIcon: o,
    CircleSvg: t,
    Errors: a,
    SocialiteLogins: i,
  },
  props: { showSmLogin: { type: Boolean, default: !0 } },
  data: () => ({
    form: { name: '', email: '', password: '', password_confirmation: '' },
    errors: null,
    loading: !1,
    useInlineMessage: !1,
  }),
  computed: {
    ...e({ logins: 'auth/logins' }),
    socialLoginsEnabled() {
      if (!this.showSmLogin) return !1;
      return !!Object.values(this.logins).find((e) => '1' == e);
    },
  },
  methods: {
    ...r({ registerApp: 'auth/register', popToast: 'toast/popToast' }),
    async register() {
      (this.loading = !0), (this.errors = null), (this.success = '');
      try {
        await this.registerApp(this.form).then((e) => {
          (this.loading = !1), this.$router.push({ name: 'dashboard' });
        });
      } catch (e) {
        422 === e.response.status &&
          ((this.errors = e.response.data.errors),
          this.popToast({
            message: Object.values(e.response.data.errors).flat().toString(),
            timer: 5e3,
            icon: 'error',
          })),
          401 === e.status &&
            this.popToast({
              message: 'Invalid Email or Password',
              timer: 5e3,
              icon: 'error',
            }),
          (this.loading = !1);
      }
    },
  },
};
const h = y.setup;
y.setup = (e, r) => {
  const s = g();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/views/pages/Register.vue',
    ),
    h ? h(e, r) : void 0
  );
};
const $ = s(y, [
  [
    'ssrRender',
    function (e, r, s, t, o, a, i, g) {
      const y = l('errors'),
        h = l('AppButton'),
        $ = l('ArrowRightOnRectangleIcon'),
        j = l('CircleSvg'),
        S = l('router-link'),
        k = l('SocialiteLogins');
      r(
        `<div${f(
          n({ class: 'mx-auto max-w-screen-md text-gray-900' }, t),
        )}><div class="flex justify-center"><div class="flex-1"><div class="w-auto rounded border"><div class="border-b p-4 font-semibold text-gray-600">Register</div><div class="rounded bg-white p-4 dark:bg-slate-800">`,
      ),
        i.errors && i.useInlineMessage
          ? r(
              b(
                y,
                {
                  content: i.errors,
                  type: 'error',
                  onClose: (e) => (i.errors = null),
                },
                null,
                s,
              ),
            )
          : r('\x3c!----\x3e'),
        r(
          `<form class="mx-auto w-full rounded md:w-10/12 md:p-4"><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="Name" class="${w(
            [
              i.errors && i.errors.name
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-200',
              'w-4/12',
            ],
          )}"> Name </label><input${v(
            'value',
            i.form.name,
          )} type="text" name="name" class="${w([
            { 'border-red-500': i.errors && i.errors.name },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            x(i.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="Email" class="${w(
            [
              i.errors && i.errors.email
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-200',
              'w-4/12',
            ],
          )}"> Email </label><input${v(
            'value',
            i.form.email,
          )} type="email" name="email" class="${w([
            { 'border-red-500': i.errors && i.errors.email },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            x(i.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="Password" class="${w(
            [
              i.errors && i.errors.password
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-200',
              'w-4/12',
            ],
          )}"> Password </label><input${v(
            'value',
            i.form.password,
          )} type="password" name="password" autocomplete="on" class="${w([
            { 'border-red-500': i.errors && i.errors.password },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            x(i.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="Password confirm" class="${w(
            [
              i.errors && i.errors.password
                ? 'text-red-500'
                : 'text-gray-700 dark:text-gray-200',
              'w-4/12',
            ],
          )}"> Confirm Password </label><input${v(
            'value',
            i.form.password_confirmation,
          )} type="password" name="password_confirmation" class="${w([
            { 'border-red-500': i.errors && i.errors.password },
            'mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none sm:mt-0 sm:w-8/12',
          ])}"${
            x(i.loading) ? ' disabled' : ''
          }></div><div class="my-1 w-full rounded py-2 sm:flex sm:items-center sm:justify-end"><div class="mt-3 flex w-full items-center justify-between rounded sm:mt-0 sm:w-8/12">`,
        ),
        r(
          b(
            h,
            {
              primary: '',
              loading: i.loading,
              disabled: i.loading,
              text: (i.loading, 'Register'),
              'btn-class':
                'uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg ',
              type: 'submit',
            },
            {
              text: d((e, r, s, t) => {
                if (!r)
                  return [
                    i.loading
                      ? p('', !0)
                      : (m(), u($, { key: 0, class: 'mr-2 h-6 w-6' })),
                    i.loading
                      ? (m(), u(j, { key: 1, class: 'mr-2 h-6 w-6' }))
                      : p('', !0),
                    c(' Register '),
                  ];
                i.loading
                  ? r('\x3c!----\x3e')
                  : r(b($, { class: 'mr-2 h-6 w-6' }, null, s, t)),
                  i.loading
                    ? r(b(j, { class: 'mr-2 h-6 w-6' }, null, s, t))
                    : r('\x3c!----\x3e'),
                  r(' Register ');
              }),
              _: 1,
            },
            s,
          ),
        ),
        r(
          '<span class="text-sm"><span class="mr-1 cursor-default text-gray-700 dark:text-gray-200"> Already a member? </span>',
        ),
        r(
          b(
            S,
            {
              to: { name: 'login' },
              class: 'text-sm font-bold text-blue-500 hover:text-blue-300',
            },
            {
              default: d((e, r, s, t) => {
                if (!r) return [c(' Sign In ')];
                r(' Sign In ');
              }),
              _: 1,
            },
            s,
          ),
        ),
        r('</span></div></div></form>'),
        g.socialLoginsEnabled
          ? (r(
              '<div class="mt-5"><div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"><p class="mx-4 mb-0 text-center font-semibold">Or</p></div><h3 class="mb-3 font-bold text-gray-700">Register with</h3>',
            ),
            r(b(k, null, null, s)),
            r('</div>'))
          : r('\x3c!----\x3e'),
        r('</div></div></div></div></div>');
    },
  ],
]);
export { $ as default };
