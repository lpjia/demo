// 传入函数实参
function one(callback) {
  console.log('one()')
  callback()
}
function two() {
  console.log('two()')
}
one(two)
console.log('---- 分割线 ----\n\n\n')


// callback()
function three(callback) {
  console.log('three()')
  return callback()
}
function four() {
  console.log('four()')
  return 'return four()'
}
let four2 = three(four)
console.log('four2:', four2)
console.log('---- 分割线 ----\n\n\n')


// callback
function five(callback) {
  console.log('five()')
  return callback
}
let five2 = five(four)
console.log('five2:', five2)
console.log('---- 分割线 ----\n\n\n')