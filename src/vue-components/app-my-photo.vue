<template>    

	<div class="my-photo">
		<div class="my-photo__img-my-photo">

			<img class="my-photo__img" :src="myPhotoObject.photo" alt="photo image">
		
			<div class="my-photo__comments-likes-wrapper">					
				<button type="button" class="my-photo__button my-photo__button_comments">{{myPhotoObject.comments}}</button>
				<button type="button" class="my-photo__button my-photo__button_likes">{{myPhotoObject.likes}}</button>
			</div>
		</div>

		<div class="my-photo__folder">
			<button type="button" class="my-photo__button my-photo__button_edit"></button>
			<div class="my-photo__folder-name"> {{myPhotoObject.photoName}} </div>			
		</div>

	
	</div>


</template>


<script >
    export default {
        props: {
          myPhotoObject: Object,
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

    // @import 'normalize.css';
    // @import '../fonts/fonts.pcss';
    // @import '../styles/mixins.pcss';
    // @import '../styles/layout.pcss';


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

        &__comments-likes-wrapper {
            position: absolute;
            left: 20px;
            bottom: 20px;
            background-color: rgba(#{$color-text}, 0.05);
            box-shadow: 0 0 0 5px rgba(#{$color-text}, 0.1);
        }

        &__button {
            font-family: 'Panton Bold';
            color: $color-white;
            font-size: 16px;
            padding-left: 30px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;

            &_comments {
                background-image: svg-load('comments.svg', fill=rgba(#{$color-white}, 0.9));
            } 
            &_likes {
                background-image: svg-load('heart.svg', fill=rgba(#{$color-white}, 0.9));
            }
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

        
        &__folder {
            text-align: right;	
            padding: 15px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__folder-name {
            padding-left: 30px;
            position: relative;
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
        }
        
    }

</style>