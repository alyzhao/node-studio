<template>
  <div class="products">
    <router-view @load-data="loadData"></router-view>
    <div class="product-table-wrap">
      <el-row class="operate-container">
        <el-button-group>
          <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addProducts">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteBatchProducts" :disabled="multipleSelection.length <= 0">删除</el-button>          
        </el-button-group>
      </el-row>
      <el-table :data="products" style="width: 100%" class="product-table center-tb" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
        <el-table-column label="商品图">
          <template slot-scope="scope">
            <img class="product-img" :src="scope.row.productImg">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editProduct(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteProduct(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        products: [],
        multipleSelection: []
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      editProduct (productId) {
        console.log(productId)
        this.$router.push(`/products/edit/${productId}`)
      },
      deleteProduct (productId) {
        this.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/pro/delete', {data: {_id: productId}}).then(res => {
            this.successHandle(res, '删除成功!', () => {
              this.loadData()
            })
          }).catch(this.errorHandle)
        })
      },
      addProducts () {
        this.$router.push(`/products/add`)
      },
      loadData () {
        console.log('load-data')
        this.axios('/pro/list').then(res => {
          let data = res.data
          if (data.message === 'success') {
            this.products = data.list

          }
        }).catch(this.errorHandle)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      deleteBatchProducts () {
        this.$confirm('确定删除这些商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _ids = this.multipleSelection.map(item => item._id)
          this.axios.delete('/pro/batchDelete', {
            data: {_ids}
          }).then(res => {
            if (res.data.message === 'success') {
              this.$message.success('删除成功!')
              this.loadData()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        }).catch(err => console.log(err))
      }
    }
  }
</script>
<style lang="scss">
  .products {
    .edit-products + .product-table-wrap {
      display: none;
    }
    .product-img {
      max-width: 150px;
      max-height: 150px;
    }
  }
  .center-tb {
    table {
      tr {
        th, td {
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
  .operate-container {
    padding: 20px;
    border-bottom: 1px solid #DCDFE6;
    margin-bottom: 15px;
  }
</style>