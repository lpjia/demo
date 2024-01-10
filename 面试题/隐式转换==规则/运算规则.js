console.log(
  // null + undefined, // NaN
  // 0 + NaN, // NaN

  // [] + {}, // '[object Object]'
  // '' + '[object Object]', // '[object Object]'

  // null > undefined, // false
  // 0 > NaN, // false

  // null == undefined, // true
  // null == 0, // false

  // 0 == '', // true, 0 == 0
  // 0 == '0', // true, 0 == 0
  // 2 == true, // false, 2 == 1
  // 2 == false, // false ,2 == 1
  // NaN == '', // false, 存在NaN则false
  // false == 'false', // false, 0 == NaN
  // false == '0', // true, 0 == 0
  // false == undefined, // false 有undefined
  // false == null, // false 有null
  // ' \n\r\t ' == 0, // true, 0 == 0, \n是换行符 \r是回车符 \t是制表符 都是空白字符
  // [] == ![], // true, '' == false 也就是 0 == 0

  /* 所有运算符按照优先级的不同从高（19）到低（1）排列
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence#%E6%B1%87%E6%80%BB%E8%A1%A8 */
  /* 优先级
  + 12
  == 9 */
  // null + '1' == null + 1, // false, 'null1' == 1
  // null + 1 == 1, // true, 1 == 1
  // null == 0, // false 有null
  // null + 1 == undefined + 1, // false, 1 == NaN + 1
  // null + null == undefined + undefined, // false, 0 == NaN + NaN

  ([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]], // 'nb'
  /* [][''] 空数组的索引项都是undefined, undefined+'' 得到'undefined'
  'undefined'[1] 得到'n'
  ''+'[object Object]' 得到'[object Object]'
  '[object Object]'[1 + 1] 得到'b'
  'n'+'b' */

  // 2 ** 3 ** 2, // 幂运算是右结合(其他算术运算符都是左结合), 先算3**2, 即3的2次方等于9, 再算2**9等于512
  /* 无论结合性和优先级如何，求值顺序总是从左到右 */

  // {} == {}, // false, 类型相同, 比较值, 对象看作地址, 地址不一样, 那么对象的值就不一样
)


let obj1 = {
  a: 1,
  b: 2,
  valueOf() {
    return this.a + this.b
  },
  toString() {
    return 1
  }
}

let obj2 = {
  toString() {
    return 0
  }
}
console.log(
  /* 优先级
  + 12
  ! 15 */
  // obj1 + !!obj2, // 4, 3 + true
)



const o1 = {
  /* 在 Symbol.toPrimitive 属性（用作函数值）的帮助下，对象可以转换为一个原始值。该函数被调用时，会被传递一个字符串参数 hint，表示要转换到的原始值的预期类型。hint 参数的取值是 "number"、"string" 和 "default" 中的任意一个 */
  /* "number" hint 用于强制数字类型转换算法。"string" hint 用于强制字符串类型转换算法。"default" hint 用于强制原始值转换算法 */
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint)
    if (hint === 'number') {
      return 33;
    }
    return '66';
    // return []
  },
  a: 1,
  b: 2,
  valueOf() {
    return this.a + this.b
  },
  toString() {
    return 6
  }
};
console.log(
  // +o1, // o1转number, 等价于Number(xxx)
  // String(o1), // o1转string
  // o1 == 66, // o1转原始值
)
