import axios from 'axios'
import {MessageBox,Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import qs from 'qs'

// 创建一个axios实例
const service = axios.create({
  // baseURL: "http://47.112.195.117:8089",   
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 10000, // 请求超时
  // processData : false,
  headers: {

    'Content-Type': 'application/x-www-form-urlencoded',
  },
})



// 请求拦截器
service.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    // 在发送请求之前做些什么
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }

    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 调试命令
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   */
  response => {
    const res = response.data
    if (response.status !== 200) {
      Message({
        message: response.errorMsg || '请求错误',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
