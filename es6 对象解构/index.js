
/* 对象解构
重命名用冒号:, 冒号后面是新变量名, 重命名后原变量名无效, 读原变量名会报错未定义
解构对象没有某个属性时, 那它的值就是undefined, 等于有这个属性但值为undefined
只有值为undefined时, 用默认赋值才有效, null则不行
不能解构null和undefined, 所以一般obj || {}, 提高程序健壮性
深层解构, 用冒号和{} */
const obj = {
  ename: 'objName',
  money: 100 ** 3,
  hasMoney: true,
  undefinedVar: undefined,
  nullVar: null, // 只有值为undefined可以用默认赋值
  address: '美国',
}
const {
  ename = 'defaultName' /* 无效 */,
  money,
  hasMoney: isRich,
  noExist,
  noExistWithDefaultValue = '默认赋值',
  undefinedVar = '赋值后',
  nullVar = false,
  address: addr = '中国' /* 有原属性 address, 所以默认赋值无效 */,
  city: town = 'zhonghe' /* 无原属性 city, 默认赋值有效, 还是符合"只有值为undefined时, 用默认赋值才有效, null则不行" */,
} = obj || {}
console.log('ename: ', ename)
console.log('money: ', money)
// console.log('hasMoney:', hasMoney) // 报错, 未定义
console.log('isRich: ', isRich)

console.log('noExist:', noExist)
console.log('noExistWithDefaultValue:', noExistWithDefaultValue)
console.log('undefinedVar:', undefinedVar)
console.log('nullVar:', nullVar)

// console.log('address:', address) // 报错, 未定义
console.log('addr:', addr)
console.log('town:', town)
console.log('---- 分割线 ----\n\n\n')



/* 深层解构
用类似重命名的方式(导致原变量名无效) */
const obj2 = {
  ename: 'this is obj2',
  child: {
    childName: 'this is childName',
    childAge: 1,
    childGender: 'male',
  }
}
const {
  ename: objName,
  child: { childName, childAge }, // 这里冒号说明原变量已经不存在了(未定义), 新变量用 {} 再次解构
  child, // 后续想要读 child 属性这个对象, 还得声明child
  parent: { parentName } = {}, // parent 属性不存在, 值为undefined, 如果没有默认赋值 = {}, 再次解构则会报错
} = obj2 || {}
console.log('objName: ', objName)
console.log('childName: ', childName)
console.log('childAge: ', childAge)

console.log('child: ', child)
console.log('child.childGender:', child.childGender)
console.log('parentName:', parentName)
console.log('---- 分割线 ----\n\n\n')




/* 变量值互换, 数组解构 */
// let a = 100, b = 80
let a = 100
let b = 80
console.log('a: ', a)
console.log('b: ', b)
console.log('解构后互换值'); // 这里要必须加分号;
[a, b] = [b, a]
console.log('a: ', a)
console.log('b: ', b)
console.log('---- 分割线 ----\n\n\n')