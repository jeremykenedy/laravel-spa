import { mapGetters as e, mapActions as t, mapState as o } from 'vuex';
import { t as a, _ as s, a as r, c as n, p as i } from '../app2.mjs';
import {
  ExclamationTriangleIcon as d,
  ShieldExclamationIcon as l,
  PowerIcon as c,
  CircleStackIcon as u,
  UserCircleIcon as p,
} from '@heroicons/vue/24/outline';
import {
  resolveComponent as m,
  mergeProps as g,
  useSSRContext as h,
  resolveDirective as v,
} from 'vue';
import {
  ssrRenderAttrs as x,
  ssrRenderSlot as f,
  ssrRenderComponent as b,
  ssrInterpolate as w,
  ssrRenderClass as y,
  ssrRenderStyle as k,
  ssrRenderList as D,
  ssrGetDirectiveProps as T,
} from 'vue/server-renderer';
import A from 'axios';
import 'vue-axios';
import 'moment';
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
const $ = {
  name: 'AppDeleteModal',
  components: { ExclamationTriangleIcon: d },
  props: {
    show: { type: Boolean, default: !1 },
    showIcon: { type: Boolean, default: !0 },
    showCancelButton: { type: Boolean, default: !0 },
    cancelText: { type: String, default: 'Cancel' },
    showConfirmButton: { type: Boolean, default: !0 },
    confirmText: { type: String, default: 'Confirm Delete' },
    title: { type: String, default: 'Delete account' },
    text: {
      type: String,
      default:
        'Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.',
    },
  },
  data: () => ({ blank: 'AppDeleteModal' }),
  computed: {
    hasBodySlot() {
      return this.$slots.body;
    },
    hasFooterSlot() {
      return this.$slots.footer;
    },
  },
  methods: { track: a },
};
const C = $.setup;
$.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/common/AppDeleteModal.vue',
    ),
    C ? C(e, t) : void 0
  );
};
const S = {
  name: 'AccountAdministration',
  components: {
    AppDeleteModal: s($, [
      [
        'ssrRender',
        function (e, t, o, a, s, r, n, i) {
          const d = m('ExclamationTriangleIcon'),
            l = m('AppButton');
          s.show
            ? (t(
                `<div${x(
                  g(
                    {
                      class: 'relative z-10',
                      'aria-labelledby': 'modal-title',
                      role: 'dialog',
                      'aria-modal': 'true',
                    },
                    a,
                  ),
                )}><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-700 dark:bg-opacity-75"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-slate-900 sm:my-8 sm:w-full sm:max-w-lg"><div class="bg-white px-4 pt-5 pb-4 dark:bg-slate-900 sm:p-6 sm:pb-4">`,
              ),
              i.hasBodySlot
                ? (t(
                    '<div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">',
                  ),
                  i.hasBodySlot
                    ? f(e.$slots, 'body', {}, null, t, o)
                    : t('\x3c!----\x3e'),
                  t('</div>'))
                : (t('<div class="sm:flex sm:items-start">'),
                  s.showIcon
                    ? (t(
                        '<div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">',
                      ),
                      t(b(d, { class: 'h-6 w-6 text-red-500' }, null, o)),
                      t('</div>'))
                    : t('\x3c!----\x3e'),
                  t(
                    `<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 id="modal-title" class="mb-4 mt-0 text-lg font-medium leading-6 text-red-500 dark:text-red-400">${w(
                      s.title,
                    )}</h3><div class="mt-2"><p class="text-sm text-gray-700 dark:text-gray-300">${w(
                      s.text,
                    )}</p></div></div></div>`,
                  )),
              t('</div>'),
              i.hasFooterSlot
                ? (t(
                    '<div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">',
                  ),
                  i.hasFooterSlot
                    ? f(e.$slots, 'footer', {}, null, t, o)
                    : t('\x3c!----\x3e'),
                  t('</div>'))
                : (t('<div class="flex justify-between px-4 py-3 sm:px-6">'),
                  s.showCancelButton
                    ? t(
                        b(
                          l,
                          {
                            text: s.cancelText,
                            class: 'mr-3',
                            onClick: (t) => e.$emit('cancel'),
                          },
                          null,
                          o,
                        ),
                      )
                    : t('\x3c!----\x3e'),
                  s.showConfirmButton
                    ? t(
                        b(
                          l,
                          {
                            danger: '',
                            text: s.confirmText,
                            onClick: (t) => e.$emit('confirm'),
                          },
                          null,
                          o,
                        ),
                      )
                    : t('\x3c!----\x3e'),
                  t('</div>')),
              t('</div></div></div></div>'))
            : t('\x3c!----\x3e');
        },
      ],
    ]),
    ShieldExclamationIcon: l,
  },
  props: {},
  data: () => ({ showDeleteModal: !1, readyToDelete: !1, loading: !1 }),
  computed: { ...e({ user: 'auth/user' }) },
  methods: {
    ...t({ popToast: 'toast/popToast', deleteAccount: 'auth/deleteAccount' }),
    confirm() {
      const e = this;
      (e.loading = !0),
        e
          .deleteAccount(this.user)
          .then((t) => {
            e.popToast({
              message: 'Account deleted successfully. We will miss you!',
              timer: 5e4,
              icon: 'success',
            }),
              (e.loading = !1),
              (e.showDeleteModal = !1);
          })
          .catch((t) => {
            e.popToast({
              message: 'Error deleteding account',
              timer: 1e4,
              icon: 'error',
            }),
              (e.loading = !1),
              (e.showDeleteModal = !1);
          });
    },
  },
};
const B = S.setup;
S.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/account/AccountAdministration.vue',
    ),
    B ? B(e, t) : void 0
  );
};
const P = s(S, [
    [
      'ssrRender',
      function (e, t, o, a, s, r, n, i) {
        const d = m('ShieldExclamationIcon'),
          l = m('AppSwitch'),
          c = m('AppButton'),
          u = m('AppDeleteModal');
        t(`<div${x(a)}>`),
          t(
            b(
              d,
              { class: 'ml-auto mr-auto mt-6 mb-5 h-14 w-14 text-red-500' },
              null,
              o,
            ),
          ),
          t(
            `<h3 class="mb-5 text-center text-lg text-red-500">Delete Account</h3><p class="mb-3 text-center text-red-600"><span class="fa fa-exclamation-triangle fa-fw mr-3" aria-hidden="true"></span><strong>Deleting</strong> your account is <u><strong>permanent</strong></u> and <u><strong>cannot</strong></u> be undone. <span class="fa fa-exclamation-triangle fa-fw ml-3" aria-hidden="true"></span></p><div class="${y(
              [
                n.readyToDelete ? 'font-bold text-red-500' : 'text-yellow-600',
                'mb-4 content-center rounded p-4 text-center',
              ],
            )}">`,
          ),
          t(
            b(
              l,
              {
                enabled: n.readyToDelete,
                class: n.loading ? 'disabled' : '',
                disabled: n.loading,
                onClick: (e) => (n.readyToDelete = !n.readyToDelete),
              },
              null,
              o,
            ),
          ),
          t(
            `<h3 style="${k({
              'vertical-align': '4px',
            })}" class="ml-3 inline-block cursor-pointer">${w(
              n.readyToDelete ? 'Ready To Delete' : 'Not Ready To Delete',
            )}</h3></div><div class="mb-7 text-center">`,
          ),
          t(
            b(
              c,
              {
                danger: '',
                text: 'Delete My Account',
                disabled: !n.readyToDelete || n.loading,
                onClick: (e) => (n.showDeleteModal = !0),
              },
              null,
              o,
            ),
          ),
          t('</div>'),
          t(
            b(
              u,
              {
                show: n.showDeleteModal,
                onCancel: (e) => (n.showDeleteModal = !1),
                onConfirm: (e) => i.confirm(),
              },
              null,
              o,
            ),
          ),
          t('</div>');
      },
    ],
  ]),
  U = {
    name: 'AccountAuthentication',
    components: { PowerIcon: c },
    props: {},
    data: () => ({
      loading: !1,
      window: {},
      authWindowTitle: 'Authentication Provider Authorization',
    }),
    computed: {
      ...o('auth', { user: (e) => e.user }),
      ...e({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        roles: 'auth/roles',
        logins: 'auth/logins',
      }),
      socialLoginsEnabled() {
        return !!Object.values(this.logins).find((e) => '1' == e);
      },
      allowedProviders() {
        const e = [];
        for (const t in this.logins)
          0 != this.logins[t] && '0' != this.logins[t] && e.push(t);
        return e.sort();
      },
      enabledProviders() {
        const e = [];
        return (
          this.user.providers.forEach((t, o) => {
            this.allowedProviders.find((e) => e == t.provider) && e.push(t);
          }),
          e
        );
      },
      disabledProviders() {
        let e = this.allowedProviders;
        return (
          this.user.providers.forEach((t, o) => {
            e = e.filter((e) => e != t.provider);
          }),
          e
        );
      },
    },
    mounted() {
      window.addEventListener('message', this.onMessage, !1);
    },
    beforeUnmount() {
      window.removeEventListener('message', this.onMessage);
    },
    methods: {
      ...t({
        popToast: 'toast/popToast',
        revokeProvider: 'auth/revokeProvider',
        fetchOauthUrl: 'auth/fetchOauthUrl',
        getUser: 'auth/getUser',
      }),
      track: a,
      parseDisplayDate: r,
      capitalizeFirstLetter: n,
      providerIcon: i,
      providerConnected(e, t) {
        const o = t.providers.find((t) => t.provider == e);
        return o || !1;
      },
      triggerRevoke(e) {
        const t = this;
        t.capitalizeFirstLetter(e.provider);
        const o = `Are you sure you want to <strong>Revoke</strong><br>${t.capitalizeFirstLetter(
          e.provider,
        )} Authentication?<br><br><small><span class="far fa-clock fa-fw fa-xs mr-1"></span>First Used: ${t.parseDisplayDate(
          e.created_at,
        )}</small><br><small><span class="far fa-clock fa-fw fa-xs mr-1"></span>Last Used: ${t.parseDisplayDate(
          e.updated_at,
        )}</small>`;
        t.$swal
          .fire({
            title: '<strong>Revoke ',
            icon: 'warning',
            html: o,
            showCancelButton: !1,
            showDenyButton: !0,
            confirmButtonColor: '#FF0000',
            denyButtonColor: '#777777',
            confirmButtonText: 'Confirm Revoke',
            denyButtonText: 'Cancel',
          })
          .then((o) => {
            o.isConfirmed
              ? t
                  .revokeProvider(e)
                  .then((e) => {
                    t.popToast({
                      message: 'Provider successfully revoked',
                      timer: 5e3,
                      icon: 'success',
                    });
                  })
                  .catch((e) => {
                    t.popToast({
                      message: 'Error revoking provider',
                      timer: 1e4,
                      icon: 'error',
                    });
                  })
              : o.isDenied;
          });
      },
      async triggerConnect(e) {
        this.track(
          `Social Login Provider Clicked: ${e}`,
          'clicked',
          'user-account',
        ),
          (this.loading = !0);
        try {
          await A.get('/sanctum/csrf-cookie').then((e) => {});
          const t = await this.fetchOauthUrl({ provider: e }).then(
            (e) => ((this.loading = !1), e),
          );
          this.window = this.openWindow(t, this.authWindowTitle);
        } catch (t) {
          this.track(
            `Social Provider Failed to Authorize: ${e}`,
            'error',
            'auth-error',
          ),
            this.popToast({
              message: 'Failed authorize provider.',
              timer: 1e4,
              icon: 'error',
            }),
            this.window.close(),
            (this.loading = !1);
        }
      },
      async onMessage(e) {
        const t = this;
        e.origin === window.origin &&
          e.data.token &&
          (e.data.token && 'cannot_add' == e.data.token
            ? t.popToast({
                message: 'Unable to authorize provider',
                timer: 5e3,
                icon: 'error',
              })
            : (t.popToast({
                message: 'Successfully authorized provider',
                timer: 2500,
                icon: 'success',
              }),
              t.getUser().then((e) => {})));
      },
      openWindow(e, t, o = {}) {
        'object' == typeof e && ((o = e), (e = '')),
          (o = { url: e, title: t, width: 600, height: 720, ...o });
        const a =
            void 0 !== window.screenLeft
              ? window.screenLeft
              : window.screen.left,
          s =
            void 0 !== window.screenTop ? window.screenTop : window.screen.top,
          r = window.innerWidth || document.documentElement.clientWidth,
          n = window.innerHeight || document.documentElement.clientHeight;
        (o.left = r / 2 - o.width / 2 + a), (o.top = n / 2 - o.height / 2 + s);
        const i = Object.keys(o)
            .reduce((e, t) => (e.push(`${t}=${o[t]}`), e), [])
            .join(','),
          d = window.open(e, t, i);
        return window.focus && d.focus(), d;
      },
    },
  };
