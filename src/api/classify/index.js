/**  =========================> *|`| % 交易管理 % |`|*<======================== **/

import request from '@/utils/request';


//待评价订单
export function getEvaluate(data) {
  return request({
    url: '/xmall-front-web/orders/evaluationState',
    method: 'post',
    params: data
  })
}

//最近三个月商家订单
export function getRecentlyTrimester(data) {
  return request({
    url: '/xmall-front-web/orders/getThreeMonthsOrder',
    method: 'post',
    params: data
  })
}


