<template>
  <div class="resume">
    <el-table class="table" v-loading="loading" :data="list">

      <el-table-column
        width="150px"
        prop="name"
        label="姓名">
      </el-table-column>

      <el-table-column
        width="150px"
        prop="phone"
        label="电话">
      </el-table-column>

      <el-table-column
        width="250px"
        prop="job"
        label="岗位">
      </el-table-column>

      <el-table-column
        width="150px"
        prop="viewDate"
        label="时间">
      </el-table-column>

      <el-table-column label="转交">
        <template slot-scope="scope">
          <el-select v-model="scope.row.viewerId" placeholder="请选择转发人">
            <el-option
              v-for="item in viewerOptions"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
          <el-button :loading="scope.row.setLoading" @click="setViewer(scope.row)" :disabled="!scope.row.viewerId" type="primary">转发</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-download">
            <a :href="scope.row.filePath">简历</a>
          </el-button>
          <el-button
            :loading="scope.row.deleteLoading"
            type="danger"
            @click="deleteResume(scope.row)"
            size="mini" icon="el-icon-delete">删除</el-button>

        </template>
      </el-table-column>

    </el-table>

    <div class="operating">
      <el-pagination
        @current-change="loadData"
        @size-change="sizeChange"
        :current-page.sync="page"
        :page-sizes="[5, 10, 20]"
        :page-size="size"
        :background="true"
        layout="prev, pager, next, sizes"
        :total="total">
      </el-pagination>
        <!--<el-button size="small" icon="el-icon-delete">删除</el-button>-->
    </div>
  </div>
</template>
<script>

export default {
  name: 'MiniAdmin',
  props: {

  },
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      list: [],
      loading: false,
      viewerOptions: [],
    }
  },
  created () {
    this.loadData()
    this.loadViewerOptions()
  },
  methods: {
    deleteResume (item) {
      if (item.deleteLoading) {
        return
      }
      let id = item._id
      item.deleteLoading = true
      console.log(id)
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/resume/delete', {data: {_id: id}}).then(res => {
          this.$message.success('删除成功!')
          this.loadData(1)
        })
        .catch( err => {
          console.log(err)
        })
        .finally(() => {
          item.deleteLoading = false
        })
      }).catch(() => {})
    },
    setViewer (item) {
      if (item.setLoading) {
        return
      }
      item.setLoading = true
      let { _id, viewerId } = item
      console.log(_id, viewerId)
      if (!viewerId) {
        this.serviceError('请选择转发人')
        return
      }
      this.axios.post('/resume/setViewer', {
        viewerId,
        resumeId: _id,
      })
        .then(({data}) => {
          console.log(data)
          this.$message.success('转交成功')
        })
        .catch(err => console.log(err))
        .finally(() => item.setLoading = false)
    },
    sizeChange (val) {
      this.page = 1
      this.size = val
      this.loadData()
    },
    loadViewerOptions() {
      this.axios.get('/viewer/list')
        .then(({data}) => {
          this.viewerOptions = data.list
        })
        .catch(err => console.log(err))
    },
    loadData (page) {
      this.loading = true
      if (page) {
        this.page = page
      }
      let params = {
        page: this.page,
        size: this.size
      }
      this.axios.get('/resume/list', { params })
        .then(({data}) => {
          this.list = data.list.map(item => {
            item.deleteLoading = false
            item.setLoading = false
            return item
          })
          this.total = data.count         
        })
        .finally(() => {
          this.loading = false
        })
    },
    serviceError (msg = '获取数据出错') {
      this.$message.error(msg)
    }
  }
}
</script>
<style lang="scss">
  .table.el-table {
    th, td {
      text-align: center;
    }
  }
  .operating {
    padding: 50px;
    text-align: right; 
  }
  .el-button a {
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
  .cell .el-select {
    width: 60%;
  }
</style>