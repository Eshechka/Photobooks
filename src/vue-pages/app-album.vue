<template>
    <div class="wrapper">
        <!-- <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigCard || openAddAlbum"></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"></div> -->

		<header class="header header_album">
	
			<div class="header__container">		
	
				<div class="header__user">					
					<div class="header__user">
						<div class="header__avatar">
							<div class="avatar">
								<img class="avatar__img" :src='urlAvatar' alt="avatar">
							</div>
						</div>
						<h1 class="header__title">Антон Черепов</h1>
					</div>
					<div class="header__album-desc">
						<h2 class="header__album-title">Лесные прогулки</h2>
						<div class="header__text">Фотографии природы леса, енотов и оленей. Как прекрасно сойти на дальней станции и пройтись по полю босиком. И чтобы никто не беспокоил бродить влюбленным в тишину. Запах мёда, лесных оленей и енотов будоражит нутро.</div>
					</div>
					<div class="header__album-info">
						<div class="header__album-info-wrapper">					
							<button type="button" class="header__button header__button_photos"> {{myPhotos.length}} </button>
							<button type="button" class="header__button header__button_likes"> {{myPhotos.reduce((sum, myPhoto) => sum + myPhoto.likes, 0)}} </button>
							<button type="button" class="header__button header__button_comments"> {{myPhotos.reduce((sum, myPhoto) => sum + myPhoto.comments, 0)}} </button>
						</div>
					</div>
				</div>

			</div>
		</header>
	

		<section class="my-photos">
			<div class="my-photos__container">
				<div class="my-photos__topgroup">
					<div class="my-photos__button-plus">
						<button class="round-button round-button_plus"></button>
					</div>
				</div>
	
				<ul class="my-photos__photos-list">
                    
					<li class="my-photos__photos-item" v-for="myPhoto in myPhotos" :key="myPhoto.id">
						<appMyPhoto :myPhotoObject="myPhoto">                            
                        </appMyPhoto>
					</li>

				</ul>
			</div>
		</section>
	
		<footer class="footer">
	
			<div class="footer__container">	
	
				<div class="footer__button-up">
					<button class="round-button round-button_up"></button>
				</div>
				<div class="footer__desc">
					Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
				</div>
				<div class="footer__copyright">
					2016 | Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool
				</div>
	
			</div>
		</footer>
    </div>
</template>


