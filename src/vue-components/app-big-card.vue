<template>
        
    <div class="big-card">
        <div class="big-card__card">

            <div class="big-card__card-img">
                <img class="big-card__img" :src="`${urlPhotos}/${cardObject.photo}`" alt="big card image">                
            </div>

            <div class="big-card__author-info">

                <div class="big-card__avatar">
                    <img class="big-card__avatar-img" alt="card avatar" :src="`${urlAvatars}/${cardObject.author.avatar}`">
                </div>
                
                <div class="big-card__name">{{cardObject.author.name}}</div>

                <div class="big-card__likes">
                    <!-- <button type="button" class="big-card__button-likes" -->
                    <button type="button" class="button button_icon button_size_m button_theme_carrot big-card__button-likes"
                        @click.prevent="plusMyLike"
                        :class="{'big-card__button-likes_active' : isActiveLike}">
                        <span class="button__text">{{cardObject.likeCount}}</span>
                        <span class="button__icon button__icon_heart"></span>
                    </button>
                </div>

            </div>

            <div class="big-card__desc">

                <h3 class="big-card__title">{{cardObject.title}}</h3>
            
                <div class="big-card__desc-text"
                    v-html="descriptionHandle(cardObject.description)"
                ></div>

            </div> 

            <div class="big-card__comments">

                <div class="big-card__comments-topgroup">
                    <h4 class="big-card__comments-title">Комментарии</h4>
                    <button type="button" class="big-card__button-tick"
                        @click="myCommentVisibleHandle()"
                        ref='my-comment-toggler'
                    >
                    </button>
                </div>
                
                <div class="big-card__my-comment" v-if="isVisibleMyComment">

                        <div class="big-card__my-comment-avatar-wrapper">
                            <img class="big-card__my-comment-avatar" :src="`${urlAvatars}/${this.loggedUserObject.avatar}`" alt="my avatar">
                        </div>
                        <div class="big-card__my-comment-info">
                            
                        <div class="big-card__my-comment-name">{{this.loggedUserObject.name}}</div>
                    
                        <form class="big-card__my-comment-form"
                            @submit.prevent="sumbitNewCommentHandler"
                        >

                            <textarea class="big-card__my-comment-input" name="" id="" cols="10" rows="1" placeholder="Добавить комментарий"
                                v-model="newComment.commentText"
                            ></textarea>
                            <div class="big-card__my-comment-submit">
                                <!-- <button class="site-button site-button_theme-light" type="submit">Добавить</button> -->
                                <button class="button button_theme_light button_size_m" type="submit">Добавить</button>
                            </div>

                        </form>
                        </div>
                </div>

                <div class="big-card__users-comments">

                    <ul class="users-comments">
                        <li v-for="comment in comments" :key="comment.id" class="users-comments__item">

                            <div class="users-comments__avatar-wrapper">
                                <img class="users-comments__avatar" :src="`${urlAvatars}/${comment.author.avatar}`" alt="Avatar of comment's author">
                            </div>
                            <div class="users-comments__info-wrapper">
                                <div class="users-comments__author">{{comment.author.name}}</div>
                                <div class="users-comments__text">{{comment.commentText}}</div>
                            </div>
                            <div class="users-comments__buttons-wrapper">
                                <!-- <div class="users-comments__button-edit"> -->
                                    <!-- <button type='button' class="round-button round-button_edit" -->
                                    <button type='button' class="button button_icon button_size_m button_theme_pale users-comments__buttonspace" v-if="comment.author.id==loggedUserObject.id"
                                        @click="editCommentHandler">
                                        <span class="button__text">Редактировать</span>
                                        <span class="button__icon button__icon_edit"></span>
                                    </button>
                                <!-- </div> -->
                                <!-- <div class="users-comments__button-delete" v-if="comment.author.id==loggedUserObject.id"> -->
                                    <!-- <button type='button' class="round-button round-button_delete" -->
                                    <button type='button' class="button button_icon button_size_m button_theme_carrot" v-if="comment.author.id==loggedUserObject.id"
                                        @click="deleteCommentHandler(comment.id)">
                                        <span class="button__text">Удалить</span>
                                        <span class="button__icon button__icon_delete"></span>                                        
                                    </button>
                                <!-- </div> -->
                            </div>

                        </li>
                    </ul>

                </div>

            </div> 
        </div>
    </div>

</template>



