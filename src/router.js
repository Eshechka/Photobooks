import Vue from 'vue';
import VueRouter from 'vue-router';

import { store } from './store/index';

import guard from './requests'

Vue.use(VueRouter);

const userId = localStorage.getItem('userId');

const routes = [
    {
        path: '/',        
        redirect: `/${userId}`, 
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
        path: '/search',
        component: () => import('./vue-components/app-search.vue'),
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

    if (!isPublicRoute && !isUserLogged) {
        const token = localStorage.getItem('token');
        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

       try {
            const {data} = await guard.get('/user');
            localStorage.setItem('userId', data.id);
            store.commit('user/SET_USER', data);
            next();
        } 
        catch (error) {  
            router.replace('/login');
            localStorage.clear();
        }
    }
    else {
        if (isPublicRoute && isUserLogged) router.replace('/');
        else next();
    }

  })
// export default new VueRouter({ routes, mode: 'history' });
export default router;