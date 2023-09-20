/* 双指针 */
function removeDuplicates(arr) {
  let left = 0
  let leng = arr.length
  for (let right = 1; right < leng; right++) {
    /* 如果左指针和右指针指向的值一样，说明有重复的，
    这个时候，左指针不动，右指针继续往右移。
    如果他俩指向的值不一样就把右指针指向的值往前挪 */
    if (arr[left] !== arr[right]) {
      arr[++left] = arr[right]
    }
  }
  return ++left
}

// 数组已做升序处理
let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
let leng = removeDuplicates(arr)
console.log('leng: ', leng)
console.log('arr:', arr)
console.log('result:', arr.slice(0, leng))