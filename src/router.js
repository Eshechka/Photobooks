import Vue from 'vue';
import VueRouter from 'vue-router';
// import requests from './requests';

import { store } from './store/index';
// import axios from 'axios';
import guard from './requests'

Vue.use(VueRouter);

// const guard = axios.create({
//     baseURL: 'https://xeniaweb.online/api',    
// });
const userId = localStorage.getItem('userId');

const routes = [
    {
        path: '/',        
        redirect: `/${userId}`,   
        // redirect: `/${localStorage.getItem('userId')}`,   
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
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLogged = store.getters['user/userIsLogged'];
    // console.log('isUserLogged',isUserLogged);
    // console.log('isPublicRoute',isPublicRoute);

    if (!isPublicRoute && !isUserLogged) {
        const token = localStorage.getItem('token');
        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

       try {
            const {data} = await guard.get('/user');
            localStorage.setItem('userId', data.user.id);
            userId = data.id;
            store.commit('user/SET_USER', data);

            next();
        } 
        catch (error) {        
            router.replace('/login');
            localStorage.clear();
        }
    }
    else {
        next();
    }

  })
// export default new VueRouter({ routes, mode: 'history' });
export default router;