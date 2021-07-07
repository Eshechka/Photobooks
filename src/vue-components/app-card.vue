<template>    

    <div class="card">
        <div class="card__img-card">
            <img  class="card__img" :src="`${urlPhotos}/${cardObject.photo}`" alt="card image">
            <div class="card__img-overlay"
                @click="$emit('click-card', cardObject.id)"
            ></div>
        </div>

        <div class="card__info">

            <router-link class="card__avatar"
                tag="a"
                :to="'/'+cardObject.author.id"
                :title="`Перейти в профиль пользователя ${cardObject.author.name}`">
                <img class="card__avatar-img" :src="cardObject.author.avatar ? `${urlAvatars}/${cardObject.author.avatar}` : require('../img/no_avatar.png').default" alt="card avatar">
                <div class="card__avatar-overlay"></div>
            </router-link>

            <div class="card__desc">
                <div class="card__desc-title"> {{cardObject.title}} </div>

                <div class="card__signs-wrapper">
                    <div class="card__signs card__signs_comments card__signs_mini">{{cardObject.commentsCount}}</div>
                    <div class="card__signs card__signs_likes card__signs_mini">{{cardObject.likesCount}}</div>
                </div>

            </div>

        </div>

        <div class="card__signs-wrapper card__signs-wrapper_toright">
            <router-link :title="`Нажмите для перехода в альбом ${cardObject.album.title}`" class="card__signs card__signs_name"
                :to="'/album/'+cardObject.album.id"
                @click.prevent
            >
                {{cardObject.album.title}}</router-link>
        </div>

    </div>	


</template>


<script >;
    import { baseStorageUrl } from '../requests.js';    
    export default {
        props: {
          cardObject: Object
        },

        data() {
          return {
                urlAvatars: baseStorageUrl+'/avatars',
                urlPhotos: baseStorageUrl+'/photos',

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
        min-width: 288px;
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
            height: 350px;
            position: relative;

            @include tablets {
                height: 250px;
            }
        }

        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;

            @include tablets {
                object-fit: contain;
            }
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
            flex-shrink: 0;
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
            width: 100%;
            height: 100%;
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

        &__signs-wrapper {
            padding: 10px;
            padding-left: 0;

            &_toright {
                align-self: flex-end;
                padding-left: 10px;
            }	
        }

        &__signs {
                display: inline-block;
                padding-left: 30px;
                color: $color-text;
                background-repeat: no-repeat;
                background-size: 20px;
                background-position: 0 50%;

                font-family: 'Proxima Nova Semibold';
                font-size: 14px;

                &_mini {
                    font-family: 'Panton Bold';
                    font-size: 16px;
                    margin-right: 15px;
                }
            
            &_name {         
                text-decoration: none;       
                background-image: svg-load('album.svg', fill=rgba(#{$color-text}, 0.2));                
            }
            &_comments {
                background-image: svg-load('comments.svg', fill=rgba(#{$color-text}, 0.2));
            } 
            &_likes {
                background-image: svg-load('heart.svg', fill=rgba(#{$color-text}, 0.2));
            }
        }

    }

</style>