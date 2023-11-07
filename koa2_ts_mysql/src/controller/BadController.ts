import { Context } from "koa";
import BadService from "../service/BadService";
import pagination from "../util/pagination";
import resp from "../util/resp";
import { formatTime } from "../util/time";

class BadController {
  async getBadList(ctx: Context) {
    const { query } = ctx.request
    const currPage = Number(query.currPage)
    const limit = Number(query.limit) || 15

    if (Number.isNaN(currPage) || Number.isNaN(limit))
      return resp.error(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    const { rows, count } = await BadService.getBadListByPage(currPage, limit)
    const result = rows.map(item => formatTime(item))

    resp.success(ctx, {
      data: pagination(result, {
        currPage,
        limit,
        total: count
      })
    })
  }
}

export default new BadController()