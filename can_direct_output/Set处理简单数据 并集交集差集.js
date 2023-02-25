// 不能出现重复项, 得到的结果是一个新数组
const arr1 = [33, 22, 55, 33, 11, 44, 5]
const arr2 = [22, 55, 77, 88, 99, 99, 11]


// 并集
const union = [...new Set([...arr1, ...arr2])]
console.log('union:', union)

// 交集
const cross = [...new Set(arr1)].filter(item => arr2.includes(item))
console.log('cross:', cross)

// 差集
const diff = union.filter(item => !cross.includes(item))
console.log('diff:', diff)