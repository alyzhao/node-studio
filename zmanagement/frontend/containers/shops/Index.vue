<template>
  <div class="shop">
    <router-view></router-view>
    <div class="shop-table-wrap">
      <el-row class="operate-container">
        <el-button-group>
          <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addShop">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteBatchShop">删除</el-button>          
        </el-button-group>
      </el-row>

      <el-table :data="shops" style="width: 100%" class="shop-table center-tb" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="shopName" label="商家名称">
        </el-table-column>

        <el-table-column label="商家法人" prop="shopOwer">
        </el-table-column>

        <el-table-column label="联系方式" prop="shopPhone">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editShop(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteShop(scope.row.id)">删除</el-button>
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
        shops: [{
          id: 1,
          shopName: '测试商家一',
          shopOwer: '测试商家',
          shopPhone: '123412351'
        }, {
          id: 2,
          shopName: '测试商家一',
          shopOwer: '测试商家',
          shopPhone: '123412351'
        }, {
          id: 3,
          shopName: '测试商家一',
          shopOwer: '测试商家',
          shopPhone: '123412351'
        }],
        multipleSelection: []
      }
    },
    methods: {
      addShop () {
        this.$router.push(`/shops/add`)
      },
      editShop (id) {
        this.$router.push(`/shops/edit/${id}`)
      },
      deleteShop () {

      },
      deleteBatchShop () {

      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
<style>
  .edit-shops + .shop-table-wrap {
    display: none;
  }
</style>