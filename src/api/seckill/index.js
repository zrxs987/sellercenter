/**  =========================> *|`| % 秒杀管理 % |`|*<======================== **/

import request from '@/utils/request';

//申请退货换货列表
export function getSeckillList(data) {
  return request({
    url: '/xmall-front-web/goods/selectSecondsKillGoods',
    method: 'post',
    params: data
  })
}