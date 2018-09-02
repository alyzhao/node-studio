<template>
  <div class="products">
    <router-view></router-view>
    <el-table :data="products" style="width: 100%" class="product-table">
      <el-table-column prop="productName" label="商品名称">
      </el-table-column>
      <el-table-column label="商品图">
        <template slot-scope="scope">
          <img class="product-img" :src="scope.row.productImg">
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editProduct(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteProduct(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        products: [{
          id: '1',
          productName: '商品名称一',
          productImg: '/images/p3.png'
        }, {
          id: '2',
          productName: '商品名称一',
          productImg: '/images/p3.png'
        }, {
          id: '3',
          productName: '商品名称一',
          productImg: '/images/p3.png'
        }]
      }
    },
    methods: {
      editProduct (productId) {
        console.log(productId)
        this.$router.push(`/products/edit/${productId}`)
      },
      deleteProduct (productId) {
        console.log(productId)
      }
    }
  }
</script>
<style lang="scss">
  .products {
    .edit-products + .product-table {
      display: none;
    }
    .product-img {
      max-width: 150px;
      max-height: 150px;
    }
    table {
      tr {
        th, td {
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
</style>