<template>
  <div>
    <div class="personalData">
      <el-form ref="personalData" :model="personalData" :rules="personalDataRule"  label-width="100px">

       <el-form-item label="退货地址" :label-width="formLabelWidth" class="threeLevel" prop="">
            <el-select
              size="small"
              placeholder="请选择省"
              v-model="personalData.province"
              @change="handleSelectProvince"
              style="width: 118px;"
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
              v-model="personalData.city"
              @change="handleSelectCounty"
              style="width: 118px;"
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
              placeholder="请选择区"
              v-model="personalData.district"
              style="width: 118px;"
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
    
        <el-form-item label="详细地址" prop="location">
             <el-input type="textarea" :rows="3" resize="none" placeholder="请输入详细信息,如街道,小区,楼栋号" style="width: 360px;"  v-model="personalData.location"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" >
          <el-input placeholder="请填写邮编" style="width: 360px;" v-model="personalData.postalService"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="consignee">
          <el-input placeholder="请填写收货人姓名" style="width: 360px;" v-model="personalData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input placeholder="请填写手机号码" style="width: 360px;" v-model="personalData.phoneNumber"></el-input>
        </el-form-item>
          <el-form-item label="" >
          <el-checkbox-group v-model="personalData.type">
            <el-checkbox label="设为默认地址" name="type" :true-label="1" :false-label="0"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
            <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: 100px;" @click.native.prevent="handleSave">保存</el-button>
            <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: ;" @click.native.prevent="handleReset">重置</el-button>
      </el-form>
      <!-- <div class="addressSeveral"> 
          <p>以保存7条地址，还可以保存13条地址</p>
      </div> -->
    <el-table
      :data="tableData"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" width="150" label="收货人" prop="sellerName">
      </el-table-column>
      <el-table-column  align="center" width="280" label="所在地址" prop="areaInfo">
      </el-table-column>
      <el-table-column   align="center" label="详细地址" prop="address">
      </el-table-column>
      <el-table-column align="center" label="公司名称" prop="company">
      </el-table-column>
      <el-table-column align="center" label="电话/手机" prop="telphone">
      </el-table-column>
      <el-table-column align="center" label="操作">
          <template slot-scope="scope">
                <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line" @click="handleAmend(scope.row)" >修改</span>
                <span style="color: #409eff;cursor:pointer;margin-left: 30px;" class="line" @click="handleDelete(scope.row)" >删除</span>
          </template>
      </el-table-column>
      <el-table-column align="center" label="设置地址" prop="isDefault">
        <template slot-scope="scope" >
          <span class="set"  @click="handleSetDefault(scope.row)">{{set}}</span>
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
      @close="handleCloseSystemInfo"
    >
      <div class="remark">
        <el-form :model="editData" :rules="editDataRule" ref="editData" class="ui-form">
          <el-form-item label="收货人" :label-width="formLabelWidth" prop="tax_point">
            <el-input  size="small" v-model="editData.consignee" clearable></el-input>
          </el-form-item>
          <el-form-item label="所在地址" :label-width="formLabelWidth" prop="supplier_name">
            <el-input size="small" v-model="editData.location" clearable></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.detail" clearable></el-input>
          </el-form-item>
          <el-form-item label="公司名称" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.company" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话/手机" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.cellphone" clearable></el-input>
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

import { getAddressInfo,getCity} from "@/api/level3Linkage.js"
 
export default {
  name: "addLocation",

  data() {
    return {
      isShow:false,
      tableData:[],
      formLabelWidth: "100px",
      set:'设为默认',
      personalData: {
         province:'',
         city:'',
         district:'',
         adventure:'',
         location:'',
         postalService:'',
         consignee:'',
         phoneNumber:'',
         type:'0',
         province:'',
         city:'',
         district:'',
      },
    //下拉数据
      optionList: {
          provinceList: [],
          cityList: [],
          districtList: []
      },
     //地址规则
    personalDataRule: {
      adventure: [
               {
                required: true,
                message: "带*号不能为空",
                trigger: "blur"
              }
             ],
      phoneNumber:[ 
               {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
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

      } 
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
        storeId:1,
        sellerName:this.personalData.consignee,
        areaId:this.personalData.province,
        cityId:this.personalData.city,
        areaInfo:this.personalData.adventure,
        address:this.personalData.location,
        telphone:this.personalData.phoneNumber,
        isDefault:this.personalData.type,
      }
       getBusinessAddress(obj).then((res)=>{
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
    getMerchantSite({storeId:20}).then((res)=>{
          console.log(res,'res')
          this.tableData = res.data
      })
    },

//修改操作
handleAmend( row ) {
   this.isShow = true
   this.editData.consignee = row.sellerName
   this.editData.location = row.areaInfo
   this.editData.detail = row.address
   this.editData.company = row.company
   this.editData.cellphone= row.telphone
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

//弹框
handleCloseSystemInfo() {

},
//弹框修改确认
handleAffirm() {
  getModificationAddress({sellerName:this.editData,storeId:25}).then((res)=>{
        if(res.code === '200'){
          this.$message({
            message:'修改成功',
            type:'success',
            duration: 5 *1000
          })
          this.isShow = false
        }else{
          this.$message({
            message:res.errorMsg,
            type:'error',
            duration: 5 *1000
          })
        }
    }).catch(()=>{
  })
},

//设为默认地址
handleSetDefault( row ) {
    getDefault({addressId:row.addressId,isDefault:0}).then((res)=>{
       if(res.code === '200') {
           row.set = '默认地址'
       }else{
          this.$message({
            message:res.errorMsg,
            type:'error',
            duration: 5 *1000
          })
        }
    })
 },

//三级联动
  handleCall(val){
    this.vals = val;
  getAddressInfo({
    areaParentId: val,
    type: "1"
  }).then(data => {
    this.optionList.provinceList = data.data;
  })
  },

//省
handleSelectProvince(val) {
      getCity({
            areaParentId:++val,
            type: "2"
     }).then(data => {
      this.optionList.cityList = data.data;
  });
},

//市
handleSelectCounty(val) {
        getCity({
        areaParentId:this.optionList.cityList[val].areaId,
        type: "3"
     }).then(data => {
      this.optionList.districtList = data.data;
   });
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

.upload-img {
  margin-left: -70px;
  font-weight: bold;
}

.addressSeveral {
  width: 40%;

  background-color: gainsboro;
  p {
    line-height: 50px;
    margin-left: 20px;
    color: #fff;
  }
}

.footerBtn {
  margin-left:120px;
}
.set {
   color: red;
   cursor:pointer;
   padding:20px 20px;
   background-color:#f8cccd;
   border-radius:5px;
}

.remark {
  margin-top: -20px;
 }


</style>

