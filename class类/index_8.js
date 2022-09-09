const eventMixin = {
  // 订阅事件
  // menu.on('select', function(item){ ... })
  on(eventName, handler) {
    if (!this._eventHandlers)
      this._eventHandlers = {}

    if (!this._eventHandlers[eventName])
      this._eventHandlers[eventName] = []

    this._eventHandlers[eventName].push(handler)
  },


  // 取消订阅
  // menu.off('select', handler)
  off(eventName, handler) {
    const handlers = this._eventHandlers?.[eventName]
    if (!handlers)
      return

    const leng = handlers.length
    for (let i = 0; i < leng; i++) {
      if (handlers[i] === handler)
        handlers.splice(i--, 1)
    }
  },


  // 生成具有给定名称和数据的时间
  // this.trigger('select', data, data_2)
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName])
      return

    // 调用事件处理程序 (handler)
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args))
  }
}


class Base {

  constructor() {
    this.num = 1
  }

  ling() {
    console.log('this.num:', this.num)
  }
}


class BaseMenu extends Base {
  age = 30

  // constructor() {
  //   super()
  // }

  yi() {
    console.log('super.ling():', super.ling())
    console.log(this.ling())
  }
}


// 创建一个 class
class Menu extends BaseMenu {
  // constructor() {
  //   super()
  // }

  choose(val) {
    this.trigger('select', val)
  }
}


// 添加带有事件相关方法的 mixin
Object.assign(Menu.prototype, eventMixin)

const menu = new Menu()

// 添加一个事件处理程序(handler), 在被选择时被调用
menu.on('select', val => console.log(`Val selected: ${val}`))
menu.on('click', val => console.log(`Val clicked: ${val}`))

// 触发事件 => 运行上述的事件处理程序(handler)并显示
menu.choose('123')
console.log(menu)
// 使用 eventMixin 可以轻松地将此类行为添加到我们想要的多个类中，并且不会影响继承链。

// 使用一个对象中的方法(行为), 添加到类中, 不会影响继承链

// 方法对应行为, 属性(数据)对应状态

console.log('---- 分割线 ----\n\n\n')