/* 数组去重
两个属性相同的对象也认为是重复的 */
function equals(value1, value2) {
  // 任意一个是原始值
  if (isPrimitive(value1) || isPrimitive(value2)) {
    return Object.is(value1, value2)
  }
  const entries1 = Object.entries(value1);
  const entries2 = Object.entries(value2);
  // Object.entries 返回每一个属性和值组成的二维数组, 长度就是属性的个数
  // 2个二维数组的长度不一样
  if (entries1.length !== entries2.length) {
    return false;
  }
  for (const [key, value] of entries1) {
    // value2[key] !== value
    // 考虑到 value2[key] 可能是对象, 这里用递归
    if (!Object.prototype.hasOwnProperty.call(value2, key) || !equals(value, value2[key])) {
      return false;
    }
  }
  return true;
}
function uniqueArray(arr) {
  // 使用传统的去重方式
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item1 = arr[i];
    let isFind = false;
    for (let j = 0; j < result.length; j++) {
      const item2 = result[j];
      if (equals(item1, item2)) {
        isFind = true;
      }
    }
    if (!isFind) {
      result.push(item1);
    }
  }
  return result;
}
function isPrimitive(value) {
  return null === value || !['object', 'function'].includes(typeof value)
}

// console.log(
//   isPrimitive({}),
//   isPrimitive(Symbol('symbol')),
// )

// console.log(
//   equals({ a: 1, b: 2, c: 3 }, { b: 2, a: 3 }),
//   equals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }),
// )

const arr = [
  { a: 1, b: 2 },
  { a: 1, b: 2 },
]
// const arr = [
//   { a: 1, b: undefined },
//   { a: 1, c: undefined },
// ]
console.log(
  uniqueArray(arr),
)
// console.log(
//   equals(arr[0], arr[1])
// )