<template>
        
    <div class="big-card">
        <div class="big-card__card">

            <div class="big-card__card-img">
                <img class="big-card__img" :src="cardObject.photo" alt="big card image">
            </div>

            <div class="big-card__author-info">

                <div class="big-card__avatar">
                    <img class="big-card__avatar-img" alt="card avatar" :src="cardObject.urlUserAvatar">
                </div>
                
                <div class="big-card__name">{{cardObject.userName}}</div>

                <div class="big-card__likes">
                    <button type="button" class="big-card__button-likes"
                        @click="plusMyLike()"
                        :class="{'big-card__button-likes_active' : isActiveLike}"
                    >{{cardObject.likes}}</button>
                </div>

            </div>

            <div class="big-card__desc">

                <h3 class="big-card__title">{{cardObject.title}}</h3>
            
                <div class="big-card__desc-text">{{cardObject.desc}}</div>

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
                            <img class="big-card__my-comment-avatar" :src="userAvatarUrl" alt="my avatar">
                        </div>
                        <div class="big-card__my-comment-info">
                            
                        <div class="big-card__my-comment-name">{{userName}}</div>
                    
                        <form class="big-card__my-comment-form">

                            <textarea class="big-card__my-comment-input" name="" id="" cols="10" rows="1" placeholder="Добавить комментарий"></textarea>
                            <div class="big-card__my-comment-submit">
                                <button class="site-button site-button_theme-light" type="submit">Добавить</button>
                            </div>

                        </form>
                        </div>
                </div>

                <div class="big-card__users-comments">

                    <ul class="users-comments">
                        <li
                            v-for="comment in filteredComments" :key="comment.id"
                        class="users-comments__item">

                            <div class="users-comments__avatar-wrapper">
                                <img class="users-comments__avatar" :src="comment.urlUserAvatar" alt="Avatar of comment's author">
                            </div>
                            <div class="users-comments__info-wrapper">
                                <div class="users-comments__author">{{comment.userName}}</div>
                                <div class="users-comments__text">{{comment.text}}</div>
                            </div>

                        </li>
                    </ul>

                </div>

            </div> 
        </div>
    </div>

</template>



<script >

    import dataJSON_comments from '../json/comments.json';
    import dataJSON_users from '../json/users.json';

    export default {
        props: {
            cardObject: Object,
            userId: Number,
        },


        data() {
          return {
            userAvatarUrl: require('../img/anton.png').default,
            userName: "Антон Черепов",
            comments: dataJSON_comments,
            users: dataJSON_users,
            isActiveLike: this.cardObject.isLikedByMe,

            isVisibleMyComment: true,
          }

        },

        
        computed: {
            filteredComments() {
                let commentsForThisCard = [];

                this.comments.map(comment => { 
                    if (comment.photoId === this.cardObject.id)
                    {                        
                        let thisUser = this.users.find(user => user.id === comment.userId);
                        comment.urlUserAvatar = thisUser.urlUserAvatar;
                        comment.userName = thisUser.userName;
                        commentsForThisCard.push(comment);
                    }
                });                
                
                return commentsForThisCard;
            },

            myCommentToggler() {
                return this.$refs['my-comment-toggler'];
            },

        },

        methods: {
            plusMyLike() {
                this.isActiveLike = !this.isActiveLike;
                if (this.isActiveLike) this.cardObject.likes++;
                else this.cardObject.likes--;
                // запись в cards значения  this.cardObject.likes !!!!!
            },
            myCommentVisibleHandle() {
                this.isVisibleMyComment=!this.isVisibleMyComment;
                if (this.isVisibleMyComment)
                    this.myCommentToggler.style.transform = 'rotate(90deg)';
                else
                    this.myCommentToggler.style.transform = 'rotate(270deg)';
            },
            upgradeCardObject() {
                let thisUser = this.users.find(user => user.id === this.userId);
                this.cardObject.userName = thisUser.userName;
                this.cardObject.urlUserAvatar = thisUser.urlUserAvatar;
            },
        },

        created() {
            this.upgradeCardObject();            
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

            @include tablets {
                height: 398px;
            }
        }

        &__img {
            object-fit: cover;
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
            font-family: 'Panton-Bold';
            font-size: 16px;
            color: $color-white;
            padding-left: 50px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 18px 50%;
            background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgb(238, 70, 52), stroke-width=2px, stroke=rgba(#{$color-white}, 0.95));

            &_active {
                background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgba(#{$color-white}, 0.95), stroke-width=2px, stroke=rgb(238, 70, 52));
            }

            &:active, &:focus {
                outline: none;
            }
        }


        &__desc {
            padding: 10px;
            padding-bottom: 30px;
            background-color: $color-white;
        }

        &__title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
        }

        &__desc-text {
            height: 70px;
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

    }


    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    }

</style>