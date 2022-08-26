import KoaRouter from "koa-router";
import IndexController from "../controller/index.controller";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// 请求
router.get('/', IndexController.one) // 二参是传入一个方法, 不需要调用

export default router