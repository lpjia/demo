import vdo from './1-video.js'
console.log('vdo:', vdo)

// 得到vdo的原型
const vdoPrototype = Object.getPrototypeOf(vdo)
console.log('vdoPrototype:', vdoPrototype)
// 得到类(构造函数)
const MyVideo = Object.getPrototypeOf(vdo).constructor
console.log('MyVideo:', MyVideo)
const v = new MyVideo()
// 不是一个实例, 所以这种方案有缺陷, 不用
console.log('v === vdo:', v === vdo)

export default vdo