/**  =========================> *|`| % 地址管理 % |`|*<======================== **/

import request from '@/utils/request';

//修改商家地址
export function getModificationAddress(data) {
  return request({
    url: 'daddress/update',
    method: 'post',
    params: data
  })
}

//根据id查询商家地址
export function getIdAddress(data) {
  return request({
    url: 'daddress/getById',
    method: 'post',
    params: data
  })
}

//添加商家地址
export function getBusinessAddress(data) {
  return request({
    url: 'daddress/add',
    method: 'post',
    params: data
  })
}

//查询商家地址
export function getMerchantSite(data) {
  return request({
    url: 'daddress/select',
    method: 'post',
    params: data
  })
}

//删除地址
export function getDelete(data) {
  return request({
    url: 'daddress/delete',
    method: 'post',
    params: data
  })
}

//设为默认地址
export function getDefault(data) {
  return request({
    url: 'daddress/updateByIsDefault',
    method: 'post',
    params: data
  })
}
