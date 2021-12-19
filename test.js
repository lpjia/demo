
var ClassFn = (function () {
  function ClassFn(params) {
    this.name = params
  }
  Object.defineProperty(ClassFn.prototype, 'name', {
    get() {
      return 'jack'
    },
    set(val) {
      console.log('setter: ', val)
    },
    enumerable: false,
    configurable: true
  })
  return ClassFn
}())
var cla = new ClassFn('xm')







// cmn-Hans-CN
let a = -123456789
// a.toLocaleString()
a.toLocaleString('cmn-Hans-CN')



a.toLocaleString('zh-Hans-CN-u-nu-hanidec', { style: 'currency', currency: 'CNY' })








function test() {
  let reg = '^[\u4e00-\u9fa5]{0,}$'
  reg.search()
}





