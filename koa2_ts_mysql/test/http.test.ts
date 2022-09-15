import { Server } from "http"
import run from "../src/app"
import request from "supertest"

describe('http', () => {
  let server: Server;

  // 执行测试之前要启动服务
  beforeAll(async () => {
    await run().then((resp) => {
      server = resp
    })
  })

  // 接口测试
  it('GET /api', () => {
    return request(server)
      .get('/api/')
      .expect(200)
      .then(resp => {
        // expect(resp.body).toStrictEqual([1, 2, 3])
        // expect(resp.body).toEqual([1, 2, 3])
        expect(resp.body.length).toEqual(3)
      })
  })

  // 执行测试之后要关闭服务
  afterAll(async () => {
    server.close()
  })
})