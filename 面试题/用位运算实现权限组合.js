// const READ = 1
// const CREATE = 2
// const UPDATE = 3
// const DELETE = 4
// const READ_AND_UPDATE = 5
/* 如果按常规的这样定义, 权限组合得手动定义很多变量, 不推荐 */

/* 用二进制去存, 好处是存储空间小, 传输的数据量也小, 运算也方便 */
const READ = 0b1        // 0001
const CREATE = 0b10     // 0010
const UPDATE = 0b100    // 0100
const DELETE = 0b1000   // 1000

// 组合权限, 用或运算 |
const permission = READ | UPDATE | DELETE
console.log(
  permission.toString(2)
)

const permission2 = READ | CREATE
console.log(
  permission2.toString(2)
)

// 判断是否有某些权限, 用与运算 &, 结果不为0就是有该权限
function hasPermission(taget, permission) {
  if ((taget & permission) !== 0) {
    console.log('有权限')
    return true
  }
  else {
    console.log('无权限')
    return false
  }
}
hasPermission(permission, CREATE)

// 删除权限, 用异或运算 ^, 异或运算就是两个一样为0, 不一样为 1
// 不过没权限的进行异或运算也会加上该权限, 即切换权限
const permission3 = permission ^ READ ^ UPDATE
console.log(
  permission3.toString(2),
)
hasPermission(permission3, CREATE)

// 如果不想切换权限, 仅仅想删掉权限, 可以先判断有没有该权限
// 有该权限才 ^, 删掉权限
function deletePermission(taget, permission) {
  if (hasPermission(taget, permission)) {
    return taget ^ permission
  }
  return taget
}
const permission4 = deletePermission(permission2, CREATE)
console.log(
  permission4.toString(2),
)