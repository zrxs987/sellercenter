<template>
  <div class="app-container">
      <div style="overflow: hidden;" >
          <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
                  <el-button  type="primary"  @click="handleReset">添加银行卡</el-button>
          </el-form>
      </div>

    <el-table
       ref="multipleTable"
      :data="tableData"
       element-loading-text="拼命加载中"
       border
       fit
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center"  label="银行名称" prop="orderSn">
      </el-table-column>
      <el-table-column  align="center" label="支行"  prop="goodsName">
      </el-table-column>
      <el-table-column align="center"  label="账号"  prop="orderState">
      </el-table-column>
      <el-table-column align="center" label="户主姓名" prop="orderState">
      </el-table-column>
    </el-table>

     <!-- 弹框 -->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="添加银行卡"
      :visible.sync="isShow"
      width="500px"
      @close="handleCloseSystemInfo"
    >
      <div class="remark">
        <el-form :model="editData" :rules="editDataRule" ref="editData" class="ui-form">
            <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identityCard">
              <el-input size="small" v-model="editData.identityCard" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="addressName">
              <el-input size="small" v-model="editData.addressName" clearable></el-input>
            </el-form-item>
            <el-form-item label="开户银行" :label-width="formLabelWidth" prop="depositBank">
              <el-input size="small" v-model="editData.depositBank" clearable></el-input>
            </el-form-item>
            <el-form-item label="开户支行" :label-width="formLabelWidth" prop="openingBranch">
              <el-input size="small" v-model="editData.openingBranch" clearable></el-input>
            </el-form-item>
            <div class="footerBtn">
              <el-button size="small" @click="handleCancel()">取消</el-button>
              <el-button size="small" type="primary" @click="handleAffirm()">确认</el-button>
            </div>
        </el-form>
      </div>
    </el-dialog>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'
import {
  getBankList,
  getBankAccount,
} from "@/api/account";

export default {
  name: 'bankAccount',
  components:{
      pagination
  },
  data() {
    return {
      formLabelWidth:'100px',
      isShow:false,
      listLoading: true,
      tableData:[],
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
     editData:{},
     editDataRule:{
         identityCard: [
                  { required: true, message: "身份证", trigger: "blur" },
                  { min: 15, max: 18, message: "长度在 15位数到18位数", trigger: "blur" }
              ],
      addressName: [
                 { required: true, message: "请输入姓名", trigger: "blur" },
                 { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
              ],
     depositBank: [
                { required: true, message: "银行卡", trigger: "blur" },
                { min: 15, max: 19, message: "长度在 15位数到19位数", trigger: "blur" }
             ],
     openingBranch: [
                { required: true, message: "银行卡", trigger: "blur" },
                { min: 15, max: 19, message: "长度在 15位数到19位数", trigger: "blur" }
           ],
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
    //  this.loading = true;
    //    getBankList({ storeId: 3, orderState: 30 })
    //     .then(res => {
    //       if (res.code === "200") {
    //         this.loading = false;
    //         this.tableData = res.data;
    //         // this.fixOrderTotal = res.data.data.total;
    //       } else {
    //         this.$message({
    //           message: res.errorMsg,
    //           type: "error",
    //           duration: 5 * 1000
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    },

    //添加银行卡
    handleReset() {
       this.isShow = true
    },

    //弹框确认
    handleAffirm() {
     this.$refs.editData.validate(res => {
      if (res) {
        let obj = {
            sellerId:this.$store.state.user.sellerId,
            cardNum:this.editData.identityCard,
            openBank:this.editData.depositBank,
            cardName:this.editData.addressName,
            openBranch:this.editData.openingBranch,
        }
        getBankAccount( obj ).then(( res )=>{
            if(res.code == '200') {
                this.$message({
                    message: '添加成功',
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
            }    
        }) 
    },

   // 弹框取消
    handleCancel(){
          this.editData = {}
    },

    //弹框关闭
    handleCloseSystemInfo () {
         this.$refs.editData.resetFields();
         this.editData = {}
    },

  }
}
</script>

<style lang="scss" scoped>

 //弹框
  .remark {
   margin-top: -10px;
 }
 .information {
   font-size: 16px;
 }

 .ui-layout_edit-dialog  {
 /deep/.el-input__inner {
     width:300px;
     height:40px;
   }

/deep/.el-form-item__content{
      width:300px !important;
   }

 .el-dialog__header{
    border-bottom: 1px solid red;
 }

  .footerBtn {
    margin-left:160px;
  }
 }

</style>

