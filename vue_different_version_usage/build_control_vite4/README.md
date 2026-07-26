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
dist1
默认, 所有资源都在assets文件夹下, 打包进index-hash.js, 动态导入的模块单独打包到1个文件
目前先看js文件

dist2
entryFileNames, 改打包后的入口文件, 也就是原来的index-hash.js文件变成了js/new_entry.js, 手动命名

dist3
[name]是占位符, 表示文件的名字, 自动命名

dist4
占位符 [name] [hash]

dist5
chunkFileNames, 手动分包, 自动命名, 只负责chunk文件
入口文件是assets/index-56fa20dc.js

dist6
entryFileNames和chunkFileNames都配置成 'js/[name]-[hash].js'
js文件全都在1个文件夹了

dist7
assetFileNames, 其他静态资源分类存放, 分文件夹
svg格式的图片也按svg文件夹存
没配置entryFileNames和chunkFileNames

dist8
其他静态资源分类存放, 细腻控制, 通过回调函数
没配置entryFileNames和chunkFileNames

dist9
按传统的js、css、img文件分类存放
配置entryFileNames、chunkFileNames、assetFileNames

dist10
manualChunks, 手动分包, 把第三方库单独分包

dist11
manualChunks, 分别把第三方库单独分包
手动一个个分

dist12
manualChunks, 手动分包, 通过回调形式
vendor包含所有在 node_modules 中的依赖

dist13
其实最好按传统的js、css、img文件分类存放
库是lib.js
配置entryFileNames、chunkFileNames、assetFileNames、manualChunks(id)