const I = U.setup;
U.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/account/AccountAuthentication.vue',
    ),
    I ? I(e, t) : void 0
  );
};
const j = s(U, [
    [
      'ssrRender',
      function (e, t, o, a, s, r, n, i) {
        const d = m('PowerIcon'),
          l = m('AppButton'),
          c = v('tippy');
        t(`<div${x(a)}>`),
          i.socialLoginsEnabled
            ? t('\x3c!----\x3e')
            : (t('<div class="p-10 text-center text-gray-600"><div>'),
              t(b(d, { class: 'ml-auto mr-auto mb-4 h-12 w-12' }, null, o)),
              t(
                '</div><h2 class="text-lg">No applications are available for integration.</h2></div>',
              )),
          i.socialLoginsEnabled
            ? (t(
                '<div><div class="grid grid-cols-1 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white sm:grid-cols-2 lg:grid-cols-3">\x3c!--[--\x3e',
              ),
              D(i.enabledProviders, (a, s) => {
                t(
                  `<div class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"><div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2"><span class="${y(
                    [i.providerIcon(a.provider), 'fa-4x mb-2'],
                  )}"></span><h5 class="mb-0 text-lg font-extrabold capitalize text-gray-900 dark:text-white">${w(
                    a.provider,
                  )}</h5>`,
                ),
                  a.created_at
                    ? t(
                        `<div class="mb-1 mb-3 text-gray-600 dark:text-gray-400" style="${k(
                          { 'line-height': '1.2', 'font-size': '0.6em' },
                        )}"><span class="font-bold uppercase text-gray-700 dark:text-gray-200"><span class="far fa-clock"></span> First Used: </span><br> ${w(
                          i.parseDisplayDate(a.created_at),
                        )}</div>`,
                      )
                    : t('\x3c!----\x3e'),
                  a.updated_at
                    ? t(
                        `<div class="mb-0 text-gray-600 dark:text-gray-400" style="${k(
                          { 'line-height': '1.2', 'font-size': '0.6em' },
                        )}"><span class="font-bold uppercase text-gray-700 dark:text-gray-200"><span class="far fa-clock"></span> Last Used: </span><br> ${w(
                          i.parseDisplayDate(a.updated_at),
                        )}</div>`,
                      )
                    : t('\x3c!----\x3e'),
                  t('<div class="mt-4 flex space-x-3 md:mt-3">'),
                  t(
                    b(
                      l,
                      g(
                        {
                          danger: '',
                          text: 'Revoke',
                          icon: 'fa-solid fa-xmark fa-fw',
                          onClick: (e) => i.triggerRevoke(a),
                        },
                        T(
                          e,
                          c,
                          'Disconnect ' +
                            i.capitalizeFirstLetter(a.provider) +
                            ' from your account.',
                        ),
                      ),
                      null,
                      o,
                    ),
                  ),
                  t('</div></div></div>');
              }),
              t('\x3c!--]--\x3e\x3c!--[--\x3e'),
              D(i.disabledProviders, (a, s) => {
                t(
                  `<div class="mb-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-900 dark:bg-gray-900"><div class="flex flex-col items-center pt-4 pb-4 pl-2 pr-2"><span class="${y(
                    [i.providerIcon(a), 'fa-4x mb-2'],
                  )}"></span><h5 class="mb-2 text-lg font-extrabold capitalize text-gray-900 dark:text-white">${w(
                    a,
                  )}</h5><div class="mt-4 mb-5 flex space-x-3 md:mt-5">`,
                ),
                  t(
                    b(
                      l,
                      g(
                        {
                          accent: '',
                          text: 'Connect',
                          icon: 'fa-solid fa-plug-circle-plus fw-fw',
                          onClick: (e) => i.triggerConnect(a),
                        },
                        T(
                          e,
                          c,
                          'Connect ' +
                            i.capitalizeFirstLetter(a) +
                            ' to your account.',
                        ),
                      ),
                      null,
                      o,
                    ),
                  ),
                  t('</div></div></div>');
              }),
              t('\x3c!--]--\x3e</div></div>'))
            : t('\x3c!----\x3e'),
          t('<div class="clear-both"></div></div>');
      },
    ],
  ]),
  E = {
    name: 'UserDownloadData',
    components: {},
    props: {},
    data: () => ({ loading: !1 }),
    computed: { ...o('auth', { user: (e) => e.user }) },
    methods: {
      ...t({ popToast: 'toast/popToast' }),
      track: a,
      async triggerUserDataDownload() {
        this.loading = !0;
        try {
          const e = await A.post(`/api/user/${this.user.id}/data`);
          e && e.data && e.data.status && 'success' == e.data.status
            ? ((this.loading = !1),
              this.userDataDownloadConfirmed(),
              this.track(
                'User Triggered Data Download Successfully',
                'user actions',
                'trigger download success',
              ))
            : ((this.loading = !1),
              this.popToast({
                message: 'Failed to trigger data download.',
                timer: 1e4,
                icon: 'error',
              }));
        } catch (e) {
          (this.loading = !1),
            this.popToast({
              message: 'Failed to trigger data download.',
              timer: 1e4,
              icon: 'error',
            });
        }
      },
      userDataDownloadConfirmed() {
        this.$swal
          .fire({
            title: 'Success!',
            icon: 'success',
            html: `Your data will be ready for download shortly. <br>A download link has been sent to your email <br>${this.user.email}`,
            showCancelButton: !1,
            showDenyButton: !1,
            confirmButtonColor: '#008000',
            confirmButtonText: 'Dismiss',
          })
          .then((e) => {
            e.isConfirmed || e.isDenied;
          });
      },
    },
  };
