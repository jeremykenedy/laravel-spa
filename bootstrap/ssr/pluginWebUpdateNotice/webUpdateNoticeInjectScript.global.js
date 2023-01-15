'use strict';
(() => {
  const b = 'pluginWebUpdateNotice',
    p = 'web_version_by_plugin';
  const m = 'plugin_web_update_notice',
    _ = 'plugin-web-update-notice-anchor',
    E = 'plugin-web-update-notice-refresh-btn',
    w = 'plugin-web-update-notice-dismiss-btn',
    N = 'web_update_check_dismiss_version_';
  const L = {
      zh_CN: {
        title: '\u53D1\u73B0\u65B0\u7248\u672C',
        description:
          '\u7F51\u9875\u66F4\u65B0\u5566\uFF01\u8BF7\u5237\u65B0\u9875\u9762\u540E\u4F7F\u7528\u3002',
        buttonText: '\u5237\u65B0',
        dismissButtonText: '\u5FFD\u7565',
      },
      zh_TW: {
        title: '\u767C\u73FE\u65B0\u7248\u672C',
        description:
          '\u7DB2\u9801\u66F4\u65B0\u5566\uFF01\u8ACB\u5237\u65B0\u9801\u9762\u5F8C\u4F7F\u7528\u3002',
        buttonText: '\u5237\u65B0',
        dismissButtonText: '\u5FFD\u7565',
      },
      en_US: {
        title: 'Discover new version',
        description: 'A new version is available! Please refresh the page.',
        buttonText: 'Refresh',
        dismissButtonText: 'Dismiss',
      },
    },
    l = L;
  let T = !1,
    f = '',
    s = '';
  function C(i, t) {
    let n = !1;
    return function (...a) {
      n ||
        ((n = !0),
        i.apply(this, a),
        setTimeout(() => {
          n = !1;
        }, t));
    };
  }
  function v(i) {
    let {
        injectFileBase: t = '',
        checkInterval: n,
        hiddenDefaultNotification: a,
      } = i,
      o = () => {
        window
          .fetch(`${t}${b}/${p}.json?t=${performance.now()}`)
          .then((e) => {
            if (!e.ok) throw new Error(`Failed to fetch ${p}.json`);
            return e.json();
          })
          .then(({ version: e }) => {
            if (((f = e), window.pluginWebUpdateNotice_version !== e)) {
              document.body.dispatchEvent(
                new CustomEvent(m, { detail: i, bubbles: !0 }),
              );
              const c = localStorage.getItem(`${N}${e}`) === 'true';
              !T && !a && !c && x(i);
            }
          })
          .catch((e) => {
            console.error(
              '[pluginWebUpdateNotice] Failed to check system update',
              e,
            );
          });
      };
    o(), setInterval(o, n || 10 * 60 * 1e3);
    const r = C(o, 5e3);
    window.addEventListener('visibilitychange', () => {
      document.visibilityState === 'visible' && r();
    }),
      window.addEventListener('focus', () => {
        r();
      }),
      window.addEventListener(
        'error',
        (e) => {
          e?.target?.tagName === 'SCRIPT' && o();
        },
        !0,
      );
  }
  window.pluginWebUpdateNotice_ = {
    checkUpdate: v,
    setLocale: (i) => {
      (window.pluginWebUpdateNotice_.locale = i), (s = i);
    },
  };
  function O() {
    document.querySelector(`.${E}`)?.addEventListener('click', () => {
      window.location.reload();
    }),
      document.querySelector(`.${w}`)?.addEventListener('click', () => {
        try {
          (T = !1),
            document.querySelector(`.${_} .plugin-web-update-notice`)?.remove(),
            localStorage.setItem(`${N}${f}`, 'true');
        } catch (n) {
          console.error(n);
        }
      });
  }
  function d(i, t, n) {
    return n[i]?.[t] ?? l[i]?.[t] ?? l.zh_CN[t];
  }
  function x(i) {
    try {
      T = !0;
      let {
          notificationProps: t,
          customNotificationHTML: n,
          hiddenDismissButton: a,
          locale: o = 'zh_CN',
          localeData: r,
        } = i,
        e = Object.assign({}, l, r);
      s || ((s = o), (window.pluginWebUpdateNotice_.locale = o));
      let c = document.createElement('div'),
        u = '';
      if (n) u = n;
      else {
        const S = t?.title ?? d(s, 'title', e),
          I = t?.description ?? d(s, 'description', e),
          g = t?.buttonText ?? d(s, 'buttonText', e),
          h = t?.dismissButtonText ?? d(s, 'dismissButtonText', e),
          A = a
            ? ''
            : `<a class="plugin-web-update-notice-btn plugin-web-update-notice-dismiss-btn">${h}</a>`;
        c.classList.add('plugin-web-update-notice'),
          (u = `
    <div class="plugin-web-update-notice-content" data-cy="notification-content">
      <div class="plugin-web-update-notice-content-title">
        ${S}
      </div>
      <div class="plugin-web-update-notice-content-desc">
        ${I}
      </div>
      <div class="plugin-web-update-notice-tools">
        ${A}
        <a class="plugin-web-update-notice-btn plugin-web-update-notice-refresh-btn">
          ${g}
        </a>
      </div>
    </div>`);
      }
      (c.innerHTML = u), document.querySelector(`.${_}`).appendChild(c), O();
    } catch (t) {
      console.error('[pluginWebUpdateNotice] Failed to show notification', t);
    }
  }
})();
//# sourceMappingURL=webUpdateNoticeInjectScript.global.js.map
window.pluginWebUpdateNotice_.checkUpdate({
  logVersion: true,
  logHash: true,
  checkInterval: 30000,
  notificationProps: {
    title: 'system update',
    description: 'System update, please refresh the page',
    buttonText: 'refresh',
  },
});
