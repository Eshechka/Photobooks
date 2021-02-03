import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
      user: {},
      socials: [],
    },
    getters: {
        userIsLogged: state => {
            const userObj = state.user;
            const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;

            return userObjIsEmpty === false;
        },
        // loggedUser: state => {
        //     const userObj = state.user;
        //     return userObj;
        // },
    },
    mutations: {
        SET_USER(state, user) {            
            // state.user = Object.assign(state.user, user);
            state.user = user;
        },
        SET_SOCIALS(state, socials) {
            state.socials = socials;
        },
        CLEAR_USER(state) {
            state.user = {};
        },
    },
    actions: {
        login({commit}, user) {
            localStorage.setItem('userId', user.id);            
            commit('SET_USER', user);
        },
        logout({commit}) {
            localStorage.clear();
            commit('CLEAR_USER');
        },
        async changeUser(store, {changedUser, changedUserId}) {
            try {
                const { data } = await $axios.post(`/v1/authors/${changedUserId}`, changedUser, {headers: {'Content-Type': 'multipart/form-data'}});
                store.commit('SET_USER', data.user);
            }
            catch(error) { 
                throw new Error ( error.response.data.error || error.response.data.message ); 
            }
        },
        async getSocials(store) {
            try {
                const { data } = await $axios.get(`/v1/socials`, {'Content-Type': 'application/json'} );
                store.commit('SET_SOCIALS', data.socials);
            }
            catch(error) { 
                throw new Error ( error.response.data.error || error.response.data.message ); 
            }
        },
    },
};