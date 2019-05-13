/**  =========================> *|`| % 注册 .... 忘记密码 % |`|*<======================== **/

import request from '@/utils/request';

export function register(data) {
  return request({
    url: '/xmall-front-web/seller/registered',
    method: 'post',
    params: data
  })
}

//忘记密码
export function forget(data) {
  return request({
    url: '/xmall-front-web/seller/updateSecret',
    method: 'post',
    params: data
  })
}


