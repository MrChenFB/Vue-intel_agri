<template>
  <div id="Rigeste">
    <div id="main">

      <input id="userName" type="text" placeholder="   请输入用户名" v-model="userName" required/><br/>
      <input id="passwd" type="password" placeholder="   请输入密码" v-model = "passWord" required/><br>
      <input id="passwd1" type="password" placeholder="   请确认密码"  v-model = "passWord1" required/><br>
      <!--<input id="tel" type="text" placeholder="   请输入手机号" v-model="tel" required /><br/>-->
      <input type="text" required placeholder="请输入验证码" v-model="code"/> <input type="button" value="获取验证码"/> <br/>
      <input type="submit" v-on:click="registe"/>

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

          this.$http.post("http://172.19.73.110:8001/user/",{
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
  /*#Rigeste{*/
    /*margin: 0;*/
    /*width: 100%;*/
    /*height: 700px;*/
    /*background-color: #4acf50;*/
    /*display:flex;*/
    /*align-items:center;*/
  /*}*/
  /*#main{*/
    /*width: 550px;*/
    /*height:500px;*/
    /*background-color: white;*/
    /*float: left;*/
    /*margin: auto;*/
    /*margin-bottom: 100px;*/
    /*display:block;*/
    /*border-radius: 10px;*/
  /*}*/

</style>
