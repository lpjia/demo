let a = 5
  , b = 3;

/* 方案一 */
// let temp = a
// a = b
// b = temp


/* 方案二 */
// a = a + b
// b = a - b
// a = a - b


/* 方案三 */
// a = a ^ b
// b = a ^ b
// a = a ^ b


/* 方案四 */
[a, b] = [b, a]

console.log(a, b)