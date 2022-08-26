import { configure, getLogger } from "log4js";

configure({
  // 范畴
  categories: {
    default: {
      appenders: ["cheese"], level: "warn"
    },
    access: {
      appenders: ["access"], level: "info"
    },
  },
  // 输出源
  appenders: {
    cheese: {
      type: "file", filename: "cheese.log"
    },
    access: {
      type: "file", filename: "access.log"
    },
  },
});

export default getLogger();
export const accessLogger = getLogger('access')


// // logger.level = "trace";
// logger.trace("Entering cheese testing");
// logger.debug("Some debug messages");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");