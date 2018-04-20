<template>
	<div id="Login">
    <div id="main">
      <router-link to="/" class="up_a">账号登陆</router-link>
      <router-link to="/message">短信登陆</router-link>

      <input id="tel" type="text" placeholder="   请输入用户名/手机号" v-model="userName" required/>
      <input id="passwd" type="password" placeholder="   请输入密码" v-model = "passWord" pattern="[a-zA-Z0-9]{0-6}" required/><br>

      <router-link to="/rig">账号注册</router-link>
      <router-link to="/forgetPassword">忘记密码</router-link>

      <input type="submit" value="登   陆"  v-on:click="login"/>
    </div>
	</div>
</template>

<script>
  import axios from 'axios'
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
        axios.post("/login",{
          "username":this.userName,
          "password":this.passWord
        })
          .then((response) => {
            this.$store.state.token = response.date.res.token
            console.log(res.data)
            sessionStorage('token',res.data.res.token)
            this.$router,push('/home')
            alert("连接成功")
          })
          .catch(function (err) {
            console.log(err);
          })
      }
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
#Login{
	margin: 0;
	width: 100%;
	height: 700px;
  background-color: #4ACF78;
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
  input{
    border-radius:15px;border:1px solid #aeaeae;
    width:400px;
    height: 50px;
    margin-left: 80px;
    margin-bottom:  20px;
  }
  p{
    margin-left: 130px;
    margin-top:0;
    display:inline-block;

  }
  .up_a{
    margin-top: 100px;
    margin-bottom: 50px;
  }

a:visited {color: #253bd3;}/* 已被访问的链接 */

a:hover {  color: #4acf50;}/* 鼠标指针移动到链接上 */

a:active {color: #4acf50;}/* 正在被点击的链接 */
</style>
