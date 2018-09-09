<template>
  <div class="edit-shops">
    <el-form ref="shopInfo" :model="shopInfo" label-width="120px" :rules="shopRules" status-icon style="padding: 30px 30px 10px 0;">
      <el-form-item label="商家邮箱" prop="email">
        <el-input style="max-width: 500px" v-model="shopInfo.email" clearable></el-input>
      </el-form-item>

      <el-form-item label="商家密码" prop="password" v-if="!isEdit">
        <el-input style="max-width: 500px" v-model="shopInfo.password" clearable></el-input>
      </el-form-item>

      <el-form-item label="商家名称" prop="shopName">
        <el-input style="max-width: 500px" v-model="shopInfo.shopName" clearable></el-input>
      </el-form-item>

      <el-form-item label="商家法人" prop="shopOwner">
        <el-input style="max-width: 500px" v-model="shopInfo.shopOwner" clearable></el-input>
      </el-form-item>

      <el-form-item label="商家联系方式" prop="shopPhone">
        <el-input style="max-width: 500px" v-model="shopInfo.shopPhone" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('shopInfo')">{{submitText}}</el-button>
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
        shopInfo: {
          email: '',
          password: '',
          shopName: '',
          shopOwner: '',
          shopPhone: '',
          _id: ''
        },
        shopRules: {
          email: [{ required: true , message: '商家邮箱不能为空', trigger: 'blur'}],
          password: [{ required: true , message: '商家密码不能为空', trigger: 'blur'}],
          shopName: [{ required: true, message: '商家名称不能为空', trigger: 'blur' }],
          shopOwner: [{ required: true, message: '商家法人不能为空', trigger: 'blur' }],
          shopPhone: [{ required: true, message: '商家联系方式不能为空', trigger: 'blur' }]
        }
      }
    },
    created () {
      if (this.isEdit && this.id) {
        this.loadData()
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return
          }
          console.log('success')
          // 如果是添加操作
          if (!this.isEdit) {
            console.log('addShop', this.shopInfo)
            this.axios.post('/user/signup', {shopInfo: this.shopInfo}).then(res => {
              let data = res.data
              if (data.message === 'success') {
                this.$message.success('添加成功!')
              } else {
                this.$message.error(data.message)
              }
            }).catch(err => {
              console.info(err.response)
              this.$message.error(err.response.data.message)
            })
          } else {
            // 修改操作
            this.axios.post('/user/updateShopInfo', {shopInfo: this.shopInfo}).then(res => {
              let data = res.data
              if (data.message === 'success') {
                this.$message.success('修改成功!')
              } else {
                this.$message.error(data.message)
              }
            }).catch(err => {
              console.info(err.response)
              this.$message.error(err.response.data.message)
            })
          }
        })
      },
      cancel () {
        this.$router.push('/shops')
      },
      loadData () {
        this.axios.post('/user/getShopInfo', {_id: this.id}).then(res => {
          this.initShopInfo(res.data.shopInfo)
        })
      },
      initShopInfo (shopInfo) {
        Object.keys(this.shopInfo).forEach(key => {
          this.shopInfo[key] = shopInfo[key]
        })
      }
    },
    computed: {
      isEdit () {
        return this.$router.currentRoute.name === 'editShop'
      },
      submitText () {
        return this.isEdit ? '提交修改' : '立即添加'
      }
    }
  }
</script>
<style lang="scss">
  
</style>