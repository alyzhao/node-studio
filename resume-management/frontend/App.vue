<template>
  <el-container class="z-management">
    <el-aside width="200px" style="position: relative;">
      <div class="z-management-title">
        简历管理
      </div>
      <el-menu style="height: 100%;padding-top: 56px;box-sizing: border-box;" :default-active="activeIndex" router background-color="#324157"
      text-color="#bfcbd9">

        <el-menu-item v-for="item in menu" :key="item.route" :index="item.route" :route="{path: '/' + item.route}">
          <i :class="item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right;border-bottom: solid 1px #e6e6e6;line-height: 60px;background-color: #242f42;color: #fff;">
        
        power by <a href="https://github.com/alyzhao" target="_blank">Allen Zhao</a>

        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;color: #fff;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="signout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-main style="background-color: #F2F6FC;">
        <div style="box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 3px 1px;background-color: #fff">
          <router-view></router-view>          
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import { userMenu } from 'constants'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        menu: userMenu,
        activeIndex: null
      }
    },
    created () {
      this.axios.interceptors.response.use(response => {
        return response
      }, err => {
        console.log(err)
        if (err.response.status === 401) {
          this.$alert('长时间未操作, 请登录!', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              window.location.href = '/login'
            }
          })
        } else if (err.response.status === 403) {
          this.$alert('操作无权限!', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              window.location.href = '/'
            }
          })
        } else if (err.response.status === 500) {
          console.log(err)
          this.$notify.error({
            title: '获取数据出错',
            message: err.response.data.message || err.message,
            duration: 0
          });
        }
        return Promise.reject(err) 
      })

      let fullPath = this.$router.currentRoute.fullPath
      if (fullPath.match(/\/resume/)) {
        this.activeIndex = 'resume'
      } else if (fullPath.match(/\/index/)) {
        this.activeIndex = 'index'
      }
    },
    methods: {
      signout () {
        this.axios.post('/user/signout').then(res => {
          let data = res.data
          if (data.message === 'success') {
            this.$message.success('退出成功!')
            window.location.href = '/login'
          } else {
            this.$message.error(data.message)
          }
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.Account.user
      }
    }
  }
</script>
<style lang="scss">
  .z-management {
    height: 100%;
    .z-management-title {
      line-height: 56px;
      text-align: left;
      position: absolute;
      top: 0;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      z-index: 9;
      padding-left: 20px;
      width: 100%;
      box-sizing: border-box;
      background: #242f42;
      padding-bottom: 3px;
      i {
        margin-right: 5px
      }
    }
  }
</style>