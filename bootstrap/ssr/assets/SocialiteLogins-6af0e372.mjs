import {
  resolveDirective as a,
  mergeProps as o,
  useSSRContext as t,
} from 'vue';
import i from 'axios';
import 'vue-axios';
import { mapGetters as e, mapActions as n } from 'vuex';
import { t as s, _ as r } from '../app2.mjs';
import {
  ssrRenderAttrs as c,
  ssrGetDirectiveProps as d,
} from 'vue/server-renderer';
const p = {
  name: 'SocialiteLogins',
  components: {},
  props: {},
  setup: () => ({}),
  data: () => ({
    loading: !1,
    window: {},
    authWindowTitle: 'Authentication Login',
  }),
  computed: {
    ...e({ logins: 'auth/logins', token: 'auth/token' }),
    socialLoginsEnabled() {
      return !!Object.values(this.logins).find((a) => '1' == a);
    },
  },
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('message', this.onMessage, !1);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage);
  },
  updated() {},
  methods: {
    ...n({
      popToast: 'toast/popToast',
      fetchOauthUrl: 'auth/fetchOauthUrl',
      saveToken: 'auth/saveToken',
      getUser: 'auth/getUser',
      getUserByToken: 'auth/getUserByToken',
    }),
    track: s,
    async socialiteLogin(a) {
      this.track(`Social Login Provider Clicked: ${a}`), (this.loading = !0);
      try {
        await i.get('/sanctum/csrf-cookie').then((a) => {});
        const o = await this.fetchOauthUrl({ provider: a }).then(
          (a) => ((this.loading = !1), a),
        );
        this.window = this.openWindow(o, this.authWindowTitle);
      } catch (o) {
        this.track(
          `Social Login Provider Failed to Login: ${a}`,
          'error',
          'auth-error',
        ),
          this.popToast({
            message: 'Failed to log in.',
            timer: 1e4,
            icon: 'error',
          }),
          this.window.close(),
          (this.loading = !1);
      }
    },
    async onMessage(a) {
      const o = this;
      a.origin === window.origin &&
        a.data.token &&
        (o.popToast({
          message: 'Successfully logged in',
          timer: 2500,
          icon: 'success',
        }),
        o.track(
          'Social Login Provider Logged in Successfully',
          'login',
          'social login success',
        ),
        await i.get('/sanctum/csrf-cookie').then((a) => {}),
        await o.saveToken({ token: a.data.token }).then((t) => {
          o.getUserByToken({ token: a.data.token }).then(() => {
            setTimeout(() => {
              o.$router.push({ name: 'dashboard' });
            }, 1);
          });
        }));
    },
    openWindow(a, o, t = {}) {
      'object' == typeof a && ((t = a), (a = '')),
        (t = { url: a, title: o, width: 600, height: 720, ...t });
      const i =
          void 0 !== window.screenLeft ? window.screenLeft : window.screen.left,
        e = void 0 !== window.screenTop ? window.screenTop : window.screen.top,
        n = window.innerWidth || document.documentElement.clientWidth,
        s = window.innerHeight || document.documentElement.clientHeight;
      (t.left = n / 2 - t.width / 2 + i), (t.top = s / 2 - t.height / 2 + e);
      const r = Object.keys(t)
          .reduce((a, o) => (a.push(`${o}=${t[o]}`), a), [])
          .join(','),
        c = window.open(a, o, r);
      return window.focus && c.focus(), c;
    },
  },
};
const l = p.setup;
p.setup = (a, o) => {
  const i = t();
  return (
    (i.modules || (i.modules = new Set())).add(
      'resources/js/components/auth/SocialiteLogins.vue',
    ),
    l ? l(a, o) : void 0
  );
};
const u = r(p, [
  [
    'ssrRender',
    function (t, i, e, n, s, r, p, l) {
      const u = a('tippy');
      i(`<div${c(o({ class: 'flex flex-wrap justify-around' }, n))}>`),
        1 == t.logins.facebook
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-square-facebook fa-3x mr-3 mb-2 cursor-pointer text-blue-500 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Facebook'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.twitter
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-twitter fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Twitter'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.instagram
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-instagram fa-3x mr-3 mb-2 cursor-pointer text-gray-700 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Instagram'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.github
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-github fa-3x mr-3 mb-2 cursor-pointer text-gray-800 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'GitHub'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.youtube
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-youtube fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'YouTube'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.google
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-google fa-3x mr-3 mb-2 cursor-pointer text-red-500 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Google'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.linkedin
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-linkedin fa-3x mr-3 mb-2 cursor-pointer text-blue-700 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'LinkedIn'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.twitch
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-twitch fa-3x mr-3 mb-2 cursor-pointer text-blue-600 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Twitch'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.apple
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-apple fa-3x mr-3 mb-2 cursor-pointer text-gray-800 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Apple'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.microsoft
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-microsoft fa-3x mr-3 mb-2 cursor-pointer text-blue-300 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Microsoft'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.tiktok
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-tiktok fa-3x mr-3 mb-2 cursor-pointer text-pink-600 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'TikTok'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.zoho
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fas fa-z fa-3x mr-3 mb-2 cursor-pointer text-yellow-500 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Zoho'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.stackexchange
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-stack-exchange fa-3x mr-3 mb-2 cursor-pointer text-blue-400 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'StackExchange'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.gitlab
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-square-gitlab fa-3x mr-3 mb-2 cursor-pointer text-orange-400 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'GitLab'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.reddit
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-square-reddit fa-3x mr-3 mb-2 cursor-pointer text-orange-700 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'GitLab'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.snapchat
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-square-snapchat fa-3x mr-3 mb-2 cursor-pointer text-yellow-400 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Snapchat'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.meetup
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-meetup fa-3x mr-3 mb-2 cursor-pointer text-red-400 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Meetup'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        1 == t.logins.atlassian
          ? i(
              `<span${c(
                o(
                  {
                    class: [
                      'fa-brands fa-atlassian fa-3x mr-3 mb-2 cursor-pointer text-blue-800 opacity-80 transition duration-300 hover:opacity-100',
                      p.loading ? 'disabled opacity-40' : '',
                    ],
                  },
                  d(t, u, 'Atlassian'),
                ),
              )}></span>`,
            )
          : i('\x3c!----\x3e'),
        i('</div>');
    },
  ],
]);
export { u as S };
