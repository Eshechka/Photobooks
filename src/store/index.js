import Vue from 'vue';
import Vuex from 'vuex';

import album from './modules/album';

Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {

        album,
        
    }
});