export { }

/* 装饰器本质就是一个函数
会在运行时被调用
从nestjs的装饰器实践中发现, 统一封装成可传参的, 提高扩展性 */


/* es6箭头函数语法 */
const log: ClassDecorator = (target: Function) => {
  console.log('调用log方法')
  /* 这的箭头函数语法可以多借鉴 */
  target.prototype.getName = <T>(name: T): T => {
    return name
  }
}


/* 普通函数语法 */
function log2(target: Function) {
  console.log('调用log2方法')
  target.prototype.log3 = () => {
    console.log('调用log3方法')
  }
}

// // 类装饰器
// @log // 定义类的时候已经调用log装饰器函数
// class MyClass { }

// console.log('----') // 分割线, 看装饰器函数在什么时候会调用
// const a = new MyClass();
// console.log(
//   /* 这的类型语法可以多借鉴, 别忘了上行结尾的分号 */
//   (<any>a).getName('小二')
// )


// /* 可重用性 */
// @log
// class MyClass3 { }
// const c = new MyClass3()
// console.log(
//   (<any>c).getName('熊大')
// )


const log4 = (param: string): ClassDecorator => {
  return (target: Function) => {
    console.log('调用log4方法')
    target.prototype.getParamString = () => {
      return param
    }
  }
}

function log5(param: string): ClassDecorator {
  return function (target: Function) {
    console.log('调用log5方法')
    target.prototype.getParamString = function () {
      return param
    }
  }
}

const log6 = (param?: string): ClassDecorator => {
  return (...args) => {
    console.log('调用log6方法', args)
    // args里面就一项, 就是类, 也就是上面的target
  }
}

// /* 传参
// 通过高阶函数来定义参数 */
// @log4('这是实参')
// class MyClass4 { }
// const d = new MyClass4()
// console.log(
//   (<any>d).getParamString()
// )




// @log2
// class MyClass2 { }
// const b = new MyClass2();
// (<any>b).log3()



// /* 组合式
// 分单行和多行写法
// 从下到上依次调用(多行)
// 从右到左依次调用(单行) */
// @log2
// // @log4('这是实参')
// @log
// class MyClass5 { }

// @log2 @log4('这是实参')
// class MyClass6 { }


// @log6()
// class MyClass7 { }