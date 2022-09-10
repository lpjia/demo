// 受保护的字段
// 私有字段只在类的内部可被访问
// 私有字段无法从外部或从继承的类中访问它
// 受保护的字段以 _ 开头。这是一个众所周知的约定，不是在语言级别强制执行的。程序员应该只通过它的类和从它继承的类中访问以 _ 开头的字段。
// 私有字段以 # 开头。JavaScript 确保我们只能从类的内部访问它们。
class CoffeeMachine {
  _waterAmount = 0
  #siyouziduan = 'siyouziduan'

  constructor(power) {
    this._power = power
    // console.log(`Created a coffee-machine, power: ${power}`);
    console.log(this.#siyouziduan)
    console.log(this['#siyouziduan']) // undefined, 就离谱
    // 对于私有字段来说，这是不可能的：this['#name'] 不起作用。这是确保私有性的语法限制。
  }

  setWaterAmount(val) {
    if (val < 0) val = 0
    this._waterAmount = val

    // console.log(#siyouziduan in this)
  }

  getWaterAmount() {
    return this._waterAmount
  }

  get power_2() {
    return 'power_2'
  }

  get power() {
    return this._power
  }

  getPower() {
    return this._power
  }
}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(500)

// 加水
coffeeMachine.setWaterAmount(100)
console.log(coffeeMachine)



class CoffeeMachine_2 extends CoffeeMachine {
  #siyouziduan_2 = 222
  
  // 隐式调用
  // constructor() {
  //   super()
  //   // this.siyou = super.#siyouziduan // 报错
  //   this.siyou = super._waterAmount
  // }
}
console.log(new CoffeeMachine_2(10))
console.log('---- 分割线 ----\n\n\n')