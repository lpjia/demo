console.log('goods:', goods)

function createUIGoods(g) {
  return {
    choose: 0, // 为了和原始数据区分, 这是后加的数据, 缺了选中数量
    data: g // 原始数据
  }
}
const uig = createUIGoods(goods[0])
console.log('uig:', uig)
// 想要的就是这个对象, 怎么创建出来这种对象呢?
// 使用构造函数