import axios from 'axios'
import { Message } from 'element-ui'
// import { removeObjEmptyKey } from '@/utils'
import { URL } from './config.js'

const service = axios.create({
  baseURL: URL,
  timeout: 3000 // 1000 * 3
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // // 好像默认 get 请求是查询字符串
    // if (config.method === 'get') {
    //   console.log('get 请求')
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // }

    // // 在发送请求之前做些什么
    // if (!config.headers['Content-Type']) {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   // config.data = qs.stringify(config.data)
    // }

    // console.log('config.headers: ', config.headers)

    /**
     * 没值的字段对于表单来说还不能去掉
     */
    // config.data && removeObjEmptyKey(config.data)
    // config.params && removeObjEmptyKey(config.params)

    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log('response:', response)
    if (response.data.code === -1) Message.error(response.data.message)
    return response.data
  },
  error => {
    // 响应的状态码
    // error.response.status
    // 响应的提示信息
    // console.log('error: ', error)
    Message.error(error.message)
    // let errMsg = error.response.data.error.message
    // console.error('err: ' + errMsg) // for debug
    return Promise.reject(error)
  }
)

export default service
