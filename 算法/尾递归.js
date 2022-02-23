/**
 * 尾递归
 * wei(n-1, a*n) 调用后不再需要一步计算的过程
 * 
 */
function wei(n, a = 1) {
  return n === 1 ? a : wei(n - 1, a * n)
}
wei(5)





/**
 * 这种写法挺别致的, 暂时不清楚有什么用
 */
const sum = async (n, prevSum = 0) => {
  if (n <= 1) return n + prevSum;
  return await Promise.resolve().then(() => sum(n - 1, n + prevSum))
}
sum(10).then(console.log)