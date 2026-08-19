// 把可迭代或类数组对象转成一个新数组
// 从命名可以看出, from从什么创建Array数组实例, ES6+

/* Array.from()
一参是可迭代或类数组对象, 二参是回调mapFn(可选), 三参是执行mapFn时用作this的值(可选)
二参如果提供, 则每个要添加到数组的项要过一遍mapFn, 把返回值添加到数组中
二参中的回调会被自动传入2个参数：数组元素，元素索引

返回一个新数组 */


/* 常见的类数组 → 有length属性, 可通过索引取值, 不是真数组(不可直接调用数组方法)
arguments
dom集合
字符串 */


// function f() {
//   return Array.from(arguments);
// }
// console.log(
//   f(1, 2, 3) // [ 1, 2, 3 ]
// )



let o = { // 类数组对象
  0: 'arrItem1',
  1: 'arrItem2',
  length: 2
}

console.log(
  Array.from(o) // [ 'arrItem1', 'arrItem2' ]
)


console.log(
  Array.isArray(o) // false
)


// [...o], // TypeError: o is not iterable
/* Spread_syntax 展开语法, 只用于可迭代对象, ES6+
  内置可迭代对象有: 数组、类数组、字符串、Map、Set
*/



/* 
const floorButtonContent = computed(() => {
  console.log(111)
  return (v) => {
    console.log(222)
    const floorText = `${v}层`;
    return v % 3 === 0 ? `${floorText} 99%` : floorText;
  };
});

computed计算属性, 如果直接用返回fn的形式, 再传入1个template上的实参来动态改变dom
会失去 computed 最大优势"缓存", 每改变1次button的状态, 就要计算"打印"33次的"222"
因为缓存的是 (v) => {...} 这个函数, 而非想象的

作为替代, 用arr提前计算好数组项的变化内容, 只会一开始计算"打印"33次的"222", 后续不再重复打印

const floorButtonList = computed(() => {
  console.log(111);
  return Array.from({ length: 33 }, (_, index) => {
    const value = index + 1;
    const floorText = `${value}层`;
    console.log(222);
    return {
      value,
      label: value % 3 === 0 ? `${floorText} 99%` : floorText
    };
  });
});
*/

console.log(
  Array.from({ length: 33 }, (_, index) => {
    const value = index + 1;
    const floorText = `${value}层`;
    return {
      value,
      label: value % 3 === 0 ? `${floorText} 99%` : floorText
    }
  })
)