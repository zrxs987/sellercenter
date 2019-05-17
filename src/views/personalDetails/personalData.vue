<template>
  <div>
    <div class="personalData">
      <h2>店铺资料</h2>
      <el-form ref="personalData" :model="personalData" :rules="personalDataRule" label-width="80px">
        <h5 style="margin-left: 10px;">请填写真实的资料</h5>
        <el-form-item label>
          <span class="upload-img">店铺头像</span>
          <upload :show="false" @on-Success="bankImgonSuccess"/>
        </el-form-item>
        <el-form-item label="店铺名称" prop="setPwd">
          <el-input  v-model="personalData.setPwd" style="width:360px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="开店日期" prop="enterAgain">
          <el-input  v-model="personalData.enterAgain" style="width:360px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="enterAgain">
          <el-input placeholder='请输入营业执照名称' v-model="personalData.enterAgain" style="width:360px;"></el-input>
        </el-form-item>
         <div class="upload-box clearfix">
            <el-form-item label>
              <span class="upload-img">营业执照</span>
              <upload :show="false" @on-Success="businessImgonSuccess"/>
            </el-form-item>
            <el-form-item label class="upload">
              <span class="upload-img">开户许可证</span>
              <upload :show="false" @on-Success="accountImgonSuccess"/>
            </el-form-item>
          </div>
          <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">重置</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import {getShopInfo,getShopData} from '@/api/personalDetails';

export default {
  name: "personalData",
  components: {
    upload
  },
  data() {
    return {
      personalData: {

      },
      optionList:{

      },
    //发布商品规则
      personalDataRule: {

        setPwd: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        enterAgain: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        // district: [
        //     {
        //     required: true,
        //     message: "带*号不能为空",
        //     trigger: "blur"
        //    }
        // ],

      }
    }
  },
  methods: {
    //营业执照
    businessImgonSuccess( key ) {
       this.business = key
    },
    //开户许可
    accountImgonSuccess( key ) {
       this.account = key
    },
    //头像
    bankImgonSuccess( key ){
        this.headPortrait = key
    },

    //提交
    handleSubmit() {
      this.$refs.personalData.validate(res => {
        if (res) {
             let obj = {
               storeId:this.$store.state.user.sellerId,
               storeAvatar:this.headPortrait, 
               storeBusinessLicense: this.personalData.enterAgain,
               storePictureBusinessLicense:this.business,
               accountOpeningPermit:this.account,
             }
             getShopInfo( obj ).then((res)=>{
                  console.log(res,444)
             }) 
        }
      });
    },
  //重置
  handleCancel() {
    this.personalData = {}
    this.$refs.personalData.resetFields();
    
   }
  }
};
</script>

<style lang="scss" scoped>
.personalData {
   width: 800px;
   margin: 50px auto;
}
.el-input {
  width: 300px;
}
.upload-img {
  margin-left: -70px;
  font-weight: bold;
}

.buttonBtn {
  margin-left: 160px;
}
</style>
