import $axios from '../../requests';

export default {
    namespaced: true,
    state: {
        commentsCurrentPhoto: []
    },
    mutations: {
        SET_COMMENTS(state, commentsCurrentPhoto) {
            state.commentsCurrentPhoto = commentsCurrentPhoto;
        },
        ADD_COMMENT(state, newComment) {
            state.commentsCurrentPhoto.unshift(newComment);
        },
        CHANGE_COMMENT(state, changedComment) {
            state.commentsCurrentPhoto = state.commentsCurrentPhoto.filter(comment => comment.id !== changedComment.id);
            state.commentsCurrentPhoto.unshift(changedComment);
            state.commentsCurrentPhoto.sort( (a, b) => b.id - a.id );
        },
        DELETE_COMMENT(state, deleteCommentId) {
            state.commentsCurrentPhoto = state.commentsCurrentPhoto.filter(comment => comment.id !== deleteCommentId);
        },
    },
    actions: {
        async addComment(store, comment) {
            try {
                const { data } = await $axios.post('/v1/comments', comment);
                store.commit('ADD_COMMENT', data.comment);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async deleteComment(store, commentId) {
            try {
                await $axios.delete(`/v1/comments/${commentId}`);
                store.commit('DELETE_COMMENT', commentId);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async changeComment(store, changedComment) {
            try {
                const { data } = await this.$axios.put(`/v1/comments/${changedComment.id}`, changedComment);
                store.commit('CHANGE_COMMENT', data.comment);
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
        async updatePhotoComments(store, photoId) {               
                try {               
                const { data } = await $axios.get(`/v1/comments`,
                                    { params: {'include':`author`, 'where':`photoId:eq:${photoId}`, 'limit': 50, 'sort':'createdAt:desc'} },
                                    {'Content-Type': 'application/json'}
                    );
                              
                store.commit('SET_COMMENTS', data.comments);//!!!!! точно?
            }
            catch(error) { throw new Error ( error.response.data.error || error.response.data.message ); }
        },
    },
};