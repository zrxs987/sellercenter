<template>
  <div>
    <!-- 步骤栏 -->
    <progressBar :atPresent="5"/>
    <div class="contract">
    <el-form label-width="80px" v-model="uploading"  enctype="multipart/form-data">
      <div class="upload-box clearfix">
        <el-form-item label>
          <span class="upload-img">上传盖章后的合同</span>
          <upload :show="false" @on-Success="contractImgonSuccess"/>
        </el-form-item>
      </div>
      <div class="buttonBtn">
        <!-- <el-button type="primary" @click="handleCancel()">取消</el-button> -->
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { getaddContract } from "@/api/openShop";

export default {
  name:'contract',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      uploading:{
         //盖章的合同
         contract:'',
      },
    }
  },
  methods: {
    //取消
    // handleCancel() {

    // },
    //上传盖章后的合同
    contractImgonSuccess( key ) {
       this.uploading.contract = key
    },
    
    //提交
    handleSubmit() {
    
      if (!this.uploading.contract) {
            this.$message.warning("请先上传盖章后的合同");
            return;
        }

       let obj = {
         contract:this.uploading.contract,
       }

      getaddContract(obj).then((res)=>{
        if(res.code === '200'){
             setTimeout(() => {
               this.$router.push({path:'./shopSucceed'}); 
        }, 1000)
        }else{
               this.$message({
                message: res.errorMsg,
                type: 'error',
                duration: 5 * 1000
              })
            }
        })
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
.el-form {
  margin-left: 80px;
}
.el-steps {
  margin-top: 80px;
}

.buttonBtn {
  margin-left: 100px;
}
.upload-img {
  margin-left: -60px;
  line-height: 50px;
}
.upload-box {
  width: 500px;
  margin-top: 50px;
  margin: 0 auto;
   .el-form-item {
       width: 210px;
       height: 150px;
   } 
}

</style>