const z = E.setup;
E.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/users/UserDownloadData.vue',
    ),
    z ? z(e, t) : void 0
  );
};
const F = {
  name: 'AccountData',
  components: {
    UserDownloadData: s(E, [
      [
        'ssrRender',
        function (e, t, o, a, s, r, n, i) {
          const d = m('AppButton');
          t(
            b(
              d,
              g(
                {
                  primary: '',
                  text: 'Process Download',
                  loading: n.loading,
                  class: 'inline-flex items-center justify-center px-5 py-3',
                  icon: n.loading
                    ? 'fa fa-circle-notch fa-spin'
                    : 'fa fa-download',
                  onClick: (e) => i.triggerUserDataDownload(),
                },
                a,
              ),
              null,
              o,
            ),
          );
        },
      ],
    ]),
  },
};
const L = F.setup;
F.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/account/AccountData.vue',
    ),
    L ? L(e, t) : void 0
  );
};
const M = s(F, [
    [
      'ssrRender',
      function (e, t, o, a, s, r, n, i) {
        const d = m('UserDownloadData');
        t(
          `<div${x(
            g({ class: '' }, a),
          )}><div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"><h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl"><span class="block"> Your Data <span class="text-indigo-600">On Demand</span></span><span class="block text-gray-700 dark:text-gray-500">Download your user data.</span></h2><div class="mt-8 flex lg:mt-0 lg:flex-shrink-0"><div class="inline-flex rounded-md shadow">`,
        ),
          t(b(d, null, null, o)),
          t('</div></div></div></div>');
      },
    ],
  ]),
  R = {
    name: 'AccountPrivacy',
    components: {},
    props: {},
    setup: () => ({}),
    data: () => ({ blank: 'AccountPrivacy' }),
    computed: {
      ...o('sidebar', {
        sideBarOpen: (e) => e.sideBarOpen,
        fullScreenSideBarOpen: (e) => e.fullScreenSideBarOpen,
      }),
      ...o('auth', {
        user: (e) => e.user,
        roles: (e) => e.roles,
        token: (e) => e.token,
        logins: (e) => e.logins,
      }),
      ...e({
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
    methods: { ...t({ popToast: 'toast/popToast' }), track: a },
  };
const _ = R.setup;
R.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/components/account/AccountPrivacy.vue',
    ),
    _ ? _(e, t) : void 0
  );
};
const O = {
  components: {
    ShieldExclamationIcon: l,
    CircleStackIcon: u,
    UserCircleIcon: p,
    ExclamationTriangleIcon: d,
    AccountAdministration: P,
    AccountAuthentication: j,
    AccountData: M,
    AccountPrivacy: s(R, [
      [
        'ssrRender',
        function (e, t, o, a, s, r, n, i) {
          t(
            `<div${x(a)} data-v-6c581770><h1 data-v-6c581770>${w(
              n.blank,
            )}</h1></div>`,
          );
        },
      ],
      ['__scopeId', 'data-v-6c581770'],
    ]),
  },
  data: () => ({ activeTab: 'authentication' }),
  computed: {},
  methods: {
    ...t({ popToast: 'toast/popToast' }),
    track: a,
    changeTab(e) {
      (this.activeTab = e), this.track(`clicked tab: ${e}`);
    },
  },
};
const W = O.setup;
O.setup = (e, t) => {
  const o = h();
  return (
    (o.modules || (o.modules = new Set())).add(
      'resources/js/views/pages/settings/Account.vue',
    ),
    W ? W(e, t) : void 0
  );
};
const H = s(O, [
  [
    'ssrRender',
    function (e, t, o, a, s, r, n, i) {
      const d = m('UserCircleIcon'),
        l = m('CircleStackIcon'),
        c = m('ExclamationTriangleIcon'),
        u = m('AccountAuthentication'),
        p = m('AccountData'),
        g = m('AccountPrivacy'),
        h = m('AccountAdministration');
      t(
        `\x3c!--[--\x3e<div class="rounded-t border-b p-4 font-semibold dark:border-gray-600 dark:bg-slate-800" data-v-7479a1d1> Account </div><div class="rounded-b-lg bg-white p-4 dark:bg-slate-800" data-v-7479a1d1><div class="border-b-2 border-gray-200 dark:border-gray-700" data-v-7479a1d1><ul class="flex flex-wrap justify-evenly text-center text-sm font-medium text-gray-500 dark:text-gray-400" data-v-7479a1d1><li class="mr-2 cursor-pointer" style="${k(
          { 'margin-top': '3px', 'margin-bottom': '-2px' },
        )}" data-v-7479a1d1><span class="${y([
          'authentication' == n.activeTab
            ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
            : '',
          'group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
        ])}" data-v-7479a1d1>`,
      ),
        t(b(d, { class: 'mr-1 h-5 w-5' }, null, o)),
        t(
          ` Authentication </span></li><li class="mr-2 cursor-pointer" style="${k(
            { 'margin-top': '3px', 'margin-bottom': '-2px' },
          )}" data-v-7479a1d1><span class="${y([
            'data' == n.activeTab
              ? 'active border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500'
              : '',
            'group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
          ])}" data-v-7479a1d1>`,
        ),
        t(b(l, { class: 'mr-1 h-5 w-5' }, null, o)),
        t(
          ` Data </span></li><li class="mr-2 cursor-pointer" style="${k({
            'margin-top': '3px',
            'margin-bottom': '-2px',
          })}" data-v-7479a1d1><span class="${y([
            'administration' == n.activeTab
              ? 'active border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
              : '',
            'group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
          ])}" data-v-7479a1d1>`,
        ),
        t(b(c, { class: 'mr-1 h-5 w-5' }, null, o)),
        t(
          ` Administration </span></li></ul></div><div class="${y([
            'administration' == n.activeTab
              ? 'dark:bg-gray-900'
              : 'dark:bg-gray-800',
            'rounded-b-lg bg-gray-50 p-4',
          ])}" data-v-7479a1d1>`,
        ),
        'authentication' == n.activeTab
          ? t(b(u, null, null, o))
          : t('\x3c!----\x3e'),
        'data' == n.activeTab ? t(b(p, null, null, o)) : t('\x3c!----\x3e'),
        'privacy' == n.activeTab ? t(b(g, null, null, o)) : t('\x3c!----\x3e'),
        'administration' == n.activeTab
          ? t(b(h, null, null, o))
          : t('\x3c!----\x3e'),
        t('</div></div>\x3c!--]--\x3e');
    },
  ],
  ['__scopeId', 'data-v-7479a1d1'],
]);
export { H as default };
