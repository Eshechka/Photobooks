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
                    @submit.prevent="submitChangeAlbumHandler">

                    <label class="form-changeAlbum__label" v-if="!deleteAlbumError">Название альбома
                        <input class="form-changeAlbum__input" type="text" placeholder="Название альбома"
                            v-model="myChangeCurrentObject.title">
                    </label>
                    <div class="form-changeAlbum__error form-changeAlbum__error_album-title">
                        <span v-if="!$v.myChangeCurrentObject.title.maxLength" v-show="$v.myChangeCurrentObject.title.$invalid">
                            Максимум символов в описании: {{ $v.myChangeCurrentObject.title.$params.maxLength.max }}
                        </span>
                        <span v-else v-show="$v.myChangeCurrentObject.title.$invalid">
                            Обязательно для заполнения
                        </span>
                    </div>

                    <label class="form-changeAlbum__label" v-if="!deleteAlbumError">Описание
                        <textarea class="form-changeAlbum__input form-changeAlbum__input_textarea" cols="20" rows="5" placeholder="Описание альбома"
                            v-model="myChangeCurrentObject.description"></textarea>
                    </label>
                    <div class="form-changeAlbum__error form-changeAlbum__error_album-description">
                        <span v-if="!$v.myChangeCurrentObject.description.minLength" v-show="$v.myChangeCurrentObject.description.$invalid">
                            Минимум символов в описании: {{ $v.myChangeCurrentObject.description.$params.minLength.min }}
                        </span>
                        <span v-else-if="!$v.myChangeCurrentObject.description.maxLength" v-show="$v.myChangeCurrentObject.description.$invalid">
                            Максимум символов в описании: {{ $v.myChangeCurrentObject.description.$params.maxLength.max }}
                        </span>
                        <span v-else v-show="$v.myChangeCurrentObject.description.$invalid">
                            Обязательно для заполнения
                        </span>
                    </div>
            

                    <div class="form-changeAlbum__cover" v-if="!deleteAlbumError">

                        <label for="load-bgcover-album" class="form-changeAlbum__label form-changeAlbum__label_file-load">

                            <div class="form-changeAlbum__cover-img-wrapper">
                                <input type="file" id="load-bgcover-album" class="form-changeAlbum__input-load"
                                    @change='loadCover'
                                >
                                <div class="form-changeAlbum__added-photo" v-if="isCoverLoaded"
                                    :style="{ backgroundImage : `url(${renderedCover})` }">
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

                    <div class="form-changeAlbum__error form-changeAlbum__error_album-cover">
                        <span v-show="!isPreviewLoaded">
                            Добавьте фото для обложки
                        </span>
                    </div>

                    <div class="form-changeAlbum__confirmDeleteAlbum" v-if="deleteAlbumError">
                        <appUI
                            @yes-ui="confirmDeleteAlbumHandler"
                            :textUI="`Необходимо удалить все фотографии из альбома`"
                            :yesText="`OK`"
                            >
                        </appUI>
                    </div>
                    
                    <div class="form-changeAlbum__buttons" v-if="!deleteAlbumError">
                        <button class="button button_size_m form-changeAlbum__buttonspace" type="submit"
                            :disabled="isDisabledSubmit || $v.$invalid"
                            :title="`Нажмите для изменения данных`"
                        >Сохранить</button>    
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

    import appUI from '../vue-components/app-UI.vue';

    import { mapState, mapActions, mapGetters } from 'vuex';

    import { required, minLength, maxLength } from 'vuelidate/lib/validators';

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

        components: {
            appUI,
        },

        props: {
            editedAlbumObject: Object,
            authorId: Number,
            mode: String,
            toDisabledSubmit: Boolean,
		},

        data() {
            return {
                urlPhotos: baseStorageUrl+'/photos',

                title: 'Добавить альбом',
                coverTitle: "Загрузить обложку",

                renderedCover: '',
                loadedCover: {},
                isCoverLoaded: false,

                myChangeCurrentObject: {
                    id: Number,
                    description: '',
                    authorId: Number,
                    preview: '',
                    title: '',
                },

                isDisabledSubmit: this.toDisabledSubmit,
                isPreviewLoaded: false,
                deleteAlbumError: false,
            }
        },

        computed: {
            ...mapState('cards', {
                deletedAlbumCards: state => state.currentAlbumCards
            }),
        },

        validations: {

            myChangeCurrentObject: {
                title: {
                    required,
                    maxLength: maxLength(50)
                },
                description: {
                    minLength: minLength(60),
                    maxLength: maxLength(200),
                    required
                },
            },
        },

        methods: {
            ...mapActions('cards', ['refreshAlbumCards']),
          
            loadCover(e) {
                this.loadedCover = e.target.files[0];
                renderer(this.loadedCover).then(pic => {                 
                    this.renderedCover = pic;
                    this.isCoverLoaded = true;
                    this.coverTitle = "Изменить обложку";
                    this.isPreviewLoaded = true;
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
                    authorId: this.authorId,
                    preview: '',
                    title: ''
                };
            },

            submitChangeAlbumHandler() {
                if (this.mode=='add') {
                    if (!this.$v.$invalid) {
                        const formData = new FormData();
                        formData.append('preview', this.loadedCover);
                        formData.append('title', this.myChangeCurrentObject.title);
                        formData.append('description', this.myChangeCurrentObject.description);
                        formData.append('authorId', this.authorId);
                        this.isDisabledSubmit = true;
                        this.$emit('submit-change-my-album', formData, this.mode);
                    }
                }
                else if (this.mode=='edit') {
                    const reNewData = {};
                        reNewData.id=this.myChangeCurrentObject.id;
                        reNewData.title=this.myChangeCurrentObject.title;
                        reNewData.description=this.myChangeCurrentObject.description;  
                        reNewData.authorId=this.authorId;
                        this.$emit('submit-change-my-album', reNewData, this.mode);
                }                
            },

            async deleteAlbumHandler() {
                await this.refreshAlbumCards(this.editedAlbumObject.id);
                let isEmptyAlbum = this.deletedAlbumCards.length === 0;
                
                    if (isEmptyAlbum) {
                        this.$emit('delete-album', this.editedAlbumObject.id);
                    }
                    else {
                        this.deleteAlbumError = true;
                    }
            },

            confirmDeleteAlbumHandler() {
                this.deleteAlbumError = false;
            }
        },

        created() {
            if (this.mode === 'edit') {                
                this.setChangedAlbum();
            }
            else if (this.mode === 'add') {                
                this.clearChangedAlbum();
            }
        },

        mounted() {
            this.isPreviewLoaded = this.myChangeCurrentObject.preview || this.renderedCover;
        }

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

        &__form {
            height: 411px;
            display: flex;

            @include tablets {
                min-height: 426px;
            }
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
        flex-grow: 1;

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
            padding: 15px 10px 5px;
            display: block;

            @include tablets {
                margin-left: 40px;
                margin-right: 20px;
            }

            &_file-load {
                position: relative;
                display: flex;

                &:hover .form-changeAlbum__cover-button button, 
                &:active .form-changeAlbum__cover-button button, 
                &:focus .form-changeAlbum__cover-button button {
                    color: $color-blue;
                    background-color: transparent;
                }
            }
        }

        &__error {
            @include error;
            min-height: 18px;
            padding-left: 20px;
            padding-right: 20px;

            @include tablets {
                align-self: flex-start;
                margin-left: 45px;
            }

            &_album-cover {
                margin-top: -15px;
                margin-bottom: 10px;

                @include tablets {
                    margin-top: -20px;
                    margin-left: 100px;
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

        &__confirmDeleteAlbum {
            z-index: 20;
            flex-grow: 1;
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