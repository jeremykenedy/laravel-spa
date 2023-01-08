import { ArrowRightOnRectangleIcon as e } from '@heroicons/vue/24/outline';
import { mapGetters as r, mapActions as t } from 'vuex';
import { _ as o, C as s } from '../app2.mjs';
import { S as a } from './SocialiteLogins-6af0e372.mjs';
import {
  resolveComponent as i,
  withCtx as l,
  createTextVNode as n,
  openBlock as d,
  createBlock as m,
  createCommentVNode as c,
  useSSRContext as g,
} from 'vue';
import {
  ssrRenderAttrs as p,
  ssrRenderAttr as u,
  ssrRenderClass as b,
  ssrIncludeBooleanAttr as x,
  ssrInterpolate as f,
  ssrRenderComponent as h,
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
const v = {
  name: 'Login',
  components: {
    ArrowRightOnRectangleIcon: e,
    CircleSvg: s,
    SocialiteLogins: a,
  },
  props: { showSmLogin: { type: Boolean, default: !0 } },
  setup: () => ({}),
  data: () => ({
    loginImage:
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp',
    loginImageAlt: 'Login Image',
    form: { email: '', password: '' },
    errors: null,
    loading: !1,
  }),
  computed: {
    ...r({ logins: 'auth/logins' }),
    socialLoginsEnabled() {
      if (!this.showSmLogin) return !1;
      return !!Object.values(this.logins).find((e) => '1' == e);
    },
  },
  watch: {},
  methods: {
    ...t({ appLogin: 'auth/login', popToast: 'toast/popToast' }),
    async login() {
      (this.loading = !0), (this.errors = null);
      try {
        await this.appLogin(this.form).then((e) => {
          this.loading = !1;
        });
      } catch (e) {
        422 === e.status &&
          ((this.errors = e.data.errors),
          this.popToast({
            message: Object.values(this.errors).flat().toString(),
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
const w = v.setup;
v.setup = (e, r) => {
  const t = g();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/views/pages/Login.vue',
    ),
    w ? w(e, r) : void 0
  );
};
const y = o(v, [
  [
    'ssrRender',
    function (e, r, t, o, s, a, g, v) {
      const w = i('router-link'),
        y = i('AppButton'),
        k = i('ArrowRightOnRectangleIcon'),
        L = i('CircleSvg'),
        $ = i('SocialiteLogins');
      r(
        `<section${p(
          o,
        )}><div class="mx-auto mt-10 max-w-7xl px-4 text-gray-800 sm:px-6"><div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center"><div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"><img${u(
          'src',
          g.loginImage,
        )} class="w-full"${u(
          'alt',
          g.loginImageAlt,
        )}></div><div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12"><form><div class="mb-6 md:mt-16 lg:mt-12"><label for="email" class="${b(
          [
            { 'text-red-500': g.errors && g.errors.email },
            'text-small mb-2 inline-block hidden',
          ],
        )}"> E-mail Address </label><input id="email"${u(
          'value',
          g.form.email,
        )} type="text" class="${b([
          { 'border-red-500': g.errors && g.errors.email },
          'form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none',
        ])}"${x(g.loading) ? ' disabled' : ''} placeholder="Email Address">`,
      ),
        g.errors && g.errors.email
          ? r(
              `<div class="mt-1 text-sm text-red-500">${f(
                g.errors.email[0],
              )}</div>`,
            )
          : r('\x3c!----\x3e'),
        r(
          `</div><div class="mb-6"><label for="password" class="${b([
            { 'text-red-500': g.errors && g.errors.password },
            'text-small mb-2 inline-block hidden',
          ])}"> Password </label><input id="password"${u(
            'value',
            g.form.password,
          )} type="password" autocomplete="on" class="${b([
            { 'border-red-500': g.errors && g.errors.password },
            'form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none',
          ])}"${x(g.loading) ? ' disabled' : ''} placeholder="Password">`,
        ),
        g.errors && g.errors.password
          ? r(
              `<div class="mt-1 text-sm text-red-500">${f(
                g.errors.password[0],
              )}</div>`,
            )
          : r('\x3c!----\x3e'),
        r(
          '</div><div class="mb-6 flex items-center justify-between"><div class="form-group form-check"><input id="exampleCheck2" type="checkbox" class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"><label class="form-check-label mt-1 inline-block cursor-pointer text-gray-800 dark:text-gray-100" for="exampleCheck2">Remember me</label></div>',
        ),
        r(
          h(
            w,
            {
              to: { name: 'forgot-password' },
              class:
                'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100',
            },
            {
              default: l((e, r, t, o) => {
                if (!r) return [n(' Forgot password? ')];
                r(' Forgot password? ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r('</div><div class="text-center lg:text-left">'),
        r(
          h(
            y,
            {
              primary: '',
              loading: g.loading,
              disabled: g.loading,
              text: (g.loading, 'Login'),
              'btn-class':
                'leading-snug px-7 py-3 text-sm uppercase leading-snug shadow-md',
              type: 'submit',
            },
            {
              text: l((e, r, t, o) => {
                if (!r)
                  return [
                    g.loading
                      ? c('', !0)
                      : (d(), m(k, { key: 0, class: 'mr-2 h-6 w-6' })),
                    g.loading
                      ? (d(), m(L, { key: 1, class: 'mr-2 h-6 w-6' }))
                      : c('', !0),
                    n(' Login '),
                  ];
                g.loading
                  ? r('\x3c!----\x3e')
                  : r(h(k, { class: 'mr-2 h-6 w-6' }, null, t, o)),
                  g.loading
                    ? r(h(L, { class: 'mr-2 h-6 w-6' }, null, t, o))
                    : r('\x3c!----\x3e'),
                  r(' Login ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r(
          '<p class="mt-4 mb-0 pt-1 text-sm"><span class="mr-2 cursor-default text-gray-700 dark:text-gray-300"> Don&#39;t have an account? </span>',
        ),
        r(
          h(
            w,
            {
              to: { name: 'register' },
              class:
                'font-bold text-red-500 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700',
            },
            {
              default: l((e, r, t, o) => {
                if (!r) return [n(' Register ')];
                r(' Register ');
              }),
              _: 1,
            },
            t,
          ),
        ),
        r('</p>'),
        v.socialLoginsEnabled
          ? (r(
              '<div class="mt-5"><div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"><p class="mx-4 mb-0 text-center font-semibold">Or</p></div><h3 class="mb-3 font-bold text-gray-700">Login with</h3>',
            ),
            r(h($, null, null, t)),
            r('</div>'))
          : r('\x3c!----\x3e'),
        r('</div></form></div></div></div></section>');
    },
  ],
]);
export { y as default };
