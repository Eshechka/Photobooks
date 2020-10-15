import Vue from 'vue';
import Vuex from 'vuex';

import albums from './modules/albums';
import cards from './modules/cards';

Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {
        cards,
        albums,
        
    }
});