import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
      user: {},
    },
    getters: {
        userIsLogged: state => {
            const userObj = state.user;
            const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;

            return userObjIsEmpty === false;
        },
        // getLoggedUser: state => {
        //     return state.user;
        // }
    },
    mutations: {
        SET_USER(state, user) {
            console.log('SET_USER: ', user);
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = {};
        },
    },
    actions: {
        // async loginUser({commit}) {             
        //     try {
        //         const {data} = await $axios.get('/user');             
        //         // localStorage.setItem('userId', data.id);
        //         store.commit('SET_USER', data);
        //     }
        //     catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        // },
        login({commit}, user) {
            localStorage.setItem('userId', user.id);
            commit('SET_USER', user);
        },
        logout({commit}) {
            localStorage.clear();
            commit('CLEAR_USER');
        },
    },
};