<template>    

    <div class="my-album">
        <router-link :title="`Нажмите для перехода в альбом ${myAlbumObject.title}`" class="my-album__img-my-album"
				tag="div"
				:to="'/album/'+myAlbumObject.id">
			<img class="my-album__img" :src="`${urlPhotos}/${myAlbumObject.preview}`" alt="album image">
            <div class="my-album__img-overlay"
				
			>{{myAlbumObject.description}}</div>
        </router-link>

        
        <div class="my-album__folder">
            <button title="Редактировать альбом" type="button" class="button button_size_s button_icon button_theme_controls"
				v-if="isLoggedUser"
				@click="$emit('click-edit-my-album', myAlbumObject)">
				<span class="button__icon button__icon_edit"></span>
			</button>
			<router-link :title="`Нажмите для перехода в альбом ${myAlbumObject.title}`" class="my-album__folder-name" 
				:to="'/album/'+myAlbumObject.id"
				@click.prevent
			>{{myAlbumObject.title}}</router-link>
        </div>

    </div>		


</template>


<script >
	// import axios from '../requests.js';
	import { baseStorageUrl } from '../requests.js';	
    export default {
        props: {
		  myAlbumObject: Object,
		  isLoggedUser: Boolean,
		},

		data() {
			return {
				urlPhotos: baseStorageUrl+'/photos',
			}
		},
		methods: {
			getPreviewUrl() {
				if (!this.myAlbumObject.preview)
					console.log('No preview');
			},
		},
		
    }
</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    .my-album {
		min-width: 288px;
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
			@include desktop {
				height: 300px;
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
			min-height: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__folder-name {
			text-decoration: none;
			padding-left: 30px;
			font-family: 'Proxima Nova Semibold';
			font-size: 14px;
			max-height: 30px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		/* &__button {
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

		} */

	}

</style>