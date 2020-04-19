<template>
  <div class="upload">
    <el-upload
      class="upload-resume"
      drag
      action="/resume/add"
      name="resume"
      :on-error="uploadError"
      :limit="5"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">支持多个上传, 上传成功的文件将会出现在下方</div>
    </el-upload>
  </div>
</template>
<script>
  export default {
    methods: {
      uploadError(err, file, fileList) {
        const h = this.$createElement
        console.log(err)
        let { message } = JSON.parse(err.message)
        this.$notify.error({
          title: '上传错误',
          message: h('span', { style: 'word-break: break-all' }, `文件 ${file.name} 上传失败, ${message}`),
          duration: 0
        });
      }
    }
  }
</script>
<style lang="scss">
  .upload {
    padding: 50px;
    .upload-resume {
      width: 500px;
    }

    .el-upload-dragger {
      width: 500px;
      height: 300px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .el-icon-upload {
        margin: 0;
        margin-bottom: -60px;
      }
      .el-upload__text {
        width: 100%;
        margin-top: -35px;
      }
    }
  }
</style>