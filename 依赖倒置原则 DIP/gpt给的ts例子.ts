// 定义日志记录器接口
interface Logger {
  log(message: string): void;
}

// 控制台日志记录器
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console] ${message}`);
  }
}

// 文件日志记录器
class FileLogger implements Logger {
  log(message: string): void {
    // 省略写入文件的具体实现
    console.log(`[File] ${message}`);
  }
}

// 高层模块依赖于抽象接口 Logger
class App {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  doSomething() {
    this.logger.log("Doing something...");
  }
}

// 在应用中使用依赖倒置原则
const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger();

const appWithConsoleLogger = new App(consoleLogger);
appWithConsoleLogger.doSomething(); // 输出到控制台

const appWithFileLogger = new App(fileLogger);
appWithFileLogger.doSomething(); // 输出到文件
