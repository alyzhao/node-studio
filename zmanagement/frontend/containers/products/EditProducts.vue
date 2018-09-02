<template>
  <div class="edit-products">
    <el-form ref="productInfo" :model="productInfo" label-width="100px" :rules="productsRules" status-icon style="padding: 30px 30px 10px 0;">
      <el-form-item label="商品名称" prop="productName">
        <el-input style="max-width: 500px" v-model="productInfo.productName" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="productImg">
        <UploadImg :imgSrc="productInfo.productImg" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productInfo')">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>   
    </el-form>
  </div>
</template>
<script>
  import UploadImg from 'components/UploadImg'

  export default {
    props: ['id'],
    data () {
      return {
        productInfo: {
          productName: '',
          productImg: 'http://img.zcool.cn/community/01858e591fe6a6b5b3086ed473c1d0.jpg'
        },
        productsRules: {
          productName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
          productImg: [{ required: true, message: '商品图片不能为空', trigger: 'blur' }]
        }
      }
    },
    created () {
      console.log(this.id)
      console.log(this.$router.currentRoute.name)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.productInfo.productName)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      cancel () {
        this.$router.push('/products')
      }
    },
    components: {
      UploadImg
    }
  }
</script>