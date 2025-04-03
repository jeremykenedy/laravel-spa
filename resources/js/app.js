import './bootstrap';

import { createApp, ref, watchEffect } from 'vue';
import { createPinia, storeToRefs } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import router from '@routes';
import { useAuthStore } from '@store/auth';
import VueSweetalert2 from 'vue-sweetalert2';
import { plugin as VueTippy } from 'vue-tippy';
import AppButton from '@components/common/AppButton.vue';
import AppSwitch from '@components/common/AppSwitch.vue';
import AdminBreadcrumbContainer from '@components/includes/AdminBreadcrumbContainer.vue';
import AdminBreadcrumb from '@components/includes/AdminBreadcrumb.vue';
import AdminBreadcrumbSep from '@components/includes/AdminBreadcrumbSep.vue';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';
import vSelect from 'vue-select';
import useAuth from './composables/auth';
import i18n from './plugins/i18n';
import VueAwesomePaginate from 'vue-awesome-paginate';
import VueSecureHTML from 'vue-html-secure';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import VueGtag from 'vue-gtag-next';
import KonamiCode from 'vue3-konami-code';
import toasty from 'toasty';
import { asteroidsjs } from '@services/asteroids';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import swal from 'sweetalert2';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';
import 'vue-awesome-paginate/dist/style.css';
import 'vue3-easy-data-table/dist/style.css';

window.Swal = swal;

const APP_GA_TAG = GA_TAG;
const APP_GA_ENABLED = GA_ENABLED;
const VUE_APP_URL = APP_URL;
const VUE_SENTRY_DSN = SENTRY_DSN;
const VUE_SENTRY_ENABLED = SENTRY_ENABLED;
const VUE_SENTRY_RATE = SENTRY_RATE; // eslint-disable-line
const VUE_SENTRY_FEEDBACK_ENABLED = SENTRY_FEEDBACK_ENABLED;
const VUE_ENVIRONMENT = ENVIRONMENT;
const VUE_TOASTY_ENABLED = KONAMI_TOASTY_ENABLED;
const VUE_ASTEROIDS_ENABLED = KONAMI_ASTEROIDS_ENABLED;
const VUE_TINY_MCE_KEY = TINY_MCE_KEY; // eslint-disable-line
const VUE_CK_EDITOR_KEY = CK_EDITOR_KEY; // eslint-disable-line
const VUE_OPEN_AI_KEY = OPEN_AI_KEY; // eslint-disable-line

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp({
  setup() {
    if (localStorage.getItem('data-theme') == 'dark') {
      document.documentElement.className = 'dark';
    } else {
      localStorage.setItem('data-theme', 'light');
    }
  },
  created() {
    useAuthStore().getLogins();
    useAuth().getUser();
  },
});
app.use(pinia);

const store = useAuthStore();
const { user, authenticated } = storeToRefs(store);

app.use(router);
app.use(VueSweetalert2);
app.use(VueTippy, {
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
});
app.use(VueSecureHTML);
app.use(VueAwesomePaginate);
app.use(i18n);
app.use(abilitiesPlugin, ability);
app.use(KonamiCode, {
  onKonamiCodeEntered: function () {
    if (VUE_TOASTY_ENABLED == 1) {
      toasty().trigger();
    }
    if (VUE_ASTEROIDS_ENABLED == 1) {
      asteroidsjs(VUE_TOASTY_ENABLED);
    }
  },
});
if (APP_GA_ENABLED == 1) {
  let UID = null;
  if (store && store.user && store.user.id && store.authenticated) {
    UID = store.user.id;
  }
  app.use(VueGtag, {
    property: {
      id: APP_GA_TAG,
      params: {
        user_id: UID,
        send_page_view: true,
        linker: {
          domain: [VUE_APP_URL],
        },
      },
    },
  });
}
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('AppButton', AppButton);
app.component('AdminBreadcrumbContainer', AdminBreadcrumbContainer);
app.component('AdminBreadcrumb', AdminBreadcrumb);
app.component('AdminBreadcrumbSep', AdminBreadcrumbSep);
app.component('Pagination', Bootstrap5Pagination);
app.component('VSelect', vSelect);
app.component('AppSwitch', AppSwitch);
app.mount('#app');

// https://docs.sentry.io/platforms/javascript/guides/vue/
if (VUE_SENTRY_ENABLED == 1) {
  Sentry.init({
    app,
    dsn: VUE_SENTRY_DSN,
    integrations: [
      Sentry.browserProfilingIntegration(),
      Sentry.browserTracingIntegration(),
      Sentry.httpClientIntegration(),
      Sentry.captureConsoleIntegration(),
    ],
    sendDefaultPii: true,
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
          Sentry.showReportDialog({ eventId: event.event_id });
        }
      }
      return event;
    },
  });
}
