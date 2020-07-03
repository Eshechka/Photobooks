// import '../src/styles/pages/album/album.pcss'

import Vue from 'vue';
import appAlbum from './vue-pages/app-album.vue';

new Vue({
    el: "#wrapper-album",
    
    render: h => h(appAlbum)
  });