<template>
  <div>
    <div class="setUpShop">
        <!-- form提交表单 -->
        <el-form :model="setUpShop"  label-width="80px">
          <el-form-item label="选择分类">
          <el-select
              size="medium"
              placeholder=""
              v-model="setUpShop.classify"
              clearable
            >
              <el-option
                v-for="(label, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="团购时间">
             <el-date-picker
                style="width: 45%;"
                    v-model="quantumTime"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm"
                    @change="changeStartTime"
                    range-separator=""
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
          <el-form-item label="商品金额" >
            <el-input class="shopInput" placeholder="" v-model="setUpShop.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input class="shopInput" placeholder="" v-model="setUpShop.phoneNumber" clearable></el-input>
          </el-form-item>
            <el-form-item label="类别信息" >
               <el-input type="textarea" class="site" size="medium" :rows="5" resize="none"  v-model="setUpShop.site" ></el-input>
           </el-form-item> 
          <div class="upload-box clearfix">
            <el-form-item label>
              <span class="upload-img">上传商品主图</span>
              <upload :show="false" @on-Success="bankImgonSuccess"/>
            </el-form-item>
            <el-form-item label>
              <span class="upload-img">上传图文详情</span>
              <upload :show="false" @on-Success="bankImgonSuccess"/>
            </el-form-item>
          </div>
          <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">取消</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";

export default {
  name:'purchaseCommodity',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      // 申请开店定义
      setUpShop: {
        userName: "",
        phoneNumber: "",
        WechatID: "",
        site:'',
      },
      quantumTime:'',
      optionList:{

      },
      //申请开店规则
      applyRule: {
        userName: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
          ],
        phoneNumber: [
               {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
              }
         ],
        WechatID: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ]
      }
    };
  },
  methods: {
    bankImgonSuccess() {
        
    },
    // 按钮点击下一步
    handleSubmit() {
     
    },
    //点击取消
    handleCancel() {
        this.setUpShop = {}
    },
    // 时间
    changeStartTime() {

    },
  }
};
</script>


<style lang="scss"  scoped>
.setUpShop {
  width: 800px;
  margin: 50px auto;
}
.el-form {
  margin-left: 50px;
}

.upload-img {
  margin-left: -60px;
  line-height: 40px;
}

.el-steps {
  margin-top: 80px;
}

.buttonBtn {
  margin-left: 150px;
}

.el-select {
    width: 300px;
}
/deep/.el-textarea__inner {
    width: 45% !important;
}
.producingarea {
    width: 98px;
}
</style>
