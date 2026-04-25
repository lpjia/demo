### 循环依赖 Circular Dependency

webpack从入口文件main.js开始分析依赖, 依次查找依赖关系

A与B形成循环依赖, main.js导入A

A模块

    解析中, 遇到import B, 去解析B

B模块

    解析中, 遇到import A, 此时A模块没解析完, 拿不到A, A只能是undefined, 解析完B模块

    又回到A模块, 由于B解析完了, 所以能拿到B

然后A、B模块都解析完了


使用动态导入 import或require 都可以

具体看代码

### UnoCss

引入这个库来练习, 这个库定位是引擎, 而非框架

做了个顶部导航栏

### cross-env

这个迷你的包(cross-env)能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行

https://juejin.cn/post/7088493140205633544

node18+版本才需要--openssl-legacy-provider

    "dev": "cross-env NODE_OPTIONS=--openssl-legacy-provider vue-cli-service serve",

    "build": "cross-env NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build",

    "build:macos": "vue-cli-service build",

18以下版本

"dev": "cross-env vue-cli-service serve",
