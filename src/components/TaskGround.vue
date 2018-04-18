<template>
    <div class="task_ground">
      <div class="kinds">
        <span >分类</span>
        <div v-for="classification in classifications" class="classfy">
          <span>{{classification}}</span>
        </div>
      </div>
      <div class="newest"></div>
      <div class="hotest"></div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    data(){
        return{

        }
    },
    computed:{
      ...mapGetters({
        classifications:'getClassifications'
      })
    },
    methods:{

    }
  }
</script>

<style scoped>
.task_ground{width: 100%;height: 1000px;margin:0;}
</style>
