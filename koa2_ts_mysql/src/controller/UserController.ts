import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"
import resp from "../util/resp"

// 注册和添加用户是一个接口

class UserController {
  async two(ctx: Context) {
    // 拿出一条数据
    const admin = await AdminService.getAdmin()
    // 对数据加密
    const token = sign({ admin })

    // ctx.body = {
    //   token
    // }

    resp.success(ctx,
      {
        data: { token }
      }
    )
  }

  register() {

  }

  getById() {

  }


  add() {

  }

  update() {

  }

  remove() {

  }



}

export default new UserController()