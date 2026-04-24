## 打包体积的分析和优化

webpack-bundle-analyzer依赖

### 引入了ramda


### 打包后的包
dist1 去掉transpileDependencies: true, 构建后的代码中出现未转译的第三方依赖

dist2 加上productionSourceMap: false, 删掉.map文件, 减小包体积

dist3 analyzerMode: 'static', 多一个本地分析页面文件, 其他文件都一样