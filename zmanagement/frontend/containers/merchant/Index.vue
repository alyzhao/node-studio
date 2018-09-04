<template>
  <div class="user-info">
    <el-row :gutter="30">
      <el-col class="title">
        邮箱
      </el-col>
      <el-col class="info">
        {{user.email}}
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>
<style lang="scss">
  
</style>