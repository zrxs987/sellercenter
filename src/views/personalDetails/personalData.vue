<template>
  <div>
    <div class="personalData">
      <h2>个人资料</h2>
      <el-form ref="form" :model="personalData" label-width="80px">
        <p>亲爱的 {{username}} ,填写真实的资料,有助于好友找到你哦！</p>
        <el-form-item label>
          <span class="upload-img">当前头像</span>
          <upload :show="false" @on-Success="bankImgonSuccess"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input placeholder v-model="personalData.setPwd"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input placeholder v-model="personalData.enterAgain"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="personalData.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出身日期">
          <el-select size="small" placeholder="请选择年" v-model="personalData.province"
             @change="handleSelectProvince" clearable>                 
            <el-option
              v-for="(label, value) in optionList.provinceList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select  size="small" placeholder="请选择月" v-model="personalData.city"  @change="handleSelectCounty"
           clearable >                                          
            <el-option
              v-for="(label, value) in optionList.cityList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select size="small" placeholder="请选择日" v-model="personalData.district" clearable>
            <el-option
              v-for="(label, value) in optionList.districtList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="居住地">
          <el-select size="small" placeholder="请选择年" v-model="personalData.province"
             @change="handleSelectProvince" clearable>                 
            <el-option
              v-for="(label, value) in optionList.provinceList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select  size="small" placeholder="请选择月" v-model="personalData.city"  @change="handleSelectCounty"
           clearable >                                          
            <el-option
              v-for="(label, value) in optionList.cityList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select size="small" placeholder="请选择日" v-model="personalData.district" clearable>
            <el-option
              v-for="(label, value) in optionList.districtList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="籍贯地">
          <el-select size="small" placeholder="请选择年" v-model="personalData.province"
             @change="handleSelectProvince" clearable>                 
            <el-option
              v-for="(label, value) in optionList.provinceList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select  size="small" placeholder="请选择月" v-model="personalData.city"  @change="handleSelectCounty"
           clearable >                                          
            <el-option
              v-for="(label, value) in optionList.cityList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
          <el-select size="small" placeholder="请选择日" v-model="personalData.district" clearable>
            <el-option
              v-for="(label, value) in optionList.districtList"
              :key="value"
              :value="value"
              :label="label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button  type="primary" style="width:10%;margin-bottom:30px;margin-left: 80px;" @click.native.prevent="handleSave">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";

export default {
  name: "personalData",
  components: {
    upload
  },
  data() {
    return {
      personalData: {

      },
      optionList:{

      },
      username: "18870571888",
    }
  },
  methods: {
    bankImgonSuccess() {

    },
    handleSelectProvince() {

    },
    handleSelectCounty() {

    },
    //保存
    handleSave() {

    },
  }
};
</script>

<style lang="scss" scoped>
.personalData {
  margin-left: 100px;
}
.el-input {
  width: 300px;
}
.upload-img {
  margin-left: -70px;
  font-weight: bold;
}
</style>
