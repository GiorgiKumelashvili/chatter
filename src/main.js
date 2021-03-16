/**
 * @author Giorgi Kumelashvili // giorgi.kumelashvili21@gmail.com
 * @version 0.0.1
 * @since Mar 2, 2021
 */

import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store/store';

// Routing
import router from '@/router/router';
import '@/router/guard';

// Main css style
import '@/assets/style.css';

import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');

/*TODO

    (+) message send area resize problem
    (+) responsivnes for mobile
    (+) gadaitane navigation componentshi roca gaaketeb
    (+) remove all hardcode routes and get it to const
    ( ) pagination need in group chat and page down event on load messages
*/
