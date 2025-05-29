// 遍历数组

/* arr.map()
一参是回调, 二参是执行回调时用作this的值(可选)
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
需要返回一些数据重新组成新数组

返回一个新数组 */



let arr = [
  { num: 100, id: 1 },
  { num: 200, id: 2 },
  { num: 300, id: 3 },
]

/* 推荐这种写法, 解构原对象, 重新组装{}, 不影响原数组 */
arr.map(item => {
  return {
    ...item,
    num: item.num * 10
  }
})
/* 也可以单独改某些属性k, 再return对象, 改了原数组 */
arr.map(item => {
  item.num *= item.num
  return item
})
// 返回 [{ num: 10000, id: 1 }, { num: 40000, id: 2 }, { num: 90000, id: 3 }]




[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => item + 100)




/* item.id = idx, 表达式执行: 先赋值, 改了id的值, 整个表达式结果是idx的值 */
// arr.map((item, idx) => item.id = idx)
// arr.map((item, idx) => { return item.id = idx }) // 其实是省略return的语法
/* 慎用=>的简写形式, 返回的可能是非预期结果
有时候也会改变原数组 */



let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 学习这种简写的写法, 有助于提升水平
let strArr = arr2.map(String);
strArr
// 返回 ['1', '2', '3', '4', '5', '6', '7', '8', '9']


let strArr2 = strArr.slice(0, 3) // ['1', '2', '3']
strArr2.map(parseInt)
// 返回 [1, NaN, NaN]

/* 为啥没有返回预期的 [1, 2, 3]
因为 map 方法接收的第一个参是函数, 该函数内的参顺序是 item, idx, arrayItself
parseInt 方法接收的参顺序是 str, 几进制
看D:\demo\new不能用Math.js\index.js, 有parseInt的用法
parseInt('1', 0) 返回 1
parseInt('2', 1), 二参传1, 函数将始终返回 NaN
parseInt('3', 2), 二参传2合法, 但'3'转为number后是3, 二进制里没有3, 不是有效数字, 返回 NaN */



arr2.map(Math.pow);
// 返回 [1, 2, 9, 64, 625, 7776, 117649, 2097152, 43046721]

/* 为啥没有返回预期的 [1, 4, 9, ...]
因为 map 方法接收的第一个参是函数, 该函数内的参顺序是 item, idx, arrayItself
Math.pow 方法接收的参顺序是 底数(下头的数字), 指数(上头的数字)
所以计算结果是按 item 的 idx 次幂算的 */





/* 尝试传二参this的用法 */
const products = [
  { name: 'Apple', price: 1.2 },
  { name: 'Banana', price: 0.8 }
];

const taxCalculator = {
  rate: 1.2, // 20% 税率
  calculateWithTax: function () {
    return products.map(function (product) {
      return {
        name: product.name,
        price: product.price * this.rate
      };
    }, this);
  }
};

taxCalculator.calculateWithTax();

/* const obj = { rate: 100 }
const taxCalculator2 = {
  rate: 1.2, // 20% 税率
  calculateWithTax: function () {
    return products.map(function (product) {
      return {
        name: product.name,
        price: product.price * this.rate
      };
    }, obj);
  }
};
taxCalculator2.calculateWithTax(); */

/* const taxCalculator3 = {
  rate: 1.2, // 20% 税率
  calculateWithTax: function () {
    return products.map((product) => {
      return {
        name: product.name,
        price: product.price * this.rate
      };
    });
  }
};
taxCalculator3.calculateWithTax(); */



const nums = [1, 2, 3];
const o = { factor: 4 };

function multiply(num) {
  return num * this.factor;
}

nums.map(multiply.bind(o)); // map一参需要一个函数






/* arr.forEach()
一参是回调, 二参是执行回调时用作this的值
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身

无返回值 */

/* 和map的用法类似
不要使用=>简写, 因为不需要返回 */
