import KoaRouter from "koa-router";
import StudentController from "../controller/StudentController";
import AdminController from "../controller/AdminController";
import BadController from "../controller/BadController";
import BaseTestController from "../controller/BaseTestController";
import GoodsController from "../controller/GoodsController";
import IndexController from "../controller/IndexController";
import loginController from "../controller/LoginController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TestMiddleware from "../middleware/TestMiddleware";

// 路由
const router = new KoaRouter({
  prefix: '/api'
})

// 请求
router.post('/admin', AdminController.addAdmin)
router.put('/admin/:id', AdminController.updateAdmin)
router.post('/login', loginController.login)
// router.use(AuthMiddleware)
// router.use(TestMiddleware)
// router.get('/', IndexController.one) // 二参是传入一个方法, 不需要调用

router.get('/goods/getList', GoodsController.getGoodsList)
router.get('/goods/getListByPage', GoodsController.getGoodsListByPage)
// router.get('/base/getList', BaseTestController.getListByPage)
router.get('/bad/getList', BadController.getBadList)
// router.get('/goods/get', GoodController.getGood)
// router.get('/test', AdminController.two)


router.get('/student', StudentController.getStudent);
// router.get('/student', StudentController.test);
router.get('/test', StudentController.test);
// router.post('/student', StudentController.addStudent);
router.post('/student', StudentController.updStudent);
router.put('/student', StudentController.updStudent);
// router.delete('/student', StudentController.updStudent);
// router.delete('/student', controller.student.delStudent);

router.post('/upload/single', StudentController.uploadSingle)
router.post('/upload/multiple', StudentController.uploadMultiple)

router.post('/chatgpt', StudentController.chatGptText) // 配合类字段
// router.post('/chatgpt', StudentController.chatGptText.bind(StudentController)) // 绑定this
// router.post('/chatgpt', ctx => StudentController.chatGptText(ctx)) // 包一层


router.post('/bff', StudentController.tryBFF)


export default router