/**  =========================> *|`| % 结算管理 % |`|*<======================== **/

import request from '@/utils/request';


//结算管理列表数据
export function getClearingList(data) {
  return request({
    url: 'orders/selectBySettlementStatus',
    method: 'post',
    params: data
  })
}

