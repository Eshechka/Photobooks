<template>    

    <div class="my-album">
        <div class="my-album__img-my-album">
            <img class="my-album__img" :src="myAlbumObject.photos[myAlbumObject.previewId].photo" alt="album image">
            <div class="my-album__img-overlay"

			>{{myAlbumObject.desc}}</div>
        </div>

        
        <div class="my-album__folder">
            <button type="button" class="my-album__button my-album__button_edit"></button>
            <a :href="'./album.html#/'+myAlbumObject.id" class="my-album__folder-name"> {{myAlbumObject.name}} </a>

        </div>

    </div>		


</template>


<script >

    export default {
        props: {
          myAlbumObject: Object,
        },

    }
</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    .my-album {
		min-width: 300px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		background-color: $color-white;
		border-radius: 3px;
		box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
		overflow: hidden;

		color: $color-text;

		@include tablets {
			min-width: unset;
		}

		&__img-my-album {
			width: 100%;
			height: 300px;
			position: relative;

			@include tablets {
				height: 224px;
			}
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
			color: $color-white;
			display: flex;
			align-items: flex-end;
			text-align: center;
			padding: 0 10px;


            &:hover {
                opacity: 0.8;
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
			text-decoration: none;
			padding-left: 30px;
			font-family: 'Proxima Nova Semibold';
			font-size: 14px;
		}

		&__button {
			height: 30px;
			width: 30px;
			background-repeat: no-repeat;
			background-size: 20px;
			background-position: 50%;
			

			&_edit {
				background-image: svg-load('edit.svg', fill=rgba(#{$color-text}, 0.2));

				&:hover {
						background-image: svg-load('edit.svg', fill=rgba(#{$color-text}, 0.8));
				}
			}		

		}

	}

</style>