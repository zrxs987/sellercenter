<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">{{buttonText}}
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" :data="dataObj" action="https://up.qbox.me/post" :multiple="imageUploadMultiple" :file-list="fileList" :show-file-list="true"
                 list-type="picture-card" :on-remove="handleRemove" :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
//   import { getToken } from '@/api/qiniu'

  export default {
    // name: 'editorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      },
      imageUploadMultiple: {
        type: Boolean,
        default: true
      },
      buttonText: {
        type: String,
        default: '上传图片'
      },
    },
    data() {
      return {
        dialogVisible: false,
        dataObj: { token: '', key: '' },
        domain: '',
        listObj: {},
        fileList: []
      }
    },
    methods: {
      checkAllSuccess() {
        return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      },
      handleSubmit() {
        const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        if (!this.checkAllSuccess()) {
          this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
          return
        }
        console.log(arr)
        this.$emit('successCBK', arr)
        this.listObj = {}
        this.fileList = []
        this.dialogVisible = false
      },
      handleSuccess(response, file) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = this.domain + response.key
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      },
      handleError(err, file, fileList) {
        this.handleRemove(file)
        this.$message({
          message: `${file.name}上传失败请重新上传`,
          type: 'warning',
          showClose: true,
          duration: 2000
        })
      },
      handleRemove(file) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
            return
          }
        }
      },
      beforeUpload(file) {
        const _self = this
        const fileName = file.uid
        this.listObj[fileName] = {}
//      if(file.size > 2097152) {
//        this.$message({
//          message: `${file.name}文件超过最大上传限度2M,已取消`,
//          type: 'warning',
//          showClose: true,
//          duration: 2000
//        })
//        this.handleRemove(file)
//        return
//      }
        return new Promise((resolve, reject) => {
          getToken().then(response => {
            console.log(response)
            _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
            const key = response.data.key
            const token = response.data.uptoken
            _self._data.dataObj.token = token
            _self._data.dataObj.key = key
            this.domain = response.data.domain
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .editor-slide-upload {
    margin-bottom: 20px;
    /deep/ .el-upload--picture-card {
      width: 100%;
    }
  }

</style>
