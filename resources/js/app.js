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

axios.defaults.withCredentials = true;

const app = createApp(App);
const APP_GA_TAG = GA_TAG; // eslint-disable-line
const APP_GA_ENABLED = GA_ENABLED; // eslint-disable-line

store.dispatch('auth/getUser').then(() => {
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
