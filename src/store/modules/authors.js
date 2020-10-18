import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
        author: {},
    },
    mutations: {
        SET_AUTHOR(state, author) {
            state.author = author;
        },
       
    },
    actions: {
        async refreshAuthor(store, authorId) {               
            try {               
                const { data } = await $axios.get(`/v1/authors/${authorId}`,
                    { params: {'include':`albums`} },
                    {'Content-Type': 'application/json'}
                );
                
                store.commit('SET_AUTHOR', data.author);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
    },
};