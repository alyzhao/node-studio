<template>
  <div class="edit-products">
    <el-form ref="productInfo" :model="productInfo" label-width="100px" :rules="productsRules" status-icon style="padding: 30px 30px 10px 0;">
      <el-form-item label="商品名称" prop="productName">
        <el-input style="max-width: 500px" v-model="productInfo.productName" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="productImg">
        <UploadImg ref="uploadImg" :imgSrc="productInfo.productImg" @file-change="fileChange" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('productInfo')">{{submitText}}</el-button>
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
          productImg: ''
        },
        productsRules: {
          productName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
          productImg: [{ required: true, message: '商品图片不能为空', trigger: 'blur' }]
        }
      }
    },
    created () {
      if (this.idEdit) {
        this.loadData()
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return
          }

          let form = new FormData()
          if (this.productInfo.productImg instanceof File) {
            form.append('uploadImg', this.productInfo.productImg)
          } else {
            form.append('productImg', this.productInfo.productImg)
          }
          form.append('productName', this.productInfo.productName)
          form.append('_id', this.id)
          if (this.idEdit) {
            // 编辑
            this.axios.post('/pro/update', form).then(res => {
              this.successHandle(res, '修改成功!', () => {
                this.$emit('load-data')
                this.$router.push('/products')
              })              
            }).catch(this.errorHandle)
          } else {
            // 添加
            this.axios.post('/pro/add', form).then(res => {
              this.successHandle(res, '添加成功!', () => {
                this.$emit('load-data')
                this.$router.push('/products')
              })
            }).catch(this.errorHandle)

          }
        })
      },
      cancel () {
        this.$router.push('/products')
      },
      fileChange (file) {
        this.productInfo.productImg = file
        console.log(this.productInfo.productImg)
      },
      loadData () {
        this.axios.post('/pro/detail', {_id: this.id}).then(res => {
          let data = res.data
          if (data.message === 'success') {
            this.productInfo.productName = data.productInfo.productName
            this.productInfo.productImg = data.productInfo.productImg
            this.$refs.uploadImg.bgImg = data.productInfo.productImg
          } else {
            this.$message.error(data.message)
          }
        }).catch(this.errorHandle)
      }
    },
    computed: {
      idEdit () {
        return this.$router.currentRoute.name === 'editProducts'
      },
      submitText () {
        return this.idEdit ? '提交修改' : '立即创建'
      }
    },
    components: {
      UploadImg
    }
  }
</script>