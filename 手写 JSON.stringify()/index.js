import { jsonstringify } from './testModule.js'

// 1. 测试一下基本输出
// 2. 和原生的JSON.stringify转换进行比较

// 每次打印第一个null, 是为了看后面数据的类型
console.log(
  null,
  jsonstringify(undefined)
  , JSON.stringify(undefined)
  // undefined
)
console.log(
  null,
  jsonstringify(() => { })
  , JSON.stringify(() => { })
  // undefined
)
console.log(
  null,
  jsonstringify(Symbol('前端'))
  , JSON.stringify(Symbol('前端'))
  // undefined
)
console.log(
  null,
  jsonstringify(NaN)
  , JSON.stringify(NaN)
  // 'null'
)
console.log(
  null,
  jsonstringify(Infinity)
  , JSON.stringify(Infinity)
  // 'null'
)
console.log(
  null,
  jsonstringify(null)
  , JSON.stringify(null)
  // 'null'
)

let ooo = {
  name: '前端',
  toJSON() {
    return {
      name: this.name,
      sex: 'boy'
    }
  }
}
console.log(
  null,
  jsonstringify(ooo) === JSON.stringify(ooo)
  , jsonstringify(ooo)
  , JSON.stringify(ooo)
  // '{"name":"前端","sex":"boy"}'
)
console.log(
  null,
  jsonstringify(false)
  , JSON.stringify(false)
  // 'false'
)

let str = "前端";
console.log(
  null,
  jsonstringify(str) === JSON.stringify(str)
  , jsonstringify(str)
  , JSON.stringify(str)
  // '"前端"'
)

let reg = new RegExp("\w");
console.log(
  null,
  jsonstringify(reg) === JSON.stringify(reg)
  , jsonstringify(reg)
  , JSON.stringify(reg)
  // '{}'
)

let date = new Date();
console.log(
  null,
  jsonstringify(date) === JSON.stringify(date)
  , jsonstringify(date)
  , JSON.stringify(date)
  // '"2025-06-23T04:07:43.689Z"'
)

let sym = Symbol('前端');
console.log(
  null,
  jsonstringify(date) === JSON.stringify(date)
  , jsonstringify(sym)
  , JSON.stringify(sym)
  // undefined
)

let array = [1, 2, 3];
console.log(
  null,
  jsonstringify(array) === JSON.stringify(array)
  , jsonstringify(array)
  , JSON.stringify(array)
  // '[1,2,3]'
)

let obj = {
  name: '前端',
  age: 18,
  attr: ['coding', 123],
  date: new Date(),
  uni: Symbol(2),
  sayHi: function () {
    console.log("hello world")
  },
  info: {
    age: 16,
    intro: {
      money: undefined,
      job: null
    }
  },
  pakingObj: {
    boolean: new Boolean(false),
    string: new String('前端'),
    number: new Number(1),
  }
}
console.log(
  null,
  jsonstringify(obj) === JSON.stringify(obj)
  , JSON.stringify(obj)
  // '{"name":"前端","age":18,"attr":["coding",123],"date":"2025-06-23T04:25:19.154Z","info":{"age":16,"intro":{"job":null}},"pakingObj":{"boolean":false,"string":"前端","number":1}}'
)

// 3. 测试可遍历对象
let enumerableObj = {}

Object.defineProperties(enumerableObj, {
  name: {
    value: '前端',
    enumerable: true
  },
  sex: {
    value: 'boy',
    enumerable: false
  },
})
Object.defineProperty(enumerableObj, 'age', {
  value: 18,
  enumerable: false
})
// 不可枚举的属性, 会被丢掉
console.log(
  null,
  jsonstringify(enumerableObj) === JSON.stringify(enumerableObj)
  , JSON.stringify(enumerableObj)
  // '{"name":"前端"}'
)


// 4. 测试循环引用和Bigint

let obj1 = { a: 'b' }
let obj2 = { name: '前端', c: obj1 }
obj2.obj = obj2

console.log(obj2)

// console.log(JSON.stringify(obj2))
// console.log(jsonstringify(obj2))
// // TypeError: Converting circular structure to JSON

// console.log(JSON.stringify(BigInt(1)))
// console.log(jsonstringify(BigInt(1)))
// // TypeError: Do not know how to serialize a BigInt