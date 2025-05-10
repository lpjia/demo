import { Context } from "koa"

class JsonpController {
  fetchJsonp(ctx: Context) {
    const dataList = [
      { id: 1, name: "xj" },
      { id: 2, name: "xh" },
      { id: 3, name: "xz" },
    ]

    // 响应体, 使用json字符串返回给前端数据
    ctx.body = `customCallback(${JSON.stringify(dataList)})`
  }
}

export default new JsonpController()