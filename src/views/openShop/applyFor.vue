<template>
  <div>
    <!-- 步骤栏 -->
    <progressBar :atPresent="1"/>
    <div class="setUpShop">
      <!-- form提交表单 -->
        <el-form :model="setUpShop" :rules="applyRule" ref="setUpShop" label-width="80px">
          <el-form-item label="姓名" prop="userName">
            <el-input class="shopInput" placeholder="请输入登录名" v-model="setUpShop.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input class="shopInput" placeholder="请输入手机号" v-model="setUpShop.phoneNumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="WechatID">
            <el-input class="shopInput" placeholder="请输入微信号" v-model="setUpShop.WechatID" clearable></el-input>
          </el-form-item>
          <el-form-item label="商家地址" prop="WechatID">
            <el-input class="shopInput" placeholder="请输入商家地址" type="textarea" :rows="3" resize="none"  v-model="setUpShop.BusinessAddress" clearable></el-input>
          </el-form-item>
          <div class="upload-box clearfix">
            <el-form-item label>
              <span class="upload-img">上传营业执照</span>
              <input style="display:none;" v-model="setUpShop.test">
              <upload :show="false" @on-Success="businessImgonSuccess" />
            </el-form-item>
            <el-form-item label="" >
              <span class="upload-img">上传手持开户许可证</span>
              <upload :show="false" @on-Success="accountImgonSuccess"/>
            </el-form-item>
            <el-form-item label>
              <span class="upload-img">上传身份证正反面+手持</span>
              <upload :show="false" @on-Success="identityCardImgonSuccess"/>
            </el-form-item>
            <el-form-item label>
              <span class="upload-img">上传食品经营许可证</span>
              <upload :show="false" @on-Success="foodImgonSuccess"/>
            </el-form-item>
          </div>
          <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">取消</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { parse } from 'path';
import { getUploadData,getUploadFile } from '@/api/openShop';

export default {
  name:'applyFor',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      // 申请开店定义
    setUpShop: {
        userName: '22',
        phoneNumber: '18870571898',
        WechatID: '222',
        BusinessAddress:'22',
        business:'',
        account:'',
        identityCard:'',
        food:'',
        test:'',
      },
      storeInformation:'',
      //申请开店规则
    applyRule: {
      userName: [
                { required: true, message: "请输入姓名", trigger: "blur" },
                { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
             ],
      phoneNumber:[ 
               {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
              }
           ],
      WechatID: [
                  {
                  required: true,
                  message: "带*号不能为空",
                  trigger: "blur"
                }
            ],
      upload: [
                {
                required: true,
                message: "带*号不能为空",
                trigger: "blur"
              }
          ],
        }
     };
  },
  created(){
    //  getUploadFile()
  },
  methods: {

    //上传营业执照
    businessImgonSuccess(key) {
       this.setUpShop.business = key

    },

    //上传手持开户许可证
    accountImgonSuccess (key) {
       this.setUpShop.account = key
    },

    //上传身份证正反面+手持
    identityCardImgonSuccess (key) {
       this.setUpShop.identityCard = key
    },

    //上传食品经营许可证
    foodImgonSuccess (key) {
       this.setUpShop.food = key
    },
    
    // 按钮点击下一步
    handleSubmit() {
      this.$refs.setUpShop.validate(valid => {
        if (valid) {

          let obj= {
                sellerId: this.$store.state.user.sellerId,
                businessLicense:this.setUpShop.business,
                accountOpeningPermit:this.setUpShop.account,
                idCard:this.setUpShop.identityCard,
                operatingLicense:this.setUpShop.food,
                storeJoininName:this.setUpShop.userName,
                storeJoininMobile:this.setUpShop.phoneNumber,
                storeJoininWx:this.setUpShop.WechatID,
                storeJoininAddress:this.setUpShop.BusinessAddress,
          }

       getUploadData(obj).then((res)=>{

          if(res.code ==='200'){
            this.storeInformation = res.data
            var storeInformations = JSON.stringify(this.storeInformation)
            window.sessionStorage.setItem('storeInformation',storeInformations)

               this.$router.push({
                     path:'./productType'
                 }); 
          }else{
               this.$message({
                message: res.errorMsg,
                type: 'error',
                duration: 5 * 1000
              })
            }    
          })    
        }
     });
    },

    //点击取消
    handleCancel() {
      this.$refs.setUpShop.resetFields();
      this.setUpShop = {}
    },
  },

};
</script>

<style lang="scss"  scoped>
.setUpShop {
  width: 800px;
  margin: 50px auto;
}
.el-form {
  margin-left: 50px;
}

.upload-img {
  margin-left: -60px;
  line-height: 40px;
}

.el-steps {
  margin-top: 80px;
}

.buttonBtn {
  margin-left: 150px;
}
</style>
