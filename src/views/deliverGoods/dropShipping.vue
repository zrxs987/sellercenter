<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-form :inline="true" class="headerForm" style="margin-bottom: 1.5%;">
          <el-col :span="5">
          <el-form-item label="快递公司">
            <el-select
              size="medium"
              placeholder="快递公司"
              v-model="systemInformation.expressage"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="item.eName"
              ></el-option>
            </el-select>
          </el-form-item>
         </el-col>

          <div class="btnClick">
          <el-button type="primary" @click="handleInquire">发货</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}"
      @selection-change="handleSelectionChange"
    > 
      <el-table-column type="selection" align="center"/>
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" label="订单编号" width="220" prop="orderSn">
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="240" prop="goodsName">
      </el-table-column>
      <el-table-column label="金额" align="center" prop="goodsAmount">
      </el-table-column>

      <el-table-column align="center" label="订单状态" prop="orderState">
        <template slot-scope="scope" >
          <span  v-if="scope.row.orderState == 0" >已取消</span>
          <span  v-if="scope.row.orderState == 10" >未付款</span>
          <span  v-if="scope.row.orderState == 20" >已付款</span>
          <span  v-if="scope.row.orderState == 30" >已发货</span>
          <span  v-if="scope.row.orderState == 40" >已收货</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付状态">
        <template slot_scope="scope">
          <span>已支付</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态">
        <template slot_scope="scope">
          <span>待发货</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" prop="paymentCode">
      </el-table-column>
      <el-table-column align="center" label="成交时间" prop="finnshedTime">
      </el-table-column>
      <el-table-column prop="address" align="center" label="操作">
        <template slot-scope="scope">
                <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line" @click="handleCompile(scope.row)" >编辑</span>
        </template>
     </el-table-column>
    </el-table>

    <!-- 快递编号 -->
    <el-dialog title="快递编号" :visible.sync="dialogFormVisible" width="500px" @close="handleCloseSystemInfo">

      <el-form :model="serialNumber" :rules="serialNumberRule" ref="serialNumber" :label-width="formLabelWidth">
        <el-form-item label="快递编号" prop="headlines" >
          <el-input  v-model="serialNumber.headlines" style="width:300px;" placeholder="请输入快递编号" clearable></el-input>
        </el-form-item> 
        <div  class="dialog-footer">
            <el-button type="primary" @click="handleModifyPwd()">提交</el-button>
        </div> 
       </el-form>
    </el-dialog>

    <pagination :total="50"/>
  </div>
</template>

<script>
import {
  getLogisticsCompany,
  getMerchantOrder,
} from "@/api/level3Linkage.js";
import { getBusinessAddress } from "@/api/locationManage";
import { getTrackingNumber } from "@/api/deliverGoods";
import {getBusinessState} from '@/api/classify'
import pagination from "@/components/Pagination/index";

export default {
  // name: "dropShipping",
  components: {
    pagination
  },
  data() {
    return {
      dialogFormVisible:false,
      formLabelWidth: "100px",
      systemInformation: {
        expressage: "",
      },
      //下拉数据
      optionList: {
        expressage: [],
      },
      loading:false,
      orderId:'',
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: "+id"
      },
      vals: "",
      tableData: [],
      tableSelectData:[],
      //勾选id
      paySnId:'',
      //弹框规则
    serialNumberRule: {
      headlines: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
         ],
        },
      serialNumber:{
         headlines:'',
      },
    };
  },

  created() {
    this.fetchData();
    this._getLogisticsCompany();
  },

  methods: {

    //table序号
    indexMethod(index) {
      return ++index * 1;
    },

    fetchData() {
      this.loading = true;
      getMerchantOrder({ storeId:this.$store.state.user.storeId, orderState: 20 }) // this.$store.state.user.storeId
        .then(res => {
           if (res.code === "200") {
            this.loading = false;
             res.data = res.data.map( item => {
              return {
                ...item,
                goodsName: item.orderGoodsList.length == 0 ? '' : item.orderGoodsList[0].goodsName
                
              }
            })
            this.tableData = res.data;
          } else {
            this.$message({
              message: res.errorMsg,
              type: "error",
              duration: 5 * 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //表格勾选
    handleSelectionChange( row ) {
       this.tableSelectData = row;
          let idArr = [];
          this.tableSelectData.forEach(item => {
              idArr.push(item.orderId)
          });
       this.orderIdId = idArr.join(',')
    },

    //发货
    handleInquire() {
 
        getBusinessState( { storeId:this.$store.state.user.storeId, orderState: 30 } ).then((res)=>{
          
            if (!this.tableSelectData.length) {
                  this.$message.warning("请先勾选数据！");
                  return;
              }
             else if(res.code === '200'){
                 this.$message({
                  message: res.errorMsg,
                  type: "success",
                  duration: 5 * 1000
            });
               this.systemInformation = {}
             }else {
                this.$message({
                  message: res.errorMsg,
                  type: "error",
                  duration: 5 * 1000
            });
          }
        })
    },

    // 重置按钮
    handleReset() {
      this.systemInformation = {};
    },
     
 
    //物流公司
    _getLogisticsCompany() {
      getLogisticsCompany().then(res => {
        res.data.forEach(item => {
          let esName = item.eName;
          this.optionList.expressage = res.data;
        })
      })
   },

  //编辑操作
  handleCompile( row ) {
     this.orderId = row.orderId
     this.dialogFormVisible = true
  },

  
 //提交
  handleModifyPwd( row ) {
    // console.log(row,'row1111')
     this.$refs.serialNumber.validate(res => {
        if (res) {
           
           let  obj = {
             orderId:this.orderId,
             shippingCode:this.serialNumber.headlines,
           }

           getTrackingNumber( obj ).then(( res )=>{
            if(res.code === '200'){
                 this.$message({
                  message: res.errorMsg,
                  type: "success",
                  duration: 5 * 1000
            });
                this.dialogFormVisible = false
             }else {
                this.$message({
                  message: res.errorMsg,
                  type: "error",
                  duration: 5 * 1000
              });
             }
           })
        }
     })
  },

  // 弹框关闭
  handleCloseSystemInfo() {
    this.$refs.serialNumber.resetFields();
    this.serialNumber = {}
  },

  }
};
</script>

<style lang="scss" scoped>
.headerForm {
  height: 30px;
}

</style>
