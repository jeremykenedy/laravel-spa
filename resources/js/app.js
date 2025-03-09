import './bootstrap';

import { createApp, ref, watchEffect } from 'vue';
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import router from '@routes';
import { useAuthStore } from "@store/auth";
import VueSweetalert2 from 'vue-sweetalert2';
import { plugin as VueTippy } from 'vue-tippy';
import AppButton from '@components/common/AppButton.vue';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';
import vSelect from "vue-select";
import useAuth from './composables/auth';
import i18n from "./plugins/i18n";
import VueAwesomePaginate from "vue-awesome-paginate";
import VueSecureHTML from 'vue-html-secure';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import VueGtag from 'vue-gtag-next';
import KonamiCode from "vue3-konami-code"
import toasty from 'toasty';
import { asteroidsjs } from '@services/asteroids';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import swal from 'sweetalert2';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';
import "vue-awesome-paginate/dist/style.css";
import 'vue3-easy-data-table/dist/style.css';

window.Swal = swal;

const APP_GA_TAG = GA_TAG; // eslint-disable-line
const APP_GA_ENABLED = GA_ENABLED; // eslint-disable-line
const VUE_APP_URL = APP_URL; // eslint-disable-line
const VUE_SENTRY_DSN = SENTRY_DSN; // eslint-disable-line
const VUE_SENTRY_ENABLED = SENTRY_ENABLED; // eslint-disable-line
const VUE_SENTRY_RATE = SENTRY_RATE; // eslint-disable-line
const VUE_SENTRY_FEEDBACK_ENABLED = SENTRY_FEEDBACK_ENABLED; // eslint-disable-line
const VUE_ENVIRONMENT = ENVIRONMENT; // eslint-disable-line
const VUE_TOASTY_ENABLED = KONAMI_TOASTY_ENABLED; // eslint-disable-line
const VUE_ASTEROIDS_ENABLED = KONAMI_ASTEROIDS_ENABLED; // eslint-disable-line
const VUE_TINY_MCE_KEY = TINY_MCE_KEY; // eslint-disable-line
const VUE_CK_EDITOR_KEY = CK_EDITOR_KEY; // eslint-disable-line
const VUE_OPEN_AI_KEY = OPEN_AI_KEY; // eslint-disable-line

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp({
  setup() {
    if (localStorage.getItem("data-theme") == 'dark') {
      document.documentElement.className = 'dark';
    } else {
      localStorage.setItem("data-theme", "light");
    }
  },
  created() {
    useAuth().getUser()
  }
});
app.use(pinia)

const store = useAuthStore()
const { user, authenticated } = storeToRefs(store)

app.use(router)
app.use(VueSweetalert2)
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
})
app.use(VueSecureHTML)
app.use(VueAwesomePaginate)
app.use(i18n)
app.use(abilitiesPlugin, ability)
app.use(KonamiCode, {
  onKonamiCodeEntered: function() {
    if (VUE_TOASTY_ENABLED == 1) {
      toasty().trigger();
    }
    if (VUE_ASTEROIDS_ENABLED == 1) {
      asteroidsjs(VUE_TOASTY_ENABLED);
    }
  }
});
app.component('EasyDataTable', Vue3EasyDataTable)
app.component('AppButton', AppButton)
app.component('Pagination', Bootstrap5Pagination)
app.component("v-select", vSelect)
app.mount('#app')
