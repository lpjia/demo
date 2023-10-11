export { }

/* 属性装饰器 */
const log: PropertyDecorator = (...args) => {
  console.log(args)
}
const log2 = (param: string): PropertyDecorator => {
  return (...args) => {
    console.log(args)
    /* [ {}, 'name', undefined ]
    第一项target
    第二项'name'是属性的名字
    第三项undefined没有用, 所以是2个参, 可以看对应的类型声明 */
  }
}


/* 方法装饰器 */
const log3 = (param?: number): MethodDecorator => {
  return (...args) => {
    console.log(args)
    /* [ {}, 'getAge', {
        value: [Function: getAge],
        writable: true,
        enumerable: false,
        configurable: true
      }
    ]
    第一项target
    第二项'getAge'是方法的名字
    第三项描述符 */
  }
}


/* 参数装饰器 */
const log4 = (param?: number): ParameterDecorator => {
  return (...args) => {
    console.log(args)
    /* [ {}, 'getAge', 0 ]
    第一项target
    第二项'getAge'是参数的名字
    第三项0是参数的位置 */
  }
}


/* 访问器装饰器
访问器其实是一个函数/方法
同名的getter/setter, 只能在一个访问器用装饰器 */
const log5 = (param?: number): MethodDecorator => {
  return (...args) => {
    console.log(args)
  }
}


class A {
  // @log
  // @log2('abc')
  name!: string
  constructor() { }

  // @log3()
  // getAge(age: number) { }

  // getAge(@log4() age: number) { }


  set balance(param) { }

  @log5()
  get balance() {
    return
  }

}

const a = new A()