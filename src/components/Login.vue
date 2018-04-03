<template>
	<div id="Login">
    <div id="main">
      <!--<a href="#"><p class="up_a" >账号登陆</p></a>-->
      <router-link to="/">账号登陆</router-link>
      <router-link to="/message">短信登陆</router-link>
     <!--<a > <p>短信登陆</p></a>-->
      <input id="tel" type="text" placeholder="   请输入用户名/手机号" />
      <input id="passwd" type="password" placeholder="   请输入密码"/><br>
      <!--<a><p style="color:grey" >账号注册</p></a>-->
      <!--<a > <p style="color:grey;">忘记密码</p></a>-->
      <router-link to="/reg">账号注册</router-link>
      <router-link to="/forgetPassword">忘记密码</router-link>
      <button id="submit">登&nbsp;&nbsp;陆</button>
    </div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
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
  background-color: #4acf50;
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
#submit{

  background-color: rgba(37, 59, 211, 0.85); /* Green */
  border: none;
  color: white;
  padding: 15px 180px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 80px;
}
a{
  margin-left: 300px;
}
</style>
