<template>
    <div class="wrapper">
        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigMyPhoto || openAddPhoto"
            @click="openBigMyPhoto = openAddPhoto = false"
        ></div>
        <div class="wrapper__overlay wrapper__overlay_black-z" v-if="openEditPhoto || openConfirmDeletePhoto"
            @click="openEditPhoto = openConfirmDeletePhoto = false"
        ></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"
            @click="openEditHeader = false"
        ></div>


		<header class="header" ref="header" :style="{ backgroundImage: currentAlbumObject.preview ? `url(${urlPhotos}/${currentAlbumObject.preview})` : '' }">
	
			<div class="header__container" ref="header-container">

                <div class="header__button-home" 
                    :class="{'header__button-home_scrolled' : isScrolledHeader}">
                    <router-link title="Перейти на главную" class="button button_icon_space button_size_changing button_theme_color_changing"
                        to="/"
                        @click.prevent>
                        <span class="button__text">На главную</span>
                        <span class="button__icon button__icon_home"></span>
                    </router-link>
                </div>
                <div class="header__button-edit" v-if="currentAlbumObject.author.id==loggedUserObject.id">
                    <button type="button" title="Редактировать название и описание альбома" class="button button_icon_space button_size_changing button_theme_color_changing"
                        @click="clickEditAlbumHeader">
                        <span class="button__text">Редактировать</span>
                        <span class="button__icon button__icon_edit"></span>
                    </button>
                </div>


                <div class="header__user" :class="{header__user_scrolled : isScrolledHeader}" v-if="!openBigMyPhoto">
                    <div class="header__avatar">
                        <div class="avatar">
                            <img class="avatar__img" :src='currentAlbumObject.author.avatar ? `${urlAvatars}/${currentAlbumObject.author.avatar}` : require("../img/no_avatar.png").default' alt="avatar">
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
                    <!-- !!!! раскомментить как будут готовы лайки <div class="header__info-button header__info-button_likes"> {{+thisAlbumPhotos.reduce((sum, myPhoto) => sum + myPhoto.likes.length, 0)}} </div> -->
                    <div class="header__info-button header__info-button_comments"> {{commentCount}} </div>
                </div>
            </div>
            
            <div class="header__edit-header" v-if="openEditHeader">

                <div class="edit-header">

                    <div class="edit-header__card">
                    
                            <div class="edit-header__user">
                                <div class="edit-header__user-img-wrapper">                                
                                    <img class="edit-header__user-img" :src='currentAlbumObject.author.avatar ? `${urlAvatars}/${currentAlbumObject.author.avatar}` : require("../img/no_avatar.png").default' alt="avatar image">
                                </div>
                                    <div class="edit-header__user-name">{{currentAlbumObject.author.name}}</div>
                            </div>

                        <div class="edit-header__form">                            

                            <form class="form-edit-header"
                                @submit.prevent="submitChangeAlbumHeaderHandler">

                                <div class="form-edit-header__fields-wrapper">

                                    <label class="form-edit-header__label">
                                        <input class="form-edit-header__input" placeholder="Название альбома"
                                            v-model="changedAlbum.title">
                                    </label>
                                    <div class="form-edit-header__error form-edit-header__error_title">
                                        <span v-if="!$v.changedAlbum.title.maxLength" v-show="$v.changedAlbum.title.$invalid">
                                            Максимум символов в названии: {{ $v.changedAlbum.title.$params.maxLength.max }}
                                        </span>
                                        <span v-else v-show="$v.changedAlbum.title.$invalid">
                                            Обязательно для заполнения
                                        </span>
                                    </div>

                                    <label class="form-edit-header__label">
                                        <textarea class="form-edit-header__input form-edit-header__input_textarea" cols="20" rows="2" placeholder="Описание альбома"
                                            v-model="changedAlbum.description"
                                        ></textarea>
                                    </label>
                                    <div class="form-edit-header__error form-edit-header__error_description">
                                        <span v-if="!$v.changedAlbum.description.minLength" v-show="$v.changedAlbum.description.$invalid">
                                            Минимум символов в описании: {{ $v.changedAlbum.description.$params.minLength.min }}
                                        </span>
                                        <span v-else-if="!$v.changedAlbum.description.maxLength" v-show="$v.changedAlbum.description.$invalid">
                                            Максимум символов в описании: {{ $v.changedAlbum.description.$params.maxLength.max }}
                                        </span>
                                        <span v-else v-show="$v.changedAlbum.description.$invalid">
                                            Обязательно для заполнения
                                        </span>
                                    </div>


                                    <div class="form-edit-header__load-album-preview">

                                        <label for="load-bgcover-header" class="form-edit-header__label form-edit-header__label_file-load">
                                            <input type="file" id="load-bgcover-header" class="form-edit-header__input-load"
                                                @change="loadAlbumPreview">
                                             <div class="form-edit-header__added-photo" v-if="isAlbumPreviewLoaded"                                                
                                                :style="{ backgroundImage : `url(${renderedAlbumPreview})` }">
                                            </div>
                                            <div class="form-edit-header__cover-img-wrapper" v-if="!isAlbumPreviewLoaded">
                                                <img class="form-edit-header__cover-img" alt="preview image"                                                    
                                                    :src="`${urlPhotos}/${currentAlbumObject.preview}`">
                                            </div>
                                            <div class="form-edit-header__cover-img-text">{{previewTitle}}</div>
                                        </label>

                                    </div>
                                </div>

                                
                                <div class="form-edit-header__buttons">
                                    <button class="button button_size_m" type="submit"
                                        :disabled="$v.changedAlbum.$invalid"
                                        :title="$v.changedAlbum.$invalid ? 'Необходимо ввести корректное название и описание альбома' : 'Сохранить изменения' "
                                    >Сохранить</button>
                                    <button class="button button_size_m button_theme_minimalizm" type="button"
                                        @click="cancelChangeAlbumHeaderHandler"
                                    >Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>

                </div>

            </div>

		</header>
	
        <main class="maincontent">

            <section class="my-photos" :style="{ height: heightSectionForSlider }">
                <div class="my-photos__container" v-if="!openBigMyPhoto">

                    <div class="my-photos__topgroup">
                        <div class="my-photos__button-plus" v-if="currentAlbumObject.author.id==loggedUserObject.id">
                            <button title="Добавить фотографии в этот альбом" class="button button_icon_expand button_size_s button_theme_pale"
                                @click="openAddPhoto=true">
                                <span class="button__icon button__icon_plus"></span>
                            </button>
                        </div>
                    </div>
        
                    <ul class="my-photos__photos-list">
                        
                        <li v-for="myPhoto in thisAlbumPhotos" :key="myPhoto.id" class="my-photos__photos-item" >
                            <appMyPhoto 
                                :myPhotoObject="myPhoto"
                                :loggedUserObject="loggedUserObject"
                                @click-edit-my-photo="editMyPhotoHandler"
                                @click-my-photo="clickMyPhotoHandler"
                            ></appMyPhoto>
                        </li>



                    </ul>
                </div>
                        <div class="my-photos__edit-photo" v-if="openEditPhoto">
                            
                            <div class="edit-photo">
                                <div class="edit-photo__card">

                                    <div class="edit-photo__topgroup">
                                        <h4 class="edit-photo__title">Редактировать фотографию</h4>

                                        <button title="Редактировать фотографию" type="button" class="button button_icon button_size_s button_theme_minimalizm"
                                            @click="closeEditPhotoHandler" >
                                            <span class="button__icon button__icon_close"></span>
                                        </button>
                                    </div>
                                    
                                    <div class="edit-photo__form">
                              
                                        <form class="form-editPhoto"
                                            @submit.prevent="saveChangePhotoHandler">

                                            <div class="form-editPhoto__confirmDeletePhoto"
                                                v-if="openConfirmDeletePhoto">

                                                <appUI 
                                                    @yes-ui="confirmDeletePhotoHandle"
                                                    @no-ui="cancelDeletePhotoHandle"
                                                    :textUI="`Подтверждаете удаление?`"
                                                    :yesText="`Да`"
                                                    :noText="`Отмена`"
                                                    :isConfirmation=true>
                                                </appUI>

                                            </div>

                                            <label class="form-editPhoto__label" v-if="!openConfirmDeletePhoto">Название
                                                <input class="form-editPhoto__input" type="text" placeholder="Название фотографии"
                                                v-model="changedPhoto.title">
                                            </label>
                                            <div class="form-editPhoto__error form-editPhoto__error_title" v-if="!openConfirmDeletePhoto">
                                                <span v-show="$v.changedPhoto.title.$invalid">
                                                    Обязательно для заполнения
                                                </span>
                                            </div>

                                            <label class="form-editPhoto__label"  v-if="!openConfirmDeletePhoto">Описание
                                                <textarea class="form-editPhoto__input form-editPhoto__input_textarea" cols="10" rows="2" placeholder="Описание фотографии"
                                                    v-model="changedPhoto.description"
                                                ></textarea>
                                            </label>
                                            <div class="form-editPhoto__error form-editPhoto__error_description" v-if="!openConfirmDeletePhoto">
                                                <span v-if="!$v.changedPhoto.description.minLength" v-show="$v.changedPhoto.description.$invalid">
                                                    Минимум символов в описании: {{ $v.changedPhoto.description.$params.minLength.min }}
                                                </span>
                                                <span v-else-if="!$v.changedPhoto.description.maxLength" v-show="$v.changedPhoto.description.$invalid">
                                                    Максимум символов в описании: {{ $v.changedPhoto.description.$params.maxLength.max }}
                                                </span>
                                                <span v-else v-show="$v.changedPhoto.description.$invalid">
                                                    Обязательно для заполнения
                                                </span>
                                            </div>

                                    
                                            <div class="form-editPhoto__buttons" v-if="!openConfirmDeletePhoto">
                                                <button class="button button_size_m form-editPhoto__buttonspace" type="submit"
                                                    :disabled="$v.changedPhoto.$invalid"
                                                    :title="$v.changedPhoto.$invalid ? 'Необходимо исправить название и описание' : 'Сохранить изменения' "
                                                >Сохранить</button>
                                                <button title="Закрыть форму добавления фотографий без сохранения" class="button button_size_m button_theme_minimalizm" type="button"
                                                    @click="closeEditPhotoHandler"
                                                >Отменить</button>
                                                <button class="button button_icon button_size_s_m button_theme_carrot form-editPhoto__in" type="button"
                                                    :title="isNewPhotosEditing ? `Удалить фотографию из списка загрузки` : 'Удалить фотографию'"
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
                                        <button title="Закрыть форму добавления фотографий без сохранения" type="button" class="button button_icon button_size_s button_theme_minimalizm"
                                            @click="closeAddedPhotosHandler">
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
                                                                                                          
                                                            <button title="Удалить фото из списка загрузки" class="button button_icon button_size_s button_theme_carrot added-photos__close-button"
                                                                @click.prevent="removeRenderedPhotoHandler(photo)">
                                                                <span class="button__icon button__icon_close"></span>
                                                            </button>                                                                                                          
                                                            <button title="Редактировать название и описание фотографии" class="button button_icon button_size_xs button_theme_calm added-photos__edit-button"
                                                                @click.prevent="editRenderedPhotoHandler(photo)">
                                                                <span class="button__icon button__icon_edit"></span>
                                                            </button>                                                                                                          
                                                            <span title="Описание фото успешно сохранено" class="added-photos__valid-sign" v-if="isPhotoValidForSave(photo)"></span>
                                                            <span title="Необходимо добавить название и описание фото" class="added-photos__invalid-sign" v-if="!isPhotoValidForSave(photo)"></span>
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

                                            <div class="form-addPhoto__error form-addPhoto__error_validphotos">
                                                <span v-show="!isAllPhotosValid">
                                                    Необходимо действие: Добавьте название и описание для загружаемых фотографий.
                                                </span>
                                            </div>
                                    
                                            <div class="form-addPhoto__buttons">
                                                <button class="button button_size_m form-addPhoto__buttonspace" type="submit"
                                                    :disabled="!isAllPhotosValid || !renderedPhotos.length"
                                                    :title="titleDisabledBtnAddPhoto"
                                                >Сохранить</button>
                                                <button title="Закрыть форму добавления фотографий без сохранения" class="button button_size_m button_theme_minimalizm" type="button"
                                                    @click="closeAddedPhotosHandler"
                                                >Отменить</button>
                                            </div>

                                        </form>
                                    </div>      

                                </div>
                            </div>


                        </div>
                

                <div class="my-photos__big-card-slider" v-if="openBigMyPhoto"
                    :style="{top : bigCardSliderTop+'px'}">

                    <div class="big-card-slider" >

                        <flickity ref="flickity" :options="flickityOptions" class="big-card-slider__container">
                            <appBigCard v-for="bigCard in thisAlbumPhotos" :key="bigCard.id"
                                :cardObject="bigCard"
                                :loggedUserObject="loggedUserObject"
                                @close-bid-card="closeBigCardHandler"
                            ></appBigCard>                            
                                <!-- @next="next()"
                                @previous="previous()" -->
                        </flickity>

                            <button title="Закрыть слайдер" class="big-card-slider__control big-card-slider__control_close" type="button"
                                @click="clickCloseSlider"
                            ></button>

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
	
		<footer ref='footer' class="footer" :style="{ backgroundImage: currentAlbumObject.preview ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${urlPhotos}/${currentAlbumObject.preview})` : ''}" >
	
			<div class="footer__container">	
	
				<div class="footer__button-up">
                    <button title="Вернуться в начало страницы" class="button button_size_s button_icon_expand button_theme_pale"
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
    import appMyPhoto from '../vue-components/app-my-photo.vue';
    import appBigCard from '../vue-components/app-big-card.vue';    
    import appUI from '../vue-components/app-UI.vue';    
    
    import Flickity from 'vue-flickity';

    import { required, minLength, maxLength } from 'vuelidate/lib/validators';

    import { mapState, mapActions } from 'vuex';

    import renderer from '../renderer.js';

    import axios from '../requests.js';

    import { baseStorageUrl } from '../requests.js';


    export default {

        components: {
            appBigCard,
            appMyPhoto,
            appUI,
            Flickity, 
        },

        data() {
            return {
                urlPhotos: baseStorageUrl+'/photos',
                urlAvatars: baseStorageUrl+'/avatars',
                
                openEditPhoto: false,
                openAddPhoto: false,
                openEditHeader: false,
                openBigMyPhoto: false,
                openConfirmDeletePhoto: false,

                isScrolledHeader: false,

                idCurrentClickedPhoto: 0,

                isPhotosLoaded: false,
                loadedPhotos: [],
                renderedPhotos: [],

                isNewPhotosEditing: false,

                isAllPhotosValid: true,

                isAlbumPreviewLoaded: false,
                loadedAlbumPreview: {},
                renderedAlbumPreview: '',
                previewTitle: 'Изменить превью альбома',
                changedAlbum: {
                    id: Number,
                    description: '',
                    title: '',
                    preview: '',
                },

                bigCardSliderTop: 0,

                flickityOptions: {
                    prevNextButtons: false,
                    pageDots: false,
                    wrapAround: true,
                    freeScroll: false,
                    groupCells: true,
                    contain: true
                },

                loggedUserObject: {
                    id: Number,
                },  

                currentAlbumObject: {
                    author: {},
                    photos: {},
                },

                changedPhoto: {                    
                    title: '',
                    description: ''
                },

                editingNewPhoto: {
                    id: Number,
                    title: '',
                    description: ''
                },

                addedPhotos: [],

                titleDisabledBtnAddPhoto: 'Необходимо добавить фотографии',

                heightHeaderFooterMobile: 0,
                
                heightSectionForSlider: `unset`,
                scrolledWhenSliderOpened: 0,
                // ----- сумма комментариев во всех фотографиях этого альбома
                commentCount: Number,
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
            header() {
                return this.$refs['header'];
            },
            footer() {
                return this.$refs['footer'];
            },

            idCurrentAlbum() {
                return this.$route.params.albumid;
            },            

            isMoile() {
                return window.innerWidth < 768;
            }
            
        },

        validations: {
            changedAlbum: {
                title: {        
                    maxLength: maxLength(100),
                    required
                },
                description: {
                    minLength: minLength(60),
                    maxLength: maxLength(600),
                    required
                },
            },
            changedPhoto: {
                title: {
                    required
                },
                description: {
                    minLength: minLength(60),
                    maxLength: maxLength(600),
                    required
                },
            },

        },
            
        watch: {
            allCards() {
                if (this.$refs.flickity) this.$nextTick(this.$refs.flickity.rerender);
            },
            currentAlbum(value) {
                this.currentAlbumObject = {...value};
            },
            async openBigMyPhoto(value) {
                if (value) {
                    this.heightSectionForSlider = `calc(100vh + 160px + 510px - ${this.heightHeaderFooterMobile}px)`;
                    this.scrolledWhenSliderOpened = window.pageYOffset;
                    window.scrollTo({ top: 0 });
                }
                else {
                    this.heightSectionForSlider = `unset`;
                    while (window.pageYOffset!==this.scrolledWhenSliderOpened) {
                        await window.scrollTo({ top: `${this.scrolledWhenSliderOpened}` });                      
                    }
                    this.commentCount = +this.thisAlbumPhotos.reduce((sum, photo) => sum + photo.comments.length, 0);//!!!!!!! тут потом также должны добавиться лайки
                }
            },

        },

        methods: {
            ...mapActions('cards', ['addCard', 'deleteCard', 'changeCard', 'refreshAlbumCards']),
            ...mapActions('albums', ['changeAlbumWithFiles', 'refreshThisAlbum']),


            // ********* Блок "Добавить фотографии" **********

            // ***** Загрузка фото по change input ******
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
                        photo.title='';
                        photo.id=id;
                        photo.description='';
                        id++;
                    
                        if (id === photosAmount) this.isPhotosLoaded = !this.isPhotosLoaded;
                    })                    
                });
                this.isAllPhotosValid = false;
                this.titleDisabledBtnAddPhoto = 'Для отправки необходимо добавить названия и описания для всех фотографий';
            },

            // ***** Редактирование фото по клику иконки edit ******
            editRenderedPhotoHandler(photo) {
                this.openEditPhoto = true;
                this.isNewPhotosEditing = true;
                this.editingNewPhoto.id = photo.id;

                this.changedPhoto = {...this.loadedPhotos.find(item => item.id == photo.id)};
            },
            
            // ***** Удаление фото по клику иконки close ******
            removeRenderedPhotoHandler(photo) {
                let ndxRemovedRendered = this.renderedPhotos.indexOf(photo, 0);
                let removedRendered = this.renderedPhotos.splice(ndxRemovedRendered, 1);
                let ndxRemovedLoaded = this.loadedPhotos.indexOf(this.loadedPhotos.find(item => item.id == photo.id), 0);
                let removedLoaded = this.loadedPhotos.splice(ndxRemovedLoaded, 1);

                this.isAllPhotosValid = this.loadedPhotos.reduce((total, current) => total && this.isPhotoValidForSave(current), true);

                    if (this.renderedPhotos.length == 0) {
                        this.isPhotosLoaded = !this.isPhotosLoaded;
                        this.isAllPhotosValid = true;
                        this.titleDisabledBtnAddPhoto = '';
                    }
            },

            // ***** Проверка валидности (наличия всех полей) фото для сохранения ******
            isPhotoValidForSave(photo) {
                let loadedPhoto = this.loadedPhotos.find(item => item.id == photo.id);
                let photoTitle = loadedPhoto ? loadedPhoto.title : false;
                let photoDescription = loadedPhoto ? loadedPhoto.description : false;
                let validDescription = photoDescription ? (photoDescription.length >= 60 && photoDescription.length <= 600) : false;
                
                if (photoTitle && photoDescription && validDescription) {
                    return true;
                }
                
                return false;
            },

            // ***** Закрыть форму добавления фото по клику иконки close или кнопки "отменить" ******
            closeAddedPhotosHandler() {
                this.renderedPhotos = [];
                this.loadedPhotos = [];
                this.isPhotosLoaded = false;
                this.openAddPhoto = false;
                this.isNewPhotosEditing = false;
                this.isAllPhotosValid = true;
                this.titleDisabledBtnAddPhoto = '';
            },

            // ***** Сохранение всех фото по клику "сохранить" ******
            addPhotoHandler() {

                if (this.renderedPhotos.length) {

                    if (this.isAllPhotosValid) {
                        this.loadedPhotos.forEach(async photo => {

                            const formData = new FormData();

                            formData.append('photo', photo);
                            formData.append('title', photo.title);
                            formData.append('description', photo.description);
                            formData.append('commentCount', 0);//!!!!! потом поменяй поля, оставь только те, которые останутся в итоге в фотке
                            formData.append('likeCount', 0);//!!!!! потом поменяй поля, оставь только те, которые останутся в итоге в фотке
                            formData.append('isLikedByMe', 0);
                            formData.append('authorId', this.currentAlbumObject.author.id);
                            formData.append('albumId', this.currentAlbumObject.id);

                            await this.addCard(formData);

                            this.isPhotosLoaded = false;
                        });

                    this.isNewPhotosEditing = false;
                    this.renderedPhotos = [];
                    this.loadedPhotos = [];
                    this.openAddPhoto=false;
                    
                    }
                    else {
                        console.log('some files not valide');//!!!!!!! validation
                    }
                    
                }
                else
                    console.log('no files');//!!!!!!! validation
            },



            // ***** Обработка клика "редактировать", пришедшего из компонента my-photo *****
            editMyPhotoHandler(myPhotoObject) {
                this.openEditPhoto=true;
                this.changedPhoto = {...myPhotoObject};
            },


            // ********* Блок "Редактирование шапки в альбоме" **********

            // ***** Обработка клика "редактировать" в шапке альбома *****
            clickEditAlbumHeader() {
                this.changedAlbum = {...this.currentAlbumObject}; 
                this.openEditHeader=true;
            },

            // ***** Обработка файла, загруженного для превью албома *****
            loadAlbumPreview(e) {
                this.loadedAlbumPreview = e.target.files[0];
                renderer(this.loadedAlbumPreview).then(pic => {                 
                    this.renderedAlbumPreview = pic;
                    this.isAlbumPreviewLoaded = true;
                    this.previewTitle = "Выбрать превью альбома";
                });
            },

            // ***** Сохранить внесенные изменения в шапке альбома *****
            async submitChangeAlbumHeaderHandler() {
                const formData = new FormData();
                    if (this.loadedAlbumPreview.name) formData.append('preview', this.loadedAlbumPreview);
                    formData.append('title', this.changedAlbum.title);
                    formData.append('description', this.changedAlbum.description);

                    let changedAlbumId = this.changedAlbum.id;

                await this.changeAlbumWithFiles( {changedAlbum: formData, changedAlbumId: changedAlbumId} );
                await this.refreshThisAlbum(this.idCurrentAlbum);

                this.openEditHeader=false;
            },

            // ***** Выйти из редактирования шапки альбома без сохранения изменений *****
            cancelChangeAlbumHeaderHandler() {
                this.isAlbumPreviewLoaded=false;
                this.previewTitle = "Изменить превью альбома";
                this.changedAlbum= {
                    id: Number,
                    description: '',
                    title: '',
                    preview: '',
                };
                this.openEditHeader=false;
            },



            // ***** Открыть фотографию в слайдере по клику *****
            clickMyPhotoHandler(myPhotoObject) {
                if (!this.isMoile) this.bigCardSliderTop = window.pageYOffset + 50;
                let photoIndex = 0;
                
                this.thisAlbumPhotos.find(photo => {
                    if (photo.id !== myPhotoObject.id) photoIndex++;
                    else this.idCurrentClickedPhoto = photoIndex;
                });                
                this.flickityOptions.initialIndex = this.idCurrentClickedPhoto;
                this.openBigMyPhoto = true;
                
                // window.scrollTo({ top: 0 });
            },

            // ***** Сохранение фото после изменений (2 вида: редактирование по клику на существующей фото и при добавлении новых фото заполнение полей) ******
            async saveChangePhotoHandler() {
                let newPhotoData = {};                
                newPhotoData.description = this.changedPhoto.description;
                newPhotoData.title = this.changedPhoto.title;

                if (this.isNewPhotosEditing) {
                    this.loadedPhotos.map(photo => {
                        if (photo.id == this.editingNewPhoto.id) {
                            Object.assign(photo, newPhotoData);
                        }                       
                    });
                    this.isAllPhotosValid = this.loadedPhotos.reduce((total, current) => total && this.isPhotoValidForSave(current), true);
                }
                else {
                    newPhotoData.id = this.changedPhoto.id;
                    await this.changeCard(newPhotoData);
                    this.changedPhoto = {                    
                        title: '',
                        description: ''
                    };
                }
                this.openEditPhoto = false;
            },

            // ***** Закрыть форму редактирвания/удаления фотографии по клику на крестик или кнопку "отменить" ******
            closeEditPhotoHandler() {
                this.openEditPhoto=false;
                if (this.openConfirmDeletePhoto) this.openConfirmDeletePhoto=false;
            },

            // ***** Закрыть фотографию в слайдере по клику на крестик *****
            closeBigCardHandler() {
                // window.scrollTo({ top: `${this.scrolledWhenSliderOpened}px` });
                this.openBigMyPhoto = false;                
            },

            // *****  Начать удаление фотографии, ранее загруженной, или удалить фотографию из списка загрузки *****
            async deletePhotoHandle() {
                if (this.isNewPhotosEditing) {
                    this.removeRenderedPhotoHandler(this.renderedPhotos.find(photo => photo.id == this.editingNewPhoto.id));
                    this.openEditPhoto = false;
                }
                else {
                    this.openConfirmDeletePhoto=true;
                }
            },

            // ***** Подтверждение удаления фотографии ранее загруженной в альбом *****
            confirmDeletePhotoHandle() {
                this.deleteCard(this.changedPhoto.id);
                this.openEditPhoto = false;
                this.openConfirmDeletePhoto = false;
            },

            // ***** Отмена подтверждения удаления фотографии ранее загруженной в альбом *****
            cancelDeletePhotoHandle() {
                this.openEditPhoto = true;
                this.openConfirmDeletePhoto = false;
            },


            // ***** Получить данные текущего залогиненного юзера *****
            async updateLoggedUser() {
                this.loggedUserObject = {...this.loggeduser};
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

            async clickCloseSlider() {
                await this.refreshAlbumCards(this.idCurrentAlbum);
                await this.refreshThisAlbum(this.idCurrentAlbum);
                this.openBigMyPhoto=false;
            },

            next() {
                this.$refs.flickity.next();
            },
                
            previous() {
                this.$refs.flickity.previous();
            }
        },

        watch: {
            idCurrentAlbum() {
                this.refreshAlbumCards(this.idCurrentAlbum);
                this.refreshThisAlbum(this.idCurrentAlbum);
                this.openEditPhoto=this.openAddPhoto=this.openEditHeader=this.openBigMyPhoto=this.openConfirmDeletePhoto=false;
            },
        },

        async created () {
            await this.updateLoggedUser();
            await this.refreshAlbumCards(this.idCurrentAlbum);
            await this.refreshThisAlbum(this.idCurrentAlbum);
            this.currentAlbumObject = {...this.currentAlbum};
            this.currentAlbumObject.preview = this.currentAlbumObject.preview ? this.currentAlbumObject.preview : '../img/no_album_cover.jpg';
            this.changedAlbum = {...this.currentAlbumObject};
        },

        mounted() {
            window.addEventListener('scroll', this.scrollHandle);
            this.loggedUserObject.id = localStorage.getItem('userId');
            if (this.header && this.footer) { 
                this.heightHeaderFooterMobile = parseFloat(getComputedStyle(this.header).height) + parseFloat(getComputedStyle(this.footer).height);
            };
            this.commentCount = +this.thisAlbumPhotos.reduce((sum, photo) => sum + photo.comments.length, 0);
        },

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

                @include desktopHd {
                    padding: 5px 10%;
                    /* max-width: 1480px; */

                }
            }
        }

        &__button-home {
            position: absolute;
            top: 20px;
            right: 0;
            z-index: 9;

            &_scrolled {
                position: fixed;
                top: 15px;
                right: 5%;
                z-index: 16;

                @include desktopHd {
                    right: 10%;
                }
            }
            
        }

        &__button-edit {
            position: absolute;
            top: 20px;
            right: 50px;
            z-index: 9;

            @include tablets {
                right: 0;
                top: 70px;
            }
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
            background-image: linear-gradient(rgba($color-text, 0.95), rgba($color-text, 0.8));
        }
    }
        
    .edit-header {
        width: 100%;        
        min-width: 320px;
        overflow: hidden;

        &__card {
            min-width: 288px;
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
            margin-left: 10px;
        }
        
        &__user-img-wrapper {
            margin-right: 10px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            overflow: hidden;

            @include tablets {
                display: flex;
                height: 60px;
                width: 60px;
            }
        }        
        &__user-img {            
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
        
    .form-edit-header {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__fields-wrapper {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            width: 90%;
            align-items: center;

            @include tablets {
                flex-wrap: wrap;
                height: 200px;
                width: 80%;
            }            
        }

        &__load-album-preview {
            width: 110px;
            min-height: 50px;
            margin-bottom: 20px;
            margin-top: 10px;
            
            @include tablets {
                max-width: 20%;
            }
        }

        &__added-photo {
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 50%;
            overflow: hidden;
            height: 60px;
            width: 60px;
            margin: auto;
        }
        
        &__cover-img-wrapper {
            border-radius: 50%;
            overflow: hidden;
            height: 60px;
            width: 60px;
            margin: auto;
        }

        &__cover-img {
            max-width: unset;
            max-height: unset;
            width: 100%;
            height: 100%;
            object-fit: cover;
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
            margin-top: 10px;
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
            width: 100%;

            @include tablets {
                width: 80%;
            }
            
            &_file-load {
                width: 100%;
                position: relative;

                    &:hover .form-edit-header__cover-img-wrapper,
                    &:active .form-edit-header__cover-img-wrapper,
                    &:focus .form-edit-header__cover-img-wrapper {
                        box-shadow: 0 0 5px 2px white;
                    }
            }
        }

        &__error {   
            @include error;
            min-height: 18px;

            @include tablets {
                padding-left: 20px;
                width: 80%;
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
                height: 100px;
                resize: none;
            }
        }

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
            object-fit: cover;

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
        
        @include tablets {
            min-height: $min-height-section-for-slider;
        }
        
        &__container {
            margin: 0 5%;
            width: 90%;
            min-width: 288px;
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
                margin-right: 4%;

                &:nth-child(2n) {
                    margin-right: 0;
                }
            }      
            @include desktop {
                width: 32%;
                margin-right: 2%;
                
                &:nth-child(2n) {
                    margin-right: 2%;
                }
                &:nth-child(3n) {
                    margin-right: 0;
                }
            }        
            @include desktopHd {
                width: 22%;
                margin-right: 4%;

                &:nth-child(2n) {
                    margin-right: 4%;
                }
                &:nth-child(3n) {
                    margin-right: 4%;
                }
                &:nth-child(4n) {
                    margin-right: 0;
                }
            }            
        }

        &__add-photo {
            @include fixed-popup-container;
        }

        &__edit-photo {
            @include fixed-popup-container;
            z-index: 12;
            overflow: hidden;
            @include tablets {
                width: 70%;
                margin: 0 max(15%,calc((100% - 1480px)/2));
            }
        }

        &__big-card-slider {
            @include popup-container;
            top: 0;
            width: 100%;
            margin: 0;

            @include tablets {
                top: 100px;
            }
        }

    }

    .big-card-slider {
        @include popup;
        overflow: unset;
        background-color: transparent;
        position: relative;


        &__control {
            position: absolute;
            display: none;
            z-index: 15;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 15px;
            height: 30px;
            width: 20px; 
                &:hover,&:active,&:focus {
                    outline: none;
                }

            &_close {
                display: block;
                width: 40px;
                height: 40px;
                background-image: svg-load('close.svg', fill=rgba(#f0f0ec, 0.99));
                background-size: 30px;
                top: 0px;
                right: 0;

                &:hover,&:active,&:focus {
                    background-size: 34px;
                }
            }

            @include tablets {
                display: block;
                    &:hover,&:active,&:focus {
                        background-size: 16px;
                    }

                &_prev {
                    height: 480px;
                    top: calc((520px - 480px) / 2);
                    /* top: calc(520px / 2); */

                    left: -25px;
                    background-image: svg-load('arrow_left.svg', fill=rgba(#a0a09f, 0.99));

                    &:hover,&:active,&:focus {
                        background-image: svg-load('arrow_left.svg', fill=rgba($color-white, 0.9));
                    }
                }
                &_next {
                    height: 480px;
                    top: calc((520px - 480px) / 2);
                    /* top: calc(520px / 2); */
                    
                    right: -25px;                    
                    background-image: svg-load('arrow_left.svg', fill=rgba(#a0a09f, 0.99));
                    transform: rotate(180deg);
                    
                    &:hover,&:active,&:focus {
                        background-image: svg-load('arrow_left.svg', fill=rgba($color-white, 0.9));
                    }
                }
                &_close {                    
                    width: 40px;
                    height: 40px;
                    background-size: 20px;
                    background-image: svg-load('close.svg', fill=rgba(#a0a09f, 0.99));
                    right: -36px;
                    top: -36px;

                    &:hover,&:active,&:focus {
                        background-size: 24px;
                        background-image: svg-load('close.svg', fill=rgba($color-white, 0.9));
                    }
                }
            }
        }
    }
    
    .add-album {

        @include popup;

        &__card {
            min-width: 288px;
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
        position: relative;
        height: 300px;

        &__confirmDeletePhoto {
            z-index: 20;
            flex-grow: 1;
        }

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 10px 10px 0 10px;

            @include tablets {
                display: flex;
                align-items: center;
                padding: 15px 20px 0px 50px;
            }
        }

        &__input {
            @include popup-input;

            margin-top: 5px;

            &_textarea {
                resize: none;
                min-height: 90px;

                @include tablets {
                    min-height: 120px;
                }
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

        &__error {
            @include error;
            padding: 0 25px 5px 50px;
            span {
                position: absolute;
                right: 30px;
                top: 5px;
            }
        }

        @include tablets {
            height: 315px;
        }
    }

    .add-photo {
        @include popup;

        &__card {
            min-width: 288px;
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

        &__error {
            @include error;
            padding: 0 10px 10px 15px;
        }
    }

    .added-photos {
        display: flex;     
        flex-wrap: wrap;
        padding: 10px;
        padding-top: 20px;

        @include tablets {
            padding: 20px;
        }

        &__close-button {
            position: absolute;
            left: 100%;
            bottom: 100%;
            transform: translate(-50%, 50%);
            width: 32px;
            height: 32px;
        }
        &__edit-button {
            position: absolute;
            left: 0%;
            bottom: 0%;
        }

        &__item {
            position: relative;
            border-radius: 1px;
            background-color: rgb(207, 216, 220);
            width: 80px;
            height: 80px;
            margin-right: 30px;
            margin-bottom: 30px;

            @include tablets {
                width: 59px;
                height: 59px;
                margin-right: 10px;
                margin-bottom: 10px;
            }

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

        &__valid-sign {
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(white, 0.4);
            background-repeat: no-repeat;
            background-size: 40px;
            background-position: 50%;
            background-image: svg-load('check.svg', stroke=rgba(green, 0.9), fill=transparent, height='40px');
        }
        &__invalid-sign {
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(white, 0.4);
            background-repeat: no-repeat;
            background-size: 50px;
            background-position: 50%;
            background-image: svg-load('exclamation.svg', fill=rgba(yellow, 0.8), height='50px');
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