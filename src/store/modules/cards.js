import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
      cards: [],
      currentAlbumCards: []
    },
    mutations: {
        SET_ALBUM_CARDS(state, currentAlbumCards) {
            state.currentAlbumCards = currentAlbumCards;
        },
        SET_CARDS(state, cards) {
            state.cards = cards;
        },
        ADD_ALBUM_CARD(state, newCard) {
            state.currentAlbumCards.unshift(newCard);
        },
        CHANGE_ALBUM_CARD(state, changedCard) {
            state.currentAlbumCards = state.currentAlbumCards.filter(card => card.id !== changedCard.id);
            state.currentAlbumCards.unshift(changedCard);
            state.currentAlbumCards.sort( (a, b) => b.id - a.id );
        },
        DELETE_ALBUM_CARD(state, deleteCardId) {
            state.currentAlbumCards = state.currentAlbumCards.filter(card => card.id !== deleteCardId);
        },
    },
    actions: {
        async addCard(store, card) {
            try {
                const { data } = await $axios.post('/v1/photos', card, {headers: {'Content-Type': 'multipart/form-data'}});
                store.commit('ADD_ALBUM_CARD', data.card);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async deleteCard(store, cardId) {
            try {
                await $axios.delete(`/v1/photos/${cardId}`, { headers: {'Content-Type': 'application/json'} });
                store.commit('DELETE_ALBUM_CARD', cardId);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async changeCard(store, changedCard) {
            try {
                const { data } = await this.$axios.put(`/v1/photos/${changedCard.id}`, changedCard);
                store.commit('CHANGE_ALBUM_CARD', data.card);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async refreshAlbumCards(store, albumId) {               
                try {               
                const { data } = await $axios.get(`/v1/photos`,
                                    { params: {'limit': 50, 'where':`albumId:eq:${albumId}`, 'sort':'createdAt:desc', 'include':`author`} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_ALBUM_CARDS', data.cards);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async updateAllCards(store) {               
                try {               
                const { data } = await $axios.get(`/v1/photos`,
                                    { params: {'include':`author`, 'limit': 50, 'sort':'createdAt:desc'} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_CARDS', data.cards);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
    },
};