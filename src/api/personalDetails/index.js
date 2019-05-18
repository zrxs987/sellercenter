/**  =========================> *|`| % 店铺信息 % |`|*<======================== **/

import request from '@/utils/request';

//提交店铺资料
export function getShopInfo(data) {
  return request({
    url: '/xmall-front-web/store/updateStore',
    method: 'post',
    params: data
  })
}

//获取店铺信息
export function getShopData(data) {
  return request({
    url: '/xmall-front-web/store/selectStore',
    method: 'post',
    params: data
  })
}


