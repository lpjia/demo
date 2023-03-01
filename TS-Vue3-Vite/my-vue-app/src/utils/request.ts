import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/288967/api',
  timeout: 10_000
})

axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Token = token
  }

  return config
}, err => {
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(result => {

  return result.data
}, err => {
  return Promise.reject(err)
})

export default axiosInstance