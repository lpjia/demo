import { Context, Next } from "koa";
import { verify } from "../util/auth";
import response from "../util/response";

const AuthMiddleware = (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization
  // token 存在
  if (token) {
    const { error, admin } = verify(token)
    // 验证签名不通过
    if (error) {
      response.err(ctx,
        {
          data: error,
        }
      )

      // ctx.body = {
      //   msg: error,
      //   code: 400
      // }
    }
    else {
      // 验证签名通过
      console.log(admin)
      // 不加 return 就不会去匹配下一个路由
      return next()
    }
  } else {
    // token 不存在
    response.err(ctx,
      {
        code: 401,
        data: 'authorization 不可为空'
      }
    )

    // ctx.body = {
    //   msg: 'authorization 不可为空',
    //   code: 400
    // }
  }
}

export default AuthMiddleware