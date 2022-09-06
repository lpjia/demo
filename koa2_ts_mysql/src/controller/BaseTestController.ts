import { Context } from "koa";
import BaseTestService from "../service/BaseTestService";
import pagination from "../util/pagination";
import resp from "../util/resp";

class BaseTestController {
  async getListByPage(ctx: Context) {
    const { query } = ctx.request
    const currPage = Number(query.currPage)
    const limit = Number(query.limit) || 15

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.err(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    const { rows, count } = await BaseTestService.getListByPage(currPage, limit)

    resp.succ(ctx, {
      data: pagination(rows, {
        currPage,
        limit,
        total: count
      })
    })
  }
}

export default new BaseTestController()