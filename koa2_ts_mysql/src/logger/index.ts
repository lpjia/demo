import { configure, getLogger } from "log4js";
import config from "../../config";

configure(config.log);

export default getLogger();
export const accessLogger = getLogger('access')
export const dbLogger = getLogger('db')


// // logger.level = "trace";
// logger.trace("Entering cheese testing");
// logger.debug("Some debug messages");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");