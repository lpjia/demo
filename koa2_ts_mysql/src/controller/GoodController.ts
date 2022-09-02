import { Context } from "koa";
import { Model } from "sequelize-typescript";
import GoodService from "../service/GoodService";
import pagination from "../util/pagination";
import resp from "../util/resp";

class GoodController {
  async getGoodList(ctx: Context) {
    const { query } = ctx.request
    const currPage = Number(query.currPage)
    const limit = Number(query.limit) || 15

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.err(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    const { rows, count } = await GoodService.getGoodListByPage(currPage, limit)

    resp.succ(ctx, {
      data: pagination(rows, {
        currPage,
        limit,
        total: count
      })
    })
  }


  async getGood(ctx: Context) {
    const result = await GoodService.getGood()
    resp.succ(ctx, {
      data: result
    })
  }
}

export default new GoodController()