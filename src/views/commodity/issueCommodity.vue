<template>
  <div>
    <div class="setUpShop">
        <!-- form提交表单 -->
        <el-form :model="setUpShop" :rules="applyRule" ref="setUpShop" label-width="80px">
          <el-form-item label="选择分类">
          <el-select
              size="medium"
              placeholder=""
              v-model="setUpShop.userName"
              clearable
            >
              <el-option
                v-for="(label, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="选择产地">
            <el-select
              size="small"
              placeholder="请选择省"
              v-model="setUpShop.province"
              @change="handleSelectProvince"
              clearable
              class="producingarea"
            >
              <el-option
                v-for="(label, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>

            <el-select
              size="small"
              placeholder="请选择市"
              v-model="setUpShop.city"
              @change="handleSelectCounty"
              clearable
              class="producingarea"
            >
              <el-option
                v-for="(label, value) in optionList.cityList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
            <el-select 
              size="small" placeholder="请选择区" 
              v-model="setUpShop.district"
              class="producingarea"
               clearable>
              <el-option
                v-for="(label, value) in optionList.districtList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出厂价" prop="userName">
            <el-input class="shopInput" placeholder="" v-model="setUpShop.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="批发价" prop="phoneNumber">
            <el-input class="shopInput" placeholder="" v-model="setUpShop.phoneNumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="零售价" prop="WechatID">
            <el-input class="shopInput" placeholder="" v-model="setUpShop.WechatID" clearable></el-input>
          </el-form-item>
            <el-form-item label="类别信息" >
               <el-input type="textarea" class="site" size="medium" :rows="5" resize="none"  v-model="setUpShop.site" ></el-input>
           </el-form-item> 
          <div class="upload-box clearfix">
            <el-form-item label>
              <span class="upload-img">上传商品主图</span>
              <upload :show="false" @on-Success="bankImgonSuccess"/>
            </el-form-item>
            <el-form-item label class="upload">
              <span class="upload-img">上传图文详情</span>
              <upload :show="false" @on-Success="bankImgonSuccess"/>
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

export default {
  name:'issueCommodity',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      //申请开店定义
      setUpShop: {
        userName: "",
        phoneNumber: "",
        WechatID: "",
        site:'',
      },
      optionList:{

      },
      //申请开店规则
      applyRule: {
        userName: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
          ],
        phoneNumber: [
               {
                required: true,
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
        ]
      }
    };
  },
  methods: {
    bankImgonSuccess() {},
    // 按钮点击下一步
    handleSubmit() {
      this.$refs.setUpShop.validate(res => {
        if (res) {
             
        }
      });
    },
    //点击取消
    handleCancel() {
      this.$refs.setUpShop.resetFields();
    },
    handleSelectProvince( ) {

    },
    handleSelectCounty( ) {

    },
  }
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

.buttonBtn {
  margin-left: 150px;
}

.el-select {
    width: 300px;
}
/deep/.el-textarea__inner {
    width: 45% !important;
}
.producingarea {
    width: 98px;
}

</style>
