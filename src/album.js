// import '../src/styles/pages/album/album.pcss'

import Vue from 'vue';
import router from './router';
import appAlbum from './vue-pages/app-album.vue';

new Vue({
    el: "#wrapper-album",
    router,

    render: h => h(appAlbum)
  });