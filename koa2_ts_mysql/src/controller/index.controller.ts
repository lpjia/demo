import { Context } from "koa";
import logger, { accessLogger } from "../logger";

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

    ctx.body = [1, 2, 3]
  }
}

export default new IndexController()