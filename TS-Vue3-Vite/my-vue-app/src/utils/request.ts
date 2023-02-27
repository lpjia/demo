import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/288967',
  timeout: 10_000
})

axiosInstance.interceptors.request.use(config => {

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