 <template>
    <div class="my_info">
        <div class="image">
          <img src="../../static/images/南瓜.jpg">
        </div>
      <div class="image_info">
        <p class="title">个人信息</p>
        <p><span  class="column1">用&nbsp;&nbsp户&nbsp;&nbsp;名&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="column2">傻狗刘大壮</span></p>
        <p><span  class="column1">&nbsp;&nbsp;名&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="column2">傻狗刘大壮</span></p>
        <p><span  class="column1">用&nbsp;&nbsp户&nbsp;&nbsp;名&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="column2">傻狗刘大壮</span></p>

      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
      computed:{
        ...mapGetters({
          userInfo:'getUserInfo'
        })
      },
    created(){
        this.$store.dispatch('changeShow','my_info');
    }
}
</script>

<style scoped>
.my_info{min-height: 750px;width: 100%;}
.image{width: 300px;height: 400px;margin-top: 50px;margin-left: 300px;float: left;}
  img{width:250px;height: 250px;border-radius: 125px; }
  .image_info{width: 600px;height: 400px;float: left;margin-top: 50px;padding-left: 100px;}
  .title{font-size: 30px;text-align: left;}
  p{margin-top: 30px;}
  .column1{font-size: 23px;color: darkgray;}
  .column2{font-size: 23px;color: black;}
</style>
