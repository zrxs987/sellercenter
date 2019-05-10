/**  =========================> *|`| % 退货管理 % |`|*<======================== **/

import request from '@/utils/request';

//申请退货换货列表
export function getReturnManagementList(data) {
  return request({
    url: '/xmall-front-web/ordersGoods/selectByStoreAndOrderGoodsRefundSellerStratus',
    method: 'post',
    params: data
  })
}

//商家是否同意退款
export function getWhetherRefund(data) {
  return request({
    url: '/xmall-front-web/ordersGoods/updateOrderGoodsRefundSellerStratus',
    method: 'post',
    params: data
  })
}
