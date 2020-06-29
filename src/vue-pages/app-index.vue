<template>
    <div class="wrapper">
        <div class="wrapper__overlay" v-if="openBigCard"></div>

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

                            <h4 class="big-card__comments-title">Комментарии</h4>
                            <div class="big-card__my-name">Антон Черепов</div>
                        
                            <textarea class="big-card__my-comment-text" name="" id="" cols="10" rows="2" placeholder="добавить комментарий"></textarea>
                            <button class="site-button site-button_theme-light" type="submit">Добавить</button>

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
    /* @import '../styles/blocks/card.pcss'; */
    @import '../styles/blocks/new.pcss';
    @import '../styles/blocks/my-search.pcss';
    @import '../styles/blocks/site-button.pcss';
    @import '../styles/blocks/my-albums.pcss';
    /* @import '../styles/blocks/my-album.pcss'; */
    @import '../styles/blocks/footer.pcss';


    .site-tag {
        cursor: pointer;
        color: $color-blue;
        font-family: 'Proxima Nova Semibold';
        font-size: 14px;
        font-weight: bolder;
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
            /* width: 90%;
            margin: 0 auto;           */
            border-radius: 3px;
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
            padding: 10px;
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

        }
        &__surname {

        }

        &__button {
            font-family: 'Panton-Bold';
            font-size: 16px;
            color: $color-white;
            padding-left: 50px;

            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 18px 50%;

            &_likes {
                background-image: svg-load('heart.svg', viewBox='53 56 22 17', height='18px', fill=rgb(238, 70, 52), stroke-width=2px, stroke=rgba(#{$color-white}, 0.95));
            }
        }

        &__desc {
            padding: 10px;
            padding-bottom: 30px;
        }



        &__comments {
            background-color: rgba(f6f6f6, 0.8);
            display: flex;
            flex-direction: column;
            padding: 20px 10px;
        }


    }


    .comment {
        background-color: rgba(f6f6f6, 0.8);
        display: flex;
        flex-direction: column;
        padding: 20px 10px;

        &:not(:last-child) {
            border-bottom: 1px solid #f2f2f2;
        }
    }
</style>