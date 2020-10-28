<template>    
	<div class="my-photo">
		<div class="my-photo__img-my-photo">

			<img class="my-photo__img" :src="`${url}/${myPhotoObject.photo}`" alt="photo image">
            <div class="my-photo__img-overlay"
                 @click="$emit('click-my-photo', myPhotoObject)"
            ></div>
		
			<div class="my-photo__comments-likes-wrapper">					
				<!-- <div class="my-photo__info-button my-photo__info-button_comments">{{myPhotoObject.commentCount}}</div> -->
				<div class="my-photo__info-button my-photo__info-button_comments">{{myPhotoObject.comments.length}}</div>

				<div class="my-photo__info-button my-photo__info-button_likes">{{myPhotoObject.likeCount}}</div>
				<!--!!!!!!! это расскомментить, как будут готовы лайки <div class="my-photo__info-button my-photo__info-button_likes">{{myPhotoObject.likes.length}}</div> -->
			</div>
		</div>

		<div class="my-photo__name-wrapper">
			<button type="button" class="my-photo__button my-photo__button_edit" v-if="myPhotoObject.author.id==loggedUserObject.id"
                @click="$emit('click-edit-my-photo', myPhotoObject)"
            ></button>
			<div class="my-photo__name"> {{myPhotoObject.title}} </div>			
		</div>

	</div>


</template>


<script >
    import requests from '../requests';
    const basePhotosUrl = requests.defaults.basePhotosUrl;
    
    export default {
        props: {
          myPhotoObject: Object,
          loggedUserObject: Object,
        },

        data() {
          return {
            url: basePhotosUrl,
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

    .my-photo {
        min-width: 300px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        background-color: $color-white;
        border-radius: 3px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        color: $color-text;

        &__img-my-photo {
            width: 100%;
            height: 300px;
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
            z-index: 5;

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

        &__comments-likes-wrapper {
            position: absolute;
            left: 20px;
            bottom: 20px;
            background-color: rgba(50, 50, 50, 0.1);
            box-shadow: 0 0 11px 5px rgba(50,50,50,.1);
        }

        &__info-button {
            font-family: 'Panton Bold';
            color: $color-white;
            font-size: 16px;
            padding-left: 30px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            height: 20px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;

            &_comments {
                background-image: svg-load('comments.svg', fill=rgba(#{$color-white}, 0.9));
            } 
            &_likes {
                background-image: svg-load('heart.svg', fill=rgba(#{$color-white}, 0.9));
            }
        }

        &__button {
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;

            &_edit {
                height: 20px;
                width: 30px;
                background-repeat: no-repeat;
                background-size: 20px;
                background-position: 0 50%;
                
                background-image: svg-load('edit.svg', fill=rgba(#{$color-text}, 0.2));

                &:hover {
                    background-image: svg-load('edit.svg', fill=rgba(#{$color-text}, 0.8));
                }

            }
        }

        
        &__name-wrapper {
            text-align: right;	
            padding: 15px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__name {
            padding-left: 30px;
            position: relative;
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
        }
        
    }

</style>