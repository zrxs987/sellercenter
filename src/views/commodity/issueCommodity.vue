<template>
  <div>
    <div class="issue">
        <!-- form提交表单 -->
        <el-form :model="issue" :rules="applyRule" ref="issue" label-width="80px">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input  v-model="issue.goodsName" placeholder="请输入商品名称" style="width:360px;" clearable ></el-input>
        </el-form-item >

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
                :label="item.brandName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择分类"> 
            <el-cascader
              style="width:360px;"
              placeholder="请选择商品类目"
              :props="prop"
              :options="classifyOptions"
              change-on-select
              @change="handItemChange"
              v-model="orderPara"
              clearable
            ></el-cascader>
          </el-form-item>

          <el-form-item label="选择产地" >
           <!-- <el-input  v-model="issue.add" style="display:none;"></el-input> -->
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

          <el-form-item label="出厂价" prop="factoryPrice">
            <el-input class="shopInput" placeholder="请输入出厂价" v-model="issue.factoryPrice" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="批发价" prop="tradePrice">
            <el-input class="shopInput" placeholder="请输入批发价" v-model="issue.tradePrice" clearable style="width:360px;"></el-input>
          </el-form-item>
          <el-form-item label="零售价" prop="retailPrice">
            <el-input class="shopInput" placeholder="请输入零售价" v-model="issue.retailPrice" clearable style="width:360px;"></el-input>
          </el-form-item>
            <el-form-item label="商品描述" prop="categoryInfo">
               <el-input type="textarea" placeholder="请输入商品描述" class="site" v-model="issue.categoryInfo" size="medium" :rows="5" resize="none"></el-input>
           </el-form-item> 
            <el-form-item label='上传商品主图' label-width="100px">
              <upload :show="false" @on-Success="masterMapImgonSuccess"/>
            </el-form-item>
            <!-- <el-form-item label='上传图文详情' label-width="100px" class="upload">
              <upload :show="false" @on-Success="textImgonSuccess"/>
            </el-form-item> -->
          <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">重置</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
            <!-- <el-button type="primary" @click="handleStandard()">添加规格</el-button> -->
            <el-button type = "primary"  :disabled = " openIsDisabled " v-show="buttonShow"   @click = " handleStandard( ) " > 添加规则 </el-button >
            <el-button type = "primary"  :disabled = " closeIsDisabled "  v-show="buttonAgainst"  @click = " closeBoxCabin( ) " > 重选分类  </el-button > 
          </div>
        </el-form>
      </div>

    <!-- 添加规格   //  v-for="(domain) in standard[`domains${index+1}`]" -->
    <el-dialog
        class="ui-layout_edit-dialog"
        title="添加规格"
        :visible.sync="isShow"
        width="900px"
    >
    <el-form  class="standardForm clearfix" :model="standard" :rules="standardRule" ref="standard" style='magin-top:30px;' label-width="40px">

         <div class="standard" v-for="(item,index) in spNameList" :key="item.index">
          <el-form-item > 
            <span  class="upload-img">{{item}}</span>      
            <el-input  v-model="standard[item]"  style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item
             v-for="(domain) in standard[`domains${index+1}`]"
            :key="domain.index"
          >
            <el-input v-model="domain[`${item}`]" style="width:120px;" clearable></el-input>
            <el-button @click.prevent="removeDomain( domain,index+1 )">删除</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"  @click="submitForm( item,index,`domains${index+1}`)">提交</el-button>
            <el-button  @click="addDomain(item,index+1)">新增{{item}}</el-button>
          </el-form-item>
      </div>

      <el-table
        :data="tableData"
         border
        :header-cell-style="{background:'#dee1e6'}" 
         style="width: 100%; margin-right: 60px;">

        <el-table-column  prop="id"   label="颜色"></el-table-column>
        <el-table-column  prop="name" label="尺寸"></el-table-column>
        <el-table-column  prop="amount1" label="数值 1"> </el-table-column>
        <el-table-column  prop="amount2" label="数值 2"> </el-table-column>
        <el-table-column  prop="amount3" label="数值 3"> </el-table-column>  
      </el-table>
    </el-form> 
          <div class="footerBtn" style="margin-left:240px; margin-top: 30px;">
            <el-button size="small" @click="handleStandardCancel()">取消</el-button>
            <el-button size="small" type="primary" @click="handleStandardAffirm()">确认</el-button>
          </div>
    </el-dialog>

    </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";

