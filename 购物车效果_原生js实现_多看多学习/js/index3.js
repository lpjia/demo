/* 使用class */
// console.log('goods:', goods)

// 单件商品的数据
class UIGoods {
  choose = 0 // 明确指出这是类的一部分, 而不是外面传参进来的

  constructor(g) {
    this.data = g
  }

  getTotalPrice() {
    return this.data.price * this.choose
  }

  isChoose() {
    return this.choose > 0
  }

  increase() {
    this.choose++
    // console.log('this.choose:', this.choose)
  }

  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--
    // console.log('this.choose:', this.choose)
  }
}


// 整个界面的数据
class UIData {
  deliveryThreshold = 30 // 起送门槛
  deliveryPrice = 5 // 配送价格

  uiGoods = goods.map(item => new UIGoods(item))

  // constructor() {
  //   this.uiGoods = goods.map(item => new UIGoods(item))
  // }

  getTotalPrice() {
    return this.uiGoods.reduce((acc, item) => {
      acc += item.getTotalPrice()
      return acc
    }, 0)
  }

  increase(index) {
    this.uiGoods[index].increase()
  }

  decrease(index) {
    this.uiGoods[index].decrease()
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose()
  }
  // 以上4个方法, 也对应了UIGoods类的4个方法

  getTotalChoose() {
    return this.uiGoods.reduce((acc, item) => {
      acc += item.choose
      return acc
    }, 0)
  }

  // 购物车有没有东西
  hasGoodsInCar() {
    return this.getTotalChoose() > 0
  }

  // 是不是跨过了起送门槛
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold
  }

  // calcDiffDeliveryThreshold() {
  //   return Math.round(this.deliveryThreshold - this.getTotalPrice())
  // }
}

// 整个界面
class UI {
  constructor() {
    this.uiData = new UIData()
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
      totalPrice: document.querySelector('.footer-car-total'),
      car: document.querySelector('.footer-car'),
      badge: document.querySelector('.footer-car-badge'),
    }

    const carRect = this.doms.car.getBoundingClientRect()
    let jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    }
    this.jumpTarget = jumpTarget

    this.createHTML()
    this.updateFooter()
    this.listenEvent()
  }

  // 监听各种事件
  listenEvent() {
    // 动画完成后, 去掉类样式, 否则动画只会执行一次, 无法执行多次
    this.doms.car.addEventListener('animationend', function () {
      // console.log('this:', this) // 谁监听, this就指向谁
      this.classList.remove('animate')
    })
  }

  // 根据商品数据创建商品列表元素
  createHTML() {
    // 1. 生成 html 字符串(执行效率低, 开发效率高)
    // 2. 一个一个创建元素(执行效率高, 开发效率低)
    let htmlStr = ''
    for (const [index, g] of this.uiData.uiGoods.entries()) {
      // console.log('g:', g)
      const { pic, title, desc,
        sellNumber, favorRate, price } = g.data
      htmlStr += `<div class="goods-item">
        <img src="${pic}" alt="" class="goods-pic">
        <div class="goods-info">
          <h2 class="goods-title">${title}</h2>
          <p class="goods-desc">
            ${desc}
          </p>
          <p class="goods-sell">
            <span>月售 ${sellNumber}</span>
            <span>好评率${favorRate}%</span>
          </p>
          <div class="goods-confirm">
            <p class="goods-price">
              <span class="goods-price-unit">￥</span>
              <span>${price}</span>
            </p>
            <div class="goods-btns">
              <i class="iconfont i-jianhao" data-index="${index}"></i>
              <span>${g.choose}</span>
              <i class="iconfont i-jiajianzujianjiahao"  data-index="${index}"></i>
            </div>
          </div>
        </div>
      </div>`
    }
    this.doms.goodsContainer.innerHTML = htmlStr
  }

  increase(index) {
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.jump(index)
  }

  decrease(index) {
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }

  // 更新某个商品元素的显示状态
  updateGoodsItem(index) {
    let goodsDom = this.doms.goodsContainer.children[index]
    // console.log('goodsDom:', goodsDom)
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add('active')
    }
    else {
      goodsDom.classList.remove('active')
    }
    goodsDom.querySelector('.goods-btns span').textContent = this.uiData.uiGoods[index].choose
  }

  updateFooter() {
    let total = this.uiData.getTotalPrice()
    this.doms.totalPrice.textContent = new Big(total).toFixed(2)

    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`

    if (this.uiData.hasGoodsInCar()) {
      this.doms.car.classList.add('active')
    }
    else {
      this.doms.car.classList.remove('active')
    }

    this.doms.badge.textContent = this.uiData.getTotalChoose()

    if (this.uiData.isCrossDeliveryThreshold()) {
      this.doms.footerPay.classList.add('active')
    }
    else {
      this.doms.footerPay.classList.remove('active')
      const diff = new Big(this.uiData.deliveryThreshold - total).round(2)
      this.doms.footerPayInnerSpan.textContent = `还差￥${diff}元起送`
    }
  }

  // 购物车动画
  carAnimate() {
    this.doms.car.classList.add('animate')
  }

  // 抛物线跳跃的元素
  jump(index) {
    const btnAdd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao')
    const btnAddRect = btnAdd.getBoundingClientRect()
    const start = {
      x: btnAddRect.left,
      y: btnAddRect.top,
    }

    const divDom = document.createElement('div')
    divDom.className = 'add-to-car'
    const iDom = document.createElement('i')
    iDom.className = 'iconfont i-jiajianzujianjiahao'
    // 抛物线, 两个方向分开来控制
    iDom.style.transform = `translateY(${start.y}px)`
    divDom.style.transform = `translateX(${start.x}px)`
    divDom.appendChild(iDom)
    document.body.appendChild(divDom)

    /* 先执行完js, 渲染主线程才会渲染 */
    // 强行渲染
    // reflow就行, 读它的任何一个布局属性都会导致强行渲染
    divDom.clientWidth

    iDom.style.transform = `translateY(${this.jumpTarget.y}px)`
    divDom.style.transform = `translateX(${this.jumpTarget.x}px)`

    divDom.addEventListener('transitionend', (e) => {
      // console.log('过渡完成')
      // console.log(e.target)
      divDom.remove()
      this.carAnimate()
    }, { once: true }) // 不加的话, 事件会触发两次, e.target依次是div i
  }
}

// const uig = new UIGoods(goods[0])
// console.log('uig:', uig)

// const ui = new UIData()
// console.log('ui:', ui)

const ui = new UI()
console.log('ui:', ui)

ui.doms.goodsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    ui.increase(Number(e.target.dataset.index))
  }
  else if (e.target.classList.contains('i-jianhao')) {
    ui.decrease(Number(e.target.dataset.index))
  }
})