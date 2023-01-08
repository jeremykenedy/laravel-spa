import { mapGetters as a, mapActions as e } from 'vuex';
import t from 'axios';
import { ChevronRightIcon as s } from '@heroicons/vue/24/outline';
import { R as r } from './RolesBadges-5ee6b7bc.mjs';
import { z as l, a as n } from './zoho-monocrome-black-b48ed5c0.mjs';
import {
  resolveComponent as d,
  mergeProps as i,
  withCtx as g,
  createVNode as o,
  openBlock as f,
  createBlock as x,
  createCommentVNode as b,
  toDisplayString as c,
  createTextVNode as y,
  useSSRContext as p,
} from 'vue';
import {
  ssrRenderAttrs as k,
  ssrRenderComponent as v,
  ssrRenderClass as u,
  ssrInterpolate as h,
  ssrRenderStyle as m,
  ssrRenderAttr as w,
} from 'vue/server-renderer';
import { _ as $ } from '../app2.mjs';
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
const E = {
  name: 'Admin',
  components: { ChevronRightIcon: s, RolesBadges: r },
  props: {},
  setup: () => ({}),
  data: () => ({
    dataReady: !1,
    loading: !1,
    users: [],
    rolesData: [],
    permissionsData: [],
    authSettings: [],
    analyticsData: [],
    monitoringData: [],
    GA_TAG: GA_TAG,
    GA_ENABLED: GA_ENABLED,
    APP_URL: APP_URL,
    SENTRY_DSN: SENTRY_DSN,
    SENTRY_ENABLED: SENTRY_ENABLED,
    SENTRY_FEEDBACK_ENABLED: SENTRY_FEEDBACK_ENABLED,
  }),
  computed: {
    ...a({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    greeting() {
      const a = new Date().getHours();
      let e;
      return (
        (e =
          a >= 0 && a <= 12
            ? 'Good Morning'
            : a > 12 && a <= 18
            ? 'Good Afternoon'
            : 'Good Evening'),
        e
      );
    },
    analyticsEnabled() {
      const a = this.analyticsData.find(
        (a) => 'enableGoogleAnalytics' == a.key,
      );
      return !(!a || !a.val || 1 != a.val);
    },
    analyticsTag() {
      const a = this.analyticsData.find(
        (a) => 'appGoogleAnalyticsKey' == a.key,
      );
      return a && a.val && '' != a.val ? null : 'MISSING TAG ID';
    },
    sentryEnabled() {
      const a = this.monitoringData.find(
        (a) => 'enableSentryMonitoring' == a.key,
      );
      return !(!a || !a.val || 1 != a.val);
    },
    sentryFormEnabled() {
      const a = this.monitoringData.find(
        (a) => 'enableSentryMonitoringFeedbakForm' == a.key,
      );
      return !(!a || !a.val || 1 != a.val);
    },
    sentryDSN() {
      const a = this.monitoringData.find((a) => 'sentryIoDSN' == a.key);
      return a && a.val && '' != a.val ? null : 'MISSING DSN (URL)';
    },
    zohoImgUrl() {
      return this.user && this.user.theme_dark ? l : n;
    },
  },
  mounted() {
    this.getDashboardData();
  },
  methods: {
    ...e({ popToast: 'toast/popToast' }),
    async getDashboardData() {
      (this.loading = !0),
        await t
          .get('/api/dashboard/data')
          .then(({ data: a }) => {
            (this.users = a.users),
              (this.rolesData = a.roles),
              (this.authSettings = a.authSettings),
              (this.permissionsData = a.permissions),
              (this.analyticsData = a.analytics),
              (this.monitoringData = a.monitoring),
              (this.dataReady = !0),
              (this.loading = !1);
          })
          .catch(({ response: a }) => {
            this.popToast({
              message: 'Error Getting Users',
              timer: 5e3,
              icon: 'error',
            }),
              (this.dataReady = !0);
          }),
        (this.dataReady = !0);
    },
    checkSettingEnabled(a = null) {
      let e = !1,
        t = !1;
      return (
        a &&
          ((e = this.authSettings.find((e) => e.key == a)),
          e && 1 == e.val && (t = !0)),
        t
      );
    },
  },
};
const S = E.setup;
E.setup = (a, e) => {
  const t = p();
  return (
    (t.modules || (t.modules = new Set())).add(
      'resources/js/views/admin/Admin.vue',
    ),
    S ? S(a, e) : void 0
  );
};
const L = $(E, [
  [
    'ssrRender',
    function (a, e, t, s, r, l, n, p) {
      const $ = d('RolesBadges'),
        E = d('router-link');
      e(
        `<div${k(
          i(
            {
              id: 'admin',
              class: 'bg-white p-3 dark:bg-slate-800 dark:text-gray-200',
            },
            s,
          ),
        )} data-v-9692a6fb>`,
      ),
        a.roles
          ? (e('<div class="float-right mb-6 text-center" data-v-9692a6fb>'),
            e(v($, { roles: a.roles }, null, t)),
            e('</div>'))
          : e('\x3c!----\x3e'),
        e(
          '<nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb" data-v-9692a6fb><ol class="inline-flex list-none p-0" data-v-9692a6fb><li class="flex items-center" data-v-9692a6fb>',
        ),
        a.authenticated && a.roles && (a.roles.admin || a.roles.superAdmin)
          ? e(
              v(
                E,
                {
                  to: { name: 'admin' },
                  class:
                    'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400',
                },
                {
                  default: g(({ isActive: a }, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'span',
                          {
                            class: [
                              a &&
                                'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                            ],
                          },
                          ' Admin ',
                          2,
                        ),
                      ];
                    e(
                      `<span class="${u([
                        a &&
                          'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
                      ])}" data-v-9692a6fb${s}> Admin </span>`,
                    );
                  }),
                  _: 1,
                },
                t,
              ),
            )
          : e('\x3c!----\x3e'),
        e(
          `</li></ol></nav><div class="mb-6 items-center justify-between lg:flex" data-v-9692a6fb><p class="mb-2 text-2xl font-semibold lg:mb-0" data-v-9692a6fb>${h(
            p.greeting,
          )}, ${h(
            a.user.name,
          )}! </p></div><div class="-mx-3 mb-20 flex flex-wrap" data-v-9692a6fb>`,
        ),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e('<div class="w-full px-3 md:w-2/3 xl:w-2/3" data-v-9692a6fb>'),
            e(
              v(
                E,
                { to: { name: 'app-settings' } },
                {
                  default: g((a, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            o('span', {
                              class:
                                'fas fa-lock fa-fw fa-3x text-gray-700 dark:text-gray-300',
                            }),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 1,
                                          class: [
                                            'fa-brands fa-square-facebook fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableFbLogin',
                                            )
                                              ? 'text-blue-600 dark:text-blue-600'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 2,
                                          class: [
                                            'fa-brands fa-twitter fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableTwitterLogin',
                                            )
                                              ? 'text-blue-300 dark:text-blue-300'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 3,
                                          class: [
                                            'fa-brands fa-instagram fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableInstagramLogin',
                                            )
                                              ? 'text-green-300 dark:text-yellow-300'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 4,
                                          class: [
                                            'fa-brands fa-github fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableGitHubLogin',
                                            )
                                              ? 'text-gray-300 dark:text-gray-300'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 5,
                                          class: [
                                            'fa-brands fa-youtube fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableYouTubeLogin',
                                            )
                                              ? 'text-red-500 dark:text-red-500'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 6,
                                          class: [
                                            'fa-brands fa-google fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableGoogleLogin',
                                            )
                                              ? 'text-green-300 dark:text-green-300'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 7,
                                          class: [
                                            'fa-brands fa-linkedin fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableLinkedInLogin',
                                            )
                                              ? 'text-blur-700 dark:text-blur-700'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 8,
                                          class: [
                                            'fa-brands fa-twitch fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableTwitchLogin',
                                            )
                                              ? 'text-blue-500 dark:text-blue-500'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 9,
                                          class: [
                                            'fa-brands fa-apple fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableAppleLogin',
                                            )
                                              ? 'text-gray-800 dark:text-gray-200'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 10,
                                          class: [
                                            'fa-brands fa-microsoft fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableMicrosoftLogin',
                                            )
                                              ? 'text-blue-300 dark:text-blue-300'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 11,
                                          class: [
                                            'fa fa-z fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableZoHoLogin',
                                            )
                                              ? 'text-yellow-600 dark:text-yellow-600'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 12,
                                          class: [
                                            'fa-brands fa-stack-exchange fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableStackExchangeLogin',
                                            )
                                              ? 'text-blue-400 dark:text-blue-400'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 13,
                                          class: [
                                            'fa-brands fa-square-gitlab fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableGitLabLogin',
                                            )
                                              ? 'text-orange-400 dark:text-orange-400'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 14,
                                          class: [
                                            'fa-brands fa-square-reddit fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableRedditLogin',
                                            )
                                              ? 'text-orange-700 dark:text-orange-700'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 15,
                                          class: [
                                            'fa-brands fa-square-snapchat fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableSnapchatLogin',
                                            )
                                              ? 'text-yellow-400 dark:text-yellow-400'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 16,
                                          class: [
                                            'fa-brands fa-meetup fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableMeetupLogin',
                                            )
                                              ? 'text-red-400 dark:text-red-400'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 17,
                                          class: [
                                            'fa-brands fa-atlassian fa-fw fa-xs',
                                            p.checkSettingEnabled(
                                              'enableAtlassianLogin',
                                            )
                                              ? 'text-blue-800 dark:text-blue-800'
                                              : 'text-gray-300 dark:text-gray-800',
                                          ],
                                        },
                                        null,
                                        2,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                'Logins Enabled',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    e(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${s}><span class="fas fa-lock fa-fw fa-3x text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}></span><div data-v-9692a6fb${s}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}>`,
                    ),
                      n.loading
                        ? e(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${s}></span>`,
                          )
                        : e('\x3c!----\x3e'),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableFbLogin')
                                ? 'text-blue-600 dark:text-blue-600'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-square-facebook fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableTwitterLogin')
                                ? 'text-blue-300 dark:text-blue-300'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-twitter fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableInstagramLogin')
                                ? 'text-green-300 dark:text-yellow-300'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-instagram fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableGitHubLogin')
                                ? 'text-gray-300 dark:text-gray-300'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-github fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableYouTubeLogin')
                                ? 'text-red-500 dark:text-red-500'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-youtube fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableGoogleLogin')
                                ? 'text-green-300 dark:text-green-300'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-google fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableLinkedInLogin')
                                ? 'text-blur-700 dark:text-blur-700'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-linkedin fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableTwitchLogin')
                                ? 'text-blue-500 dark:text-blue-500'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-twitch fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableAppleLogin')
                                ? 'text-gray-800 dark:text-gray-200'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-apple fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableMicrosoftLogin')
                                ? 'text-blue-300 dark:text-blue-300'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-microsoft fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableZoHoLogin')
                                ? 'text-yellow-600 dark:text-yellow-600'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa fa-z fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableStackExchangeLogin')
                                ? 'text-blue-400 dark:text-blue-400'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-stack-exchange fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableGitLabLogin')
                                ? 'text-orange-400 dark:text-orange-400'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-square-gitlab fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableRedditLogin')
                                ? 'text-orange-700 dark:text-orange-700'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-square-reddit fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableSnapchatLogin')
                                ? 'text-yellow-400 dark:text-yellow-400'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-square-snapchat fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableMeetupLogin')
                                ? 'text-red-400 dark:text-red-400'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-meetup fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u([
                              p.checkSettingEnabled('enableAtlassianLogin')
                                ? 'text-blue-800 dark:text-blue-800'
                                : 'text-gray-300 dark:text-gray-800',
                              'fa-brands fa-atlassian fa-fw fa-xs',
                            ])}" data-v-9692a6fb${s}></span>`,
                          ),
                      e(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${s}>Logins Enabled</p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e(
              '<div class="w-full px-3 sm:w-1/2 md:w-1/3 xl:w-1/3" data-v-9692a6fb>',
            ),
            e(
              v(
                E,
                { to: { name: 'users' } },
                {
                  default: g((a, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            o('span', {
                              class:
                                'fas fa-user fa-fw fa-3x text-gray-700 dark:text-gray-300',
                            }),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        { key: 1 },
                                        c(n.users.length),
                                        1,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                'Registered Users',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    e(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${s}><span class="fas fa-user fa-fw fa-3x text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}></span><div data-v-9692a6fb${s}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}>`,
                    ),
                      n.loading
                        ? e(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${s}></span>`,
                          )
                        : e('\x3c!----\x3e'),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span data-v-9692a6fb${s}>${h(
                              n.users.length,
                            )}</span>`,
                          ),
                      e(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${s}>Registered Users</p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e(
              '<div class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2" data-v-9692a6fb>',
            ),
            e(
              v(
                E,
                { to: { name: 'app-settings' } },
                {
                  default: g((a, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            o('span', {
                              class:
                                'fa-brands fa-google fa-fw fa-3x text-gray-700 dark:text-gray-300',
                            }),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 1,
                                          class: p.analyticsEnabled
                                            ? 'text-yellow-500'
                                            : '',
                                        },
                                        [
                                          y(
                                            c(
                                              p.analyticsEnabled
                                                ? 'Enabled'
                                                : 'Disabled',
                                            ) + ' ',
                                            1,
                                          ),
                                          o(
                                            'div',
                                            {
                                              style: {
                                                'font-size': '0.25em',
                                                'line-height': '1',
                                                'margin-left': '2px',
                                                'margin-top': '-4px',
                                                position: 'absolute',
                                              },
                                            },
                                            c(p.analyticsTag),
                                            1,
                                          ),
                                        ],
                                        2,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                'Google Analytics',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    e(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${s}><span class="fa-brands fa-google fa-fw fa-3x text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}></span><div data-v-9692a6fb${s}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}>`,
                    ),
                      n.loading
                        ? e(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${s}></span>`,
                          )
                        : e('\x3c!----\x3e'),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span class="${u(
                              p.analyticsEnabled ? 'text-yellow-500' : '',
                            )}" data-v-9692a6fb${s}>${h(
                              p.analyticsEnabled ? 'Enabled' : 'Disabled',
                            )} <div style="${m({
                              'font-size': '0.25em',
                              'line-height': '1',
                              'margin-left': '2px',
                              'margin-top': '-4px',
                              position: 'absolute',
                            })}" data-v-9692a6fb${s}>${h(
                              p.analyticsTag,
                            )}</div></span>`,
                          ),
                      e(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${s}>Google Analytics</p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e(
              '<div class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2" data-v-9692a6fb>',
            ),
            e(
              v(
                E,
                { to: { name: 'app-settings' } },
                {
                  default: g((e, t, s, r) => {
                    if (!t)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            (f(),
                            x(
                              'svg',
                              {
                                class: 'css-1mxa28m e10nushx4 float-left mr-1',
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 65 65',
                                width: '60',
                                height: '65',
                                style: {
                                  'margin-top': '-1px',
                                  'margin-right': '5px',
                                },
                              },
                              [
                                o(
                                  'path',
                                  {
                                    d: 'M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z',
                                    transform: 'translate(11, 11)',
                                    fill: a.user.theme_dark
                                      ? '#ffffff'
                                      : '#362d59',
                                  },
                                  null,
                                  8,
                                  ['fill'],
                                ),
                              ],
                            )),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        {
                                          key: 1,
                                          class: p.sentryEnabled
                                            ? 'text-red-500'
                                            : '',
                                        },
                                        [
                                          y(
                                            c(
                                              p.sentryEnabled
                                                ? 'Enabled'
                                                : 'Disabled',
                                            ) + ' ',
                                            1,
                                          ),
                                          o(
                                            'div',
                                            {
                                              style: {
                                                'font-size': '0.25em',
                                                'line-height': '1',
                                                'margin-left': '1px',
                                                'margin-top': '-4px',
                                                position: 'absolute',
                                              },
                                            },
                                            c(p.sentryDSN) +
                                              ' ' +
                                              c(
                                                p.sentryDSN &&
                                                  p.sentryFormEnabled
                                                  ? ' / '
                                                  : '',
                                              ) +
                                              ' ' +
                                              c(
                                                p.sentryFormEnabled
                                                  ? 'Feedback Enabled'
                                                  : '',
                                              ),
                                            1,
                                          ),
                                        ],
                                        2,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                ' Setry.io Monitoring ',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    t(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${r}><svg class="css-1mxa28m e10nushx4 float-left mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" width="60" height="65" style="${m(
                        { 'margin-top': '-1px', 'margin-right': '5px' },
                      )}" data-v-9692a6fb${r}><path d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z" transform="translate(11, 11)"${w(
                        'fill',
                        a.user.theme_dark ? '#ffffff' : '#362d59',
                      )} data-v-9692a6fb${r}></path></svg><div data-v-9692a6fb${r}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${r}>`,
                    ),
                      n.loading
                        ? t(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${r}></span>`,
                          )
                        : t('\x3c!----\x3e'),
                      n.loading
                        ? t('\x3c!----\x3e')
                        : t(
                            `<span class="${u(
                              p.sentryEnabled ? 'text-red-500' : '',
                            )}" data-v-9692a6fb${r}>${h(
                              p.sentryEnabled ? 'Enabled' : 'Disabled',
                            )} <div style="${m({
                              'font-size': '0.25em',
                              'line-height': '1',
                              'margin-left': '1px',
                              'margin-top': '-4px',
                              position: 'absolute',
                            })}" data-v-9692a6fb${r}>${h(p.sentryDSN)} ${h(
                              p.sentryDSN && p.sentryFormEnabled ? ' / ' : '',
                            )} ${h(
                              p.sentryFormEnabled ? 'Feedback Enabled' : '',
                            )}</div></span>`,
                          ),
                      t(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${r}> Setry.io Monitoring </p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e(
              '<div class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2" data-v-9692a6fb>',
            ),
            e(
              v(
                E,
                { to: { name: 'roles' } },
                {
                  default: g((a, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            o('span', {
                              class:
                                'fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300',
                            }),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        { key: 1 },
                                        c(n.rolesData.length),
                                        1,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                'Roles',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    e(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${s}><span class="fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}></span><div data-v-9692a6fb${s}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}>`,
                    ),
                      n.loading
                        ? e(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${s}></span>`,
                          )
                        : e('\x3c!----\x3e'),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span data-v-9692a6fb${s}>${h(
                              n.rolesData.length,
                            )}</span>`,
                          ),
                      e(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${s}>Roles</p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        a.authenticated && a.roles && a.roles.superAdmin
          ? (e(
              '<div class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2" data-v-9692a6fb>',
            ),
            e(
              v(
                E,
                { to: { name: 'permissions' } },
                {
                  default: g((a, e, t, s) => {
                    if (!e)
                      return [
                        o(
                          'div',
                          {
                            class:
                              'mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700',
                          },
                          [
                            o('span', {
                              class:
                                'fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300',
                            }),
                            o('div', null, [
                              o(
                                'p',
                                {
                                  class:
                                    'text-3xl font-semibold text-gray-700 dark:text-gray-300',
                                },
                                [
                                  n.loading
                                    ? (f(),
                                      x('span', {
                                        key: 0,
                                        class:
                                          'fas fa-circle-notch fa-spin fa-xs',
                                      }))
                                    : b('', !0),
                                  n.loading
                                    ? b('', !0)
                                    : (f(),
                                      x(
                                        'span',
                                        { key: 1 },
                                        c(n.permissionsData.length),
                                        1,
                                      )),
                                ],
                              ),
                              o(
                                'p',
                                { class: 'text-gray-600 dark:text-gray-400' },
                                'Permissions',
                              ),
                            ]),
                          ],
                        ),
                      ];
                    e(
                      `<div class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700" data-v-9692a6fb${s}><span class="fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}></span><div data-v-9692a6fb${s}><p class="text-3xl font-semibold text-gray-700 dark:text-gray-300" data-v-9692a6fb${s}>`,
                    ),
                      n.loading
                        ? e(
                            `<span class="fas fa-circle-notch fa-spin fa-xs" data-v-9692a6fb${s}></span>`,
                          )
                        : e('\x3c!----\x3e'),
                      n.loading
                        ? e('\x3c!----\x3e')
                        : e(
                            `<span data-v-9692a6fb${s}>${h(
                              n.permissionsData.length,
                            )}</span>`,
                          ),
                      e(
                        `</p><p class="text-gray-600 dark:text-gray-400" data-v-9692a6fb${s}>Permissions</p></div></div>`,
                      );
                  }),
                  _: 1,
                },
                t,
              ),
            ),
            e('</div>'))
          : e('\x3c!----\x3e'),
        e('</div></div>');
    },
  ],
  ['__scopeId', 'data-v-9692a6fb'],
]);
export { L as default };
