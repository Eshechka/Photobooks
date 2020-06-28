<template>    

    <div class="card">
        <!-- <pre>cardobject:   {{cardObject}}</pre> -->
        <div class="card__img-card">
            <img  class="card__img" src="../img/card-img1.png" alt="card image">
        </div>

        <div class="card__info">

            <div class="card__avatar">
                <img class="card__avatar-img" src="../img/card-avatar1.png" alt="card avatar">
            </div>

            <div class="card__desc">
                <div class="card__desc-title"> {{cardObject.title}} </div>
                <div class="card__comments-likes-wrapper">					
                    <button type="button" class="card__button card__button_comments">9</button>
                    <button type="button" class="card__button card__button_likes">15</button>
                </div>
            </div>

        </div>

        <div class="card__folder">
            <div class="card__folder-name">Прогулки по воде</div>
        </div>

    </div>	


</template>


<script >
    export default {
        props: {
          cardObject: Object,
        },

        data() {
          return {
            
          }
        },

        methods: {

        },
    }
</script>


<style lang="postcss">

    // @import 'normalize.css';
    // @import '../fonts/fonts.pcss';
    // @import '../styles/mixins.pcss';
    // @import '../styles/layout.pcss';

    @import '../styles/blocks/card.pcss';

</style>