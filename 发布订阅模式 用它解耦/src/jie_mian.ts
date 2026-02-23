import emitter from './eventEmitter' // 是同一个实例

emitter.on('API:UN_AUTH', () => {
  console.log('提示未授权')
})

emitter.on('API:NOT_FOUND', () => {
  console.log('提示没找到')
})
