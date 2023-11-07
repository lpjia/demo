import { Context } from "koa";
import GoodsService from "../service/GoodsService";
import pagination from "../util/pagination";
import resp from "../util/resp";
// import { objKeyToOrmField_2 } from "../util/generalTools";
// import { objKeyToOrmField } from "../util/generalTools实现TS版";

class GoodsController {
  async getGoodsListByPage(ctx: Context) {
    const { query } = ctx.request
      , currPage = Number(query.currPage) // 限制为>0的整数
      , limit = Number(query.limit) // 限制为>0的整数
    // 这两个参都必须限制
    // , universalQueryFields = objKeyToOrmField_2(query, {
    //   exclude: ['currPage', 'limit']
    // })

    console.log('query: ', query)
    // console.log(universalQueryFields)

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.error(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    // const { rows, count } = await GoodsService.getGoodsListByPage({
    //   page: currPage,
    //   limit,
    //   universalQueryFields
    // })
    const param = { ...query, currPage, limit }
    const { rows, count } = await GoodsService.getGoodsListByPage(param)

    resp.success(ctx, {
      data: pagination(rows, {
        currPage,
        limit,
        total: count
      })
    })
  }


  async getGoodsList(ctx: Context) {
    const goodsList = await GoodsService.getGoodsList()
    resp.success(ctx, {
      data: goodsList
    })
  }
}

export default new GoodsController()