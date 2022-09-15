import KoaRouter from "koa-router";
import AdminController from "../controller/AdminController";
import BadController from "../controller/BadController";
import BaseTestController from "../controller/BaseTestController";
import GoodsController from "../controller/GoodsController";
import IndexController from "../controller/IndexController";
// import loginController from "../controller/LoginController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TestMiddleware from "../middleware/TestMiddleware";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// 请求
// router.get('/', IndexController.one) // 二参是传入一个方法, 不需要调用
// router.get('/login', loginController.two)
router.get('/goods/getList', GoodsController.getGoodsList)
router.get('/goods/getListByPage', GoodsController.getGoodsListByPage)
// router.get('/base/getList', BaseTestController.getListByPage)
// router.get('/bad/getList', BadController.getBadList)
// router.get('/goods/get', GoodController.getGood)
// router.get('/test', AdminController.two)
// router.use(AuthMiddleware)
// router.use(TestMiddleware)


export default router