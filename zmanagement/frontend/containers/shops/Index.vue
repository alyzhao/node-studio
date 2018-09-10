<template>
  <div class="shop">
    <router-view @load-data="loadData"></router-view>
    <div class="shop-table-wrap">
      <el-row class="operate-container">
        <el-button-group>
          <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addShop">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteBatchShop" :disabled="multipleSelection.length <= 0">删除</el-button>          
        </el-button-group>
      </el-row>

      <el-table :data="shops" style="width: 100%" class="shop-table center-tb" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="shopName" label="商家名称">
        </el-table-column>

        <el-table-column label="商家法人" prop="shopOwner">
        </el-table-column>

        <el-table-column label="联系方式" prop="shopPhone">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editShop(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteShop(scope.row._id)">删除</el-button>
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
        shops: [],
        multipleSelection: []
      }
    },
    created () {
      let role = this.$store.state.Account.user.role
      if (role) {
        this.checkPermission(role)
      } else {
        this.$store.dispatch('getUserInfo', this).then(user => {
          this.checkPermission(user.role)
        })
      }
    },
    methods: {
      addShop () {
        this.$router.push(`/shops/add`)
      },
      editShop (id) {
        console.log(id)
        this.$router.push(`/shops/edit/${id}`)
      },
      deleteShop (_id) {
        this.$confirm('确定删除该商家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/user/delete', {data: {_id: _id}}).then(res => {
            if (res.data.message === 'success') {
              this.$message.success('删除成功!')
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
      },
      deleteBatchShop () {
        this.$confirm('确定删除这些商家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _ids = this.multipleSelection.map(item => item._id)
          this.axios.delete('/user/batchDelete', {
            data: {_ids}
          }).then(res => {
            if (res.data.message === 'success') {
              this.$message.success('删除成功!')
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      loadData () {
        this.axios.get('/user/list').then(res => {
          let data = res.data
          console.log(data)
          this.shops = data
        })
      },
      checkPermission (role) {
        if (role < 50) {
          window.location.href = '/'
        } else {
          this.loadData()
        }
      }
    }
  }
</script>
<style>
  .edit-shops + .shop-table-wrap {
    display: none;
  }
</style>