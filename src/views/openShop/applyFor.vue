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
        userName: '',
        phoneNumber: '18870571898',
        WechatID: '',
        BusinessAddress:'',
        business:'',
        account:'',
        identityCard:'',
        food:'',
      },
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
    businessImgonSuccess(e) {
      // console.log(e,'11')
       this.setUpShop.business = e.target.files[0]
       let para = getUploadFile( this.setUpShop.business)
       console.log(para,'para')
    },
    //上传手持开户许可证
    accountImgonSuccess (e) {
       this.setUpShop.account = e.target.files[0]
    },
    //上传身份证正反面+手持
    identityCardImgonSuccess (e) {
       this.setUpShop.identityCard = e.target.files[0]
    },
    //上传食品经营许可证
    foodImgonSuccess (e) {
       this.setUpShop.food = e.target.files[0]
    },
    
    // 按钮点击下一步
    handleSubmit() {
      this.$refs.setUpShop.validate(valid => {
        if (valid) {
             
          let formData = new FormData( )
            formData.append('storeJoininAddress',this.setUpShop.business)
            formData.append('businessLicense',this.setUpShop.account)
            formData.append('idCard',this.setUpShop.identityCard)
            formData.append('accountOpeningPermit',this.setUpShop.food)
            formData.append('storeJoininName',this.setUpShop.userName)
            formData.append('storeJoininMobile',this.setUpShop.phoneNumber)
            formData.append('storeJoininWx',this.setUpShop.WechatID)
            formData.append('scId',this.setUpShop.BusinessAddress)
          
          for(var [key, value] of formData.entries()){
          console.log(key, value);
          }
 
       getUploadData(formData).then((res)=>{
            console.log(res,'111')
          if(res.code ==='200'){
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
