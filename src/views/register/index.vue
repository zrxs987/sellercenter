<template>
  <div class="register-container">
     <el-dialog
      class="ui-layout_edit-dialog"
      title="购买协议"
      :visible.sync="isShow"
      width="80%"
      @close="handlePurchase"
    >
      <div class="remark">
          <span>
              <p>在您使用本网站前请认真阅读以下内容；如果您对这份说明没有异议，则可以继续使用本网站的服务；您通过任何途径或方式使用本网站的服务（无论该服务是否收费）的行为，均会被认为是对本说明的认可。
              </p>
              <p>一、本居家用腹膜透析网站的医院端，均是**县人民医院、**市中心医院、**省人民医院或**大学第*附属医院等国内具有医疗资质的各级医院相关联科室，例如肾内科或内分泌科室等。
              </p><p>二、医院端能在本网站拍摄视频、编写告示板和答题卡并自行上传，内容用于所下辖腹膜透析用户的管理工作，并同时已授权本网站独家使用，如其他人转载需取得医院端和本网站的同意。
              </p><p>三、医疗单位对所辖腹膜透析用户的处方和教学示范等内容的编写需文者自负，本网站不负责解答居家腹透知识、判读各种数据，也不向用户销售任何药品和推送保健知识，用户有治疗、护理或处方药品等方面的问题，请直接与所属医院端联系。
              </p><p>四、如果发现医院端的图片、视频、宣传展板等文件有侵权行为请直接与医院端联系，同时用电子邮件通知我们，本网站只对医院端负有告知和督促删除责任，不对侵权等造成的经济损失负责，亦不负任何法律责任。
              </p><p>五、医院端需要在网站上传《中华人民共和国医疗机构执业证》或科室及人员联系方式，对登记在本院的腹膜透析个人信息负有保密责任。
              </p><p>六、用户在医院端注册时提供的一些个人资料，本网站不会将任何资料以任何方式泄露给任何一方；但医院端或用户将密码告知他人或与他人共享注册账户，由此导致的任何资料泄露，本网站不负责任。
              </p><p>七、如出现网络黑客对本网站进行攻击、盗取资料的情况，网站承诺及时安排技术人员处理并抢救用户信息，但用户被黑客盗取资料造成的损失，本网站不承担责任。若因线路及非本网站控制范围外的硬件故障或其</p><p>它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。
              </p><p>八、当政府部门、司法机关等依照法定程序要求本网站披露资料时，或者医院端需要用户数据做临床研究时，本网站将根据执法单位和医院端之要求，为社会安全和公共健康等目的提供的资料，本网站均免责。
              </p><p>九、本网站软件使用费叁万元/年，由于欠费所发生的一切问题与北京华康智信科技有限公司无关。
              </p><p>十、所有登陆网站者必须遵守国家法律、法规的规定，本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准，最终解释权归北京华康智信科技有限公司所有。
              </p>
                <p style='float: right;margin-bottom: 20px;'> 北京华康智信科技有限公司。客服邮箱huakangzhixin@126.com。</p>
          </span>
      </div>
    </el-dialog>

    <div class="forget">
      <el-form  :model="reset"  label-width="80px">
         <div class="title-container">
            <h1 class="title">注册</h1>
          </div>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="reset.userName" @blur="nameReg"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" v-model="reset.phoneNumber" @blur="mobileReg"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="ui-verification" placeholder="请输入验证码" v-model="reset.verificationCode"></el-input>
          <span class="code" @click="getcode">{{codeTxt}}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="reset.password" :type="passwordType" @blur="passReg" ></el-input>
        </el-form-item>
        <el-form-item class="shoppingMall">
          <el-checkbox v-model="reset.checked">同意云端商城的</el-checkbox>
          <span class="purchase"  style="color: #dc0203;cursor:pointer;" @click="handlePurchaseInfo()">《购买协议》</span> 
          <router-link to='./login'>
            <span style=" font-size: 16px;;color: #fff;margin-left: 30px;">返回登录</span>
           </router-link>
        </el-form-item>

            <el-button  type="primary" style="width:80%;margin-bottom:30px;margin-left: 80px;" @click="handleRegister">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register} from '@/api/register'

