<template>
    <div class="dropdown"
        :class="{'dropdown_showed': isDropdownShowed}"
        :style="dropdownStyles"
    >{{textWarning}}</div>            
</template>


<script>

    export default {

        props: {
            textWarning: String,
            isDropdownShowed: Boolean,
            styleObj: Object,
        },

        data() {
            return {
                dropdownStyles: this.isDropdownShowed ? this.styleObj.showed : this.styleObj.base,
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


    .dropdown {
        background-color: rgba($color-white, 0.8);
        color: rgba($color-text, 0.9);
        padding: 10px 15px;
        border-radius: 5px;
        position: absolute;
        opacity: 0;
        transition: top 0.2s ease-in;

        top: -40px;
        /* right: 50%;
        transform: translateX(50%); */
        

        &_showed {
            z-index: 15;
            opacity: 1;
            
            top: 295px;
            width: 90%;

            @include tablets {
                top: 40px;
                width: unset;
            }
        }
        
        @include tablets {
            right: 5%;
            transform: translateX(0);
        }        
        @include desktopHd {
            right: max(calc((100% - 1480px)/2),10%);
        }        
    } 

</style>