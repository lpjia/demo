const user = {
  name: 'yuan',
  age: 28,
}

function tagname() {
  /* arguments是一个类数组
  索引0项是一个数组, 数组由${}切割开的字符串组成, 最后可能有一个空字符串
  其他索引项依次是${}的值 */
  console.log(
    arguments,
    Array.isArray(arguments[0]),
  )

  /* 返回什么, 下面的hi就接收什么 */
  return tagname
}

/* 在模板字符串前面加一个标签名
其实本质上是在调用函数
得先定义函数, 否则报错 */
const hi = tagname`My name is ${user.name}, I'm ${user.age} years old`
  /* 接着书写模板字符串
  会连着调用 */
  `123${user.age}`

console.log(hi)