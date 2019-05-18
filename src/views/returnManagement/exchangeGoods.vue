<template>
  <div class="app-container">
 <div class="filter-container">
      <!-- <el-row >
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="5">
                <span>订单编号 ：</span>
                 <el-input style="width: 60%;" placeholder="请输入" size="medium" v-model="queryData.sku" clearable></el-input>
            </el-col>
                <div class="btnClick">
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"   @click="handleReset">重置</el-button>
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
      :header-cell-style="{background:'#dee1e6'}"
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" label="订单编号"  prop="orderSn">
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="goodsName">

      </el-table-column>
      <el-table-column label="金额"  align="center" prop="goodsAmount">
    
      </el-table-column>
      <el-table-column align="center" label="时间" prop="addTime">

      </el-table-column>
      <el-table-column align="center" label="快递信息" prop="expressage">
        <template slot-scope="scope">
          <span class="examine" @click="handleExpressage(scope.row)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="换货信息" prop="exchangeGoods">
        <template slot-scope="scope">
          <span class="examine"  @click="handleExchangeGoods(scope.row)">查看详情</span>
        </template>
      </el-table-column>
            <el-table-column align="center" prop="address" label="操作">
                  <template slot-scope="scope">
                         <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line"  @click="handleConsent(scope.row)" >同意</span>
                         <span style="color: #409eff;cursor:pointer;margin-left: 20px;" class="line"  @click="handleDisagree(scope.row)" >不同意</span>
                  </template>
            </el-table-column>
    </el-table>
<!-- 快递信息-->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="快递信息"
      :visible.sync="isShow"
      width="700px"
      @close="handleCloseSystemInfo"
    >
      <div class="remark">
        <el-form :model="expressage"   class="ui-form">
           <p class="information">
             <span>寄件人：</span>
             <span>{{expressage.senders}}</span>
           </p>
           <p class="information">
             <span>寄件地址：</span>
             <span>{{expressage.location}}</span>
           </p>
           <p style="line-height: 40px;font-size: 18px;">
             <span>物流状态：</span>
             <span></span>
           </p>
        </el-form>
      </div>
    </el-dialog>
    <!-- 换货信息-->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="换货信息"
      :visible.sync="isShowBarter"
      width="700px"
      @close="handleCloseSystemInfo"
    >
      <div class="remark">
        <el-form :model="barter" class="ui-form">
           <p class="information">
             <span>换货原因：</span>
             <span>{{barter.cause}}</span>
           </p>
           <p class="information">
             <span>状态：</span>
             <span>{{barter.states}}</span>
           </p>
           <p style="line-height: 40px;font-size: 18px;">
             <span>物流状态：</span>
             <span></span>
           </p>
        </el-form>
      </div>
    </el-dialog>
     <pagination :total='50'/>
  </div>
</template>

<script>
import { getReturnManagementList,getWhetherRefund } from '@/api/returnManagement'
import pagination from '@/components/Pagination/index'

export default {
  name: 'exchangeGoods',
  components:{
      pagination
  },
  data() {
    return {
      tableData:[ ],
      isShow:false,
      isShowBarter:false,
      listLoading: true,
      filename: '',
      quantumTime:'',
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      //快递信息
      expressage:{
         senders:'张三 18012345678',
         location:'广东省深圳市南山区高新园泰邦大厦',
      },
      //换货信息
      barter:{
        cause:'商品拍多了',
        states:'卖家已同意',
      },
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
     fetchData() {
      this.loading = true;
       getReturnManagementList({ storeId:this.$store.state.user.storeId, orderGoodsRefundStatus: 3 }) // this.$store.state.user.storeId
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

    //table序号
    indexMethod(index) {
      return ++index * 1;
    },
    //年月日时间
    changeStartTime() {

    },

    //同意按钮
    handleConsent( row ) {
       getWhetherRefund({recId:row.orderId,orderGoodsRefundSellerStratus:1}).then((res)=>{
             if(res.code === '200'){
                      this.$message({
                    message: '已同意',
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
    },
    
    //不同意
    handleDisagree( row ) {
          getWhetherRefund({recId:row.orderId,orderGoodsRefundSellerStratus:2}).then((res)=>{
          if(res.code === '200'){
                  this.$message({
                message: '已拒绝',
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
    },
    //快递信息
    handleExpressage( ) {
       this.isShow = true
    },
    //换货信息
    handleExchangeGoods( ) {
       this.isShowBarter = true
    },
    //弹框点击
    handleCloseSystemInfo() {
       
    },

  }
}
</script>

<style lang="scss" scoped>

 .remark {
   margin-top: -30px;
 }
 .information {
   font-size: 16px;
 }


</style>
