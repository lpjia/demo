
// 2023-10-15 23:48 星期天
StudentService
模型实例(Model调用静态方法后返回的)不能直接用console.log打印(不直观, 干扰项太多), 用实例.toJSON()来打印查看


// 2023-10-19 12:16 星期四
### 实现的功能有:
1. router路由
1. 解析body请求体
1. 文件上传到/static/upload/目录下, 并返回文件路径, 文件名被加密, 防止文件名被猜解
1. 访问文件路径, 返回文件内容
1. 文件下载
1. 类似chatgpt, 文本的流式传输
1. 解决跨域, cors方案
1. 允许多个域名的请求, 但不用*
1. BFF