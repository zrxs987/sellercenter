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

           <div class="serve" >
                <h3>您的安全服务</h3>
                 <div class="grade">
                    <span>
                        安全等级：
                    </span>
                    <el-progress :text-inside="true"  color='gold' :stroke-width="18" :percentage="70"></el-progress>
                    <p style=" display: inline-block;margin-left: 20px; ">
                        完成 <span style="color:aqua">密保设置</span>，提升账户安全
                    </p>
                 </div>
                 
                <div class="securityService">
                    <p style="position: relative;">
                        <i class="iconfont icon-duigou"></i> 
                        <span class="already">
                            已完成
                        </span>
                    </p>

                   <h4 class="attestation">
                       身份认证
                   </h4>
                   <span class="character" >
                      用于提升账号的安全性和信任级别，认证后的有卖家记录的账号不能修改认证信息。
                   </span>
                   <span class="examine">
                       查看
                   </span>
                </div>

                <span class="transverse"></span>

                <div class="securityService">
                 <p style="position: relative;">
                   <i class="iconfont icon-duigou"></i> 
                   <span class="already">
                       已设置
                   </span>
                </p>
                   <h4 class="attestation">
                       登录密码
                   </h4>
                   <span class="character" >
                      安全性高的密码可以使账号更安全，建议您定期更换密码，切设置一个包含数字和字母，并长度超过6位的密码
                   </span>
                   <span class="examine">
                       查看
                   </span>
                </div>
                <span class="transverse"></span>
                <div class="securityService">
                 <p style="position: relative;">
                   <i class="iconfont icon-shezhi" style="color:gold"></i> 
                   <span class="already">
                       未设置
                   </span>
                </p>
                   <h4 class="attestation">
                       密保问题
                   </h4>
                   <span class="character" >
                      是您找回密码的方式之一，建议您设置一个容易记住，切最不容易让人获取的问题及答案，更有效保障您密码的安全。
                   </span>
                   <span class="examine">
                       查看
                   </span>
                </div>
                <span class="transverse"></span>
                <div class="securityService">
                 <p style="position: relative;">
                   <i class="iconfont icon-duigou"></i> 
                   <span class="already">
                       已绑定
                   </span>
                </p>
                   <h4 class="attestation">
                       绑定手机
                   </h4>
                   <span class="character" >
                      绑定手机后，您即可享受云端丰富的手机服务，如手机找回密码等。
                   </span>
                   <span class="examine">
                       查看 
                   </span>
                   
                </div>
                <span class="transverse"></span>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            progressWidth:'100PX',
        }
    }
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
      margin-left: 80px;
      span {
          line-height: 40px;
      }
  }

.serve {
    overflow: hidden;
    // margin-left: 30px;
  .securityService {
      width: 50%;
      height: 100px;
      display:flex;
      justify-content:center;
      
  }

  .already {
      line-height: 100px;
      margin-left: 20px;

  }
  .attestation {
    margin-left: 30px;
    display: inline;
    line-height: 50px;
  }
  .character {
      display: inline-block;
      width: 55%;
      margin-left: 30px;
      padding-top: 30px;
  }
  .examine {
      color: red;
      cursor: pointer;
      margin-left: 20px;
      margin-top: 30px;
  }
  .iconfont {
      font-size: 16px;
      color: green;
      left: 50%;
      position: absolute;
  }
  .grade {
      margin-left: 80px;
      width: 100%;
     /deep/.el-progress {
      width: 20%;
      display: inline-block;
    }
  }

}
</style>
