import KoaRouter from "koa-router";
import JsonpController from "../controller/JsonpController";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// router.get('/user', (ctx) => {
//   ctx.body = `customCallback(${[1, 2, 3]})`;
// })
router.get('/user', JsonpController.fetchJsonp)

export default router