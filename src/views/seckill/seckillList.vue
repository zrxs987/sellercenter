<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
             <el-col :span="5">
                <span>商品状态 ：</span>
                 <el-input style="width: 60%;" placeholder="请输入" size="medium" v-model="queryData.sku" clearable></el-input>
            </el-col>
                <div class="btnClick">
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"   @click="handleReset">重置</el-button>
              </div>
            </el-form>
        </el-row>
    </div>
    
           <el-table v-loading="loading"
            style="width: 100%;"
            :header-cell-style="{background:'#dee1e6'}" 
            element-loading-text="拼命加载中"
            border
            fit 
            :data='tableData' >
            <el-table-column type="selection" align="center" />
            <el-table-column type="index"  :index="indexMethod" align="center" label="序号" width="50"> </el-table-column>
            <el-table-column prop="orderSn" align="center" label="订单编号" width="200"></el-table-column>
            <el-table-column prop="goodsName" align="center" label="商品名称" width="260"></el-table-column>
            <el-table-column prop="goodsAmount" align="center" label="金额"  width="110"></el-table-column>
            <el-table-column prop="orderState" align="center" label="订单状态" ></el-table-column>
            <el-table-column prop="paymentCode" align="center" label="支付方式"></el-table-column>
            <el-table-column prop="finnshedTime" align="center" label="成交时间"></el-table-column>
            <el-table-column prop="address" align="center" label="操作">
                  <template slot-scope="scope">
                         <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line" @click="handleDelete(scope.row)" >删除</span>
                  </template>
            </el-table-column>
          </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import { getSeckillList } from '@/api/seckill/index'
import pagination from '@/components/Pagination/index'

export default {
  name: 'seckillList',
  components:{
      pagination
  },
  data() {
    return {
      tableData: null,
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
      getSeckillList({ storeId: this.$store.state.user.storeId, goodsPromotionType: 20 })
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

   //删除
   handleDelete() {

   },
  }
}
</script>

<style lang="scss" scoped>
</style>