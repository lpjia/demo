/* 根据规范，对象的属性键只能是字符串类型或者 Symbol 类型。 */
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
  'undefined': 'str undefined',
  undefined: 'undefined',
  'null': 'str null',
  null: 'null',
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
const anyTruthy = myArray.some(Boolean);
console.log("anyTruthy:",
  anyTruthy // true
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

Object.keys(person4).forEach((key) => {
  console.log(`遍历Object.keys返回的结果: ${key} is ${person4[key]}`);
});
// 使用 entries 获取键和值, 使用解构
Object.entries(person4).forEach(([key, value]) => {
  console.log(`遍历Object.entries返回的结果: ${key} is ${value}`);
});
// name is 前端小小
// age is 20