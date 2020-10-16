import Vue from 'vue';
import VueRouter from 'vue-router';

import { store } from './store/index';
import axios from 'axios';

Vue.use(VueRouter);

// const guard = axios.create({
//     baseURL: 'https://xeniaweb.online/api',    
// });
const userId = localStorage.getItem('userId');

const routes = [
    {
        path: '/',
        // redirect: `/${userId}`,        
        redirect: `/1`,        
        component: () => import('./vue-components/app-user.vue'),
    },
    {
        path: '/login',
        component: () => import('./vue-pages/app-login.vue'),
        meta: {
            public: true,
        },
    },
    { 
        path: '/:id',
        component: () => import('./vue-components/app-user.vue'),
    },
    { 
        path: '/album/:albumid',
        component: () => import('./vue-components/app-album.vue'),
    },
];


const router = new VueRouter({ 
    routes, 
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLogged = store.getters['user/userIsLogged'];    

    if (!isPublicRoute && !isUserLogged) {
        console.log('unlogged!!!!!!!');
        router.replace('/login');
        // localStorage.clear();
        // next('/');
    }
    else {
        console.log('next()');
        next();
    }

  })
// export default new VueRouter({ routes, mode: 'history' });
export default router;