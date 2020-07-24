<template>    

    <div class="card">
        <div class="card__img-card">
            <img  class="card__img" :src="cardObject.photo" alt="card image">
            <div class="card__img-overlay"
                @click="$emit('clickCard', cardObject.id, $event)"
            ></div>
        </div>

        <div class="card__info">

            <router-link class="card__avatar"
                tag="div"
                :to="'/'+cardObject.authorId"
            >
                <img class="card__avatar-img" :src="cardObject.authorPhoto" alt="card avatar">
                <div class="card__avatar-overlay"></div>
            </router-link>

            <div class="card__desc">
                <div class="card__desc-title"> {{cardObject.title}} </div>
                <div class="card__comments-likes-wrapper">					
                    <button type="button" class="card__button card__button_comments">{{cardObject.comments}}</button>
                    <button type="button" class="card__button card__button_likes">{{cardObject.likes}}</button>
                </div>
            </div>

        </div>

        <div class="card__folder">
            <div class="card__folder-name">{{cardObject.albumName}}</div>
        </div>

    </div>	


</template>


<script >
    export default {
        props: {
          cardObject: Object,
        },

        data() {
          return {
            
          }
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

    .card {
        min-width: 300px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        background-color: rgb(246, 246, 246);
        border-radius: 3px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        color: $color-text;

        &__img-card {
            width: 100%;
            height: 200px;
            position: relative;
        }

        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__img-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
            background-color: $color-text;
            opacity: 0;

            &::after {
                content: '';
                position: absolute;
                width: 40px;
                height: 40px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-repeat: no-repeat;
                background-size: 40px;
                background-position: 0 50%;
                background-image: svg-load('loupe.svg', fill=$color-white);
            }

            &:hover {
                opacity: 0.9;
            }
        }
        
        &__info {
            display: flex;
            padding: 10px;
            background-color: $color-white;
        }

        &__avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
        }

        &__avatar-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
            background-color: $color-text;
            border-radius: 50%;
            opacity: 0;

            &::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-repeat: no-repeat;
                background-size: 20px;
                background-position: 0 50%;
                background-image: svg-load('more.svg', fill=$color-white);
            }

            &:hover {
                opacity: 0.9;
            }
        }

        &__avatar-img {
            object-fit: cover;
        }
        &__desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;	
        }
        &__desc-title {
            font-family: 'ProximaNova-Light';
            font-size: 14px;
        }
        &__button {
            font-family: 'Panton Bold';
            font-size: 16px;
            color: $color-text;
            padding-left: 30px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;

            &_comments {
                background-image: svg-load('comments.svg', fill=rgba(#{$color-text}, 0.2));
            } 
            &_likes {
                background-image: svg-load('heart.svg', fill=rgba(#{$color-text}, 0.2));
            }
        }

        &__folder {
            text-align: right;	
            padding: 10px;		
        }

        &__folder-name {
            display: inline-block;
            padding-left: 30px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;
            
            background-image: svg-load('album.svg', fill=rgba(#{$color-text}, 0.2));
            
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
        }

    }

</style>