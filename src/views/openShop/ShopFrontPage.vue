<template>
    <div>
        <div class="ShopFrontPage">
             <div class="shop">
                  <img src="../../styles/img/bgc.png.jpg" alt="">
                  <p style=" cursor: pointer" @click="handleCompile">编辑店铺设置</p>
             </div>
             <div class="store">
                   <h4>美容旗舰店</h4>
                   <p><span>最后登录时间：</span><span>2019-03-12 10:00</span></p>
                   <p><span>店铺等级：</span><span>普通会员</span></p>
             </div>
             <div class="module">
                 <div style="background-color: #fe686a;">
                     <p>今日订单</p>
                     <p class="figure">88</p>
                     <div class="audit">
                         <span>出售中</span>
                         <span>发布平台审核</span>
                         <span>平台审核失败</span>
                         <span>仓库中已审核</span>
                     </div>
                 </div>
                 <div style="background-color: #f9b143;">
                     <p>成交金额</p>
                     <p class="figure">10000</p>
                     <p class="turnover" style=" font-size:16px;">
                         <span>昨日销量</span>
                         <span>1000</span>
                         <span>￥452100</span>
                     </p>
                     <p class="turnover" style=" font-size:16px;">
                         <span>月销量</span>
                         <span>100000</span>
                         <span>￥9521000</span>
                     </p>
                 </div>
                 <div style="background-color: #4dc3eb;">
                     <p>交易提示</p>
                     <p class="figure">1198</p>
                     <div class="audit">
                         <span>待付款</span>
                         <span>待发货</span>
                         <span>售后退款</span>
                     </div>
                     <div class="audit">
                         <span>售前退货</span>
                         <span>售后退货</span>
                         <span>待确认订单</span>
                     </div>
                 </div>
                 <div style="background-color: #9f97ec;">
                     <p>系统公告</p>
                     <p style="font-size:16px;line-height: 40px;">平台联系方式</p>
                     <p class="turnover" style=" font-size:16px;">
                         <span>电话</span>
                         <span>400-1234-123</span>
                     </p>
                     <p class="turnover" style=" font-size:16px;">
                         <span>邮箱</span>
                         <span>1501380234@qq.com</span>
                     </p>
                 </div>
                 <div style="background-color: #b54deb;">
                     <p>钱包</p>
                     <p class="figure">1198</p>
                     <p class="turnover" style=" font-size:16px;">
                         <span>￥1500.02</span>
                         <span>￥1500.03</span>
                         <span>日账单>></span>
                     </p>
                 </div>
             </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return{

        }
    },
    methods:{
        //编辑店铺信息
        handleCompile() {
            this.$router.push({
                path:'./personalData'
          }); 
        },
    }
}
</script>


<style lang="scss" scoped>
    .ShopFrontPage {
        width: 70%;
        height: 800px;
        margin: 20px auto;
        .shop {
            float: left;
            img {
               width: 80px;
               height: 80px;
               display: block;
               border-radius: 50%;
            }
        }
        .store {
            float: left;
            margin-left: 100px;
        }

        .module {
           float: left;
           width: 100%;
           height: 100%;
           div {
               float: left;
               width: 45%;
               height: 28%;
               margin-right: 20px;
               margin-bottom: 20px;
               border-radius: 5px;
               p{
                    font-size: 30px;
                    color: #fff;
                    margin-left: 20px;
                    line-height: 0px;
                  }
               .figure {
                   font-size: 60px;
               }
             .audit {
                    width: 100%;
                    height: 20px;
               span {
                   border: 1px solid #fff;
                   color: #fff;
                   padding: 8px;
                   margin-left: 3%;
                   border-radius: 5px;
                   cursor: pointer;
                 }
             }

             .turnover { 
                 line-height: 10px;
                 span {
                     margin-right: 30px;
                 }
             }
           }

        }
    }
</style>
