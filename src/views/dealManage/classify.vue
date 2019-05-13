<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row >
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
               <el-col :span="6"  >
                 <span>成交时间：</span>
                    <el-date-picker
                        style="width: 60%;"
                        v-model="quantumTime"
                        type="daterange"
                        value-format="yyyy-MM-dd HH:mm"
                        @change="changeStartTime"
                        range-separator=""
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
               </el-col>
             <el-col :span="5">
                <span>商品名称：</span>
                <el-select filterable style="width:60%;" placeholder="请选择"  v-model="fixOrderListPara.status" >
                  <el-option v-for="item in orderConditionText.statusList" :key="item.statusId" :label="item.statusText" :value="item.statusId"></el-option>
                </el-select>
            </el-col>
              <el-col :span="5">
                 <span>售后服务：</span>
                <el-select filterable style="width: 60%;" placeholder="请选择"  v-model="fixOrderListPara.technicianId">
                  <el-option   v-for="item in orderConditionText.technicianList" :key="item.technicianId" :label="item.technicianName" :value="item.technicianId"></el-option>
                </el-select>
               </el-col>
              <div class="btnClick">
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"   @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleDownload">导出</el-button>
              </div>          
            </el-form>
        </el-row>
        <div class="classify">
             <ul>
               <li :class="{active:shows==1}" @click="handleMarch">最近三月订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==2}" @click="handleObligation">待付款订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==3}" @click="handleSendGoods">待发货订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==4}" @click="handleAlready">已发货订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==5}" @click="handleRefund">退款中订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==6}" @click="handleExchangeGoods">换货订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==7}" @click="handleEvaluate">待评价订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==8}" @click="handleAccomplish">完成订单</li>
               <span class="longString"></span>
               <li :class="{active:shows==9}" @click="handleClose">关闭订单</li>
             </ul>
        </div>
    </div>

   <div class="el-table-box">
           <el-table v-loading="loading"
            style="width: 100%;"
            :header-cell-style="{background:'#dee1e6'}" 
            element-loading-text="拼命加载中"
            border
            fit 
            :data='tableData' 
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column type="index"  :index="indexMethod" align="center" label="序号" width="50"> </el-table-column>
            <el-table-column prop="orderSn" align="center" label="订单编号" width="200"></el-table-column>
            <el-table-column prop="buyerName" align="center" label="收款人" ></el-table-column>
            <el-table-column prop="goodsName" align="center" label="商品名称" width="260"></el-table-column>
            <el-table-column prop="goodsAmount" align="center" label="金额"  width="110"></el-table-column>
            <el-table-column prop="orderState" align="center" label="订单状态" ></el-table-column>
            <el-table-column prop="alipay" align="center" label="支付状态"></el-table-column>
            <el-table-column prop="deliverGoods" align="center" label="发货状态"></el-table-column>
            <el-table-column prop="paymentCode" align="center" label="支付方式"></el-table-column>
            <el-table-column prop="distribution" align="center" label="配送方式" ></el-table-column>
            <el-table-column prop="finnshedTime" align="center" label="成交时间"></el-table-column>
            <el-table-column prop="address" align="center" label="操作">
                  <template slot-scope="scope">
                         <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line" @click="handleDelete(scope.row)" >删除</span>
                  </template>
            </el-table-column>
          </el-table>
          <pagination :current-page="fixOrderListPara.page+1" :total="50" :page-sizes="[10,20,30,50]" 
          :page-size="fixOrderListPara.limit" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" />
        </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import {getEvaluate,getRecentlyTrimester} from '@/api/classify'
import {getReturnManagementList} from '@/api/returnManagement'
// import {getMerchantOrder} from '@/api/returnManagement'

