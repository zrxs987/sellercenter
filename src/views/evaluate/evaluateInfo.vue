<template>
  <div>
    <div class="table-box">
      <!-- <span></span> -->
      <table style="border-collapse:collapse;">
        <tr class="table-header">
          <td></td>
          <td>近一周</td>
          <td>近一个月</td>
          <td>近六个月</td>
          <td>六个月前</td>
          <td>总计</td>
        </tr>
        <tr v-for="(item,keyIndex) in tableDate" :key="keyIndex">
          <td>
            <img :src="'../../styles/img/'+item.src+'.png'"  alt v-if="item.src" >
            <span class="flower">{{item.text}}</span>
          </td>
          <td>{{item.week}}</td>
          <td>{{item.mouth}}</td>
          <td>{{item.mouth6Front}}</td>
          <td>{{item.mouth6Lately}}</td>
          <td style="color: #409eff;">{{item.all}}</td>
        </tr>
        <!-- <tr>
          <td>
        
            <span class="flower">中评</span>
          </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td style="color: #409eff;">0</td>
        </tr>
        <tr>
          <td>
            <img src="../../styles/img/gray.png" alt>
            <span class="flower">差评</span>
          </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td style="color: #409eff;">0</td>
        </tr>
        <tr>
          <td class="flower">总计</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">101</td>
        </tr> -->
      </table>
    </div>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="来自买家的评价" name="first">
     <p class="bar"> 
       <span>评价人</span>
       <span>宝贝信息</span>
       <span>操作</span>
      </p>
      <p class="clear"></p>
      <p class="evaluate">
        <img src="../../styles/img/red.png" alt="">
        <span>感谢亲的光临，期待再次合作！</span>
      </p>
      <div class="shopEvaluation">
       <tr>
        <td class="td_one"></td>
        <td class="td_two">至尊宝开的店</td>
        <td class="td_three">云南白药,越擦越年轻,年轻就是累</td>
      </tr>
      </div>
    </el-tab-pane>

    <el-tab-pane label="来自卖家的评价" name="second">
      <p class="bar"> 
       <span>评价人</span>
       <span>宝贝信息</span>
       <span>操作</span>
      </p>
      <p class="clear"></p>
      <p class="evaluate">
        <img src="../../styles/img/red.png" alt="">
        <span>感谢亲的光临，期待再次合作！</span>
      </p>
      <div class="shopEvaluation">
       <tr>
        <td class="td_one"></td>
        <td class="td_two">傻大叔的店</td>
        <td class="td_three">爱车屋米汤7°   温柔单枕T-626MS 活力橙</td>
      </tr>
      </div>
    </el-tab-pane>

    <el-tab-pane label="给他人的评价" name="third">
      <p class="bar"> 
       <span>评价人</span>
       <span>宝贝信息</span>
       <span>操作</span>
      </p>
      <p class="clear"></p>
      <p class="evaluate">
        <img src="../../styles/img/red.png" alt="">
        <span>感谢亲的光临，期待再次合作！</span>
      </p>
      <div class="shopEvaluation">
       <tr>
        <td class="td_one"></td>
        <td class="td_two">赔本挣吆喝</td>
        <td class="td_three">释放负离子，净化空气，防辐射，光波疗法
          ↵上灯口直径φ为90mm，
          ↵灯身最大直径φ为160mm，高为185mm</td>
      </tr>
      </div>
    </el-tab-pane>

    <el-tab-pane label="已处理的评价" name="fourth">
       <p class="bar"> 
       <span>评价人</span>
       <span>宝贝信息</span>
       <span>操作</span>
      </p>
      <p class="clear"></p>
      <p class="evaluate">
        <img src="../../styles/img/red.png" alt="">
        <span>感谢亲的光临，期待再次合作！</span>
      </p>
      <div class="shopEvaluation">
       <tr>
        <td class="td_one"></td>
        <td class="td_two">本店不挣钱</td>
        <td class="td_three">专研抗敏，消炎固齿，深度洁净，温和有效。
                  ↵亮白出彩，防蛀修护，深度洁净，温和有效。
                  ↵晶亮修护，去渍除垢，深度洁净，温和有效</td>
      </tr>
      </div>
    </el-tab-pane>

  </el-tabs>
  </div>
