<template>
    <div class="wrapper">
        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigCardSlider || openChangeMyAlbum"
            @click="openBigCardSlider = openChangeMyAlbum = false"
        ></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"
            @click="openEditHeader = false; 
                    socEditCancel();"
        ></div>
        <div class="wrapper__preloader" v-if="isPreloader">
            <div class="preloader">
                <div class="preloader__cube preloader__cube_1"></div>
                <div class="preloader__cube preloader__cube_2"></div>
                <div class="preloader__cube preloader__cube_4"></div>
                <div class="preloader__cube preloader__cube_3"></div>
            </div>
        </div>
        <div class="wrapper__dropdownWarning" v-if="isDropdownWarning">
            <app-dropdown-warning
                :textWarning="`Файл не был загружен: размер файла более 1024Кб`"
                :isDropdownShowed="isDropdownShowed"
                :styleObj="dropdownStyles"
            ></app-dropdown-warning>

        </div>

		<header ref='header' class="header" :style="{ backgroundImage: `url(${currentAuthorObject.cover})` }">

            <div class="header__container" v-if="!openEditHeader">		
                <div class="header__button-logout" v-if="currentAuthorObject.id==loggedUserObject.id">
                    <button type='button' title="Выйти из своего аккаунта" class="button button_icon_space button_size_changing button_theme_color_changing"
                        @click="logoutUser">
                        <span class="button__text">Выйти</span>                    
                        <span class="button__icon button__icon_logout"></span>                    
                    </button>
                </div>
                <div class="header__button-edit" v-if="currentAuthorObject.id==loggedUserObject.id">
                    <button type='button' title="Редактировать свой профиль" class="button button_icon_space button_size_changing button_theme_color_changing"
                        @click="editUserHeaderHandler">
                        <span class="button__text">Редактировать</span>
                        <span class="button__icon button__icon_edit"></span>
                    </button>
                </div>
                <div class="header__button-home" v-if="currentAuthorObject.id!=loggedUserObject.id">
                    <router-link title="Перейти на главную" class="button button_icon_space button_size_changing button_theme_color_changing"
                        to="/"
                        @click.prevent>
                        <span class="button__text">На главную</span>
                        <span class="button__icon button__icon_home"></span>
                    </router-link>
                </div>
                
                <div class="header__avatar">
                    <img class="header__avatar-img" :src='currentAuthorObject.avatar ? `${urlAvatars}/${currentAuthorObject.avatar}` : require("../img/no_avatar.png").default' alt="avatar">
                </div>
                <div class="header__info">
                    <h1 class="header__title">{{currentAuthorObject.name}}</h1>

                    <div class="header__text">		
                        {{currentAuthorObject.description}}		
                    </div>

                    <div class="header__socials">
                        <div class="socials socials_no_edit">
                            <ul class="socials__list">
                                <li class="socials__item"
                                    v-for="social in currentAuthorObject.socials" :key="social.id">
                                    <a class="socials__link" 
                                        :target="socialsFromBase.find(soc => soc.id === social.social_id).name==='Email' ? `` : `blank`"
                                        :class="'socials__link_'+socialsFromBase.find(soc => soc.id === social.social_id).name"
                                        :href="socialsFromBase.find(soc => soc.id === social.social_id).name==='Email' ? `mailto:${social.link}` : social.link"
                                    >{{socialsFromBase.find(soc => soc.id === social.social_id).name}}
                                        <!-- :href="social.name==`Email` ? `mailto:${social.link}` : social.link" -->
                                            <svg class="socials__icon">
                                                <use :xlink:href="urlInlineSvgSprite+'#'+`${socialsFromBase.find(soc => soc.id === social.social_id).icon}`.slice(0,-4)"></use>
                                            </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header__edit-header" v-if="openEditHeader">

                <div class="edit-header">

                    <div class="edit-header__card">
                    
                        <div class="edit-header__form">
                            
                            <form class="form-edit-header"
                                @submit.prevent="submitEditUserHeaderHandler">

                                <div class="form-edit-header__load-avatar">

                                    <label for="load-avatar-header" class="form-edit-header__label form-edit-header__label_file-load">
                                        <vue-dropzone id="dropzone-edit-avatar" 
                                            :options="dropzoneOptions"></vue-dropzone>

                                        <input type="file" id="load-avatar-header" class="form-edit-header__input-load"
                                            @change="loadUserAvatar">

                                        <div class="form-edit-header__added-photo" v-if="isUserAvatarLoaded"
                                            :style="{ backgroundImage : `url(${renderedUserAvatar})` }">
                                        </div>

                                        <div class="form-edit-header__img-wrapper" v-if="!isUserAvatarLoaded">
                                            <img class="form-edit-header__img" :src="`${urlAvatars}/${currentAuthorObject.avatar}`" alt="avatar image">
                                            <div class="form-edit-header__img-overlay"></div>                                        
                                            <div class="form-edit-header__avatar-img-text">Изменить фото</div>
                                        </div>
                                    </label>
                                    
                                </div>

                                <div class="form-edit-header__other-info">

                                    <label class="form-edit-header__label">
                                        <input class="form-edit-header__input" type="text" placeholder="Введите имя"
                                            v-model="changedUser.name">
                                    </label>
                                    <div class="form-edit-header__error form-edit-header__error_name">
                                        <span v-if="!$v.changedUser.name.maxLength" v-show="$v.changedUser.name.$invalid">
                                            Максимум символов в имени: {{ $v.changedUser.name.$params.maxLength.max }}
                                        </span>
                                        <span v-else v-show="$v.changedUser.name.$invalid">
                                            Обязательно для заполнения
                                        </span>
                                    </div>

                                    <label class="form-edit-header__label form-edit-header__label_view_scroll">
                                        <textarea class="form-edit-header__input form-edit-header__input_textarea" cols="20" rows="2" placeholder="Краткая информация о пользователе"
                                            v-model="changedUser.description"></textarea>
                                        <div class="form-edit-header__decorelem"></div>
                                    </label>                                    
                                    <div class="form-edit-header__error form-edit-header__error_description">
                                        <span v-if="!$v.changedUser.description.minLength" v-show="$v.changedUser.description.$invalid">
                                            Минимум символов в описании: {{ $v.changedUser.description.$params.minLength.min }}
                                        </span>
                                        <span v-else-if="!$v.changedUser.description.maxLength" v-show="$v.changedUser.description.$invalid">
                                            Максимум символов в описании: {{ $v.changedUser.description.$params.maxLength.max }}
                                        </span>
                                        <span v-else v-show="$v.changedUser.description.$invalid">
                                            Обязательно для заполнения
                                        </span>
                                    </div>

                                    <div class="form-edit-header__socials">
                                       <div class="socials">                                           

                                            <ul class="socials__list">
                                                <li v-for="social in socialsFromBase" :key="social.id" class="socials__item">
                                                    <a  
                                                        @mouseenter="socialMouseHandler(social.id, $event)" 
                                                        @mouseleave="socialMouseHandler(social.id, $event)"                                                       
                                                        @click.prevent="socialClickHandler(social.id)" 
                                                        :class="[`socials__link socials__link_${social.name}`,
                                                                {'socials__link_active': social.isActive}]"
                                                        :title="social.name"
                                                    >{{social.name}}
                                                        <svg class="socials__icon">
                                                            <use :xlink:href="urlInlineSvgSprite+'#'+`${social.icon}`.slice(0,-4)"></use>
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>

                                            <div class="soc-edit" ref="socedit"
                                                :class="{'soc-edit_showed' : isActiveSocial}" 
                                                @mouseleave="socEditMouseLeaveHandler">

                                                <div class="soc-edit__card">

                                                    <form class="soc-edit__form"
                                                        @submit.prevent="submitEditSocialHandler">
                                                        
                                                        <input type="text" class="soc-edit__input"
                                                            :title="activeSocialLink ? `Для удаления соц.сети очистите поле и нажмите сохранить` : ''"
                                                            v-model="activeSocialLink">
                                                        <div class="soc-edit__error soc-edit__error_link">
                                                            <span v-if="!$v.activeSocialLink.minLength" v-show="$v.activeSocialLink.$invalid">
                                                                Минимум символов в адресе ссылки: {{ $v.activeSocialLink.$params.minLength.min }}
                                                            </span>                                                                
                                                            <span v-else-if="!$v.activeSocialLink.maxLength" v-show="$v.activeSocialLink.$invalid">
                                                                Максимум символов в адресе ссылки: {{ $v.activeSocialLink.$params.maxLength.max }}
                                                            </span>
                                                            <span v-else v-show="($v.activeSocialLink.$invalid && currentSocial.link) || invalidSocEdit">
                                                                Заполните поле, чтобы добавить соц.сеть
                                                            </span>
                                                        </div>

                                                        <div class="soc-edit__buttons">
                                                            <button type="submit" class="button button_size_m"
                                                                :disabled="$v.activeSocialLink.$invalid && !(currentSocial.link && !activeSocialLink)"
                                                            >Сохранить</button>
                                                            <button type="button" class="button button_size_m button_theme_minimalizm"
                                                                @click="socEditCancel"
                                                            >Отменить</button>
                                                        </div>

                                                    </form>

                                                </div>
                                            </div>  

                                        </div>
                                    </div>

                                </div>

                                <div class="form-edit-header__load-cover">

                                    <label for="load-bgcover-header" class="form-edit-header__label form-edit-header__label_file-load">
                                        <vue-dropzone id="dropzone-edit-cover"
                                            :options="dropzoneOptions"></vue-dropzone>
                                        
                                        <input type="file" id="load-bgcover-header" class="form-edit-header__input-load"
                                            :disabled="isDropdownShowed"
                                            @change="loadUserCover">

                                        <div class="form-edit-header__added-cover" v-if="isUserCoverLoaded"
                                            :style="{ backgroundImage : `url(${renderedUserCover})` }">
                                        </div>

                                        <div class="form-edit-header__now-cover" v-if="!isUserCoverLoaded"
                                            :style="{ backgroundImage : `url(${changedUser.cover})` }">
                                        </div>

                                        <div class="form-edit-header__cover-img"></div>
                                        <div class="form-edit-header__cover-img-text">Изменить фон</div>
                                    </label>

                                </div>

                                
                                <div class="form-edit-header__buttons">
                                    <button class="button button_size_m form-edit-header__buttonspace" type="submit"
                                        :disabled="$v.changedUser.$invalid"
                                        :title="$v.changedUser.$invalid ? 'Необходимо корректно заполнить все поля' : 'Сохранить изменения'" 
                                    >Сохранить</button>
                                    <button title="Закрыть без сохранения внесенных изменений" class="button button_size_m button_theme_minimalizm" type="button"
                                        @click="cancelEditHeaderHandler"
                                    >Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>

                </div>

            </div>

        </header>

        <main class="maincontent">
            <div class="my-search" v-if="!openEditHeader && !openBigCardSlider">
                <div class="my-search__container">
                    <form class="form-search" 
                        @submit.prevent="clickSubmitSearch">
                        <input type="search" class="form-search__input"
                            :class="{'form-search__input_empty': emptySearch}"
                            :placeholder="emptySearch ? 'Заполните поле поиска' : 'Исследовать мир'"
                            @input="emptySearch=false"
                            v-model="searched">
                        <button title="Нажмите для поиска" type="submit" class="form-search__submit">
                            <svg class="form-search__icon">
                                <use :xlink:href="urlInlineSvgSprite+'#search'"></use>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>


            <section class="new" :style="{ height: heightSectionForSlider }"
                v-if="currentAuthorObject.id==loggedUserObject.id">

                <div class="new__container" v-if="!openBigCardSlider">

                    <h2 class="new__title">Новое в мире</h2>

                    <p class="new__empty-text"
                        v-if="!loadedCards.length">Увы, пока ничего не загружено. Загрузите что-нибудь и станьте первым.</p>

                    <ul class="new__card-list">
                        <li v-for="card in loadedCards" :key="card.id" class="new__card-item">
                            <appCard
                                :cardObject="card"
                                @click-card="cardClickHandler">
                            </appCard>
                        </li>
                    </ul> 

                    <div class="new__button-show-more">
                        <button type="button" class="button button_size_m button_theme_light"
                            v-if="loadedCards.length"
                            @click="loadedCardsPush(startPhotoLoadingPos)"
                            :disabled="amountLoadedPhotos===-1"
                            :title="amountLoadedPhotos===-1 ? 'Больше нет фотографий для загрузки' : 'Загрузить фотографии'"
                        >Показать ещё</button>
                    </div>
                </div>


                <div class="new__big-card-slider" v-if="openBigCardSlider"
                    :style="{top : bigCardSliderTop+'px'}">

                        <div class="big-card-slider">

                            <flickity ref="flickity" :options="flickityOptions" class="big-card-slider__container">

                                    <appBigCard v-for="bigCard in loadedCards" :key="bigCard.id"
                                        :cardObject="bigCard"
                                        :userId="bigCard.authorId"
                                        :loggedUserObject="loggedUserObject"
                                        @close-bid-card="openBigCardSlider=false">                                                               
                                    </appBigCard>

                            </flickity>

                            <button class="big-card-slider__control big-card-slider__control_close" type="button"
                                @click="openBigCardSlider=false"
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


            <section class="my-albums" v-if="!openBigCardSlider">

                <div class="my-albums__container">

                    <div class="my-albums__topgroup">
                        <h2 class="my-albums__title" 
                            v-if="currentAuthorObject.id==loggedUserObject.id">Мои альбомы</h2>                        
                        <h2 class="my-albums__title" 
                            v-else>Альбомы</h2>
                        <div class="my-albums__button-plus"
                            v-if="currentAuthorObject.id==loggedUserObject.id">
                            <button title="Добавить новый альбом" class="button button_icon_expand button_size_s button_theme_pale"                            
                                @click="addNewAlbumHandler">
                                <span class="button__icon button__icon_plus"></span>
                            </button>
                        </div>
                    </div>

                    <p class="my-albums__empty-text"
                        v-if="!myAlbums.length"
                    >Альбомы еще не созданы. Создайте альбом с помощью кнопки "Добавить".</p>


                    <ul class="my-albums__albums-list">
                        <li v-for="myAlbum in myAlbums" :key="myAlbum.id" class="my-albums__albums-item">
                            <appMyAlbum 
                                @click-edit-my-album="clickEditAlbumHandler"
                                :myAlbumObject="myAlbum"
                                :isLoggedUser="currentAuthorObject.id==loggedUserObject.id"                  
                            ></appMyAlbum>
                        </li>
                    </ul> 

                </div>


                <div class="my-albums__change-album" v-if="openChangeMyAlbum">
                    <appChangeAlbum                                                
                        @click-close-change-my-album="cancelChangeMyAlbum"
                        @submit-change-my-album="submitChangeMyAlbum"
                        @delete-album="deleteAlbumHandler"
                        :editedAlbumObject="editedAlbum"
                        :authorId="currentAuthorObject.id"
                        :mode="albumChangeMode"
                        :toDisabledSubmit="toDisabledSubmit"
                    ></appChangeAlbum>

                </div>
            </section>
        </main>

		<footer ref='footer' class="footer" :style="{ backgroundImage: `url(${currentAuthorObject.cover})`}" >

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
    import appCard from '../vue-components/app-card.vue'
    import appBigCard from '../vue-components/app-big-card.vue'
    import appMyAlbum from '../vue-components/app-my-album.vue'
    import appChangeAlbum from '../vue-components/app-change-album.vue'
    import appDropdownWarning from '../vue-components/app-dropdown-warning.vue'
    

    import { baseStorageUrl } from '../requests.js'; 

    import renderer from '../renderer.js';

    import { mapState, mapActions, mapGetters } from 'vuex';

    import { required, minLength, maxLength } from 'vuelidate/lib/validators';

    import Flickity from 'vue-flickity';
    import $axios from '../requests';

    import vue2Dropzone from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';

    export default {   

        components: {
            appCard, appBigCard, appMyAlbum, appChangeAlbum,
            appDropdownWarning,
            Flickity,            
            vueDropzone: vue2Dropzone,
        },

        data() {
            return {
                openBigCardSlider: false,
                openEditHeader: false,
                openChangeMyAlbum: false,

                urlPhotos: baseStorageUrl+'/photos',
                urlAvatars: baseStorageUrl+'/avatars',
                urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

                isActiveSocial: false,
                currentSocial: {
                    social_id: Number,
                    link: ''
                },
                
                socialsFromBase: [],
                activeSocialLink: '',
                socEdit: '',
                invalidSocEdit: false,

                windowWidth: 0,                

                albumChangeMode: '',
                toDisabledSubmit: false,

                idCurrentPhoto: 0,

                cards: [],

                currentAuthorObject: {
                    albums: [],
                    socials: [],
                },

                myAlbums: [],
                
                loadedCards: [],
                amountLoadedPhotos: 0,
                startPhotoLoadingPos: 0,

                loggedUserObject: {
                    id: Number,
                    socials: [],
                },

                isPreloader: false,
                isDropdownWarning: false,
                isDropdownShowed: false,

                dropdownStyles: Object,

                dropdownCoverStyles: {
                    base: {
                        right: '50%',
                        transform: 'translateX(50%)',
                    },
                    showed: {
                        top: '295px',
                        width: '90%',
                    },
                },

                loadedUserCover: '',
                renderedUserCover: '',
                isUserCoverLoaded: false,
                loadedUserAvatar: '',
                renderedUserAvatar: '',
                isUserAvatarLoaded: false,

                editedAlbum: {
                    id: Number,
                    description: '',
                    preview: '',
                    title: ''
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
                changedUser: {
                    name: '',
                    description: '',                    
                },

                // ----- изменения высоты страницы и значения прокрутки для корректного отображения слайдера
                heightHeaderFooterMobile: 0,
                heightSectionForSlider: `unset`,
                scrolledWhenSliderOpened: 0,

                searched: '',
                emptySearch: false,

                isMobile: window.innerWidth < 768,

                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    maxFilesize: 1,
                    maxFiles: 1,
                    chunking: false,
                    addRemoveLinks: false,
                }  
            }
        },


        validations: {

            changedUser: {
                name: {
                    required,
                    maxLength: maxLength(50)
                },
                description: {
                    minLength: minLength(60),
                    maxLength: maxLength(200),
                    required
                },
            },
            activeSocialLink: {
                minLength: minLength(8),
                maxLength: maxLength(100),
                required
            },
        },

        computed: {
            ...mapState('cards', {
                allCards: state => state.cards,
            }),
            ...mapState('user', {
                loggeduser: state => state.user
            }),
            ...mapState('authors', {
                thisAuthor: state => state.author
            }),
            
            header() {
                return this.$refs['header'];
            },
            footer() {
                return this.$refs['footer'];
            },
            idCurrentAuthor() {
                return this.$route.params.id;
            },
        },


        methods: {
            ...mapActions('cards', ['updateAllCards', 'setSearchedWord']),
            ...mapActions('authors', ['refreshAuthor']),
            ...mapActions('albums', ['addAlbum', 'deleteAlbum', 'changeAlbum']),
            ...mapActions('user', ['logout', 'changeUser']),
            // ...mapActions('user', ['logout', 'changeUser', 'getUserWithSocials']),

            clickSubmitSearch() {
                if (this.searched) {
                    this.setSearchedWord(this.searched);
                    this.$router.push('search');
                }
                else {
                    this.emptySearch=true;
                }
            },

            // ***** Обработка нажатия клавиш *****
            keyDownHandle(e) {
                switch(e.code ) {
                    case 'Escape':
                        if (this.openEditHeader) this.cancelEditHeaderHandler();
                        if (this.openChangeMyAlbum) this.cancelChangeMyAlbum();
                        break;
                }
            },

            // ***** Нажата кнопка добавить новый альбом *****
            addNewAlbumHandler() {
                this.openChangeMyAlbum=true; 
                this.albumChangeMode='add';
            },

            // ***** Нажата кнопка редактировать альбом *****
            clickEditAlbumHandler(clickedAlbum) {
                this.openChangeMyAlbum=true; 
                this.albumChangeMode='edit';
                this.editedAlbum={...clickedAlbum};
            },

            // ***** Закрыть форму редактирования альбома без сохранения изменений *****
            cancelChangeMyAlbum() {
                this.openChangeMyAlbum=false;
            },

            // ***** Нажата кнопка сохранить изменения (2 режима: добавить новый альбом / редактировать альбом) *****
            async submitChangeMyAlbum(data, mode) {                
                if (mode === "add") {
                    try {
                        await this.addAlbum(data);
                        this.updateAlbums();                        
                    }
                    catch(error) {
                        alert(error);                        
                    }
                    finally {
                        this.toDisabledSubmit=false;
                        this.openChangeMyAlbum=false;
                    }
                }                
                else if (mode === "edit") {
                    try {
                        await this.changeAlbum(data);
                        this.updateAlbums();                        
                    }
                    catch(error) {
                        alert(error);                        
                    }
                    finally {
                        this.toDisabledSubmit=false;
                        this.openChangeMyAlbum=false;
                    }
                }
            },

            // ***** Удаление альбома пользователя (нажата кнопка удалить в компоненте app-change-album) *****
            async deleteAlbumHandler(albumId) {
                await this.deleteAlbum(albumId);
                this.updateAlbums();
                this.openChangeMyAlbum=false;                        
            },


            // ***** Нажата кнопка выйти из профиля (разлогиниться) *****
            logoutUser() {
                this.logout();
                this.$router.push('/login');
            },

            // ***** Нажата кнопка редактирования профиля пользователя *****
            editUserHeaderHandler() {
                this.openEditHeader=true;
                this.changedUser = {...this.currentAuthorObject};
            },

            // ***** Обработка загрузки аватара пользователя *****
            loadUserAvatar(e) {
                this.loadedUserAvatar = e.target.files[0];
                renderer(this.loadedUserAvatar).then(pic => {                 
                    this.renderedUserAvatar = pic;
                    this.isUserAvatarLoaded = true;
                });
            },

            // ***** Обработка загрузки обложки для пользователя *****
            loadUserCover(e) {
                if ((e.target.files[0].size/1024) < 1024) {
                    if (this.isDropdownWarning) {
                        this.isDropdownWarning = false;
                        this.isDropdownShowed = false;
                    }
                    this.loadedUserCover = e.target.files[0];
                    renderer(this.loadedUserCover).then(pic => {                 
                        this.renderedUserCover = pic;
                        this.isUserCoverLoaded = true;
                    });
                }
                else {
                    this.isDropdownWarning = true;
                    this.dropdownStyles = this.dropdownCoverStyles;
                    setTimeout(() => {
                        this.isDropdownShowed = true;
                        setTimeout(() => {
                            this.isDropdownShowed = false;
                            this.isDropdownWarning = false;
                            e.target.value='';
                        }, 3000);
                    }, 500);                    

                }
            },

            // ***** Сохранить изменения, внесенные в профиль пользователя *****
            async submitEditUserHeaderHandler() {                
                this.isPreloader = true;

                const formData = new FormData();
                    if (this.loadedUserAvatar.name) formData.append('avatar', this.loadedUserAvatar);
                    if (this.loadedUserCover.name) formData.append('cover', this.loadedUserCover);
                    formData.append('name', this.changedUser.name);
                    formData.append('description', this.changedUser.description);

                    let changedUserId = this.changedUser.id;

                try {                    
                    await this.changeUser( {changedUser: formData, changedUserId: changedUserId} );                
                    await this.updateAlbums();  
                } catch (error) {
                    
                } finally {
                    this.isPreloader = false;
                }

                this.openEditHeader=false;
            },

            // ***** Закрыть форму редактирования профиля пользователя без сохранения изменений *****
            cancelEditHeaderHandler() {
                this.renderedUserCover = '';
                this.isUserCoverLoaded = false;
                this.renderedUserAvatar = '';
                this.isUserAvatarLoaded = false;
                this.openEditHeader=false;
            },


            // ***** Сохранить изменения адреса соц.сети *****
            async submitEditSocialHandler() {
                this.isPreloader = true;
                
                let newSocial = {
                    social_id: this.currentSocial.social_id,                    
                    link: this.activeSocialLink,
                }
                
                try {
                    if (!this.activeSocialLink) {
                        if (this.currentSocial.link) {
                            await $axios.post(`/v1/socials/${this.currentSocial.social_id}/delete`, newSocial);
                        }
                        else {
                            this.invalidSocEdit = true;
                        }
                    } else {
                        if (newSocial.link !== this.currentSocial.link) {
                                if (!this.currentSocial.link) await $axios.post(`/v1/socials/add`, newSocial);
                                else await $axios.post(`/v1/socials/${this.currentSocial.social_id}/update`, newSocial);
                        }
                    }
                }
                catch(error) { 
                    throw new Error ( error.response.data.error || error.response.data.message ); 
                }
                finally {
                    if (!this.invalidSocEdit) {
                        this.socEditCancel();
                        await this.refreshAuthor(this.idCurrentAuthor);
                        this.currentAuthorObject.socials = this.thisAuthor.socials;
                    }
                        this.isPreloader = false;
                }

            },

            // ***** Обработка события ухода мыши с формы редактирования соцсетей *****
            socEditMouseLeaveHandler() {
                if (this.windowWidth > 480) {
                    this.isActiveSocial = false;

                    this.socialsFromBase.forEach(social => { 
                        social.isActive = false;
                    });
                }
            },

            // ***** Клик по иконке соц.сети (на мобильном разрешении) *****
            socialClickHandler(socialId) {
                
                if (this.windowWidth <= 480) {
                    
                    this.currentSocialId = socialId;

                    // if (this.currentSocialId) { 
                    this.socialsFromBase.forEach(social => { 
                        // if (social.id !== this.currentSocialId) {
                        if (social.id !== this.currentSocial.id) {
                            social.isActive = false;
                        }
                        else {
                            social.isActive = !social.isActive;
                            this.isActiveSocial = social.isActive;
                            this.activeSocialLink = social.link || "";
                        }                     
                    });
                    // }
                }            
            },

            // ***** Обработка событий мыши у иконок соцсетей *****
            socialMouseHandler(socialId, e) { 

                if (this.windowWidth > 480) {
                    
                    if (e.type=='mouseenter') {
                        this.currentSocial = this.currentAuthorObject.socials.find(social => social.social_id === socialId) || {social_id: socialId, link: '', isActive: false};

                        this.socialsFromBase.forEach(social => {
                                if (social.id !== this.currentSocial.social_id) {
                                    social.isActive = false;
                                }
                                else {
                                    social.isActive = !social.isActive;
                                    this.isActiveSocial = social.isActive;
                                    this.activeSocialLink = ( this.currentSocial.link) ? this.currentSocial.link : '';
                                }
                        });

                    } else if (e.type=='mouseleave') {
                        this.socEdit = this.$refs['socedit'];

                        let elem = e.relatedTarget;
                       
                        while(elem && elem != this.socEdit) {
                            elem = elem.parentElement;
                        }
                        
                        if (elem !== this.socEdit) {
                            this.socEditCancel();
                        }

                    }
                }
            },

            // ***** Закрыть форму редактирования адреса соцсети (без сохранения данных), сделать все иконки не нажатыми *****
            socEditCancel() {
                this.socialsFromBase.forEach(social => social.isActive=false);
                this.isActiveSocial=false;
                this.activeSocialLink='';
            },


            // ***** Клик по фотографии (открытие слайдера) *****
            cardClickHandler(cardId) {
                let photoIndex = 0;

                this.cards.find(card => {
                    if (card.id !== cardId) photoIndex++;
                    else this.idCurrentPhoto = photoIndex;
                });                
                this.flickityOptions.initialIndex = this.idCurrentPhoto;
                this.openBigCardSlider = true;
                window.scrollTo({ top: 0 });
            },

            checkWidth() {

                    this.windowWidth = window.innerWidth;
                    this.isMobile = this.windowWidth < 768;

                    if (this.windowWidth > 480) {
                        this.isActiveSocial = false;
                        if (this.socialsFromBase) this.socialsFromBase.forEach(social => social.isActive = false );
                    }

                    switch(true) {
                        case 'this.windowWidth <= 768': 
                            if (!this.amountLoadedPhotos) this.amountLoadedPhotos = 6; // устанавливаем кол-во загружаемых фотографий по нажатию кнопки "загрузить еще" (если еще не установлено)
                            break;
                        case 'this.windowWidth <= 1200':  
                            if (!this.amountLoadedPhotos) this.amountLoadedPhotos = 4;
                            break;
                        case 'this.windowWidth <= 1600':  
                            if (!this.amountLoadedPhotos) this.amountLoadedPhotos = 6;
                            break;
                        case 'this.windowWidth > 1600':  
                            if (!this.amountLoadedPhotos) this.amountLoadedPhotos = 8;
                            break;

                        default:
                            if (!this.amountLoadedPhotos) this.amountLoadedPhotos = 6;
                            break;
                        }
            },
            
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },

            // ***** Загрузка порции фотографий (по клику на кнопку загрузить еще) *****
            loadedCardsPush(startPos) {

                this.checkWidth();

                let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                for (let i = 0; i < this.amountLoadedPhotos; i++) {
                    if (this.cards[i+startPos]) this.loadedCards.push(this.cards[i+startPos]);
                    if (!this.cards[i+1+startPos]) this.amountLoadedPhotos = -1;
                }
                   if (this.amountLoadedPhotos !== -1) 
                    this.startPhotoLoadingPos = startPos + this.amountLoadedPhotos;

                    this.$nextTick(() => {
                        window.scrollTo({top: posTop});                        
                    });
            },


            // ***** Получить объект залогиненного пользователя из VUEX *****
            async updateLoggedUser() {
                this.loggedUserObject = {...this.loggeduser};
            },

            async updateCards() {
                await this.updateAllCards();
                this.cards = this.allCards;
            },

            // ***** Получить альбомы текущего пользователя (на странице которого находимся) *****
            async updateAlbums() {
                await this.refreshAuthor(this.idCurrentAuthor);
                this.currentAuthorObject = {...this.thisAuthor};
                this.currentAuthorObject.cover = this.currentAuthorObject.cover ? `${this.urlPhotos}/${this.currentAuthorObject.cover}` : "../img/no_album_cover.jpg";
                this.myAlbums = this.thisAuthor.albums;
            },

            next() {
                this.$refs.flickity.next();
            },
                
            previous() {
                this.$refs.flickity.previous();
            },

        },

        watch: {
            idCurrentAuthor() {
                this.updateCards();
                this.updateAlbums();
                this.openBigCardSlider=this.openEditHeader=this.openChangeMyAlbum=false;
            },
            async openBigCardSlider(value) {
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
                    await this.updateCards();
                    for (let i=0; i<this.startPhotoLoadingPos; i++) {
                        this.loadedCards[i] = this.cards[i];
                    }

                }
            },

            activeSocialLink(value) {
                if (this.invalidSocEdit && value) {
                    this.invalidSocEdit = false;
                    console.log('invalidSocEdit = false!!!!!!');
                }
            },

            isMobile(value) {
                if (value) this.bigCardSliderTop = 0;
                else this.bigCardSliderTop = window.pageYOffset + 40;
            }
        },

        async created() {
            const { data } = await $axios.get(`/v1/socials`);
            this.socialsFromBase = data.socials;
            this.socialsFromBase.forEach(social => 
                this.$set(social, 'isActive', false));

            await this.updateCards();
            await this.updateAlbums();
            await this.updateLoggedUser();

            this.loadedCardsPush(this.startPhotoLoadingPos);
            window.addEventListener('resize', this.checkWidth);    
            document.addEventListener('keydown', this.keyDownHandle);
        },

        mounted() {
            this.windowWidth = window.innerWidth;
            this.bigCardSliderTop = this.isMobile ? 0 : window.pageYOffset + 40;
            this.loggedUserObject.id = localStorage.getItem('userId');
            this.editedAlbum.author = this.loggedUserObject.id;
            if (this.header && this.footer) { 
                this.heightHeaderFooterMobile = parseFloat(getComputedStyle(this.header).height) + parseFloat(getComputedStyle(this.footer).height);
            };
        },
            
    }

