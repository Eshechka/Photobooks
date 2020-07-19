import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    // {    
    //     path: '/',
    //     component: () => import('./vue-pages/app-index.vue'),
    // },
    // {    
    //     path: '/album',
    //     component: () => import('./vue-pages/app-album.vue'),
    // },
    { 
        path: '/:id',
        component: () => import('./vue-components/app-one-album.vue'),
    }

];


// export default new VueRouter({ routes, mode: 'history' });
export default new VueRouter({ routes });