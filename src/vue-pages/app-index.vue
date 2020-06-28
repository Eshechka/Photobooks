<template>
    <div class="wrapper">

        <header class="header">

            <div class="header__container">		

                <div class="header__top">
                    <div class="header__logout">
                        <button type='button' class="round-button round-button_logout">
                            
                        </button>
                    </div>
                    <div class="header__user">
                        <div class="avatar">
                            <img class="avatar__img" src="../img/anton.png" alt="avatar">
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
                        <use xlink:href="../img/spriteIcons.svg#search"></use>
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
        </section>


        <section class="my-albums">
            <div class="my-albums__container">
                <div class="my-albums__topgroup">
                    <h2 class="my-albums__title">Мои альбомы</h2>
                    <div class="my-albums__button-plus">
                        <button class="round-button round-button_plus"></button>
                    </div>
                </div>

                <div class="my-albums__albums">
                    <div class="my-album">
                        <div class="my-album__img-my-album">
                            <img class="my-album__img" src="../img/album-img1.png" alt="album image">
                        </div>

                        
                        <div class="my-album__folder">
                            <div class="my-album__folder-name">Поход в горы</div>
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

  export default {   

    components: {
      appCard,  
    },

    data() {
        return {
            cards: [
                {   id: 1, title: 'Путешествие на лодке по озеру', comments: '9', likes: '15', folderName: '>Прогулки по воде',  },
                {   id: 2, title: 'Путешествие на лодке по озеру2', comments: '9', likes: '15', folderName: '>Прогулки по воде2',  },
                {   id: 3, title: 'Путешествие на лодке по озеру3', comments: '9', likes: '15', folderName: '>Прогулки по воде3',  },
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
    @import '../styles/blocks/card.pcss';
    @import '../styles/blocks/new.pcss';
    @import '../styles/blocks/my-search.pcss';
    @import '../styles/blocks/site-button.pcss';
    @import '../styles/blocks/my-albums.pcss';
    @import '../styles/blocks/my-album.pcss';
    @import '../styles/blocks/footer.pcss';

</style>