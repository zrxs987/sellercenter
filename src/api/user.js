import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'seller/enter',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'seller/enter',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'seller/enter',
    method: 'post'
  })
}
