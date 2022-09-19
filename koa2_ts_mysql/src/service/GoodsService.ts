import { Op } from "sequelize";
import Goods from "../model/GoodsModel";

interface OptiByPage {
  currPage: number,
  limit: number,
  // universalQueryFields?: any,
  [key: string]: any
}

interface Obj {
  [key: string]: any
}


class GoodsService {
  getGoodsListByPage(options: OptiByPage) {
    const { currPage = 1, limit = 15, ...rest } = options
      , resultObj: Obj = {}

    for (const key in rest) {
      if (Object.hasOwnProperty.call(rest, key)) {
        const val = rest[key];
        resultObj[key] = {
          [Op.substring]: val
        }
      }
    }
    // console.log(resultObj)

    return Goods.findAndCountAll({
      // 分页
      offset: (currPage - 1) * limit,
      limit,

      // 选择要返回的字段, 不过一般前端需要的字段可能和这里的不一致, 所以一般会把字段全部返回
      // attributes: ['id', 'productName', 'unitPrice']

      /* 全匹配 */
      // where: {
      //   productName: '芹菜'
      // }

      /* AND */
      // where: {
      //  productName: '芹菜',
      //  unitPrice: '6',
      // }

      // 条件查询
      // 表格的分页查询条件, 一般是多条件 and 去模糊查询
      where: resultObj
      // where: {
      //   shopName: {
      //     [Op.substring]: '金',
      //   },
      //   productName: {
      //     [Op.substring]: '芹',
      //   }
      // },    

      // where: {
      //   [Op.and]: [ { productName: '芹菜' }, [unitPrice: '6'] ],
      // }
    })
  }


  getGoodsList() {
    return Goods.findAll()
  }
}

export default new GoodsService()