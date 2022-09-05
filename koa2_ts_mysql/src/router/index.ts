import KoaRouter from "koa-router";
import AdminController from "../controller/AdminController";
import BadController from "../controller/BadController";
import BaseTestController from "../controller/BaseTestController";
import GoodController from "../controller/GoodController";
import IndexController from "../controller/IndexController";
import loginController from "../controller/LoginController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TestMiddleware from "../middleware/TestMiddleware";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// 请求
// router.get('/login', loginController.two)
router.get('/good/getList', GoodController.getGoodList)
router.get('/base/getList', BaseTestController.getGoodList)
router.get('/bad/getList', BadController.getBadList)
router.get('/good/get', GoodController.getGood)
router.get('/test', AdminController.two)
router.use(AuthMiddleware)
router.use(TestMiddleware)
// router.get('/', IndexController.one) // 二参是传入一个方法, 不需要调用


export default router