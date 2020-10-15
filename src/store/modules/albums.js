import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
    //   albums: [],
    currentAlbum: {}
    },
    mutations: {
        SET_CURRENT_ALBUM(state, album) {
            state.currentAlbum = album;
        },
        // SET_CURRENT_CARD(state, cardId) {
        //     state.currentAlbum = state.albums.filter(card => card.id === cardId)[0] || {};
        // },
        // ADD_ALBUM(state, newCard) {
        //     state.albums.unshift(newCard);
        // },
        // CHANGE_ALBUM(state, changedCard) {
        //     state.albums = state.albums.filter(card => card.id !== changedCard.id);
        //     state.albums.unshift(changedCard);
        //     state.albums.sort( (a, b) => b.id - a.id );
        // },
        // DELETE_ALBUM(state, deleteCardId) {
        //     state.albums = state.albums.filter(card => card.id !== deleteCardId);
        // },
    },
    actions: {
        // setCurrentAlbum(store, cardId) {
        //     store.commit('SET_CURRENT_CARD', cardId);
        // },
        // async addCard(store, card) {
        //     try {
        //         const { data } = await $axios.post('/v1/photos', card, {headers: {'Content-Type': 'multipart/form-data'}});
        //         store.commit('ADD_ALBUM', data.album);
        //     }
        //     catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        // },
        // async deleteCard(store, cardId) {
        //     try {
        //         await $axios.delete(`/v1/photos/${cardId}`, { headers: {'Content-Type': 'application/json'} });
        //         store.commit('DELETE_ALBUM', cardId);
        //     }
        //     catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        // },
        // async changeAlbum(store, changedAlbum) {
        //     console.log('renewAlbumData:', changedAlbum);
        //     try {
        //         const { data } = await this.$axios.put(`/v1/photos/${changedCard.id}`, changedCard);
        //         store.commit('CHANGE_ALBUM', data.album);
        //     }
        //     catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        // },
        async refreshThisAlbum(store, albumId) {               
                try {               
                const { data } = await $axios.get(`/v1/albums/${albumId}`
                                    ,{ params: {'include':`author`} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_CURRENT_ALBUM', data.album);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
    },
};