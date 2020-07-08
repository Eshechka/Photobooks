<template>
    <div class="wrapper">
        <div class="wrapper__overlay wrapper__overlay_black" v-if="openBigCard || openAddAlbum || openEditProfile"></div>
        <div class="wrapper__overlay wrapper__overlay_white" v-if="openEditHeader"></div>

        <header class="header">

            <div class="header__container" v-if="!openEditHeader">		
                <div class="header__logout">
                    <button type='button' class="round-button round-button_logout"></button>
                </div>
                <div class="header__edit">
                    <button type='button' class="round-button round-button_edit"></button>
                </div>
                <!-- <div class="header__top"> -->
                    <!-- <div class="header__logout">
                        <button type='button' class="round-button round-button_logout"></button>
                    </div> -->
                <!-- <div class="header__user"> -->
                <div class="header__avatar">
                    <img class="header__avatar-img" :src='urlAvatar' alt="avatar">
                </div>
                <!-- </div> -->
                <div class="header__info">
                    <h1 class="header__title">Антон Черепов</h1>
                    <!-- <div class="header__edit">
                        <button type='button' class="round-button round-button_edit"></button>
                    </div> -->
                <!-- </div> -->

                    <div class="header__text">		
                        Я веб разработчик. Мне 24 года. Люблю путешествия, кодинг, фриланс и активный отдых.		
                    </div>

                    <div class="header__socials">
                        <ul class="socials__list">
                            <li class="socials__item">
                                <a href="/change__me" class="socials__link socials__link_vk">vk</a>
                            </li>
                            <li class="socials__item">
                                <a href="/change__me" class="socials__link socials__link_fb">fb</a>
                            </li>
                            <li class="socials__item">
                                <a href="/change__me" class="socials__link socials__link_tw">tw</a>
                            </li>
                            <li class="socials__item">
                                <a href="/change__me" class="socials__link socials__link_google">g+</a>
                            </li>
                            <li class="socials__item">
                                <a href="/change__me" class="socials__link socials__link_email">email</a>
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
                                        <img class="form-edit-profile__img" :src="urlCover" alt="background cover image">
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
                                    <button class="site-button site-button_theme-just-text" type="button">Отменить</button>
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
                                        <img class="form-edit-header__img" :src="urlAvatar" alt="avatar image">
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
                                            <li v-for="social in socials" :key="social.id" class="socials__item"> 
                                                <a
                                                    @click.prevent="socialClickHandler(social.id, $event)" 
                                                    :class="[`socials__link socials__link_${social.text}`,
                                                            {'socials__link_active': social.isActive}]"
                                                >{{social.text}}</a>
                                            </li>
                                        </ul>


                                        <div v-if="isActiveSocial" class="soc-edit">

                                            <div class="soc-edit__card">

                                                <form class="soc-edit__form">
                                                    <input 
                                                        v-model="activeSocialLink"
                                                    type="text" class="soc-edit__input">

                                                    <div class="soc-edit__buttons">
                                                        <button type="submit" class="site-button site-button_theme_light">Сохранить</button>
                                                        <button type="button" class="site-button site-button_theme-just-text">Отменить</button>
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
                                    <button class="site-button site-button_theme-just-text" type="button">Отменить</button>
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
                    <li v-for="card in cards" :key="card.id" class="new__card-item">
                        <appCard :cardObject="card"
                            @clickCard="cardClickHandler"
                        >
                        </appCard>
                    </li>
                </ul> 

                <div class="new__button-show-more">
                    <button type="button" class="site-button site-button_theme-light">Показать ещё</button>
                </div>

            </div>


            <div class="new__big-card" v-if="openBigCard">
                <div class="big-card">

                    <div class="big-card__close"
                        @click="openBigCard=false"
                    >
                        <button class="round-button round-button_close-transparent" type="button"></button>
                    </div>

                    <div class="big-card__card">

                        <div class="big-card__card-img">
                            <img class="big-card__img" :src="cards[idCurrentPhoto].photo" alt="big card image">
                        </div>

                        <div class="big-card__author-info">

                            <div class="big-card__avatar">
                                <img class="big-card__avatar-img" :src="cards[0].avatarPhoto" alt="card avatar">
                            </div>
                            
                            <div class="big-card__name">Анна 
                                <div class="big-card__surname">Богданова</div>
                            </div>
                            
                            <div class="big-card__likes">
                                <button type="button" class="big-card__button big-card__button_likes">16</button>
                            </div>

                        </div>


                        <div class="big-card__desc">

                            <h3 class="big-card__title">Путешествие на речном трамвайчике</h3>
                        
                            <div class="big-card__desc-text">Мы отправились в <span class='site-tag'>#путешествие</span> 2 дня назад, но уже сейчас такое ощущение, что мы посмотрели целый новый мир. Далее будет ещё одно описательное предложение. Возможно оно также будет с <span class='site-tag'>#тегами</span>. </div>
        
                        </div> 

                        <div class="big-card__comments">

                            <div class="big-card__comments-topgroup">
                                <h4 class="big-card__comments-title">Комментарии</h4>
                                <button type="button" class="big-card__button big-card__button_tick"></button>
                            </div>
                            
                            <div class="big-card__my-comment">
                                <div class="big-card__my-comment-name">Антон Черепов</div>
                            
                                <form class="big-card__my-comment-form">

                                    <textarea class="big-card__input" name="" id="" cols="10" rows="1" placeholder="Добавить комментарий"></textarea>
                                    <div class="big-card__my-comment-submit">
                                        <button class="site-button site-button_theme-light" type="submit">Добавить</button>
                                    </div>

                                </form>
                            </div>

                            <div class="comment">

                                <div class="comment__author">Виталий Виноградов</div>
                                <div class="comment__text">Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением. Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца.</div>

                            </div>
                            <div class="comment">

                                <div class="comment__author">Татьяна Литвинова</div>
                                <div class="comment__text">Эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением.</div>

                            </div>
        
                        </div> 

                    </div>
                </div>
            </div>

        </section>


        <section class="my-albums">

            <div class="my-albums__container">

                <div class="my-albums__topgroup">
                    <h2 class="my-albums__title">Мои альбомы</h2>
                    <div class="my-albums__button-plus">
                        <button class="round-button round-button_plus"></button>
                    </div>
                </div>

                <ul class="my-albums__albums-list">
                    <li v-for="myAlbum in myAlbums" :key="myAlbum.id" class="my-albums__albums-item">
                        <appMyalbum :myAlbumObject="myAlbum">                            
                        </appMyalbum>
                    </li>
                </ul> 

            </div>

            <div class="my-albums__add-album" v-if="openAddAlbum">
                <div class="add-album">
                    <div class="add-album__card">

                        <div class="add-album__topgroup">
                            <h4 class="add-album__title">Добавить альбом</h4>
                            <button type="button" class="add-album__button add-album__button_close"></button>
                        </div>
                        
                        <div class="add-album__form">
                            <form class="form-addAlbum">

                                <label class="form-addAlbum__label">Название альбома
                                    <input class="form-addAlbum__input" type="text" placeholder="Мой альбом">
                                </label>

                                <label class="form-addAlbum__label">Описание
                                    <textarea class="form-addAlbum__input form-addAlbum__input_textarea" cols="20" rows="5" placeholder="Описание альбома"></textarea>
                                </label>
                        

                                <div class="form-addAlbum__cover">

                                    <div class="form-addAlbum__cover-img-wrapper">
                                        <img class="form-addAlbum__cover-img" :src="urlCover" alt="card avatar">
                                    </div>

                                    <div class="form-addAlbum__cover-button">
                                        <button class="site-button site-button_theme-light" type="button">Загрузить обложку</button>
                                    </div>

                                </div>
                                
                                <div class="form-addAlbum__buttons">
                                    <button class="site-button" type="submit">Сохранить</button>
                                    <button class="site-button site-button_theme-just-text" type="button">Отменить</button>
                                </div>

                            </form>
                        </div>      

                    </div>
                </div>
            </div>
        </section>


        <footer class="footer">

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
  import appMyalbum from '../vue-components/app-my-album.vue'

  export default {   

    components: {
      appCard, appMyalbum,
    },

    data() {
        return {
            openBigCard: false,
            openAddAlbum: false,
            openEditProfile: false,
            openEditHeader: false,

            urlAvatar: require('../img/anton.png').default,
            urlCover: require('../img/bg-main-header.png').default,
            urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

            isActiveSocial: false,
            activeSocialLink: '',

            idCurrentPhoto: 0,

            cards: [
                {   id: 1, title: 'Путешествие на лодке по озеру', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img1.png', comments: '9', likes: '15', folderName: 'Прогулки по воде',  },
                {   id: 2, title: 'Отдых в палатке', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img2.png', comments: '9', likes: '15', folderName: 'Прогулки по воде2',  },
                {   id: 3, title: 'Любимые лошадки', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img3.png', comments: '9', likes: '15', folderName: 'Прогулки по воде3',  },
            ],
            myAlbums: [
                {   id: 1, photo: '../img/album-img1.png', folderName: 'Поход в горы', link: './album.html', desc: 'Фотографии природы леса, енотов и оленей...' },
                {   id: 2, photo: '../img/album-img2.png', folderName: 'Животные', link: './album.html', desc: 'Фотографии животных...' },
                {   id: 3, photo: '../img/album-img3.png', folderName: 'Прогулки на лодке', link: './album.html', desc: 'Фотографии ...' },
                {   id: 4, photo: '../img/album-img3.png', folderName: 'Прогулки', link: './album.html', desc: 'Фотографии ...'  },
                {   id: 5, photo: '../img/album-img3.png', folderName: 'Прогулки', link: './album.html', desc: 'Фотографии ...'  },
            ],
            socials: [
                {   id: 'vk', icon: '../icons/soc_vk.svg', text: 'vk', isActive: false, link: 'https://vk.com/' },
                {   id: 'fb', icon: '../icons/soc_fb.svg', text: 'fb', isActive: false, link: 'https://vk.com/' },
                {   id: 'tw', icon: '../icons/soc_twitter.svg', text: 'tw', isActive: false, link: 'https://vk.com/' },
                {   id: 'google', icon: '../icons/social_google.svg', text: 'google', isActive: false, link: 'https://vk.com/' },
                {   id: 'email', icon: '../icons/soc_email.svg', text: 'email', isActive: false, link: 'https://vk.com/' },
            ]
        }
    },

    methods: {
        socialClickHandler(socialId, e) {

            this.socials.map(social => 
                {
                    if (social.id !== socialId) 
                        social.isActive = false;
                    else {
                        social.isActive = !social.isActive;
                        this.isActiveSocial = social.isActive;
                        this.activeSocialLink = social.link;
                    }
                }
            );
            
           
        },

        cardClickHandler(cardId, e) {
            console.log('cardId', cardId);
            console.log('this.idCurrentPhoto = ', this.idCurrentPhoto);
            this.openBigCard = true;
            this.idCurrentPhoto = cardId-1;
            
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
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
            width: 90%;
            position: relative;

            @include tablets {
                flex-direction: row;
            }
        }

        &__logout {
            position: absolute;
            top: 20px;
            left: 0;
            
            @include tablets {
                top: 70px;
                right: 0;
                left: unset;
            }         
        }

        &__edit {
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
            /* text-align: center; */
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

        &__socials {
            /* text-align: center;		 */
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
            width: 20px;
            height: 20px;
            border-radius: 5px;
            margin-right: 5px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;

            &:hover, &:active, &:focus {
                background-size: 22px;;
            }

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
                    &:hover, &:active, &:focus {
                        background-image: svg-load('soc_email.svg', fill=rgba(#{$color-white}, 0.95));
                    }                   
            }

            &_active {
                background-color: rgba(#{$color-white}, 0.3);
                position: relative;

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
        position: relative;
        min-width: 320px;
        padding: 30px 0;

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
                justify-content: space-between;
            }
        }

        &__card-item {
            margin-bottom: 10px;

            @include tablets {
                width: 48%;
                margin-bottom: 20px;
            }
        }

        &__big-card {
            @include popup-container;
        }
            
    }


    .soc-edit {
        @include popup();
        min-width: calc(320px * 0.88);
        position: absolute;
        top: 100%;
        z-index: 13;
        overflow: unset;

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


    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    }


    .big-card {
        @include popup;
        overflow: unset;

        background-color: rgb(246, 246, 246);
        position: relative;

        &__close {
            position: absolute;
            right: -36px;
            top: -36px;
            z-index: 15;
        }

        &__card {
            overflow: hidden;
            min-width: 300px;
            background-color: $color-white;
            display: flex;
            flex-direction: column;
        }

        &__card-img {
            width: 100%;
            height: 200px;
            position: relative;
        }

        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__author-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
        }

        &__avatar {
            margin-right: 10px;
        }

        &__likes {
            background-color: rgb(238, 70, 52);
            min-width: 85px;
            min-height: 38px;
            border-radius: 30px;
            display: inline-flex;
            align-items: center;
            color: $color-white;
            margin-left: auto;
        }

        &__name {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
        }

        &__button {
            font-family: 'Panton-Bold';
            font-size: 16px;
            color: $color-white;
            padding-left: 50px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 18px 50%;

            &_tick {
                background-image: svg-load('arrow_left.svg', fill=rgba(#{$color-text}, 0.2));
                background-position: 50%;
                padding: 0px;
                height: 20px;
                width: 20px;
                background-size: 8px;
                transform: rotate(90deg);
            }

            &_likes {
                background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgb(238, 70, 52), stroke-width=2px, stroke=rgba(#{$color-white}, 0.95));
            }
        }

        &__desc {
            padding: 10px;
            padding-bottom: 30px;
        }

        &__title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
        }


        &__comments {
            background-color: rgba(f6f6f6, 0.8);
            display: flex;
            flex-direction: column;
            padding: 20px 10px;
        }

        &__comments-topgroup {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        &__comments-title {
            font-family: 'Proxima Nova Semibold';            
            font-size: 14px;
            line-height: 21px;
            padding-right: 10px;
        }

        &__my-comment {
            padding-bottom: 10px;
        }

        &__my-comment-name {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 10px;
        }

        &__input {
            @include popup-input();

            width: 80%;
            padding: 13px 16px;
            resize: vertical;            
            min-height: 48px;
            max-height: 150px;
            margin-bottom: 10px;
        }

    }


    .comment {
        background-color: rgba(f6f6f6, 0.8);
        display: flex;
        flex-direction: column;
        padding: 20px 10px;
        border-top: 1px solid #f2f2f2;

        &__author {
            font-family: 'Panton-Bold';
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 5px;
        }

        &__text {
            font-family: 'Myriad Pro';
            font-size: 14px;
            line-height: 21px;
        }

    }


    .my-albums {
        min-width: 320px;
        padding: 30px 0;
        background: rgb(246,246,246);
        background: linear-gradient(0deg, rgba(246,246,246,1) 0%, $color-white 100%);
        
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

            {
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
            background-color: #f2f2f2;
            padding: 10px;
        }
    }


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
            width: 90%;
            position: relative;

            @include tablets {
                flex-direction: row;
                justify-content: space-between;
            }
        }

        &__button-up {
            height: 60px;
            /* width: 100%; */

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
            color: rgba($color-white, 0.6);
            
            @include tablets {
                flex-basis: 40%;
                text-align: right;
            }
        }

    }

</style>