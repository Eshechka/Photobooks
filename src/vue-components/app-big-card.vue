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
                    <button type="button" class="button button_icon button_size_m button_theme_carrot big-card__button-likes"
                        @click.prevent="toggleMyLike"
                        :disabled="isDisabledLike"
                        :class="{'big-card__button-likes_active' : isActiveLike}">
                        <span class="button__text">{{cardObject.likesCount || cardObject.likes.length}}</span>
                        <span class="button__icon button__icon_heart"></span>
                    </button>
                </div>

            </div>

            <div class="big-card__desc">

                <h3 class="big-card__title">{{cardObject.title}}</h3>
            
                <div class="big-card__desc-text">
                    <div v-for="part in partsTextAndHashtag" :key="part.id" class="big-card__text-before-hashtag"
                        >{{part.text}}<span class="big-card__hashtag"
                            @click="clickHashtagHandle(part.hash)"
                        >{{part.hash}}</span>
                    </div>
                    <div v-if="!partsTextAndHashtag.length" class="big-card__text-no-hashtags">{{cardObject.description}}
                    </div>
                </div> 

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
                            @submit.prevent="sumbitNewCommentHandler">

                            <textarea class="big-card__my-comment-input" cols="10" rows="1" placeholder="Добавить комментарий"
                                v-model="newComment.commentText">
                            </textarea>
                            <div class="big-card__my-comment-submit">
                                <button class="button button_theme_light button_size_m" type="submit">Добавить</button>
                            </div>

                        </form>
                        </div>
                </div>

                <div class="big-card__users-comments"
                    :style="{height: heightUsersComments}">

                    <ul class="users-comments">
                        <li v-for="comment in comments" :key="comment.id" class="users-comments__item">

                            <div class="users-comments__avatar-wrapper">
                                <img class="users-comments__avatar" :src="`${urlAvatars}/${comment.author.avatar}`" alt="Avatar of comment's author">
                            </div>
                            <div class="users-comments__info-wrapper">
                                <div class="users-comments__author">{{comment.author.name}}</div>
                                <div class="users-comments__text">{{comment.commentText}}</div>
                                <textarea class="users-comments__edited-text" v-if="comment.id==changedComment.id"
                                    v-model="changedComment.commentText"
                                ></textarea>
                            </div>
                            <div class="users-comments__error users-comments__error_text" v-if="openCommentEditing">
                                <span v-if="!$v.changedComment.commentText.minLength" v-show="$v.changedComment.commentText.$invalid">
                                    Минимум символов в комментарии: {{ $v.changedComment.commentText.$params.minLength.min }}
                                </span>
                                <span v-else-if="!$v.changedComment.commentText.maxLength" v-show="$v.changedComment.commentText.$invalid">
                                    Максимум символов в комментарии: {{ $v.changedComment.commentText.$params.maxLength.max }}
                                </span>
                                <span v-else v-show="$v.changedComment.commentText.$invalid">
                                    Комментарий не может быть пустым. Выскажитесь, не стесняйтесь!
                                </span>
                            </div>
                            
                            <div class="users-comments__buttons-wrapper">
                                    <button type='button' title="Нажмите для редактирования этого комментария" class="button button_icon button_size_s_m button_theme_pale users-comments__buttonspace" v-if="comment.author.id==loggedUserObject.id && comment.id!==changedComment.id"
                                        @click="editCommentHandler(comment)">
                                        <span class="button__text">Редактировать</span>
                                        <span class="button__icon button__icon_edit"></span>
                                    </button>
                                    <button type='button' title="Нажмите для удаления этого комментария" class="button button_icon button_size_s_m button_theme_carrot" v-if="comment.author.id==loggedUserObject.id && comment.id!==changedComment.id"
                                        @click="deleteCommentHandler(comment.id)">
                                        <span class="button__text">Удалить</span>
                                        <span class="button__icon button__icon_delete"></span>                                        
                                    </button>
                                    <button type='button' class="button button_size_m" v-if="comment.author.id==loggedUserObject.id && comment.id==changedComment.id"
                                        :disabled="$v.changedComment.$invalid"
                                        :title="$v.changedComment.$invalid ? 'Необходимо исправить текст' : 'Сохранить изменения' "                                                
                                        @click="saveCommentHandler">Сохранить</button>
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

    import $axios from '../requests';

    import { required, minLength, maxLength } from 'vuelidate/lib/validators';

    import { baseStorageUrl } from '../requests.js';

    export default {

        props: {
            cardObject: Object,
            loggedUserObject: Object,
        },

        data() {
            return {
                urlPhotos: baseStorageUrl+'/photos',
                urlAvatars: baseStorageUrl+'/avatars',

                // ----- лайки -----
                isActiveLike: false,
                isDisabledLike: false,

                // ----- комментарии -----
                heightUsersComments: '200px',
                comments: [],
                isVisibleMyComment: true,
                openCommentEditing: false,

                newComment: {
                    commentText: '',
                    authorId: Number,
                    photoId: Number,
                },
                
                changedComment: {
                    id: Number,
                    commentText: '',
                },

                // ----- деление описания на секст и хэштег -----
                partsTextAndHashtag: [],

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


        validations: {

            changedComment: {
                commentText: {
                    required,
                    maxLength: maxLength(400),
                    minLength: minLength(10)
                },
            },

        },


        methods: {
            ...mapActions('cards', ['setSearchedWord']),
            ...mapActions('comments', ['addComment', 'deleteComment', 'changeComment', 'updatePhotoComments']),

            
            // ***** Обработка нажатия клавиш *****
            keyDownHandle(e) {
                switch(e.code ) {
                    case 'Escape':
                        this.$emit('close-bid-card');
                        break;

                    // case 'ArrowRight':
                    //     this.$emit('next');
                    //     break;
                        
                    // case 'ArrowLeft':
                    //     this.$emit('previous');
                    //     break;
                }
                    // console.log('e =',e);
            },

            // ***** Клик по хэштегу *****
            clickHashtagHandle(searchedHashtag) {
                this.setSearchedWord(searchedHashtag);
                if (this.$route.path==='/search') {
                    this.$emit('close-bid-card');                    
                }
                else {
                    this.$router.push('/search');
                }
            },

            // ***** Добавить новый комментарий *****
            async sumbitNewCommentHandler() {
                this.newComment.photoId = this.cardObject.id;
                this.newComment.authorId = +this.loggedUserObject.id;

                await this.addComment(this.newComment);
                this.newComment.commentText = '';
                await this.updatePhotoComments(this.cardObject.id);            
                this.comments = this.commentsCurrentPhoto;
            },

            // ***** Редактировать комментарий *****
            editCommentHandler(comment) {
                this.openCommentEditing = true;
                this.changedComment.id = comment.id;
                this.changedComment.commentText = comment.commentText;
            },

            // ***** Сохранить отредактированный комментарий *****
            async saveCommentHandler() {
                await this.changeComment(this.changedComment);
                await this.updatePhotoComments(this.cardObject.id);            
                this.comments = this.commentsCurrentPhoto;
                this.openCommentEditing = false;

                this.changedComment= {
                    id: Number,
                    commentText: '',
                };
            },

            // ***** Удалить комментарий *****
            async deleteCommentHandler(commentId) {
                await this.deleteComment(commentId);
                await this.updatePhotoComments(this.cardObject.id);
                this.comments = this.commentsCurrentPhoto;
                this.openCommentEditing = false;
            },

            // ***** Скрыть/отобразить форму добавления комментария *****
            myCommentVisibleHandle() {
                this.isVisibleMyComment=!this.isVisibleMyComment;
                if (this.isVisibleMyComment) {
                    this.myCommentToggler.style.transform = 'rotate(90deg)';
                    this.heightUsersComments = '200px';
                }
                else {
                    this.myCommentToggler.style.transform = 'rotate(270deg)';
                    this.heightUsersComments = '360px';
                }
            },



            async toggleMyLike() {
                this.isDisabledLike = true;
                this.isActiveLike = !this.isActiveLike;
                try {
                    await $axios.post(`/v1/photos/${this.cardObject.id}/likes`);
                    if (this.isActiveLike) { //лайк поставили
                        this.cardObject.likesCount++;
                    }
                    else { //лайк сняли
                        this.cardObject.likesCount--;
                    }
                } catch {
                    console.log('Error');
                } finally {
                    this.isDisabledLike = false;
                }                
            },


            // ***** Разделение описания на отдельные части: текст + хэштег *****
            splitDescriptionWithHashtags(text) {
                if (text) {
                    let startPos = 0, i = 1;

                    while (true) {
                        let foundHashtagPos = text.indexOf('#', startPos);

                        if (foundHashtagPos == -1) {
                            if (startPos !==0) {
                                this.partsTextAndHashtag.push({id: i, text: text.slice(startPos, text.length), hash: ''});
                            }
                            break;
                        }

                        let sliceText = text.slice(foundHashtagPos + 1);
                        
                        let endPos = sliceText.match(/[^A-Za-z0-9а-яА-ЯёЁ_]/).index + foundHashtagPos + 1;

                        this.partsTextAndHashtag.push({id: i++, text: text.slice(startPos, foundHashtagPos), hash: text.slice(foundHashtagPos, endPos)});
                        startPos = endPos;                      
                    }
                }
            },            
        },

        async created() {
            await this.updatePhotoComments(this.cardObject.id);
            this.comments = this.commentsCurrentPhoto;
            document.addEventListener('keydown', this.keyDownHandle);
        },
        async mounted() {
            let thisCardLikes = this.cardObject.likes || [];
            this.isActiveLike = thisCardLikes.find(like => like == this.loggedUserObject.id);
            this.splitDescriptionWithHashtags(this.cardObject.description);
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
            min-width: 288px;
            display: flex;
            flex-direction: column;
            background-color: transparent;

            @include tablets {
                height: unset;
            }
        }

        &__card-img {
            width: 100%;
            /* height: 350px; */
            /* height: calc(100vh - 70px - 160px - 21px - 139px - 200px); */
            height: calc(100vh - 70px); 

            position: relative;
            border-radius: 3px 3px 0 0;
            overflow: hidden;
            background-color: rgba(black, 0.7);

            @include tablets {
                height: 520px;
            }
        }

        &__img {
                object-fit: contain;                
            /* object-fit: cover; */
            width: 100%;
            height: 100%;
            /* @include tablets {
                object-fit: contain;                
            } */
        }

        &__author-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
            background-color: $color-white;
            height: 70px;
            overflow: hidden;
        }

        &__avatar {
            margin-right: 10px;
            border-radius: 50%;
            overflow: hidden;
            width: 50px;
            height: 50px;
        }
        
        &__avatar-img {
            object-fit: cover;
            width: 100%;
            height: 100%;
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
            display: none;

            @include tablets {
                display: block;
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
        }

        &__button-likes {

            &_active.button {

                & .button__icon {
                    background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgba(#{$color-white}, 0.95), stroke-width=2px, stroke=rgb(238, 70, 52));
                }
                &:disabled {
                    cursor: wait;
                    background-color: rgba(#{$color-carrot}, 0.8);
                    color: rgba(#{$color-white}, 0.5);

                    .button__icon {
                        background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgba(#{$color-white}, 0.5), stroke-width=2px, stroke=rgb(238, 70, 52));
                    }  
                }
            }

            &:active, &:focus {
                outline: none;
            }
            
        }

        &__desc {
            padding: 10px;
            background-color: $color-white;
            height: 160px;
            overflow: hidden;
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
            }
        }

        &__text-before-hashtag {
            display: inline-block;
            white-space: pre;
        }

        &__hashtag {
            cursor: pointer;
            color: $color-blue;
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            font-weight: bolder;
        }

        &__comments {
            background-color: rgba(f6f6f6, 0.8);
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            background-color: rgb(246, 246, 246);
            border-radius: 0 0 3px 3px;
            /* height: 200px; */
            /* height: calc(100% - 50vh - 160px - 70px); */

            @include tablets {
                height: unset;
            }
        }

        &__comments-topgroup {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 0 10px;
            height: 21px;
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
            width: 80px;
            height: 80px;
            object-fit: cover;
        }

        &__my-comment-info {

            @include tablets {
                flex-grow: 1;
            }
        }

        &__my-comment {
            padding: 0 10px 10px;
            height: 139px;

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
            width: 100%;
            padding: 13px 16px;
            resize: vertical;            
            min-height: 48px;
            max-height: 150px;
            margin-bottom: 10px;
        }

        &__users-comments {
            overflow-y: scroll;
            height: 300px;

            @include tablets {
                height: 200px;
            }
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

        &__info-wrapper {
            position: relative;
        }

        &__text {
            font-family: 'ProximaNova-Light';
            font-size: 16px;
            line-height: 24px;
        }

        &__edited-text {
            position: absolute;
            bottom: 0;
            left: 0;
            top: 18px;
            width: 100%;
            outline: none;
        }
        
        &__error {
            @include error;
            min-height: 24px;

            @include tablets {
                align-self: flex-start;
                /* margin-left: 18px; */
            }
        }

        &__buttons-wrapper {
            display: flex;
            margin-top: 10px;
        }

        &__buttonspace {
            margin-right: 10px;
        }

    }

/* 
    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    } */

</style>