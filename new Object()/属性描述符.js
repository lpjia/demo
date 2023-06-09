/* 属性描述符 */
let obj2 = { a: 'aaa' }
Object.defineProperty(obj2, 'b', {
  value: 'bbb',
  writable: false, // 不可重写
  enumerable: false, // 不可遍历
  configurable: false, // 不可修改描述符本身
})
console.log("obj2:",
  obj2
)
// obj2.b = 'abc' // 报错, writable: false

/* Object.defineProperty(obj2, 'b', {
  value: 'abc',
  writable: true,
  enumerable: true,
  configurable: true,
}) // 报错, 上面一开始定义的configurable: false */



/* 描述符同时具有 [value 或 writable] 和 [get 或 set] 键，则会抛出异常。 */
// 也就是上面两组互斥, 不能同时存在
// 得找一个中间变量来存值, 否则容易无限递归, 栈溢出
let internalValue = void 0
Object.defineProperty(obj2, 'c', {
  configurable: false,
  get: function () {
    // console.log('this:', this) // this指向obj2
    // return this.a // 相当于调用get(), 无限递归
    return internalValue
  },
  set: function (val) {
    // console.log('this:', this) // this指向obj2
    // this.a = val // 相当于调用set(val), 无限递归
    internalValue = val
  }
})
obj2.c = 'ccc'



// 用类做一个只读属性
class UIGoods {
  constructor(g) {
    Object.defineProperty(this, 'data', {
      configurable: false,
      get: function () {
        return g
      },
      set: function (val) {
        throw new Error('data属性是只读的')
      }
    })
  }
}
let g = new UIGoods({})
g.data = 1
// 等大师课的这个知识点讲的时候再补充, 先就这