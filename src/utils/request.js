import axios from 'axios'
import { getUser } from '@/utils/storage.js'

const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userInfo = getUser()
  if (userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default http
