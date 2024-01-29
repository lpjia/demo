/* 使用构造函数 */

function UIGoods(g) {
  this.data = g
  this.choose = 8
}
UIGoods.prototype.getTotalPrice = function () {
  return this.data.price * this.choose
}
UIGoods.prototype.isChoose = function () {
  return this.choose > 0
}

const uig = new UIGoods(goods[0])
console.log('uig:', uig)
// console.log(uig.getTotalPrice())
// console.log(uig.isChoose())