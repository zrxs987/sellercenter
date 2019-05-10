
/**  =========================> *|`| % 评价管理 % |`|*<======================== **/

import request from '@/utils/request'

//商家评价管理
export function getEvaluateInfo(data) {
    return request({
      url: '/xmall-front-web/evaluateGoods/selectGetByStoreId',
      method: 'post',
      data:data
    })
  }

//商家评价统计
export function getStatistics(data) {
    return request({
      url: '/xmall-front-web/evaluateGoods/buyerScoreStatistics',
      method: 'post',
      data:data
    })
  }
  