export default {
  name: 'register',
  data() {
    return {
      isShow:false,
      reset: {
        userName: '',
        phoneNumber: '',
        verificationCode: '',
        password: '',
        checked:true,
      },
      codeTxt: '获取验证码',
      codeSwitch: true,//验证码开关
      passwordType: 'password', 
    }
  },
  methods: {
        //用户名验证
        nameReg() {
            if (this.reset.userName === "") {
                 this.$message({
                 message: "用户名不能为空",
                 type: 'error',
                 duration: 1500
             })
           }  
        },
      //手机号验证
          mobileReg () {
            const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
              if (this.reset.phoneNumber === "") {
              this.$message({
                      message: '手机号码不能为空',
                      type : 'error',
                      duration: 1500
                  })
              }else if (!reg.test(this.reset.phoneNumber)) {
              this.$message({
                      message: '请输入正确的手机号码',
                      type:'error',
                      duration: 1500
                  })
              }
          },
        //密码验证
		  	 passReg() {
            	   if (this.reset.password === "") {
            		  this.$message({
					    	message: "密码不能为空",
					    	type: 'error',
						    duration: 1500
                      })
                   }else if (this.reset.password.length < 6) {
                this.$message({
                message: "密码不能低于六位",
                type: 'error',
                duration: 1500
              })
            }
          },
        //获取验证码
        async getcode () {
        //   if (this.reset.mobile === '') {
        //     this.$message({
        //             message: '请输入手机号',
        //             type: 'error',
        //             duration: 1500
        //         })
        //     } else if (this.codeSwitch) {
        //     this.codeSwitch = false
        //         this.codeTxt = "获取中"
        //         this.codeinfo = await Getcode(this.mobile)
        //         if (this.codeinfo.status !== 1) {
        //       this.$message({
        //                 message: this.codeinfo.message,
        //                 type: 'error',
        //                 duration: 1500
        //             })
        //     this.codeSwitch = true
        //     this.codeTxt = "获取验证码"
        //             } else {
        //     this.$message({
        //       message: this.codeinfo.message,
        //       type: 'success',
        //       duration: 1500
        //     })
        //     let num = 60;
        //       let timer = setInterval(() => {
        //         num--
        //         this.codeTxt = num
        //         if ( num<=0 ) {
        //           this.codeTxt = "获取验证码"
        //           clearInterval(timer);
        //           this.codeSwitch = true
        //         }
        //      },1000)
        //     }
        //   }
        },
    //点击注册
    handleRegister( ) {
          if(!this.reset.checked){
                  this.$message({
              message: '请先勾选',
              type: 'error',
              duration: 1500
          }) 
        }else{
            let obj ={
              memberName:this.reset.userName,
              memberMobile:this.reset.phoneNumber,
              memberPasswd:this.reset.password,
              memberEmail:this.reset.verificationCode,
          }
          register(obj).then(res=>{
        
          if(res.code ==='200'){
              this.$message({
                message: '注册成功',
                type:'success',
                duration: 1500
            })
             setTimeout(() => {
               this.$router.push('./login');
            }, 1000)          
           }else{
              this.$message({
                message: res.errorMsg,
                type: 'error',
                duration: 5 * 1000
              })
           }
         }) .catch(() => {
      })
     }
    },
    //点击购买协议
    handlePurchaseInfo() {
        this.isShow = true;
    },
    //关闭弹窗
    handlePurchase() {
        this.isShow = false;
    },
  }
};

</script>

<style lang="scss">

.register-container {
  background: url('../../styles/img/bgc.png.jpg');
}
</style>

<style lang="scss" scoped>

.register-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

.forget {
  width: 400px;
  margin: 100px auto;
}

.loginbtn {
  margin-left: 120px;
}

.ui-verification {
  width: 190px;
}

.btn-verification {
  margin-left: 10px;
}
.label {
  font-size: 28px;
}
.shoppingMall {
    margin-top: 20px;
}
.el-checkbox {
  margin-right: 0px;
}
.remark {
  margin-bottom: 50px;
}

.title-container {
    position: relative;
    padding-left: 40px;
    .title {
      font-size: 32px;
      color: #409eff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.code {
  width: 120px;
  height: 40px;
  display:inline-block;
  background-color: #409eff;
  border-radius: 3px;
  color: aliceblue;
  font-size: 16px;
  padding-left: 20px;
  
}

</style>
