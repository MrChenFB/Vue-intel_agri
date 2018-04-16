<template>
  <div id="main" style="">
    <div id="login">
      <img src="../../assets/mooc_white.png" style="margin: 0 50% 20px 45%;">
      <div align="center" style="margin-top: 20px">
        <el-form :model="ruleForm" status-icon label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="账号" style="width: 60%">
            <el-input clearable  v-model="ruleForm.username" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="密码" style="width: 60%">
            <el-input clearable type="password" v-model="ruleForm.password" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item  style="width: 60%">
            <el-button type="plain" round @click="login" style="width: 100%;">登录</el-button>
            <!--<el-button type="plain" round @click="register" style="width: 100%;margin-top: 10px">注册</el-button>-->
          </el-form-item>
          <el-form-item  style="width: 60%">
            <!--<el-button type="plain" round @click="login('ruleForm')" style="width: 100%;">登录</el-button>-->
            <el-button type="plain" round @click="register" style="width: 100%;">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
  //  import axois from 'axios'
  export default {
    name: 'login',
    data() {
      return{
//            登录表单
        ruleForm:{
          username:"",
          password:"",
        },
      }
    },
    methods:{
      //跳转到注册
      register:function () {
        this.$router.push({path:'register'})
      },
      //提交登录信息
      login:function () {
//          console.log(this.ruleForm);
        this.$http.post("/auth",{
          "username":this.ruleForm.username,
          "password":this.ruleForm.password
        })
          .then((response) => {
            if (response.data.loginStatus == 1) {
              this.$message.success({
                message:"登录成功",
                showClose:true
              });
              sessionStorage.setItem('username','ae');
              this.$router.push({path:'/'});
              this.$store.commit('changeState',true);
            } else {
              this.$message.error({
                message:"啊偶，登录失败",
                showClose:true
              })
            }
          })
          .catch(function (err) {
            console.log(err);
            this.$message.error({
              message:err,
              showClose:true
            })
          })
      }
    },
  }
</script>

<style scoped>
  #login{
    width:60%;
    margin:150px 20% 0 20%;
    /*background-color:rgba(7,17,27,0.5);*/
  }
  #main{
    width: 100%;height: 100%;position: fixed;
    background-image: url("../../assets/background.png");
  }
</style>
