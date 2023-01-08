import { mapGetters as e, mapActions as s } from 'vuex';
import { E as r } from './Errors-cfd7b346.mjs';
import { S as t } from './Success-4b3d058c.mjs';
import { _ as i, C as a } from '../app2.mjs';
import { HomeIcon as o } from '@heroicons/vue/24/outline';
import {
  resolveComponent as n,
  mergeProps as l,
  withCtx as c,
  createVNode as d,
  createTextVNode as u,
  toDisplayString as m,
  useSSRContext as p,
} from 'vue';
import {
  ssrRenderAttrs as f,
  ssrRenderComponent as h,
  ssrInterpolate as v,
  ssrRenderClass as y,
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
const g = {
  components: { Errors: r, Success: t, CircleSvg: a, HomeIcon: o },
  props: {
    id: { type: Number, required: !0 },
    hash: { type: String, required: !0 },
  },
  data: () => ({ errors: null, success: '', loading: !1 }),
  computed: {
    ...e({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  methods: {
    ...s({
      verifyResend: 'auth/verifyResend',
      verifyEmail: 'auth/verifyEmail',
      popToast: 'toast/popToast',
    }),
    async verify() {
      (this.loading = !0), (this.errors = null), (this.success = '');
      try {
        await this.verifyEmail({ id: this.id, hash: this.hash }).then((e) => {
          (this.loading = !1),
            (this.success = 'Email Successfully Verified. Redirecting ...'),
            this.popToast({
              message: 'Email Successfully Verified',
              timer: 5e3,
              icon: 'success',
            }),
            setTimeout(() => {
              this.$router.push({ name: 'dashboard' });
            }, 1e3);
        });
      } catch (e) {
        (this.errors = 'An errored, please try again later'),
          this.popToast({
            message: 'An errored, please try again later.',
            timer: 5e3,
            icon: 'error',
          }),
          (this.loading = !1);
      }
      this.loading = !1;
    },
    async resend() {
      this.loading = !0;
      try {
        await this.verifyResend({ id: this.id }).then((e) => {
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
const x = g.setup;
g.setup = (e, s) => {
  const r = p();
  return (
    (r.modules || (r.modules = new Set())).add(
      'resources/js/views/pages/VerifyEmail.vue',
    ),
    x ? x(e, s) : void 0
  );
};
const w = i(g, [
  [
    'ssrRender',
    function (e, s, r, t, i, a, o, p) {
      const g = n('success'),
        x = n('errors'),
        w = n('router-link'),
        b = n('HomeIcon'),
        k = n('circle-svg'),
        E = n('AppButton');
      s(
        `<div${f(
          l({ class: 'mx-auto max-w-screen-md text-gray-900' }, t),
        )}><div class="flex justify-center"><div class="flex-1"><div class="w-auto rounded border-gray-300 bg-white p-3 text-gray-800 shadow dark:bg-slate-900 dark:text-gray-100">`,
      ),
        o.success
          ? s(
              h(
                g,
                { content: o.success, onClose: (e) => (o.success = null) },
                null,
                r,
              ),
            )
          : s('\x3c!----\x3e'),
        o.errors
          ? s(
              h(
                x,
                {
                  content: o.errors,
                  'container-class': 'w-full',
                  onClose: (e) => (o.errors = null),
                },
                null,
                r,
              ),
            )
          : s('\x3c!----\x3e'),
        s(
          `<h5 class="border-gray-300 p-3 pt-6 text-center font-semibold">${v(
            e.user && e.user.email_verified_at
              ? 'Your email is already confirmed'
              : 'Please confirm verification of your email',
          )}</h5><div class="rounded p-4"><div class="my-1 mx-auto mt-3 flex w-full items-center justify-center py-2 sm:mt-0 sm:w-8/12 md:w-10/12 md:p-4">`,
        ),
        e.user && e.user.email_verified_at
          ? (s('<div><div class="text-center">'),
            e.authenticated
              ? s(
                  h(
                    w,
                    {
                      to: { name: 'dashboard' },
                      class:
                        'text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                      onClick: e.closeDrop,
                    },
                    {
                      default: c(({ isActive: e }, s, r, t) => {
                        if (!s)
                          return [
                            d(b, {
                              class: 'mx-auto mb-3 h-20 w-20 text-center',
                            }),
                            d('span', { class: 'sr-only' }, 'Go Home'),
                          ];
                        s(
                          h(
                            b,
                            { class: 'mx-auto mb-3 h-20 w-20 text-center' },
                            null,
                            r,
                            t,
                          ),
                        ),
                          s(`<span class="sr-only"${t}>Go Home</span>`);
                      }),
                      _: 1,
                    },
                    r,
                  ),
                )
              : s('\x3c!----\x3e'),
            s('</div></div>'))
          : (s('<div>'),
            o.loading
              ? (s(
                  '<div class="flex items-center justify-center rounded-sm bg-blue-500 p-2 px-6 text-white hover:bg-blue-600"> Verifying Email ',
                ),
                s(h(k, { class: 'ml-3 h-5 w-5' }, null, r)),
                s('</div>'))
              : s(
                  h(
                    E,
                    {
                      disabled: o.loading,
                      loading: o.loading,
                      onClick: (e) => (o.errors ? p.resend() : p.verify()),
                    },
                    {
                      text: c((e, s, r, t) => {
                        if (!s)
                          return [
                            u(
                              m(
                                o.errors
                                  ? 'Oops! Resend Verification?'
                                  : 'Click to Verify',
                              ) + ' ',
                              1,
                            ),
                            d(
                              'span',
                              {
                                class: [
                                  'fa-fw fa-envelope ml-2',
                                  o.errors ? 'far fa-envelope' : 'fas fa-check',
                                ],
                              },
                              null,
                              2,
                            ),
                          ];
                        s(
                          `${v(
                            o.errors
                              ? 'Oops! Resend Verification?'
                              : 'Click to Verify',
                          )} <span class="${y([
                            o.errors ? 'far fa-envelope' : 'fas fa-check',
                            'fa-fw fa-envelope ml-2',
                          ])}"${t}></span>`,
                        );
                      }),
                      _: 1,
                    },
                    r,
                  ),
                ),
            s('</div>')),
        s('</div></div></div></div></div></div>');
    },
  ],
]);
export { w as default };
