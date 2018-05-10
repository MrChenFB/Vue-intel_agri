<template>
  <div id="Rigeste">
    <div id="main">
      <h2>用户注册</h2>
      <span class="title">手机号</span>
      <input id="userName" type="text " placeholder="   请输入手机号" v-model="userName" required/><br/>
      <span class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
      <input id="passwd" type="password" placeholder="   请输入密码" v-model = "passWord" required/><br>
      <span class="title">确认密码</span>
      <input id="passwd1" type="password"  placeholder="  请确认密码"  v-model = "passWord1" required/><br>
      <span class="title">验证码</span>
      <!--<input id="tel" type="text" placeholder="   请输入手机号" v-model="tel" required /><br/>-->
      <input type="text" required placeholder="请输入验证码" class="vcode" v-model="code"/> <input type="button" class='vcode_button'value="获取验证码" @click="SendCode()"/> <br/>
      <input type="submit" class="submit_data" v-on:click="registe"/>

    </div>
  </div>
</template>

<script>
  export default {
    name:'Rigeste',
    data () {
      return {
        userName:"",
        passWord:"",
        passWord1:"",
        code:""

      }
    },
    components: {

    },
    methods:{
      SendCode:function () {
        this.$http.post('code/',{
          "mobile":this.userName,
          "code_type":"register"
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      registe:function () {
        if(this.userName == "")
        {
          alert("用户名不能为空");
          return ;
        }
        if(this.passWord==""||this.passWord1==""||this.passWord != this.passWord1)
        {
          alert("两次密码输入不一致！")
          return ;
        }

        this.$http.post("user/",{
          "username":this.userName,
          "password":this.passWord,
          "code":this.code

        })
          .then((response) => {
            alert("连接成功！")
          })
          .catch(function (err) {
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>
  #Rigeste{
    margin: 0;
    width: 100%;
    height: 740px;
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
  h2 {
    text-align: center;
    margin-top:30px;
    margin-bottom:20px;
    font-size: 40px;
  }
  .title{font-size: 23px;height: 50px;line-height: 50px;margin-left: 100px;width: 100px;margin-right: 10px;margin-top: 20px;float: left}
  input{  border-radius:10px; height:50px;border: 1px #cbcbcb solid;width: 250px;margin-top: 20px;}
  .vcode{width: 140px;margin-right: 10px;}
  .vcode_button{width: 100px;font-size: 20px;}
  .submit_data{margin:30px 100px; width: 370px;background-color: #5394ec; font-size: 20px;sssssssss}
</style>
