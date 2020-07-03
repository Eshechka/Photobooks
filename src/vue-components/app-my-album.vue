<template>    

    <div class="my-album">
        <div class="my-album__img-my-album">
            <img class="my-album__img" :src="myAlbumObject.photo" alt="album image">
        </div>

        
        <div class="my-album__folder">
            <button type="button" class="my-album__button my-album__button_edit"></button>
            <div class="my-album__folder-name"> {{myAlbumObject.folderName}} </div>
        </div>

    </div>		


</template>


<script >
    export default {
        props: {
          myAlbumObject: Object,
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

    /* @import '../styles/blocks/my-album.pcss'; */

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

	&__img-my-album {
		width: 100%;
		height: 300px;
	}

	&__img {
		object-fit: cover;
		width: 100%;
		height: 100%;
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