<template>
  <div>
    <div class="personalData">
      <el-form ref="personalData" :model="personalData" :rules="personalDataRule"  label-width="100px">

        <el-form-item label="运费模板名" prop="postalService">
          <el-input placeholder="请填写运费模板名" style="width: 360px;" v-model="personalData.postalService"></el-input>
        </el-form-item>
         <el-form-item label="地区" :label-width="formLabelWidth" class="threeLevel" prop="province">
            <el-select
              size="small"
              placeholder="请选择地区"
              v-model="personalData.province"
              style="width:360px;height:40px;"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="首件" prop="consignee">
          <el-input placeholder="请输入价格" style="width: 360px;" v-model="personalData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="续件" prop="phoneNumber">
          <el-input placeholder="请输入价格" style="width: 360px;" v-model="personalData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="免邮件数>=" prop="Shipping">
          <el-input placeholder="请输入免邮件数" style="width: 360px;" v-model="personalData.Shipping"></el-input>
        </el-form-item>
            <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: 100px;" @click.native.prevent="handleSave">保存</el-button>
            <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: ;" @click.native.prevent="handleReset">重置</el-button>
      </el-form>

    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" width="150" label="名字" prop="postageTemplateName">
      </el-table-column>
      <el-table-column  align="center" width="280" label="地址" prop="postageTemplateArea">
      </el-table-column>
      <el-table-column   align="center" label="首件" prop="postageFirst">
      </el-table-column>
      <el-table-column align="center" label="续件" prop="postageContinue">
      </el-table-column>
      <el-table-column align="center" label="包邮件数" prop="numberPackageMail">
      </el-table-column>
      <el-table-column align="center" label="操作">
          <template slot-scope="scope">
                <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line" @click="handleAmend(scope.row)" >修改</span>
                <span style="color: #409eff;cursor:pointer;margin-left: 30px;" class="line" @click="handleDelete(scope.row)" >删除</span>
          </template>
      </el-table-column>
    </el-table>
    </div>
     <!-- 修改弹框-->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="修改"
      :visible.sync="isShow"
      width="500px"
    >
      <div class="remark">
        <el-form :model="editData" :rules="editDataRule" ref="editData" class="ui-form">
          <el-form-item label="名字" :label-width="formLabelWidth" prop="tax_point">
            <el-input  size="small" v-model="editData.consignee" style="width:300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="地区" :label-width="formLabelWidth" prop="supplier_name">
            <el-input size="small" v-model="editData.location" style="width:300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="首件" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.detail" style="width:300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="续件" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.company" style="width:300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="包邮件数" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.cellphone" style="width:300px;" clearable></el-input>
          </el-form-item>
          <div class="footerBtn">
            <el-button size="small" @click="handleCancel()">取消</el-button>
            <el-button size="small" type="primary" @click="handleAffirm()">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBusinessAddress,
        getIdAddress,
         getModificationAddress,
         getMerchantSite,getDelete,
         getDefault,
} from "@/api/locationManage";

import { getAddressInfo} from "@/api/level3Linkage.js"
import { getFreight,getFreightList,getFreightModification} from "@/api/postage"

export default {
  name: "addLocation",

  data() {
    return {
      isShow:false,
      tableData:[],
      formLabelWidth: "100px",
      personalData: {

      },
      loading:false,
    //下拉数据
      optionList: {
          provinceList: [],
          cityList: [],
          districtList: []
      },
      areaName:'',
     //地址规则
    personalDataRule: {

      phoneNumber:[ 
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
           ],
      consignee: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      location: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      postalService: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      province: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      Shipping: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      postalService: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      },
     personalData:{},
     //弹框数据
      editData:{
         consignee:'',
         location:'',
         detail:'',
         company:'',
         cellphone:'',
      },
      editDataRule:{

      } ,
      areaId:'',
      postageTemplateId:'',
    }
  },
 created(){
   this.tableDataInof();
   this.handleCall();
 },

 methods: {
  //table序号
  indexMethod(index) {
    return ++index * 1;
  },
  //保存
 handleSave() {
    this.$refs.personalData.validate(res => {
      if (res) {
      
        let obj = {
          storeId:this.$store.state.user.storeId,
          postageTemplateName:this.personalData.postalService,
          areaId:this.personalData.province,
          postageFirst:this.personalData.consignee,
          postageContinue:this.personalData.phoneNumber,
          numberPackageMail:this.personalData.Shipping,
          postageTemplateArea:this.areaName,
        }
       getFreight(obj).then((res)=>{
            if(res.code === '200'){
              this.$message({
                message:'保存成功',
                type:'success',
                duration: 5 *1000
              })
              this.$refs.personalData.resetFields();
              this.personalData = {}
            }else{
              this.$message({
                message:res.errorMsg,
                type:'error',
                duration: 5 *1000
              })
            }
         }).catch(()=>{

         })
        }
       })
     },

  //重置   
 handleReset() {
      this.$refs.personalData.resetFields();
      this.personalData = {}
 },

 //列表数据
 tableDataInof() {

    getFreightList({storeId:3}).then((res)=>{   //this.$store.state.user.storeId,
          // console.log(res,'res')
          this.tableData = res.data
      })
    },

//修改操作
handleAmend( row ) {
   this.isShow = true
   this.editData.consignee = row.postageTemplateName
   this.editData.location = row.postageTemplateArea
   this.editData.detail = row.postageFirst
   this.editData.company = row.postageContinue
   this.editData.cellphone= row.numberPackageMail
   this.areaId = row.areaId
   this.postageTemplateId = row.postageTemplateId
},

  handleCall(val){
    this.vals = val;
  getAddressInfo({
    areaParentId: val,
    type: "1"
  }).then(res => {

   res.data = res.data.map( item => {
    return {
      ...item,
      areaName: item.areaName
      
    }
    this.areaName = areaName
  })

    this.optionList.provinceList = res.data;

  })
  },

//删除操作
handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deleteData(row.addressId)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
},
//删除回调
deleteData(addressId){
  getDelete({addressId}).then(()=>{

  })
},

//弹框修改确认
handleAffirm( ) {

    let obj = {
      postageTemplateId:this.postageTemplateId,
      postageTemplateName:this.editData.consignee,
      postageTemplateArea:this.editData.location,
      postageFirst:this.editData.detail,
      postageContinue:this.editData.company,
      numberPackageMail:this.editData.cellphone,
      areaId:this.areaId,
    }
  getFreightModification( obj ).then((res)=>{

        if(res.code === '200'){
          this.$message({
            message:'修改成功',
            type:'success',
            duration: 2 *1000
          })
          this.isShow = false
        }else{
          this.$message({
            message:res.errorMsg,
            type:'error',
            duration: 2 *1000
          })
        }
    }).catch(()=>{
  })
},

//弹框取消
handleCancel() {
   this.editData = {}
},


  }  
};
</script>

<style lang="scss" scoped>
.personalData {
  padding-bottom: 30px;
  margin-top: 20px;
  .el-form {
     margin-left: 100px;
  }
}

.footerBtn {
  margin-left:150px;
}

.remark {
  margin-top: -20px;
  
 }


</style>

