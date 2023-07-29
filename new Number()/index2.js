/* 数字分隔符
可以使用下划线作为数字分隔符，这样可以方便地计算数字中0的个数。 */


// 难以阅读
const billion = 1000000000;

// 易于阅读
const readableBillion = 1_000_000_000;

console.log(readableBillion) //1000000000
// 配合着 .toLocaleString() 可以更直观
console.log(readableBillion.toLocaleString()) // "1,000,000,000"



// 也可以用于 BigInt
const trillion = 1_000_000_000_000n; // 万亿

console.log(trillion); // 1000000000000
console.log(trillion.toLocaleString()); // "1,000,000,000,000"