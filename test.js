
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







// 阶乘
function factorial(num) {
  if (typeof num !== 'number') throw new Error('请传入 number 类型参数')
  if (Number.isNaN(num) || num < 0) throw new Error('请传入正确数字')
  let result = 1;
  while (num) {
    result *= num;
    num--;
  }
  return result;
}
factorial(0)