<script >

    import { mapState, mapActions } from 'vuex';

    import dataJSON_likes from '../json/likes.json';
    import dataJSON_all from '../../db.json';

    import $axios from '../requests';
    
    const baseUrl = `https://xeniaweb.online/storage`;

    export default {
        props: {
            cardObject: Object,
            loggedUserObject: Object,
        },

        data() {
          return {
            urlPhotos: baseUrl+'/photos',
            urlAvatars: baseUrl+'/avatars',

            likes: dataJSON_all.likes,

            comments: [],

            isActiveLike: this.cardObject.isLikedByMe,
            activeLike: [],
            // isActiveLike: false,
            // nowlikes: this.cardObject.likes,
            isVisibleMyComment: true,

            newComment: {
                commentText: '',
                authorId: Number,
                photoId: Number,
            },
          }

        },

        
        computed: {
            ...mapState('comments', {
                commentsCurrentPhoto: state => state.commentsCurrentPhoto
            }),

            myCommentToggler() {
                return this.$refs['my-comment-toggler'];
            }

        },


        methods: {
            ...mapActions('comments', ['addComment', 'deleteComment', 'changeComment', 'updatePhotoComments']),

            async sumbitNewCommentHandler() {
                this.newComment.photoId = this.cardObject.id;
                this.newComment.authorId = +this.loggedUserObject.id;

                await this.addComment(this.newComment);
                this.newComment.commentText = '';
                await this.updatePhotoComments(this.cardObject.id);            
                this.comments = this.commentsCurrentPhoto;
            },

            async editCommentHandler() {
                // await this.changeComment(this.comment.id);
            },
            async deleteCommentHandler(commentId) {
                await this.deleteComment(commentId);
                await this.updatePhotoComments(this.cardObject.id);
                this.comments = this.commentsCurrentPhoto;
            },

            plusMyLike() {
                this.isActiveLike = !this.isActiveLike;
                if (this.isActiveLike) {
                    this.cardObject.likeCount++;
                    const myLikeObject = {
                        "userId": this.loggedUserObject.id,
                        "photoId": this.cardObject.id
                    };
                    const headers = {'Content-Type': 'application/json'};

                    (async () => {
                        try {
                            const {data} = await $axios.post('http://localhost:3004/likes', myLikeObject,  {headers});
                        }
                        catch(error) { 
                            throw new Error ( error.response.data.error || error.response.data.message ); 
                        }
                    })();
                }
                else if (!this.isActiveLike && this.activeLike) {
                    this.cardObject.likes--;
                    (async () => {                            
                        try {
                            const headers = {'Content-Type': 'application/json'};
                            const {data} = await $axios.delete(`http://localhost:3004/likes/${this.activeLike.id}`,  {headers});
                        }
                        catch(error) { 
                            throw new Error ( error.response.data.error || error.response.data.message ); 
                        }
                        finally {}
                    })();
                }


            },
            myCommentVisibleHandle() {
                this.isVisibleMyComment=!this.isVisibleMyComment;
                if (this.isVisibleMyComment)
                    this.myCommentToggler.style.transform = 'rotate(90deg)';
                else
                    this.myCommentToggler.style.transform = 'rotate(270deg)';
            },

            descriptionHandle(text) {
                let textWithHashtags = '';

                if (text) {
                    let startPos = 0;

                    while (true) {
                        let foundHashtag = text.indexOf('#', startPos);

                        if (foundHashtag == -1) {
                            textWithHashtags += text.slice(startPos, text.length);
                            break;
                        }

                        let sliceText = text.slice(foundHashtag + 1);
                        
                        let endPos = sliceText.match(/[^A-Za-z0-9а-яА-ЯёЁ_]/).index + foundHashtag + 1;

                        if (endPos === -1) {
                            textWithHashtags += text.slice(startPos, foundHashtag) + '<span class="site-tag">' + text.slice(foundHashtag, text.length) + '</span>';
                            break;
                        }
                        else {
                            textWithHashtags += text.slice(startPos, foundHashtag) + '<span class="site-tag">' + text.slice(foundHashtag, endPos) + '</span>';    
                            startPos = endPos;
                        }
                        
                    }

                }

                return textWithHashtags;
            },
        },

        async created() {
            await this.updatePhotoComments(this.cardObject.id);            
            this.comments = this.commentsCurrentPhoto;
        },
        mounted() {
            this.activeLike= this.likes.find(like => (like.userId == this.loggedUserObject.id && like.photoId == this.cardObject.id));
            // this.isActiveLike= !!this.activeLike;
        },
    }
