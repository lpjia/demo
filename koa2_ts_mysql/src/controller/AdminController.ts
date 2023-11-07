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
      return resp.error(ctx, { msg: '参数字段/值不符合要求, 请重传' })

    // 从数据库取数据
    const admin = await AdminService.getAdminById(id)
    // 查不出来的就返回 null
    if (admin === null)
      return resp.error(ctx, { msg: '管理员不存在' })

    // console.log(admin.name) // admin_2

    // 对数据加密
    const token = sign({ admin })

    resp.success(ctx, { data: { token } })

    // ctx.body = {
    //   token
    // }
  }


  async addAdmin(ctx: Context) {
    // 略过校验

    const data = ctx.request.body
    const row = await AdminService.getAdminOne(data)
    // 如果没找到
    if (row === null) {
      // const newRow = await AdminService.addAdmin(data)
      // return resp.success(ctx, {
      //   data: newRow
      // })
      return resp.success(ctx, {
        msg: '数据库查无此数据!'
      })
    } else {
      return resp.error(ctx, {
        msg: '数据已重复, 请修改后再传!'
      })
    }
  }

  async updateAdmin(ctx: Context) {
    // 略过校验

    // const { id } = ctx.request.query
    const { id } = ctx.params
    const data = ctx.request.body
    // const row = await AdminService.updateAdmin(id, data)
    // return resp.success(ctx, {
    //   data: row
    // })
  }

}

export default new AdminController()