/* 数据分组 */

const persons = [
  { name: 'Edward', score: 21, age: 22, gender: 'female' },
  { name: 'Sharpe', score: 97, age: 24, gender: 'male' },
  { name: 'And', score: 45, age: 24, gender: 'female' },
  { name: 'The', score: 82, age: 22, gender: 'male' },
  { name: 'Magnetic', score: 100, age: 22, gender: 'female' },
  { name: 'Zeros', score: 7, age: 25, gender: 'male' },
  { name: 'Jack', score: 67, age: 22, gender: 'female' },
]

// 按照年龄分组
/* {
  '22': [{}, {}],
  '24': [{}, {}],
} */


// const result = {}
// for (const person of persons) {
//   const k = person['age'] // 按照年龄分组
//   if (!result[k]) {
//     result[k] = []
//   }
//   result[k].push(person)
// }
// console.log(result)


// function groupBy(arr, propName){
//   const result = {}
//   for (const obj of arr) {
//     const k = obj[propName] // 封装成更通用的, 这里会变化
//     if (!result[k]) {
//       result[k] = []
//     }
//     result[k].push(obj)
//   }
//   return result
// }

// console.log(
//   // groupBy(persons, 'age'), // 按照年龄分组
//   // groupBy(persons, 'gender'), // 按照性别分组
// )


function groupBy(arr, generateKey) {
  const result = {}
  for (const obj of arr) {
    const k = generateKey(obj) // 调用函数, 函数可以很灵活的返回想要的任何结构(数据)
    if (!result[k]) {
      result[k] = []
    }
    result[k].push(obj)
  }
  return result
}

console.log(
  // groupBy(persons, (item) => item.age), // 按照年龄分组
  groupBy(persons, (item) => item.gender), // 按照性别分组
  // groupBy(persons, (item) => `${item.gender}-${item.age}`), // 按照性别-年龄分组
  // groupBy(persons, (item) => item.score % 2 === 0 ? '偶数' : '奇数'), // 分数按照奇/偶数分组
)

// const nums = [4, 2, 7, 8, 6, 5, 1]
// console.log(
//   groupBy(nums, (item) => item % 2 === 0 ? '偶数' : '奇数'), // 分数按照奇/偶数分组
// )


/* 有现成的库
R.groupBy()
_.groupBy() */