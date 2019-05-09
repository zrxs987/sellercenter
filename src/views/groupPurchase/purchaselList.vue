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
                <el-button type="primary"   @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleInquire">查询</el-button>
              </div>
            </el-form>
        </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品状态">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import pagination from '@/components/Pagination/index'

export default {
  name: 'purchaselList',
  components:{
      pagination
  },
  data() {
    return {
      list: null,
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

  }
}
</script>

