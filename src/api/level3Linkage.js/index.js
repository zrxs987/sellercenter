/**  =========================> *|`| % 发货管理 % |`|*<======================== **/

import request from '@/utils/request'


// 查省
export function getAddressInfo(data,type) {
  return request({
    url: '/xmall-front-web/area/selectAllProvinceArea',
    method: 'post',
    data:(type,data)
  })
}

//查市
export function getCity(data,type) {
  return request({
    url: '/xmall-front-web/area/selectAllListByParentId',
    method: 'post',
    data:(type,data)
  })
}

// 查物流公司
export function getLogisticsCompany(data) {
  return request({
    url: '/xmall-front-web/express/select',
    method: 'post',
    data:data
  })
}

//修改订单状态
export function getAmendOrder(data) {
  return request({
    url: '/xmall-front-web/orders/modifyState',
    method: 'post',
    data:data
  })
}

//根据orderId查询订单扩展信息
export function getOrders(data) {
  return request({
    url: '/xmall-front-web/orders/getOrderCommomById',
    method: 'post',
    data:data
  })
}

//商家状态订单
export function getMerchantOrder (data) {
  return request({
    url: '/xmall-front-web/orders/ordersState',
    method: 'post',
    data:data
  })
}


//发货管理
// export function getDeliverGoods (data) {
//   return request({
//     url: '/xmall-front-web/orders/modifyState',
//     method: 'post',
//     data:data
//   })
// }

