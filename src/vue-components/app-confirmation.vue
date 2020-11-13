<template>
        <div class="confirmation">
            <div class="confirmation__text">{{confirnationText}} Вы точно хотите удалить?</div>
            <div class="confirmation__buttons">
                <button class="button button_size_m button_theme_carrot"
                    @click="submitConfirnation()"
                >Да</button>
                <button class="button button_size_m button_theme_controls"
                    @click="cancelConfirnation()"
                >Отменить</button>
            </div>
        </div>
</template>


<script>


    // import axios from '../requests.js';

    // import { baseStorageUrl } from '../requests.js';


    export default {

        components: {

        },

        data() {
            return {
                // urlPhotos: baseStorageUrl+'/photos',
                // urlAvatars: baseStorageUrl+'/avatars',
                
                // openConfirmation: false,

                confirnationText: 'Подтверждаете действие?',
            }
        },


        methods: {

            // ***** Закрыть форму по клику кнопки "Отменить" ******
            cancelConfirnation() {

            },
            // ***** Закрыть форму и выпол нить действие по клику кнопки "Да" ******
            submitConfirnation() {

            },

        },

    }

</script>


<style scoped lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/common/site-button.pcss';


.confirmation {
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
 

</style>