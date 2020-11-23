<template>
    <div class="alertUI">

        <div class="alertUI__text">{{textUI}}</div>
        <div class="alertUI__buttons">
            <button type="submit" class="button button_size_m button_theme_carrot"
                @click="$emit('yes-ui')"            
            >{{yesText}}</button>
            <button type="button" class="button button_size_m button_theme_controls"
                v-if="isConfirmation"
                @click="$emit('no-ui')"
            >Отменить</button>
        </div>
    </div>
</template>


<script>

    export default {

        props: {
            textUI: String,
            yesText: String,
            isConfirmation: Boolean,
        },

        data() {
            return {

            }
        },


        methods: {

        },

    }

</script>


<style scoped lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/common/site-button.pcss';


.alertUI {
    height: 100%;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    &__text {
        margin-bottom: 20px;
        font-size: 16px;
        font-family: 'Proxima Nova Semibold';
        color: $color-text;
        text-align: center;
    }
}
 

</style>