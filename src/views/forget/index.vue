<template>
  <div class="forget-container">
    <div class="forget">
      <el-form ref="form" :model="reset" label-width="80px">
          <div class="title-container">
            <h1 class="title">重置密码</h1>
          </div>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号" v-model="reset.phoneNumber" @blur="mobileReg"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="ui-verification" placeholder="请输入验证码" v-model="reset.verificationCode"></el-input>
          <el-button class="btn-verification" type="primary" @click="handleverification()">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="重新设置">
          <el-input placeholder="请重新登录密码" v-model="reset.password" :type="passwordType" @blur="passReg"></el-input>
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input placeholder="请在次输入密码" v-model="reset.enterAgain" :type="passwordType" @blur='passRegs'></el-input>
        </el-form-item>
          <el-button  type="primary" style="width:80%;margin-bottom:30px;margin-left: 80px;" @click.native.prevent="handleLogin">重置密码</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {forget} from '@/api/register'

export default {
  name: 'forget',
  data() {
    return {
      reset: {
           phoneNumber:'18870571899',
           verificationCode:'',
           password:'',
           enterAgain:'',
       },
       passwordType: 'password', 
    };
  },
  methods: {
 //获取验证码  
   handleverification() {
      console.log("submit!");
    },

//手机号验证
    mobileReg () {
      const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
        if (this.reset.phoneNumber === "" ) {
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
            // this.reset.phoneNumber = ""
        }
    },

  //重新设置
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
        // this.reset.password = ""
      }
    },

   //再次输入
    passRegs() {
            if (this.reset.enterAgain === "") {
            this.$message({
          message: "密码不能为空",
          type: 'error',
          duration: 1500
                })
              }else if (this.reset.enterAgain.length < 6) {
          this.$message({
          message: "密码不能低于六位",
          type: 'error',
          duration: 1500
        })
        // this.reset.password = ""
      }else if (this.reset.enterAgain !== this.reset.password){
         this.$message({
          message: "两次输入密码不一致，请重新输入！",
          type: 'error',
          duration: 1500
        })
      }
    },

  //点击重置密码
   handleLogin( ){

     let obj = {
       sellerName:this.reset.phoneNumber,
       password:this.reset.enterAgain,
     }

     forget( obj ).then((res)=>{
       if(res.code ==='200'){
             this.$message({
                message: '修改成功',
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
     })
   },
  }
};
</script>

<style lang="scss">

/* reset element-ui css */
.forget-container {
  background: url('../../styles/img/bgc.png.jpg');

}
</style>

<style lang="scss" scoped>


.forget-container {
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

</style>
