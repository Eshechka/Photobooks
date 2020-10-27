<template>
    <div class="wrapper">
        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigMyPhoto || openEditPhoto || openAddPhoto"
            @click="openBigMyPhoto = openEditPhoto = openAddPhoto = false"
        ></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"
            @click="openEditHeader = false"
        ></div>

		<header class="header" :style="{ backgroundImage: `url(${urlPhotos}/${currentAlbumObject.preview})` }">
	
			<div class="header__container"
                ref='header-container'>

                <div class="header__button-edit" v-if="currentAlbumObject.author.id==loggedUserObject.id">
                    <button type='button' class="button button_icon_space button_size_changing button_theme_color_changing"
                        @click="openEditHeader=true">
                        <span class="button__text">Редактировать</span>
                        <span class="button__icon button__icon_edit"></span>
                    </button>
                    <!-- <button type='button' class="round-button round-button_edit" -->
                        <!-- @click="openEditHeader=true"                        
                    >Редактировать</button> -->
                </div>
                <div class="header__button-home" v-if="currentAlbumObject.author.id!==loggedUserObject.id"
                    :class="{'header__button-home_scrolled' : isScrolledHeader}">
                    <router-link class="button button_icon_space button_size_changing button_theme_color_changing"
                        to="/"
                        @click.prevent>
                        <span class="button__text">На главную</span>
                        <span class="button__icon button__icon_home"></span>
                    </router-link>
                    <!-- <router-link class="round-button round-button_home"
                        to="/"
                        @click.prevent
                    >На главную                    
                    </router-link> -->
                </div>


					<div class="header__user" :class="{header__user_scrolled : isScrolledHeader}">
						<div class="header__avatar">
							<div class="avatar">
								<img class="avatar__img" :src='`${urlAvatars}/${currentAlbumObject.author.avatar}`' alt="avatar">
							</div>
						</div>
						<h1 class="header__title" v-if="isScrolledHeader"> {{currentAlbumObject.title}} </h1>
                        
						<h1 class="header__title" v-else> {{currentAlbumObject.author.name}} </h1>

					</div>

					<div class="header__album-desc">
						<h2 class="header__album-title"> {{currentAlbumObject.title}} </h2>
                        
						<div class="header__text"> {{currentAlbumObject.description}} </div>
					</div>
			</div>

            <div class="header__album-info">
                <div class="header__album-info-wrapper">					
                    <div class="header__info-button header__info-button_photos"> {{+thisAlbumPhotos.length}} </div>
                    <div class="header__info-button header__info-button_likes"> {{+thisAlbumPhotos.reduce((sum, myPhoto) => sum + myPhoto.likeCount, 0)}} </div>
                    <div class="header__info-button header__info-button_comments"> {{+thisAlbumPhotos.reduce((sum, myPhoto) => sum + myPhoto.commentCount, 0)}} </div>
                </div>
            </div>
            
            <div class="header__edit-header" v-if="openEditHeader">

                <div class="edit-header">

                    <div class="edit-header__card">
                    
                            <div class="edit-header__user">
                                    <img class="edit-header__user-img" :src="`${urlAvatars}/${currentAlbumObject.author.avatar}`" alt="avatar image">
                                    <div class="edit-header__user-name">{{currentAlbumObject.author.name}}</div>
                            </div>

                        <div class="edit-header__form">                            

                            <form class="form-edit-header">

                                <label class="form-edit-header__label">
                                    <input class="form-edit-header__input" type="text" placeholder="Антон Черепов">
                                </label>


                                <label class="form-edit-header__label">
                                    <textarea class="form-edit-header__input form-edit-header__input_textarea" cols="20" rows="2" placeholder="Описание альбома"></textarea>
                                </label>


                                <div class="form-edit-header__load-cover">

                                    <label for="load-bgcover-header" class="form-edit-header__label form-edit-header__label_file-load">
                                        <input type="file" id="load-bgcover-header" class="form-edit-header__input-load">
                                        <div class="form-edit-header__cover-img"></div>
                                        <div class="form-edit-header__cover-img-text">Изменить фон</div>
                                    </label>

                                </div>

                                
                                <div class="form-edit-header__buttons">
                                    <!-- <button class="site-button" type="submit">Сохранить</button>
                                    <button class="site-button site-button_theme-just-text" type="button"-->
                                    <button class="button button_size_m" type="submit">Сохранить</button>
                                    <button class="button button_size_m button_theme_minimalizm" type="button"
                                        @click="openEditHeader=false"
                                    >Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>

                </div>

            </div>

		</header>
	
        <main class="maincontent">

            <section class="my-photos">
                <div class="my-photos__container">

                    <div class="my-photos__topgroup">
                        <div class="my-photos__button-plus">
                            <button class="button button_icon_expand button_size_s button_theme_pale"
                                @click="openAddPhoto=true">
                                <span class="button__icon button__icon_plus"></span>
                            </button>
                            <!-- <button class="round-button round-button_plus"
                                @click="openAddPhoto=true"
                            ></button> -->
                        </div>
                    </div>
        
                    <ul class="my-photos__photos-list">
                        
                        <li v-for="myPhoto in thisAlbumPhotos" :key="myPhoto.id" class="my-photos__photos-item" >
                            <appMyPhoto 
                                :myPhotoObject="myPhoto"
                                @click-edit-my-photo="editMyPhotoHandler"
                                @click-my-photo="clickMyPhotoHandler"
                            ></appMyPhoto>
                        </li>


                        <div class="my-photos__edit-photo" v-if="openEditPhoto">
                            
                            <div class="edit-photo">
                                <div class="edit-photo__card">

                                    <div class="edit-photo__topgroup">
                                        <h4 class="edit-photo__title">Редактировать фотографию</h4>

                                        <!-- <button type="button" class="edit-photo__button edit-photo__button_close" -->
                                        <button type="button" class="button button_icon button_size_s button_theme_minimalizm"
                                            @click="openEditPhoto=false" >
                                            <span class="button__icon button__icon_close"></span>
                                        </button>
                                    </div>
                                    
                                    <div class="edit-photo__form">

                                        <form class="form-editPhoto"
                                            @submit.prevent="saveChangePhotoHandler"
                                        >

                                            <label class="form-editPhoto__label">Название
                                                <input class="form-editPhoto__input" type="text" placeholder="Название фотографии"
                                                v-model="changedPhoto.title">
                                            </label>

                                            <label class="form-editPhoto__label">Описание
                                                <textarea class="form-editPhoto__input form-editPhoto__input_textarea" cols="10" rows="2" placeholder="Описание фотографии"
                                                    v-model="changedPhoto.description"
                                                ></textarea>

                                                
                                                    <!-- v-if="checkForm && $v.albumObject.desc.$invalid" -->
                                                <div class="form-editPhoto__error form-editPhoto__error_desc-text"
                                                    v-if="$v.albumObject.desc.$invalid"
                                                >
                                                    <span
                                                        v-if="!$v.albumObject.desc.maxLength"
                                                    >Максимум символов в описании: {{ $v.albumObject.desc.$params.maxLength.max }}</span>
                                                </div>
                                            </label>
                                    
                                            <div class="form-editPhoto__buttons">
                                                <!-- <button class="site-button" type="submit">Сохранить</button> -->
                                                <!-- <button class="site-button site-button_theme-just-text" type="button" -->
                                                <button class="button button_size_m form-editPhoto__buttonspace" type="submit">Сохранить</button>
                                                <button class="button button_size_m button_theme_minimalizm" type="button"
                                                    @click="openEditPhoto=false"
                                                >Отменить</button>
                                                <!-- <button class="round-button round-button_delete" type="button"
                                                    @click.prevent="deletePhotoHandle"
                                                >Удалить</button> -->
                                                <button class="button button_icon button_size_m button_theme_carrot form-editPhoto__in" type="button"
                                                    @click.prevent="deletePhotoHandle">
                                                    <span class="button__text">Удалить</span>
                                                    <span class="button__icon button__icon_delete"></span>                                        
                                                </button>
                                            </div>

                                        </form>
                                    </div>      

                                </div>
                            </div>

                        </div>

                        
                        <div class="my-photos__add-photo" v-if="openAddPhoto">
                            
                            <div class="add-photo">
                                <div class="add-photo__card">

                                    <div class="add-photo__topgroup">
                                        <h4 class="add-photo__title">Добавить фотографии</h4>
                                        <!-- <button type="button" class="add-photo__button add-photo__button_close"
                                            @click="openAddPhoto=false"
                                        ></button> -->
                                        <button type="button" class="button button_icon button_size_s button_theme_minimalizm"
                                            @click="openAddPhoto=false">
                                            <span class="button__icon button__icon_close"></span>
                                        </button>
                                    </div>
                                    
                                    <div class="add-photo__form">
                                        <form class="form-addPhoto"
                                         @submit.prevent='addPhotoHandler'>

                                            <div class="form-addPhoto__album-name-label">Название
                                                <span class="form-addPhoto__album-name" type="text"> {{currentAlbumObject.title}} </span>
                                            </div>

                                            <div class="form-addPhoto__load-cover">

                                                <div class="form-addPhoto__added-photos" v-if="isPhotosLoaded">
                                                    <ul class="added-photos">
                                                        <li class="added-photos__item" 
                                                            v-for="photo in renderedPhotos" :key="photo.id"
                                                            :style="{ backgroundImage : `url(${photo.pic})` }">
                                                                                                          
                                                            <button class="round-button round-button_close"
                                                                @click.prevent="removeRenderedPhotoHandler(photo)"
                                                            ></button>
                                                        </li>

                                                    </ul>
                                                </div>

                                                <label for="load-photo" class="form-addPhoto__label form-addPhoto__label_file-load" v-if="openAddPhoto && !isPhotosLoaded">
                                                    <input type="file" id="load-photo" multiple="multiple" class="form-addPhoto__input-load"
                                                        @change='loadPhotosFiles'
                                                    >
                                                    <div class="form-addPhoto__load-photo-img"></div>                                                

                                                    <div class="form-addPhoto__load-photo-text-button">
                                                        Выберите файл
                                                    </div>
                                                    <div class="form-addPhoto__load-photo-text">
                                                        <span class="form-addPhoto__load-photo-drag-text">Перетащите фото сюда или </span>
                                                        выберите файл
                                                    </div>

                                                </label>

                                            </div>
                                    
                                            <div class="form-addPhoto__buttons">
                                                <!-- <button class="site-button" type="submit">Сохранить</button>
                                                <button class="site-button site-button_theme-just-text" type="button" -->
                                                <button class="button button_size_m form-addPhoto__buttonspace" type="submit">Сохранить</button>
                                                <button class="button button_size_m button_theme_minimalizm" type="button"
                                                    @click="openAddPhoto=false"
                                                >Отменить</button>
                                            </div>

                                        </form>
                                    </div>      

                                </div>
                            </div>


                        </div>

                    </ul>
                </div>
                

                <div class="my-photos__big-card-slider" v-if="openBigMyPhoto"
                    :style="{top : bigCardSliderTop+'px'}">

                    <div class="big-card-slider">

                        <flickity ref="flickity" :options="flickityOptions" class="big-card-slider__container">
                            <appBigCard v-for="bigCard in thisAlbumPhotos" :key="bigCard.id"
                                :cardObject="bigCard"
                                :loggedUserObject="loggedUserObject"
                            ></appBigCard>                            
                        </flickity>

                        <div class="big-card-slider__close">
                            <!-- !!!!!!!!!!!!! что-то одно из этого надо оставить -->
                            <!-- <button class="round-button round-button_close-transparent" type="button"
                                @click="openBigMyPhoto=false"
                            ></button> -->
                            <button class="button button_icon button_size_s button_theme_pale" type="button"
                                @click="openBigMyPhoto=false">
                                <span class="button__icon button__icon_close"></span>
                                </button>
                        </div>

                        <button type="button" class="big-card-slider__control big-card-slider__control_prev"
                            @click="previous()"
                        ></button>
                        <button type="button" class="big-card-slider__control big-card-slider__control_next"
                            @click="next()"
                        ></button>

                    </div>
                </div>

            </section>
            
        </main>
	
		<footer class="footer" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${urlPhotos}/${currentAlbumObject.preview})`}" >
	
			<div class="footer__container">	
	
				<div class="footer__button-up">
                    <button class="button button_size_s button_icon button_theme_pale"
                        @click="scrollToTop">
                        <span class="button__icon button__icon_up"></span>
                    </button>
				</div>
				<div class="footer__desc">
					Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
				</div>
				<div class="footer__copyright">
                    2020 | Создано командой профессионалов: <a target="_blank" href="https://vk.com/id594716031">Lidia</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://xeniaweb.ch/">XeniaWeb</a>
				</div>
	
			</div>
		</footer>

    </div>
</template>


<script>
    import dataJSON_users from '../json/users.json';

    import appMyPhoto from '../vue-components/app-my-photo.vue';
    import appBigCard from '../vue-components/app-big-card.vue';    
    
    import Flickity from 'vue-flickity';

    import { maxLength } from 'vuelidate/lib/validators';

    import { mapState, mapActions } from 'vuex';

    import axios from '../requests.js';
    const baseUrl = `https://xeniaweb.online/storage`;

    const renderer = file => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            try {
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            } catch (error) {
                throw new Error("Ошибка при чтении файла");
            }
        });
    }

    export default {

        components: {
            appBigCard,
            Flickity, 
            appMyPhoto,
        },

        data() {
            return {
                urlPhotos: baseUrl+'/photos',
                urlAvatars: baseUrl+'/avatars',
                users: dataJSON_users,

                openEditPhoto: false,
                openAddPhoto: false,
                openEditHeader: false,
                openBigMyPhoto: false,

                isScrolledHeader: false,
                isPhotosLoaded: false,

                idCurrentClickedPhoto: 0,

                loadedPhotos: [],
                renderedPhotos: [],

                bigCardSliderTop: 0,

                flickityOptions: {
                    prevNextButtons: false,
                    pageDots: false,
                    wrapAround: true,
                    freeScroll: false,
                    groupCells: true,
                    contain: true
                },

                // loggedUserObject: {
                //     id: Number,
                //     author: {
                //         avatar: '',
                //     },
                // }, 
                loggedUserObject: {
                    id: Number,
                    // cover: '',
                    // userSocials: [],
                },  

                currentAlbumObject: {
                    author: {},
                    photos: {},
                },

                changedPhoto: {                    
                    title: '',
                    description: ''
                },

                addedPhotos: [],
                
            }
        },

        computed: {          
            ...mapState('cards', {
                allCards: state => state.currentAlbumCards
            }),                        
            ...mapState('albums', {
                currentAlbum: state => state.currentAlbum
            }),
            ...mapState('user', {
                loggeduser: state => state.user
            }),

            thisAlbumPhotos() {
                return this.allCards.sort( (a, b) => b.id - a.id );
            },

            headerContainer() {
                return this.$refs['header-container'];
            },
            
        },

        validations: {

            albumObject: {
                desc: {
                    maxLength: maxLength(600),
                },
            },
        },
            
        watch: {
            allCards() {
                if (this.$refs.flickity) this.$nextTick(this.$refs.flickity.rerender);
            }

        },

        methods: {
            ...mapActions('cards', ['addCard', 'deleteCard', 'changeCard', 'refreshAlbumCards']),
            // ...mapActions('albums', ['addAlbum', 'deleteAlbum', 'changeAlbum', 'refreshThisAlbum']),
            ...mapActions('albums', ['refreshThisAlbum']),

            removeRenderedPhotoHandler(photo) {
                console.log('I want to remove this photo:', photo);
            },

            async updateLoggedUser() {
                this.loggedUserObject = {...this.loggeduser};
            },

            loadPhotosFiles(e) {
                let id=0;
                let photosAmount = e.target.files.length;

                for (let i=0; i<photosAmount; i++) {
                    this.loadedPhotos.push(e.target.files[i]);
                    this.renderedPhotos.push({pic: '', id: i,});
                }

                this.loadedPhotos.forEach(photo => {

                    renderer(photo).then(pic => {
                        
                        this.renderedPhotos[id].pic = pic;
                        this.renderedPhotos[id].id = id;
                        id++;
                    
                        if (id === photosAmount) this.isPhotosLoaded = !this.isPhotosLoaded;
                    })                    
                });

            },

            editMyPhotoHandler(myPhotoObject) {
                this.openEditPhoto=true;
                this.changedPhoto = {...myPhotoObject};
                console.log('this.changedPhoto.photo', this.changedPhoto.photo);
                console.log('this.changedPhoto', this.changedPhoto);
            },

            clickMyPhotoHandler(myPhotoObject) {
                this.bigCardSliderTop = window.pageYOffset + 100;
                let photoIndex = 0;
                
                this.thisAlbumPhotos.find(photo => {
                    if (photo.id !== myPhotoObject.id) photoIndex++;
                    else this.idCurrentClickedPhoto = photoIndex;
                });                
                this.flickityOptions.initialIndex = this.idCurrentClickedPhoto;
                this.openBigMyPhoto = true;
            },

            async saveChangePhotoHandler() {                  
                try {
                    let newPhotoData = {};
                    newPhotoData.id = this.changedPhoto.id;
                    newPhotoData.description = this.changedPhoto.description;
                    newPhotoData.title = this.changedPhoto.title;
                    await this.changeCard(newPhotoData);
                }
                catch(error) { 
                    console.log('error');
                    throw new Error ( error.response.data.error || error.response.data.message ); 
                }
                finally {
                    this.openEditPhoto = false;
                }
            },

            async deletePhotoHandle() {                  
                try {
                    await this.deleteCard(this.changedPhoto.id);
                    }
                catch(error) { 
                    throw new Error ( error.response.data.error || error.response.data.message ); 
                }
                finally {
                    this.openEditPhoto = false;
                }
            },

            addPhotoHandler() {

                if (this.renderedPhotos.length) {
                    this.loadedPhotos.forEach(async photo => {

                        const formData = new FormData();

                        formData.append('photo', photo);
                        formData.append('title', 'это обязательное поле?');
                        formData.append('description', 'это обязательное поле? это обязательное поле? это обязательное поле?');
                        formData.append('commentCount', 0);
                        formData.append('likeCount', 0);
                        formData.append('isLikedByMe', 0);
                        formData.append('authorId', this.currentAlbumObject.author.id);
                        formData.append('albumId', this.currentAlbumObject.id);

                        await this.addCard(formData);

                        this.isPhotosLoaded = false;
                        this.renderedPhotos = [];
                        this.openAddPhoto=false;
                    })
                }
                else
                    console.log('no files');//!!!!!!! validation
            },

            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 

            scrollHandle() {
                if (this.headerContainer) {
                    let headerContainerStyles = getComputedStyle(this.headerContainer);
                    let scrollStart = parseFloat(headerContainerStyles.height);
                    this.headerContainer.style.minHeight = scrollStart+'px';
                        if (pageYOffset >= scrollStart) {
                            this.isScrolledHeader = true;
                        }
                        else {
                            this.isScrolledHeader = false;
                        }
                }
                    
            },

            next() {
                this.$refs.flickity.next();
            },
                
            previous() {
                this.$refs.flickity.previous();
            }
        },

        async created () {
            await this.updateLoggedUser();
            await this.refreshAlbumCards(this.$route.params.albumid);
            // try {
            //     this.currentAlbumObject.author.name = '';
            //     this.currentAlbumObject.author.avatar = 'no_album_cover.jpg';
                await this.refreshThisAlbum(this.$route.params.albumid);
            // }
            // finally {
                this.currentAlbumObject = {...this.currentAlbum};
                this.currentAlbumObject.preview = this.currentAlbumObject.preview ? this.currentAlbumObject.preview : 'img/no_album_cover.jpg';
            // }

        },

        mounted() {
            window.addEventListener('scroll', this.scrollHandle);
            this.loggedUserObject.id = localStorage.getItem('userId');
        }

    }

