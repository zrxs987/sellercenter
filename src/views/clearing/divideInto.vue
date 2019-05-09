<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
               <el-col :span="6"  >
                 <span>结算时间：</span>
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
      style="width: 100%;" 
    >
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="分红金额"  align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="平台抽成金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column  label="商家货款金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
    </el-table>
     <pagination :total='50'/>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import pagination from '@/components/Pagination/index'

export default {
  name: 'dividelito',
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
