import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
      cards: [],
      currentAlbumCards: [],
      searchedWord: '',
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
        SET_WORD(state, searchedWord) {
            state.searchedWord = searchedWord;
        },
        DELETE_WORD(state) {
            state.searchedWord = '';
        },
    },
    actions: {
        async addCard(store, card) {
            try {
                const { data } = await $axios.post('/v1/photos', card, {headers: {'Content-Type': 'multipart/form-data'}});
                const response = await $axios.get(`/v1/photos/${data.card.id}`,
                                                { params: {'include':'author,comments,likes'} },
                                                {'Content-Type': 'application/json'}
                    );
                store.commit('ADD_ALBUM_CARD', response.data.card);
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
                const { data } = await this.$axios.patch(`/v1/photos/${changedCard.id}`, changedCard);
                const response = await $axios.get(`/v1/photos/${data.card.id}`,
                                                { params: {'include':'author,comments,likes'} },
                                                {'Content-Type': 'application/json'}
                    );

                store.commit('CHANGE_ALBUM_CARD', response.data.card);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async refreshAlbumCards(store, albumId) {               
                try {      //зачем тут получать все photos если можно просто albumID
                const { data } = await $axios.get(`/v1/photos`,
                                    { params: {'include':'author,album,comments,likes', 'limit': 100, 'where':`albumId:eq:${albumId}`, 'sort':'createdAt:desc'} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_ALBUM_CARDS', data.cards);
            }
            catch(error) { 
                console.log('Невозможно обновить фотографии этого альбома');
                throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async updateAllCards(store) {               
                try {               
                const { data } = await $axios.get(`/v1/photos`,
                                    { params: {include :'author,album,comments,likes', 'limit': 100, 'sort':'createdAt:desc'} },
                                    {'Content-Type': 'application/json'}
                    );
                store.commit('SET_CARDS', data.cards);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        setSearchedWord(store, searchedWord) {
            store.commit('SET_WORD', searchedWord);
        },
        deleteSearchedWord(store) {
            store.commit('DELETE_WORD');
        }        
    },
};