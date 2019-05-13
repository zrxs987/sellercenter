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
          <el-input placeholder='请输入店铺名称' v-model="personalData.setPwd" style="width:360px;"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="enterAgain">
          <el-input placeholder='请输入营业执照名称' v-model="personalData.enterAgain" style="width:360px;"></el-input>
        </el-form-item>

        <el-form-item label="开店日期">
          <el-select size="small" placeholder="请选择年" v-model="personalData.province"
             @change="handleSelectProvince"
             style="width:118px;"
              clearable>                 
            <el-option
              v-for="(label, value) in optionList.provinceList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select  size="small" placeholder="请选择月" style="width:118px;" v-model="personalData.city"  @change="handleSelectCounty"
           clearable >                                          
            <el-option
              v-for="(label, value) in optionList.cityList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select size="small" placeholder="请选择日" style="width:118px;" v-model="personalData.district" clearable>
            <el-option
              v-for="(label, value) in optionList.districtList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行账号" prop="district">
            <el-select
              size="medium"
              style="width:360px;"
              placeholder="请选择银行账号"
              v-model="personalData.district"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.districtList"
                :key="value"
                :value="value"
                :label="item.eName"
              ></el-option>
            </el-select>
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
import {getShopInfo} from '@/api/personalDetails';

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
    bankImgonSuccess(){

    },

    handleSelectProvince() {

    },
    handleSelectCounty() {

    },
    //提交
    handleSubmit() {
      this.$refs.personalData.validate(res => {
        if (res) {
             let obj = {
               sellerId:this.$store.state.user.sellerId,
               realName:this.personalData.setPwd,
               residentialAddress:this.personalData.enterAgain,
               realName:this.personalData.setPwd,
               business:this.business,
               account:this.account,
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
