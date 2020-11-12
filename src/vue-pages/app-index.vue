<template>        
      
    <router-view></router-view>

</template>


<script>
    import appAlbum from '../vue-components/app-album.vue';
    import appUser from '../vue-components/app-user.vue';
    import appSearch from '../vue-components/app-search.vue';

    export default {
        components: {
            appAlbum, appUser, appSearch
        },
    }
</script>


<style lang="postcss">

</style>