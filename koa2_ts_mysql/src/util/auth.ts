import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"
import config from "../../z_config"

// 加密后的签名
// 重复率低, 所以用命名导出
export const sign = (data: JwtPayload) => {
  return jwt.sign(
    data,
    config.jwt.secret as string,
    { expiresIn: config.jwt.expire, }
  )
}

// 验证签名
export const verify = (token: string): {
  admin: JwtPayload | string | null,
  error: TokenExpiredError | JsonWebTokenError | null
} => {
  try {
    const decode = jwt.verify(
      token,
      config.jwt.secret as string,
    )

    return {
      admin: decode,
      error: null
    }
  } catch (error) {
    return {
      admin: null,
      error: error as TokenExpiredError | JsonWebTokenError | null
    }
  }
}