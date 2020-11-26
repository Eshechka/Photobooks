import $axios from '../../requests';
import router from '../../router';

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
                if (data.author) store.commit('SET_AUTHOR', data.author);
            }
            catch(error) {
                router.push('/not-found');
                // throw new Error ( error.response.data.error || error.response.data.message );                
            }
        },
    },
};