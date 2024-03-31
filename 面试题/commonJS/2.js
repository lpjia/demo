console.log('开头的 this:', this)

this.a = 1
exports.b = 2
exports = {
  c: 3
}
module.exports = {
  d: 4,
  g: {
    h: [10, 11, 12]
  }
}
exports.e = 5
this.f = 6

console.log('结尾的 this:', this)