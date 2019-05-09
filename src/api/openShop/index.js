/**  =========================> *|`| % 开店管理 % |`|*<======================== **/

import request from '@/utils/request'
import upload from '@/utils/upload'

//上传资料
export function getUploadData(data) {
  return upload.post('/xmall-front-web/storeJoinin1/add',data)
}
// //上传资料
// export function getUploadData(param) {
//     return request({
//       url: 'storeJoinin1/add',
//       method: 'post',
//       params:param,
//     })
//   }

 //选择产品类型
export function getProductType(data) { 
  return request({
    url: 'manufacturer/add',
    method: 'post',
    data:(data)
  })
} 

 //提交资质
export function getAptitude(data) {
  return request({
    url: 'manufacturerQualification/add',
    method: 'post',
    data:(data)
  })
} 
 //上传合同信息
export function getaddContract(data) {
  return request({
    url: 'content/add',
    method: 'post',
    data:(data),
    processData: false,
  })
} 
 //添加店铺信息
export function getaddShopsInfo(data) {
  return request({
    url: 'store/addStore',
    method: 'post',
    data:(data),
    processData: false,
  })
} 


//根据类型查询资质
export function getOrderId(data) {
    return request({
      url: 'weiitClass/select',
      method: 'post',
      data:(data)
    })
  }

  
//上传图片接口
export function getUploadFile(data) {
    return upload.post('/upload/uploadFile',data)
  }
  