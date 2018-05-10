<template>
  <div id="app" >
    <header>
      <div class="nav">
        <img  class='logo_img':src="'../static/images/logo2.jpg'">
        <ul style="float: right" class="left_nav" >
          <li :class="{bg:show==='login'}" v-if="!isLogin">
            <router-link :to="'/login'" class="nav_a">登陆</router-link>
          </li>
          <li  v-if="isLogin">
            <router-link :to="'/my_info'" class="dropdown">
              <img class="user_img" v-if="this.userInfo" :src="this.userInfo.user_profile.image">
            </router-link>
            <div class="dropdown-content">
              <router-link to="/login">链接2</router-link>
              <a href="#">链接 2</a>
              <a href="#">链接 3</a>
            </div>
          </li>
        </ul>
        <ul class="left_nav">
          <li :class="{bg:show===left_nav_value.path}" v-for="left_nav_value in left_navs">
            <router-link :to="'/'+left_nav_value.path" class="nav_a">{{left_nav_value.name}}</router-link>
          </li>
        </ul>

        <h1 class="theme">
          <router-link to="/home">智慧农业</router-link>

        </h1>

      </div>
    </header>
    <section>
      <transition name="display">
        <router-view></router-view>
      </transition>
    </section>
    <footer>
      <p class="payment">
        <span>we accept:</span>
      </p>
    </footer>
    <transition name="scroll">
      <p v-if="scroll" class="scroll" @click="scrolltoTop">
        <img :src="'../static/images/scroll.jpg'" alt="scroll"/>
      </p>
    </transition>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {

    data () {
      return{
        timer:null,
        scroll:false,
        scrollTimer:null
      }
    },
    computed:{
      ...mapGetters({
        show:'getShow',
        left_navs:'getLeft_nav',
        userInfo:'getUserInfo'
      }),
      isLogin(){
        if(sessionStorage.getItem('token')){
          this.$axios.get('/user/user_info/',)
            .then((response)=>{
              this.$store.dispatch('changeUserInfo',response.data)

            })
            .catch(function (err) {
              console.log(err)
            })
          return true
        }
      }
    },
    methods:{
      scrolltoTop:()=>{
        if(document.documentElement.scrollTop){
          var scrollTop=document.documentElement.scrollTop
          var step=scrollTop/30;
          var now=scrollTop-step;
          var i=0;
          var time=setInterval(function(){
            i++;
            if(i>32){
              clearInterval(time)
            }
            document.documentElement.scrollTop=now;
            scrollTop=document.documentElement.scrollTop
            now=scrollTop-step;
          },10)
        }else if(document.body.scrollTop){
          var scrollTop=document.body.scrollTop
          var step=scrollTop/30;
          var now=scrollTop-step;
          var i=0;
          var time=setInterval(function(){
            i++;
            if(i>32){
              clearInterval(time)
            }
            document.body.scrollTop=now;
            scrollTop=document.body.scrollTop
            now=scrollTop-step;
          },10)
        }

      },
    },
    created(){
      var self=this;
      window.onload=()=>{
        this.$store.dispatch('change_hw',{
          h:document.documentElement.clientHeight||document.body.clientHeight,
          w:document.documentElement.clientWidth||document.body.clientWidth
        })
      }
      window.onresize=()=>{
        if(self.timer){
          clearTimeout(self.timer)//函数节流
        }
        self.timer=setTimeout(function(){

          self.$store.dispatch('change_hw',{
            h:document.documentElement.clientHeight||document.body.clientHeight,
            w:document.documentElement.clientWidth||document.body.clientWidth
          })
        },100)
      }
      window.onscroll=()=>{

        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scrollTop>10){
          this.scroll=true;
        }else{
          this.scroll=false;
        }

      }
    }
  }
</script>

<style>

  body,form,div,span,ul,ol,li,p,pre,dl,dt,dd,h1,h2,h3,h4,h5,h6,em,a,fieldset,legend,address,label,textarea,select,input,figure,table,th,td,b,i{margin:0;padding:0;}
  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  fieldset,img{border:0;}
  ul,li{list-style:none;}
  em,i{font-style:normal;}
  table{border-collapse:separate;border-spacing:0;}
  a{text-decoration:none;color: black}
  a:focus,input,button,select,textarea{outline:none;}
  h1,h2,h3,h4,h5,h6{ font-size:100%; font-variant: normal;font-weight: 400}
  body{margin:0;width: 100% ;font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;font-size:16px;}
  input{text-shadow: none}
  #app{width:100%;position: relative;}
  header{height: 70px;min-width: 1150px}
  .left_nav{float:right;}
  .left_nav li{display: inline-block;text-align: center;height: 70px;line-height: 70px;font-size: 20px;transition: all .3s ease-in-out;cursor: pointer;margin-right: 20px;}
  .left_nav li:hover{background: #00BC9B}
  .nav_a{display: inline-block;height: 80px;padding: 0 15px;}
  .nav{width: 100%;overflow: hidden;border-bottom: 1px grey solid;}
  header h1{width: 200px;height: 70px;line-height: 70px;font-size: 32px;cursor: pointer;transition: all .5s ease;margin: 0 auto}
  header h1:hover{font-size: 48px}
  footer{height: 72px;background: #3d444c;width: 100%;min-width: 1150px;padding-top: 8px;color:#a9b8ca;}
  .bg{background: #00BC9B;}
  .scroll{width: 60px;position: fixed;bottom: 90px;right: 0}
  .scroll-enter,.scroll-leave-active{
    opacity: 0
  }
  .scroll-enter-active,.scroll-leave{
    transition: all 1s ease;
    -moz-transition: all 1s ease;/* Firefox 4 */
    -webkit-transition: all 1s ease; /* Safari 和 Chrome */
    -o-transition: all 1s ease;  /* Opera */
  }
  .display-enter,.display-leave-active{
    opacity: 0
  }
  .display-enter-active,.display-leave{
    transition: all .5s ease;
    -moz-transition: all .5s ease;/* Firefox 4 */
    -webkit-transition: all .5s ease; /* Safari 和 Chrome */
    -o-transition: all .5s ease;  /* Opera */
  }
  .logo_img{width: 60px;height: 60px;float: left;margin-left: 60px;margin-top: 5px;}
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 105px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .dropdown-content a {
    width: 90%;
    height: 50px;
    color: black;
    padding: 5px 5px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {background-color: #f1f1f1}

  .dropdown:hover .dropdown-content{
    display: block;
  }

  .user_img{height: 70px;width: 65px;border-radius: 32px;}
</style>
