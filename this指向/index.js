import MyController from './index2.js'

// console.log(MyController, 111) // 实例


// class MyClass { }
// console.log(new MyClass(), 222) // 实例


class MyRouter {
  post(path, fn) {
    console.log(
      path,
      fn(),
    )
  }
}

let router = new MyRouter()

/* 传入函数, fn()内部调用
属于直接调用, this指向全局对象
模块内是严格模式, this指向undefined */
// router.post('/', MyController.fn1)


/* obj.method(), 内部this指向obj, 没问题 */
// router.post('/', () => MyController.fn1())


/* 使用call、apply、bind, 重新绑定this, 没问题 */
// router.post('/', MyController.fn1.bind(MyController))


/* 类字段 function写法, 和普通类方法this指向一样, this指向undefined */
// router.post('/', MyController.lei_fn1)


/* 类字段 箭头函数, this指向类, 没问题 */
// router.post('/', MyController.lei_fn_arrow)
// router.post('/', MyController.lei_fn_arrow.bind(MyController))
// router.post('/', () => MyController.lei_fn_arrow())
/* 类字段 箭头函数 写法, 搭配以上三种写法, this指向都没问题 */