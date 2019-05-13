<template>
  <div>
    <!-- 步骤栏 -->
    <progressBar :atPresent="6"/>
    <!-- 开店成功 -->
    <div class="audit-box">
      <div class="shopSuccessfully">
        <i class="iconfont icon-kaidian"></i>
        <p>开店成功</p>
        <el-button class="addition" round @click="getaddShop">添加店铺</el-button>
      </div>
    </div>
    <!-- 申请开店 -->
    <el-dialog title="申请开店" :visible.sync="dialogFormVisible" width="23%" @close="handleCloseSystemInfo">

      <el-form :model="formProduct" :rules="formProductRule" ref="formProduct" :label-width="formLabelWidth">
        <el-form-item label="店铺名称" prop="headlines" >
          <el-input  v-model="formProduct.headlines" placeholder="请输入店铺名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="会员名" prop="price">
          <el-input  v-model="formProduct.price" placeholder="请输入会员名" clearable></el-input>
        </el-form-item>

        <el-form-item label="商家名称" prop="integral">
          <el-input  v-model="formProduct.integral" placeholder="请输入商家名" clearable></el-input>
        </el-form-item>
        </el-form>
      <div  class="dialog-footer">
        <el-button type="primary" @click="handleModifyPwd()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import progressBar from "@/components/publicMethod/progressBar";
import { getaddShopsInfo,getStoreId } from "@/api/openShop";

export default {
  name:'shopSucceed',
  components: {
    progressBar
  },
  data() {
    return {
        dialogFormVisible:false,
        formLabelWidth: "80px",
        //上传产品定义
        formProduct: {
            headlines: "",
            price: "",
            integral: ""
        },

       //弹框规则
    formProductRule: {
      headlines: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      price: [
              {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
     integral: [
             {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        }
     }
   },
  methods: {
    
    //添加商品
  getaddShop() {
       this.dialogFormVisible = true
    },

    // 提交按钮
  handleModifyPwd() {
     this.$refs.formProduct.validate(res => {
        if (res) {
            let obj = {
              storeName: this.formProduct.headlines,
              memberName: this.formProduct.price,
              sellerName: this.formProduct.integral,
              memberId: this.$store.state.user.sellerId 
            }
            getaddShopsInfo(obj).then((res)=>{
                if(res.code === '200'){
                      this.storeId()
                      this.$message({
                    message: res.errorMsg,
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
            this.dialogFormVisible = false
             }    
          }) 
       },

    // 弹框关闭
    handleCloseSystemInfo() {
         this.$refs.formProduct.resetFields();
         this.formProduct = {}
    },

    //获取storeId
    storeId() {
        getStoreId().then((res)=>{
        console.log(res,'res')
      })
    },

  }
};
</script>

<style lang="scss" scoped>

//审核
.audit-box {
  width: 400px;
  height: 400px;
  margin: 100px auto;
  text-align: center;
  /deep/.iconfont {
    font-size: 50px !important;
    color: #dc0203;
    margin-left: -5px;
  }
  p {
    font-size: 22px;
    line-height: 30px;
  }
  .addition {
    margin-left: 0px;
    background-color: #fce8e8 !important;
    color: #dc0203;
  }
}
.dialog-footer{
    text-align: center;
    margin-left: -10px;
    margin-top: 50px;
}

</style>
