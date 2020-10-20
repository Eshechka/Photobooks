import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
        userAlbums: [],
        currentAlbum: {}
    },
    mutations: {
        SET_CURRENT_ALBUM(state, album) {
            state.currentAlbum = album;
        },
        SET_USER_ALBUMS(state, albums) {
            state.userAlbums = albums;
        },
        // SET_CURRENT_CARD(state, cardId) {
        //     state.currentAlbum = state.albums.filter(card => card.id === cardId)[0] || {};
        // },
        ADD_ALBUM(state, newAlbum) {
            console.log('newAlbum:',newAlbum);
            state.userAlbums.unshift(newAlbum);
        },
        CHANGE_ALBUM(state, changedAlbum) {
            state.userAlbums = state.userAlbums.filter(album => album.id !== changedAlbum.id);
            state.userAlbums.unshift(changedAlbum);
            state.userAlbums.sort( (a, b) => b.id - a.id );
        },
        // DELETE_ALBUM(state, deleteCardId) {
        //     state.albums = state.albums.filter(card => card.id !== deleteCardId);
        // },
    },
    actions: {
        // setCurrentAlbum(store, cardId) {
        //     store.commit('SET_CURRENT_CARD', cardId);
        // },
        async addAlbum(store, album) {
            try {
                const { data } = await $axios.post('/v1/albums', album, {headers: {'Content-Type': 'multipart/form-data'}});
                store.commit('ADD_ALBUM', data.album);
            }
            catch(error) { 
                throw new Error ( error.response.data.error || error.response.data.message ); 
            }
        },
        // async deleteCard(store, cardId) {
        //     try {
        //         await $axios.delete(`/v1/photos/${cardId}`, { headers: {'Content-Type': 'application/json'} });
        //         store.commit('DELETE_ALBUM', cardId);
        //     }
        //     catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        // },
        async changeAlbum(store, changedAlbum) {
            // console.log('renewAlbumData:', changedAlbum);
            try {
                const { data } = await this.$axios.put(`/v1/albums/${changedAlbum.id}`, changedAlbum);
                store.commit('CHANGE_ALBUM', data.album);
            }
            catch(error) { 
                throw new Error ( error.response.data.error || error.response.data.message ); 
            }
        },
        async refreshUserAlbum(store, userId) {               
                try {               
                const { data } = await $axios.get(`/v1/albums`,
                                    { params: {'where':`author.id:eq:${userId}`} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_USER_ALBUMS', data.albums);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async refreshThisAlbum(store, albumId) {               
                try {               
                const { data } = await $axios.get(`/v1/albums/${albumId}`
                                    ,{ params: {'include':`author`} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_CURRENT_ALBUM', data.album);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        }
    },
};