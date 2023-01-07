import { ChevronRightIcon as e } from '@heroicons/vue/24/outline';
import { mapGetters as t, mapActions as a } from 'vuex';
import i from 'axios';
import { _ as n, t as s } from '../app2.mjs';
import {
  resolveComponent as d,
  mergeProps as l,
  useSSRContext as r,
  resolveDirective as g,
  withCtx as o,
  createTextVNode as p,
  createVNode as c,
} from 'vue';
import {
  ssrRenderAttrs as m,
  ssrRenderClass as x,
  ssrRenderComponent as b,
  ssrRenderStyle as u,
  ssrInterpolate as f,
  ssrRenderAttr as y,
  ssrIncludeBooleanAttr as S,
  ssrRenderList as h,
  ssrGetDirectiveProps as v,
} from 'vue/server-renderer';
import { z as k, a as U } from './zoho-monocrome-black-b48ed5c0.mjs';
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
const T = {
  name: 'AppSettingToggle',
  props: {
    setting: { type: Object, required: !0 },
    loading: { type: Boolean, default: !1 },
  },
  methods: {
    updateSetting() {
      const e = '1' == this.setting.val ? 0 : 1,
        { setting: t } = this;
      this.$emit('updateSetting', { val: e, setting: t });
    },
  },
};
const w = T.setup;
T.setup = (e, t) => {
  const a = r();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/form/AppSettingToggle.vue',
    ),
    w ? w(e, t) : void 0
  );
};
const R = n(T, [
    [
      'ssrRender',
      function (e, t, a, i, n, s, r, g) {
        const o = d('AppSwitch');
        t(
          `<div${m(
            l({ class: 'relative mb-1 flex items-center' }, i),
          )}><div class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center"><span class="${x(
            [
              n.loading ? 'default disabled cursor-pointer' : 'cursor-pointer',
              'mr-3',
            ],
          )}">`,
        ),
          t(
            b(
              o,
              {
                enabled: !(!n.setting.val || 1 != n.setting.val),
                'enable-tooltip': !0,
                'tooltip-on': 'Enable',
                'tooltip-off': 'Disable',
              },
              null,
              a,
            ),
          ),
          n.loading
            ? t(
                `<span class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600" style="${u(
                  { left: '-1.4em', top: '1.2em' },
                )}"></span>`,
              )
            : t('\x3c!----\x3e'),
          t(
            `</span><span>${f(n.setting.name)} ${f(
              '1' == n.setting.val ? 'Enabled' : 'Disabled',
            )}</span></div></div>`,
          );
      },
    ],
  ]),
  A = {
    name: 'AppSettingTextInput',
    props: {
      setting: { type: Object, required: !0 },
      loading: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
    },
    methods: {
      updateSetting(e) {
        const { setting: t } = this;
        this.$emit('updateSetting', { val: e, setting: t });
      },
    },
  };
const $ = A.setup;
A.setup = (e, t) => {
  const a = r();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/form/AppSettingTextInput.vue',
    ),
    $ ? $(e, t) : void 0
  );
};
const L = n(A, [
    [
      'ssrRender',
      function (e, t, a, i, n, s, d, l) {
        t(
          `<div${m(i)}><label class="m:w-3/12 mb-1 inline-flex w-10/12"${y(
            'for',
            n.setting.key,
          )}>${f(n.setting.name)}: </label><input${y(
            'id',
            n.setting.key,
          )} type="text"${y('name', n.setting.key)}${y(
            'placeholder',
            n.setting.name,
          )}${
            S(n.disabled || n.loading) ? ' disabled' : ''
          } class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"${y(
            'value',
            n.setting.val,
          )}></div>`,
        );
      },
    ],
  ]),
  G = {
    name: 'AppSettingTextarea',
    props: {
      setting: { type: Object, required: !0 },
      loading: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      rows: { type: Number, default: 4 },
      cols: { type: Number, default: 50 },
    },
    methods: {
      updateSetting(e) {
        const { setting: t } = this;
        this.$emit('updateSetting', { val: e, setting: t });
      },
    },
  };
