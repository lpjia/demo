import { Server } from "http"
import run from "../src/main"
import request from "supertest"

describe('http', () => {
  let server: Server;
  beforeAll(async () => {
    await run().then((resp) => {
      server = resp
    })
  })

  it('GET /api', () => {
    return request(server)
      .get('/api')
      .expect(200)
      .then(resp => {
        // expect(resp.body).toStrictEqual([1, 2, 3])
        // expect(resp.body).toEqual([1, 2, 3])
        expect(resp.body.length).toEqual(3)
      })
  })

  // 完事后要关闭服务
  afterAll(async () => {
    server.close()
  })
})