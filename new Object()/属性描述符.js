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
// 保证程序健壮
const aGoods = {
  pic: './assets/g1.png',
  title: '椰云拿铁',
  desc: `1人份【年度重磅，一口吞云】

    √原创椰云topping，绵密轻盈到飞起！
    原创瑞幸椰云™工艺，使用椰浆代替常规奶盖
    打造丰盈、绵密，如云朵般细腻奶沫体验
    椰香清甜饱满，一口滑入口腔
    
    【饮用建议】请注意不要用吸管，不要搅拌哦~`,
  sellNumber: 200,
  favorRate: 95,
  price: 32,
}
class UIGoods {
  get totalPrice() {
    return this.data.price * this.choose
  }

  get isChoose() {
    return this.choose > 0
  }

  constructor(g) {
    g = { ...g } // 克隆, 防止原始数据被冻结, 原始数据可能其他地方也要用
    Object.freeze(g) // 冻结克隆对象

    Object.defineProperty(this, 'data', {
      configurable: false,
      get: function () { // 简写get()
        return g
      },
      set: function (val) { // 简写set()
        throw new Error('data属性是只读的')
      }
    })

    let internalChoose = 0
    Object.defineProperty(this, 'choose', {
      configurable: false,
      get() {
        return internalChoose
      },
      set(val) {
        if (typeof val !== 'number') {
          throw new Error('choose属性必须是数字')
        }
        if (val < 0) {
          throw new Error('choose属性必须>=0')
        }
        if (parseInt(val, 10) !== val) {
          throw new Error('choose属性必须是整数')
        }
        internalChoose = val
      }
    })

    // // 可以换成最上面那种语法糖
    // Object.defineProperty(this, 'totalPrice', {
    //   get() {
    //     return this.data.price * this.choose
    //   }
    // })

    this.a = 1
    // Object.freeze(this)
    Object.seal(this) // 密封, 和freeze的区别是只要现有属性的值是可写的，它们仍然可以更改。
  }
}
Object.freeze(UIGoods.prototype) // 把原型也冻结了
let g = new UIGoods(aGoods)
// g.data = 1 // 报错
g.choose = 0
console.log(g.totalPrice)
console.log(g.isChoose)
// g.data.abc = 1 // 有可能改动原始数据, 把实参冻结
// g.abc = 1 // 有可能往实例上加属性, 把实例冻结
// g.a = 2 // 改动现有属性
// UIGoods.prototype.hehe = 'haha'
console.log(g.hehe)