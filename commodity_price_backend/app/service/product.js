const BaseService = require('./base');
const NotFoundException = require('../exception/notFound');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const ParamException = require('../exception/param');


class ProductService extends BaseService {
  async getProductById(id) {
    const { app } = this

    const product = await app.model.Product.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['deleteTime']
      },
      // 使用 include 选项来包含关联的 Shop 模型
      include: [
        {
          model: app.model.Shop,
          as: 'shopInfo', // 使用在关联中定义的别名, 不能省略, 后续用作字段
          attributes: {
            exclude: ['deleteTime']
          },
        },
        {
          model: app.model.PriceHistory,
          as: 'priceHistoryList',
          attributes: {
            exclude: ['deleteTime']
          },
          include: [
            {
              model: app.model.Unit,
              as: 'unitInfo',
              attributes: {
                exclude: ['deleteTime']
              },
            }
          ]
        }
      ],
    });

    if (product === null) {
      throw new NotFoundException('product不存在', -1);
      // throw new Error(`product 不存在`);
    }

    // console.log(product.toJSON()) // 控制台打印查看原始查询结果

    /* 返回给前端的数据实际上是模型实例product的dataValues属性的值
    所以要操作这部分数据, 用到内部属性 dataValues, 拿到原始查询结果, 也可以用get方法(方便)

    如果关联多个表(模型), 每个模型实例Model的dataValues属性的值, 都是原始查询结果

    product.shopMap拿到的是模型实例上的属性, 已经被Sequelize包装了

    增加或删除属性得用 dataValues */

    /*
    模型实例对象的结构
    {
      "dataValues": {
        // 原始查询结果, 也就是数据库的字段, 一般是下划线命名
      },
      // Sequelize包装后的属性
      "shopMap": Model // 关联其他表用到的属性, as定义的别名
      // 其他Sequelize用来包装的属性
      // balabala一堆属性, 一般用不到
    }
    */

    // if (product.shopMap) {
    //   // 先把 Shop 模型, 原始查询结果的字段转为小驼峰
    //   product.shopMap = toSmallHump(product.shopMap.dataValues)
    //   // 模型实例.dataValues 拿到常见的json对象, 给json对象增加属性shopName
    //   product.dataValues.shopName = product.shopMap.shopName;
    //   // 给json对象删除属性shopMap
    //   // delete product.dataValues.shopMap
    //   delete product.shopMap
    // }

    return product;
  }

  async getProductList() {
    const { app } = this

    const list = await app.model.Product.findAll({
      attributes: ['id', 'productName']
      // attributes: {
      //   exclude: ['deleteTime']
      // }
    })

    return list
  }

  async addProductPriceHistory(bd) {
    const { app } = this
    const {
      productName, productAlias, price,
      unitId, buyTime, shopId,
      spec, note
    } = bd

    // 暂定Product表 productName, shopId, 这2字段确定唯一
    let product = await app.model.Product.findOne({
      where: {
        productName,
        shopId,
      },
      attributes: {
        exclude: ['deleteTime']
      }
    })

    // 如果没查到, 说明商品表应该增加一条
    if (!product) {
      product = await app.model.Product.create({ productName, productAlias, shopId });
    }

    const has = await this.hasDuplicateHistory(product.id, bd)
    // 如果没查到, 应该增加一条
    if (!has) {
      await app.model.PriceHistory.create({
        productId: product.id,
        price,
        unitId,
        spec,
        buyTime,
        note,
      });
    }
    else {
      throw new ParamException('数据重复');
    }

    return product.get('productName')
  }

  /* 怎么判断PriceHistory表的数据是否重复?
  只要buyTime有值且日期不重复, 不管时间, 就表示不一样
  productId price unitId
  先不管 折扣价和折扣, 规格也不管 */
  async hasDuplicateHistory(productId, bd) {
    const { app } = this
    const { price, unitId, buyTime } = bd

    const result = await app.model.PriceHistory.findOne({
      where: {
        [Op.and]: [
          /* Sequelize.where() // 高级查询 复杂查询
          Sequelize.fn() // SQL 函数调用 // 使用 Sequelize 的 fn 方法来调用 MySQL 的 DATE 函数
          Sequelize.col() // 列 // 这里字段名得用下划线
          Sequelize.literal() // 在查询中插入原始 SQL, 注意字符串的值得拼接, 单双引号交替用, 否则到sql语句那引号就没了, 导致sql语句出问题 // 注意 SQL 注入风险，最好使用参数化查询, */
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('buy_time')),
            Sequelize.literal(`${!buyTime ? "NULL" : "'" + buyTime + "'"}`)
          )
        ],
        productId,
        price,
        unitId,
      },
      attributes: {
        exclude: ['deleteTime']
      }
    });

    return result
  }

  /* 模糊查询商品名 */
  async getProductByName(query) {
    const { app } = this
    const { productName } = query

    const products = await app.model.Product.findAll({
      attributes: {
        exclude: ['deleteTime']
      },
      where: {
        productName: {
          [Op.like]: `%${productName}%`
        },
      },
      // order: [
      //   [Sequelize.literal('CONVERT(shop_id, UNSIGNED)'), 'ASC']
      // ],
      include: [
        {
          model: app.model.Shop,
          as: 'shopInfo', // 使用在关联中定义的别名, 不能省略, 后续用作字段
          attributes: {
            exclude: ['deleteTime']
          },
        }
      ]
    })

    return products
  }

  /* 查询商品价格历史 */
  async getProductPriceHistoryById(params) {
    const { app } = this
    const { productId } = params
    const history = await app.model.PriceHistory.findAll({
      attributes: {
        exclude: ['deleteTime']
      },
      where: {
        productId
      },
      order: [
        ['buyTime', 'ASC'],
      ],
      include: [
        {
          model: app.model.Unit,
          as: 'unitInfo',
          attributes: {
            exclude: ['deleteTime']
          },
        }
      ]
    })
    for (const item of history) {
      item.dataValues.unitName = item.unitInfo.get('unitName')
      delete item.dataValues.unitInfo
    }

    return history
  }

  /* 精准查询同一名字的商品, 含不同商店的 */
  async getProductListWithPriceByName(productName) {
    const { app } = this

    const products = await app.model.Product.findAll({
      attributes: {
        exclude: ['deleteTime']
      },
      where: {
        productName
      },
      include: [
        {
          model: app.model.Shop,
          as: 'shopInfo', // 使用在关联中定义的别名, 不能省略, 后续用作字段
          attributes: {
            exclude: ['deleteTime']
          },
        },
        {
          model: app.model.PriceHistory,
          as: 'priceHistoryList',
          attributes: {
            exclude: ['deleteTime']
          },
          include: [
            {
              model: app.model.Unit,
              as: 'unitInfo',
              attributes: {
                exclude: ['deleteTime']
              },
            }
          ]
        }
      ]
    })

    return products
  }
}

module.exports = ProductService;