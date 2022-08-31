import { Context } from "koa"
import AdminService from "../service/AdminService"
import { sign } from "../util/auth"
import response from "../util/response"

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

    response.succ(ctx,
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