export default {
  // name: 'classify',
  	components:{
			pagination
		},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: '',
        commodity: '',
        type:'',
        sort: '+id'
      },
      downloadLoading: false,
      quantumTime:'',
      tableData:[],
      fixOrderTotal:null,
      orderConditionText:{
        statusList:[],
        technicianList:[],
      },
      fixOrderListPara:{
        limit:10,
        page:0,
        total:0,
      },
      loading:false,
    }
  },
  created(){
      this.handleMarch()
  },

  methods:{
      //table序号
      indexMethod(index) {
          return ++index * 1;
        },
      //查询按钮
      handleInquire() {

      },
      //重置按钮
      handleReset() {
       
      },
      //分页
      handleSizeChange() {

      },
      //分页
      handleCurrentChange( ) {

      },
      // 获取时间
      changeStartTime( ) {

      },
      // 获取勾选框的值
      handleSelectionChange(val) {
      this.multipleSelection = val
 
    },
  //删除
  handleDelete( row ) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    
  // 导出按钮
  handleDownload() {
    if (this.multipleSelection.length) {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename
        })
        this.$refs.multipleTable.clearSelection()
        this.downloadLoading = false
      })
    } else {
      this.$message({
        message: '请至少选择一项',
        type: 'warning'
      })
    }
  },

  //最近三月
  handleMarch() {
      this.shows = 1;
      this.loading=true;
      getRecentlyTrimester({storeId:64}).then((res)=>{
          if (res.code === '200') {
                this.loading=false;
                  res.data = res.data.map( item => {
                  return {
                    ...item,
                    goodsName: item.orderGoodsList.length == 0 ? '' : item.orderGoodsList[0].goodsName
                    
                  }
                })
              this.tableData = res.data;
              // this.fixOrderTotal = res.data.data.total;
        }else{
            this.$message({
              message: res.errorMsg,
              type: 'error',
              duration: 5 * 1000
            })
          }
      }).catch(err => {
        console.log(err);
      });
  },

  //待付款订单
  handleObligation() {
    this.shows = 2;
    this.tableData = [];
  },

  //待发货订单
  handleSendGoods () {
    this.shows = 3;
    this.tableData = [];
  },

  //已发货订单
  handleAlready () {
    this.shows = 4;
    this.tableData = [];
  },

  //退款中订单
  handleRefund () {
      this.shows = 5;
      this.loading = true;
      getReturnManagementList({ storeId:3, orderGoodsRefundStatus: 2 })
      .then(res => {
          if (res.code === "200") {
          this.loading = false;
          res.data = res.data.map(item =>{
            return {
                ...item,
                addTime: item.orders.addTime,
                goodsAmount: item.orders.goodsAmount,
                orderSn: item.orders.orderSn,
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

  //换货订单
  handleExchangeGoods () {
      this.shows = 6;
      this.loading = true;
      getReturnManagementList({ storeId: 3, orderGoodsRefundStatus: 3 })
      .then(res => {
          if (res.code === "200") {
          this.loading = false;
          res.data = res.data.map(item =>{
            return {
                ...item,
                addTime: item.orders.addTime,
                goodsAmount: item.orders.goodsAmount,
                orderSn: item.orders.orderSn,
            }
            console.log(addTime,'addTime')
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

  //待评价订单
  handleEvaluate() {
    this.shows = 7;
    this.loading=true;
      getEvaluate({storeId:3,evaluationState:1}).then((res)=>{
            if(res.code === '200') {
              this.loading=false;
                res.data = res.data.map( item => {
                  return {
                    ...item,
                    goodsName: item.orderGoodsList.length == 0 ? '' : item.orderGoodsList[0].goodsName
                    
                  }
                })
                this.tableData = res.data;
            }else{
            this.$message({
              message: res.errorMsg,
              type: 'error',
              duration: 5 * 1000
            })
          }
      })
  },

    //完成订单
    handleAccomplish () {
       this.shows = 8;
       this.tableData = [];
    },

    //关闭订单
    handleClose () {
       this.shows = 9;
       this.tableData = [];
    },
  },

}
</script>

<style lang="scss" scoped>

.app-container {
  min-height: 100%;
  width: 100%;
 }
  .el-table-box {
    margin-top: 10px;
  }

  .classify {
    ul{
      li{
        list-style: none;
        float: left;
        margin-left: 30px;
        line-height: 60px;
        color: gray;
      }
      li:hover{
        color: red;
        cursor:pointer;
      }
      .longString{
        height: 20px;
        background-color: gainsboro;
        width: 2px;
        float: left;
        margin-top: 20px;
        margin-left: 20px;
      }
      .active {
         color: red;
         font-weight: bold;
      }
    }
  }

</style>

