<template>
  <div>
    <progressBar :atPresent='3'/>
    <div class="setUpShop" v-show="isShow">
      <!-- form提交表单 -->
      <el-form :model="setUpShop" label-width="80px">
        <div class="upload-box">
          <el-form-item label v-for="item in setUpShopList" :key="item.id">
            <span class="upload-img">{{item.remark}}</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
        </div>
           <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">取消</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
      </el-form>
    </div>

    <div class="audit-box" v-show="isSucceedShow">
      <div class="shopSuccessfully">
        <i class="iconfont icon-shenhe"></i>
        <p>审核中</p>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from "@/components/publicMethod/progressBar";
import upload from "@/components/publicMethod/upload";
import { getOrderId,getAptitude } from "@/api/openShop";


export default {
  name:'foodCategory',
  components: {
    progressBar,
    upload
  },
  data() {
    return {
      isShow: true,
      isSucceedShow: false,
      // 申请开店定义
      setUpShop: {
          uploading:'',
      },
      setUpShopList: [],
      uploadArr:[],
         
    };
  },
  created() {
      this._getOrderId()
  },
  methods: {
    bankImgonSuccess( key ) {

       this.uploadArr.push( key )
 
    },

    //提交按钮
    handleSubmit() {

      let obj = {
          scId:this.$route.query.scId,
          foodProductionLicense:this.uploadArr,
      }

      getAptitude(obj).then((res)=>{
         if(res.code ==='200'){
                this.isShow = false;
                this.isSucceedShow = true;

               setTimeout(() => {
                  this.$router.push({path:'./contract'});
              },2000)
          }else{
               this.$message({
                message: res.errorMsg,
                type: 'error',
                duration: 5 * 1000
              })
            }
      })

    },
    // 取消按钮
    handleCancel() {

    },

    //根据类型查询资质
    _getOrderId () {
        var scID = this.$route.query.scId

       getOrderId({classId:scID}).then((res)=>{
            
            this.setUpShopList = res.data
       })
    }
  },
};
</script>

<style scoped lang="scss">

.upload-img {
  margin-left: -80px;
  margin-top: 80px;
  line-height: 40px;
}
.upload-box {
    margin-left: 100px;
    
}
.el-form-item {
  width: 250px;

}
.buttonBtn {
  margin-left: 270px;
}

//审核
.audit-box {
  width: 400px;
  margin: 100px auto;
  text-align: center;
  /deep/.iconfont {
    font-size: 50px !important;
    color: #dc0203;
    margin-left: -5px;
  }
  p {
    font-size: 22px;
    line-height: 50px;
  }
}
</style>

