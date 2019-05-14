<template>
  <div>
    <div class="issue">
        <!-- form提交表单 -->
        <el-form :model="issue" :rules="applyRule" ref="issue" label-width="80px">
           <el-form-item label="店家名称" prop="shopName">
                <el-input class="shopInput" placeholder="请输入店家名" v-model="issue.shopName" clearable style="width:360px;"></el-input>
           </el-form-item> 
        <el-form-item label="商品名称" prop="goodsName">
          <el-input  v-model="issue.goodsName" placeholder="请输入商品名称" style="width:360px;" clearable ></el-input>
        </el-form-item >

          <el-form-item label="选择分类" > 
              <el-cascader
              style="width:360px;"
              placeholder="请选择商品类目"
              :options="options"
              clearable 
              @active-item-change="handleChange"
              :props="prop"
            ></el-cascader>
          </el-form-item>

         <el-form-item label="商品品牌" prop="brand">
            <el-select
              size="medium"
              placeholder="请选择商品品牌"
              v-model="issue.brand"
              style="width:360px;"
               @change="handleBrand"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.brand"
                :key="value"
                :value="value"
                :label="item.brandClass"
              ></el-option>
            </el-select>
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
            <el-input class="shopInput" placeholder="请输入出厂价" v-model="issue.userName" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="批发价" prop="phoneNumber">
            <el-input class="shopInput" placeholder="请输入批发价" v-model="issue.phoneNumber" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="零售价" prop="WechatID">
            <el-input class="shopInput" placeholder="请输入零售价" v-model="issue.WechatID" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="商品积分" prop="integral">
            <el-input class="shopInput" placeholder="请输入商品积分" v-model="issue.integral" clearable style="width:360px;"></el-input>
          </el-form-item>
            <el-form-item label="商品描述" prop="categoryInfo">
               <el-input type="textarea" placeholder="请输入商品描述" class="site" v-model="issue.categoryInfo" size="medium" :rows="5" resize="none"></el-input>
           </el-form-item> 
          <div class="upload-box clearfix">
            <el-form-item label>
              <span class="upload-img">上传商品主图</span>
              <upload :show="false" @on-Success="masterMapImgonSuccess"/>
            </el-form-item>
            <el-form-item label class="upload">
              <span class="upload-img">上传图文详情</span>
              <upload :show="false" @on-Success="textImgonSuccess"/>
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

import { getClassify,getClassifyCut,getTrademark,getIssue ,getAdventure} from "@/api/commodity";
import { getAddressInfo,getCity } from "@/api/level3Linkage.js";

export default {
  name:'issueCommodity',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      //发布商品定义
      issue: {
        expressage: '',
        province: '',
        city: '',
        district: '',
        brand:'',
        goodsName:'',
        shopName:'',
        // selectedOptions:'',
      },
      //下拉数据
      optionList: {
        expressage: [],
        provinceList: [],
        cityList: [],
        districtList: [],
        brand:[],
      },
      options:[],
      prop:{
          value:'gcId',
          label:'gcName',
          children: 'goodsClassPc',
      },
      //发布商品规则
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
        ],
        goodsName: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        selectedOptions: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        brand: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        categoryInfo: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        shopName: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        classes: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        integral: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      }
    };
  },
  created() {
    // this.handleChange()
    this.handleCall()
    this.handleBrand()
    this.firstData()
  },
  methods: {
    bankImgonSuccess() {

    },

    // 提交
    handleSubmit() {
      this.$refs.issue.validate(res => {
        if (res) {

            let obj = {
              goodsName:this.issue.goodsName,
              storeName:this.issue.shopName,
              goodsPrice:this.issue.userName,
              goodsPromotionPrice:this.issue.phoneNumber,
              goodsMarketprice:this.issue.WechatID,
              goodsImage:this.masterMap,
              goodsJingle:this.textImg,
              goodsBody:this.issue.categoryInfo,
              brandId:this.issue.brand,
              areaid1:this.issue.province,
              areaid2:this.issue.city,
              areaid3:this.issue.district,
              storeId:this.$store.state.user.storeId,
              score:this.issue.integral
            }
             getIssue( obj ).then((res)=>{
                  if(res.code === '200'){
                  this.$message({
                    message: res.errorMsg,
                    type: 'success',
                    duration: 5 * 1000
                  })
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

   //商品主图
    masterMapImgonSuccess( key ) {
       this.masterMap = key
    },

   //图文详情
    textImgonSuccess( key ) {
       this.textImg = key
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
       this.optionList.districtList = res.data;
    });
    },

    // 选择分类
    firstData(){

        getClassify().then(res=>{
          this.options = res.data
        })
    },

  //下级分类
    handleChange( val) {
      //  getClassifyCut({gcParentId:val}).then((res)=>{
      //    let firstData = this.options
      //    firstData[val[0]].children = res.data
      //    this.getClassifyList()
      //  })
    },

    // getClassifyList(gcParentId) {
    //    getClassifyCut({gcParentId}).then((res)=>{
    //      let firstData = this.options
    //      firstData[val[0]].children = res.data
    //       console.log(firstData)
    //    })
    // },

    //商品品牌
    handleBrand(){     
      getTrademark().then((res)=>{
          this.optionList.brand = res.data
      })
    },
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
