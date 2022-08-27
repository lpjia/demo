import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"

class LoginController {
  async two(ctx: Context) {
    // 拿出一条数据
    const admin = await AdminService.getAdmin()
    // 对数据加密
    const token = sign({ admin })
    ctx.body = {
      token
    }
  }

}

export default new LoginController()