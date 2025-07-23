/* this, exports, module.exports */


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


// console.log(this, exports, module.exports)