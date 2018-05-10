<template>
  <div class="login">
    <form name = 'form' action="">
      <input id="username" type="text" placeholder="请输入手机号码或用户名" />
      <input id='pwd' type="password" placeholder="请输入密码" />
      <button onclick="login()">登录</button>
    </form>
    <div class="account">
      <p class="forget" style="float:right">忘记密码?</p>
      <div class="register">
        <span>还没有账号?</span>
        <a href="#">手机注册</a>
      </div>
    </div>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>

    <div>
      <el-button @click="show3 = !show3">Click Me</el-button>

      <div style="margin-top: 20px; height: 200px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">el-collapse-transition</div>
            <div class="transition-box">el-collapse-transition</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <div>
      <el-button @click="show2 = !show2">Click Me</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-zoom-in-center">
          <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
        </transition>

        <transition name="el-zoom-in-top">
          <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
        </transition>

        <transition name="el-zoom-in-bottom">
          <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
        </transition>
      </div>
    </div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    
    <el-button type="primary" icon="search">搜索</el-button>
    <el-radio-group v-model="radio2">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="4">备选项</el-radio>
      <el-radio :label="5">备选项</el-radio>
    </el-radio-group>
  </div>

</template>
<script>
  export default {
    data: () => ({
      show3: true,
      show2: true,
      radio2: 3
    })
  }
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