</template>

<script>
import { getEvaluateInfo, getStatistics } from "@/api/evaluate"

export default {
  name:'evaluateInfo',
  data() {
    return {
      evaluate: {},
      // element:[],
      tableDate:[],
      activeName:'second',
    };
  },

 created() { 
    this._getEvaluateInfo()
    this.fetchData()
  },

 methods:{
      fetchData(){
         getStatistics({gevalStoreid:3}).then((res)=>{
    this.tableDate.push( {'all':res.data.all[1],'week':res.data.day7[1],'mouth':res.data.mouth1[1], 'mouth6Front':res.data.mouth6Front[1],'mouth6Lately':res.data.mouth6Lately[1],'text':'好评','src':"red"})
    this.tableDate.push( {'all':res.data.all[3],'week':res.data.day7[3],'mouth':res.data.mouth1[3], 'mouth6Front':res.data.mouth6Front[3],'mouth6Lately':res.data.mouth6Lately[3],'text':'中评','src':"yellow"})
    this.tableDate.push( {'all':res.data.all[5],'week':res.data.day7[5],'mouth':res.data.mouth1[5], 'mouth6Front':res.data.mouth6Front[5],'mouth6Lately':res.data.mouth6Lately[5],'text':'差评','src':"gray"})
  
    let all =null;
    let week = null;
    let mouth = null;
    let mouth6Front = null;
    let mouth6Lately = null;
    for(let i=0;i<this.tableDate.length;i++){
        all += Number(this.tableDate[i].all);
        week += Number(this.tableDate[i].week);
        mouth += Number(this.tableDate[i].mouth);
        mouth6Front += Number(this.tableDate[i].mouth6Front);
        mouth6Lately += Number(this.tableDate[i].mouth6Lately);
    }
  this.tableDate.push( {'all':all,'week':week,'mouth':mouth, 'mouth6Front':mouth6Front,'mouth6Lately':mouth6Lately,'text':'总计'})
    console.log( this.tableDate);

         })
      },

     _getEvaluateInfo(){
           
        getEvaluateInfo({gevalStoreid:15}).then((res)=>{
              // console.log(res,11111111)
        }) 
     },

     //tab切换
     handleClick(tab, event) {
        // console.log(tab, event);
    }
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  width: 60%;
  margin: 50px 100px;
  border-collapse: collapse;
  text-align: center;
  tr {
    border-collapse: collapse;
  }
  td {
    width: 150px;
    height: 50px;
    border: 1px solid grey;
    border-collapse: collapse;
  }
  .flower {
    line-height: 50px;
  }
  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    margin-bottom: -5px;
  }
  .table-header,
  .flower {
    font-weight: bold;
  }
}
.el-tabs {
  margin-left: 100px;
  width: 55%;
  .el-tab-pane {
     font-size: 18px;
  }
  /deep/.el-tabs__item.is-active {
    background-color: #409EFF!important;
    color: #fff;
    padding:0px 20px;
    border-radius: 3px 3px 0px 0px;
    font-size: 16px!important;
  }
  /deep/.el-tabs__item.is-top {
    font-size: 16px;
  }
  .bar {
    font-size: 16px;
    float: right;
    span {
      margin-right: 170px;
      font-weight: bold;
    }
    span:nth-child(3){
       margin-right: 20px;
    }
  }
  .evaluate {
    float: left;
    font-size: 16px;
    margin-top: -10px;
    span {
      font-weight: bold;
    }
    img {
    margin-bottom: -8px;
    margin-right: 30px;
    }
  }
    .clear{
      clear: both;
  }
  .shopEvaluation {
    width: 60%;
    margin-left: 200px;
  }
  tr {
     margin-top: -80px;
  }
  td {
    font-size: 14px;
    margin-top: 20px;
    color: #409EFF;
  }
  .td_one:nth-child(1){
     width: 30%!important;
  } 
  .td_two:nth-child(2) {
    width: 45%!important;
  }
  .td_three:nth-child(3) {
    width: 45%!important;
  }
}

</style>
