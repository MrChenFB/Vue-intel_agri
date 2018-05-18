<template>
	<div id="Login">
    <div id="main">
      <!--<router-link to="/" class="up_a">账号登陆</router-link>-->
      <!--<router-link to="/message">短信登陆</router-link>-->
      <h2>账号登录</h2>
      <div class="name">
        <span>账号:</span>
        <input id="tel" type="text" placeholder="   请输入用户名/手机号" v-model="userName" required/>
      </div>
      <div class="pwd">
        <span>密码:</span>
        <input id="passwd" type="password" placeholder="   请输入密码" v-model = "passWord"  required/><br>
      </div>
      <div class="test">
        <router-link to="/rig">账号注册</router-link>
        <router-link to="/forgetPassword">忘记密码</router-link>
      </div>
     <div class="button">
       <button type="button" v-on:click="login" class="submit_data">登 陆</button>
     </div>


     </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
        userName:"",
        passWord:""
    }
  },
  methods: {
      login:function () {
        this.$axios.post("login/",{
          "username":this.userName,
          "password":this.passWord
        })
          .then((response) => {
            this.$store.state.token = response.data.token
            sessionStorage.setItem('token',response.data.token)
            console.log(sessionStorage.getItem('token'))
            this.$store.dispatch('changeUserName',this.userName)
            this.$router.push('/online_class')
            window.location.reload();
            //debugger

          })
          .catch(function (err) {
              alert("┭┮﹏┭┮，用户名或者密码输入错误！")
            console.log(err);
          })
      }

  },
  computed:{
    ...mapGetters({
      status:'getStatus',
      userInfo:'getUserInfo'
    })
  },
  created(){
    this.$store.dispatch('changeShow','login')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
#Login{
	margin: 0;
	width: 100%;
	height: 740px;
  background-color: #4ACF78;
  min-height:100%;
  display:flex;
  align-items:center;
}
  #main{
    width: 550px;
    height:500px;
    background-color: white;
    float: left;
    margin: auto;
    margin-bottom: 100px;
    display:block;
    border-radius: 10px;
  }
  h2 {
    text-align: center;
    margin-top:50px;
    margin-bottom:30px;
    font-size: 40px;
  }
  .name {
    text-align: center;
    margin-top:30px;
  }
  .pwd{
    text-align: center;
    margin-top:30px;
  }
  .test{
    text-align: center;
    margin:20px;
  }
  .button {
    text-align: center;
  }
  .button button{
    border-radius:15px;border:1px solid #aeaeae;
    width:300px;
    height: 50px;
    margin:20px;
    font-size: 22px;
  }
  .name input{
    border-radius:10px;border:1px solid #aeaeae;
    width:250px;
    height: 50px;
    margin-left: 20px;
    margin-bottom:  20px;
  }
  .pwd input{
    border-radius:15px;border:1px solid #aeaeae;
    width:250px;
    height: 50px;
    margin-left: 20px;
    margin-bottom:  20px;
  }
  p{
    margin-left: 130px;
    margin-top:0;
    display:inline-block;

  }
a:visited {color: #253bd3;}/* 已被访问的链接 */

a:hover {  color: #4acf50;}/* 鼠标指针移动到链接上 */

a:active {color: #4acf50;}/* 正在被点击的链接 */
  .submit_data{width: 270px;height: 50px;background-color: #5394ec;}
  input{padding-left: 10px;}
</style>
