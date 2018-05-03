<template>
    <div class="task_ground">
      <div class="kinds">
        <span >评论举报、图表使用echarts（修改原型链）、登陆注册界面的提示信息的优化、推荐视频的算法优化（后台）、头像下拉菜单栏不显示、头像需要强制刷新、分页界面的优化、</span>
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

    },
    created(){
      this.$store.dispatch('changeShow','task_ground');
    }
  }
</script>

<style scoped>
.task_ground{width: 100%;height: 1000px;margin:0;padding-top: 20px;
  font-size: 30px;}
</style>
