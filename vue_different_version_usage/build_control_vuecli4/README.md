2026-05-27 22:35

### 分包

dist1
vuecli4 默认按文件类型分目录
默认生成sourcemap文件

dist2
不生成sourcemap文件
第三方库在chunk-vendors.哈希.js
业务代码在app.哈希.js

dist3
增加ramda库并使用ramda函数, 动态导入import()
动态导入的模块单独打包到了js/chunk-哈希.哈希.js

dist4
配置了config.optimization.splitChunks
vue和其他第三方包都在chunk-vue.哈希.js
动态导入的模块单独打包到了js/chunk-哈希.哈希.js
业务代码在app.哈希.js