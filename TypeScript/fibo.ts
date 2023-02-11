console.time("计时器");
let fibo = (n: number): bigint => {
  let arr: bigint[] = new Array(n).fill(null);
  arr[0] = 0n;
  arr[1] = 1n;
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};
let big = fibo(20000)
console.log(big);
let leng2 = big.toString().length
console.log('大整数的长度: ', leng2);
console.timeEnd("计时器");
