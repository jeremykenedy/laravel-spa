import { mapGetters as e, mapActions as t } from 'vuex';
import { E as s } from './Errors-cfd7b346.mjs';
import { S as a } from './Success-4b3d058c.mjs';
import { _ as r, C as o } from '../app2.mjs';
import i from 'moment';
import {
  resolveComponent as m,
  withCtx as d,
  openBlock as l,
  createBlock as n,
  createCommentVNode as u,
  createTextVNode as c,
  useSSRContext as p,
} from 'vue';
import {
  ssrRenderAttrs as b,
  ssrInterpolate as f,
  ssrRenderComponent as v,
  ssrRenderAttr as g,
} from 'vue/server-renderer';
import '@heroicons/vue/24/outline';
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
  components: { Errors: s, Success: a, CircleSvg: o },
  data: () => ({
    form: { email: '', name: '', theme_dark: !1 },
    errors: null,
    success: '',
    loading: !1,
  }),
  computed: { ...e({ verified: 'auth/verified', user: 'auth/user' }) },
  mounted() {
    (this.form.name = this.user.name),
      (this.form.email = this.user.email),
      (this.form.theme_dark = this.user.theme_dark);
  },
  methods: {
    ...t({ updateProfile: 'auth/profile', popToast: 'toast/popToast' }),
    async update() {
      (this.loading = !0), (this.errors = null), (this.success = '');
      try {
        await this.updateProfile(this.form).then((e) => {
          e &&
            e.data &&
            e.data.user &&
            e.data.user.id &&
            this.popToast({
              message: 'Profile Updated Successfully',
              timer: 2e3,
              icon: 'success',
            });
        });
      } catch (e) {
        (this.errors = e.data),
          this.popToast({
            message: 'Error Updating Profile',
            timer: 5e3,
            icon: 'error',
          });
      }
      this.loading = !1;
    },
    moment: () => i(),
  },
};
const w = h.setup;
h.setup = (e, t) => {
  const s = p();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/views/pages/settings/Profile.vue',
    ),
    w ? w(e, t) : void 0
  );
};
const y = r(h, [
  [
    'ssrRender',
    function (e, t, s, a, r, o, i, p) {
      const h = m('Success'),
        w = m('Errors'),
        y = m('AppSwitch'),
        x = m('AppButton'),
        k = m('CircleSvg');
      t(
        `<div${b(
          a,
        )} data-v-eb83c7ba><div class="flex items-center justify-between rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800" data-v-eb83c7ba> Profile <div class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-eb83c7ba>${f(
          e.verified
            ? `Verified on: ${p
                .moment(e.verified)
                .format('MMM Do YYYY, h:mma')}`
            : 'Not verified !',
        )}</div></div><div class="rounded bg-white p-4 dark:border-gray-500 dark:bg-slate-800" data-v-eb83c7ba>`,
      ),
        i.success
          ? t(
              v(
                h,
                { content: i.success, onClose: (e) => (i.success = null) },
                null,
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        i.errors
          ? t(
              v(
                w,
                { content: i.errors, onClose: (e) => (i.errors = null) },
                null,
                s,
              ),
            )
          : t('\x3c!----\x3e'),
        t(
          `<form class="mx-auto w-full md:w-10/12 md:p-4" data-v-eb83c7ba><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between" data-v-eb83c7ba><label for="name" class="w-4/12" data-v-eb83c7ba> Name </label><input${g(
            'value',
            i.form.name,
          )} type="text" name="name" class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12" data-v-eb83c7ba></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-between" data-v-eb83c7ba><label for="Email" class="w-4/12" data-v-eb83c7ba> Email </label><input${g(
            'value',
            i.form.email,
          )} type="email" name="email" class="mt-3 w-full rounded border border-gray-300 bg-white p-2 focus:outline-none dark:border-gray-600 dark:bg-slate-900 sm:mt-0 sm:w-8/12" data-v-eb83c7ba></div><div class="my-1 w-full py-2 sm:flex sm:items-center" data-v-eb83c7ba><label for="Email" class="w-4/12" data-v-eb83c7ba> Theme </label>`,
        ),
        t(
          v(
            y,
            {
              enabled: i.form.theme_dark,
              onClick: (e) => (i.form.theme_dark = !i.form.theme_dark),
            },
            null,
            s,
          ),
        ),
        t(
          `<div class="float-left ml-2 mt-1" data-v-eb83c7ba>${f(
            i.form.theme_dark ? 'Dark' : 'Light',
          )}</div></div><div class="my-1 w-full py-2 sm:flex sm:items-center sm:justify-end" data-v-eb83c7ba><div class="mt-3 flex w-full items-center justify-between sm:mt-0 sm:w-8/12" data-v-eb83c7ba>`,
        ),
        t(
          v(
            x,
            {
              loading: i.loading,
              disabled: i.loading,
              text: (i.loading, 'Update'),
              'btn-class':
                'uppercase leading-snug inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg ',
              type: 'submit',
            },
            {
              text: d((e, t, s, a) => {
                if (!t)
                  return [
                    i.loading
                      ? (l(), n(k, { key: 0, class: 'mr-2 h-5 w-5' }))
                      : u('', !0),
                    c(' Update '),
                  ];
                i.loading
                  ? t(v(k, { class: 'mr-2 h-5 w-5' }, null, s, a))
                  : t('\x3c!----\x3e'),
                  t(' Update ');
              }),
              _: 1,
            },
            s,
          ),
        ),
        t('</div></div></form></div></div>');
    },
  ],
  ['__scopeId', 'data-v-eb83c7ba'],
]);
export { y as default };
