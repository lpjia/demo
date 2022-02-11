// (function (global) {

class MyVue {
  constructor(options) {
    this.options = options
    // 数据初始化
    this.initData(options)
    let el = this.options.id
    // 实例的挂载
    this.$mount(el)
  }

  initData(options) {
    if (!options.data) return
    this.data = options.data
    // 将数据重置 getter setter 方法
    new Observer(options.data)
  }

  $mount(el) {
    // 直接改写 innerHTML
    const updateView = _ => {
      const innerHTML = document.querySelector(el).innerHTML
      const key = innerHTML.match(/{(\w+)}/)[1]
      document.querySelector(el).innerHTML = this.options.data[key]
    }

    // 创建一个渲染的依赖
    new Watcher(updateView, true)
  }
}

// 观察者
class Observer {
  constructor(data) {
    // 实例化时执行 walk 方法对每个数据属性重写 getter setter 方法
    this.walk(data)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let item of keys) {
      // Object.defineProperty 的处理逻辑
      defineReactive(obj, item)
    }
  }
}


// 监听的依赖
class Watcher {
  constructor(expOrFn, isRenderWatcher) {
    this.getter = expOrFn
    // Watcher.prototype.get 的调用会进行状态的更新
    this.get()
  }

  get() {
    // 当前执行的 watcher
    Dep.target = this
    this.getter()
    Dep.target = null
  }

  update() {
    this.get()
  }
}


// 依赖管理
let uid = 0
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }

  // 依赖收集
  depend() {
    // Dep.target 是当前的 watcher, 将当前的依赖推到 subs 中
    if (Dep.target) this.subs.push(Dep.target)
  }

  // 派发更新
  notify() {
    const subs = this.subs.slice()
    for (let item of subs) {
      item.update()
    }
  }
}
Dep.target = null


// 依赖管理过程
const defineReactive = (obj, key) => {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj)
  let val = obj[key]
  if (property && property.configurable === false) return
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      // 做依赖的收集
      if (Dep.target) dep.depend()
      return val
    },
    set(newVal) {
      if (newVal === val) return
      // 派发更新
      val = newVal
      dep.notify()
    }
  })
}




// }(window))