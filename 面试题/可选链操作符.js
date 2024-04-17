/* 可选链操作符
当?.左边的值是 undefined 或 null 时, 不会再运算右边的, 会直接返回结果, 结果就是 undefined */
const user = {} // 可以为任意值
console.log('user?.address?.street: ', user?.address?.street)


if (user && user.address && user.address.street) {
  // 以前会这样处理, 写很多重复的, 很呆
}


/* ES2020的新特性 */