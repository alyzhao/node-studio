<template>
  <div class="login">
    <el-form label-position="right" ref="loginForm" label-width="100px" :model="loginForm" status-icon :rules="loginRules" class="loginForm">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="loginForm.user" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loginForm: {
          user: null,
          pass: null
        },
        loginRules: {
          user: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          pass: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  html, body {
    height: 100%;
  }
  .login {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loginForm {
      margin-top: -150px;
      width: 365px;
      box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
      padding: 30px 38px 10px 0;
    }
  }
</style>