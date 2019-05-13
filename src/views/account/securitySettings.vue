<template>
    <div>
       <div class="safety">
           <h3>您的基础信息</h3>
            <div class="basis">
                <p>
                    <span style=" margin-right:40px;">会员名</span>
                    <span>allenwang2012007</span>
                </p>

                 <p>
                    <span style=" margin-right:25px;">绑定手机</span>
                    <span>18870571887</span>
                    <span style=" margin-left:85px;color:red;cursor: pointer;">修改手机</span>
                </p>

                <p>(该手机仅用户身份验证,不用于账号登录,请点击开启手机按钮)</p>
            </div>
            
           <span class="transverse"></span>

           <div class="serve" style=" margin-top:50px;">
                <h3>您的安全服务</h3>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
  .safety {
      margin-left: 30px;
  }
  .transverse {
      width: 600px;
      height: 1px;
      display: block;
      background-color: gainsboro;
      margin-left: 10px;
      line-height: 40px;
  }

  .basis {
      margin-left: 20px;
      span {
          line-height: 40px;
      }
  }
</style>
