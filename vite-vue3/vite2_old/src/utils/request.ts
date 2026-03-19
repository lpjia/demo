import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: process.env.VITE_APP_WEB_URL, // url = base url + request url
  timeout: 5000
  // withCredentials: true // 跨域请求时发送cookies
})

service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig<any> => {
    // if (UserModule.token) {
    //   config.headers['X-Access-Token'] = UserModule.token
    // }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | void => {
    const { code, data, msg } = response.data
    // if 进行判断来分别处理不同 code
    if (code !== 200) {

    } else {
      // 正常返回接口中的数据
      return data
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default service