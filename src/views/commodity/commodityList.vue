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
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}" 
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"/>
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
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

  <!-- 弹框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="500px" @close="handleCloseSystemInfo">

      <el-form :model="CommoditiesEditor" :rules="CommoditiesEditorRule" ref="CommoditiesEditor" :label-width="formLabelWidth">
        <el-form-item label="快递编号" prop="headlines" >
          <el-input  v-model="CommoditiesEditor.headlines" style="width:300px;" placeholder="请输入快递编号" clearable></el-input>
        </el-form-item> 
        <div  class="dialog-footer">
            <el-button type="primary" @click="handleModifyPwd()">提交</el-button>
        </div> 
       </el-form>
    </el-dialog>

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
      dialogFormVisible:false,
      formLabelWidth: "100px",
      tableData: null,
      tableSelectData:[],
      loading:false,
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
    //弹框规则
    CommoditiesEditorRule: {
      headlines: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
         ],
        },
      CommoditiesEditor:{
         headlines:'',
      },

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

  //table序号
  indexMethod(index) {
      return ++index * 1;
  },

  //表格勾选
  handleSelectionChange( row ) {
    this.tableSelectData = row;
    //     let idArr = [];
    //     this.tableSelectData.forEach(item => {
    //         idArr.push(item.orderId)
    //     });
    // this.orderIdId = idArr.join(',')
  },

  //查询按钮
  handleInquire() {
      if (!this.tableSelectData.length) {
        this.$message.warning("请先勾选数据！");
        return;
    }
  },

  //编辑
  handleCompile() {
    this.dialogFormVisible = true
  },

   //提交
  handleModifyPwd( ) {
     this.$refs.CommoditiesEditor.validate(res => {
        if (res) {
           
        }
     })
  },

  // 弹框关闭
  handleCloseSystemInfo() {
        this.$refs.CommoditiesEditor.resetFields();
        this.CommoditiesEditor = {}
  },

  //重置按钮
  handleReset() {
     this.commodity = {}
  },

  }
}
</script>
