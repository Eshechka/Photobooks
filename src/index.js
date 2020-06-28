// import '../src/styles/pages/index/index.pcss'

import Vue from 'vue';
import appIndex from './vue-pages/app-index.vue';

new Vue({
    el: "#wrapper-index",
    
    render: h => h(appIndex)
  });