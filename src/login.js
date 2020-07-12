// import '../src/styles/pages/login/login.pcss'

// function importAll (r) {
//   r.keys().forEach(r);
// }

// importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpg)$/));


import Vue from 'vue';
import appLogin from './vue-pages/app-login.vue';

new Vue({
    el: "#wrapper-login",
    
    render: h => h(appLogin)
  });

