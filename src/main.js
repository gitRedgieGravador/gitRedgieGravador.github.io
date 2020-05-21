import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from './plugins/axios'
import arrOpt from 'underscore';
import VueHtmlToPaper from 'vue-html-to-paper';
/* eslint-disable */
Vue.config.productionTip = false
const options = {
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}
Vue.use(VueHtmlToPaper, options);
new Vue({
    arrOpt,
    axios,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')