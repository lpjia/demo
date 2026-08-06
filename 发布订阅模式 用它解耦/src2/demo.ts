import emitter from './eventEmitter'

console.log('========== 演示1: 优先级 ==========')
// 第3个参数 priority 数字越小越先执行
emitter.on('API:UN_AUTH', () => {
  console.log('[priority=10] 清除token')
}, 10)

emitter.on('API:UN_AUTH', () => {
  console.log('[priority=0] 跳转登录页')
}, 0)

emitter.on('API:UN_AUTH', () => {
  console.log('[priority=5] 提示未授权')
}, 5)

emitter.emit('API:UN_AUTH')
// 输出顺序: 跳转登录页 -> 提示未授权 -> 清除token


console.log('========== 演示2: 中断 ==========')
emitter.on('API:NOT_FOUND', () => {
  console.log('第1个监听执行')
  return false // 返回 false 中断, 后面的监听不执行
})

emitter.on('API:NOT_FOUND', () => {
  console.log('第2个监听: 这行不会输出')
})

emitter.emit('API:NOT_FOUND')
// 只输出: 第1个监听执行


console.log('========== 演示3: 优先级 + 中断 结合 ==========')
emitter.on('API:INVALID', () => {
  console.log('[priority=0] 校验失败处理')
}, 0)

emitter.on('API:INVALID', () => {
  console.log('[priority=1] 格式化错误信息')
  return false // 中断, 后面的监听不执行
}, 1)

emitter.on('API:INVALID', () => {
  console.log('[priority=2] 上报错误: 这行不会输出')
}, 2)

emitter.emit('API:INVALID')
// 输出: 校验失败处理 -> 格式化错误信息 (在 priority=1 处中断)