</script>


<style scoped lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/common/site-button.pcss';


    .header {
        background-image: url('/img/no_album_cover.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        padding-bottom: 45px;
        min-width: 320px;
        min-height: 230px;
        color: $color-white;
        position: relative;


        &__container {
            padding: 20px 0;
            margin: 0 auto;
            width: 90%;
            position: relative;
            @include max-with-container;
        }

        &__user {
            display: flex;
            align-items: center;
            margin: 0 auto;

            &_scrolled {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                padding: 5px 5%;
                background-color: rgba($color-white, 0.85);
                min-height: 45px;
                color: $color-text;
                overflow: hidden;
                z-index: 15;
            }
        }

        &__button-home {
            position: absolute;
            top: 20px;
            left: 0;
            z-index: 9;

            @include tablets {
                top: 70px;
                right: 0;
                left: unset;
            }

            &_scrolled {
                position: fixed;
                top: 15px;
                right: 5%;
                z-index: 16;
            }
            
        }

        &__button-edit {
            position: absolute;
            top: 20px;
            right: 0;
            z-index: 9;
        }


        &__title {
            display: inline-block;
            vertical-align: middle;
            font-family: 'Panton-Bold';
            font-size: 16px;
            mix-blend-mode: difference;
        }

        &__album-title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
            text-align: center;
            margin-bottom: 10px;
            mix-blend-mode: difference;

            @include tablets {
                font-size: 21px;
            }
        }

        &__text {
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);
            margin-bottom: 18px;
            font-family: 'ProximaNova-Light';
            font-size: 14px;
            line-height: 21px;
            text-align: center;
            mix-blend-mode: difference;


            @include tablets {
                font-size: 16px;
                line-height: 24px;
                width: 85%;
                margin: auto;
            }            
        }

        &__album-info {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba($color-white, 0.8);
            height: 45px;
            padding: 10px;
            overflow: hidden;
        }

        &__album-info-wrapper {
            text-align: center;
        }

        &__info-button {
            display: inline-block;
            text-align: center;
            font-family: 'Panton Bold';
            font-size: 16px;
            color: $color-text;
            padding-left: 30px;
            margin-right: 5px;
    
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

        &__socials {
            text-align: center;		
        }

        &__avatar {
            margin-right: 10px;
            height: 50px;

            @include tablets {
                height: 60px;
            }
        }

        &__edit-header {
            position: absolute;
            top: 0;
            width: 100%;
            min-height: 230px;
            margin: 0;
            z-index: 12;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: linear-gradient(rgba($color-text, 0.95), rgba($color-text, 0.8)), url('/img/bg-main-header.png');
        }
    }

        
    .edit-header {
        width: 100%;        
        min-width: 320px;
        overflow: hidden;

        &__card {
            min-width: 300px;
            display: flex;
            flex-direction: column;
            color: $color-text;
            padding-top: 20px;
        }

        &__user {
            display: flex;
            align-items: center;
            width: 90%;
            margin: 0 auto;
            margin-bottom: 10px;
        }

        &__user-name {
            font-family: 'Panton Bold';
            font-size: 16px;
            color: $color-white;
            margin-left: 18px;
        }
    }

        
    .form-edit-header {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__load-cover {
            width: 90px;
            min-height: 50px;
            margin-bottom: 20px;
            margin-top: 10px;
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
            cursor: pointer;
            opacity: 0;    
            width: 100%;    
            height: 100%;    
            position: absolute;
            top: 0;
            font-size: 0;
        }

        &__input {
            @include popup-input;
            margin-top: 5px;

            &_textarea {
                resize: none;
            }
        }

        /* &__socials {
            margin-top: 20px;
            margin-bottom: 10px;
            width: 88%;
        } */

         &__buttons {
            padding: 10px;
            height: 60px;
            background: $color-white;
            width: 100%;
            text-align: right;
        }
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
            border: 3px solid white;

            @include tablets {
                height: 60px;
                width: 60px;
            }
        }
    }


    .my-photos {
        min-width: 320px;
        padding: 30px 0;
        background: $color-white;
        /* position: relative; */
        min-height: 900px;
        
        &__container {
            margin: 0 auto;
            width: 90%;
            min-width: 300px;
            @include max-with-container;
        }

        &__topgroup {
            position: relative;
        }

        &__button-plus {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9;
        }


        &__photos-list {
            position: relative;

            @include tablets {
                display: flex;
                flex-wrap: wrap;
                /* justify-content: space-between; */
            }
        }

        &__photos-item {
            margin-bottom: 10px;

            @include tablets {
                width: 48%;
                margin-bottom: 20px;

                &:nth-child(2n) {
                    margin-left: 4%;
                }
            }      
            @include desktopHd {
                width: 22%;

                &:nth-child(4n+3) {
                    margin-left: 4%;
                }
            }            
        }

        &__edit-photo, &__add-photo {
            @include fixed-popup-container;
        }

        &__big-card-slider {
            @include popup-container;
            top: 100px;
        }

    }


    .big-card-slider {
        @include popup;
        overflow: unset;
        background-color: transparent;
        position: relative;


        &__close {
            position: absolute;
            right: -36px;
            top: -36px;
            z-index: 15;
        }

        &__control {
            position: absolute;
            display: none;

            @include tablets {
                display: block;
                top: 190px;
                z-index: 15;
                background-repeat: no-repeat;
                background-position: 50%;
                background-image: svg-load('arrow_left.svg', fill=rgba(#a0a09f, 0.99));
                background-size: 15px;
                height: 30px;
                width: 20px;            

                &_prev {
                    left: -25px;
                }
                &_next {
                    right: -25px;
                    transform: rotate(180deg);
                }
            }
        }
    }

    
    .add-album {

        @include popup;

        &__card {
            min-width: 300px;
            background-color: #f2f2f2;
            display: flex;
            flex-direction: column;
        }

        &__topgroup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px;
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 21px;
            line-height: 21px;
        }

        &__button {
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;

            &_close {
                background-image: svg-load('close.svg', fill=rgba(#{$color-text}, 0.4));
            }
        }

    }

    
    .form-addAlbum {
        display: flex;
        flex-direction: column;
        background-color: $color-white;

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 15px 10px 10px;
        }

        &__input {
            @include popup-input;

            margin-top: 5px;

            &_textarea {
                resize: none;
            }
        }

        &__buttons {
            background-color: #f2f2f2;
            padding: 10px;
        }
    }


    .edit-photo {
        @include popup;

        &__card {
            min-width: 300px;
            background-color: #f2f2f2;
            display: flex;
            flex-direction: column;
        }

        &__topgroup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px;
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 21px;
            line-height: 21px;
        }

        &__button {
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;

            &_close {
                background-image: svg-load('close.svg', fill=rgba(#{$color-text}, 0.4));
            }
        }
    }


    .form-editPhoto {
        display: flex;
        flex-direction: column;
        background-color: $color-white;

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 15px 10px 10px;

            @include tablets {
                display: flex;
                align-items: center;
                padding: 15px 20px 10px 50px;
            }
        }

        &__input {
            @include popup-input;

            margin-top: 5px;

            &_textarea {
                resize: none;
                min-height: 120px;
            }
            
            @include tablets {
                margin-left: 15px;
                flex-basis: 90%;
            }
        }

         &__cover {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        &__cover-img-wrapper {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
        }
        &__cover-img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

         &__cover-button {
             margin-left: 18px;
        }

        &__buttons {
            display: flex;
            align-items: center;
            background-color: #f2f2f2;
            padding: 10px;
        }
        
        &__in {
            margin-left: auto;
        }        
        &__buttonspace {
            margin-right: 10px;
        }
    }

    .add-photo {
        @include popup;

        &__card {
            min-width: 300px;
            background-color: #f2f2f2;
            display: flex;
            flex-direction: column;
        }

        &__topgroup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10px;
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 21px;
            line-height: 21px;
        }
/* 
        &__button {
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;

            &_close {
                background-image: svg-load('close.svg', fill=rgba(#{$color-text}, 0.4));
            }
        } */
    }

    .form-addPhoto {
        display: flex;
        flex-direction: column;
        background-color: $color-white;

        &__album-name-label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 30px 10px 20px;
        }

        &__album-name {
            font-family: 'ProximaNova-Light';
            font-size: 14px;
            padding-left: 30px;
        }

        &__load-cover {
            display: flex;
            justify-content: center;
            background-color: #f9f9f9;
            border: 3px dashed #f1f1f1;
            border-radius: 10px;
            margin: 0 10px 10px;
            min-height: 280px;
            max-height: 500px;
            overflow-y: scroll;
            position: relative;

            @include tablets {
                min-height: 330px;
            }

            &:hover .form-addPhoto__load-photo-text-button {

                background-color: $color-blue;
                color: $color-white;
            }
            &:hover .form-addPhoto__load-photo-text {

                @include tablets {
                    color: $color-blue-hover;
                }
            }
        }

        &__label {
            
            &_file-load {
                padding: 10px;
                width: 100%;
                position: relative;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }

        &__input-load {
            cursor: pointer;
            opacity: 0;    
            width: 100%;    
            height: 100%;    
            position: absolute;
            top: 0;
            left: 0;
        }

        &__added-photos {
            width: 100%;
            height: 100%;
        }

        &__load-photo-img {
            height: 32px;
            width: 32px;
            background-repeat: no-repeat;
            background-size: 32px;
            background-position: top center;
            background-image: svg-load('cam.svg', fill=rgba(#{$color-text}, 0.2));
        }

        &__load-photo-drag-text {
            font-family: 'ProximaNova-Light';
            font-size: 16px;
            line-height: 21px;
            color: rgba($color-text, 0.8);
        }

        &__load-photo-text-button {
            font-family: 'Proxima Nova Semibold';
            font-size: 12px;
            text-align: center;
            min-height: 38px;
            max-width: 260px;
            /* margin: auto; */
            padding: 10px 14px;
            border-radius: 30px;
            color: $color-blue;
            background-color: $color-white;
            border: 2px solid $color-blue;

            display: flex;
            flex-direction: row-reverse;
            justify-content: center;

            @include tablets {
                display: none;
            }
        }

        &__load-photo-drag-text {
            display: none;            
            font-family: 'ProximaNova-Light';
            font-size: 16px;
            line-height: 21px;

            @include tablets {
                display: inline;
            }

        }

        &__load-photo-text {
            display: none;

            @include tablets {
                display: inline-block;
                font-family: 'Proxima Nova Semibold';
                font-size: 16px;
                line-height: 21px;
                color: $color-blue;
                /* margin-right: calc(50% - 100px);
                margin-left: calc(50% - 100px);
                text-align: center; */
                width: 200px;
                /* min-height: 38px; */
                /* padding: 0;
                border-radius: 0;
                background-color: transparent;
                border: none; */
            }
        }

        &__buttons {
            background-color: #f1f1f1;
            padding: 10px;
        }

        &__buttonspace {
            margin-right: 10px;
        }
    }

    .added-photos {
        display: flex;     
        flex-wrap: wrap;
        padding: 10px;

        @include tablets {
            padding: 20px;
        }

        &__item {
            position: relative;
            border-radius: 1px;
            background-color: rgb(207, 216, 220);
            width: 59px;
            height: 59px;
            margin-right: 10px;
            margin-bottom: 10px;

            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;

            @include tablets {
                width: 114px;
                height: 114px;
                margin-right: 20px;
                margin-bottom: 20px;                
            }

        }
    }


    .footer {
        background-image: linear-gradient(rgba(black, 0.2), rgba(black, 0.3)), url('/img/no_album_cover.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom center;

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
            width: 90%;
            position: relative;
            @include max-with-container;

            @include tablets {
                flex-direction: row;
                justify-content: space-between;
            }
        }

        &__button-up {
            height: 60px;
            z-index: 9;

            /* width: 100%; */
            @include tablets {
                position: absolute;
                top: 0;
                left: 50%;
            }
        }

        &__desc {
            margin-bottom: 20px;
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);

            @include tablets {
                flex-basis: 40%;
                text-align: left;
            }
        }
        &__copyright {			
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);
            
            @include tablets {
                flex-basis: 40%;
                text-align: right;
            }
        }

    }

 

</style>