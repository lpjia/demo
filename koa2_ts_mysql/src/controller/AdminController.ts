import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"
import response from "../util/response"

interface QueryId {
  id: string
}

class AdminController {
  async two(ctx: Context) {
    const param = ctx.request.query

    // 从数据库取数据
    const admin = await AdminService.getAdminById(Number(param.id))
    if (admin === null) return response.err(ctx, { msg: '管理员不存在' })
    console.log(admin)

    // 对数据加密
    const token = sign({ admin })

    response.succ(ctx, { data: { token } })

    // ctx.body = {
    //   token
    // }
  }

}

export default new AdminController()