const I = G.setup;
G.setup = (e, t) => {
  const a = r();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/components/form/AppSettingTextarea.vue',
    ),
    I ? I(e, t) : void 0
  );
};
const M = {
  name: 'AppSettings',
  components: {
    ChevronRightIcon: e,
    AppSettingToggle: R,
    AppSettingTextInput: L,
    AppSettingTextarea: n(G, [
      [
        'ssrRender',
        function (e, t, a, i, n, s, d, l) {
          t(
            `<div${m(i)}><label class="m:w-3/12 mb-1 inline-flex w-10/12"${y(
              'for',
              n.setting.key,
            )}>${f(n.setting.name)}: </label><textarea${y(
              'id',
              n.setting.key,
            )} type="text"${y('name', n.setting.key)}${y(
              'placeholder',
              n.setting.name,
            )}${
              S(n.disabled || n.loading) ? ' disabled' : ''
            } class="w-100 mb-3 w-full border-transparent border-b-slate-400 text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 dark:rounded dark:border-b-slate-300"${y(
              'rows',
              n.rows,
            )}${y('cols', n.cols)}>${f(n.setting.val)}</textarea></div>`,
          );
        },
      ],
    ]),
  },
  props: {},
  data: () => ({
    dataReady: !1,
    authSettings: null,
    analyticsSettings: null,
    generalSettings: null,
    monitoringSettings: null,
    metaSettings: null,
    loading: !1,
    activeTab: 'Authentication',
    appGaEnabled: GA_ENABLED,
    tabs: [
      { name: 'Authentication', icon: 'fa-solid fa-circle-user' },
      { name: 'Analytics', icon: 'fa-solid fa-chart-simple' },
      { name: 'Monitoring', icon: 'fa-solid fa-shield-halved' },
      { name: 'App Meta', icon: 'fa-solid fa-server' },
    ],
  }),
  computed: {
    ...t({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    sentryEnabled() {
      const e = this.monitoringSettings.find(
        (e) => 'enableSentryMonitoring' == e.key,
      );
      return !(!e || !e.val || 1 != e.val);
    },
    zohoImgUrl() {
      return this.user && this.user.theme_dark ? k : U;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getAppSettings();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...a({ popToast: 'toast/popToast' }),
    track: s,
    async getAppSettings() {
      (this.dataReady = !1),
        await i
          .get('/api/app-settings')
          .then(({ data: e }) => {
            (this.authSettings = e.authSettings),
              (this.analyticsSettings = e.analyticsSettings),
              (this.generalSettings = e.generalSettings),
              (this.monitoringSettings = e.monitoringSettings),
              (this.metaSettings = e.metaSettings),
              (this.dataReady = !0);
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Getting App Settings',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          });
    },
    async updateSetting(e, t) {
      let a = null;
      t &&
        t.group &&
        'auth' == t.group &&
        (a = this.authSettings.map((e) => e.name).indexOf(t.name)),
        t &&
          t.group &&
          'analytics' == t.group &&
          (a = this.analyticsSettings.map((e) => e.name).indexOf(t.name)),
        t &&
          t.group &&
          'general' == t.group &&
          (a = this.generalSettings.map((e) => e.name).indexOf(t.name)),
        t &&
          t.group &&
          'monitoring' == t.group &&
          (a = this.monitoringSettings.map((e) => e.name).indexOf(t.name)),
        t &&
          t.group &&
          'app-meta' == t.group &&
          (a = this.metaSettings.map((e) => e.name).indexOf(t.name));
      const n = t;
      e != n.val &&
        ((t.val = e),
        await i
          .patch(`/api/app-settings/${t.id}`, t)
          .then(({ data: e }) => {
            -1 !== a &&
              (t &&
                t.group &&
                'auth' == t.group &&
                (this.authSettings[a] = e.data),
              t &&
                t.group &&
                'analytics' == t.group &&
                (this.analyticsSettings[a] = e.data),
              t &&
                t.group &&
                'general' == t.group &&
                (this.generalSettings[a] = e.data),
              t &&
                t.group &&
                'monitoring' == t.group &&
                (this.monitoringSettings[a] = e.data),
              t &&
                t.group &&
                'app-meta' == t.group &&
                (this.metaSettings[a] = e.data)),
              (this.loading = !1),
              this.popToast({
                message: 'App Setting Updated',
                timer: 5e3,
                icon: 'success',
              }),
              this.track(
                `App setting "${t.name}" was updated from "${n.val}" to "${t.val}"`,
                'app event',
                'app setting updated',
              );
          })
          .catch(({ response: e }) => {
            this.popToast({
              message: 'Error Updating Setting',
              timer: 5e3,
              icon: 'error',
            }),
              (this.loading = !1);
          }));
    },
    changeTab(e) {
      (this.activeTab = e), this.track(`clicked tab: ${e}`);
    },
    appSettingUpdateTriggered(e) {
      this.updateSetting(e.val, e.setting);
    },
    throwTestError() {
      throw (
        (this.popToast({
          message: 'Sentry Test Error Triggered',
          timer: 5e3,
          icon: 'success',
        }),
        new Error('Sentry Test Error'))
      );
    },
  },
};
const E = M.setup;
M.setup = (e, t) => {
  const a = r();
  return (
    (a.modules || (a.modules = new Set())).add(
      'resources/js/views/admin/AppSettings.vue',
    ),
    E ? E(e, t) : void 0
  );
};
const _ = n(M, [
  [
    'ssrRender',
    function (e, t, a, i, n, s, r, S) {
      const k = d('router-link'),
        U = d('ChevronRightIcon'),
        T = d('AppSettingToggle'),
        w = d('AppSettingTextInput'),
        R = d('AppButton'),
        A = d('AppSettingTextarea'),
        $ = g('tippy');
      t(
        `<div${m(
          l({ class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200' }, i),
        )}><nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb"><ol class="inline-flex list-none p-0"><li class="flex items-center">`,
      ),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              b(
                k,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: o(({ isActive: e }, t, a, i) => {
                    if (!t) return [p(' Admin ')];
                    t(' Admin ');
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li><li class="flex items-center">'),
        t(b(U, { class: 'ml-2 mr-2 mt-0 h-4 w-4' }, null, a)),
        t('</li><li class="flex items-center">'),
        e.authenticated && e.roles && (e.roles.admin || e.roles.superAdmin)
          ? t(
              b(
                k,
                {
                  to: { name: 'app-settings' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: o(({ isActive: e }, t, a, i) => {
                    if (!t)
                      return [
                        c(
                          'span',
                          {
                            class: [
                              e &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' App Settings ',
                          2,
                        ),
                      ];
                    t(
                      `<span class="${x([
                        e &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}"${i}> App Settings </span>`,
                    );
                  }),
                  _: 1,
                },
                a,
              ),
            )
          : t('\x3c!----\x3e'),
        t('</li></ol></nav>'),
        r.dataReady
          ? t('\x3c!----\x3e')
          : t(
              '<div><div class="text-gray-700 dark:text-gray-100"><div class="pt-10 pb-10 text-center"><span class="fa fa-circle-notch fa-spin fa-5x"></span></div></div></div>',
            ),
        r.dataReady
          ? (t(
              '<div><div class="border-b border-gray-200 dark:border-gray-700"><ul class="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">\x3c!--[--\x3e',
            ),
            h(r.tabs, (e, a) => {
              t(
                `<li class="mr-2 cursor-pointer"><span class="${x([
                  r.activeTab == e.name
                    ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                    : '',
                  'group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                ])}"><span class="${x([
                  e.icon,
                  'fa-fw fa-1x mr-3',
                ])}" style="${u({ 'margin-top': '2px' })}"></span> ${f(
                  e.name,
                )}</span></li>`,
              );
            }),
            t(
              '\x3c!--]--\x3e</ul></div><div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">',
            ),
            'Authentication' == r.activeTab
              ? (t(
                  '<div><h3 class="text-2xl font-semibold">Authentication Settings</h3><hr class="mt-3 w-10 pb-4"><div>\x3c!--[--\x3e',
                ),
                h(r.authSettings, (i) => {
                  t('<div class="mb-3"><div class="setting-group mb-3">'),
                    'enableFbLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-square-facebook fa-fw text-blue-600 dark:text-blue-600"></span> Facebook <a${m(
                            l(
                              {
                                href: 'https://developers.facebook.com/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableFbLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appFbId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appFbSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appFbRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appFbRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableTwitterLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-twitter fa-fw text-blue-300 dark:text-blue-300"></span> Twitter <a${m(
                            l(
                              {
                                href: 'https://apps.twitter.com/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableTwitterLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitterId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitterSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitterRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitterRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableGoogleLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-google fa-fw text-green-600 dark:text-green-500"></span> Google <a${m(
                            l(
                              {
                                href: 'https://console.developers.google.com/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableGoogleLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGoogleId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGoogleSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGoogleRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGoogleRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableInstagramLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-instagram fa-fw text-yellow-600 dark:text-yellow-400"></span> Instagram <a${m(
                            l(
                              {
                                href: 'https://instagram.com/developer/register/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableInstagramLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appInstagramId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appInstagramSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appInstagramRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appInstagramRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableGitHubLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-github fa-fw text-gray-100 dark:text-gray-100"></span> Github <a${m(
                            l(
                              {
                                href: 'https://github.com/settings/applications/new',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableGitHubLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitHubId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitHubSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitHubRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitHubRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableLinkedInLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-linkedin fa-fw text-blue-600 dark:text-blue-600"></span> LinkedIn <a${m(
                            l(
                              {
                                href: 'https://www.linkedin.com/developers/apps/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableLinkedInLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appLinkedInId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appLinkedInSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appLinkedInRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appLinkedInRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableTwitchLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-twitch fa-fw text-blue-600 dark:text-blue-600"></span> Twitch <a${m(
                            l(
                              {
                                href: 'https://dev.twitch.tv/docs/authentication/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableTwitchLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitchId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitchSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitchRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTwitchRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableYouTubeLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-youtube fa-fw text-red-500 dark:text-red-500"></span> YouTube <a${m(
                            l(
                              {
                                href: 'https://developers.google.com/youtube/v3/getting-started',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableYouTubeLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appYouTubeId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appYouTubeSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appYouTubeRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appYouTubeRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableAppleLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-apple fa-fw text-white-500 dark:text-white-500"></span> Apple <a${m(
                            l(
                              {
                                href: 'https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableAppleLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleTeamId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleKeyId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleKeyId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: e.appApplePrivateKey,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAppleRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableMicrosoftLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-microsoft fa-fw text-blue-300 dark:text-blue-300"></span> Microsoft <a${m(
                            l(
                              {
                                href: '',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableMicrosoftLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMicrosoftId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMicrosoftSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMicrosoftRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMicrosoftRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableTikTokLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-tiktok fa-fw text-pink-500 dark:text-pink-500"></span> TikTok <a${m(
                            l(
                              {
                                href: 'https://developers.tiktok.com/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableTikTokLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTikTokId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTikTokSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTikTokRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appTikTokRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableZoHoLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fas fa-z fa-fw text-yellow-400 dark:text-yellow-300"></span><img id="zoho"${y(
                            'src',
                            S.zohoImgUrl,
                          )} alt="Zoho" class="" style="${u({
                            width: '100%',
                            'max-width': '60px',
                            margin: '-10px 0 0 5px',
                            display: 'inline-block',
                          })}"><span class="sr-only"> ZoHo </span><a${m(
                            l(
                              {
                                href: 'https://api-console.zoho.com/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableZoHoLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appZoHoId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appZoHoSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appZoHoRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appZoHoRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableStackExchangeLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-stack-exchange fa-fw text-blue-400 dark:text-blue-400"></span> Stack Exchange <a${m(
                            l(
                              {
                                href: 'https://stackapps.com/apps/oauth/register/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableStackExchangeLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeKey' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeSite' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appStackExchangeRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableGitLabLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-square-gitlab fa-fw text-orange-400 dark:text-orange-400"></span> GitLab <a${m(
                            l(
                              {
                                href: 'https://gitlab.com/oauth/applications',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableGitLabLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitLabId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitLabSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitLabRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGitLabRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableRedditLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-square-reddit fa-fw text-orange-700 dark:text-orange-600"></span> Reddit <a${m(
                            l(
                              {
                                href: 'https://www.reddit.com/prefs/apps',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableRedditLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditResponseType' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditState' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appRedditRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableSnapchatLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-square-snapchat fa-fw text-yellow-400 dark:text-yellow-400"></span> Snapchat <a${m(
                            l(
                              {
                                href: 'https://devportal.snap.com/manage/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableSnapchatLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appSnapchatId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appSnapchatSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appSnapchatRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appSnapchatRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableMeetupLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-meetup fa-fw text-red-400 dark:text-red-400"></span> Meetup <a${m(
                            l(
                              {
                                href: 'https://www.meetup.com/api/oauth/list/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableMeetupLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMeetupId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMeetupSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMeetupRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appMeetupRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div><div class="setting-group mb-3">'),
                    'enableAtlassianLogin' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-atlassian fa-fw text-blue-800 dark:text-blue-800"></span> Atlassian <a${m(
                            l(
                              {
                                href: 'https://developer.atlassian.com/console/myapps/',
                                target: '_blank',
                                class:
                                  'text-blue-300 duration-300 ease-in-out hover:text-blue-400',
                              },
                              v(e, $, 'Get Credentials'),
                            ),
                          )}><span class="fa-solid fa-circle-info fa-fw fa-sm"></span></a></h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableAtlassianLogin' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAtlassianId' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAtlassianSecret' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAtlassianRedirect' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appAtlassianRedirect' == i.key
                      ? t(
                          '<div class="ml-8 mr-5 mt-4 mb-5 border border-b-slate-300"></div>',
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div>');
                }),
                t('\x3c!--]--\x3e</div></div>'))
              : t('\x3c!----\x3e'),
            'Analytics' == r.activeTab
              ? (t(
                  '<div><h3 class="text-2xl font-semibold">Analytics Settings</h3><hr class="mt-3 w-10 pb-4">\x3c!--[--\x3e',
                ),
                h(r.analyticsSettings, (e) => {
                  t('<div class="mb-3"><div class="setting-group mb-3">'),
                    'enableGoogleAnalytics' == e.key
                      ? t(
                          '<div><h4 class="w-100 mb-3 text-xl font-semibold"><span class="fa-brands fa-google fa-fw text-green-500 dark:text-green-500"></span> Google Analytics </h4></div>',
                        )
                      : t('\x3c!----\x3e'),
                    'enableGoogleAnalytics' == e.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: e,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'appGoogleAnalyticsKey' == e.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: e,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div>');
                }),
                t('\x3c!--]--\x3e</div>'))
              : t('\x3c!----\x3e'),
            'General' == r.activeTab
              ? t(
                  '<div><h3 class="text-2xl font-semibold">General Settings</h3><hr class="mt-3 w-10 pb-4"></div>',
                )
              : t('\x3c!----\x3e'),
            'Monitoring' == r.activeTab
              ? (t(
                  '<div><h3 class="text-2xl font-semibold">Monitoring Settings</h3><hr class="mt-3 w-10 pb-4">\x3c!--[--\x3e',
                ),
                h(r.monitoringSettings, (i) => {
                  t('<div class="mb-3"><div class="setting-group mb-3">'),
                    'enableSentryMonitoring' == i.key
                      ? t(
                          `<div><h4 class="w-100 mb-3 text-xl font-semibold"><svg class="css-1mxa28m e10nushx4 float-left mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 66" width="28" height="28" style="${u(
                            { 'margin-top': '-1px' },
                          )}"><path d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z" transform="translate(11, 11)"${y(
                            'fill',
                            e.user.theme_dark ? '#ffffff' : '#362d59',
                          )}></path></svg> Sentry.io Monitoring </h4></div>`,
                        )
                      : t('\x3c!----\x3e'),
                    'enableSentryMonitoring' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'enableSentryMonitoringFeedbakForm' == i.key
                      ? t(
                          b(
                            T,
                            {
                              class: 'ml-8 mr-5 mb-3',
                              setting: i,
                              loading: r.loading,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'sentryIoDSN' == i.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: i,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'sentryIoDSN' == i.key && S.sentryEnabled
                      ? t(
                          b(
                            R,
                            {
                              secondary: '',
                              text: 'Throw Test Error',
                              class: 'ml-8 mr-5 mb-3 mt-4',
                              onClick: S.throwTestError,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div>');
                }),
                t('\x3c!--]--\x3e</div>'))
              : t('\x3c!----\x3e'),
            'App Meta' == r.activeTab
              ? (t(
                  '<div><h3 class="text-2xl font-semibold">App Meta Settings</h3><hr class="mt-3 w-10 pb-4">\x3c!--[--\x3e',
                ),
                h(r.metaSettings, (e) => {
                  t('<div class="mb-3"><div class="setting-group mb-3">'),
                    'appName' == e.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: e,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'author' == e.key
                      ? t(
                          b(
                            w,
                            {
                              class: 'ml-8 mr-5',
                              setting: e,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    'description' == e.key
                      ? t(
                          b(
                            A,
                            {
                              class: 'ml-8 mr-5',
                              setting: e,
                              loading: r.loading,
                              disabled: !r.dataReady,
                              onUpdateSetting: S.appSettingUpdateTriggered,
                            },
                            null,
                            a,
                          ),
                        )
                      : t('\x3c!----\x3e'),
                    t('</div></div>');
                }),
                t('\x3c!--]--\x3e</div>'))
              : t('\x3c!----\x3e'),
            t('</div></div>'))
          : t('\x3c!----\x3e'),
        t('</div>');
    },
  ],
]);
export { _ as default };
