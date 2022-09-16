import { Context } from "koa";
import GoodsService from "../service/GoodsService";
import pagination from "../util/pagination";
import resp from "../util/resp";

class GoodsController {
  async getGoodsListByPage(ctx: Context) {
    const { query } = ctx.request
      , currPage = Number(query.currPage)
      , limit = Number(query.limit)
      , universalQueryFields = {
        productName: query.productName || '',
        unitPrice: query.unitPrice || '',
        shopName: query.shopName || '',
      }
    console.log('query: ', query)

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.err(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    const { rows, count } = await GoodsService.getGoodsListByPage({
      page: currPage,
      limit,
      universalQueryFields
    })

    resp.succ(ctx, {
      data: pagination(rows, {
        currPage,
        limit,
        total: count
      })
    })
  }


  async getGoodsList(ctx: Context) {
    const goodsList = await GoodsService.getGoodsList()
    resp.succ(ctx, {
      data: goodsList
    })
  }
}

export default new GoodsController()