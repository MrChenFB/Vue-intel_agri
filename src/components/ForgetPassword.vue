<template>
  <div id="Rigeste">
    <div id="main">
      <h2>找&nbsp;&nbsp;回&nbsp;&nbsp;密&nbsp;&nbsp;码</h2>
      <!--<span class="title">手机号</span>-->
      <!--<input id="userName" type="text " placeholder="   请输入手机号" v-model="userName" required/><br/>-->
      <!--<span class="title">验证码</span>-->
      <!--&lt;!&ndash;<input id="tel" type="text" placeholder="   请输入手机号" v-model="tel" required /><br/>&ndash;&gt;-->
      <!--<input type="text" required placeholder="请输入验证码" class="vcode" v-model="code"/>-->

      <!--<input type="button" class='vcode_button'value="获取验证码" @click="SendCode()"/> <br/>-->

      <!--<input type="submit" class="submit_data" v-on:click="registe"/>-->

      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="checkTel">
          <el-input type="text" v-model="ruleForm2.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-input type="text" v-model="ruleForm2.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Rigeste',
    data() {
      var tel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }
         else {
          if(value.length) {
            callback(new Error('fafa'));
          } else{
            callback();
          }

        }
      };
      var code = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));

        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          tel: '',
          code: '',
        },
        rules2: {
          checkTel: [
            { validator: tel, trigger: 'blur' }
          ],
          checkCode: [
            { validator: code, trigger: 'blur' }
          ]
        }
      };
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
    margin-top:50px;
    margin-bottom:20px;
    font-size: 40px;
  }
  .title{font-size: 23px;height: 50px;line-height: 50px;margin-left: 100px;width: 100px;margin-right: 10px;margin-top: 20px;float: left}
  input{  border-radius:10px; height:50px;border: 1px #cbcbcb solid;width: 250px;margin-top: 20px;}
  .vcode{width: 140px;margin-right: 10px;}
  .vcode_button{width: 100px;font-size: 20px;}
  .submit_data{margin:30px 100px; width: 370px;background-color: #5394ec; font-size: 20px;}
</style>
