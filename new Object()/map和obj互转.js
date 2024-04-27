
const person = {
  name: '前端小小',
  age: 20
};

/* 使用 Object.keys 来获取键 */
console.log("Object.keys(person):",
  Object.keys(person) // ['name', 'age']
)

/* 使用 Object.entries 来获取键和值, 组成二维数组, 键值对在一个子数组里 */
console.log("Object.entries(person):",
  Object.entries(person) // [ ['name', '前端小小'], ['age', 20] ]
)

Object.keys(person).forEach((key) => {
  console.log(`遍历Object.keys返回的结果: ${key}`);
});
// name
// age

/* 使用解构赋值 */
Object.entries(person).forEach(([key, value]) => {
  console.log(`遍历Object.entries返回的结果: ${key} is ${value}`);
});
// name is 前端小小
// age is 20


/* obj和map互转 */
const m = new Map(Object.entries(person)) // obj -> map
console.log('m:', m)
console.log("m.get('age'):",
  m.get('age')
)
console.log("m.get('name'):",
  m.get('name')
)
const o = Object.fromEntries(m) // map -> obj
console.log('o:', o)