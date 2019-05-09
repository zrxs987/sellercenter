<template>
  <div>
    <!-- 步骤栏 -->
    <progressBar :atPresent="5"/>
    <div class="contract">
    <el-form label-width="80px" v-model="contract" enctype="multipart/form-data">

        <el-form-item label="上传盖章后的合同" label-width="upload">
          <el-upload
            v-model="contract.upload"
            class="avatar-uploader"
            with-credentials
             action="importFileUrl"
            :show-file-list="false"
            :on-error="uploadError"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="contract.upload" :src="contract.upload" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      <div class="buttonBtn">
        <el-button type="primary" @click="handleCancel()">取消</el-button>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
// import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { getaddContract } from "@/api/openShop";

export default {
  name:'contract',
  components: {
    // upload,
    progressBar
  },
  data() {
    return {
       upload:'100px',
       imageUrl: '',
       importFileUrl:'http://47.112.195.117/upload/file',
       contract:{
           upload:'',
       },
    }
    
  },
  methods: {
    
     handleAvatarSuccess(res, file) {
    
       

      },

     uploadError() {

        this.$message.error('上传失败，请重新上传')

      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      sendFile( param ) {

      },
    
  }
};
</script>

<style lang="scss" scoped>
.contract {
  width: 400px;
  height: 400px;
  margin: 100px auto;
}

.el-steps {
  margin-top: 80px;
}

.buttonBtn {
  margin-left: 120px;
}

/deep/.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

</style>
