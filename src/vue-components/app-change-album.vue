<template>
    <div class="change-album">
        <div class="change-album__card">

            <div class="change-album__topgroup">
                <h4 class="change-album__title">{{title}}</h4>
                <button type="button" class="change-album__button change-album__button_close"
                    @click="$emit('clickCloseChangeMyAlbum')"
                ></button>
            </div>
            
            <div class="change-album__form">
                <form class="form-changeAlbum">

                    <label class="form-changeAlbum__label">Название альбома
                        <input class="form-changeAlbum__input" type="text" placeholder="Название альбома"
                            v-model="myChangeCurrentObject.albumName"
                        >
                    </label>

                    <label class="form-changeAlbum__label">Описание
                        <textarea class="form-changeAlbum__input form-changeAlbum__input_textarea" cols="20" rows="5" placeholder="Описание альбома"
                            v-model="myChangeCurrentObject.description"
                        ></textarea>
                    </label>
            

                    <div class="form-changeAlbum__cover">

                        <div class="form-changeAlbum__cover-img-wrapper">
                            <img class="form-changeAlbum__cover-img" :src="coverImg" alt="album cover image">
                        </div>

                        <div class="form-changeAlbum__cover-button">
                            <button class="site-button site-button_theme-light" type="button">{{coverTitle}}</button>
                            <div class="form-changeAlbum__notice-size">(файл должен быть размером не более 1024 КБ)</div>
                        </div>

                    </div>
                    
                    <div class="form-changeAlbum__buttons">
                        <button class="site-button" type="submit">Сохранить</button>
                        <button class="site-button site-button_theme-just-text" type="button"
                            @click="$emit('clickCloseChangeMyAlbum')"
                        >Отменить</button>
                        <button class="round-button round-button_delete" type="button">Удалить</button>
                    </div>

                </form>
            </div>      

        </div>
    </div>
</template>


<script>

    export default {

        props: {
          myAlbumObject: Object,
          mode: String,
		},

        data() {
            return {
                title: 'Добавить альбом',
                coverTitle: "Загрузить обложку",
                coverImg: require("../img/no_album_cover.jpg").default,

                myChangeCurrentObject: {
                    id: 0,
                    albumName: '',
                    desc: '',
                    preview: 0,
                    photos: [],
                },
            }
        },

      computed: {
        // ...mapState('works', {
        //   currentWork: state => state.currentWork
        // }),

        // myChangeCurrentObject() {          
        //   return this.myAlbumObject;          
        // },

      },

      watch: {
        // myChangeCurrentObject() {
        //   if (this.mode === 'edit') {             
        //     this.setChangedAlbum();              
        //   }
        //   else if (this.mode === 'add') {
        //     this.clearChangedAlbum();              
        //   }
        // },
      },


      methods: {

        setChangedAlbum() {         
            let currentCoverImg = this.myAlbumObject.photos.find(photo => photo.id===this.myAlbumObject.preview);
            this.myChangeCurrentObject = this.myAlbumObject;
            this.title = 'Отредактировать альбом';
            this.coverTitle = "Редактировать обложку";
            this.coverImg = currentCoverImg ? currentCoverImg.photo : this.myAlbumObject.photos[0].photo;
        },

      },

        created() {
            if (this.mode === 'edit') {                
                this.setChangedAlbum();
            }
        },

    }

</script>


<style scoped lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';
    @import '../styles/common/site-button.pcss';   

    .change-album {

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

                &:hover {
                    background-image: svg-load('close.svg', fill=rgba(#{$color-text}, 0.8));
                }
            }
        }

    }

    
    .form-changeAlbum {
        display: flex;
        flex-direction: column;
        background-color: $color-white;

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 15px 10px 10px;

            @include tablets {
                margin-left: 80px;
                margin-right: 20px;
            }
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

            @include tablets {
                margin-bottom: 20px;
                margin-left: 50px;
                margin-right: 20px;                
            }
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
             display: flex;
             align-items: center;

            @include tablets {
                margin-left: 20px;
                margin-right: 20px;                
            }
        }

        &__notice-size {
            display: none;
            width: 40%;
            font-family: 'ProximaNova-LightIt';
            font-size: 14px;
            line-height: 14px;
            padding: 10px 0;

            @include tablets {
                display: block;
            }

        }

        &__buttons {
            background-color: #f2f2f2;
            padding: 10px;
            display: flex;
            align-items: center;

            @include tablets {
                font-size: 14px;
            }
        }
    }
 
</style>