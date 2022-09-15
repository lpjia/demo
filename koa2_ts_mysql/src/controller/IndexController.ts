import { Context } from "koa";
// import logger, { accessLogger } from "../logger";
import AdminService from "../service/AdminService";

// 控制器
class IndexController {
  async one(ctx: Context) {

    // logger.error('hehe', 'hello world')
    // accessLogger.trace("Entering cheese testing");
    // accessLogger.debug("Some debug messages");
    // accessLogger.info("Cheese is Comté.");
    // accessLogger.warn("Cheese is quite smelly.");
    // accessLogger.error("Cheese is too ripe!");
    // accessLogger.fatal("Cheese was breeding ground for listeria.");


    const admin = await AdminService.getAdminOne()
    ctx.body = admin

    // // 单元测试用
    // ctx.body = [1, 2, 3]
  }
}

export default new IndexController()