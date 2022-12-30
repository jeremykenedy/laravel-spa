import { createApp } from 'vue';
import App from '@views/App.vue';
import router from '@router';
import store from '@store';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import { plugin as VueTippy } from 'vue-tippy';
import AppButton from '@components/common/AppButton.vue';
import AppToast from '@components/common/AppToast.vue';
import AppSwitch from '@components/common/AppSwitch.vue';
// import AppTable from '@components/common/AppTable.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ServerTable, ClientTable, EventBus } from 'v-tables-3';
import VueGtag from 'vue-gtag-next';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { registerSW } from 'virtual:pwa-register';

axios.defaults.withCredentials = true;

const app = createApp(App);
const APP_GA_TAG = GA_TAG; // eslint-disable-line
const APP_GA_ENABLED = GA_ENABLED; // eslint-disable-line
const VUE_APP_URL = APP_URL; // eslint-disable-line
const VUE_SENTRY_DSN = SENTRY_DSN; // eslint-disable-line
const VUE_SENTRY_ENABLED = SENTRY_ENABLED; // eslint-disable-line
const VUE_SENTRY_FEEDBACK_ENABLED = SENTRY_FEEDBACK_ENABLED; // eslint-disable-line
const VUE_ENVIRONMENT = ENVIRONMENT; // eslint-disable-line

const updateSW = registerSW({
  onOfflineReady() {},
});

if (VUE_SENTRY_ENABLED) {
  Sentry.init({
    app,
    dsn: VUE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ['localhost', VUE_APP_URL, /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    trackComponents: true,
    hooks: ['activate', 'create', 'destroy', 'mount', 'update'],
    environment: VUE_ENVIRONMENT,
    beforeBreadcrumb(breadcrumb, hint) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    },
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        if (VUE_SENTRY_FEEDBACK_ENABLED) {
          // Sentry.showReportDialog({ eventId: event.event_id });
        }
      }
      return event;
    },
  });
}
store.dispatch('auth/getLogins').then(() => {});
store.dispatch('auth/getUser').then(() => {
  if (VUE_SENTRY_ENABLED) {
    if (
      store &&
      store.state &&
      store.state.auth &&
      store.state.auth.user &&
      store.state.auth.user.id &&
      store.state.auth.user.name &&
      store.state.auth.user.email &&
      store.state.auth.authenticated
    ) {
      Sentry.setUser({
        id: store.state.auth.user.id,
        username: store.state.auth.user.name,
        email: store.state.auth.user.email,
      });
    } else {
      Sentry.setUser(null);
    }
  }
  app
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(ClientTable, {}, 'tailwind')
    .use(VueTippy, {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        arrow: true,
        theme: 'material',
        animation: 'perspective',
        placement: 'auto-end',
        allowHTML: true,
      },
    })
    .component('AppButton', AppButton)
    .component('AppToast', AppToast)
    .component('AppSwitch', AppSwitch);
  // .component('AppTable', AppTable)

  if (APP_GA_ENABLED) {
    app.use(VueGtag, {
      property: {
        id: APP_GA_TAG,
        // params: {
        //   user_id: "12345",
        //   send_page_view: true,
        //   linker: {
        //     domain: ['example.com']
        //   }
        // }
      },
    });
  }

  app.mount('#app');
});
