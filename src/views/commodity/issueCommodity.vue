<template>
  <div>
    <div class="issue">
        <!-- form提交表单 -->
        <el-form :model="issue" :rules="applyRule" ref="issue" label-width="80px">

          <el-form-item label="选择分类">
            <div class="block">
              <el-cascader
                style="width:360px;"
                placeholder="请选择商品类目"
                v-model="issue.selectedOptions"
                :options="options"
                clearable 
                @change="handleChange"
                    :props="{
                        value: 'id',
                        label: 'gcName',
                        children: 'cities'}"
                >
              </el-cascader>
            </div>
          </el-form-item>
          
          <el-form-item label="退货地址" >
            <el-select
              size="small"
              style="width:118px;"
              placeholder="请选择省"
              v-model="issue.province"
              @change="handleSelectProvince"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>

            <el-select
              size="small"
              placeholder="请选择市"
              style="width:118px;"
              v-model="issue.city"
              @change="handleSelectCounty"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.cityList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
            <el-select
              size="small"
              style="width:118px;"
              placeholder="请选择区"
              v-model="issue.district"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.districtList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出厂价" prop="userName">
            <el-input class="shopInput" placeholder="" v-model="issue.userName" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="批发价" prop="phoneNumber">
            <el-input class="shopInput" placeholder="" v-model="issue.phoneNumber" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="零售价" prop="WechatID">
            <el-input class="shopInput" placeholder="" v-model="issue.WechatID" clearable style="width:360px;"></el-input>
          </el-form-item>
            <el-form-item label="类别信息" >
               <el-input type="textarea" class="site" size="medium" :rows="5" resize="none"  v-model="issue.site" ></el-input>
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
            <el-button type="primary" @click="handleCancel()">重置</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { getClassify,getClassifyCut, } from "@/api/commodity";
import { getAddressInfo,getCity } from "@/api/level3Linkage.js";

export default {
  name:'issueCommodity',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      //申请开店定义
      issue: {
        expressage: '',
        province: '',
        city: '',
        district: '',
        site: '',
      },
      //下拉数据
      optionList: {
        expressage: [],
        provinceList: [],
        cityList: [],
        districtList: []
      },
      options:[],
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
  created() {
    this.handleChange();
    this.handleCall();
  },
  methods: {
    bankImgonSuccess() {},
    // 按钮点击下一步

    handleSubmit() {
      // this.$refs.issue.validate(res => {
      //   if (res) {
             
      //   }
      // });
    },
    //点击取消
    handleCancel() {
      this.issue = {}
      this.$refs.issue.resetFields();
    },
     handleCall(val){
       this.vals = val;
      getAddressInfo({
        areaParentId: val,
        type: "1"
      }).then(data => {
        this.optionList.provinceList = ''
        this.optionList.provinceList = data.data;
      })
     },

    //省
    handleSelectProvince(val) {
         getCity({
               areaParentId:++val,
               type: "2"
        }).then(res => {
          this.optionList.cityList=''
          this.optionList.cityList = res.data;
      });
    },

    //市
    handleSelectCounty(val) {
            getCity({
            areaParentId:this.optionList.cityList[val].areaId,
            type: "3"
       }).then(res => {
        this.optionList.districtList = ''
       this.optionList.districtList = res.data;
    });
    },

    //选择分类
    handleChange( val ) {
      getClassify().then((res)=>{
         this.options = res.data;
      })
    },
    loadData(){
       getClassifyCut().then({
          
       })
    }

    // handleChange() {

    // }
  }
};

</script>


<style lang="scss"  scoped>
.issue {
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
  margin-left: 180px;
}

/deep/.el-textarea__inner {
    width: 54% !important;
}

</style>
