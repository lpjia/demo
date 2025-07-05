/* 双指针
使用两个指针，右指针始终往右移动

如果右指针指向的值等于左指针指向的值，左指针不动。
如果右指针指向的值不等于左指针指向的值，那么左指针往右移一步，然后再把右指针指向的值赋给左指针。 */


function removeDuplicates(arr) {
  let left = 0
  let len = arr.length
  for (let right = 1; right < len; right++) {
    /* 如果左指针和右指针指向的值一样，说明有重复的，
    这个时候，左指针不动，右指针继续往右移。 */
    if (arr[left] !== arr[right]) {
      arr[++left] = arr[right]
    }
  }
  return ++left
}


let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] // 数组已做升序处理
let leftAddOne = removeDuplicates(arr)
console.log('leftAddOne: ', leftAddOne)
console.log('arr:', arr) // 已经改了原数组
console.log('result:', arr.slice(0, leftAddOne)) // 最后需要的结果