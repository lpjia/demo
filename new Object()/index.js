/* 根据规范，对象的属性键只能是 string 类型或者 Symbol 类型。 */
let shuxing = Symbol('sx'),
  shuxing2 = Symbol('sx2')
let obj = {
  // Symbol类型一般得用变量存, 否则就再找不到了, 因为唯一性
  [shuxing]: shuxing,
  [shuxing2]: shuxing2,
  [Symbol('sx3')]: Symbol('sx3'),
  'name is': 'obj',
  bds: 'bds',
  1: 'one',
  2: 'two',
  undefined: 'undefined',
  'undefined': 'str undefined',
  null: 'null',
  'null': 'str null',
}
console.log("obj:",
  obj
)
console.log(obj[Symbol('sx3')], obj[shuxing]) // undefined Symbol(sx)

// 这里可以看出, 对象的简单名字属性都是字符串类型, 加不加引号判定都一样, 后者会覆盖相同的前者
console.log("obj[null]:",
  obj[null] // "null"
)
console.log("obj[undefined]:",
  obj[undefined] // "undefined"
)


let name1 = 'name'
/* 方括号同样提供了一种可以通过任意表达式来获取属性名的方法 */
console.log("obj[name1 + ' is']:",
  obj[name1 + ' is'] // "obj"
)
console.log("obj[`${name1} is`]:",
  obj[`${name1} is`] // "obj"
)

let isTrue = true
  , bds = 'bds'
// 也是表达式
console.log("obj[isTrue ? bds : null]:",
  obj[isTrue ? bds : null] // "bds"
)


/* 有条件地往对象添加属性, 用展开运算符 ... */
const condition = true;
const person = {
  id: 1,
  name: 'John Doe',
  ...(condition && { age: 16 }),
};
console.log("person:",
  person // {id: 1, name: 'John Doe', age: 16}
)




/* 检查属性是否存在对象中 */
const person2 = {
  id: 1,
  name1: '前端小小',
  ...(true),
};
// 展开 `true` 对对象没有影响
console.log("person2:",
  person2 // { id: 1, name: '前端小小' }
)
console.log("'id' in person2:",
  'id' in person2 // true
)
console.log("['id'] in person2:",
  ['id'] in person2 // true
)
console.log("['name1'] in person2:",
  ['name1'] in person2 // true
)
console.log("'age' in person2:",
  'age' in person2 // false
)



/* 对象的动态解构 */
const person3 = { id: 1, name: '前端小小' };
const { name: personName } = person3;
console.log("personName:",
  personName // "前端小小"
)

const templates = {
  'hello': 'Hello there',
  'bye': 'Good bye'
};
const templateName = 'bye';
const { [templateName]: template } = templates;
console.log("template:",
  template // "Good bye"
)





/* 检查数组中的假值 */
const myArray = [null, false, 'Hello', undefined, 0];

// 过滤虚值
const filtered = myArray.filter(Boolean);
console.log("filtered:",
  filtered // ['Hello']
)
// 等价于上面, Boolean 函数本身接受一个参数，并根据参数的真实性返回 true 或 false
console.log("myArray.filter(val => Boolean(val)):",
  myArray.filter(val => Boolean(val)) // ['Hello']
)


// 检查至少一个值是否为真
const someTruthy = myArray.some(Boolean);
console.log("someTruthy:",
  someTruthy // true
)

// 检查所有的值是否为真
const allTruthy = myArray.every(Boolean);
console.log("allTruthy:",
  allTruthy // false
)




/* 使用 Object.entries 来获取键和值 */
const person4 = {
  name: '前端小小',
  age: 20
};

console.log("Object.keys(person4):",
  Object.keys(person4) // ['name', 'age']
)
console.log("Object.entries(person4):",
  Object.entries(person4) // [['name', '前端小小'], ['age', 20]]
)
// 键值对在一个数组里, 返回一个二维数组
// 二维数组可直接转为Map实例
const m = new Map(Object.entries(person4))
console.log(
  m,
  m.get('age'),
  m.get('name'),
)

Object.keys(person4).forEach((key) => {
  console.log(`遍历Object.keys返回的结果: ${key} is ${person4[key]}`);
});
// 使用 entries 获取键和值, 使用解构
Object.entries(person4).forEach(([key, value]) => {
  console.log(`遍历Object.entries返回的结果: ${key} is ${value}`);
});
// name is 前端小小
// age is 20





// 案例 1：评估结果和使用 === 相同
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// 案例 2: 带符号的 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// 案例 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true

NaN === NaN; // false
+0 === -0; // true

new Set([0, +0, -0]); // Set(1) {0}
// Set 和 Object.is 的区别就是对于+-0的




/* obj.hasOwnProperty(key) 有可能 obj 自身有 hasOwnProperty 方法, 返回不正确的结果
Object.prototype.hasOwnProperty.call(obj, key) 替代上面用法, 更保险
Object.hasOwn() 高版本, 不存在上面两种情况可能出现的问题 */

const foo2 = {
  hasOwnProperty() {
    return false;
  },
  bar: "Here be dragons",
};
console.log("foo2.hasOwnProperty('bar'):",
  foo2.hasOwnProperty('bar') // false
)
console.log("Object.prototype.hasOwnProperty.call(foo2, 'bar'):",
  Object.prototype.hasOwnProperty.call(foo2, 'bar') // true
)
const object1 = {
  prop: 'exists'
};
console.log("Object.hasOwn(object1, 'hasOwnProperty'):",
  Object.hasOwn(object1, 'hasOwnProperty') // false
)
console.log("Object.hasOwn(object1, 'prop'):",
  Object.hasOwn(object1, 'prop') // true
)