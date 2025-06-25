/* 根据规范，对象的属性键只能是 string 类型或者 Symbol 类型。
如果不是, 则会进行隐式转换, 都转为字符串 */
let shu_xing = Symbol('sx')
  , shu_xing2 = Symbol('sx2')

let obj = {
  // Symbol类型一般得用变量存, 否则再也获取不到, 因为唯一性
  [shu_xing]: shu_xing,
  [shu_xing2]: shu_xing2,
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
console.log(
  obj[Symbol('sx3')], // undefined
  obj[shu_xing], // Symbol(sx)
)


console.log("obj[null]:",
  obj[null] // "str null"
)
console.log("obj[undefined]:",
  obj[undefined] // "str undefined"
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




/* 对象解构, 变量更名 */
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