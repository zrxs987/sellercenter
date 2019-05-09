/**  =========================> *|`| % 发货管理 % |`|*<======================== **/

import request from '@/utils/request'


// 查省
export function getAddressInfo(data,type) {
  return request({
    url: 'area/selectAllProvinceArea',
    method: 'post',
    data:(type,data)
  })
}

//查市
export function getCity(data,type) {
  return request({
    url: 'area/selectAllListByParentId',
    method: 'post',
    data:(type,data)
  })
}

// 查物流公司
export function getLogisticsCompany(data) {
  return request({
    url: 'express/select',
    method: 'post',
    data:data
  })
}

//修改订单状态
export function getAmendOrder(data) {
  return request({
    url: 'orders/modifyState',
    method: 'post',
    data:data
  })
}

//根据orderId查询订单扩展信息
export function getOrders(data) {
  return request({
    url: 'orders/getOrderCommomById',
    method: 'post',
    data:data
  })
}

//商家状态订单
export function getMerchantOrder (data) {
  return request({
    url: 'orders/ordersState',
    method: 'post',
    data:data
  })
}
