<template>
    <div class="wrapper-router">
        
        <router-link  class="router-link" 
            to="/album/$route.params.id"
            @click.prevent
        ></router-link>

        <router-view></router-view>

    </div>
</template>


<script>

</script>


<style lang="postcss">

.wrapper-router {
    height: 100%;
}
.router-link {
    display: none;
}

</style>