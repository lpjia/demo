import emitter from './eventEmitter' // 是同一个实例

emitter.on('API:UN_AUTH', () => {
  console.log('清除token')
}, 100)