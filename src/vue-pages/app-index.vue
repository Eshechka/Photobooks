<template>        
      
    <router-view></router-view>

</template>


<script>
    import appAlbum from '../vue-components/app-album.vue';
    import appUser from '../vue-components/app-user.vue';

    export default {
        components: {
            appAlbum, appUser
        },
    }
</script>


<style lang="postcss">

</style>