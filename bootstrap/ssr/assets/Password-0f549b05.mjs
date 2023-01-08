import { mapActions as s } from 'vuex';
import { E as e } from './Errors-cfd7b346.mjs';
import { S as o } from './Success-4b3d058c.mjs';
import { _ as r, C as t } from '../app2.mjs';
import {
  resolveComponent as a,
  withCtx as i,
  openBlock as d,
  createBlock as n,
  createCommentVNode as m,
  createTextVNode as l,
  useSSRContext as p,
} from 'vue';
import {
  ssrRenderComponent as u,
  ssrRenderDynamicModel as c,
  ssrRenderAttr as w,
  ssrRenderClass as f,
  ssrRenderStyle as g,
} from 'vue/server-renderer';
import '@heroicons/vue/24/outline';
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
const h = {
  components: { Errors: e, Success: o, CircleSvg: t },
  data: () => ({
    form: { password: '', password_confirmation: '' },
    errors: null,
    success: '',
    loading: !1,
    showPassword: !1,
    showConfirmPassword: !1,
  }),
  computed: {
    submitEnabled() {
      return !!(
        this.form.password &&
        this.form.password_confirmation &&
        this.form.password.length > 5 &&
        this.form.password == this.form.password_confirmation
      );
    },
  },
  methods: {
    ...s({ updatePassword: 'auth/password', popToast: 'toast/popToast' }),
    async update() {
      (this.loading = !0), (this.errors = null), (this.success = '');
      try {
        await this.updatePassword(this.form).then((s) => {
          s &&
            'Success' == s &&
            ((this.form.password = ''),
            (this.form.password_confirmation = ''),
            this.popToast({
              message: 'Password Updated Successfully',
              timer: 2e3,
              icon: 'success',
            }));
        });
      } catch (s) {
        this.errors = s.data;
        let e = 'Error Updating Password';
        s &&
          s.response &&
          s.response.data &&
          s.response.data.message &&
          (e = s.response.data.message),
          this.popToast({ message: e, timer: 5e3, icon: 'error' });
      }
      this.loading = !1;
    },
  },
};
const b = h.setup;
h.setup = (s, e) => {
  const o = p();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/views/pages/settings/Password.vue',
    ),
    b ? b(s, e) : void 0
  );
};
const v = r(h, [
  [
    'ssrRender',
    function (s, e, o, r, t, p, h, b) {
      const v = a('Success'),
        y = a('Errors'),
        x = a('AppButton'),
        P = a('CircleSvg');
      e(
        '\x3c!--[--\x3e<div class="rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800"> Password </div><div class="bg-white p-4 dark:bg-slate-800">',
      ),
        h.success
          ? e(
              u(
                v,
                { content: h.success, onClose: (s) => (h.success = null) },
                null,
                o,
              ),
            )
          : e('\x3c!----\x3e'),
        h.errors
          ? e(
              u(
                y,
                { content: h.errors, onClose: (s) => (h.errors = null) },
                null,
                o,
              ),
            )
          : e('\x3c!----\x3e'),
        e(
          `<form class="mx-auto w-full md:w-10/12 md:p-4"><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="password" class="w-4/12"> Password </label><input${c(
            h.showPassword ? 'text' : 'password',
            h.form.password,
            null,
          )}${w(
            'type',
            h.showPassword ? 'text' : 'password',
          )} name="password" autocomplete="on" class="mt-3 ml-1 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"><span class="${f(
            [h.showPassword ? 'fa-eye' : 'fa-eye-slash', 'fa fa-fw ml-3'],
          )}" style="${g({
            width: '1.45em',
          })}"></span></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between"><label for="password confirmation" class="w-4/12"> Confirm password </label><input${c(
            h.showConfirmPassword ? 'text' : 'password',
            h.form.password_confirmation,
            null,
          )}${w(
            'type',
            h.showConfirmPassword ? 'text' : 'password',
          )} name="password_confirmation" class="mt-3 ml-1 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12"><span style="${g(
            { width: '1.45em' },
          )}" class="${f([
            h.showConfirmPassword ? 'fa-eye' : 'fa-eye-slash',
            'fa fa-fw ml-3',
          ])}"></span></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end"><div class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12">`,
        ),
        e(
          u(
            x,
            {
              loading: h.loading,
              disabled: h.loading || !b.submitEnabled,
              text: (h.loading, 'Update'),
              'btn-class':
                'uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg ',
              type: 'submit',
            },
            {
              text: i((s, e, o, r) => {
                if (!e)
                  return [
                    h.loading
                      ? (d(), n(P, { key: 0, class: 'mr-2 h-5 w-5' }))
                      : m('', !0),
                    l(' Update '),
                  ];
                h.loading
                  ? e(u(P, { class: 'mr-2 h-5 w-5' }, null, o, r))
                  : e('\x3c!----\x3e'),
                  e(' Update ');
              }),
              _: 1,
            },
            o,
          ),
        ),
        e('</div></div></form></div>\x3c!--]--\x3e');
    },
  ],
]);
export { v as default };
