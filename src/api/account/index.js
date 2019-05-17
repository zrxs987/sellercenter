/**  =========================> *|`| % 账户管理 % |`|*<======================== **/

import request from '@/utils/request';

//获取银行列表
export function getBankList(data) {
  return request({
    url: '/xmall-front-web/sellerCard/addSellerCard1',
    method: 'post',
    params: data
  })
}


//添加银行账号
export function getBankAccount(data) {
  return request({
    url: '/xmall-front-web/sellerCard/addSellerCard',
    method: 'post',
    params: data
  })
}
