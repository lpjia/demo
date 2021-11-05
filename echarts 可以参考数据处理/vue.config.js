const path = require('path');
// 修改webpack配置 node运行环境)
module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        open: true   // 自动打开
    },
    configureWebpack: {
        resolve: {
            // 配置路径别名
            // 使用： import Header from '@pages/Header'
            alias: {
                '@':path.resolve(__dirname,'src'),
            }
        }
    }
}
