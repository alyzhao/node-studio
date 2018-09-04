<template>
  <el-container class="z-management">
    <el-aside width="250px">
      <el-menu style="height: 100%;" :default-active="activeIndex" router>
        <el-menu-item v-for="item in menu" :key="item.route" :index="item.route" :route="{path: '/' + item.route}">
          <i :class="item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right;border-bottom: solid 1px #e6e6e6;line-height: 60px;">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>用户名称</span>
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
        activeIndex: userMenu[0].route
      }
    },
    created () {
      this.axios.interceptors.response.use(response => {
        console.log(response)
        return response
      }, err => {
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
        }
        return Promise.reject(err) 
      })

      this.$store.dispatch('getUserInfo', this).then(res => {
        console.log('mapActions', res)
      }).catch(err => {
        console.log('mapActions', err)
      })

      if (this.$router.currentRoute.fullPath.match(/\/products/)) {
        this.activeIndex = 'products'
      } else {
        this.activeIndex = 'shops'
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss">
  .z-management {
    height: 100%;
  }
</style>