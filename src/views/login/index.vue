<template>
  <div class="login-box">
    <div class="login-left">
      <img src="https://juheimgs.oss-cn-beijing.aliyuncs.com/banner/202012/fa16ea48b150b935.png" alt="">
    </div>


    <div class="login-right">



      <div class="login-right-body">

        <div class="login-right-logo">
          <h3>后台管理系统</h3>
        </div>
        <div class="login-right-form">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
                   status-icon>
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath"  alt="" @click="getCode">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="doLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>


    </div>
  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less">
@import "./index.less";
</style>
