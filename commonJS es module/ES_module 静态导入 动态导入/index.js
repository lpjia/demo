/* 静态导入 js模块文件 */
/* 会导入值 */
// import ... from ...


/* 静态导入 js模块文件 */
/* 导入整个模块仅用于副作用，不导入任何内容。这会运行模块的全局代码，但实际上不会导入任何值。 */
// import './jing_tai.js'


/* 静态导入 非js模块文件, 需要构建工具支持 */
/* 通过vite启动html时, 可以生效 */
// import './style.css'


/* 动态导入 */
/* 动态导入时下载文件是异步的, 下载好后解析, 解析完后运行 */
import('./dong_tai.js').then(console.log)

// const m = await import('./dong_tai.js')
// console.log(m)