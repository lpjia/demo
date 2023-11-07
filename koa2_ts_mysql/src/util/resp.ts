import { Context } from "koa";

// 小的接口或者类型定义, 直接放旁边, 不用去组织管理相应文件, 多了还是单独拿出来
interface Opti {
  data?: any,
  msg?: string,
  code?: number,
}

// 返回响应统一处理
// 考虑到方法名都是简写, 且重复率高, 所以用默认导出
export default {
  success(ctx: Context, option?: Opti) {
    const data = option?.data || null
      , msg = option?.msg || 'success'
      , code = option?.code || 200
    // const { data = null, msg = 'success', code = 200 } = option ?
    ctx.body = {
      code,
      msg,
      data
    }
  },

  error(ctx: Context, option?: Opti) {
    // const { data = null, msg = 'fail', code = 400 } = option
    const data = option?.data || null
      , msg = option?.msg || 'fail'
      , code = option?.code || 400
    ctx.body = {
      code,
      msg,
      data
    }
  }
}