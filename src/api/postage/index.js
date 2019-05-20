/**  =========================> *|`| % 运费管理% |`|*<======================== **/

import request from '@/utils/request';


//保存商家运费模板
export function getFreight(data) {
  return request({
    url: '/xmall-front-web/postageTemplate/addPostageTemplate',
    method: 'post',
    params: data
  })
}

//查询商家运费列表
export function getFreightList(data) {
  return request({
    url: '/xmall-front-web/postageTemplate/selectAll',
    method: 'post',
    params: data
  })
}


//查询商家运费列表
export function getFreightModification(data) {
  return request({
    url: '/xmall-front-web/postageTemplate/updatePostageTemplate',
    method: 'post',
    params: data
  })
}