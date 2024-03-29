import Vue from 'vue';
import Vuex from 'vuex';
import albums from './modules/albums';
import cards from './modules/cards';
import authors from './modules/authors';
import comments from './modules/comments';
import user from './modules/user';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        cards,
        albums,
        authors,
        comments,
        user,        
    }
});