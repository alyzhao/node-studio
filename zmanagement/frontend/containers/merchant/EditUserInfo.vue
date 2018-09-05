<template>
  <div class="edit-userinfo">
    <el-form ref="userTable" :model="user" label-width="120px" :rules="userRules" status-icon style="padding: 30px 30px 10px 0;">
      <el-form-item label="邮箱" prop="email">
        <el-input style="max-width: 500px" v-model="user.email" clearable></el-input>
      </el-form-item>

<!--       <el-form-item label="商家密码" prop="password">
        <el-input style="max-width: 500px" v-model="user.password" clearable></el-input>
      </el-form-item>
 -->
      <el-form-item label="用户名称" prop="shopName">
        <el-input style="max-width: 500px" v-model="user.shopName" clearable></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="shopOwner">
        <el-input style="max-width: 500px" v-model="user.shopOwner" clearable></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="shopPhone">
        <el-input style="max-width: 500px" v-model="user.shopPhone" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('userTable')">提交修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['id'],
    data () {
      return {
        user: {
          email: '',
          shopName: '',
          shopOwner: '',
          shopPhone: '',
          // password: '123456'
        },
        userRules: {
          email: [{ required: true , message: '商家邮箱不能为空', trigger: 'blur'}],
          // password: [{ required: true , message: '商家密码不能为空', trigger: 'blur'}],
          shopName: [{ required: true, message: '商家名称不能为空', trigger: 'blur' }],
          shopOwner: [{ required: true, message: '商家法人不能为空', trigger: 'blur' }],
          shopPhone: [{ required: true, message: '商家联系方式不能为空', trigger: 'blur' }]
        }
      }
    },
    created () {
      console.log(this.userStore)
      if (this.userStore.email) {
        this.initUserInfo(this.userStore)
      } else {
        this.$store.dispatch('getUserInfo', this).then(user => {
          this.initUserInfo(user)
        })
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return
          }
          // 调取接口用户修改信息
          this.axios.post('/user/update', {user: this.user}).then(res => {
            let data = res.data
            if (data.message === 'success') {
              this.$message.success('修改成功!')
              this.$store.dispatch('getUserInfo', this).then(res => {
                this.$router.push('/index')
              })
            } else {
              this.$message.error(data.message)
            }
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
      },
      initUserInfo (user) {
        Object.keys(this.user).forEach(key => {
          this.user[key] = user[key]
        })
      },
      cancel () {
        this.$router.push('/index')
      }
    },
    computed: {
      userStore () {
        return this.$store.state.Account.user
      }
    }
  }
</script>