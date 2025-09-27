import axios from 'axios'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // url = base url + request url
  timeout: 5000
  // withCredentials: true // 跨域请求时发送cookies
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 配置一些东西
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, msg } = response.data
    // if 进行判断来分别处理不同 code
    if (code !== 0) {
      return Promise.reject(new Error(msg || 'Error'));
    } else {
      // 正常返回接口中的数据
      return data
    }
  },
  (error: AxiosError) => {
    const { code, msg } = (error.response?.data || {}) as { code: number, msg: string }
    if (code !== 0) {
      console.warn(msg)
    }
    return Promise.reject(error)
  }
)

export default service;