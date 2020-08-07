<template>
    <div class="wrapper">
        <!-- <pre>{{currentUserObject}}</pre> -->

        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigCardSlider || openEditProfile || openChangeMyAlbum"
            @click="openBigCardSlider = openEditProfile = openChangeMyAlbum = false"
        ></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"
            @click="openEditHeader = false"
        ></div>

        <header class="header"
            :style="bgCurrentUser"
        >

            <div class="header__container" v-if="!openEditHeader">		
                <div class="header__button-logout"
                    v-if="currentUserObject.isThisUser"
                >
                    <button type='button' class="round-button round-button_logout">Выйти</button>
                </div>
                <div class="header__button-edit"
                    v-if="currentUserObject.isThisUser"
                >
                    <button type='button' class="round-button round-button_edit"
                        @click="openEditHeader=true"
                    >Редактировать</button>
                </div>

                <div class="header__avatar">
                    <img class="header__avatar-img" :src='currentUserObject.urlUserAvatar' alt="avatar">
                </div>
                <div class="header__info">
                    <h1 class="header__title">{{currentUserObject.userName}}</h1>

                    <div class="header__text">		
                        {{currentUserObject.userDesc}}		
                    </div>

                    <div class="header__socials">
                        <ul class="socials__list">
                            <li class="socials__item"
                                v-for="social in currentUserObject.userSocials" :key="social.id"
                            >
                                <a class="socials__link" target="blank"
                                    :class="`socials__link_${social.id}`"
                                    :href="social.link"                                
                                >{{social.text}}</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <div class="header__edit-profile" v-if="openEditProfile">

                <div class="edit-profile">

                    <div class="edit-profile__card">

                        <div class="edit-profile__topgroup">
                            <h4 class="edit-profile__title">Редактировать профиль</h4>
                            <button type="button" class="edit-profile__button edit-profile__button_close"></button>
                        </div>
                        
                        <div class="edit-profile__form">
                            
                            <form class="form-edit-profile">

                                <label class="form-edit-profile__label">Имя
                                    <input class="form-edit-profile__input" type="text" placeholder="Антон">
                                </label>

                                <label class="form-edit-profile__label form-edit-profile__label_no_top_padding">Фамилия
                                    <input class="form-edit-profile__input" type="text" placeholder="Черепов">
                                </label>

                                <label class="form-edit-profile__label">О себе
                                    <textarea class="form-edit-profile__input form-edit-profile__input_textarea" cols="20" rows="5" placeholder="Описание альбома"></textarea>
                                </label>
                        

                                <div class="form-edit-profile__load-image">

                                    <div class="form-edit-profile__img-wrapper">
                                        <img class="form-edit-profile__img" :src="urlAvatar" alt="avatar image">
                                    </div>

                                    <div class="form-edit-profile__button">
                                        <button class="site-button site-button_theme-light" type="button">Загрузить фотографию</button>                                        
                                        <div class="form-edit-profile__notice-size">(файл должен быть размером не более 512 КБ)</div>
                                    </div>

                                </div>                        

                                <div class="form-edit-profile__load-image">

                                    <div class="form-edit-profile__img-wrapper">
                                        <img class="form-edit-profile__img" :src="currentUserObject.urlUserCover" alt="background cover image">
                                    </div>

                                    <div class="form-edit-profile__button">
                                        <button class="site-button site-button_theme-light" type="button">Загрузить фон</button>
                                        <div class="form-edit-profile__notice-size">(файл должен быть размером не более 1024 КБ)</div>
                                    </div>

                                </div>

                                <div class="form-edit-profile__socials">

                                    <label class="form-edit-profile__label">Вконтакте
                                        <input class="form-edit-profile__input" type="text">
                                    </label>
                                    <label class="form-edit-profile__label">Facebook
                                        <input class="form-edit-profile__input" type="text">
                                    </label>
                                    <label class="form-edit-profile__label">Email
                                        <input class="form-edit-profile__input" type="text">
                                    </label>
                                    <label class="form-edit-profile__label">Twitter
                                        <input class="form-edit-profile__input" type="text">
                                    </label>

                                </div>
                                
                                <div class="form-edit-profile__buttons">
                                    <button class="site-button" type="submit">Сохранить</button>
                                    <button class="site-button site-button_theme-just-text" type="button"
                                        @click="openEditProfile=false"
                                    >Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>

                </div>

            </div>


            <div class="header__edit-header" v-if="openEditHeader">

                <div class="edit-header">

                    <div class="edit-header__card">
                    
                        <div class="edit-header__form">
                            
                            <form class="form-edit-header">

                                <div class="form-edit-header__load-image">
                                    <div class="form-edit-header__img-wrapper">
                                        <img class="form-edit-header__img" :src="currentUserObject.urlUserAvatar" alt="avatar image">
                                    </div>
                                </div>   

                                <label class="form-edit-header__label">
                                    <input class="form-edit-header__input" type="text" placeholder="Антон Черепов">
                                </label>


                                <label class="form-edit-header__label">
                                    <textarea class="form-edit-header__input form-edit-header__input_textarea" cols="20" rows="2" placeholder="Описание альбома"></textarea>
                                </label>

                                <div class="form-edit-header__socials">
                                    <div class="socials">

                                        <ul class="socials__list">
                                            <li v-for="social in currentUserObject.userSocials" :key="social.id" class="socials__item"> 
                                                <a
                                                    @mouseenter="socialMouseHandler(social.id, $event)" 
                                                    @mouseleave="socialMouseHandler(social.id, $event)" 
                                                    @click.prevent="socialClickHandler(social.id)" 
                                                    :class="[`socials__link socials__link_${social.id}`,
                                                            {'socials__link_active': social.isActive}]"
                                                >{{social.text}}</a>
                                            </li>
                                        </ul>

                                        <div class="soc-edit"
                                            ref="soc-edit"
                                            :class="{'soc-edit_showed' : isActiveSocial}" 
                                            @mouseleave="socEditMouseLeaveHandler"                                             
                                        >
                                            <div class="soc-edit__card">

                                                <form class="soc-edit__form">
                                                    <input  type="text" class="soc-edit__input"
                                                        v-model="activeSocialLink"
                                                    >

                                                    <div class="soc-edit__buttons">
                                                        <button type="submit" class="site-button site-button_theme_light">Сохранить</button>
                                                        <button type="button" class="site-button site-button_theme-just-text"
                                                            @click="openEditHeader=false"
                                                        >Отменить</button>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>  

                                    </div>
                                </div>

                                <div class="form-edit-header__load-cover">

                                    <label for="load-bgcover-header" class="form-edit-header__label form-edit-header__label_file-load">
                                        <input type="file" id="load-bgcover-header" class="form-edit-header__input-load">
                                        <div class="form-edit-header__cover-img"></div>
                                        <div class="form-edit-header__cover-img-text">Изменить фон</div>
                                    </label>

                                </div>


                                
                                <div class="form-edit-header__buttons">
                                    <button class="site-button" type="submit">Сохранить</button>
                                    <button class="site-button site-button_theme-just-text" type="button"
                                        @click="openEditHeader=false"
                                    >Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>

                </div>

            </div>

        </header>


        <div class="my-search" v-if="!openEditHeader">
            <form class="form-search">
                <input type="search" placeholder="Исследовать мир" class="form-search__input">
                <button type="submit" class="form-search__submit">
                    <svg class="form-search__icon">
                        <use :xlink:href="urlInlineSvgSprite+'#search'"></use>
                    </svg>
                </button>
            </form>
        </div>


        <section class="new">

            <div class="new__container">

                <h2 class="new__title">Новое в мире</h2>

                <ul class="new__card-list">
                    <li v-for="card in loadedCards" :key="card.id" class="new__card-item">
                        <appCard
                            :cardObject="card"
                            @clickCard="cardClickHandler"
                        >
                        </appCard>
                    </li>
                </ul> 

                <div class="new__button-show-more">
                    <button type="button" class="site-button site-button_theme-light"
                        @click="loadedCardsPush(startPhotoLoadingPos)"
                        :class="{disabled : amountLoadedPhotos===-1}"
                    >Показать ещё</button>
                </div>

            </div>


            <div class="new__big-card-slider" v-if="openBigCardSlider"
                :style="{top : bigCardSliderTop+'px'}"
            >

                    <div class="big-card-slider">

                        <flickity ref="flickity" :options="flickityOptions" class="big-card-slider__container">

                                <appBigCard v-for="bigCard in cards" :key="bigCard.id"
                                    :cardObject="bigCard"
                                    :userId="bigCard.authorId"
                                    >                                                               
                                </appBigCard>

                        </flickity>

                        <div class="big-card-slider__close">
                            <button class="round-button round-button_close-transparent" type="button"
                                @click="openBigCardSlider=false"
                            ></button>
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


        <section class="my-albums">

            <div class="my-albums__container">

                <div class="my-albums__topgroup">
                    <h2 class="my-albums__title">Мои альбомы</h2>
                    <div class="my-albums__button-plus">
                        <button class="round-button round-button_plus"                            
                            @click="openChangeMyAlbum=true; 
                                    albumChangeMode='add'"
                        ></button>
                    </div>
                </div>

                <ul class="my-albums__albums-list">
                    <li v-for="myAlbum in myAlbums" :key="myAlbum.id" class="my-albums__albums-item">
                        <appMyalbum 
                            @clickEditMyAlbum="clickEditAlbumHandler"
                            :myAlbumObject="myAlbum"                            
                        ></appMyalbum>
                    </li>
                </ul> 

            </div>


            <div class="my-albums__change-album" v-if="openChangeMyAlbum">
                <appChangeAlbum
                    @clickCloseChangeMyAlbum="openChangeMyAlbum=false"
                    :myAlbumObject="currentAlbum"                    
                    :mode="albumChangeMode"
                ></appChangeAlbum>

            </div>
        </section>


        <footer class="footer"
            :style="bgCurrentUser">

            <div class="footer__container">	

                <div class="footer__button-up">
                    <button class="round-button round-button_up"
                        @click="scrollToTop"
                    ></button>
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
    import appCard from '../vue-components/app-card.vue'
    import appBigCard from '../vue-components/app-big-card.vue'
    import appMyalbum from '../vue-components/app-my-album.vue'
    import appChangeAlbum from '../vue-components/app-change-album.vue'

    import dataJSON_cards from '../json/cards.json'
    import dataJSON_albums from '../json/albums.json'
    import dataJSON_socials from '../json/socials.json'
    import dataJSON_users from '../json/users.json'

    import Flickity from 'vue-flickity';

    export default {   

        components: {
            appCard, appBigCard, appMyalbum, appChangeAlbum,
            Flickity,
        },

        data() {
            return {
                openBigCardSlider: false,
                openEditProfile: false,
                openEditHeader: false,
                openChangeMyAlbum: false,

                urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

                isActiveSocial: false,            
                currentSocialId: '',
                windowWidth: 0,
                activeSocialLink: '',

                albumChangeMode: '',

                idCurrentPhoto: 0,

                cards: dataJSON_cards,
                myAlbums: dataJSON_albums,
                socials: dataJSON_socials,
                users: dataJSON_users,

                loadedCards: [],
                amountLoadedPhotos: 0,
                startPhotoLoadingPos: 0,
  
                currentAlbum: {},

                bigCardSliderTop: 0,

                flickityOptions: {
                    prevNextButtons: false,
                    pageDots: false,
                    wrapAround: true,
                    freeScroll: false,
                    groupCells: true,
                    contain: true
                },                
            }
        },


        computed: {
            socEdit() {
                return this.$refs['soc-edit'];
                },
            // idCurrentUser() {
            //     return this.$route.params.id;
            //     },
            currentUserObject() {                
                return this.users.find(user => user.id == this.$route.params.id);
                },
            bgCurrentUser() {
                let bgUser = "";
                if (this.currentUserObject.urlUserCover) 
                    bgUser = "backgroundImage: url(" + this.currentUserObject.urlUserCover + ")";
                return bgUser;
                },
        },


        methods: {

            socEditMouseLeaveHandler() {
                if (this.windowWidth > 480) {
                    this.isActiveSocial = false;

                    this.currentUserObject.userSocials.map(social => { 
                        social.isActive = false;
                    });
                }
            },

            socialClickHandler(socialId) {
                
                if (this.windowWidth <= 480) {
                    
                    this.currentSocialId = socialId;

                    this.currentUserObject.userSocials.map(social => { 
                            if (this.currentSocialId) {
                                if (social.id !== this.currentSocialId) {
                                    social.isActive = false;
                                }
                                else {
                                    social.isActive = !social.isActive;
                                    this.isActiveSocial = social.isActive;
                                    this.activeSocialLink = social.link;
                                }
                            }                        
                        }
                    );

                }
            
            },

            socialMouseHandler(socialId, e) { 

                if (this.windowWidth > 480) {
                    
                    if (e.type=='mouseenter') {

                    this.currentSocialId = socialId; 

                    this.currentUserObject.userSocials.map(social => { 
                            if (this.currentSocialId) {

                                if (social.id !== this.currentSocialId) {
                                    social.isActive = false;
                                }
                                else {
                                    social.isActive = !social.isActive;
                                    this.isActiveSocial = social.isActive;
                                    this.activeSocialLink = social.link;
                                }
                            }
                            
                        });

                    } else if (e.type=='mouseleave') {

                        let elem = e.relatedTarget;

                        while(elem && elem != this.socEdit) {
                            elem = elem.parentElement;
                        }
                        
                        if (elem !== this.socEdit) {
                            this.userSocials.map(social => { 
                                social.isActive = false;
                            });
                            this.isActiveSocial = false;
                        }

                    }

                }
            },

            cardClickHandler(cardId) {
                
                this.openBigCardSlider = true;
                this.bigCardSliderTop = window.pageYOffset + 40;

                let photoIndex = 0;

                this.cards.find(card => {
                    if (card.id !== cardId) photoIndex++;
                    else this.idCurrentPhoto = photoIndex;
                });                
                this.flickityOptions.initialIndex = this.idCurrentPhoto;
            },

            clickEditAlbumHandler(clickedAlbumId) {
                this.openChangeMyAlbum=true; 
                this.albumChangeMode='edit';
                this.currentAlbum={...clickedAlbumId};
            },

            checkWidth() {

                if (this.$route.params.id && this.currentUserObject) {

                    this.windowWidth = window.innerWidth;
    
                    if (this.windowWidth > 480) {
    
                        this.isActiveSocial = false;
                        // console.log('= ',this.currentUserObject);
                        
                        this.currentUserObject.userSocials.map(social => 
                            {
                                social.isActive = false;
                            }
                        );
                    }
    
                    if (this.amountLoadedPhotos === 0) {
                        if (this.amountLoadedPhotos !== 2 && this.windowWidth <= 768) this.amountLoadedPhotos = 2;
                        else if (this.amountLoadedPhotos !== 4 && this.windowWidth <= 1200) this.amountLoadedPhotos = 4;
                        else if (this.amountLoadedPhotos !== 6 && this.windowWidth > 1200) this.amountLoadedPhotos = 6;
                    }

                }
            },
            
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },

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

            next() {
                this.$refs.flickity.next();
            },
                
            previous() {
                this.$refs.flickity.previous();
            }
        },

        created() {
            window.addEventListener('resize', this.checkWidth);            
            this.loadedCardsPush(this.startPhotoLoadingPos);
        },

        mounted() {
            this.windowWidth = window.innerWidth;
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
        text-shadow: -1px 1px 3px $color-text;
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

            @include tablets {
                flex-direction: row;
            }
        }

        &__button-logout {
            position: absolute;
            top: 20px;
            left: 0;
            
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
        }
        

        &__avatar {
            width: 100%;
            text-align: center;
            height: 50px;
            flex-shrink: 0;
            margin-right: 22px;

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

             @include tablets {
                margin-bottom: 20px;
             }
        }

        &__text {
            font-family: 'ProximaNova-Light';
            text-align: center;
            font-size: 14px;
            color: rgba(#{$color-white}, 0.8);
            margin-bottom: 18px;

            @include tablets {
                text-align: left;
                padding-right: 120px;
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
            }
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
            min-width: 300px;
            display: flex;
            flex-direction: column;
            color: $color-text;

        }
    }

        
    .form-edit-header {
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
    }

        
    .edit-profile {

        @include popup;

        &__card {
            min-width: 300px;
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

        &__list {
            display: flex;
            justify-content: center;
        }

        &__link {
            display: block;
            font-size: 0px;
            width: 22px;
            height: 22px;
            border-radius: 5px;
            margin-right: 5px;
            margin-bottom: 10px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;


            @include tablets {
                margin-right: 10px;
            }

            &_vk {		
                background-image: svg-load('soc_vk.svg', fill=rgba(#{$color-white}, 0.8));
                    &:hover, &:active, &:focus {
                        background-image: svg-load('soc_vk.svg', fill=rgba(#{$color-white}, 0.95));
                    }
            }
            &_tw {		
                background-image: svg-load('soc_twitter.svg', fill=rgba(#{$color-white}, 0.8));
                    &:hover, &:active, &:focus {
                        background-image: svg-load('soc_twitter.svg', fill=rgba(#{$color-white}, 0.95));
                    }
            }
            &_google {		
                background-image: svg-load('social_google.svg', fill=rgba(#{$color-white}, 0.8));
                    &:hover, &:active, &:focus {
                        background-image: svg-load('social_google.svg', fill=rgba(#{$color-white}, 0.95));
                    }
            }
            &_fb {		
                background-image: svg-load('soc_fb.svg', fill=rgba(#{$color-white}, 0.8));
                    &:hover, &:active, &:focus {
                        background-image: svg-load('soc_fb.svg', fill=rgba(#{$color-white}, 0.95));
                    }                
            }
            &_email {		
                background-image: svg-load('soc_email.svg', fill=rgba(#{$color-white}, 0.8));
                    &:hover, &:active, &:focus,
                    .socials__link_active {
                        background-image: svg-load('soc_email.svg', fill=rgba(#{$color-white}, 0.95));
                    }                   
            }
            
            &_active {
                position: relative;

                box-sizing: content-box;
                border-bottom: 10px solid transparent;
                margin-bottom: 0px;

                &::after {
                    content: '';
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
            }

            &:hover {
                box-sizing: content-box;
                border-bottom: 10px solid transparent;
                margin-bottom: 0px;
                z-index: 20;
            }
            &:hover, &:active, &:focus {
                background-size: 22px;
            }

        }
    }


    .my-search {
        min-width: 300px;
        font-family: 'ProximaNova-Light';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;
        padding: 10px 5%;
        position: relative;

        height: 60px;
        overflow: hidden;

        @include tablets {
            align-items: flex-end;
        }
        
        &__show-new {
            padding: 5px;
            padding-top: 15px;
        }
    }


    .form-search {
        position: relative;
        width: 350px;
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
        }

        &__submit {
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            height: 15px;
            width: 15px;
            padding: 0;
            margin: 0;
            border: none;
            background: none;
            outline: none!important;
            cursor: pointer;

            & svg {
                width: 15px;
                height: 15px;
                fill: $color-text;
            }
        }
    }


    .new {
        min-width: 320px;
        padding: 30px 0;
        
        /* position: relative; */
        min-height: 900px;

        &__container {
            margin: 0 auto;
            width: 90%;
            min-width: 300px;
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
        }

        &__big-card-slider {
            @include fixed-popup-container;
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


    .soc-edit {
        @include popup();

        display: none;
        min-width: calc(320px * 0.88);
        background-color: $color-white;
        position: absolute;
        top: calc(100% - 12px);
        z-index: 13;
        /* overflow: unset; */

        @include tablets {
            min-width: unset;
            width: 280px;
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            top: -10px;
            width: 100%;
            height: 10px;
            background-color: transparent;
        }

        &_showed {
            display: block;
        }
        /* &:hover {
            display: block;
        } */

        &__card {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            padding: 10px;
        }

        &__input {
            @include popup-input();
            min-width: unset;
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
            min-width: 300px;
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
        }

        &__change-album {
            @include popup-container;
        }
        
    }


    .footer {
        text-shadow: -1px 1px 3px $color-text;
        background-image: linear-gradient(rgba(50, 50, 50, 0.5), rgba(50, 50, 50, 0.3)), url('/img/no_album_cover.jpg');
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
            width: 90%;
            position: relative;

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
            
            @include tablets {
                flex-basis: 40%;
                text-align: left;
            }
        }
        &__copyright {			
            color: rgba($color-white, 0.7);
            text-shadow: -1px 1px 2px rgba(#000, 0.9);
            
            @include tablets {
                flex-basis: 40%;
                text-align: right;
            }
        }

    }

</style>