/* 网络 网络请求 */

/* import axios, { AxiosResponse } from 'axios'
// import router from './router'
// import { message } from 'ant-design-vue'
import emitter from './eventEmitter' // 是同一个实例

const ins = axios.create({ baseURL: 'http://127.0.0.1:3000' })

const successHandler = (res: AxiosResponse): any => { }

const errorHandler = (error: any): any => {
  // if (error.response.status === 401) {
    // message.error('登录无效, 请重新登录') // 和界面耦合了
    // router.push('/login') // 和路由耦合了
  // }

  // 解耦, 只看下面代码
  if (error.response.status === 401) {
    emitter.emit('API:UN_AUTH')
  }
  else if (error.response.status === 400) {
    emitter.emit('API:INVALID')
  }
}

ins.interceptors.response.use(successHandler, errorHandler) */


/* 上面是伪代码, 下面是可执行的伪代码 */


import emitter from './eventEmitter' // 是同一个实例
const status = 401
if (status === 401) {
  emitter.emit('API:UN_AUTH')
  console.log(401)
}
else if (status === 400) {
  emitter.emit('API:INVALID')
  console.log(400)
}
else if (status === 404) {
  emitter.emit('API:NOT_FOUND')
  console.log(404)
}