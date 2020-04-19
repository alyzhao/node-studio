<template>
  <div class="resume">
    <el-table class="table" v-loading="loading" :data="list">

      <el-table-column
        width="125px"
        prop="name"
        label="姓名">
      </el-table-column>

      <el-table-column
        width="125px"
        prop="phone"
        label="电话">
      </el-table-column>

      <el-table-column
        width="150px"
        prop="job"
        label="岗位">
      </el-table-column>

      <el-table-column
        width="125px"
        prop="viewDate"
        label="时间">
      </el-table-column>

      <el-table-column
        prop="description"
        label="面试评价">
      </el-table-column>

      <el-table-column label="转交">
        <template slot-scope="scope">
          <el-steps :active="scope.row.rank" align-center>
            <el-step v-for="item in viewerOptions" :title="item.name"></el-step>
          </el-steps>

          <el-button :loading="scope.row.setLoading" :disabled="scope.row.rank == 4" @click="setViewer(scope.row)" class="viewer-btn" type="primary" plain>转交</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column label="转交" width="200px">
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
      </el-table-column> -->

      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-download">
              <a :href="scope.row.filePath">简历</a>
            </el-button>
            <el-button type="warning" icon="el-icon-edit" @click="showDialog(scope.row)">评价</el-button>
            <el-button
              :loading="scope.row.deleteLoading"
              type="danger"
              @click="deleteResume(scope.row)"
              size="mini" icon="el-icon-delete">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="编辑面试评价" :visible.sync="dialogVisible" width="500px">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 5}"
        placeholder="请输入评价"
        v-model="description">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitComment" :disabled="!description" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>

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
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      list: [],
      loading: false,
      viewerOptions: [],
      dialogVisible: false,
      description: "",
      currentResumeId: null,
      submitLoading: false,
    }
  },
  created() {
    this.loadData()
    this.loadViewerOptions()
  },
  methods: {
    showDialog(resumeInfo) {
      this.currentResumeId = resumeInfo._id
      this.description = resumeInfo.description
      this.dialogVisible = true
    },
    // 提交评价
    submitComment() {
      this.submitLoading = true
      this.axios.post('/resume/describe', {
        resumeId: this.currentResumeId,
        description: this.description
      })
        .then(({data}) => {
          this.$message.success('评价成功!')
          console.log(data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.submitLoading = false
          this.dialogVisible = false
        })
    },
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
      let _id = item._id
      let rank = item.rank
      if (rank === undefined) {
        rank = 0
      }
      this.axios.post('/resume/setViewer', {
        rank,
        resumeId: _id,
      })
        .then(({data}) => {
          console.log(data)
          this.$message.success('转交成功')
          this.loadData()
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
  .resume {
    .el-step__title {
      font-size: 12px;
      line-height: 25px
    }
    .el-step__icon-inner {
      font-weight: normal;
    }
    .el-step__icon {
      width: 20px;
      height: 20px;
      border-width: 1px;
      font-size: 12px;
    }
    .viewer-btn {
      margin-top: 8px;
    }
  }
</style>