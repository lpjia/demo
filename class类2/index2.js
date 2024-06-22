// 面向对象编程 OOP, 不推荐增加或删除属性等, 可以修改属性值
/* 分析有什么对象(事物/东西)
对象有什么状态/属性
对象有什么行为/方法 */

/* 有什么东西→商品 购物车

商品有什么状态→名称 单价 选了几个 描述 月销量 好评率
商品有什么行为→数量加 减 计算单商品的总价

购物车有什么状态→商品 配送价格 配送门槛
购物车有什么行为→计算所有商品的总价 */

class Goods {
  constructor({ title, price, chooseNum = 0 } = {}) {
    this.title = title;
    this.price = price;
    this.chooseNum = chooseNum;
  }

  getTotalPrice() {
    return this.price * this.chooseNum;
  }

  isChoose() {
    return this.chooseNum > 0;
  }

  increase() {
    this.chooseNum++;
  }

  decrease() {
    if (this.chooseNum > 0) this.chooseNum--;
  }
}

class Car {
  goods // 商品
  deliveryPrice // 配送价格
  deliveryThreshold // 配送门槛

  constructor({ goods = [] } = {}) {
    this.goods = goods;
  }

  getTotalPrice() {
    return this.goods.reduce(
      (accu, curr) => accu + curr.getTotalPrice(),
      this.deliveryPrice
    );
  }
}

const goods = new Goods({
  title: '咖啡',
  price: 20,
  chooseNum: 1,
});
const goods2 = new Goods({
  title: '果茶',
  price: 10,
  chooseNum: 2,
});
const goods3 = new Goods({
  title: '奶茶',
  price: 30,
  chooseNum: 3,
});
const goodsList = [goods, goods2, goods3]
const car = new Car()
car.goods

console.log(car)