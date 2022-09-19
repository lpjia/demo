import resp from "../util/resp"
import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"

class LoginController {
  async login(ctx: Context) {
    const a = ctx.request.body
    console.log('a: ', a)

    // 拿出一条数据
    const admin = await AdminService.getAdmin()
    // 对数据加密
    const token = sign({ admin })

    resp.succ(ctx, {
      data: { token }
    })
  }

}

export default new LoginController()