<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="12">
                 <span>收件地址：</span>
                 <span class="default">{{location}}&nbsp;&nbsp;&nbsp;</span>
                 <!-- <span class="default">张小姐&nbsp;&nbsp;</span>
                 <span class="default">18012345678&nbsp;&nbsp;</span> -->
                 <span class="location">默认地址&nbsp;&nbsp;</span>
                 <span class="location">新增地址&nbsp;&nbsp;</span>
            </el-col>

             <el-col :span="3">
                 <span>快递公司：</span>
                 <span class="default">{{expressage}}</span>
            </el-col>

               <div class="btnClick">
                <el-button type="primary"  @click="handleSubscribe">一键预约</el-button>
              </div>
            </el-form>
        </el-row>
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
      <el-table-column type="selection" align="center"/>
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" width="240" label="订单编号" prop="orderSn">
      </el-table-column>
      <el-table-column  align="center" width="260" label="商品名称" prop="goodsName">
      </el-table-column>
      <el-table-column   align="center" label="金额" prop="orderState">
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderState">
      </el-table-column>
      <el-table-column align="center" label="支付状态">
        <template slot_scope="scope">
          <span>已支付</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态" >
        <template slot_scope="scope">
          <span>待发货</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" prop="paymentCode">
      </el-table-column>
     <el-table-column align="center" label="成交时间" prop="finnshedTime">
      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'
import {
  getMerchantOrder,
} from "@/api/level3Linkage.js";

export default {
  name: 'booking',
  components:{
      pagination
  },
  data() {
    return {
      tableData:[],
      listLoading: true,
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      location:'广东省深圳市南山区泰邦科技大厦503 张小姐 18012345678', 
      expressage:'韵达快递',

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
      getMerchantOrder({ storeId: 3, orderState: 20 })
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
   //表格勾选
    handleSelectionChange( val ) {
       this.tableSelectData = val;
       console.log(this.tableSelectData,'tableSelectData')
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

    //一键预约
    handleSubscribe() {
       
    },
  }
}
</script>


<style>
.default {
    color: gray;
}

.location {
    color: #FF6464;
    cursor: pointer;
}
</style>
