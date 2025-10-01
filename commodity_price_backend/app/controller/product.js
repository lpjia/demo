const BaseController = require('./base');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const { toInt } = require('../utils');

/* 校验规则
只需要type属性就可以校验是否必填和数据类型
    不带?, 先校验必传某参, 后校验数据类型
    带?, 如果没传参, 则相安无事
      如果传参了, 则校验数据类型
    例子: int? 表示非必填, 但如果传了就要符合type数据类型
required属性, 是否必填
message属性, 自定义消息 */
const productRule = {
  productName: { type: 'string' },
  productAlias: { type: 'string?' },
  price: { type: 'number' },
  unitId: { type: 'int' },
  buyTime: { type: 'datetime?' },
  spec: { type: 'string?' },
  note: { type: 'string?' },
  shopId: { type: 'int' },
  // shopAlias: { type: 'string?' },
  // position: { type: 'string' },
  // positionAlias: { type: 'string?' },
}

// const idRule = {
//   id: { type: 'int' },
//   id2: { type: 'int' },
//   di2: { type: 'int?' },
//   mobilePhone: { type: 'mobilePhone' }, // 自定义校验规则
// }

class ProductController extends BaseController {
  async getProductById() {
    const { ctx, service } = this
    let { id } = ctx.params;
    ctx.validate(
      { id: { type: 'int' } },
      { id }
    )
    id = toInt(id)
    const data = await service.product.getProductById(id);
    this.success(data);
  }

  async getProductList() {
    const { service } = this
    const list = await service.product.getProductList();
    this.success(list);
  }

  async addProductPriceHistory() {
    const { ctx, service } = this

    // 校验参数
    ctx.validate(productRule)

    // 如果成功, 就直接提示, 不需要返回数据
    const name = await service.product.addProductPriceHistory(ctx.request.body)
    this.success(name);
  }

  async getProductByName() {
    const { ctx, service } = this
    ctx.validate(
      { productName: { type: 'string' } },
      ctx.query
    )
    const products = await service.product.getProductByName(ctx.query)
    this.success(products)
  }

  async getProductListWithPriceByName() {
    const { ctx, service } = this
    ctx.validate(
      { productName: { type: 'string' } },
      ctx.params
    )
    const { productName } = ctx.params
    const result = await service.product.getProductListWithPriceByName(productName)
    this.success(result)
  }

  async getProductPriceHistoryById() {
    const { ctx, service } = this
    ctx.validate(
      { productId: { type: 'int' } },
      ctx.params
    )
    const history = await service.product.getProductPriceHistoryById(ctx.params)
    this.success(history)
  }

  /* 补全没值的购买日期 */
  async insertBuyTime() {
    const { app, ctx } = this

    ctx.request.body
    ctx.validate(
      { startDate: { type: 'date' } }
    )
    const { startDate } = ctx.request.body
    const list = await app.model.PriceHistory.findAll({
      where: {
        buyTime: {
          [Op.is]: null
        }
      },
      attributes: {
        exclude: ['deleteTime']
      }
    })
    // let t = dayjs('2023-05-10')
    let t = dayjs(startDate)
      , lastT
    for (const item of list) {
      const id = item.get('id')
      const date = t.format('YYYY-MM-DD HH:mm:ss')
      await app.model.PriceHistory.update(
        { buyTime: date },
        {
          where: { id }
        }
      );
      t = t.add(1, 'd')
      lastT = t
    }
    this.success(lastT.format('YYYY-MM-DD'))
  }
}

module.exports = ProductController;