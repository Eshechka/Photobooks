export default {
    namespaced: true,
    state: {
      album: {},
    },
    getters: {
        albumIsSet: state => {            
            const albumObj = state.album;
            const albumObjIsEmpty = Object.keys(albumObj).length === 0 && albumObj.constructor === Object;

            return albumObjIsEmpty === false;
        },
    },
    mutations: {
        SET_ALBUM(state, album) {
            state.album = album;
        },
       
    },
    actions: {
        setCurrentAlbum() {
            localStorage.clear();
            commit('SET_ALBUM');
        }
    },
};