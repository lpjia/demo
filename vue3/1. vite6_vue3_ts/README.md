// 2024-06-22 01:23 星期六
创建的项目


### 说明
vue3使用的全家桶及相关工具依赖


### 版本
node@18.14.0
vite@6
vue@3.5
vue-router@4
pinia@3
持久化存储 pinia-plugin-persistedstate
@vueuse/core @13.9


### 通过 Vite 配置 proxy 代理
解决本地开发环境跨域问题

使用axios拦截器封装的request
VITE_APP_BASE_URL='' # 本地开发环境用proxy来解决跨域, 此处应为空字符串


### plop依赖
https://panjiachen.github.io/vue-element-admin-site/zh/feature/script/new.html
使用的CJM语法
plopfile.js
plop-templates
使用命令来生成样板代码文件, 包括页面、组件、存储库store等