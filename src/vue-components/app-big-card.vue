<template>    

    <div class="big-card">

        <div class="big-card__close"
            @click="$emit('clickCloseBigCard', cardObject.id, $event)"
        >
            <button class="round-button round-button_close-transparent" type="button"></button>
        </div>

        <div class="big-card__card">

            <div class="big-card__card-img">
                <img class="big-card__img" :src="cardObject.photo" alt="big card image">
            </div>

            <div class="big-card__author-info">

                <div class="big-card__avatar">
                    <img class="big-card__avatar-img" :src="cardObject.authorPhoto" alt="card avatar">
                </div>
                
                <!-- // ПЕРЕДЕЛАТЬ!!!!!!!!!!!! -->
                <div class="big-card__name">{{cardObject.authorName}} 
                    <div class="big-card__surname">{{cardObject.authorSurname}}</div>
                </div>
                
                <div class="big-card__likes">
                    <button type="button" class="big-card__button big-card__button_likes">{{cardObject.likes}}</button>
                </div>

            </div>


            <div class="big-card__desc">

                <h3 class="big-card__title">Путешествие на речном трамвайчике</h3>
            
                <div class="big-card__desc-text">Мы отправились в <span class='site-tag'>#путешествие</span> 2 дня назад, но уже сейчас такое ощущение, что мы посмотрели целый новый мир. Далее будет ещё одно описательное предложение. Возможно оно также будет с <span class='site-tag'>#тегами</span>. </div>

            </div> 

            <div class="big-card__comments">

                <div class="big-card__comments-topgroup">
                    <h4 class="big-card__comments-title">Комментарии</h4>
                    <button type="button" class="big-card__button big-card__button_tick"></button>
                </div>
                
                <div class="big-card__my-comment">

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
                                <img class="users-comments__avatar" :src="comment.authorAvatar" alt="Avatar of comment's author">
                            </div>
                            <div class="users-comments__info-wrapper">
                                <div class="users-comments__author">{{comment.authorName}}</div>
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

    import dataJSON_comments from '../json/comments.json'

    export default {
        props: {
            cardObject: Object,
        },

        data() {
          return {
            userAvatarUrl: require('../img/anton.png').default,
            userName: "Антон Черепов",
            comments: dataJSON_comments,

          }

        },

        
        computed: {
            filteredComments() {
                let commentForThisCard = [];

                this.comments.map(comment => { 
                    if (comment.photoId === this.cardObject.id)
                    commentForThisCard.push(comment);
                });                
                
                return commentForThisCard;
            },

        },

        methods: {

        },
    }
</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/blocks/site-button.pcss';

    .big-card {
        @include popup;
        overflow: unset;

        background-color: rgb(246, 246, 246);
        position: relative;

        &__close {
            position: absolute;
            right: -36px;
            top: -36px;
            z-index: 15;
        }

        &__card {
            overflow: hidden;
            min-width: 300px;
            background-color: $color-white;
            display: flex;
            flex-direction: column;
        }

        &__card-img {
            width: 100%;
            height: 200px;
            position: relative;
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
        }

        &__avatar {
            margin-right: 10px;
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
        }

        &__surname {

            @include tablets {
                display: inline-block;
            }
        }

        &__button {
            font-family: 'Panton-Bold';
            font-size: 16px;
            color: $color-white;
            padding-left: 50px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 18px 50%;

            &_tick {
                background-image: svg-load('arrow_left.svg', fill=rgba(#{$color-text}, 0.2));
                background-position: 50%;
                padding: 0px;
                height: 20px;
                width: 20px;
                background-size: 8px;
                transform: rotate(90deg);
            }

            &_likes {
                background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgb(238, 70, 52), stroke-width=2px, stroke=rgba(#{$color-white}, 0.95));
            }
        }

        &__desc {
            padding: 10px;
            padding-bottom: 30px;
        }

        &__title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
        }


        &__comments {
            background-color: rgba(f6f6f6, 0.8);
            display: flex;
            flex-direction: column;
            padding: 20px 10px;
        }

        &__comments-topgroup {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
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
            padding-bottom: 10px;

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
            max-height: 80vh;
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
        
        &__avatar-wrapper {

            display: none;

            @include tablets {
                display: block;
                width: 80px;
                flex-basis: 80px;
                flex-shrink: 0;
                margin-right: 10px;
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