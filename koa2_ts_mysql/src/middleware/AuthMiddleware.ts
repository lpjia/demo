import { Context, Next } from "koa";
import { verify } from "../util/auth";
import resp from "../util/resp";

const AuthMiddleware = (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization
  // token 存在
  if (token) {
    const { error, admin } = verify(token)
    // 验证签名不通过
    if (error) {
      resp.err(ctx,
        {
          data: error,
        }
      )
    } else {
      // 验证签名通过
      console.log(admin)
      // 不加 return 就不会去匹配下一个路由
      return next()
    }
  } else {
    // token 不存在
    resp.err(ctx,
      {
        code: 401,
        data: 'authorization 不可为空'
      }
    )
  }
}

export default AuthMiddleware