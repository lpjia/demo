/* 递归的特点
调用自身
终止条件 */

/* 虽然尾递归形式本身可能更简洁，但引入的额外参数（特别是累积器）和逻辑顺序的改变，有时会‌降低代码的直观性和可理解性 */


/* 尾递归
递归调用是函数的最后一步操作（直接返回结果，无后续计算）
一般都需要累积器, 有些不好改成尾递归
终止条件那, 一般需要返回累积器

将递归依赖的中间状态通过参数显式传递（如 acc），确保递归调用是最后一步操作

wei(n-1, acc+n) 每次递归调用后, 不再需要保留n的上下文, 直接就计算了 */
function wei(n, acc = 1) {
  return n === 1 ? acc : wei(n - 1, acc + n)
}
console.log(
  wei(100)
)


/* 普通递归
递归较深时, 容易栈溢出 */
function calcSum(n) {
  if (n <= 0) {
    return 0;
  }
  return n + calcSum(n - 1)
  // 每次递归调用后需要保留 n 的上下文，以便返回时进行加法计算
}
console.log(
  calcSum(100)
)



// x的n次方, 也就是n个x相乘
function pow(x, n) {
  if (n <= 0) {
    throw new Error('二参得大于0')
  }
  return n === 1 ? x : x * pow(x, n - 1) // 普通递归
}
console.log(
  pow(2, 10),
  pow(5, 3)
)

function powWei(x, n, acc = x) {
  if (n <= 0) {
    throw new Error('二参得大于0')
  }
  return n === 1 ? acc : powWei(x, n - 1, acc * x) // 尾递归
}
console.log(
  powWei(2, 10),
  powWei(5, 3)
)




async function sum(n, prevSum = 0) {
  if (n <= 1) return n + prevSum;
  return await Promise.resolve().then(() => sum(n - 1, n + prevSum))
}
sum(100).then(console.log)