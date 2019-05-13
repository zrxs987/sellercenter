<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-form :inline="true" class="headerForm" style="margin-bottom: 1.5%;">
          <el-form-item label="快递公司" :label-width="formLabelWidth">
            <el-select
              size="medium"
              placeholder="快递公司"
              v-model="systemInformation.expressage"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="item.eName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="退货地址" :label-width="formLabelWidth">
            <el-select
              size="small"
              placeholder="请选择省"
              v-model="systemInformation.province"
              @change="handleSelectProvince"
              style="width:30%;"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>

            <el-select
              size="small"
              placeholder="请选择市"
              v-model="systemInformation.city"
              @change="handleSelectCounty"
              style="width:30%;"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.cityList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
            <el-select
              size="small"
              placeholder="请选择区"
              v-model="systemInformation.district"
              style="width:30%;"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.districtList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体地址">
            <el-input
              type="textarea"
              class="site"
              size="medium"
              :rows="2"
              resize="none"
              v-model="systemInformation.site"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleInquire">添加</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form>
      </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      fit
      :header-cell-style="{background:'#dee1e6'}"
      @selection-change="handleSelectionChange"
    > 

      <el-table-column type="selection" align="center"/>
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" label="订单编号" width="240" prop="orderSn">
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="260" prop="goodsName">
      </el-table-column>
      <el-table-column label="金额" align="center" prop="goodsAmount">
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderState">
      </el-table-column>
      <el-table-column align="center" label="支付状态">
        <template slot_scope="scope">
          <span>已支付</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态">
        <template slot_scope="scope">
          <span>待发货</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" prop="paymentCode">
      </el-table-column>
      <el-table-column align="center" label="成交时间" prop="finnshedTime">
      </el-table-column>
    </el-table>

    <pagination :total="50"/>
  </div>
</template>

<script>
import {
  getAddressInfo,
  getCity,
  getLogisticsCompany,
  getMerchantOrder,
} from "@/api/level3Linkage.js";
import { getBusinessAddress } from "@/api/locationManage";
import pagination from "@/components/Pagination/index";

export default {
  // name: "dropShipping",
  components: {
    pagination
  },
  data() {
    return {
      formLabelWidth: "90px",
      systemInformation: {
        expressage: "",
        province: "",
        city: "",
        district: "",
        site: ""
      },
      //下拉数据
      optionList: {
        expressage: [],
        provinceList: [],
        cityList: [],
        districtList: []
      },
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: "+id"
      },
      vals: "",
      tableData: [],
      tableSelectData:[],
      //勾选id
      paySnId:'',
    };
  },

  created() {
    this.fetchData();
    this._getLogisticsCompany();
    this.handleCall();
  },

  methods: {

    //table序号
    indexMethod(index) {
      return ++index * 1;
    },

    fetchData() {
      this.loading = true;
      getMerchantOrder({ storeId: 3, orderState: 20 })
        .then(res => {
           if (res.code === "200") {
            this.loading = false;
             res.data = res.data.map( item => {
              return {
                ...item,
                goodsName: item.orderGoodsList.length == 0 ? '' : item.orderGoodsList[0].goodsName
                
              }
            })
            this.tableData = res.data;
          } else {
            this.$message({
              message: res.errorMsg,
              type: "error",
              duration: 5 * 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //表格勾选
    handleSelectionChange( row ) {
       this.tableSelectData = row;
          let idArr = [];
          this.tableSelectData.forEach(item => {
              idArr.push(item.paySn)
          });
          this.paySnId = idArr.join(',')
    },

    //添加
    handleInquire() {
        let obj = {
          areaId:this.systemInformation.province,
          cityId:this.systemInformation.city,
          address:this.systemInformation.site,
          expressage:this.systemInformation.expressage,
          paySn:this.paySnId,
        }
        getBusinessAddress( obj ).then((res)=>{
          
            if (!this.tableSelectData.length) {
                  this.$message.warning("请先勾选数据！");
                  return;
              }
             else if(res.code === '200'){
                 this.$message({
                  message: res.errorMsg,
                  type: "success",
                  duration: 5 * 1000
            });
               this.systemInformation = {}
             }else {
                this.$message({
                  message: res.errorMsg,
                  type: "error",
                  duration: 5 * 1000
            });
          }
        })
    },

    // 重置按钮
    handleReset() {
      this.systemInformation = {};
    },
     
     handleCall(val){
       this.vals = val;
      getAddressInfo({
        areaParentId: val,
        type: "1"
      }).then(data => {
        this.optionList.provinceList = ''
        this.optionList.provinceList = data.data;
      })
     },

    //省
    handleSelectProvince(val) {
         getCity({
               areaParentId:++val,
               type: "2"
        }).then(res => {
          this.optionList.cityList=''
          this.optionList.cityList = res.data;
      });
    },

    //市
    handleSelectCounty(val) {
            getCity({
            areaParentId:this.optionList.cityList[val].areaId,
            type: "3"
       }).then(res => {
        this.optionList.districtList = ''
       this.optionList.districtList = res.data;
    });
    },
 
    //物流公司
    _getLogisticsCompany() {
      getLogisticsCompany().then(res => {
        res.data.forEach(item => {
          let esName = item.eName;
          this.optionList.expressage = res.data;
        })
      })
     },

  }
};
</script>


<style lang="scss" scoped>
.headerForm {
  height: 30px;
}
</style>
