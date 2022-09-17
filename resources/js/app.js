import { createApp } from 'vue';
import App from '@views/App.vue';
import router from '@router';
import store from '@store';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
// import { plugin as VueTippy } from 'vue-tippy'
import AppButton from '@components/AppButton.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';

axios.defaults.withCredentials = true;

const app = createApp(App);

store.dispatch('auth/getUser').then(() => {
  app
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .component('AppButton', AppButton)
    .mount('#app');
});
