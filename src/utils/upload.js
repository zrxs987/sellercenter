import axios from 'axios'


const upload = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  anync: true,
  contentType: false,
  processData: false,
})

// 请求拦截器
upload.interceptors.request.use((config) => {
  return config
})

upload.interceptors.response.use((res) => {
  return res.data
})


export default upload
