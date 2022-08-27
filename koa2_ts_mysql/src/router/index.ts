import KoaRouter from "koa-router";
import IndexController from "../controller/IndexController";
import loginController from "../controller/LoginController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TestMiddleware from "../middleware/TestMiddleware";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// 请求
router.get('/login', loginController.two)
router.use(AuthMiddleware)
router.use(TestMiddleware)
router.get('/', IndexController.one) // 二参是传入一个方法, 不需要调用


export default router