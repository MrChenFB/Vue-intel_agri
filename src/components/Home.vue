<template>
    <div class="home">

    </div>
</template>

<script>
import {mapGetter} from 'vuex'
  export default{
    created(){
        this.$store.dispatch('changeShow','home')
    }
  }
</script>

<style scoped>
  .home{width: 100%;height: 1000px;background-color: grey;margin: 0;}

</style>
