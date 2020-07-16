// import '../src/styles/pages/login/login.pcss'

import Vue from 'vue';
import appLogin from './vue-pages/app-login.vue';

new Vue({
    el: "#wrapper-login",
    
    render: h => h(appLogin)
  });

