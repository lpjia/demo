export { }


console.time("计时器");
// 用数组来存数字, 明显速度快很多
const fibo = (n: number) => {
  let arr: bigint[] = new Array(n).fill(null);
  arr[0] = 0n;
  arr[1] = 1n;
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};
let big = fibo(2000)
console.log(big);
let bigStr = big.toString(10)
console.log('转成字符串用来显示:', bigStr)
let leng = bigStr.length
console.log('大整数的长度:', leng);
console.timeEnd("计时器");

console.log('\n')




console.log('JS最大安全精度数字:', Number.MAX_SAFE_INTEGER)
console.log('长度:', Number.MAX_SAFE_INTEGER.toString().length)

console.log('\n')


console.time("计时器2");
// 递归, 调用自身, 容易栈溢出, 还慢
const fibo2 = (n: number): any => {
  if (n === 0) return 0
  if (n === 1) return 1
  if (n >= 2) return fibo2(n - 1) + fibo2(n - 2)
}
let count = fibo2(44)
console.log(count)
console.log('长度:', count.toString().length)
console.timeEnd("计时器2");