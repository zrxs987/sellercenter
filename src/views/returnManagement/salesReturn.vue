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
      fit
      :header-cell-style="{background:'#dee1e6'}" 
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" label="订单编号" prop="orderSn">
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="goodsName">
      </el-table-column>
      <el-table-column label="金额"  align="center" prop="goodsAmount">
      </el-table-column>
     <el-table-column align="center" label="成交时间" prop="addTime">
      </el-table-column>
     <el-table-column align="center" label="快递信息">
        <template slot-scope="scope">  
          <span class="examine" @click="handleExchangeGoods(scope.row)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import { getReturnManagementList } from '@/api/returnManagement'
import pagination from '@/components/Pagination/index'

export default {
  name: 'salesReturn',
  components:{
      pagination
  },
  data() {
    return {
        tableData:[ ],
        listLoading: true,
        multipleSelection: [],
        downloadLoading: false,
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
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
     fetchData() {
      this.loading = true;
       getReturnManagementList({ storeId: 3, orderGoodsRefundStatus: 2 }) // this.$store.state.user.storeId
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

    handleSelectionChange(val) {
      this.multipleSelection = val
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
    // //查询按钮
    // handleInquire() {

    // },
    // //重置按钮
    // handleReset() {
       
    // },
    //快递信息
    handleExchangeGoods( ) {
       this.isShowBarter = true
    },

  }
}
</script>


<style scoped lang="scss">

</style>