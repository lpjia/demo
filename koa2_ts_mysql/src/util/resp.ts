import { Context } from "koa";

// 小的接口或者类型定义, 直接放旁边, 不用去组织管理相应文件, 多了还是单独拿出来
interface Opti {
  data?: any,
  msg?: string,
  code?: number,
}

// 返回响应统一处理
export default {
  succ(ctx: Context, option: Opti) {
    const { data = null, msg = 'success', code = 200 } = option
    ctx.body = {
      code,
      msg,
      data
    }
  },

  err(ctx: Context, option: Opti) {
    const { data = null, msg = 'fail', code = 400 } = option
    ctx.body = {
      code,
      msg,
      data
    }
  }
}