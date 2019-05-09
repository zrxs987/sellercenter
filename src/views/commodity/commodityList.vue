<template>
  <div class="app-container">
  <div class="filter-container">
      <el-row >
         <el-form :inline="true"   style="margin-bottom: 1.5%;">
           <el-col :span="6">
            <el-form-item label="商品状态"  :label-width="formLabelWidth">
                <el-select
                    size="medium"
                    placeholder="商品状态"
                    v-model="commodity.state"
                    clearable
                  >
                    <el-option
                      v-for="(label, value) in optionList.state"
                      :key="value"
                      :value="value"
                      :label="label"
                    ></el-option>
                  </el-select>
                </el-form-item>
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
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column align="center" label="商品ID" prop="goodsId">
      </el-table-column>
      <el-table-column  align="center" label="商品名称" prop="goodsName">
      </el-table-column>
      <el-table-column  align="center" label="金额" prop="goodsPrice">
      </el-table-column>
      <el-table-column align="center" label="时间" prop="goodsImage">
      </el-table-column>
      <el-table-column align="center" label="商品状态" prop="storeId">
      </el-table-column>
      <el-table-column align="center" label="操作" prop="">
        <template slot-scope="scope">
           <span style="color:#409eff;cursor:pointer;margin-left: 0;" class="line"  @click="handleCompile(scope.row)" >编辑</span>
        </template>
      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import { getCommodityList } from '@/api/commodity'
import pagination from '@/components/Pagination/index'

export default {
  name: 'commodityList',
  components:{
      pagination
  },
  data() {
    return {
      tableData: null,
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      optionList:{
         state:['已发布','待发布','未发布','已下架'],
      },
      commodity:{
         state:'',
      },
      formLabelWidth:'100px',

    }
  },
created() {
    this.fetchData();
  },
methods: {

 fetchData(){
    this.loading=true;
     getCommodityList({storeId:'1'}).then((res) => {
          if (res.code === '200') {
              this.loading=false;
                this.tableData = res.data;
                //this.fixOrderTotal = res.data.data.total;
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

  //查询按钮
  handleInquire() {

  },

  //重置按钮
  handleReset() {
     this.commodity = {}
  },
  //编辑
  handleCompile() {
    
  },

  }
}
</script>
