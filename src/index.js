// import '../src/styles/pages/index/index.pcss'

function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpe?g)$/));

import Vue from 'vue';
import appIndex from './vue-pages/app-index.vue';

new Vue({
    el: "#wrapper-index",
    
    render: h => h(appIndex)
  });