/* 可选链操作符
当?.左边的值是 undefined 或 null 时, 不会再运算右边的, 会直接返回结果, 结果就是 undefined

使用场景是: 当'存在'时, 才返回后面的运算结果, '不存在'时, 直接返回 undefined 而不会报错 */
const user = {} // 可以为任意值, 一般是对象
console.log('user?.address?.street: ', user?.address?.street)


if (user && user.address && user.address.street) {
  // 以前会这样处理, 写很多重复的, 确保属性存在, 很呆
}


/* ES2020的新特性 */