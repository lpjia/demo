import { Context } from "koa";
import GoodsService from "../service/GoodsService";
import pagination from "../util/pagination";
import resp from "../util/resp";

class GoodsController {
  async getGoodsListByPage(ctx: Context) {
    const { query } = ctx.request
    const currPage = Number(query.currPage)
    const limit = Number(query.limit) || 15

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.err(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    const { rows, count } = await GoodsService.getGoodsListByPage(currPage, limit)

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