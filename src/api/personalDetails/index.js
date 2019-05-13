/**  =========================> *|`| % 店铺信息 % |`|*<======================== **/

import request from '@/utils/request';

export function getShopInfo(data) {
  return request({
    url: '/xmall-front-web/seller/registered',
    method: 'post',
    params: data
  })
}


