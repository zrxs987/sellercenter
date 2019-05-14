<template>
  <div class="app-container">
 <div class="filter-container">
      <!-- <el-row >

            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="5">
                <span>收货人 ：</span>
                 <el-input style="width: 60%;" placeholder="请输入" size="medium" v-model="queryData.sku" clearable></el-input>
            </el-col>
               <div class="btnClick">
                <el-button type="primary"  @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"  @click="handleDownload">导出</el-button>
              </div>
            </el-form>
        </el-row> -->
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}" 
      
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" width="240" label="订单编号" prop="orderSn">
      </el-table-column>
      <el-table-column label="商品名称" width="260" align="center" prop="goodsName">

      </el-table-column>
      <el-table-column label="金额"  align="center" prop="orderState">

      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderState">

      </el-table-column>
      <el-table-column align="center" label="寄件信息" prop="sender">
        <template slot_scope="scope">
          <span class="examine">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发件信息" prop="addresser">
        <template slot_scope="scope">
          <span class="examine" @click="handleAddresser">查看详情</span>
        </template>
      </el-table-column>
     <el-table-column  align="center" label="成交时间" prop="finnshedTime">

      </el-table-column>
    </el-table>
     <!-- 弹框 -->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="发件信息"
      :visible.sync="isShow"
      width="600px"
    >
      <div class="remark">
        <el-form :model="expressage" class="ui-form">
           <p class="information">
             <span>寄件人：</span>
             <span>{{expressage.reciverName}}</span>
           </p>
           <p class="information">
             <span>寄件地址：</span>
             <span>{{expressage.reciverInfo}}</span>
           </p>
           <p style="line-height: 40px;font-size: 18px;">
             <span>物流状态：</span>
             <span></span>
           </p>
        </el-form>
      </div>
    </el-dialog>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'
import {
  getMerchantOrder,
  getOrders,
} from "@/api/level3Linkage.js";

export default {
  name: 'subscribe',
  components:{
      pagination
  },
  data() {
    return {
      isShow:false,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      tableData:[],
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      queryData:{},
      //下拉框
      fixOrderListPara:{
          status:'',
          technicianId:'',
      },
      //下拉列表
     orderConditionText:{
          statusList:[],
          technicianList:[],
      },
      //发件弹框
      expressage:{

      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    //table序号
    indexMethod(index) {
      return ++index * 1;
    },

  fetchData() {
     this.loading = true;
       getMerchantOrder({ storeId: 3, orderState: 30 })
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
            // this.fixOrderTotal = res.data.data.total;
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

    //年月日时间
    changeStartTime() {

    },

    //查询按钮
    handleInquire() {

    },
    //重置按钮
    handleReset() {
       
    },

    //发件信息弹框
    handleAddresser() {
       this.isShow = true
       getOrders({orderId:16}).then((res)=>{
            this.expressage = res.data
       })
    },

  }
}
</script>

<style lang="scss" scoped>
 .examine {
   color: #FF6464;
   cursor: pointer;
 }
 //弹框
  .remark {
   margin-top: -30px;
 }
 .information {
   font-size: 16px;
 }
</style>

