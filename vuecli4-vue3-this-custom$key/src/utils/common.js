import { app } from '../main'

export function fn(that) {
  console.log('fn that.$log:', that.$log)
  console.log('fn that.msg:', that.msg)

  console.log('app.config.globalProperties.$log:', app.config.globalProperties.$log)
}

