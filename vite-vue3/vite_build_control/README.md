## vite打包结构控制

需求一是想实现传统的js css img文件分类存放

rollup
  配置项
  手动分包
  文件分类存放
    img
    css
    assets
esbuild




## 打包后的包
dist1 默认, 所有资源都在assets文件夹下, 打包进index-hash.js, 动态导入的模块单独打包到一文件, 

dist2 entryFileNames, 改打包后的入口文件, 也就是原来的index.js文件变了, 手动命名

dist3 name是占位符, 表示文件的名字, 自动命名

dist4 占位符 name hash

dist5 chunkFileNames, 手动分包, 和entryFileNames不一样, 入口文件单独设置

dist6 assetFileNames, 其他静态资源分文件夹

dist7 其他静态资源分文件夹, 细腻控制, 通过回调函数

dist8 手动分包, 把库文件等一些不会随着业务变化的单独分包

dist9 手动分包, 通过回调函数