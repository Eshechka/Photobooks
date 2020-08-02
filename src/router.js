import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/1',
        component: () => import('./vue-components/app-user.vue'),
    },
    // {
    //     path: '/login',
    //     component: () => import('./vue-pages/app-login.vue'),
    // },
    { 
        path: '/:id',
        component: () => import('./vue-components/app-user.vue'),
    },
    { 
        path: '/album/:albumid',
        component: () => import('./vue-components/app-album.vue'),
    },
];


// export default new VueRouter({ routes, mode: 'history' });
export default new VueRouter({ 
    routes, 
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});