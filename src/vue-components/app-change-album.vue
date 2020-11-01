<template>
    <div class="change-album">
        <div class="change-album__card">

            <div class="change-album__topgroup">
                <h4 class="change-album__title">{{title}}</h4>
                <button type="button" class="change-album__button change-album__button_close"
                    @click="$emit('click-close-change-my-album')"
                ></button>
            </div>
            
            <div class="change-album__form">
                <form class="form-changeAlbum"
                    @submit.prevent="submitChangeAlbumHandler"                
                >

                    <label class="form-changeAlbum__label">Название альбома
                        <input class="form-changeAlbum__input" type="text" placeholder="Название альбома"
                            v-model="myChangeCurrentObject.title"
                        >
                    </label>

                    <label class="form-changeAlbum__label">Описание
                        <textarea class="form-changeAlbum__input form-changeAlbum__input_textarea" cols="20" rows="5" placeholder="Описание альбома"
                            v-model="myChangeCurrentObject.description"
                        ></textarea>
                    </label>
            

                    <div class="form-changeAlbum__cover">

                        <label for="load-bgcover-album" class="form-changeAlbum__label form-changeAlbum__label_file-load">

                            <div class="form-changeAlbum__cover-img-wrapper">
                                <input type="file" id="load-bgcover-album" class="form-changeAlbum__input-load"
                                    @change='loadCover'
                                >
                                <div class="form-changeAlbum__added-photo" v-if="isCoverLoaded"
                                    :style="{ backgroundImage : `url(${renderedCover.pic})` }">
                                </div>
                                <img class="form-changeAlbum__cover-img" v-if="!isCoverLoaded && (mode=='edit')" :src="`${urlPhotos}/${myChangeCurrentObject.preview}`" alt="album cover image">
                                <img class="form-changeAlbum__cover-img" v-else-if="!isCoverLoaded && (mode=='add')" :src="require('../img/no_album_cover.jpg').default" alt="album cover image">
                            </div>                                                          

                            <div class="form-changeAlbum__cover-button">
                                <button class="site-button site-button_theme-light" type="button">{{coverTitle}}</button>
                            </div>

                        </label>

                        <div class="form-changeAlbum__notice-size">(файл должен быть размером не более 1024 КБ)</div>

                    </div>
                    
                    <div class="form-changeAlbum__buttons">
                        <button class="button button_size_m form-changeAlbum__buttonspace" type="submit">Сохранить</button>    
                        <button class="button button_size_m button_theme_minimalizm" type="button"
                            @click.prevent="$emit('click-close-change-my-album')"                            
                        >Отменить</button>
                        <button class="button button_size_m button_theme_carrot form-changeAlbum__in" type="button"
                            @click.prevent="deleteAlbumHandler"
                        >Удалить</button>
                    </div>

                </form>
            </div>      

        </div>
    </div>
</template>


<script>
    import { baseStorageUrl } from '../requests.js';    
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

        props: {
          editedAlbumObject: Object,
          authorId: Number,
          mode: String,
		},

        data() {
            return {
                
                urlPhotos: baseStorageUrl+'/photos',

                title: 'Добавить альбом',
                coverTitle: "Загрузить обложку",

                renderedCover: {pic: ''},
                loadedCover: {},
                isCoverLoaded: false,

                myChangeCurrentObject: {
                    id: Number,
                    description: '',
                    authorId: Number,
                    preview: '',
                    title: '',
                },
            }
        },


      methods: {        
        loadCover(e) {
                this.loadedCover = e.target.files[0];
                renderer(this.loadedCover).then(pic => {                 
                    this.renderedCover.pic = pic;
                    this.isCoverLoaded = !this.isCoverLoaded;
                    this.coverTitle = "Изменить обложку";
                });
        },
        setChangedAlbum() {
            this.myChangeCurrentObject = this.editedAlbumObject;
            this.title = 'Отредактировать альбом';
            this.coverTitle = "Редактировать обложку";
        },
        clearChangedAlbum() {
            this.title = 'Добавить альбом';
            this.coverTitle = "Добавить обложку";
            this.myChangeCurrentObject = {
                    id: this.editedAlbumObject.id,
                    description: '',
                    // author: this.editedAlbumObject.author,
                    authorId: this.authorId,
                    preview: '',
                    title: ''
                };
        },
        submitChangeAlbumHandler() {

            if (this.mode=='add' && this.renderedCover) {// else console.log('no file');//!!!!!!! validation
                const formData = new FormData();
                    formData.append('preview', this.loadedCover);
                    formData.append('title', this.myChangeCurrentObject.title);
                    formData.append('description', this.myChangeCurrentObject.description);
                    formData.append('authorId', this.authorId);
                    this.$emit('submit-change-my-album', formData, this.mode);
            }
            else if (this.mode=='edit') {
                const reNewData = {};
                    // reNewData.preview=this.loadedCover;
                    reNewData.id=this.myChangeCurrentObject.id;
                    reNewData.title=this.myChangeCurrentObject.title;
                    reNewData.description=this.myChangeCurrentObject.description;  
                    reNewData.authorId=this.authorId;
                    this.$emit('submit-change-my-album', reNewData, this.mode);
            }

            // this.$emit('update-albums');
        },
        deleteAlbumHandler() {
            this.$emit('delete-album', this.editedAlbumObject.id);
        },

      },

        created() {
            if (this.mode === 'edit') {                
                this.setChangedAlbum();
            }
            else if (this.mode === 'add') {                
                this.clearChangedAlbum();
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


        &__input-load {
            cursor: pointer;
            opacity: 0;    
            width: 100%;   
            height: 100%;    
            position: absolute;
            top: 0;
            font-size: 0;
        }

        &__added-photo {
            width: 100%;
            height: 100%;
        }

        &__label {
            font-family: 'Proxima Nova Semibold';
            font-size: 14px;
            padding: 15px 10px 10px;

            display: block;

            @include tablets {
                margin-left: 40px;
                margin-right: 20px;
            }

            &_file-load {
                position: relative;
                display: flex;

                &:hover .form-changeAlbum__cover-button button {
                    background-color: $color-blue;
                    color: $color-white;
                }

                &:active, &:focus .form-changeAlbum__cover-button button {
                    background-color: transparent;
                    color: rgba($color-blue, 0.7);
                    border: 2px solid rgba($color-blue, 0.7);
                }
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

        &__added-photo {
            background-position: 50%;
            background-size: cover;
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
        
        &__in {
            margin-left: auto;
        }

        &__buttonspace {
            margin-right: 10px;
        }
    }
 
</style>