import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"
import resp from "../util/resp"

class AdminController {
  async two(ctx: Context) {
    const param = ctx.request.query

    /**
     * GET 请求, 参数只有查询字符串, 没传则取字段的时候是 undefined, 转数字是 NaN
     * 字符串转数字, 只有两种情况
     * 能转的, 正常转
     * 不能转的, 全转为 NaN, typeof NaN 还是 number 类型
     */
    const id = Number(param.id)
    // 这个参数校验, 其实不应该放这里
    if (Number.isNaN(id))
      return resp.err(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    // 从数据库取数据
    const admin = await AdminService.getAdminById(id)
    // 查不出来的就返回 null
    if (admin === null)
      return resp.err(ctx, { msg: '管理员不存在' })

    // console.log(admin.name) // admin_2

    // 对数据加密
    const token = sign({ admin })

    resp.succ(ctx, { data: { token } })

    // ctx.body = {
    //   token
    // }
  }

}

export default new AdminController()