</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/common/site-button.pcss';

    .big-card {   
        width: 100%;    

        &__card {
            overflow: hidden;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            background-color: transparent;
        }

        &__card-img {
            width: 100%;
            height: 200px;
            position: relative;
            border-radius: 3px 3px 0 0;
            overflow: hidden;
            background-color: rgba(black, 0.7);

            @include tablets {
                height: 450px;
                /* height: 398px; */
            }
        }

        &__img {
            object-fit: cover;
            /* object-fit: contain; */
            width: 100%;
            height: 100%;
        }

        &__author-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
            background-color: $color-white;
        }

        &__avatar {
            margin-right: 10px;
            border-radius: 50%;
            overflow: hidden;
            width: 50px;
            height: 50px;
        }

        &__likes {
            background-color: rgb(238, 70, 52);
            min-width: 85px;
            min-height: 38px;
            border-radius: 30px;
            display: inline-flex;
            align-items: center;
            color: $color-white;
            margin-left: auto;
        }

        &__name {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
            width: 25%;
        }

            
        &__button-tick {
            font-family: 'Panton-Bold';
            font-size: 16px;
            color: $color-white;
            background-repeat: no-repeat;
            background-image: svg-load('arrow_left.svg', fill=rgba(#{$color-text}, 0.2));
            background-position: 50%;
            padding: 0px;
            height: 20px;
            width: 20px;
            background-size: 8px;
            transform: rotate(90deg);
        }

        &__button-likes {

            &_active.button {

                & .button__icon {
                    background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgba(#{$color-white}, 0.95), stroke-width=2px, stroke=rgb(238, 70, 52));
                }
            }

            &:active, &:focus {
                outline: none;
            }
        }


        &__desc {
            padding: 10px;
            /* padding-bottom: 30px; */
            background-color: $color-white;
        }

        &__title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
        }

        &__desc-text {
            height: 104px;
            overflow: hidden;

            @include tablets {
                height: 53px;
                /* height: 70px; */
            }
        }

        &__comments {
            background-color: rgba(f6f6f6, 0.8);
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            background-color: rgb(246, 246, 246);
            border-radius: 0 0 3px 3px;
        }

        &__comments-topgroup {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 0 10px;
        }

        &__comments-title {
            font-family: 'Proxima Nova Semibold';            
            font-size: 14px;
            line-height: 21px;
            padding-right: 10px;
        }

        &__my-comment-avatar-wrapper {
            display: none;

            @include tablets {
                display: block;
                width: 80px;
                margin-right: 10px;
            }
        }

        &__my-comment-avatar {
            margin: auto;
            border-radius: 50%;
        }

        &__my-comment-info {

            @include tablets {
                flex-grow: 1;
            }
        }

        &__my-comment {
            padding: 0 10px 10px;

            @include tablets {
                display: flex;
            }
        }

        &__my-comment-name {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 10px;
        }

        &__my-comment-input {
            @include popup-input();

            width: 80%;
            padding: 13px 16px;
            resize: vertical;            
            min-height: 48px;
            max-height: 150px;
            margin-bottom: 10px;

            @include tablets {
                width: 100%;
            }
        }

        &__users-comments {
            overflow-y: scroll;
            height: 280px;
        }

    }


    .users-comments {

        &__list {
            display: flex;
            background-color: rgba(f6f6f6, 0.8);
            padding: 20px 10px;
            border-top: 1px solid #f2f2f2;

            @include tablets {
                padding-left: 0;
            }

        }

        &__item {
            padding: 20px 10px 15px;
            border-top: 1px solid rgba($color-text, 0.2);
        }
        
        &__avatar-wrapper {

            display: none;

            @include tablets {
                display: block;
                width: 80px;
                flex-basis: 80px;
                flex-shrink: 0;
                margin-right: 10px;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                overflow: hidden;
            }
        }

        &__avatar {
            margin: auto;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__my-comment-info {

            @include tablets {
                flex-grow: 1;
            }
        }

        &__author {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 5px;
        }

        &__text {
            font-family: 'ProximaNova-Light';
            font-size: 16px;
            line-height: 24px;
        }

        &__buttons-wrapper {
            display: flex;
            margin-top: 10px;
        }

        &__buttonspace {
            margin-right: 10px;
        }

    }


    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    }

</style>