<script>
  import appMyPhoto from '../vue-components/app-my-photo.vue'

  export default {   

    components: {
      appMyPhoto,
    },

    data() {
        return {
            // openBigCard: false,
            // openAddAlbum: false,

            urlAvatar: require('../img/anton.png').default,
            // urlInlineSvgSprite: require('../img/spriteIcons.svg').default,


            myPhotos: [
                {   id: 1, photo: '../img/photo-img1.png', comments: 9, likes: 15, folderName: 'Путешествие на лодке по озеру',  },
                {   id: 2, photo: '../img/photo-img2.png', comments: 9, likes: 15, folderName: 'Отдых в палатке',  },
                {   id: 3, photo: '../img/photo-img3.png', comments: 9, likes: 15, folderName: 'Путешествие на лодке по озеру',  },
                {   id: 4, photo: '../img/photo-img4.png', comments: 9, likes: 15, folderName: 'Мечтательный взгляд вдоль поверх...',  },
                {   id: 5, photo: '../img/photo-img5.png', comments: 9, likes: 15, folderName: 'Путешествие на лодке по озеру',  },
            ],
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

    @import '../styles/blocks/site-button.pcss';


    .header {
        background-image: url('/img/bg-main-header.png');
        background-repeat: no-repeat;
        background-size: cover;

        min-width: 320px;
        min-height: 210px;   

        color: $color-white;

        position: relative;


        &__container {
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 95%;
        }

        &__top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 21px;
        }

        &__text {
            font-family: 'ProximaNova-Light';
            text-align: center;
            font-size: 14px;
            color: rgba(#{$color-white}, 0.8);
            margin-bottom: 18px;
        }

        &__socials {
            text-align: center;		
        }

        &__avatar {
            display: inline-block;		
            vertical-align: middle;
        }

        &__edit-profile {
            @include popup-container;
        }

        &__edit-header {
            position: relative;
            /* top: 0; */ 
            width: 100%;
            min-height: 210px;
            margin: 0;
            /* bottom: 0; */
            z-index: 12;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: linear-gradient(rgba($color-text, 0.95), rgba($color-text, 0.8)), url('/img/bg-main-header.png');
        }

        // ---------------------
        &_album {

            position: relative;
            padding-bottom: 45px;

            .header__title {
                display: inline-block;
                vertical-align: middle;
                font-family: 'Panton-Bold';
                font-size: 16px;
            }

            .header__album-title {
                font-family: 'ProximaNova Semibold';
                font-size: 18px;
                line-height: 24px;
                text-align: center;
                margin-bottom: 10px;
            }
            .header__text {
                font-family: 'ProximaNova-Light';
                font-size: 14px;
                line-height: 21px;
                text-align: center;
            }
            .header__album-info {
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                background-color: rgba($color-white, 0.8);
                height: 45px;
                padding: 10px;
                overflow: hidden;
            }
            .header__album-info-wrapper {
                text-align: center;
            }

            .header__button {
                text-align: center;
                font-family: 'Panton Bold';
                font-size: 16px;
                color: $color-text;
                padding-left: 30px;
        
                background-repeat: no-repeat;
                background-size: 20px;
                background-position: 0 50%;

                &_comments {
                    background-image: svg-load('comments.svg', fill=rgba(#{$color-text}, 0.9));
                }
                &_likes {
                    background-image: svg-load('heart.svg', fill=rgba(#{$color-text}, 0.9));
                }
                &_photos {
                    background-image: svg-load('cam.svg', fill=rgba(#{$color-text}, 0.9));
                }
            }


        }
        // ---------------------
    }

    .avatar {
        width: 100%;
        text-align: center;

        &__img {
            margin: 0 auto;
            margin-bottom: 10px;
            border-radius: 50%;
            height: 50px;
            width: 50px;		
        }
    }

    .my-photos {
        min-width: 320px;
        padding: 30px 0;
        background: $color-white;
        
        &__container {
            margin: 0 auto;
            width: 90%;
            min-width: 300px;
        }

        &__topgroup {
            position: relative;
        }

        &__button-plus {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
        }

        &__photos-item {
            margin-bottom: 10px;
        }

    }


    /* .edit-header {
        width: 100%;        
        min-width: 320px;
        overflow: hidden;

        &__card {
            min-width: 300px;
            display: flex;
            flex-direction: column;
            color: $color-text;

        }
    } */

        
    /* .form-edit-header {
        display: flex;
        flex-direction: column;
        align-items: center;

         &__load-image {
            padding-top: 20px;
        }

        &__img-wrapper {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
        }

        &__load-cover {
            width: 90px;
            min-height: 50px;
            margin-bottom: 20px;
            margin-top: 10px;
        }

        &__input-load {
            cursor: pointer;
        }

        &__cover-img {
            height: 32px;
            background-repeat: no-repeat;
            background-size: 32px;
            background-position: top center;
            background-image: svg-load('cam.svg', fill=rgba(#{$color-white}, 0.8));
        }

        &__cover-img-text {
            font-family: 'Proxima Nova Semibold';
            font-size: 12px;
            color: rgba(#{$color-white}, 0.8);
            text-align: center;
        }

        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            display: block;
            width: 90%;
            
            &_file-load {
                width: 100%;
                position: relative;
            }
        }

        &__input-load {
            opacity: 0;    
            width: 100%;    
            height: 100%;    
            position: absolute;
            top: 0;
        }

        &__input {
            @include popup-input;
            margin-top: 5px;

            &_textarea {
                resize: none;
            }
        }

        &__socials {
            margin-top: 20px;
            margin-bottom: 10px;
            width: 88%;
        }

         &__buttons {
            padding: 10px;
            height: 60px;
            background: $color-white;
            width: 100%;
            text-align: right;
        }
    } */

/* 
    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    } */


    .footer {
        background-image: url('/img/bg-main-footer.png');
        background-repeat: no-repeat;
        background-size: cover;

        min-width: 320px;
        padding: 15px;

        color: $color-white;
        font-family: 'ProximaNova-Light';
        text-align: center;
        font-size: 14px;
        line-height: 21px;

        &__container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 95%;
        }

        &__button-up {
            height: 60px;
            width: 100%;
        }

        &__desc {
            margin-bottom: 20px;
        }
        &__copyright {			
            color: rgba($color-white, 0.6);
        }

    }

 

</style>