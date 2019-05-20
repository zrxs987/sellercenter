<template>
  <div class="app-container">

           <el-table
            v-loading="loading"
            style="width: 100%;"
            :header-cell-style="{background:'#dee1e6'}" 
            element-loading-text="拼命加载中"
            border
            fit 
            :data='tableData' 
            >
            <el-table-column type="index"  :index="indexMethod" align="center" label="序号" width="50"> </el-table-column>
            <el-table-column prop="orderSn" align="center" label="订单编号" width="200"></el-table-column>
            <el-table-column prop="buyerName" align="center" label="收款人" ></el-table-column>
            <el-table-column prop="goodsName" align="center" label="商品名称" width="260"></el-table-column>
            <el-table-column prop="goodsAmount" align="center" label="金额"  width="110"></el-table-column>

             <el-table-column align="center" label="订单状态" prop="orderState">
              <template slot-scope="scope" >
                <span  v-if="scope.row.orderState == 0" >已取消</span>
                <span  v-if="scope.row.orderState == 10" >未付款</span>
                <span  v-if="scope.row.orderState == 20" >已付款</span>
                <span  v-if="scope.row.orderState == 30" >已发货</span>
                <span  v-if="scope.row.orderState == 40" >已收货</span>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="alipay" align="center" label="支付状态"></el-table-column>
            <el-table-column prop="deliverGoods" align="center" label="发货状态"></el-table-column> -->
            <el-table-column prop="paymentCode" align="center" label="支付方式"></el-table-column>
            <!-- <el-table-column prop="distribution" align="center" label="配送方式" ></el-table-column> -->
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
import {getBusinessState,getDelete} from '@/api/classify'
import pagination from '@/components/Pagination/index'

export default {
  name: 'blanketOrder',
  components:{
      pagination
  },
  data() {
    return {
      tableData: null,
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
    getBusinessState({ storeId: 3, orderState: 40 })
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

  //删除
handleDelete( row ) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deleteData(row.orderSn)
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
deleteData(orderSn){
  getDelete({orderSn}).then(()=>{

  })
},


  }
}
</script>
