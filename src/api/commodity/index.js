/**  =========================> *|`| % 商品管理 % |`|*<======================== **/

import request from '@/utils/request';


//获取商家列表
export function getCommodityList(data) {
  return request({
    url: '/xmall-front-web/goods/select',
    method: 'post',
    params: data
  })
}

//分类
export function getClassify(data) {
  return request({
    url: '/xmall-manager-web/goodsClassNav/getGoodsClassNavList',
    method: 'post',
    params: data
  })
}

//分类切换
export function getClassifyCut(data) {
  return request({
    url: '/xmall-manager-web/goodsClassNav/getGoodsClassList',
    method: 'post',
    params: data
  })
}


//分类详情
export function getAdventure(data) {
  return request({
    url: '/xmall-manager-web/goodsClassNav/getGoodsClassDetail',
    method: 'post',
    params: data
  })
}

//选择品牌
export function getTrademark(data) {
  return request({
    url: '/xmall-front-web/brand/selectAll',
    method: 'post',
    params: data
  })
}


//发布商品
export function getIssue(data) {
  return request({
    url: '/xmall-front-web/goods/add',
    method: 'post',
    params: data
  })
}



