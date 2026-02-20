function isXiShuArray(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) {
      return true;
    }
  }
  return false;
}
/* 稀疏数组, 某些数组项不存在, 用index in 数组来判断
数组长度 !== 有值的数组项个数 */

console.log(
  isXiShuArray([10, 20, 30, ,])
)