import { Context } from "koa"

class JsonpController {
  fetchJsonp(ctx: Context) {
    const dataList = [
      { id: 1, name: "xj" },
      { id: 2, name: "xh" },
      { id: 3, name: "xz" },
    ]
    ctx.body = `customCallback(${JSON.stringify(dataList)})`
  }
}

export default new JsonpController()