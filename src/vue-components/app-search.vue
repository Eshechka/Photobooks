<template>
    <div class="wrapper">

        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigCardSlider"
            @click="openBigCardSlider = false"
        ></div>

		<header ref='header' class="header">

            <div class="header__container">	

                <h1 class="header__title">Исследуй мир</h1>	

                <div class="header__button-home">
                    <router-link title="Перейти на главную" class="button button_icon_space button_size_changing button_theme_color_changing"
                        to="/"
                        @click.prevent>
                        <span class="button__text">На главную</span>
                        <span class="button__icon button__icon_home"></span>
                    </router-link>
                </div>

            </div>

            <div class="header__search">

                <div class="header__container header__container_search">	

                    <div class="header__avatar">
                        <img class="header__avatar-img" :src='loggedUserObject.avatar ? `${urlAvatars}/${loggedUserObject.avatar}` : require("../img/no_avatar.png").default' alt="avatar">
                    </div>
                    <div class="header__info">
                        <h2 class="header__user-name">{{loggedUserObject.name}}</h2>
                    </div>

                    <form class="form-search" @submit.prevent="clickSearchHandle">
                        <input type="search" class="form-search__input"
                            :class="{'form-search__input_empty': emptySearch}"
                            :placeholder="emptySearch ? 'Заполните поле поиска' : 'Исследовать мир'"
                            @input="emptySearch=false"
                            v-model="searchedStr">
                        <button title="Нажмите для поиска" type="submit" class="form-search__submit">
                            <svg class="form-search__icon">
                                <use :xlink:href="urlInlineSvgSprite+'#search'"></use>
                            </svg>
                        </button>
                    </form>

                    <div class="header__show-new">
                        <button class="button button_size_m button_theme_minimalizm"
                            @click="showMode='new'; emptySearch=false">
                            <span title="Показать новые фотографии" class="button__text">Показать новые</span>                            
                        </button>
                    </div>

                </div>
            </div>

        </header>

        <main class="maincontent">

            <section class="searched" :style="{ height: heightSectionForSlider }">

                <div class="searched__container" v-if="!openBigCardSlider">

                    <p class="searched__text" v-if="showMode==='new'">
                        Новое в мире
                    </p>
                    <p class="searched__text" v-else-if="loadedCards.length">
                        Количество найденных результатов по запросу '{{searchedStrToShow}}': <span class="searched__amount">{{cards.length}}</span>
                    </p>
                    <p class="searched__text" v-else>
                        Увы, ничего не нашлось ничего по запросу '{{searchedStrToShow}}'
                    </p>

                    <ul class="searched__card-list">
                        <li v-for="card in loadedCards" :key="card.id" class="searched__card-item">
                            <appCard
                                :cardObject="card"
                                @click-card="cardClickHandler">
                            </appCard>
                        </li>
                    </ul> 

                    <div class="searched__button-show-more">
                        <button type="button" class="button button_size_m button_theme_light"
                            v-if="loadedCards.length"
                            @click="loadedCardsPush(startPhotoLoadingPos)"
                            :disabled="amountLoadedPhotos===-1"
                            :title="amountLoadedPhotos===-1 ? 'Больше нет фотографий для загрузки' : 'Загрузить фотографии'"
                        >Показать ещё</button>
                    </div>
                </div>


                <div class="searched__big-card-slider" v-if="openBigCardSlider"
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

        </main>

		<footer ref='footer' class="footer" :style="{ backgroundImage: `url(${loggedUserObject.cover})`}" >

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

    import { baseStorageUrl } from '../requests.js';
    
    import { mapState, mapActions } from 'vuex';

    import Flickity from 'vue-flickity';

    export default {   

        components: {
            appCard, appBigCard,
            Flickity,
        },

        data() {
            return {
                openBigCardSlider: false,

                urlPhotos: baseStorageUrl+'/photos',
                urlAvatars: baseStorageUrl+'/avatars',
                urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

                idCurrentPhoto: 0,

                cards: [],

                loadedCards: [],
                amountLoadedPhotos: 0,
                startPhotoLoadingPos: 0,


                showMode: '',
                searchedStr: '',
                searchedStrToShow: '',
                emptySearch: false,

                loggedUserObject: {
                    id: Number,
                    userSocials: [],
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

                heightHeaderFooterMobile: 0,
                heightSectionForSlider: `unset`,

                isMobile: window.innerWidth < 768,
            }
        },


        computed: {
            ...mapState('cards', {
                allCards: state => state.cards,
                searchedWord: state => state.searchedWord,
            }),
            mode() {
                return this.searchedWord ? 'searched' : 'new';
            },
            ...mapState('user', {
                loggeduser: state => state.user
            }),

        },


        methods: {
            ...mapActions('cards', ['updateAllCards', 'deleteSearchedWord']),

            async updateLoggedUser() {
                this.loggedUserObject = {...this.loggeduser};
                this.loggedUserObject.cover = this.loggedUserObject.cover ? `${this.urlPhotos}/${this.loggedUserObject.cover}` : "../img/no_album_cover.jpg";
            },

            async updateCards() {
                await this.updateAllCards();
                this.cards = this.allCards;
            },
            

            // ***** Обновить поиск по слову/хэштегу *****
            async updateSearchedCards(searchedStr) {
                await this.updateAllCards();
                let hashtagSearch = searchedStr[0] === '#';
                this.cards = this.allCards.filter(card => {
                    let isDescriptionHasSearched = card.description.toUpperCase().indexOf(searchedStr.toUpperCase()) !== -1;
                    let isTitleHasSearched = card.title.toUpperCase().indexOf(searchedStr.toUpperCase()) !== -1;
                    if (isDescriptionHasSearched || (!hashtagSearch && isTitleHasSearched)) {
                        return card;
                    }
                });
                this.searchedStrToShow=this.searchedStr;
            },

            // ***** Обновление результата поиска (при переходе с другой страницы или при повторном подряд клике по иконке в режиме search) *****
            async updateSearchHandle() {
                await this.updateSearchedCards(this.searchedStr);
                this.startNewLoad();
                this.searchedStr='';
            },

            // ***** Нажата иконка поиска по слову/хэштегу *****
            clickSearchHandle() {
                //пустой запрос
                if (this.searchedStr==='') {
                    this.emptySearch = true;
                }
                //повторный клик по иконке поиска в режиме search
                else if (this.showMode === 'search') {
                    this.updateSearchHandle();
                }
                //до этого был режим new
                else {
                    this.showMode = 'search';
                }
            },
            

            // ***** Начать загрузку фотографий по новой (при изменений искомого слова или смене режима: новые фото на поиск слова в описании или наоборот) *****
            startNewLoad() {
                this.loadedCards = [];
                this.amountLoadedPhotos = 0;
                this.startPhotoLoadingPos = 0;
                this.loadedCardsPush(this.startPhotoLoadingPos);
            },

            // ***** Загрузить некоторое количество фотографий (определяется шириной экрана), начиная с переданной позиции *****
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

            // ***** Клик по фотографии (открытие слайдера) *****
            cardClickHandler(cardId) {
                
                // if (!this.isMobile) this.bigCardSliderTop = window.pageYOffset + 40;

                let photoIndex = 0;

                this.cards.find(card => {
                    if (card.id !== cardId) photoIndex++;
                    else this.idCurrentPhoto = photoIndex;
                });                
                this.flickityOptions.initialIndex = this.idCurrentPhoto;
                this.openBigCardSlider = true;
                window.scrollTo({ top: 0 });
            },


            // ***** Установка параметров в зависимости от текущей ширины экрана (кол-во загружаемых фотографий при клике на кнопку "загрузить еще") *****
            checkWidth() {

                this.windowWidth = window.innerWidth;
                
                if (this.windowWidth < 768) this.isMobile=true;
                else this.isMobile=false;

                if (this.amountLoadedPhotos === 0) {
                    if (this.amountLoadedPhotos !== 6 && this.windowWidth <= 768) this.amountLoadedPhotos = 6;
                    else if (this.amountLoadedPhotos !== 4 && this.windowWidth <= 1200) this.amountLoadedPhotos = 4;
                    else if (this.amountLoadedPhotos !== 6 && this.windowWidth <= 1600) this.amountLoadedPhotos = 6;
                    else if (this.amountLoadedPhotos !== 8 && this.windowWidth > 1600) this.amountLoadedPhotos = 8;
                }
            },

            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },

            next() {
                this.$refs.flickity.next();
            },
                
            previous() {
                this.$refs.flickity.previous();
            },

        },

        watch: {
            async showMode(value) {

                if (value==='new') {
                    await this.updateCards();
                }
                else if (value==='search') {
                    await this.updateSearchedCards(this.searchedStr);
                    this.searchedStr='';                    
                }

                this.startNewLoad();
            },
            async searchedWord(value) {
                if (value) {
                    this.showMode = 'search';
                    this.searchedStr = value;            
                    await this.updateSearchHandle();
                    this.deleteSearchedWord();
                }
            },
            isMobile(value) {
                if (value) this.bigCardSliderTop = 0;
                else this.bigCardSliderTop = window.pageYOffset + 40;
            }
        },


        async created() {
            await this.updateLoggedUser();
            window.addEventListener('resize', this.checkWidth);            
        },

        async mounted() {
            // this.loggedUserObject.id = store.getters['user/loggedUser'].id;
            this.loggedUserObject.id = localStorage.getItem('userId');

            this.bigCardSliderTop = this.isMobile ? 0 : window.pageYOffset + 40;
            this.showMode = this.mode;
            this.searchedStr = this.searchedWord;
            await this.updateSearchHandle();
            this.deleteSearchedWord();
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
        background: rgba(255, 255, 255, 0.8);
        min-width: 320px;
        color: $color-white;
        position: relative;

        &__container {
            padding: 16px 0;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 90%;
            position: relative;
            @include max-with-container;

            &_search {
                padding: 10px 0;
                justify-content: center;
                align-items: center;            
                
                @include tablets {
                    padding: 0;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                }
            }
        }


        &__button-home {
            position: absolute;
            top: 20px;
            left: 0;
            z-index: 9;

            @include tablets {
                right: 0;
                left: unset;
            }
        }
        
        &__avatar {
            display: none;            

            @include tablets {
                flex-shrink: 0;
                display: inline-block;
                vertical-align: middle;
                width: 62px;
                height: 62px;
                margin-right: 20px;
            }
            @include desktop {
                width: 62px;
                height: 62px;
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
            display: none;

            @include tablets {            
                display: flex;
                flex-direction: column;
                align-items: center;
                align-items: flex-start;
                width: 150px;

                @include tablets {
                    width: 130px;
                }
                @include desktop {
                    width: 300px;
                }
            }
        }

        &__user-name {
            font-family: 'Panton-Bold';
            font-size: 21px;
            color: rgba($color-text, 1);
        }

        &__title {
            font-family: 'Panton-Bold';
            font-size: 42px;
            color: rgba($color-text, 1);
            margin: auto;
            padding: 0 50px;
        }

        &__search {
            min-width: 288px;
            font-family: 'ProximaNova-Light';
            background-color: #f1f1f1;
            overflow: hidden;
        }
        
        &__show-new {
            margin-top: 12px;

            @include tablets {
                margin-left: 20px;
                margin-top: 0;
            }
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
            width: calc(100% - 48px);
            height: 40px;
            border: none;
            appearance: none;
            outline: none;
            
            &_empty::placeholder {
                color: $color-carrot;
            }

            &::-webkit-search-cancel-button {
                appearance: none;
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
            width: 280px;
        }
        @include desktop {
            width: 380px;
        }
    }


    .searched {
        min-width: 320px;
        padding: 30px 0;

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

        &__text {
            font-family: 'Proxima Nova Semibold';
            font-size: 21px;
            color: rgba($color-text, 0.9);
            margin-top: 20px;
            margin-bottom: 20px;

            @include tablets {
                font-size: 28px;
                margin-top: 30px;
                margin-bottom: 30px;
            }
        }

        &__amount {
            font-family: 'Panton-Bold';
            font-size: 24px;
            color: rgba($color-text, 1);
            
            @include tablets {
                font-size: 32px;
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

            @include tablets {
                @include popup-container;
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

</style>