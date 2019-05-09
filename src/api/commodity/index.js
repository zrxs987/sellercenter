/**  =========================> *|`| % 商品管理 % |`|*<======================== **/

import request from '@/utils/request';


//获取商家列表
export function getCommodityList(data) {
  return request({
    url: 'goods/select',
    method: 'post',
    params: data
  })
}

