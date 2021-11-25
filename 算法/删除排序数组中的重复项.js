function judgeNotEmpty(param) {
  let judgeObj = p => {
    if (p === null) return false // 是 null
    else if (Array.isArray(p)) return p.length ? true : false // 是数组
    else return JSON.stringify(p) === '{}' ? false : true // 是对象
  }
  let type = typeof (param)
  switch (type) {
    case 'string': case 'number': case 'undefined': case 'boolean':
      return !!param
    case 'object':
      return judgeObj(param)
    default:
  }
}


/**
 * 双指针
 */
function removeDuplicates(arr) {
  if (!judgeNotEmpty(arr)) return 0
  let left = 0
  let leng = arr.length
  for (let right = 1; right < leng; right++) {
    /**
     * 如果左指针和右指针指向的值一样，说明有重复的，
     * 这个时候，左指针不动，右指针继续往右移。
     * 如果他俩指向的值不一样就把右指针指向的值往前挪
     */
    if (arr[left] !== arr[right]) arr[++left] = arr[right]
  }
  return ++left
}

// 数组已做升序处理
let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
let leng = removeDuplicates(arr)
console.log('leng: ', leng)
console.log(arr.slice(0, leng))