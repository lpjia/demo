import { Op } from "sequelize/types";
import Goods from "../model/GoodsModel";


interface OptiByPage {
  page: number,
  limit: number,
  universalQueryFields?: any,
}


// 传到这里的数据要能直接用的
class GoodsService {
  // getGoodsListByPage(page: number, limit: number, where?: any) {
  getGoodsListByPage(obj: OptiByPage) {
    const { page = 1, limit = 15, universalQueryFields } = obj
    return Goods.findAndCountAll({
      // 分页
      offset: (page - 1) * limit,
      limit,

      /* 全匹配 */
      // where: {
      //   productName: '芹菜'
      // }
      // where: universalQueryFields,
      // where: {
      //  productName: '芹菜',
      //  unitPrice: '6',
      // }
      where: {
        // [Op.or]:
      },

      // 选择要返回的字段, 不过一般前端需要的字段可能和这里的不一致, 所以一般会把字段全部返回
      attributes: ['productName', 'unitPrice']
    })
  }



  getGoodsList() {
    return Goods.findAll()
  }
}

export default new GoodsService()