/**  =========================> *|`| % 发货管理 % |`|*<======================== **/

import request from '@/utils/request'

//填写快递单号
export function getTrackingNumber(data) {
    return request({
      url: '/xmall-front-web/orders/updateShippingCode',
      method: 'post',
      data:data
    })
  }
