/* prop in object
如果指定属性位于指定对象或其原​​型链中， in 运算符返回 true 。
属性名可以是字符串或symbol */

/* in 的基本方法就是 Reflect.has(target, propertyKey) */

const symb = Symbol('一个key')
const car = {
  make: "Honda",
  model: "Accord",
  year: 1998,
  symb, // 非符号将被强制转换为字符串, 这里symb是变量, 用作key是简写 等价于 'symb': Symbol('一个key')
  [symb]: symb // 属性加[], 里面可以写表达式, 更灵活
};


console.log(
  // car,
  "make" in car, // true
  ["make"] in car, // true
  'symb' in car, // true
  symb in car, // true
  'valueOf' in car, // true 原型链上的对象的属性, 不属于自身的, 也返回T
);


const carChild = {
  name: 'car_son',
  __proto__: car // 直接指定原型链
}


console.log(
  'name' in carChild, // true
  "make" in carChild, // true
  symb in carChild // true
)

console.log('---- 分割线 ----\n')

console.log(
  Reflect.has(car, "make") // true
  , Reflect.has(car, "symb") // true
  , Reflect.has(car, symb) // true
  , Reflect.has(car, 'valueOf'), // true 原型链上的对象的属性, 不属于自身的, 也返回T
);

console.log(
  Reflect.has(carChild, "name") // true
  , Reflect.has(carChild, "make") // true
  , Reflect.has(carChild, symb) // true
)
console.log('---- 分割线 ----\n')


/* 要测试某个值是否存在于数组中，请使用 Array.prototype.includes() 。 */

const arr = [1, 2, 3]
console.log(
  arr.includes(3), // true
  arr.includes(9) // false
)


/* 要测试某个值是否存在于集合中，请使用 Set.prototype.has() 。 */

const setSet = new Set([10, 20, 30])
console.log(
  setSet.has(20), // true
  setSet.has(80) // false
)