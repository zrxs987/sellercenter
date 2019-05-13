/**  =========================> *|`| % 结算管理 % |`|*<======================== **/

import request from '@/utils/request';


//结算管理 列表数据
export function getClearingList(data) {
  return request({
    url: '/xmall-front-web/orders/selectBySettlementStatus',
    method: 'post',
    params: data
  })
}