</script>


<style scoped lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';
    @import '../styles/common/site-button.pcss';

    #dropzone-edit-avatar {
        position: absolute;
        height: 100%;
        width: 100%;
        padding: 0;
        min-height: unset;
        border-radius: 50%;
        opacity: 0;
    }
    #dropzone-edit-cover {
        position: absolute;
        height: 100%;
        width: 100%;
        padding: 0;
        min-height: unset;
        border-radius: 15px;
        opacity: 0;
    }


    .header {
        background-image: linear-gradient(rgba(50, 50, 50, 0.5), rgba(50, 50, 50, 0.3)), url('/img/no_album_cover.jpg');
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
            width: 90%;
            position: relative;
            @include max-with-container;

            @include tablets {
                flex-direction: row;
            }
        }

        &__button-logout {
            position: absolute;
            top: 20px;
            left: 0;
            z-index: 9;
            
            @include tablets {
                top: 70px;
                right: 0;
                left: unset;
            }         
        }

        &__button-edit {
            position: absolute;
            top: 20px;
            right: 0;
            z-index: 9;
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

        }
        

        &__avatar {
            width: 100%;
            text-align: center;
            height: 50px;
            flex-shrink: 0;
            margin-right: 22px;
            display: inline-block;		
            vertical-align: middle;

            @include tablets {
                width: 102px;
                height: 102px;
            }
            @include desktop {
                width: 125px;
                height: 125px;
            }
        }

        &__avatar-img {
            margin: 0 auto;
            margin-bottom: 10px;
            border-radius: 50%;
            border: 3px solid $color-white;
            height: 50px;
            width: 50px;
            object-fit: cover;

            @include tablets {
                width: 102px;
                height: 102px;
            }	
            @include desktop {
                width: 125px;
                height: 125px;
            }
        }      

        &__info {
            display: flex;
            flex-direction: column;
            align-items: center;

            @include tablets {
                align-items: flex-start;
            }
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 21px;
            margin-bottom: 15px;
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);

             @include tablets {
                margin-bottom: 20px;
             }
        }

        &__text {
            font-family: 'ProximaNova-Light';
            text-align: center;
            font-size: 14px;
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);
            margin-bottom: 18px;

            @include tablets {
                text-align: left;
                padding-right: 120px;
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
            }
        }

        &__edit-profile {
            @include popup-container;
        }

        &__edit-header {
            position: relative;
            width: 100%;
            min-height: 210px;
            margin: 0;
            z-index: 12;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: linear-gradient(rgba($color-text, 0.95), rgba($color-text, 0.8)), url('/img/no_album_cover.jpg');
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

        }
    }

        
    .form-edit-header {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;

        @include tablets {
            flex-direction: row;
        }

        &__other-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;            

            @include tablets {
                width: 60%;
                max-width: 1200px;
                padding: 30px 10px 10px 30px;
            }
        }

        &__added-cover, 
        &__now-cover {
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 50%;
            overflow: hidden;
            margin: auto;
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: -1;
            border-radius: 15px;
        }

        &__added-photo {
            background-size: cover;
            background-repeat: no-repeat;
            overflow: hidden;
            height: 50px;
            width: 50px;
            margin: auto;
            cursor: pointer;

            @include tablets {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
            }
        }

        &__load-avatar {
            margin-top: 20px;
            margin-bottom: 10px;
            height: 50px;
            width: 50px;

            @include tablets {
                margin-left: 5%;
                height: 70px;
                width: 70px;
                align-self: flex-start;
                margin-top: 40px;
            }  
            @include desktopHd {
                margin-left: max(calc((100% - 1480px) /2), 10%);
            }            
        }

        &__img-wrapper {
            width: 50px;
            height: 50px;
            margin: auto;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            display: flex;
            justify-content: center;

            @include tablets {
                width: 70px;
                height: 70px;
            }  
        }

        &__img-overlay {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            opacity: 0.5;
            background-color: $color-text;
            width: 100%;
            height: 100%;
            border: 3px solid $color-white;
            border-radius: 50%;

            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: svg-load('cam.svg', fill=rgba(#{$color-white}, 0.99));
                background-repeat: no-repeat;
                background-size: 18px;
                background-position: center 25%;
            }
        }

        &__load-cover {
            width: 90px;
            height: 90px;
            margin-bottom: 20px;
            margin-top: 10px;

            @include tablets {
                margin-right: 5%;
                margin-left: auto;
            }
            @include desktopHd {
                margin-right: max(calc((100% - 1480px) /2), 10%);
            }  
        }

        &__cover-img {
            height: 32px;
            background-repeat: no-repeat;
            background-size: 32px;
            background-position: top center;
            background-image: svg-load('cam.svg', fill=rgba(#{$color-white}, 0.8));
            width: 32px;
        }

        &__avatar-img-text {
            position: absolute;
            z-index: 10;
            top: 50%;
            font-family: 'Proxima Nova Semibold';
            font-size: 8px;
            color: rgba(#{$color-white}, 0.99);
            text-align: center;
            
            @include tablets {
                font-size: 10px;
            }
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

            &_view_scroll {

                position: relative;
                z-index: 14;

                &:active, &:focus {
                    outline: none;
                }
            }                
            
            &_file-load {
                width: 100%;
                position: relative;
                height: 100%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-radius: 10px;
                overflow: hidden;
            }

            @include tablets {
                width: 100%;
            }
        }

        &__error {
            @include error;
            min-height: 24px;

            @include tablets {
                align-self: flex-start;
                margin-left: 18px;
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
            font-size: 0;

            &:disabled {
                cursor: wait;
            }
        }

        &__decorelem {
            display: block;
            position: absolute;
            right: 1px;
            top: 0;
            box-sizing: border-box;
            width: 21px;
            height: 100%;
            border-radius: 0 20px 20px 0;
            background-color: $color-white;
        }

        &__input {
            @include popup-input;

            &_textarea {
                resize: none;
                height: 84px;
                
                border-radius: 20px 0 0 20px;
                padding-right: 20px;
                width: calc(100% - 20px);

                &:active ~ .form-edit-header__decorelem,
                &:focus ~ .form-edit-header__decorelem {
                    border: 1px solid $color-blue;
                    border-left: none;
                }
                @include tablets {
                    height: unset;
                }
            }
        }

        &__socials {
            margin-top: 5px;
            margin-bottom: 50px;
            width: 88%;
        }

         &__buttons {
            padding: 10px;
            height: 60px;
            background: $color-white;
            width: 100%;
            text-align: right;
            width: 100%;
            padding-right: 5%;

            @include desktopHd {    
                padding-right: max(calc((100% - 1480px) /2), 10%);
            }
        }
        
        &__buttonspace {
            margin-right: 10px;
        }
    }

        
    .edit-profile {

        @include popup;

        &__card {
            min-width: 288px;
            display: flex;
            flex-direction: column;
            background-color: #f2f2f2;
            color: $color-text;
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

                &:hover {
                    background-image: svg-load('close.svg', fill=rgba(#{$color-text}, 0.8));
                }
            }
        }

    }

        
    .form-edit-profile {
        display: flex;
        flex-direction: column;
        background-color: $color-white;

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            display: block;
            padding: 15px 10px 10px;

            &_no_top_padding {
                padding-top: 0;
            }
        }

        &__input {
            @include popup-input;

            margin-top: 5px;

            &_textarea {
                resize: none;
            }
        }

         &__load-image {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        &__img-wrapper {
            width: 50px;
            height: 50px;
            margin: auto;
            border-radius: 50%;
            overflow: hidden;
        }
        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__button {
             margin-left: 18px;
        }

        &__notice-size {
            width: 70%;
            font-family: 'ProximaNova-LightIt';
            font-size: 14px;
            line-height: 14px;
            padding: 10px 0;
        }

        &__socials {
            border-top: 1px solid #f2f2f2;
            padding-bottom: 20px;
        }

         &__buttons {
            background-color: #f2f2f2;
            padding: 10px;
        }
    }


    .socials {
        display: flex;
        flex-direction: column; 
        align-items: center;
        position: relative;
        padding: 10px;
        

        &_no_edit {
            padding-bottom: 0;
            border-radius: 5px;
            background-color: rgba($color-text, 0.2);
        }

        &__list {
            display: flex;
            justify-content: center;
        }

        &__item {
            margin-right: 8px;
            margin-left: 8px;

            @include tablets {
                margin-right: 5px;
                margin-left: 5px;
            }
        }

        &__link {
            display: block;
            font-size: 0px;
            width: 22px;
            height: 22px;
            border-radius: 5px;
            margin-bottom: 10px;

            &_active {
                position: relative;
                box-sizing: content-box;
                border-bottom: 10px solid transparent;
                margin-bottom: 0px;

                &::after {
                    content: '';
                    /* z-index: 2; */
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 7px solid transparent;
                    border-right: 7px solid transparent;
                    border-bottom: 8px solid $color-white;
                }

                &__icon {
                    width: 22px;
                    height: 22px;
                    margin-left: -1px;
                    margin-top: -1px;
                    fill: rgba(#{$color-white}, 0.95);
                }
            }

            &:hover, &:active, &:focus {
                box-sizing: content-box;
                border-bottom: 10px solid transparent;
                margin-bottom: 0px;
                /* z-index: 20; */
                outline: none;

                .socials__icon {
                    width: 22px;
                    height: 22px;
                    margin-left: -1px;
                    margin-top: -1px;
                    fill: rgba(#{$color-white}, 0.95);
                }
            }

        }

        &__icon {
            width: 20px;
            height: 20px;
            fill: rgba(#{$color-white}, 0.8);
        }
    }


    .my-search {
        min-width: 288px;
        font-family: 'ProximaNova-Light';
        background-color: #f1f1f1;
        height: 60px;
        overflow: hidden;

        &__container {
            /* padding: 10px 5%; */
            padding: 10px 0;
            display: flex;
            justify-content: center;
            margin: 0 auto;
            width: 90%;
            position: relative;
            @include max-with-container;        
            
            @include tablets {
                justify-content: flex-end;
            }
        }
        
        &__show-new {
            padding: 5px;
            padding-top: 15px;
        }
    }


    .form-search {
        position: relative;
        width: 100%;
        height: 40px;
        border-radius: 40px;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        background: #fff;
        transition: all 0.3s ease;

        &__input {
            position: absolute;
            top: 0;
            left: 38px;
            font-size: 14px;
            background: transparent;
            color: $color-text;
            width: 300px;
            height: 40px;
            border: none;
            appearance: none;
            outline: none;

            &::-webkit-search-cancel-button {
                appearance: none;
            }

            &_empty::placeholder {
                color: $color-carrot;
            }

        }


        &__submit {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            height: 30px;
            width: 30px;
            padding: 0;
            margin: 0;
            border: none;
            background: none;
            outline: none!important;
            cursor: pointer;

            & svg {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 15px;
                height: 15px;
                fill: $color-text;
            }
        }

        @include tablets {
            width: 350px;
        }
    }


    .new {
        min-width: 320px;
        padding: 30px 0;        
        /* position: relative; */

        @include tablets {
            min-height: $min-height-section-for-slider;
        }

        &__container {
            margin: 0 auto;
            width: 90%;
            min-width: 288px;
            @include max-with-container;
        }
        
        &__title {
            font-family: 'Panton-Bold';
            font-size: 30px;
            margin-bottom: 20px;
            width: 100%;
            text-align: center;

            @include tablets {
                text-align: left;
            }
        }

        &__button-show-more {
            text-align: center;
            padding: 10px;
        }

        &__card-list {

            @include tablets {
                display: flex;
                flex-wrap: wrap;
            }
        }

        &__card-item {
            margin-bottom: 10px;

            @include tablets {
                margin-bottom: 20px;
                width: 48%;
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
                width: 23%;
                margin-right: 2%;

                &:nth-child(3n) {
                    margin-right: 2%;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }

        &__big-card-slider {
            @include popup-container;
            top: 0;
            width: 100%;
            margin: 0;
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


    .soc-edit {
        @include popup();

        display: none;
        min-width: calc(320px * 0.88);
        background-color: rgba($color-white, 0.7);
        position: absolute;
        top: calc(100% - 12px);


        @include tablets {
            min-width: unset;
            width: 280px;
        }

        &::before {
            content: '';
            position: absolute;
            top: -10px;
            width: 100%;
            height: 10px;
            background-color: red;
        }

        &_showed {
            display: block;
        }

        &__card {
            background-color: rgba($color-white, 0.5);
            display: flex;
            flex-direction: column;
            padding: 10px;
        }

        &__input {
            @include popup-input();
            min-width: unset;
        }

        &__error {
            @include error;
            min-height: 20px;

            @include tablets {
                align-self: flex-start;
                margin-left: 10px;
                margin-right: 10px;
                & span {
                    line-height: 12px;
                    font-size: 12px;
                }
            }
        }

        &__buttons {
            padding-top: 10px;
        }

    }


    .my-albums {
        min-width: 320px;
        padding: 30px 0;
        background: rgb(246,246,246);
        background: linear-gradient(0deg, rgba(246,246,246,1) 0%, $color-white 100%);
        position: relative;
        
        &__container {
            margin: 0 auto;
            width: 90%;
            min-width: 288px;
            @include max-with-container;
        }

        &__topgroup {
            position: relative;
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 30px;
            margin-bottom: 20px;
            width: 100%;
            text-align: center;

            @include tablets {
                text-align: left;
            }
        }

        &__button-show-more {
            text-align: center;
            padding: 10px;
        }

        &__button-plus {
            position: absolute;
            right: 0;
            top: 50%;
            z-index: 9;
            transform: translateY(-50%);
        }

        &__albums-list {

            @include tablets {
                display: flex;
                flex-wrap: wrap;
            }
        }

        &__albums-item {
            margin-bottom: 10px;

            @include tablets {
                width: 31%;
                margin-bottom: 20px;
                margin-right: 3.5%;

                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
            @include desktop {
                width: 23.8%;
                margin-bottom: 20px;
                margin-right: 1.6%;

                &:nth-child(3n) {
                    margin-right: 1.6%;
                }
                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
            @include desktopHd {
                width: 18.4%;
                margin-right: 2%;

                &:nth-child(3n) {
                    margin-right: 2%;
                }
                &:nth-child(4n) {
                    margin-right: 2%;
                }
                &:nth-child(5n) {
                    margin-right: 0;
                }
            }
        }

        &__change-album {
            @include fixed-popup-container;
        }

    }


    .footer {
        background-image: linear-gradient(rgba(50, 50, 50, 0.5), rgba(50, 50, 50, 0.3)), url('/img/no_album_cover.jpg');
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


    .preloader {
        $cubeCount: 4;
        $animationDuration: 2.4s;
        $delayRange: 1.2s;

        position: fixed;
        top: 40vh;
        left: 50%;
        z-index: 20;
        width: 100px;
        height: 100px;
        margin: auto;
        transform: translateX(-50%) rotateZ(45deg);

        &__cube {
            float: left;
            width: calc(50% - 10px);
            height: calc(50% - 10px);
            margin: 5px;
            position: relative;
            transform: scale(1.1);
        }

        &__cube:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($color-blue, 0.5);
            animation: folding-cube-angle $animationDuration infinite linear both;
            transform-origin: 100% 100%;
        }

        // Rotation / angle
        @for $i from 2 through $cubeCount {
            &__cube_#{$i} {
                transform: scale(1.1) rotateZ(calc(90deg * ($i - 1)));
            }
            &__cube_#{$i}:before {
                animation-delay: calc($delayRange / $cubeCount * ($i - 1));
            }
        }

        @keyframes folding-cube-angle {
            0%, 10% {
                transform: perspective(140px) rotateX(-180deg);
                opacity: 0;
            }
            25%, 75% {
                transform: perspective(140px) rotateX(0deg);
                opacity: 1;
            }
            90%, 100% {
                transform: perspective(140px) rotateY(180deg);
                opacity: 0;
            }
        }
    }

    /* .dropdown {
        background-color: rgba($color-white, 0.8);
        color: rgba($color-text, 0.9);
        padding: 10px 15px;
        border-radius: 5px;

        position: absolute;
        top: -40px;
        right: 50%;
        transform: translateX(50%);
        opacity: 0;
        transition: top 0.2s ease-in;
        

        &_showed {
            z-index: 15;
            opacity: 1;
            top: 295px;
            width: 90%;

            @include tablets {
                top: 40px;
                width: unset;
            }
        }
        
        @include tablets {
            right: 5%;
            transform: translateX(0);
        }        
        @include desktopHd {
            right: max(calc((100% - 1480px)/2),10%);
        }
        
    } */

</style>