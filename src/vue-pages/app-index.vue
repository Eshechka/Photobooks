<template>
    <div class="wrapper">
        <div class="wrapper__overlay" v-if="openBigCard || openAddAlbum"></div>

        <header class="header">

            <div class="header__container">		

                <div class="header__top">
                    <div class="header__logout">
                        <button type='button' class="round-button round-button_logout">
                            
                        </button>
                    </div>
                    <div class="header__user">
                        <div class="avatar">
                            <img class="avatar__img" :src='urlAvatar' alt="avatar">
                        </div>
                        <h1 class="header__title">Антон Черепов</h1>
                    </div>
                    <div class="header__edit">
                        <button type='button' class="round-button round-button_edit">
                            
                        </button>
                    </div>
                </div>

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

        </header>


        <div class="my-search">
            
            <form class="form-search">
                <input type="search" value="" placeholder="Исследовать мир" class="form-search__input">
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
                        <appCard :cardObject="card">                            
                        </appCard>
                    </li>
                </ul> 

                <div class="new__button-show-more">
                    <button type="button" class="site-button site-button_theme-light">Показать ещё</button>
                </div>

            </div>


            <div class="new__big-card" v-if="openBigCard">
                <div class="big-card">
                    <div class="big-card__card">

                        <div class="big-card__card-img">
                            <img class="big-card__img" :src="cards[0].photo" alt="big card image">
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

                                    <textarea class="big-card__my-comment-text" name="" id="" cols="10" rows="1" placeholder="Добавить комментарий"></textarea>
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
                        
                                <!-- <button class="site-button site-button_theme-light" type="submit">Добавить</button> -->

                                
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
  import appCard from '../vue-components/app-card.vue'
  import appMyalbum from '../vue-components/app-my-album.vue'

  export default {   

    components: {
      appCard, appMyalbum,
    },

    data() {
        return {
            openBigCard: false,
            openAddAlbum: !false,

            urlAvatar: require('../img/anton.png').default,
            urlInlineSvgSprite: require('../img/spriteIcons.svg').default,
            cards: [
                {   id: 1, title: 'Путешествие на лодке по озеру', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img1.png', comments: '9', likes: '15', folderName: 'Прогулки по воде',  },
                {   id: 2, title: 'Путешествие на лодке по озеру2', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img1.png', comments: '9', likes: '15', folderName: 'Прогулки по воде2',  },
                {   id: 3, title: 'Путешествие на лодке по озеру3', avatarPhoto: '../img/card-avatar1.png', photo: '../img/card-img1.png', comments: '9', likes: '15', folderName: 'Прогулки по воде3',  },
            ],
            myAlbums: [
                {   id: 1, photo: '../img/album-img1.png', folderName: 'Поход в горы',  },
                {   id: 2, photo: '../img/album-img1.png', folderName: 'Поход в горы2',  },
                {   id: 3, photo: '../img/album-img1.png', folderName: 'Поход в горы3',  },
            ]
        }
    }
        
    }

</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/blocks/header.pcss';
    @import '../styles/blocks/avatar.pcss';
    @import '../styles/blocks/socials.pcss';
    @import '../styles/blocks/form-search.pcss';
    @import '../styles/blocks/new.pcss';
    @import '../styles/blocks/my-search.pcss';
    @import '../styles/blocks/site-button.pcss';
    @import '../styles/blocks/my-albums.pcss';
    @import '../styles/blocks/footer.pcss';




    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
    }


    .card {
        min-width: 300px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        background-color: rgb(246, 246, 246);
        border-radius: 3px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        color: $color-text;

        &__img-card {
            width: 100%;
            height: 200px;
        }
        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
        
        &__info {
            display: flex;
            padding: 10px;
            background-color: $color-white;
        }

        &__avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        &__avatar-img {
            object-fit: cover;
        }
        &__desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;	
        }
        &__desc-title {
            font-family: 'ProximaNova-Light';
            font-size: 14px;
        }
        &__button {
            font-family: 'Panton Bold';
            font-size: 16px;
            color: $color-text;
            padding-left: 30px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;

            &_comments {
                background-image: svg-load('comments.svg', fill=rgba(#{$color-text}, 0.2));
            } 
            &_likes {
                background-image: svg-load('heart.svg', fill=rgba(#{$color-text}, 0.2));
            }
        }

        &__folder {
            text-align: right;	
            padding: 10px;		
        }

        &__folder-name {
            display: inline-block;
            padding-left: 30px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 0 50%;
            
            background-image: svg-load('album.svg', fill=rgba(#{$color-text}, 0.2));
            
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
        }

    }


    .big-card {
        width: 100%;        
        min-width: 320px;
        background-color: rgb(246, 246, 246);
        border-radius: 3px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        &__card {
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

        &__my-comment-text {
            border: 1px solid rgb(216, 214, 214);
            background-color: $color-white;
            min-width: 278px;
            width: 80%;
            padding: 13px 16px;
            border-radius: 30px;
            resize: vertical;
            min-height: 48px;
            max-height: 150px;
            margin-bottom: 10px;
        }

    }

    .add-album {

        width: 100%;        
        min-width: 320px;
        background-color: #f2f2f2;
        border-radius: 3px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        &__card {
            min-width: 300px;
            background-color: $color-white;
            display: flex;
            flex-direction: column;
        }

        &__topgroup {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        &__button {
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 50%;

            &_likes {
                background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgb(238, 70, 52), stroke-width=2px, stroke=rgba(#{$color-white}, 0.95));
            }
        }

        &__title {
            font-family: 'Proxima Nova Semibold';
            font-size: 18px;
            line-height: 24px;
        }


        &__textarea {
            border: 1px solid rgb(216, 214, 214);
            background-color: $color-white;
            min-width: 278px;
            width: 80%;
            padding: 13px 16px;
            border-radius: 30px;
            resize: vertical;
            min-height: 48px;
            max-height: 150px;
            margin-bottom: 10px;
        }
    }

    .form-addAlbum {
        display: flex;
        flex-direction: column;
        padding: 10px;

        &__input {
            display: block;
            border-width: 1px  rgb(216, 214, 214) solid;
            background-color: $color-white;
            min-width: 280px;
            min-height: 38px;
            border-radius: 20px;
            padding: 10px 15px;

            &_textarea {
                resize: none;
            }
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
            font-family: 'Panton Bold';
            font-size: 30px;
            margin-bottom: 20px;
            width: 100%;
            text-align: center;
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

        &__albums-item {
            margin-bottom: 10px;
        }
        
    }
</style>