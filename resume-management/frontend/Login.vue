<template>
  <div class="login">
    <el-form label-position="right" ref="loginForm" label-width="100px" :model="loginForm" status-icon :rules="loginRules" class="loginForm">
      <el-form-item label="账号" prop="name">
        <el-input v-model="loginForm.name" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
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
          name: null,
          pass: null
        },
        loginRules: {
          name: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return
          }
          this.axios.post('/user/signin', {user: this.loginForm}).then(res => {
            let data = res.data
            if (data.message !== 'success') {
              this.$message.error(data.message)
            } else {
              this.$message.success('登陆成功!')
              window.location.href = '/'
            }
          }).catch(err => {
            console.info(err.response)
            this.$message.error(err.response.message)
          })
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