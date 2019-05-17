<template>
  <div class="app-container">
 <div class="filter-container">
      <!-- <el-row >
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
                <span>收货人：</span>
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
                <el-button type="primary"   @click="handleReset">重置</el-button>
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
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
    >
       <el-table-column type="index"  :index="indexMethod" align="center" label="序号" width="50"> </el-table-column>
      <el-table-column align="center" label="订单编号" width="260" prop="orderSn">
      </el-table-column>
      <el-table-column label="收货人" align="center" prop="buyerName">
      </el-table-column>
      <el-table-column label="商品名称" width="220" align="center" prop="goodsName">
      </el-table-column>
      <el-table-column label="金额"  align="center" prop="goodsAmount">
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderState">
      </el-table-column>
      <!-- <el-table-column align="center" label="发货状态">
      </el-table-column>
      <el-table-column align="center" label="配送状态" >
      </el-table-column> -->
      <el-table-column align="center" label="结算状态" >
          <template slot_scope="scope">
            <span>未结算</span>
          </template>
      </el-table-column>
       <el-table-column align="center" label="成交时间" prop="finnshedTime">

      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line"  @click="handleDelete(scope.row)" >删除</span>
        </template>
      </el-table-column>
    </el-table>
     <pagination :total='50'/>
  </div>
</template>

<script>
import { getClearingList } from "@/api/clearing";
import pagination from '@/components/Pagination/index'

export default {
  name: 'openAccount',
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
    this.fetchData()
  },
  methods: {
    fetchData() {
          getClearingList({storeId:3,settlementStatus:1}).then((res)=>{
             
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

   //table序号
  indexMethod(index) {
    return ++index * 1;
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

  }
}
</script>
