import Vue from 'vue';
import VueRouter from 'vue-router';

import { store } from './store/index';
import axios from 'axios';

Vue.use(VueRouter);

const guard = axios.create({
    baseURL: 'https://xeniaweb.online/api',    
});
const userId = localStorage.getItem('userId');

const routes = [
    {
        path: '/',
        redirect: `/${userId}`,        
        // redirect: `/1`,        
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

router.beforeEach(async (to, from, next) => {
    // console.log('tut');
    // store.actions['user/login()'];
    const isPublicRoute = to.matched.some(route => route.meta.public);

    // console.log('tut isUserLogged', isUserLogged);
    // const isUserLogged = store.getters['user/userIsLogged'];


    if (!isPublicRoute) {
    // if (!isPublicRoute && !isUserLogged) {
        const token = localStorage.getItem('token');
        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

       try {
            const {data} = await guard.get('/user');
            console.log('Ответ от сервера: ',data);
            store.commit('user/SET_USER', data.user);
            next();
       } 
       catch (error) {        
            router.replace('/login');
            localStorage.clear();
       }
    }
    else {
        console.log('next()');
        next();
    }

  })
// export default new VueRouter({ routes, mode: 'history' });
export default router;