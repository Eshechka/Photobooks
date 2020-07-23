<template>        

        <router-view></router-view>

</template>


<script>
    export default {
        watch: {
            '$route.params.id'() {
                console.log('$route.params.id!!!!!');
                window.scrollTo({
                    top: 0,
                });
            },
        },
    }
</script>


<style lang="postcss">


</style>