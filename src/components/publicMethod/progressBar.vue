<template>
  <div>
    <div class="progressBar-box">
      <!-- 步骤栏 -->
      <el-steps :space="340" :active='atPresent' :align-center="true" :center="true">
        <el-step title="上传资料" icon="el-icon-edit">
          <i class="iconfont icon-ziliao" slot="icon"></i>
        </el-step>
        <el-step title="选择产品类型" icon="el-icon-edit">
          <i class="iconfont icon-hezi301" slot="icon"></i>
        </el-step>
        <el-step title="提供厂家资料" icon="el-icon-picture">
          <i class="iconfont icon-shu" slot="icon"></i>
        </el-step>
        <el-step title="审核" icon="el-icon-picture">
          <i class="iconfont icon-shenhe" slot="icon"></i>
        </el-step>
        <el-step title="签合同" icon="el-icon-document">
          <i class="iconfont icon-hetong" slot="icon"></i>
        </el-step>
        <el-step title="开店成功" icon="el-icon-goods">
          <i class="iconfont icon-kaidian" slot="icon"></i>
        </el-step>
        <el-step title="上传产品" icon="el-icon-picture">
          <i class="iconfont icon-shangchuan" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>


<script>
export default {
      props: {
        atPresent: {
           type: Number,
           default: true
         },
     },
};
</script>


<style lang="scss" scoped>

  .progressBar-box {
      margin-top: 80px;
  }

</style>
