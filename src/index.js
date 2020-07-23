function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpe?g)$/));

import Vue from 'vue';

import { store } from './store/index';

import router from './router';

import appIndex from './vue-pages/app-index.vue';

new Vue({
    el: "#wrapper-index",
    store,
    router,
    
    render: h => h(appIndex)
  });