import { getClassify,
         getClassifyCut,
         getTrademark,getIssue ,
         getAdventure,getAddStandard,
         getIdStandard,
        } from "@/api/commodity";

import { getAddressInfo,getCity } from "@/api/level3Linkage.js";
import { log } from 'util';

export default {
  name:'issueCommodity',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      buttonShow:true,
      buttonAgainst:false,
      tableData:[],
      //添加规格
      standard:{
        domains1: [],//渲染新增的数组
        domains2: [],
        domains3: [],
      },
      standardList:[],
      isShow:false,
      //发布商品定义
      issue: {
        expressage: '',
        province: '',
        city: '',
        district: '',
        brand:'',
        goodsName:'',
      },
      //下拉数据
      optionList: {},
      classifyOptions:[],
      orderPara:[],
      options:[],
      prop:{
          value:'gcId',
          label:'gcName',
          children: 'goodsClassPc',
      },
      //发布商品规则
      applyRule: {
        factoryPrice: [
             {
                required: true,
                message: "带*号不能为空",
                trigger: "blur"
             }
          ],
        tradePrice: [
             {
                required: true,
                message: "带*号不能为空",
                trigger: "blur"
            }
         ],
        retailPrice: [
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
        brand: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      },
      standardRule:{},
      spNameList:[],
      spIdList:[],
      loading:false,
      openIsDisabled: false ,
      closeIsDisabled: false,

    };
  },
  created() {
    this.handleCall()
    this.handleBrand()
    this.firstData()
  },
  methods: {

    // 提交
    handleSubmit() {
      this.$refs.issue.validate(res => {
        if (res) {
            
            let obj = {
              goodsName:this.issue.goodsName,
              goodsPrice:this.issue.factoryPrice,
              goodsPromotionPrice:this.issue.tradePrice,
              goodsMarketprice:this.issue.retailPrice,
              goodsImage:this.masterMap,
              //goodsJingle:this.textImg,
              goodsBody:this.issue.categoryInfo,
              brandId:this.issue.brand,
              areaid1:this.issue.province,
              areaid2:this.issue.city,
              areaid3:this.issue.district,
              storeId:this.$store.state.user.storeId,
              gcId1: this.orderPara[0],
              gcId2: this.orderPara[1],
              gcId3: this.orderPara[2],
              gcId:this.orderPara[0],
              abc:JSON.stringify(this.issue.domains),
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
    // textImgonSuccess( key ) {
    //    this.textImg = key
    // },

    //点击重置
    handleCancel() {
      this.issue.goodsName = '',
      this.issue.factoryPrice = '',
      this.issue.tradePrice = '',
      this.issue.retailPrice = '',
      this.issue.categoryInfo = '',
      this.issue.brand = '',
      this.issue.province = '',
      this.issue.city = '',
      this.issue.district= '',
      this.masterMap = '',
      this.orderPara=[],
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
          // console.log(res,'1');
          this.options = res.data;
          this.classifyOptions = res.data;
            for(let i=0;i<this.classifyOptions.length;i++){
            if(this.classifyOptions[i].goodsClassPc){
                    for(let j=0;j<this.classifyOptions[i].goodsClassPc.length;j++){
                          this.classifyOptions[i].goodsClassPc[j].goodsClassPc = [];
               }
            }
          }
       })
    },

    handItemChange(e){
        if(e.length ==2){
            this.handleChange(e);
       }
    },
  //下级分类
    handleChange( val) {
       getClassifyCut({gcParentId:val[1]}).then((res)=>{
          for(let i=0;i<this.classifyOptions.length;i++){
            if(this.classifyOptions[i].goodsClassPc){
                    for(let j=0;j<this.classifyOptions[i].goodsClassPc.length;j++){
                      if(this.classifyOptions[i].gcId ==val[0] && this.classifyOptions[i].goodsClassPc[j].gcId ==val[1] ){
                           this.classifyOptions[i].goodsClassPc[j].goodsClassPc = res.data;
                            //console.log(this.classifyOptions,'2');
                  }
               }
            }
          }
       })
    },


//商品品牌
  handleBrand(){     
    getTrademark().then((res)=>{
      //console.log(res.data,'res.data')
        this.optionList.brand = res.data
    })
  },

  //删除
  removeDomain(item,num ) {
    var index =this.standard[`domains${num}`].indexOf(item)
    if (index !== -1) {
       this.standard[`domains${num}`].splice(index, 1)
    }
  },
  
  //新增
  addDomain(itemname,index) {
  this.standard[`domains${index}`].push({[itemname]:''});
  },

//提交
submitForm( item,index,arrName ) {

  let obj = {
    spValueName:this.standard[item],
    spId:'',
    spValueSort:JSON.stringify(this.standard[arrName]),
    gcId:this.orderPara[0],
    storeId:this.$store.state.user.storeId,
}

  getAddStandard( obj ).then(( res )=>{
     console.log(res,'res')
  })

},

//获取规格名称
handleStandard() {
    this.isShow = true
    getIdStandard({gcId:this.orderPara[0]}).then((res)=>{

     if(res.code == '200'){
        this.standardList = res.data
        this.buttonShow = false
        this.buttonAgainst = true
     }

    for(let i=0;i<this.standardList.length;i++){
        this.gcId=this.standardList[i].gcId//获取当前分类的唯一标识
       if(this.standardList[i].typeSpecList){
           for(let j=0;j<this.standardList[i].typeSpecList.length;j++) {
              
              this.spNameList.push(this.standardList[i].typeSpecList[j].spec.spName)
              this.spIdList.push(this.standardList[i].typeSpecList[j].spec.spId)
              
           }
         console.log(this.standardList,'this.standardList')
        }
         
      }
       
   })
},

closeBoxCabin() {
      this.isShow = true
  //  this .openIsDisabled = true 
  //  this .closeIsDisabled = false 
  //   getIdStandard({gcId:this.orderPara[0]}).then((res)=>{

  //    if(res.code == '200'){
  //       this.standardList = res.data
  //       this.buttonAgainst = false
  //       this.buttonShow = true
  //    }

  //   for(let i=0;i<this.standardList.length;i++){
  //      if(this.standardList[i].typeSpecList){
  //          for(let j=0;j<this.standardList[i].typeSpecList.length;j++) {
              
  //             this.spNameList.push(this.standardList[i].typeSpecList[j].spec.spName)
  //             console.log(this.spNameList,'this.spNameList')
  //          }
  //       }
  //     }
  //  })
},

//规格取消
handleStandardCancel() {
  
},
//规格确认
handleStandardAffirm() {
   
},


}
};
</script>


<style lang="scss"  scoped>
.issue {
  width: 800px;
  margin: 30px auto;
}
.el-form {
  margin-left: 50px;
}

.buttonBtn {
  margin-left: 120px;
}

/deep/.el-textarea__inner {
    width: 54% !important;  
}

.standardForm {
  overflow: hidden;
  .standard {
    width: 240px;
    float: left !important;
  }
}
.upload-img {
  margin-left: -30px;
  line-height: 40px;
}

/deep/.el-dialog__body{
  padding-right: 60px;
}
</style>
