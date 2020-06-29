<template>    

    <div class="my-album">
        <div class="my-album__img-my-album">
            <img class="my-album__img" :src="myAlbumObject.photo" alt="album image">
        </div>

        
        <div class="my-album__folder">
            <button type="button" class="my-album__button my-album__button_edit"></button>
            <div class="my-album__folder-name"> {{myAlbumObject.folderName}} </div>
        </div>

    </div>		


</template>


<script >
    export default {
        props: {
          myAlbumObject: Object,
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

    @import '../styles/blocks/my-album.pcss';

</style>