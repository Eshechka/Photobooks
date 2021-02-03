function importAll (r) {
  r.keys().forEach(r);
}
importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpe?g|gif)$/));


import Vue from 'vue';

import appIndex from './vue-pages/app-index.vue';

import { store } from './store/index';
import $axios from './requests';
store.$axios = $axios;
import router from './router';
import vuelidate from 'vuelidate';

Vue.use(vuelidate)

new Vue({
    el: "#wrapper-index",
    store,
    router,
    vuelidate,
    
    render: h => h(appIndex)
  });