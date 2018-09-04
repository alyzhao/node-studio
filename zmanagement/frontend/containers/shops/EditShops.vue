<template>
  <div class="edit-shops">
    <el-form ref="shopInfo" :model="shopInfo" label-width="120px" :rules="shopRules" status-icon style="padding: 30px 30px 10px 0;">
      <el-form-item label="商家名称" prop="shopName">
        <el-input style="max-width: 500px" v-model="shopInfo.shopName" clearable></el-input>
      </el-form-item>

      <el-form-item label="商家法人" prop="shopOwer">
        <el-input style="max-width: 500px" v-model="shopInfo.shopOwer" clearable></el-input>
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
    data () {
      return {
        shopInfo: {
          shopName: '测试商家一',
          shopOwer: '测试商家',
          shopPhone: '123412351'          
        },
        shopRules: {
          shopName: [{ required: true, message: '商家名称不能为空', trigger: 'blur' }],
          shopOwer: [{ required: true, message: '商家法人不能为空', trigger: 'blur' }],
          shopPhone: [{ required: true, message: '商家联系方式不能为空', trigger: 'blur' }]
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
      },
      cancel () {
        this.$router.push('/shops')
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