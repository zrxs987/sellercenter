<template>
  <div class="forget-container">
    <div class="forget">
      <el-form ref="form" :model="reset" label-width="80px">
          <div class="title-container">
            <h1 class="title">重置密码</h1>
          </div>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号" v-model="reset.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="ui-verification" placeholder="请输入验证码" v-model="reset.verificationCode"></el-input>
          <el-button class="btn-verification" type="primary" @click="handleverification()">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="重新设置">
          <el-input placeholder="请重新登录密码" v-model="reset.setPwd"></el-input>
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input placeholder="请在次输入密码" v-model="reset.enterAgain"></el-input>
        </el-form-item>
          <el-button  type="primary" style="width:80%;margin-bottom:30px;margin-left: 80px;" @click.native.prevent="handleLogin">重置密码</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forget',
  data() {
    return {
      reset: {
           phone:'',
           verificationCode:'',
           setPwd:'',
           enterAgain:'',
       }
    };
  },
  methods: {
    //获取验证码  
   handleverification() {
      console.log("submit!");
    },
    //点击重置密码
   handleLogin( ){

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
